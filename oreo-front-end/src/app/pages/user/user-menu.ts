import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: '资料设置',
    icon: 'nb-edit',
    link: '/user/profile',
  },
  // {
  //   title: '修改密码',
  //   icon: 'nb-bar-chart',
  //   link: '/user/reset-password',
  // },
  {
    title: '我的收藏',
    icon: 'nb-list',
    link: '/user/collection',
  },
  {
    title: '我的碎片',
    icon: 'nb-star',
    link: '/user/fragment',
  },
  {
    title: '我的副本',
    icon: 'nb-star',
    link: '/user/boss',
  }
  // {
  //   title: '我的评论',
  //   icon: 'nb-bar-chart',
  //   link: '/user/comment',
  // },
];
