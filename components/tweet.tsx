'use client';

import { useEffect, useMemo, useRef } from 'react';

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (element?: HTMLElement) => void;
      };
    };
  }
}

interface TweetProps {
  tweetUrl: string;
  authorName?: string;
  authorHandle?: string;
}

const scriptId = 'twitter-wjs';

function ensureTwitterScript(onLoad: () => void) {
  if (typeof window === 'undefined') {
    return;
  }

  const existingScript = document.getElementById(
    scriptId
  ) as HTMLScriptElement | null;

  if (window.twttr?.widgets) {
    window.twttr.widgets.load();
    return;
  }

  if (existingScript) {
    existingScript.addEventListener('load', onLoad, { once: true });
    return;
  }

  const script = document.createElement('script');
  script.id = scriptId;
  script.async = true;
  script.src = 'https://platform.twitter.com/widgets.js';
  script.addEventListener('load', onLoad, { once: true });
  document.body.appendChild(script);
}

function TwitterLogo() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5 text-sky-400"
      role="img"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M20.643 7.344c.014.2.014.403.014.606 0 6.188-4.71 13.312-13.312 13.312A13.24 13.24 0 0 1 0 18.794a9.576 9.576 0 0 0 1.116.056 9.388 9.388 0 0 0 5.816-2.004 4.695 4.695 0 0 1-4.382-3.252c.292.043.579.071.885.071.424 0 .848-.056 1.243-.162A4.683 4.683 0 0 1 .93 8.862v-.059a4.73 4.73 0 0 0 2.12.6A4.69 4.69 0 0 1 1 5.504a4.65 4.65 0 0 1 .637-2.358 13.31 13.31 0 0 0 9.656 4.902 4.702 4.702 0 0 1-.12-1.073 4.688 4.688 0 0 1 8.115-3.205 9.3 9.3 0 0 0 2.977-1.136 4.708 4.708 0 0 1-2.061 2.594A9.367 9.367 0 0 0 24 4.557a10.1 10.1 0 0 1-2.357 2.787z"
      />
    </svg>
  );
}

export default function Tweet({
  tweetUrl,
  authorName,
  authorHandle,
}: TweetProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const authorInitials = useMemo(() => {
    if (!authorName) return 'X';

    const parts = authorName
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0]?.toUpperCase())
      .filter(Boolean);

    return (parts[0] || '') + (parts[1] || '');
  }, [authorName]);

  useEffect(() => {
    const handleLoad = () => {
      if (window.twttr?.widgets) {
        window.twttr.widgets.load(containerRef.current ?? undefined);
      }
    };

    ensureTwitterScript(handleLoad);

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.removeEventListener('load', handleLoad);
      }
    };
  }, [tweetUrl]);

  return (
    <figure className="relative my-10 overflow-hidden rounded-3xl border border-gray-800/80 bg-gray-900/80 p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.8)] before:pointer-events-none before:absolute before:-inset-0.5 before:-z-10 before:rounded-[inherit] before:bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.25),transparent_55%)]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/15 text-sm font-semibold leading-none text-sky-300">
            {authorInitials}
          </div>
          <div className="flex flex-col">
            {authorName ? (
              <span className="text-sm font-medium text-white">
                {authorName}
              </span>
            ) : (
              <span className="text-sm font-medium text-white">Tweet</span>
            )}
            {authorHandle ? (
              <span className="text-xs text-slate-400">{authorHandle}</span>
            ) : (
              <span className="text-xs text-slate-400">
                Shared via X (Twitter)
              </span>
            )}
          </div>
        </div>
        <a
          href={tweetUrl}
          className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-200 transition hover:border-sky-400 hover:bg-sky-500/20 hover:text-sky-100"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TwitterLogo />
          View on X
        </a>
      </div>
      <div ref={containerRef} className="mt-5">
        <blockquote
          key={tweetUrl}
          className="twitter-tweet"
          data-dnt="true"
          data-theme="dark"
        >
          <a href={tweetUrl}>Read the tweet</a>
        </blockquote>
      </div>
    </figure>
  );
}
