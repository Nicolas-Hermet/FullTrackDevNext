import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import PostLink from './link';
import PostImage from './image';
import rehypePrettyCode from 'rehype-pretty-code';
import Youtube from '@/components/youtube';
import Tweet from '@/components/tweet';

const transformToSlug = (input: string) =>
  input
    .toLowerCase()
    .trim()
    .split(' ')
    .join('-')
    .split('&')
    .join('-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');

const generateHeading =
  (headingLevel: number) =>
  ({ children }: { children: React.ReactNode }) => {
    const textContent = React.Children.toArray(children).join('');
    const slug = transformToSlug(textContent);
    return React.createElement(`h${headingLevel}`, { id: slug }, [
      React.createElement('a', {
        href: `#${slug}`,
        key: `link-${slug}`,
        className: 'anchor-link',
      }),
      textContent,
    ]);
  };

const mdxComponents = {
  h1: generateHeading(1),
  h2: generateHeading(2),
  h3: generateHeading(3),
  h4: generateHeading(4),
  Link: PostLink,
  Image: PostImage,
  Youtube,
  Tweet,
};

/* eslint-disable  @typescript-eslint/no-explicit-any */

export function CustomMDX(props: any) {
  const rehypePrettyCodeOptions = {
    theme: 'one-dark-pro',
    keepBackground: false,
    onVisitLine(node: any) {
      // Prevent lines from collapsing in `display: grid` mode, and
      // allow empty lines to be copy/pasted
      if (node.children.length === 0) {
        node.children = [{ type: 'text', value: ' ' }];
      }
    },
    onVisitHighlightedLine(node: any) {
      // Each line node by default has `class="line"`.
      node.properties.className.push('line--highlighted');
    },
    onVisitHighlightedWord(node: any) {
      // Each word node has no className by default.
      node.properties.className = ['word--highlighted'];
    },
  };

  /* eslint-enable  @typescript-eslint/no-explicit-any */

  return (
    <MDXRemote
      {...props}
      components={{ ...mdxComponents, ...(props.components || {}) }}
      options={{
        mdxOptions: {
          rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
        },
      }}
    />
  );
}
