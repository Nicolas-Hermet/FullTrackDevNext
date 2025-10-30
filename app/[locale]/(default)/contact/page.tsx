'use client';

import { useState, FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import ReCaptchaProvider from '@/components/recaptcha-provider';
import PageIllustration from '@/components/page-illustration';
import FooterSeparator from '@/components/footer-separator';

function ContactForm() {
  const t = useTranslations('Contact');
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'default',
    subject: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error' | null;
    text: string;
  }>({ type: null, text: '' });
  const intro = t.raw('intro') as string[];
  const fields = t.raw('form.fields') as {
    name: { label: string; placeholder: string };
    email: { label: string; placeholder: string };
    topic: { label: string; placeholder: string };
    subject: { label: string; placeholder: string };
    description: { label: string; placeholder: string };
  };
  const topicOptions = t.raw('form.topic.options') as {
    value: string;
    label: string;
  }[];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: null, text: '' });

    try {
      // Validation des champs
      if (
        !formData.name ||
        !formData.email ||
        formData.topic === 'default' ||
        !formData.subject ||
        !formData.description
      ) {
        setMessage({
          type: 'error',
          text: t('errors.missingFields'),
        });
        setIsLoading(false);
        return;
      }

      // Exécuter reCAPTCHA v3
      if (!executeRecaptcha) {
        setMessage({
          type: 'error',
          text: t('errors.recaptchaNotReady'),
        });
        setIsLoading(false);
        return;
      }

      const recaptchaToken = await executeRecaptcha('contact_form');

      // Envoyer les données au backend
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: 'success',
          text: t('success'),
        });
        // Réinitialiser le formulaire
        setFormData({
          name: '',
          email: '',
          topic: 'default',
          subject: '',
          description: '',
        });
      } else {
        setMessage({
          type: 'error',
          text: data.error || t('errors.generic'),
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage({
        type: 'error',
        text: t('errors.generic'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageIllustration multiple />
      <section>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="py-12 md:py-20">
            {/* Section header */}
            <div className="pb-12 text-center">
              <h1 className="animate-title pb-5 font-nacelle text-4xl font-semibold text-transparent md:text-5xl">
                {t('title')}
              </h1>
              <div className="mx-auto max-w-3xl">
                {intro.map((paragraph, index) => (
                  <p key={index} className="text-xl text-indigo-200/65">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Contact form */}
            <form className="mx-auto max-w-[640px]" onSubmit={handleSubmit}>
              <div className="space-y-5">
                {/* Message de feedback */}
                {message.type && (
                  <div
                    className={`rounded-lg p-4 ${
                      message.type === 'success'
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}
                  >
                    {message.text}
                  </div>
                )}

                <div className="flex flex-col gap-x-6 gap-y-4 md:flex-row">
                  <div className="flex-1">
                    <label
                      className="mb-1 block text-sm font-medium text-indigo-200/65"
                      htmlFor="name"
                    >
                      {fields.name.label}
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="form-input w-full"
                      placeholder={fields.name.placeholder}
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-x-6 gap-y-4 md:flex-row">
                  <div className="flex-1">
                    <label
                      className="mb-1 block text-sm font-medium text-indigo-200/65"
                      htmlFor="email"
                    >
                      {fields.email.label}
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="form-input w-full"
                      placeholder={fields.email.placeholder}
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-x-6 gap-y-4 md:flex-row">
                  <div className="flex-1">
                    <label
                      className="mb-1 block text-sm font-medium text-indigo-200/65"
                      htmlFor="topic"
                    >
                      {fields.topic.label}
                    </label>
                    <select
                      id="topic"
                      className="form-select w-full text-gray-200"
                      value={formData.topic}
                      onChange={handleChange}
                      required
                    >
                      <option value={'default'} disabled>
                        {fields.topic.placeholder}
                      </option>
                      {topicOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label
                      className="mb-1 block text-sm font-medium text-indigo-200/65"
                      htmlFor="subject"
                    >
                      {fields.subject.label}
                    </label>
                    <input
                      id="subject"
                      type="text"
                      className="form-input w-full"
                      placeholder={fields.subject.placeholder}
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    className="mb-1 block text-sm font-medium text-indigo-200/65"
                    htmlFor="description"
                  >
                    {fields.description.label}
                  </label>
                  <div className="relative">
                    <textarea
                      id="description"
                      rows={5}
                      className="form-textarea peer w-full text-gray-200 placeholder:text-transparent"
                      placeholder={fields.description.placeholder}
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute left-3 top-3 text-sm text-indigo-200/65 opacity-50 transition-opacity duration-150 peer-focus:opacity-0 peer-[&:not(:placeholder-shown)]:opacity-0"
                    >
                      {fields.description.placeholder}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex w-full flex-col justify-between gap-5 md:flex-row md:items-center">
                <div className="w-full">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn group w-full bg-linear-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative inline-flex items-center">
                      {isLoading ? t('form.sending') : t('form.submit')}
                      {!isLoading && (
                        <span className="ml-1 tracking-normal text-white/50 transition-transform group-hover:translate-x-0.5">
                          -&gt;
                        </span>
                      )}
                    </span>
                  </button>
                </div>
              </div>
              <div className="mt-4 text-center text-xs text-indigo-200/50">
                {t.rich('recaptcha.text', {
                  privacy: (chunks) => (
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:no-underline"
                    >
                      {chunks}
                    </a>
                  ),
                  terms: (chunks) => (
                    <a
                      href="https://policies.google.com/terms"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:no-underline"
                    >
                      {chunks}
                    </a>
                  ),
                })}
              </div>
            </form>
          </div>
        </div>
      </section>
      <FooterSeparator />
    </>
  );
}

export default function Contact() {
  return (
    <ReCaptchaProvider>
      <ContactForm />
    </ReCaptchaProvider>
  );
}
