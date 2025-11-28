import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

import AventClient from './avent-client';
import { readAventMessages } from './storage';

const AVENT_COOKIE_NAME = 'avent_auth';
const AVENT_DAY25_COOKIE_NAME = 'avent_25_unlocked';

type AventRole = 'user1' | 'user2';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Calendrier de l'Avent - Full Track Dev",
  description:
    "Une page spéciale de calendrier de l'Avent, protégée par mot de passe.",
  robots: {
    index: false,
    follow: false,
  },
};

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

async function authenticate(formData: FormData) {
  'use server';

  const password = formData.get('password');
  const locale = formData.get('locale');

  const targetLocale =
    typeof locale === 'string' && locale.length > 0 ? locale : 'en';

  const passwordUser1 = process.env.AVENT_PASSWORD_USER1;
  const passwordUser2 = process.env.AVENT_PASSWORD_USER2;

  if (!passwordUser1 && !passwordUser2) {
    // Si aucun mot de passe n'est configuré côté serveur, on refuse systématiquement.
    redirect(`/${targetLocale}/avent?error=1`);
  }

  if (typeof password !== 'string' || password.length === 0) {
    redirect(`/${targetLocale}/avent?error=1`);
  }

  let role: AventRole | null = null;

  if (passwordUser1 && password === passwordUser1) {
    role = 'user1';
  } else if (passwordUser2 && password === passwordUser2) {
    role = 'user2';
  }

  if (!role) {
    redirect(`/${targetLocale}/avent?error=1`);
  }

  const cookieStore = await cookies();

  cookieStore.set(AVENT_COOKIE_NAME, role, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 jours
  });

  redirect(`/${targetLocale}/avent`);
}

export default async function AventPage({ params, searchParams }: PageProps) {
  const { locale } = await params;

  const cookieStore = await cookies();
  const rawRole = cookieStore.get(AVENT_COOKIE_NAME)?.value;
  const role: AventRole | undefined =
    rawRole === 'user1' || rawRole === 'user2' ? rawRole : undefined;
  const isAuthenticated = Boolean(role);

  const day25Unlocked = cookieStore.get(AVENT_DAY25_COOKIE_NAME)?.value === '1';

  const messages = await readAventMessages();
  const todayISO = new Date().toISOString();

  let hasError = false;
  if (searchParams) {
    const resolvedSearchParams = await searchParams;
    const errorParam = resolvedSearchParams?.error;
    hasError = Array.isArray(errorParam)
      ? errorParam.includes('1')
      : errorParam === '1';
  }

  const safeMessages = { ...messages };
  if (!day25Unlocked) {
    delete safeMessages[25];
  }

  if (!isAuthenticated || !role) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-6 rounded-md border border-gray-800 bg-gray-900/70 p-6">
          <header className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold">
              Accès au calendrier de l&apos;Avent
            </h1>
            <p className="text-sm text-gray-400">
              Cette page est protégée. Veuillez saisir le mot de passe pour y
              accéder.
            </p>
          </header>

          {hasError ? (
            <p className="rounded-md border border-red-600/60 bg-red-900/40 px-3 py-2 text-sm text-red-100">
              Mot de passe invalide ou non configuré.
            </p>
          ) : null}

          <form action={authenticate} className="space-y-4">
            <input type="hidden" name="locale" value={locale} />
            <div className="space-y-1">
              <label
                className="text-sm font-medium text-gray-200"
                htmlFor="password"
              >
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full rounded-md border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-gray-100"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400"
            >
              Entrer
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <AventClient
      todayISO={todayISO}
      messages={safeMessages}
      locale={locale}
      role={role}
      day25Unlocked={day25Unlocked}
    />
  );
}
