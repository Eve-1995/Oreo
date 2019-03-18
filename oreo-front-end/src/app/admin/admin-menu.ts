import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: '菜单区',
    group: true,
  },
  {
    title: 'user module',
    link: '/user',
  },
  {
    title: 'login',
    link: '/auth/login',
    home: true,
  },
  {
    title: 'register',
    link: '/auth/register',
    home: true,
  },
  {
    title: '管理分类',
    group: true,
  },
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
];
