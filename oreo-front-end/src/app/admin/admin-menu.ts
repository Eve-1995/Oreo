import { NbMenuItem } from '@nebular/theme';
import { pre_items } from '../others/menu';

export const MENU_ITEMS: NbMenuItem[] = [
  ...pre_items,
  {
    title: '类别管理',
    icon: 'nb-bar-chart',
    link: '/admin/classification',
  },
  {
    title: '文章管理',
    icon: 'nb-bar-chart',
    link: '/admin/article',
  },
  {
    title: '用户管理',
    icon: 'nb-bar-chart',
    link: '/admin/user',
  },
];
