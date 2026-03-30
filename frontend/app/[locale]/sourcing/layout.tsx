import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('sourcing.title'),
    description: t('sourcing.desc'),
  };
}

export default function SourcingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
