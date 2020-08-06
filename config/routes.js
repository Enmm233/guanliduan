// 引用模板
import  '../src/pages/login/login'                       // 所有登录
import  '../src/pages/login/contact'                     // 提示
// 采购端
import  '../src/pages/caigou/index/index'                // 采购首页
import  '../src/pages/caigou/purchase/purchase'          // 采购
import  '../src/pages/caigou/purorder/purorder'          // 采购单
import  '../src/pages/caigou/purorder/purorderdetail'    // 采购单详情
import  '../src/pages/caigou/inquiry/inquiry'            // 询价
import  '../src/pages/caigou/user/user'                  // 我的
import  '../src/pages/caigou/user/change'                // 修改密码
import  '../src/pages/caigou/user/problem'               // 常见问题
import  '../src/pages/caigou/user/monthly'               // 月账单
// 供应商
import  '../src/pages/gongying/index/index'              // 供应商首页
import  '../src/pages/gongying/purchase/purchase'        // 供应
import  '../src/pages/gongying/purorder/purorder'        // 供应单
import  '../src/pages/gongying/purorder/purorderdetail'  // 供应单详情
import  '../src/pages/gongying/inquiry/inquiry'          // 询价
import  '../src/pages/gongying/user/user'                // 我的
import  '../src/pages/gongying/user/change'              // 修改密码
import  '../src/pages/gongying/user/problem'             // 常见问题
import  '../src/pages/gongying/user/monthly'             // 月账单
// 司机端
import  '../src/pages/shiji/index/index'                 // 司机端首页
import  '../src/pages/shiji/delivery/delivery'           // 配送
import  '../src/pages/shiji/delivery/deliverydetail'     // 配送详情
import  '../src/pages/shiji/order/order'                 // 订单
import  '../src/pages/shiji/order/orderdetail'           // 订单详情
import  '../src/pages/shiji/distri/distri'               // 配送路线
import  '../src/pages/shiji/user/user'                   // 我的
import  '../src/pages/shiji/user/change'                 // 采购修改密码
import  '../src/pages/shiji/user/problem'                // 常见问题
import  '../src/pages/shiji/user/vehicle'                // 车辆位置
// 管理员端
import  '../src/pages/guanli/index/index'                // 管理员端首页
import  '../src/pages/guanli/profit/profit'              // 毛利
import  '../src/pages/guanli/profit/profitdetail'        // 毛利明细
import  '../src/pages/guanli/useracc/useracc'            // 用户
import  '../src/pages/guanli/useracc/useraccdetails'     // 用户明细
import  '../src/pages/guanli/purchase/purchase'          // 采购
import  '../src/pages/guanli/user/user'                  // 我的
import  '../src/pages/guanli/user/change'                // 修改密码
import  '../src/pages/guanli/user/problem'               // 常见问题
import  '../src/pages/guanli/user/record'                // 操作记录
// 业务端
import  '../src/pages/yewu/index/index'                  // 业务端首页
import  '../src/pages/yewu/delivery/delivery'            // 配送
import  '../src/pages/yewu/delivery/deliverydetail'      // 配送详情
import  '../src/pages/yewu/order/order'                  // 订单
import  '../src/pages/yewu/order/orderdetail'            // 订单详情
import  '../src/pages/yewu/order/test'                   // 订单详情
import  '../src/pages/yewu/account/account'              // 用户列表
import  '../src/pages/yewu/account/accountadd'           // 添加用户介绍
import  '../src/pages/yewu/account/accountedit'          // 编辑用户介绍
import  '../src/pages/yewu/user/user'                    // 我的
import  '../src/pages/yewu/user/change'                  // 修改密码
import  '../src/pages/yewu/user/problem'                 // 常见问题
import  '../src/pages/yewu/user/monthly'                 // 月账单
import  '../src/pages/yewu/user/money'                   // 我要收款
import  '../src/pages/yewu/user/code'                    // 绑定二维码
import  '../src/404'                                     // 所有404

import store from './store'
import * as types from './types'

// Vue.use(VueRouter)

