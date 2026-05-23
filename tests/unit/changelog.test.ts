import { getAllChangelogs, getChangelogBySlug } from '@/lib/changelog';
import { describe, expect, it } from 'vitest';

describe('changelog parser', () => {
  it('读取所有 MDX 文件并按日期倒序', async () => {
    const entries = await getAllChangelogs();
    expect(entries.length).toBeGreaterThan(0);
    for (let i = 1; i < entries.length; i++) {
      expect(entries[i - 1].date.localeCompare(entries[i].date)).toBeGreaterThanOrEqual(0);
    }
  });

  it('frontmatter 字段齐全', async () => {
    const entries = await getAllChangelogs();
    for (const entry of entries) {
      expect(entry.version).toBeTruthy();
      expect(entry.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(entry.title.zh).toBeTruthy();
      expect(entry.title.en).toBeTruthy();
      expect(['stable', 'rc', 'beta']).toContain(entry.channel);
    }
  });

  it('按 slug 查找', async () => {
    const entry = await getChangelogBySlug('0.1.0-rc');
    expect(entry).not.toBeNull();
    expect(entry?.version).toBe('0.1.0-rc');
  });

  it('找不到时返回 null', async () => {
    expect(await getChangelogBySlug('non-existent')).toBeNull();
  });
});
