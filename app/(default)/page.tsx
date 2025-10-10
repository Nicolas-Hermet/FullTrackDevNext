export const metadata = {
  title: 'Home - Open PRO',
  description: 'Page description',
};

import PageIllustration from '@/components/page-illustration';
import Hero from '@/components/hero-home';
import Workflows from '@/components/workflows';
import Features from '@/components/features';
import Pricing from '@/components/pricing-home';
import SplitCarousel from '@/components/split-carousel';
import Cta from '@/components/cta';
import Timeline from '@/components/timeline';

export default function Home() {
  return (
    <>
      <PageIllustration multiple />
      <Hero />
      <Timeline />
      <Workflows />
      <Features />
      <SplitCarousel />
      <Pricing />
      <Cta />
    </>
  );
}
