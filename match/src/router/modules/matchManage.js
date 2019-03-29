export default {
  path: '/matchManage',
  redirect: { name: 'matchManage' },
  icon: 'icontiyu',
  meta: {
    title: '赛事管理'
  },
  component: () => import('@/views/layout/index'),
  children: [
    {
      hidden: true,
      path: 'matchMessageManage',
      name: 'matchManage',
      meta: {
        title: '赛事信息管理'
      },
      component: () => import('@/views/match-manage')
    },
  ]
}