// 配置路由
const routes = [
  // 所有登录
  {
    path: '/',
    name:'login',
    meta: {
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/login/login.vue'], resolve),
  },
  // 采购端
  // 采购首页
  {
    path: '/caigou_index',
    name:'caigou_index',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/caigou/index/index.vue'], resolve)
  },
  // 采购
  {
    path: '/caigou_purchase',
    name:'caigou_purchase',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/caigou/purchase/purchase.vue'], resolve)
  },
  // 采购单
  {
    path: '/caigou_purorder',
    name:'caigou_purorder',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/caigou/purorder/purorder.vue'], resolve),
  },
  // 采购单详情
  {
    path: '/caigou_purorderdetail',
    name:'caigou_purorderdetail',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/caigou/purorder/purorderdetail.vue'], resolve),
  },
  // 询价
  {
    path: '/caigou_inquiry',
    name:'caigou_inquiry',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/caigou/inquiry/inquiry.vue'], resolve),
  },
  // 我的
  {
    path: '/caigou_user',
    name:'caigou_user',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/caigou/user/user.vue'], resolve),
  },
  // 修改密码
  {
    path: '/caigou_change',
    name:'caigou_change',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/caigou/user/change.vue'], resolve)
  },
  // 常见问题
  {
    path: '/caigou_problem',
    name:'caigou_problem',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/caigou/user/problem.vue'], resolve),
  },
  // 月账单
  {
    path: '/caigou_monthly',
    name:'caigou_monthly',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/caigou/user/monthly.vue'], resolve),
  },
  // 供应商
  // 供应商首页
  {
    path: '/gongying_index',
    name:'gongying_index',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/gongying/index/index.vue'], resolve)
  },
  // 供应
  {
    path: '/gongying_purchase',
    name:'gongying_purchase',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/gongying/purchase/purchase.vue'], resolve)
  },
   // 供应单
  {
    path: '/gongying_purorder',
    name:'gongying_purorder',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/gongying/purorder/purorder.vue'], resolve),
  },
  // 供应单详情
  {
    path: '/gongying_purorderdetail',
    name:'gongying_purorderdetail',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/gongying/purorder/purorderdetail.vue'], resolve),
  },
  // 询价
  {
    path: '/gongying_inquiry',
    name:'gongying_inquiry',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/gongying/inquiry/inquiry.vue'], resolve),
  },
  // 我的
  {
    path: '/gongying_user',
    name:'gongying_user',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/gongying/user/user.vue'], resolve),
  },
  // 修改密码
  {
    path: '/gongying_change',
    name:'gongying_change',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/gongying/user/change.vue'], resolve)
  },
  // 常见问题
  {
    path: '/gongying_problem',
    name:'gongying_problem',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/gongying/user/problem.vue'], resolve),
  },
  // 月账单
  {
    path: '/gongying_monthly',
    name:'gongying_monthly',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/gongying/user/monthly.vue'], resolve),
  },
  // 司机端
  // 司机端首页
  {
    path: '/shiji_index',
    name:'shiji_index',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/shiji/index/index.vue'], resolve)
  },
  // 配送
  {
    path: '/shiji_delivery',
    name:'shiji_delivery',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/shiji/delivery/delivery.vue'], resolve)
  },
  // 配送详情
  {
    path: '/shiji_deliverydetail',
    name:'shiji_deliverydetail',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/shiji/delivery/deliverydetail.vue'], resolve)
  },
  // 订单列表
  {
    path: '/shiji_order',
    name:'shiji_order',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/shiji/order/order.vue'], resolve)
  },
  // 订单详情
  {
    path: '/shiji_orderdetail',
    name:'shiji_orderdetail',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/shiji/order/orderdetail.vue'], resolve)
  },
  // 配送路线
  {
    path: '/shiji_distri',
    name:'shiji_distri',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/shiji/distri/distri.vue'], resolve)
  },
  // 我的
  {
    path: '/shiji_user',
    name:'shiji_user',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/shiji/user/user.vue'], resolve)
  },
  // 修改密码
  {
    path: '/shiji_change',
    name:'shiji_change',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/shiji/user/change.vue'], resolve)
  },
  // 常见问题
  {
    path: '/shiji_problem',
    name:'shiji_problem',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/shiji/user/problem.vue'], resolve),
  },
  // 车辆位置
  {
    path: '/shiji_vehicle',
    name:'shiji_vehicle',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/shiji/user/vehicle.vue'], resolve),
  },
  // 业务端
  // 业务端首页
  {
    path: '/yewu_index',
    name:'yewu_index',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/yewu/index/index.vue'], resolve)
  },
  // 配送
  {
    path: '/yewu_delivery',
    name:'yewu_delivery',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/yewu/delivery/delivery.vue'], resolve)
  },
  // 配送详情
  {
    path: '/yewu_deliverydetail',
    name:'yewu_deliverydetail',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/yewu/delivery/deliverydetail.vue'], resolve)
  },
  // 订单列表
  {
    path: '/yewu_order',
    name:'yewu_order',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/yewu/order/order.vue'], resolve)
  },
  // 订单详情
  {
    path: '/yewu_orderdetail',
    name:'yewu_orderdetail',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/yewu/order/orderdetail.vue'], resolve)
  },
  // 测试
  {
    path: '/yewu_test',
    name:'yewu_test',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/yewu/order/test.vue'], resolve)
  },
  // 用户列表
  {
    path: '/yewu_account',
    name:'yewu_account',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/yewu/account/account.vue'], resolve)
  },
  // 添加用户介绍
  {
    path: '/yewu_accountadd',
    name:'yewu_accountadd',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/yewu/account/accountadd.vue'], resolve)
  },
  // 编辑用户介绍
  {
    path: '/yewu_accountedit',
    name:'yewu_accountedit',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/yewu/account/accountedit.vue'], resolve)
  },
  // 我的
  {
    path: '/yewu_user',
    name:'yewu_user',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/yewu/user/user.vue'], resolve)
  },
  // 修改密码
  {
    path: '/yewu_change',
    name:'yewu_change',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/yewu/user/change.vue'], resolve)
  },
  // 常见问题
  {
    path: '/yewu_problem',
    name:'yewu_problem',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/yewu/user/problem.vue'], resolve),
  },
  // 月账单
  {
    path: '/yewu_monthly',
    name:'yewu_monthly',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/yewu/user/monthly.vue'], resolve),
  },
  // 我要收款
  {
    path: '/yewu_money',
    name:'yewu_money',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/yewu/user/money.vue'], resolve),
  },
  // 绑定二维码
  {
    path: '/yewu_code',
    name:'yewu_code',
    meta: {
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/yewu/user/code.vue'], resolve),
  },
  // 管理员端
  // 管理员端首页
  {
    path: '/guanli_index',
    name:'guanli_index',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/guanli/index/index.vue'], resolve)
  },
  // 毛利
  {
    path: '/guanli_profit',
    name:'guanli_profit',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/guanli/profit/profit.vue'], resolve),
  },
  // 毛利明细
  {
    path: '/guanli_profitdetail',
    name:'guanli_profitdetail',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/guanli/profit/profitdetail.vue'], resolve),
  },
  // 用户
  {
    path: '/guanli_useracc',
    name:'guanli_useracc',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/guanli/useracc/useracc.vue'], resolve),
  },
  // 用户明细
  {
    path: '/guanli_useraccdetails',
    name:'guanli_useraccdetails',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/guanli/useracc/useraccdetails.vue'], resolve),
  },
  // 采购
  {
    path: '/guanli_purchase',
    name:'guanli_purchase',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/guanli/purchase/purchase.vue'], resolve),
  },
  // 我的
  {
    path: '/guanli_user',
    name:'guanli_user',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/guanli/user/user.vue'], resolve),
  },
  // 修改密码
  {
    path: '/guanli_change',
    name:'guanli_change',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/guanli/user/change.vue'], resolve)
  },
  // 常见问题
  {
    path: '/guanli_problem',
    name:'guanli_problem',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/guanli/user/problem.vue'], resolve),
  },
  // 操作记录
  {
    path: '/guanli_record',
    name:'guanli_record',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/guanli/user/record.vue'], resolve),
  },
  // 提示
  {
    path: '/contact',
    name:'contact',
    meta: {
        keepAlive: false
    },
    component: (resolve) => require(['../src/pages/login/contact.vue'], resolve)
  },
  // 所有404
  {
    path: '*',
    name:'P404',
    meta: {
        requireAuth: true,
        keepAlive: false
    },
    component: (resolve) => require(['../src/404.vue'], resolve)
  }
];

// 使用配置文件规则
const router = new VueRouter({
  // 去掉#号 history hash
  mode:'hash',
  routes
});

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('tokenw')) {
  store.commit(types.LOGIN, window.localStorage.getItem('tokenw'))
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
      if (store.state.tokenw) {
          next();
      }
      else {
          next({
              path: '/',
              query: {redirect: to.fullPath}
          })
      }
  }
  else {
      next();
  }
});

export default router;
