export default {
  path: '/supportManage',
  hidden: true,
  redirect: { name: 'supportManage' },
  icon: 'group',
  meta: {
    title: '赛事支持方'
  },
  component: () => import('@/views/layout/index'),
  children: [
    {
      path: ':eventId',
      name: 'supportManage',
      meta: {
        title: '赛事支持方'
      },
      component: () => import('@/views/support-manage')
    },
  ]
}