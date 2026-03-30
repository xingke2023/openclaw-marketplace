<?php

namespace App\Console\Commands;

use App\Models\Listing;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class TranslateListingsToJa extends Command
{
    protected $signature = 'listings:translate-ja
                            {--force : Re-translate even if ja fields already exist}
                            {--id= : Only translate a specific listing ID}';

    protected $description = 'Batch translate listing name & description to Japanese via DeepSeek';

    public function handle(): int
    {
        $apiKey = config('services.deepseek.key');

        if (! $apiKey) {
            $this->error('DEEPSEEK_API_KEY is not set in .env');

            return self::FAILURE;
        }

        $query = Listing::query();

        if ($this->option('id')) {
            $query->where('id', $this->option('id'));
        } elseif (! $this->option('force')) {
            $query->whereNull('name_ja');
        }

        $listings = $query->get();

        if ($listings->isEmpty()) {
            $this->info('Nothing to translate. Use --force to re-translate existing ones.');

            return self::SUCCESS;
        }

        $this->info("Translating {$listings->count()} listings via DeepSeek...");
        $bar = $this->output->createProgressBar($listings->count());
        $bar->start();

        $failed = 0;

        foreach ($listings as $listing) {
            try {
                [$nameJa, $descJa] = $this->translate($apiKey, $listing->name, $listing->description);

                $listing->name_ja = $nameJa;
                $listing->description_ja = $descJa;
                $listing->save();
            } catch (\Throwable $e) {
                $this->newLine();
                $this->warn("  [ID {$listing->id}] {$e->getMessage()}");
                $failed++;
            }

            $bar->advance();
            usleep(300_000); // 0.3s pause to avoid rate limiting
        }

        $bar->finish();
        $this->newLine();

        $done = $listings->count() - $failed;
        $this->info("Done: {$done} translated, {$failed} failed.");

        return $failed > 0 ? self::FAILURE : self::SUCCESS;
    }

    /** @return array{string, string|null} */
    private function translate(string $apiKey, string $name, ?string $description): array
    {
        $descPart = $description
            ? "\n描述：{$description}"
            : '';

        $prompt = <<<PROMPT
将以下中文内容翻译成自然流畅的日语。只输出 JSON，格式如下：
{"name":"日语名称","description":"日语描述（如原描述为空则返回null）"}

名称：{$name}{$descPart}
PROMPT;

        $response = Http::timeout(30)
            ->withToken($apiKey)
            ->post('https://api.deepseek.com/chat/completions', [
                'model'       => 'deepseek-chat',
                'temperature' => 0.3,
                'messages'    => [
                    ['role' => 'system', 'content' => '你是专业的中日翻译，输出严格 JSON，不加任何多余内容。'],
                    ['role' => 'user', 'content' => $prompt],
                ],
            ]);

        if (! $response->successful()) {
            throw new \RuntimeException('DeepSeek API error: ' . $response->status() . ' ' . $response->body());
        }

        $content = $response->json('choices.0.message.content', '');
        // Strip markdown code fences if present
        $content = preg_replace('/```(?:json)?\s*|\s*```/', '', trim($content));
        $data = json_decode($content, true);

        if (! is_array($data) || ! isset($data['name'])) {
            throw new \RuntimeException("Unexpected response: {$content}");
        }

        return [$data['name'], $data['description'] ?? null];
    }
}
