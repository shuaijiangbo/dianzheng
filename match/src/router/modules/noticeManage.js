export default {
  path: '/noticeManage',
  hidden: true,
  redirect: { name: 'noticeManage' },
  icon: 'group',
  meta: {
    title: '赛事通知'
  },
  component: () => import('@/views/layout/index'),
  children: [
    {
      path: ':eventId',
      name: 'noticeManage',
      meta: {
        title: '赛事通知'
      },
      component: () => import('@/views/notice-manage')
    },
  ]
}