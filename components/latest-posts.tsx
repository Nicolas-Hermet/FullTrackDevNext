import { getBlogPosts } from '@/components/mdx/utils';
import CategoryProvider from '@/app/[locale]/(default)/blog/category-provider';
import PostItem from '@/app/[locale]/(default)/blog/post-item';

type LatestPostsProps = {
  locale?: string;
};

export default function LatestPosts({ locale = 'fr' }: LatestPostsProps) {
  const allBlogs = getBlogPosts(locale);
  allBlogs.sort((a, b) =>
    new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt) ? -1 : 1
  );
  const latestPosts = allBlogs.slice(0, 3);

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 md:pb-20">
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50">
              <span className="inline-flex bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                Cutting edges thoughts
              </span>
            </div>
            <h2 className="animate-title pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              My last blog posts
            </h2>
            <p className="text-lg text-indigo-200/65">
              I mostly write about tech, remote workflows and racing. Here my
              last thoughts on those topics
            </p>
          </div>
          <CategoryProvider>
            <div className="grid items-start gap-12 md:grid-cols-3 md:gap-x-6 md:gap-y-8">
              {latestPosts.map((post, index) => (
                <PostItem key={index} {...post} />
              ))}
            </div>
          </CategoryProvider>
        </div>
      </div>
    </section>
  );
}
