import { NbMenuItem } from '@nebular/theme';
/**
 * 此处增加了一个隐藏的'占位'菜单,是因为菜单组件本是针对URL的导航,所以点击谁谁就会高亮并跳转.在此处,我将菜单组件用来作为文章的展示,URL都是一样的,只是参数不同,会导致只有第一个菜单是高亮的,其余的无论如何点击都不会高亮.因此,使用一个占位菜单,占据高亮效果.
 */
export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: '/admin/classification',
    link: '/admin/classification',
  },
  {
    title: '占位',
    link: '/user/article',
    hidden: true,
  },
  {
    title: 'Angular',
    children: [
      {
        title: '拦截器',
        link: '/user/article',
        queryParams: { id: 1 },
      },
      {
        title: 'Http',
        link: '/user/article',
        queryParams: { id: 2 },
      },
      {
        title: '指令',
        link: '/user/article',
        queryParams: { id: 3 },
      },
      {
        title: '组件',
        link: '/user/article',
        queryParams: { id: 4 },
      },
    ],
  },
  {
    title: 'Vue',
    children: [
      {
        title: 'v-if',
        link: '/user/article',
        queryParams: { id: 5 },
      },
      {
        title: 'v-bind',
        link: '/user/article',
        queryParams: { id: 6 },
      },
      {
        title: 'v-todoList',
        link: '/user/article',
        queryParams: { id: 7 },
      },
    ],
  },
];
