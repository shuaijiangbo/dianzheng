export default {
  path: '/attchManage',
  hidden: true,
  redirect: { name: 'attchManage' },
  icon: 'group',
  meta: {
    title: '赛事资料'
  },
  component: () => import('@/views/layout/index'),
  children: [
    {
      path: ':eventId',
      name: 'attchManage',
      meta: {
        title: '赛事资料'
      },
      component: () => import('@/views/attch-manage')
    },
  ]
}