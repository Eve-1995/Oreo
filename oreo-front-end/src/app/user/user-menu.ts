import { NbMenuItem } from '@nebular/theme';
import { pre_items } from '../others/menu';

export const MENU_ITEMS: NbMenuItem[] = [
  ...pre_items,
  {
    title: '个人资料',
    icon: 'nb-bar-chart',
    link: '/admin/classification',
  },
  {
    title: '重置密码',
    icon: 'nb-bar-chart',
    link: '/admin/article',
  },
  {
    title: '我的收藏',
    icon: 'nb-bar-chart',
    link: '/admin/article',
  },
  {
    title: '我的评论',
    icon: 'nb-bar-chart',
    link: '/admin/article',
  },
];
