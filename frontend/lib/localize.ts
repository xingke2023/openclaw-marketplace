import type { Listing } from '@/lib/api/types';

/**
 * 根据 locale 返回对应语言字段。
 * ja → name_ja / description_ja（若为空则回退到原字段）
 * 其他 → name / description
 */
export function localName(listing: Pick<Listing, 'name' | 'name_ja'>, locale: string): string {
  return (locale === 'ja' && listing.name_ja) ? listing.name_ja : listing.name;
}

export function localDesc(
  listing: Pick<Listing, 'description' | 'description_ja'>,
  locale: string,
): string | null {
  return (locale === 'ja' && listing.description_ja) ? listing.description_ja : listing.description ?? null;
}
