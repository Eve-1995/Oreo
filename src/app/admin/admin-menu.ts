import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: '/user',
    link: '/user',
  }, {
    title: '/auth',
    link: '/auth',
  }, {
    title: '类别管理',
    icon: 'nb-bar-chart',
    link: '/admin/classification',
  }, {
    title: '文章管理',
    icon: 'nb-bar-chart',
    link: '/admin/article',
  },
];
