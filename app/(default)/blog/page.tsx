import { getBlogPosts } from '@/components/mdx/utils';
import CategoryProvider from './category-provider';
import PageIllustration from '@/components/page-illustration';
import BlogFilters from './filters';
import PostItem from '@/app/(default)/blog/post-item';

export const metadata = {
  title: 'Blog - Full Track Dev - Nicolas Hermet',
  description:
    'Des articles de fond, sur les sujet du télétravail, de la tech et de la course auto.',
};

import Cta from '@/components/cta';
import Pagination from './pagination';

export default function Blog() {
  const allBlogs = getBlogPosts();

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
                  J'ai commencé à écrire pendant les divers confinements sur le
                  sujet du Télétravail. Pendant ma saison en Formule Ford mon
                  sponsor principal souhaitait que j'écrive sur les divers
                  courses. Depuis j'ai pris gout au blogging et vous partage ici
                  divers enseignements tant pesonnels, que professionnel sur les
                  sujets tech, remote ou racing.
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
