'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { upsertAventMessage } from './storage';

const AVENT_COOKIE_NAME = 'avent_auth';
const AVENT_DAY25_COOKIE_NAME = 'avent_25_unlocked';

type AventRole = 'user1' | 'user2';

export async function saveAventMessage(formData: FormData) {
  const cookieStore = await cookies();
  const rawRole = cookieStore.get(AVENT_COOKIE_NAME)?.value;
  const role: AventRole | undefined =
    rawRole === 'user1' || rawRole === 'user2' ? rawRole : undefined;

  const locale = formData.get('locale');
  const targetLocale =
    typeof locale === 'string' && locale.length > 0 ? locale : 'en';

  if (!role) {
    redirect(`/${targetLocale}/avent`);
  }

  const dayRaw = formData.get('day');
  const textRaw = formData.get('text');

  const day =
    typeof dayRaw === 'string' ? Number.parseInt(dayRaw, 10) : Number.NaN;
  const text = typeof textRaw === 'string' ? textRaw.trim() : '';

  if (!Number.isInteger(day) || day < 1 || day > 25) {
    redirect(`/${targetLocale}/avent`);
  }

  const isEvenDay = day % 2 === 0;
  const isOddDay = !isEvenDay;

  // user1: peut modifier uniquement les jours pairs
  if (role === 'user1' && !isEvenDay) {
    redirect(`/${targetLocale}/avent`);
  }

  // user2: peut modifier uniquement les jours impairs
  if (role === 'user2' && !isOddDay) {
    redirect(`/${targetLocale}/avent`);
  }

  await upsertAventMessage(day, text);

  revalidatePath(`/${targetLocale}/avent`);

  redirect(`/${targetLocale}/avent`);
}

export async function unlockDay25(formData: FormData) {
  const cookieStore = await cookies();
  const rawRole = cookieStore.get(AVENT_COOKIE_NAME)?.value;
  const role: AventRole | undefined =
    rawRole === 'user1' || rawRole === 'user2' ? rawRole : undefined;

  const locale = formData.get('locale');
  const targetLocale =
    typeof locale === 'string' && locale.length > 0 ? locale : 'en';

  if (!role) {
    redirect(`/${targetLocale}/avent`);
  }

  const passwordRaw = formData.get('password');
  const password =
    typeof passwordRaw === 'string' ? passwordRaw.trim() : undefined;

  if (!password) {
    redirect(`/${targetLocale}/avent?unlockError=1`);
  }

  const passwordUser1 = process.env.AVENT_PASSWORD_USER1;
  const passwordUser2 = process.env.AVENT_PASSWORD_USER2;

  if (!passwordUser1 || !passwordUser2) {
    redirect(`/${targetLocale}/avent?unlockError=1`);
  }

  const expectedOther = role === 'user1' ? passwordUser2 : passwordUser1;

  if (password !== expectedOther) {
    redirect(`/${targetLocale}/avent?unlockError=1`);
  }

  cookieStore.set(AVENT_DAY25_COOKIE_NAME, '1', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 jours
  });

  redirect(`/${targetLocale}/avent?day=25`);
}
