import { cn } from '@/lib/utils';
import { describe, expect, it } from 'vitest';

describe('cn()', () => {
  it('合并多个 class 字符串', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
  });

  it('用 tailwind-merge 去除重复规则（后者覆盖前者）', () => {
    expect(cn('p-4', 'p-2')).toBe('p-2');
  });

  it('忽略 falsy 值', () => {
    expect(cn('text-sm', false, null, undefined, '')).toBe('text-sm');
  });

  it('支持条件对象', () => {
    expect(cn({ 'opacity-50': true, hidden: false })).toBe('opacity-50');
  });
});
