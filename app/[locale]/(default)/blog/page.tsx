import { getTranslations } from 'next-intl/server';
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
  const t = await getTranslations({ locale, namespace: 'BlogPage' });
  const allBlogs = getBlogPosts(locale);
  const description = t.raw('description') as string[];

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
                {t('title')}
              </h1>
              <div className="mx-auto max-w-3xl">
                {description.map((paragraph, index) => (
                  <p key={index} className="text-xl text-indigo-200/65">
                    {paragraph}
                  </p>
                ))}
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
