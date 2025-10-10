import Image from 'next/image';
import Link from 'next/link';
import Logo from './logo';
import FooterIllustration from '@/public/images/footer-illustration.svg';

export default function Footer() {
  return (
    <footer className="mb-5">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Footer illustration */}
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 -z-10 -translate-x-1/2"
          aria-hidden="true"
        >
          <Image
            className="max-w-none"
            src={FooterIllustration}
            width={1076}
            height={378}
            alt="Footer illustration"
          />
        </div>
        <div className="flex flex-col gap-8 border-t border-gray-800 pt-6 text-sm text-indigo-200/65 md:flex-row md:justify-between lg:items-center">
          <div>
            <a
              className="btn group mb-4 w-full bg-linear-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
              href="#0"
            >
              <span className="relative inline-flex items-center">
                Contact
                <span className="ml-1 tracking-normal text-white/50 transition-transform group-hover:translate-x-0.5">
                  -&gt;
                </span>
              </span>
            </a>
          </div>
          <div className="text-sm text-center text-indigo-200/65">
            <p>
              Since 2018, Nicolas Hermet has supported startups and scale-ups in
              systems engineering, then as a full-stack developer and tech lead.
              Full Track Dev delivers product-focused tech engagements designed
              to maximize ROI for your business and performance.
            </p>
            <p>Even when the team is fully remote.</p>
            <p>
              Recent engagements: functional architecture, retroactive time zone
              reconciliation, and upskilling distributed teams.
            </p>
            <ul className="space-y-1 text-sm text-indigo-200/65">
              <li>Proven experience since 2010</li>
              <li>Recent clients: Traacks, Captive, OFB</li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-2 justify-between gap-12 py-8 sm:grid-rows-[auto_auto] md:grid-cols-4 md:grid-rows-[auto_auto] md:py-12 lg:grid-cols-[repeat(4,minmax(0,140px))_1fr] lg:grid-rows-1 xl:gap-20">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-200">
              Freelance services
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="text-indigo-200/65 transition hover:text-indigo-500"
                  href="#0"
                >
                  Technical leadership &amp; product vision
                </Link>
              </li>
              <li>
                <Link
                  className="text-indigo-200/65 transition hover:text-indigo-500"
                  href="#0"
                >
                  Full-stack Ruby on Rails &amp; Next.js development
                </Link>
              </li>
              <li>
                <Link
                  className="text-indigo-200/65 transition hover:text-indigo-500"
                  href="#0"
                >
                  Team workflow design
                </Link>
              </li>
              <li>
                <Link
                  className="text-indigo-200/65 transition hover:text-indigo-500"
                  href="#0"
                >
                  Team mentoring
                </Link>
              </li>
              <li>
                <Link
                  className="text-indigo-200/65 transition hover:text-indigo-500"
                  href="#0"
                >
                  Fully remote leadership
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-200">
              Tech stack &amp; expertise
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="text-indigo-200/65 transition hover:text-indigo-500"
                  href="#0"
                >
                  Ruby on Rails, RSpec, Sidekiq
                </Link>
              </li>
              <li>
                <Link
                  className="text-indigo-200/65 transition hover:text-indigo-500"
                  href="#0"
                >
                  Next.js, TypeScript, Tailwind CSS
                </Link>
              </li>
              <li>
                <Link
                  className="text-indigo-200/65 transition hover:text-indigo-500"
                  href="#0"
                >
                  PostgreSQL, Redis, Docker
                </Link>
              </li>
              <li>
                <Link
                  className="text-indigo-200/65 transition hover:text-indigo-500"
                  href="#0"
                >
                  Quality coaching, code reviews &amp; design patterns
                </Link>
              </li>
              <li>
                <Link
                  className="text-indigo-200/65 transition hover:text-indigo-500"
                  href="#0"
                >
                  Tech versus business trade-offs
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-200">
              Client case studies
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="text-indigo-200/65 transition hover:text-indigo-500"
                  href="#0"
                >
                  Axomove &mdash; digital health platform
                </Link>
              </li>
              <li>
                <Link
                  className="text-indigo-200/65 transition hover:text-indigo-500"
                  href="#0"
                >
                  ADN France &mdash; leading a fully remote team
                </Link>
              </li>
              <li>
                <Link
                  className="text-indigo-200/65 transition hover:text-indigo-500"
                  href="#0"
                >
                  Full Track Dev &mdash; technology migration
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-200">
              Blog &amp; interests
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="text-indigo-200/65 transition hover:text-indigo-500"
                  href="#0"
                >
                  Motorsport &amp; a toolkit to strengthen team cohesion
                </Link>
              </li>
              <li>
                <Link
                  className="text-indigo-200/65 transition hover:text-indigo-500"
                  href="#0"
                >
                  Remote organization &amp; leadership
                </Link>
              </li>
              <li>
                <Link
                  className="text-indigo-200/65 transition hover:text-indigo-500"
                  href="#0"
                >
                  Modern web development &amp; best practices
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-2 space-y-4 md:col-span-4 lg:col-span-1 lg:text-right">
            <ul className="inline-flex gap-4">
              <li>
                <a
                  className="flex items-center justify-center text-indigo-500 transition hover:text-indigo-400"
                  href="https://www.linkedin.com/in/nicolas-hermet/"
                  aria-label="Nicolas Hermet on LinkedIn, freelance developer"
                  rel="me"
                  target="_blank"
                >
                  <svg
                    className="h-8 w-8 fill-current"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M29 0H3C1.343 0 0 1.343 0 3v26c0 1.657 1.343 3 3 3h26c1.657 0 3-1.343 3-3V3c0-1.657-1.343-3-3-3zM9.339 27H4.669V12.339h4.67V27zM7.004 10.668c-1.497 0-2.707-1.21-2.707-2.707s1.21-2.707 2.707-2.707c1.497 0 2.707 1.21 2.707 2.707s-1.21 2.707-2.707 2.707zM27.331 27h-4.669v-7.669c0-1.829-1.493-3.322-3.322-3.322s-3.322 1.493-3.322 3.322V27h-4.67V12.339h4.67v2.339c1.168-1.829 3.322-2.839 5.322-2.839 3.679 0 6.669 2.99 6.669 6.669V27z" />
                  </svg>
                </a>
              </li>
              {/* <li>
                <a
                  className="flex items-center justify-center text-indigo-500 transition hover:text-indigo-400"
                  href="https://medium.com/@n.hermet"
                  aria-label="Nicolas Hermet on Medium, articles on motorsport & remote work"
                  rel="me"
                >
                  <svg
                    className="h-8 w-8 fill-current"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g transform="translate(16 16) scale(2) translate(-16 -16)">
                      <path d="M23 8H9a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1Zm-1.708 3.791-.858.823a.251.251 0 0 0-.1.241V18.9a.251.251 0 0 0 .1.241l.838.823v.181h-4.215v-.181l.868-.843c.085-.085.085-.11.085-.241v-4.887l-2.41 6.131h-.329l-2.81-6.13V18.1a.567.567 0 0 0 .156.472l1.129 1.37v.181h-3.2v-.181l1.129-1.37a.547.547 0 0 0 .146-.472v-4.749a.416.416 0 0 0-.138-.351l-1-1.209v-.181H13.8l2.4 5.283 2.122-5.283h2.971l-.001.181Z" />
                    </g>
                  </svg>
                </a>
              </li> */}
              <li>
                <a
                  className="flex items-center justify-center text-indigo-500 transition hover:text-indigo-400"
                  href="https://github.com/nicolas-hermet"
                  aria-label="Nicolas Hermet on GitHub, web projects"
                  rel="me"
                  target="_blank"
                >
                  <svg
                    className="h-8 w-8 fill-current"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g transform="translate(16 16) scale(2) translate(-16 -16)">
                      <path d="M16 8.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V22c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z" />
                    </g>
                  </svg>
                </a>
              </li>
              <li>
                <a
                  className="flex items-center justify-center text-indigo-500 transition hover:text-indigo-400"
                  href="https://www.youtube.com/@FullTrackDev"
                  aria-label="Nicolas Hermet on YouTube, tech talks &amp; videos"
                  rel="me"
                  target="_blank"
                >
                  <svg
                    className="h-8 w-8 fill-current"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g transform="translate(16 16) scale(1.12) translate(-16 -16)">
                      <path d="M29.675 8.17a3.651 3.651 0 0 0-2.57-2.586C24.667 5.042 16 5.042 16 5.042s-8.667 0-11.105.543A3.651 3.651 0 0 0 2.326 8.17C1.777 10.608 1.777 16 1.777 16s0 5.392.549 7.83a3.651 3.651 0 0 0 2.569 2.586c2.438.543 11.105.543 11.105.543s8.667 0 11.105-.543a3.651 3.651 0 0 0 2.569-2.586c.549-2.438.549-7.83.549-7.83s0-5.392-.549-7.83ZM13.997 20.401v-8.802L21.33 16l-7.333 4.401Z" />
                    </g>
                  </svg>
                </a>
              </li>
            </ul>
            <p className="whitespace-pre-line text-sm text-end text-indigo-200/65">
              {`© ${new Date().getFullYear()} Nicolas Hermet
              All rights reserved.`}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
