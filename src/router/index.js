import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
  path: '/login',
  component: () =>
            import('@/views/login/index'),
  hidden: true
},

{
  path: '/404',
  component: () =>
            import('@/views/404'),
  hidden: true
},

// 首页
{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
    name: 'Dashboard',
    component: () =>
                import('@/views/user/list'),
    meta: {
      title: '首页',
      icon: 'dashboard'
    }
  }]
},
// 用户管理
{
  path: '/user',
  component: Layout,
  redirect: '/user/list',
  name: 'Information',
  meta: {
    title: '用户管理',
    icon: 'tree'
  },
  children: [{
    path: 'userlist',
    name: 'Userlist',
    component: () =>
                import('@/views/user/list'),
    meta: {
      title: '用户列表',
      icon: 'dashboard'
    }
  }]
},
// 轮播图
// {
//   path: '/system',
//   component: Layout,
//   redirect: '/system/msg',
//   meta: {
//     title: '轮播图',
//     icon: 'tree'
//   },
//   children: [{
//     path: 'flashView',
//     component: () =>
//                 import('@/views/flashView/list'),
//     meta: {
//       title: '轮播图',
//       icon: 'dashboard'
//     }
//   }]
// },
// 团队管理
// {
//     path: '/team',
//     component: Layout,
//     redirect: '/team/list',
//     children: [{
//         path: 'teamlist',
//         name: 'Teamlist',
//         component: () =>
//             import ('@/views/team/list'),
//         meta: {
//             title: '团队管理',
//             icon: 'dashboard'
//         }
//     }]
// },
// 投诉管理
// {
//   path: '/complaint',
//   component: Layout,
//   redirect: '/complaint/list',
//   children: [{
//     path: 'complaintlist',
//     name: 'Complaintlist',
//     component: () =>
//                 import('@/views/complaint/list'),
//     meta: {
//       title: '投诉管理',
//       icon: 'dashboard'
//     }
//   }]
// },
// 升级审核表
// {
//   path: '/apply',
//   component: Layout,
//   redirect: '/apply/list',
//   children: [{
//     path: 'applylist',
//     name: 'Applylist',
//     component: () =>
//                 import('@/views/apply/list'),
//     meta: {
//       title: '升级审核',
//       icon: 'dashboard'
//     }
//   }]
// },
// 升级订单表
// {
//   path: '/order',
//   component: Layout,
//   redirect: '/order/list',
//   children: [{
//     path: 'orderlist',
//     name: 'Orderlist',
//     component: () =>
//                 import('@/views/order/list'),
//     meta: {
//       title: '升级订单',
//       icon: 'dashboard'
//     }
//   }]
// },
// 球队列表
{
  path: '/basketballTeam',
  component: Layout,
  redirect: '/basketballTeam/list',
  children: [{
    path: 'basketballTeamlist',
    name: 'BasketballTeamlist',
    component: () =>
                import('@/views/basketballTeam/list'),
    meta: {
      title: '球队列表',
      icon: 'dashboard'
    }
  }]
},

// 短信管理
{
  path: '/message',
  component: Layout,
  redirect: '/message/list',
  children: [{
    path: 'messagelist',
    name: 'Messagelist',
    component: () =>
                import('@/views/message/list'),
    meta: {
      title: '短信管理',
      icon: 'dashboard'
    }
  }]
},
// 赛区管理
{
  path: '/competitionArea',
  component: Layout,
  redirect: '/competitionArea/list',
  children: [{
    path: 'competitionArealist',
    name: 'CompetitionArealist',
    component: () =>
                import('@/views/competitionArea/list'),
    meta: {
      title: '赛区管理',
      icon: 'dashboard'
    }
  }]
},
// 地址管理
// {
//     path: '/address',
//     component: Layout,
//     redirect: '/address/list',
//     children: [{
//         path: 'addresslist',
//         name: 'Addresslist',
//         component: () =>
//             import ('@/views/address/list'),
//         meta: {
//             title: '用户地址',
//             icon: 'dashboard'
//         }
//     }]
// },
// 图库类型
// {
//   path: '/galleryType',
//   component: Layout,
//   redirect: '/galleryType/list',
//   children: [{
//     path: 'galleryTypelist',
//     name: 'GalleryTypelist',
//     component: () =>
//                 import('@/views/galleryType/list'),
//     meta: {
//       title: '图库类型',
//       icon: 'dashboard'
//     }
//   }]
// },
// 图库
// {
//     path: '/gallery',
//     component: Layout,
//     redirect: '/gallery/list',
//     children: [{
//         path: 'gallerylist',
//         name: 'Gallerylist',
//         component: () =>
//             import ('@/views/gallery/list'),
//         meta: {
//             title: '图库',
//             icon: 'dashboard'
//         }
//     }]
// },
// 等级
// {
//   path: '/rank',
//   component: Layout,
//   redirect: '/rank/list',
//   children: [{
//     path: 'ranklist',
//     name: 'Ranklist',
//     component: () =>
//                 import('@/views/rank/list'),
//     meta: {
//       title: '等级限制修改',
//       icon: 'dashboard'
//     }
//   }]
// },
// 帮忙注册
// {
//     path: '/dragDown',
//     component: Layout,
//     redirect: '/dragDown/list',
//     children: [{
//         path: 'dragDownlist',
//         name: 'DragDownlist',
//         component: () =>
//             import ('@/views/dragDown/list'),
//         meta: {
//             title: '帮忙注册',
//             icon: 'dashboard'
//         }
//     }]
// },
// 组织架构
// {
//     path: '/tree',
//     component: Layout,
//     redirect: '/tree/list',
//     children: [{
//         path: 'treelist',
//         name: 'Treelist',
//         component: () =>
//             import ('@/views/tree/list'),
//         meta: {
//             title: '组织架构',
//             icon: 'dashboard'
//         }
//     }]
// },
// 其他
// {
//   path: '/other',
//   component: Layout,
//   redirect: '/other/link',
//   name: 'Other',
//   meta: {
//     title: '其他',
//     icon: 'tree'
//   },
//   children: [{
//     path: 'linklist',
//     name: 'Linklist',
//     component: () =>
//                     import('@/views/other/link'),
//     meta: {
//       title: '友情链接',
//       icon: 'dashboard'
//     }
//   },
//   {
//     path: 'announcement',
//     name: 'Announcement',
//     component: () =>
//                     import('@/views/other/announcement'),
//     meta: {
//       title: '公告',
//       icon: 'dashboard'
//     }
//   },
//   {
//     path: 'logo',
//     name: 'Logo',
//     component: () =>
//                     import('@/views/other/logo'),
//     meta: {
//       title: '登录页图片',
//       icon: 'dashboard'
//     }
//   },
//   {
//     path: 'background',
//     name: 'Background',
//     component: () =>
//                     import('@/views/other/background'),
//     meta: {
//       title: '登录页背景图片',
//       icon: 'dashboard'
//     }
//   },
//   {
//     path: 'timeOpen',
//     name: 'TimeOpen',
//     component: () =>
//                     import('@/views/other/timeOpen'),
//     meta: {
//       title: '修改时间/开关',
//       icon: 'dashboard'
//     }
//   }
//   ]
// },
// 404 page must be placed at the end !!!
{
  path: '*',
  redirect: '/404',
  hidden: true
}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
