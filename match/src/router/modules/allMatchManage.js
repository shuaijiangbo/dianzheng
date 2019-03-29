export default {
  path: '/allMatchManage',
  redirect: { name: 'allMatchManage' },
  icon: 'iconsaishi',
  meta: {
    title: '总赛事管理'
  },
  component: () => import('@/views/layout/index'),
  children: [
    {
      hidden: true,
      path: '',
      name: 'allMatchManage',
      meta: {
        title: '总赛事管理'
      },
      component: () => import('@/views/all-match-manage')
    }
  ]
}