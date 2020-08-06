// 配置API接口地址
const timeStamp=Math.round(new Date().getTime()/1000);
export default {
    root                  : process.env.API_HOST,               // 代理 
       // root               : window.location.protocol+"//"+window.location.hostname+'/',// 上线；
    appid                 : 2,                                  // appid
    appsecret             : 123456,                             // 密码
    timeStamp             : timeStamp,                          // 时间戳
    wxParams              : 'mobileAdmin/wxParams',             // 验证微信
    roleType              : 'mobileAdmin/roleType',             // 登录角色
    cart                  : 'mobileAdmin/cart',                 // 登录角色
    login                 : 'mobileAdmin/login',                // 登录
    logout                : 'mobileAdmin/logout',               // 退出登录
    supplier              : 'mobileAdmin/supplier',             // 供应商
    searchItem            : 'mobileAdmin/searchItem',           // 询价搜索商品
    enquiry               : 'mobileAdmin/enquiry',              // 询价点击商品
    mine                  : 'mobileAdmin/mine',                 // 我的
    // 采购端
    buyerIndex            : 'mobileAdmin/buyerIndex',           // 首页
    buyerItemList         : 'mobileAdmin/buyerItemList',        // 采购
    buyerInputPrice       : 'mobileAdmin/buyerInputPrice',      // 采购点击完成
    buyerList             : 'mobileAdmin/buyerList',            // 采购单
    buyerListDetail       : 'mobileAdmin/buyerListDetail',      // 采购单详情
    buyerModifyPassword   : 'mobileAdmin/buyerModifyPassword',  // 修改密码
    buyerMonthBill        : 'mobileAdmin/buyerMonthBill',       // 月账单
    // 供应商端
    supplierIndex         : 'mobileAdmin/supplierIndex',        // 首页
    supplierItemList      : 'mobileAdmin/supplierItemList',     // 备货
    supplierInputPrice    : 'mobileAdmin/supplierInputPrice',   // 备货点击完成
    supplierList          : 'mobileAdmin/supplierList',         // 供应单
    supplierListDetail    : 'mobileAdmin/supplierListDetail',   // 供应单详情
    supplierModifyPassword   : 'mobileAdmin/supplierModifyPassword',  // 修改密码
    supplierMonthBill     : 'mobileAdmin/supplierMonthBill',    // 月账单
    // 司机端
    vehicleIndex          : 'mobileAdmin/vehicleIndex',         // 首页
    vehicleList           : 'mobileAdmin/vehicleList',          // 配送单
    vehicleOrderList      : 'mobileAdmin/vehicleOrderList',     // 订单列表
    vehicleListDetail     : 'mobileAdmin/vehicleListDetail',    // 订单详情
    vehicleBindOrder      : 'mobileAdmin/vehicleBindOrder',     // 订单绑定
    vehicleModifyOrderStatus : 'mobileAdmin/vehicleModifyOrderStatus',// 确认收货
    vehicleLine           : 'mobileAdmin/vehicleLine',          // 配送线路
    vehicleModifyPassword : 'mobileAdmin/vehicleModifyPassword',// 修改密码
    vehicleCarPosition    : 'mobileAdmin/vehicleCarPosition',   // 车辆位置
    // 管理端
    adminIndexCount       : 'mobileAdmin/adminIndexCount',      // 首页图表
    adminIndex            : 'mobileAdmin/adminIndex',           // 首页统计
    adminProfit           : 'mobileAdmin/adminProfit',          // 毛利
    adminProfitDetail     : 'mobileAdmin/adminProfitDetail',    // 毛利明细
    adminList             : 'mobileAdmin/adminList',            // 用户
    adminListDetail       : 'mobileAdmin/adminListDetail',      // 用户明细
    adminPurchaseCount    : 'mobileAdmin/adminPurchaseCount',   // 采购
    adminModifyPassword   : 'mobileAdmin/adminModifyPassword',  // 修改密码
    adminRowList          : 'mobileAdmin/adminRowList',         // 操作记录
    
    // 业务端
    salesmanIndex         : 'mobileAdmin/salesmanIndex',        // 首页
    salesmanList          : 'mobileAdmin/salesmanList',         // 配送单
    salesmanOrderList     : 'mobileAdmin/salesmanOrderList',    // 订单列表
    salesmanListDetail    : 'mobileAdmin/salesmanListDetail',   // 订单详情
    salesmanModifyOrderStatus : 'mobileAdmin/salesmanModifyOrderStatus',// 确认审核
    salesmanMemberList    : 'mobileAdmin/salesmanMemberList',   // 用户列表
    salesmanMemberCreate  : 'mobileAdmin/salesmanMemberCreate', // 添加用户
    salesmanMember        : 'mobileAdmin/salesmanMember',       // 用户编辑信息
    salesmanMemberUpdate  : 'mobileAdmin/salesmanMemberUpdate', // 保存用户编辑信息
    memberParams          : 'mobileAdmin/memberParams',         // 用户列表下拉
    salesmanModifyPassword   : 'mobileAdmin/salesmanModifyPassword',   // 修改密码
    salesmanMonthBill     : 'mobileAdmin/salesmanMonthBill',   // 月账单
    salesmanGathering     : 'mobileAdmin/salesmanGathering',    // 我要收款
    saleQrcode            : 'mobileAdmin/saleQrcode',           // 二维码
    baseURL               : '',
};