import { NbMenuItem } from '@nebular/theme';
/**
 * fix:第一个url始终高亮.
 * reason:在此处,我将菜单组件用来作为文章类别的展示,URL都是一样的,只是参数不同,所以其实全部菜单都是同一个页面,默认第一个高亮.
 * solution:增加一个隐藏的菜单进行占位.
 */
export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: '/admin',
    link: '/admin',
    home: true,
  },
  {
    title: '/auth',
    link: '/auth',
    home: true,
  },
  {
    title: '占位',
    link: '/user/article',
    hidden: true,
  },
];
