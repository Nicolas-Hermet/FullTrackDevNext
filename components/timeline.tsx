type TimelineSide = 'left' | 'right';

type TimelineEntry = {
  eyebrow: string;
  title: string;
  description: string;
  aosDelay?: number;
};

type TimelineYear = {
  year: string;
  left?: TimelineEntry;
  right?: TimelineEntry;
};

const timelineYears: TimelineYear[] = [
  {
    year: '2016',
    right: {
      eyebrow: 'The seed',
      title: 'Open PRO was founded in Milan, Italy',
      description:
        'Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus.',
    },
  },
  {
    year: '2019',
    left: {
      eyebrow: 'New features',
      title: 'Launched the first Open PRO Advanced plan',
      description:
        'Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus.',
      aosDelay: 200,
    },
  },
  {
    year: '2022',
    left: {
      eyebrow: 'Team growth',
      title: 'Expanded our global engineering crew',
      description:
        'Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus.',
      aosDelay: 300,
    },
    right: {
      eyebrow: 'Pivoting',
      title: 'Transitioned to a SaaS business model',
      description:
        'Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus.',
      aosDelay: 400,
    },
  },
  {
    year: '2026',
    left: {
      eyebrow: 'Huge milestone',
      title: '1 million happy customers',
      description:
        'Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus.',
      aosDelay: 600,
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
        </div>
      </div>
    </div>
  );
}

export default function Timeline() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 md:pb-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
            <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              {/* En anglais: j'apporte une solution technique à votre problème business */}
              I build tools to solve real-world content problems
            </h2>
            <p className="text-lg text-indigo-200/65">
              In racing as in web development or engineering I always thrive for
              the best.
            </p>
            <p className="text-lg text-indigo-200/65">
              Always trying to be better everyday.
            </p>
          </div>
          {/* Items */}
          <div
            className="relative -my-4 mx-auto max-w-3xl md:-my-6"
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
                ].filter((value): value is number => typeof value === 'number');
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

                      <div className="md:hidden space-y-6">
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
    </section>
  );
}
