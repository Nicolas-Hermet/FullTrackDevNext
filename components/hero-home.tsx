import VideoThumb from '@/public/images/hero-image-01.jpg';
import ModalVideo from '@/components/modal-video';
import Hero from '@/components/hero-about';
import CvButton from '@/components/cv-button';

export default function HeroHome() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero content */}
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="pb-12 text-center md:pb-20">
            <h1
              className="animate-title pb-5 font-nacelle text-4xl font-semibold text-transparent md:text-5xl"
              data-aos="fade-up"
            >
              Full Track Dev
            </h1>
            <div className="mx-auto max-w-3xl">
              <p
                className=" text-xl text-indigo-200/65"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                An humble Fullstack Software Engineer driving racing cars on
                tracks.
              </p>
              <p
                className="mb-8 text-md text-indigo-200/65"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                And who gets shit done for you.
              </p>
              <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center">
                <div data-aos="fade-up" data-aos-delay={400}>
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
                <div data-aos="fade-up" data-aos-delay={600}>
                  <CvButton className="sm:ml-4 sm:w-auto" />
                </div>
              </div>
            </div>
          </div>

          <Hero showHeader={false} />
        </div>
      </div>
    </section>
  );
}
