import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// next-intl 自己的 navigation API：自动处理 locale 前缀、message 重新加载
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
