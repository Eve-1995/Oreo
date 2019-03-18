import { NbMenuItem } from '@nebular/theme';
import { pre_items } from '../others/menu';
/**
 * fix:第一个url始终高亮.
 * reason:在此处,我将菜单组件用来作为文章类别的展示,URL都是一样的,只是参数不同,所以其实全部菜单都是同一个页面,默认第一个高亮.
 * solution:增加一个隐藏的菜单进行占位.
 */
export const MENU_ITEMS: NbMenuItem[] = [
  ...pre_items,
  {
    title: '占位',
    link: '/visit/article',
    hidden: true,
  },
];
