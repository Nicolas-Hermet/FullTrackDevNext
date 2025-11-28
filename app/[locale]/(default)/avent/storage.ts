import { kv } from '@vercel/kv';

export type AventMessages = Record<number, string>;

const AVENT_MESSAGES_KEY = 'avent:messages';

export async function readAventMessages(): Promise<AventMessages> {
  const raw = await kv.get<AventMessages | null>(AVENT_MESSAGES_KEY);

  if (!raw) {
    return {};
  }

  const normalized: AventMessages = {};
  for (const [key, value] of Object.entries(raw)) {
    const day = Number(key);
    if (
      Number.isInteger(day) &&
      day >= 1 &&
      day <= 25 &&
      typeof value === 'string'
    ) {
      normalized[day] = value;
    }
  }

  return normalized;
}

export async function writeAventMessages(
  messages: AventMessages
): Promise<void> {
  const safeMessages: AventMessages = {};
  for (const [key, value] of Object.entries(messages)) {
    const day = Number(key);
    if (
      Number.isInteger(day) &&
      day >= 1 &&
      day <= 25 &&
      typeof value === 'string'
    ) {
      safeMessages[day] = value;
    }
  }

  await kv.set(AVENT_MESSAGES_KEY, safeMessages);
}

export async function upsertAventMessage(
  day: number,
  text: string
): Promise<AventMessages> {
  if (!Number.isInteger(day) || day < 1 || day > 25) {
    throw new Error('Invalid day for Avent message');
  }

  const current = await readAventMessages();

  const updated: AventMessages = {
    ...current,
    [day]: text,
  };

  await writeAventMessages(updated);

  return updated;
}
