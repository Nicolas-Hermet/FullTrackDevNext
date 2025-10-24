type CvButtonProps = {
  className?: string;
};

export default function CvButton({ className }: CvButtonProps) {
  const baseClasses =
    'sm:ml-4 sm:w-auto btn relative w-full bg-linear-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%]';
  const cvHref = '/documents/CV_NicolasHermet_2025.pdf';

  return (
    <a
      className={className ? `${baseClasses} ${className}` : baseClasses}
      href={cvHref}
      target="_blank"
      rel="noopener noreferrer"
    >
      See my resume
    </a>
  );
}
