export default {
  path: '/scoreManage',
  hidden: true,
  redirect: { name: 'scoreManage' },
  icon: 'group',
  meta: {
    title: '发布成绩'
  },
  component: () => import('@/views/layout/index'),
  children: [
    {
      path: ':eventId',
      name: 'scoreManage',
      meta: {
        title: '发布成绩'
      },
      component: () => import('@/views/score-manage')
    },
  ]
}