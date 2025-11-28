import { promises as fs } from 'fs';
import path from 'path';

export type AventMessages = Record<number, string>;

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'avent-messages.json');

async function ensureDataFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });

  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify({}, null, 2), 'utf8');
  }
}

export async function readAventMessages(): Promise<AventMessages> {
  try {
    await ensureDataFile();
    const content = await fs.readFile(DATA_FILE, 'utf8');

    if (!content) {
      return {};
    }

    const parsed = JSON.parse(content) as AventMessages;

    // Normalize keys to numbers just in case
    const normalized: AventMessages = {};
    for (const [key, value] of Object.entries(parsed)) {
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
  } catch (error) {
    console.error('Error reading Avent messages file:', error);
    return {};
  }
}

export async function writeAventMessages(
  messages: AventMessages
): Promise<void> {
  await ensureDataFile();

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

  await fs.writeFile(DATA_FILE, JSON.stringify(safeMessages, null, 2), 'utf8');
}

export async function upsertAventMessage(
  day: number,
  text: string
): Promise<AventMessages> {
  if (!Number.isInteger(day) || day < 1 || day > 25) {
    throw new Error('Invalid day for Avent message');
  }

  await ensureDataFile();
  const current = await readAventMessages();

  const updated: AventMessages = {
    ...current,
    [day]: text,
  };

  await writeAventMessages(updated);

  return updated;
}
