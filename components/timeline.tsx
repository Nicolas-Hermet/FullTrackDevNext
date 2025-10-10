'use client';

import { useEffect, useRef, useState } from 'react';
import CvButton from '@/components/cv-button';

type TimelineSide = 'left' | 'right';

type TimelineEntry = {
  eyebrow: string;
  title: string;
  description: string;
  stack?: string;
  aosDelay?: number;
};

type TimelineYear = {
  year: string;
  left?: TimelineEntry;
  right?: TimelineEntry;
};

const timelineYears: TimelineYear[] = [
  {
    year: '2010 - 2016',
    left: {
      eyebrow: 'Aeronautical engineering',
      title: 'Project and Team manager',
      description: `Project and systems engineer with end-to-end experience across the aerospace lifecycle, from flight testing to model-based systems engineering (MBSE).
        Contributed to major programs (A350, avionics systems, Silvercrest turbines) with a dual technical and managerial background spanning project leadership, quality management, and international team coordination.`,
    },
    right: {
      eyebrow: 'SWS',
      title: 'World go-kart endurance Championship',
      description: 'Finished 30th out of 3424 teams',
      aosDelay: 200,
    },
  },
  {
    year: '2016',
    right: {
      eyebrow: 'SWS',
      title: 'World go-kart endurance Championship',
      description: 'Finished 10th out of 3424 teams',
      aosDelay: 200,
    },
  },
  {
    year: '2016-2018',
    left: {
      eyebrow: '',
      title: 'Entreupreneurship experiences',
      description:
        'I tried to launch several startups in the tourism and art market space. Learned a lot, failed fast. This is when I discovered my passion for coding through The Hacking Project Bootcamp.',
      aosDelay: 200,
    },
  },
  {
    year: '2018 - 2020',
    left: {
      eyebrow: 'ADN France (full remote)',
      title: 'Team Lead & Software Engineer',
      description: `Delivered backend features for a low-voltage cabling management solution.
        Migrated software from Flash to Angular.
        Managed the project and led a team of four developers.
        Optimized team workflow to increase production speed by a factor of 12.`,
      stack: 'Angular 6.x-8.x',
      aosDelay: 300,
    },
  },
  {
    year: '2021',
    left: {
      eyebrow: 'Cardiologs (full remote)',
      title: 'Software Engineer',
      description: `Served as a backend software engineer for a medical startup that aims to diagnose heart diseases from ECGs.
            Implemented new endpoints to integrate with Apple Health for ECG data.`,
      stack:
        'Ruby on Rails 6.x API, RSpec, Docker, Jenkins, Sidekiq, PostgreSQL.',
      aosDelay: 300,
    },
    right: {
      eyebrow: 'Volant Michel Vaillant x Yéma',
      title: 'Vainqueur du volant',
      description: `Désigné vainqueur à l'issue de 3 jours de formations intensives, par un jury composé de pilotes vainqueurs des 24h du mans`,
      stack: 'Crosslé 90F',
      aosDelay: 500,
    },
  },
  {
    year: '2021',
    left: {
      eyebrow: 'Full Track Dev creation !',
      title: 'Fullstack Software Engineer',
      description: `Delivered engagements for several clients.
            Mentored interns and apprentices.
            Refactored test suites to increase coverage from 40\% to 80\%.`,
      stack:
        'Ruby on Rails 5.2-8.x, RSpec, Vanilla JS, PostgreSQL, Docker, Github Actions, Next.js, Angular, Vue.js.',
      aosDelay: 600,
    },
  },
  {
    year: '2021 - 2024',
    left: {
      eyebrow: 'Axomove (full remote)',
      title: 'Tech Lead',
      description: `Managed and mentored a team of four.
            Taught design patterns, OOP principles, and engineering best practices.
            Designed the platform architecture.
            Implemented CI/CD pipelines.
            Implemented testing best practices with RSpec.
            Increased automated test coverage from 10\% to 60\%.
            Secured and handled sensitive medical data.`,
      stack:
        'Ruby on Rails 5.2-6.1, RSpec, Vanilla JS, Github Actions, PostgreSQL, Git.',
      aosDelay: 800,
    },
    right: {
      eyebrow: 'HVM Historic Tour',
      title: 'Championnat de France de Formule Ford Historique',
      description:
        'Termine 4ème du championnat avec seulement 30% des courses. 71% de podiums.',
      stack: 'Lotus 69, Crosslé 16F',
      aosDelay: 1000,
    },
  },
  {
    year: '2024',
    left: {
      eyebrow: 'Lisaia (full remote)',
      title: 'Fullstack Software Engineer',
      description: `Served as a software engineer for a medical startup focused on simplifying and industrializing communication between doctors and patients.
            Owned web application features end to end.
            Secured and handled sensitive medical data.`,
      stack:
        'Ruby on Rails 7.1, RSpec, Stimulus, Sidekiq, Github Actions, PostgreSQL, Redis.',
      aosDelay: 1200,
    },
  },
];

