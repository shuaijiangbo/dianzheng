import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import Page6 from './views/nav3/Page6.vue'
import Article from './views/contentManage/Article.vue'
import Atlas from './views/contentManage/Atlas'
import Attachment from './views/contentManage/Attachment'
import Column from './views/contentManage/Column'
import Video from './views/contentManage/Video'
import ContentClassify from './views/contentManage/ContentClassify'
import DataDictType from './views/contentManage/DataDictType'
import DataDict from './views/contentManage/DataDict'
import Button from './components/Button'
import echarts from './views/charts/echarts.vue'

//cms模块
import cmsIndex from './views/cms/cmsIndex.vue'

let routes = [
    {
        path: '/cms',
        component: Home,
        name: '运动员管理',
        src: './static/images/run.png',
        children: [
            { path: '/cmsIndex', component: user, name: '主页', hidden: true },
            { path: '/table', component: Table, name: 'Table' },
            { path: '/form', component: Form, name: 'Form' },
            { path: '/user', component: user, name: '列表' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '人员/组织管理',
        src: './static/images/person.png',
        children: [

        ]
    },
    {
        path: '/',
        component: Home,
        name: '赛事管理',
        src: './static/images/match.png',
        children: [

        ]
    },
    {
        path: '/',
        component: Home,
        name: '支付管理',
        src: './static/images/zhifu.png',
        children: [

        ]
    },
    {
        path: '/',
        component: Home,
        name: '成绩管理',
        src: './static/images/grade.png',
        children: [

        ]
    },
    {
        path: '/',
        component: Home,
        name: '内容管理',
        src: './static/images/content.png',
        children: [
            { path: '/classify', component: Button, name: '内容分类' },
            { path: '/column', component: Column, name: '栏目管理' },
            { path: '/article', component: Article, name: '文章管理' },
            { path: '/atlas', component: Atlas, name: '图集管理' },
            { path: '/video', component: Video, name: '视频管理' },
            { path: '/attachment', component: Attachment, name: '附件管理' },
            { path: '/dataDict', component: DataDict, name: '数据字典管理' },
            { path: '/dataDictType', component: DataDictType, name: '数据字典类型管理' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '大数据分析',
        src: './static/images/dashuju.png',
        children: [

        ]
    },
    {
        path: '/',
        component: Home,
        name: '系统管理',
        src: './static/images/shezhi.png',
        children: [

        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-id-card-o',
        leaf: true,//只有一个节点
        children: [
            { path: '/userManage', component: Page6, name: '用户管理' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-id-card-o',
        leaf: true,//只有一个节点
        children: [
            { path: '/roleManage', component: Page6, name: '角色管理' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-id-card-o',
        leaf: true,//只有一个节点
        children: [
            { path: '/departmentManage', component: Page6, name: '部门管理' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-id-card-o',
        leaf: true,//只有一个节点
        children: [
            { path: '/authManage', component: Page6, name: '权限管理' },
        ]
    },
    /*{
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },*/
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;