export default {
  path: '/userManage',
  redirect: { name: 'userManage' },
  icon: 'icongeren2',
  meta: {
    title: '用户管理'
  },
  component: () => import('@/views/layout/index'),
  children: [
    {
      hidden: true,
      path: 'userManage',
      name: 'userManage',
      meta: {
        title: '用户管理'
      },
      component: () => import('@/views/user-manage')
    }
  ]
}