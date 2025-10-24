import fs from 'fs';
import path from 'path';

type Metadata = {
  title: string;
  summary?: string;
  publishedAt: string;
  updatedAt?: string;
  image?: string;
  author?: string;
  authorImg?: string;
  authorRole?: string;
  authorLink?: string;
  category?: string;
};

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  const frontMatterBlock = match![1];
  const content = fileContent.replace(frontmatterRegex, '').trim();
  const frontMatterLines = frontMatterBlock.trim().split('\n');
  const metadata: Partial<Metadata> = {};

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(': ');
    let value = valueArr.join(': ').trim();
    value = value.replace(/^['"](.*)['"]$/, '$1'); // Remove quotes
    metadata[key.trim() as keyof Metadata] = value;
  });

  return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    return [];
  }
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  return parseFrontmatter(rawContent);
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));
    return {
      metadata,
      slug,
      content,
    };
  });
}

/**
 * Get blog posts for a specific locale with fallback to French
 * @param locale - The locale to fetch posts for (default: 'fr')
 * @returns Array of blog posts
 */
export function getBlogPosts(locale: string = 'fr') {
  const blogDir = path.join(process.cwd(), 'content/blog');
  const localeDir = path.join(blogDir, locale);
  const fallbackDir = path.join(blogDir, 'fr');

  // Get posts from the requested locale
  const localePosts = getMDXData(localeDir);

  // If locale is 'fr' or we have posts, return them
  if (locale === 'fr' || localePosts.length > 0) {
    // For non-fr locales, we need to check for missing translations
    if (locale !== 'fr') {
      const localeSlugs = new Set(localePosts.map((post) => post.slug));
      const fallbackPosts = getMDXData(fallbackDir);

      // Add missing posts from fallback (fr)
      const missingPosts = fallbackPosts.filter(
        (post) => !localeSlugs.has(post.slug)
      );

      return [...localePosts, ...missingPosts];
    }

    return localePosts;
  }

  // Fallback to French if locale directory doesn't exist or is empty
  return getMDXData(fallbackDir);
}

/**
 * Get a specific blog post by slug for a locale with fallback
 * @param slug - The post slug
 * @param locale - The locale to fetch the post for (default: 'fr')
 * @returns The blog post or null if not found
 */
export function getBlogPost(slug: string, locale: string = 'fr') {
  const blogDir = path.join(process.cwd(), 'content/blog');
  const localeFilePath = path.join(blogDir, locale, `${slug}.mdx`);
  const fallbackFilePath = path.join(blogDir, 'fr', `${slug}.mdx`);

  // Try to read from the requested locale
  if (fs.existsSync(localeFilePath)) {
    const { metadata, content } = readMDXFile(localeFilePath);
    return { metadata, slug, content };
  }

  // Fallback to French
  if (fs.existsSync(fallbackFilePath)) {
    const { metadata, content } = readMDXFile(fallbackFilePath);
    return { metadata, slug, content };
  }

  return null;
}

export function getHelpPages() {
  return getMDXData(path.join(process.cwd(), 'content/help'));
}
