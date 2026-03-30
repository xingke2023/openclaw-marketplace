// Locale-aware navigation helpers (replaces next/navigation for links/router/pathname)
import { createNavigation } from 'next-intl/navigation';
import { routing } from '@/i18n/routing';

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
