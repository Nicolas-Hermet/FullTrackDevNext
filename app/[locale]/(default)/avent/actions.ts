'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { upsertAventMessage } from './storage';

const AVENT_COOKIE_NAME = 'avent_auth';

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
