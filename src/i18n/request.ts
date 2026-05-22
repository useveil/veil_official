import { getRequestConfig } from 'next-intl/server';

// 占位文件：Task 1.3 将实现完整的 next-intl 路由配置
export default getRequestConfig(async ({ locale }) => {
  return {
    locale: locale ?? 'zh',
    messages: {},
  };
});
