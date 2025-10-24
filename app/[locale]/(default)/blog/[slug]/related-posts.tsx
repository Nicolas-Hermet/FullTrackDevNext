import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { getBlogPosts } from '@/components/mdx/utils';

type RelatedPostsProps = {
  currentSlug: string;
  category?: string;
  locale?: string;
};

function pickRandomPosts<T>(posts: T[], count: number) {
  const shuffled = [...posts];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
}

export default function RelatedPosts({
  currentSlug,
  category,
  locale = 'fr',
}: RelatedPostsProps) {
  if (!category) {
    return null;
  }

  const relatedPosts = getBlogPosts(locale).filter(
    (post) => post.metadata.category === category && post.slug !== currentSlug
  );

  if (relatedPosts.length === 0) {
    return null;
  }

  const postsToDisplay = pickRandomPosts(relatedPosts, 3);

  return (
    <div className="mx-auto max-w-6xl">
      <div
        className="mx-auto mt-12 max-w-3xl border-t pt-12 [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-400/.25),transparent)1] md:pt-20"
        aria-hidden="true"
      />
      <h3 className="mb-8 text-center font-nacelle text-xl font-semibold text-gray-200 md:text-left">
        Read next
      </h3>
      <div className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3">
        {postsToDisplay.map((post) => (
          <article
            key={post.slug}
            className="flex h-full flex-col transition-opacity"
          >
            <header>
              <Link
                className="group relative mb-6 block overflow-hidden rounded-2xl border border-gray-800/80 before:absolute before:inset-0 before:-z-10 before:bg-linear-to-br before:from-gray-900 before:via-indigo-500/50 before:to-indigo-500 before:opacity-50"
                href={`/blog/${post.slug}`}
                tabIndex={-1}
              >
                {post.metadata.image && (
                  <Image
                    className="aspect-101/64 w-full object-cover opacity-70 grayscale transition ease-out group-hover:scale-[1.02] group-hover:opacity-100 group-hover:grayscale-[20%]"
                    src={post.metadata.image}
                    width={347}
                    height={220}
                    alt={post.metadata.title}
                  />
                )}
              </Link>
              <div className="mb-3">
                <ul className="flex flex-wrap gap-2">
                  <li>
                    <a
                      className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,--theme(--color-gray-700/.15),--theme(--color-gray-700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60"
                      href="#0"
                    >
                      <span className="bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                        {post.metadata.category}
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
              <h3 className="mb-2 font-nacelle text-lg font-semibold">
                <Link
                  className="text-gray-200 transition hover:text-white"
                  href={`/blog/${post.slug}`}
                >
                  {post.metadata.title}
                </Link>
              </h3>
            </header>
            <footer className="flex items-center gap-3">
              {post.metadata.authorImg && (
                <Image
                  className="inline-flex shrink-0 rounded-full"
                  src={post.metadata.authorImg}
                  width={28}
                  height={28}
                  alt={post.metadata.author || ''}
                />
              )}
              <div className="text-sm font-medium text-gray-200">
                <span>{post.metadata.author}</span>
                <span className="text-gray-700"> - </span>
                <a
                  className="text-indigo-200/65 transition-colors hover:text-indigo-500"
                  href={post.metadata.authorLink}
                >
                  {post.metadata.authorRole}
                </a>
              </div>
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
}
