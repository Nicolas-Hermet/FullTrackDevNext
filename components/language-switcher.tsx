'use client';

import { useParams } from 'next/navigation';
import { Link } from '@/i18n/routing';
import Dropdown from '@/components/dropdown';

export default function LanguageSwitcher() {
  const params = useParams();
  const currentLocale = params.locale as string;

  return (
    <Dropdown
      title=""
      svg={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-languages"
        >
          <path d="m5 8 6 6"></path>
          <path d="m4 14 6-6 2-3"></path>
          <path d="M2 5h12"></path>
          <path d="M7 2h1"></path>
          <path d="m22 22-5-10-5 10"></path>
          <path d="M14 18h6"></path>
        </svg>
      }
    >
      <li>
        <Link
          href="/"
          locale="en"
          className={`flex rounded-lg px-2 py-1.5 text-sm transition-colors ${
            currentLocale === 'en'
              ? 'bg-indigo-500 text-white'
              : 'text-white hover:text-indigo-500'
          }`}
        >
          En
        </Link>
      </li>
      <li>
        <Link
          href="/"
          locale="fr"
          className={`flex rounded-lg px-2 py-1.5 text-sm transition-colors ${
            currentLocale === 'fr'
              ? 'bg-indigo-500 text-white'
              : 'text-white hover:text-indigo-500'
          }`}
        >
          Fr
        </Link>
      </li>
    </Dropdown>
  );
}
