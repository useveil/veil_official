import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const CHANGELOG_DIR = path.join(process.cwd(), 'src/content/changelog');

export type ChangelogFrontmatter = {
  version: string;
  date: string;
  title: { zh: string; en: string };
  summary: { zh: string; en: string };
  channel: 'stable' | 'rc' | 'beta';
};

export type ChangelogEntry = ChangelogFrontmatter & {
  slug: string;
};

export async function getAllChangelogs(): Promise<ChangelogEntry[]> {
  const files = await fs.readdir(CHANGELOG_DIR);
  const mdxFiles = files.filter((f) => f.endsWith('.mdx'));

  const entries = await Promise.all(
    mdxFiles.map(async (file) => {
      const fullPath = path.join(CHANGELOG_DIR, file);
      const source = await fs.readFile(fullPath, 'utf-8');
      const { data } = matter(source);
      const slug = file.replace(/\.mdx$/, '');
      return { ...(data as ChangelogFrontmatter), slug };
    }),
  );

  return entries.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getChangelogBySlug(slug: string): Promise<ChangelogEntry | null> {
  const entries = await getAllChangelogs();
  return entries.find((e) => e.slug === slug) ?? null;
}
