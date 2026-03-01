<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Str;

class BlogContentSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first() ?? User::factory()->create();

        // OpenClaw for Breweries
        Post::create([
            'user_id' => $user->id,
            'title' => 'OPENCLAW FOR BREWERIES: AUTOMATE TAPROOM EVENTS AND DISTRIBUTION',
            'slug' => 'openclaw-for-breweries',
            'excerpt' => 'How AI agents like OpenClaw can transform operations, automate distribution, and enhance customer engagement in the brewing industry.',
            'content' => "How breweries can use OpenClaw to automate taproom events, distribution tracking, and customer engagement.\n\n" .
                "TAPROOM EVENT PROMOTION THAT ACTUALLY FILLS SEATS\n" .
                "OpenClaw agents can monitor your brewing schedule and automatically create event listings for new release parties. By connecting directly to your POS system, the agent identifies when a specific batch is ready for tapping and initiates a marketing sequence.\n\n" .
                "Step 1: Event creation based on tank monitoring\n" .
                "Step 2: Automated social media drafting and scheduling\n" .
                "Step 3: Real-time RSVP tracking via QR codes on table tents\n\n" .
                "DISTRIBUTION TRACKING WITHOUT THE HEADACHE\n" .
                "Managing keg returns and wholesale orders often feels like a second job. OpenClaw simplifies this by acting as a 24/7 coordinator between your warehouse and your accounts.\n\n" .
                "DEMAND FORECASTING\n" .
                "The agent analyzes historical sales data to predict when a specific account will run dry, sending a proactive restock notification to your sales rep.\n\n" .
                "KEG TRACKING\n" .
                "Automated reminders to accounts that have held empty kegs for more than 14 days, reducing asset loss and improving turnaround time.\n\n" .
                "CUSTOMER ENGAGEMENT AND LOYALTY\n" .
                "Beyond beer, breweries are community hubs. OpenClaw helps maintain that connection through personalized outreach that feels human, not robotic.\n\n" .
                "Preference learning: The agent remembers that a customer prefers sours over IPAs and only notifies them of relevant releases.\n" .
                "Custom box curation: For subscription clubs, the agent suggests box contents based on individual rating history.\n\n" .
                "NEXT STEPS\n" .
                "Ready to deploy OpenClaw for your brewery? Browse our available agents or reach out for a custom sourcing request.",
            'published' => true,
            'published_at' => now(),
        ]);

        // Add a few more tech-focused posts to fill "More from the blog"
        Post::create([
            'user_id' => $user->id,
            'title' => 'AI AGENTS IN MANUFACTURING: REDUCING DOWNTIME WITH PREDICTIVE CLAWS',
            'slug' => 'ai-agents-in-manufacturing',
            'excerpt' => 'Predictive maintenance is no longer a luxury. Discover how AI agents monitor hardware health and automate service requests.',
            'content' => "Predictive maintenance is no longer a luxury. Discover how AI agents monitor hardware health and automate service requests.\n\n" .
                "HARDWARE MONITORING\n" .
                "Continuous telemetry analysis to identify vibration patterns that precede motor failure.\n\n" .
                "AUTOMATED SERVICE LOGGING\n" .
                "When a threshold is crossed, the agent logs a ticket and notifies the maintenance lead.",
            'published' => true,
            'published_at' => now(),
        ]);

        Post::create([
            'user_id' => $user->id,
            'title' => 'THE FUTURE OF CLAWSOURCING: ON-DEMAND ROBOTICS FLEETS',
            'slug' => 'the-future-of-clawsourcing',
            'excerpt' => 'Why owning a fleet isn\'t always the answer. The rise of temporary, task-specific robotics deployment.',
            'content' => "Why owning a fleet isn't always the answer. The rise of temporary, task-specific robotics deployment.\n\n" .
                "SCALABILITY ON DEMAND\n" .
                "Lease specialized agents for seasonal peaks without the long-term overhead of maintenance and storage.",
            'published' => true,
            'published_at' => now(),
        ]);
    }
}