function TimelineContent({
  entry,
  align,
}: {
  entry: TimelineEntry;
  align: TimelineSide;
}) {
  const isLeft = align === 'left';
  const spacingClass = isLeft ? 'md:pr-12' : 'md:pl-12';
  const alignmentClass = isLeft
    ? 'md:flex md:justify-end md:text-right'
    : 'md:flex md:justify-start md:text-left';
  const connectorClass = isLeft
    ? 'md:before:absolute md:before:right-0 md:before:top-1/2 md:before:h-px md:before:w-12 md:before:-translate-y-1/2 md:before:bg-gray-800'
    : 'md:before:absolute md:before:left-0 md:before:top-1/2 md:before:h-px md:before:w-12 md:before:-translate-y-1/2 md:before:bg-gray-800';

  return (
    <div className={`relative pl-2 ${spacingClass} ${connectorClass}`}>
      <div className={`${alignmentClass}`}>
        <div className="max-w-none md:max-w-md">
          <div className="inline-flex bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text pb-2 text-transparent">
            {entry.eyebrow}
          </div>
          <h4 className="font-nacelle text-xl font-semibold text-gray-200">
            {entry.title}
          </h4>
          <p className="text-[1rem] text-indigo-200/65">{entry.description}</p>
          <div className="inline-flex ">
            {entry.stack && (
              <>
                <span className="text-indigo-200/65 mr-4">Stack: </span>
                <span className="bg-linear-to-r from-red-500 to-indigo-200 bg-clip-text pb-2 text-transparent">
                  {entry.stack}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Timeline() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [showCvButton, setShowCvButton] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowCvButton(entry.isIntersecting);
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -20% 0px',
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          ref={sectionRef}
          className="pb-12 md:flex md:flex-row-reverse md:gap-10 md:pb-20"
        >
          <aside className="hidden shrink-0 md:block md:w-8 md:self-stretch lg:w-12">
            <div
              className={`sticky top-36 transform transition-all duration-300 ${
                showCvButton
                  ? 'translate-x-0 opacity-100'
                  : 'pointer-events-none translate-x-6 opacity-0'
              }`}
            >
              <CvButton />
            </div>
          </aside>

          <div className="flex-1">
            <div
              className={`md:hidden ${
                showCvButton
                  ? 'translate-y-0 opacity-100'
                  : 'pointer-events-none translate-y-2 opacity-0'
              } sticky bottom-6 z-20 mx-auto flex w-50 max-w-xs justify-center transform transition-all duration-300`}
            >
              <CvButton />
            </div>

            <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
              <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
                {/* En anglais: j'apporte une solution technique à votre problème business */}
                I build tools to solve real-world content problems
              </h2>
              <p className="text-lg text-indigo-200/65">
                In racing as in web development or engineering I always thrive
                for the best.
              </p>
              <p className="text-lg text-indigo-200/65">
                Always trying to be better everyday.
              </p>
            </div>

            <div
              className="relative -my-4 mx-auto max-w-5xl md:-my-6"
              data-aos-id-timeline=""
            >
              <div
                className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 transform bg-gray-800 md:block"
                aria-hidden="true"
              />
              <div className="space-y-12 md:space-y-16">
                {timelineYears.map((year, index) => {
                  const delays = [
                    year.left?.aosDelay,
                    year.right?.aosDelay,
                  ].filter(
                    (value): value is number => typeof value === 'number'
                  );
                  const delay =
                    delays.length > 0 ? Math.min(...delays) : undefined;
                  return (
                    <div
                      key={`${year.year}-${index}`}
                      className="relative py-4 md:py-6"
                      data-aos="fade-up"
                      data-aos-delay={delay}
                      data-aos-anchor="[data-aos-id-timeline]"
                    >
                      <div className="grid gap-6 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-10">
                        <div className="hidden md:block">
                          {year.left ? (
                            <TimelineContent entry={year.left} align="left" />
                          ) : (
                            <div aria-hidden="true" />
                          )}
                        </div>

                        <div className="relative flex flex-col items-center">
                          <span className="relative z-10 inline-flex items-center justify-center rounded-full bg-indigo-500/25 px-2.5 py-0.5 text-sm font-semibold text-indigo-500">
                            {year.year}
                          </span>
                        </div>

                        <div className="hidden md:block">
                          {year.right ? (
                            <TimelineContent entry={year.right} align="right" />
                          ) : (
                            <div aria-hidden="true" />
                          )}
                        </div>

                        <div className="space-y-6 md:hidden">
                          {year.left && (
                            <TimelineContent entry={year.left} align="left" />
                          )}
                          {year.right && (
                            <TimelineContent entry={year.right} align="right" />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
