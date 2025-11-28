import { createClient } from 'redis';

export type AventMessages = Record<number, string>;

const AVENT_MESSAGES_KEY = 'avent:messages';

type RedisClient = ReturnType<typeof createClient>;

let redisClient: RedisClient | null = null;
let redisInitPromise: Promise<RedisClient> | null = null;

async function getRedisClient(): Promise<RedisClient> {
  if (redisClient && redisClient.isOpen) {
    return redisClient;
  }

  if (!redisInitPromise) {
    redisInitPromise = (async () => {
      const client = createClient({
        url: process.env.REDIS_URL,
      });

      client.on('error', (error) => {
        console.error('Redis client error:', error);
      });

      await client.connect();
      redisClient = client;
      return client;
    })();
  }

  return redisInitPromise;
}

export async function readAventMessages(): Promise<AventMessages> {
  const client = await getRedisClient();
  const raw = await client.get(AVENT_MESSAGES_KEY);

  if (!raw) {
    return {};
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw) as AventMessages;
  } catch {
    console.error('Failed to parse Avent messages from Redis, resetting.');
    return {};
  }

  const normalized: AventMessages = {};
  for (const [key, value] of Object.entries(
    parsed as Record<string, unknown>
  )) {
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
  const client = await getRedisClient();

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

  await client.set(AVENT_MESSAGES_KEY, JSON.stringify(safeMessages));
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
