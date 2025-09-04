import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const productsDir = path.join(process.cwd(), 'public', 'products');

export function getProductSlugs() {
  const directoryExists = fs.existsSync(productsDir);
  if (!directoryExists) {
    return [];
  }
  return fs
    .readdirSync(productsDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

export function getProductBySlug(slug) {
  try {
    const fullPath = path.join(productsDir, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const processedContent = remark()
      .use(html)
      .processSync(content || '');
    const contentHtml = processedContent.toString();

    return {
      slug,
      contentHtml,
      ...data,
    };
  } catch (error) {
    // Fail-safe: log and return a minimal object so pages don't crash
    console.error(`Failed to parse product slug: ${slug}`, error);
    return {
      slug,
      title: slug,
      bannerCover: '/products/PLACEHOLDER/placeholder.webp',
      contentHtml: '',
    };
  }
}
