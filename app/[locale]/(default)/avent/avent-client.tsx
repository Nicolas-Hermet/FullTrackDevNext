'use client';

import { useEffect, useMemo, useState } from 'react';

import type { AventMessages } from './storage';
import { saveAventMessage, unlockDay25 } from './actions';

type AventRole = 'user1' | 'user2';

type AventClientProps = {
  todayISO: string;
  messages: AventMessages;
  locale: string;
  role: AventRole;
  day25Unlocked: boolean;
};

function isDayAvailable(day: number, today: Date) {
  // Simple rule: days unlock progressively in December of the current year.
  // If you want a different rule later, it's easy to adjust here.
  const year = today.getFullYear();
  const unlockDate = new Date(year, 11, day, 0, 0, 0, 0); // month 11 = December
  return true;
  return today >= unlockDate;
}

function canViewDay(day: number, today: Date, role: AventRole) {
  if (!isDayAvailable(day, today)) {
    return false;
  }

  // Le 25 doit être visible pour les deux utilisateurs
  if (day === 25) {
    return true;
  }

  const isEvenDay = day % 2 === 0;

  // user1 : ne peut ouvrir que les cards des jours impairs
  if (role === 'user1') {
    return !isEvenDay;
  }

  // user2 : ne peut ouvrir que les cards des jours pairs
  return isEvenDay;
}

function canEditDay(day: number, role: AventRole) {
  const isEvenDay = day % 2 === 0;

  // user1 : ne peut modifier que les messages des jours pairs
  if (role === 'user1') {
    return isEvenDay;
  }

  // user2 : ne peut modifier que les messages des jours impairs
  return !isEvenDay;
}

export default function AventClient({
  todayISO,
  messages,
  locale,
  role,
  day25Unlocked,
}: AventClientProps) {
  const today = useMemo(() => new Date(todayISO), [todayISO]);
  const days = useMemo(
    () => Array.from({ length: 25 }, (_, index) => index + 1),
    []
  );

  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const initialEditDay =
    role === 'user1'
      ? 2 // premier jour pair
      : 1; // premier jour impair

  const [editDay, setEditDay] = useState<number>(initialEditDay);
  const [editText, setEditText] = useState<string>(
    messages[initialEditDay] ?? ''
  );

  const selectedMessage =
    selectedDay != null ? (messages[selectedDay] ?? '') : '';

  const editableDays = useMemo(
    () => days.filter((day) => canEditDay(day, role)),
    [days, role]
  );

  useEffect(() => {
    setEditText(messages[editDay] ?? '');
  }, [editDay, messages]);

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-12">
      <header className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold">Calendrier de l&apos;Avent</h1>
        <p className="text-sm text-gray-400">
          Cliquez sur une case disponible pour afficher le message du jour.
        </p>
      </header>

      <section className="grid grid-cols-3 gap-3 md:grid-cols-6">
        {days.map((day) => {
          const available = canViewDay(day, today, role);
          const isSelected = selectedDay === day;

          return (
            <button
              key={day}
              type="button"
              disabled={!available}
              onClick={() => {
                if (!available) return;
                setSelectedDay(day);
              }}
              className={[
                'flex h-20 items-center justify-center rounded-md border text-lg font-semibold transition-colors',
                available
                  ? 'border-indigo-500/60 bg-indigo-500/10 text-indigo-100 hover:bg-indigo-500/20'
                  : 'cursor-not-allowed border-gray-700 bg-gray-900/60 text-gray-500',
                isSelected ? 'ring-2 ring-indigo-400' : '',
              ].join(' ')}
            >
              {day}
            </button>
          );
        })}
      </section>

      <section className="space-y-2 rounded-md border border-gray-800 bg-gray-900/60 p-4">
        <h2 className="text-lg font-medium">Aujourd&apos;hui !</h2>
        {selectedDay == null ? (
          <p className="text-sm text-gray-400">
            Sélectionnez une case disponible pour afficher son contenu.
          </p>
        ) : selectedDay === 25 && !day25Unlocked ? (
          <div className="space-y-3">
            <p className="text-sm text-gray-400">
              Pour le 25e jour, les deux mots de passe sont requis. Saisissez le
              mot de passe de l&apos;autre personne pour dévoiler le message.
            </p>
            <form action={unlockDay25} className="space-y-2">
              <input type="hidden" name="locale" value={locale} />
              <div className="space-y-1">
                <label
                  className="text-sm font-medium text-gray-200"
                  htmlFor="password-other"
                >
                  Mot de passe de l&apos;autre personne
                </label>
                <input
                  id="password-other"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-md border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-gray-100"
                />
              </div>
              <button
                type="submit"
                className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400"
              >
                Débloquer le 25e jour
              </button>
            </form>
          </div>
        ) : selectedMessage ? (
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {selectedMessage}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            Aucun message n&apos;a encore été renseigné pour ce jour.
          </p>
        )}
      </section>

      <section className="space-y-4 rounded-md border border-gray-800 bg-gray-900/60 p-4">
        <h2 className="text-lg font-medium">
          Administration du calendrier (édition des messages)
        </h2>
        <p className="text-xs text-gray-400">
          Utilisez ce formulaire pour ajouter ou modifier le texte associé à un
          jour. Les changements sont enregistrés côté serveur et visibles par
          les autres visiteurs autorisés.
        </p>

        <form action={saveAventMessage} className="space-y-3">
          <input type="hidden" name="locale" value={locale} />
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="text-sm font-medium" htmlFor="day">
              Jour
            </label>
            <select
              id="day"
              name="day"
              className="w-24 rounded-md border border-gray-700 bg-gray-950 px-2 py-1 text-sm text-gray-100"
              value={editDay}
              onChange={(event) => {
                const nextDay = Number.parseInt(event.target.value, 10);
                setEditDay(nextDay);
              }}
            >
              {editableDays.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="text">
              Texte
            </label>
            <textarea
              id="text"
              name="text"
              rows={5}
              className="w-full rounded-md border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-gray-100"
              placeholder="Saisissez ici le contenu à afficher pour ce jour."
              value={editText}
              onChange={(event) => setEditText(event.target.value)}
            />
          </div>

          <button
            type="submit"
            className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400"
          >
            Enregistrer le message
          </button>
        </form>
      </section>
    </div>
  );
}
