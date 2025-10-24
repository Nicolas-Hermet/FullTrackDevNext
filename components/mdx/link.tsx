import { Link } from '@/i18n/routing';

interface PostLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function PostLink({ href, ...props }: PostLinkProps) {
  return (
    <Link href={href} {...props}>
      {props.children}
    </Link>
  );
}
