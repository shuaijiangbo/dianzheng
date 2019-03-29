export default {
  path: '/signupManage',
  hidden: true,
  redirect: { name: 'signupManage' },
  icon: 'group',
  meta: {
    title: '报名管理'
  },
  component: () => import('@/views/layout/index'),
  children: [
    {
      path: ':eventId',
      name: 'signupManage',
      meta: {
        title: '报名管理'
      },
      component: () => import('@/views/signup-manage')
    },
  ]
}