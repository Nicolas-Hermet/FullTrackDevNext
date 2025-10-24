import { getBlogPosts } from '@/components/mdx/utils';
import CategoryProvider from './category-provider';
import PageIllustration from '@/components/page-illustration';
import BlogFilters from './filters';
import PostItem from './post-item';

export const metadata = {
  title: 'Blog - Full Track Dev - Nicolas Hermet',
  description:
    'In-depth articles covering remote work, technology, and motorsport.',
};

import Cta from '@/components/cta';

export default async function Blog({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const allBlogs = getBlogPosts(locale);

  // Sort posts by date
  allBlogs.sort((a, b) =>
    new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt) ? -1 : 1
  );

  return (
    <>
      <PageIllustration multiple />
      <section>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Hero content */}
          <div className="py-12 md:py-20">
            {/* Section header */}
            <div className="pb-12 text-center">
              <h1 className="animate-title pb-5 font-nacelle text-4xl font-semibold text-transparent md:text-5xl">
                Full Track Dev - Blog
              </h1>
              <div className="mx-auto max-w-3xl">
                <p className="text-xl text-indigo-200/65">
                  I started writing during the various lockdowns, mostly about
                  remote work. During my Formula Ford season, my main sponsor
                  asked me to recap each race. Since then, blogging has become
                  something I truly enjoy, and I share lessons here—personal and
                  professional—across tech, remote work, and racing.
                </p>
              </div>
            </div>
            <div>
              <CategoryProvider>
                {/* Buttons */}
                <BlogFilters />

                {/* Articles */}
                <div className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3">
                  {allBlogs.map((post, postIndex) => (
                    <PostItem key={postIndex} {...post} />
                  ))}
                </div>
              </CategoryProvider>

              {/* Pagination */}
              {/* <Pagination /> */}
            </div>
          </div>
        </div>
      </section>
      <Cta />
    </>
  );
}
