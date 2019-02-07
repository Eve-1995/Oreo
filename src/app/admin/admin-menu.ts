import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: '/user/article',
    link: '/user/article',
    queryParams: { id: 1 },
  }, {
    title: '类别管理',
    icon: 'nb-bar-chart',
    link: '/admin/classification',
  }, {
    title: '文章管理',
    icon: 'nb-bar-chart',
    link: '/admin/article',
  }, {
    title: '用户登陆',
    icon: 'nb-bar-chart',
    link: '/auth/login',
  },
];
