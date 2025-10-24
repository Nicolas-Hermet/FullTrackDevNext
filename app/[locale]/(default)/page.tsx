export const metadata = {
  title: 'Home - Full Track Dev',
  description: 'Who is Full Track Dev? What do I do as a Software Engineer?',
};

import PageIllustration from '@/components/page-illustration';
import Hero from '@/components/hero-home';
import Timeline from '@/components/timeline';
import LatestPosts from '@/components/latest-posts';

export default function Home() {
  return (
    <>
      <PageIllustration multiple />
      <Hero />
      <Timeline />
      <LatestPosts />
      {/* <Workflows />
      <Features />
      <SplitCarousel />
      <Pricing />
      <Cta /> */}
    </>
  );
}
