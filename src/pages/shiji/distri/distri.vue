<template>
	<article class="main">
		<article class="adminis_ti">
			<section class="adminis_tio">配送规划</section>
		</article>
		<section class="adminis_tih"></section>
		<section class="adminis_gd"></section>

		<article class="adminisdi_w">按住列表左侧圆圈并上下拖动，即可调整配送顺序</article>
		<article class="adminisdi_list">
			<ol id="foo">
				<template v-for="(vehicleLine, index) in vehicleLine">
					<li :data-id="vehicleLine.id">
						<div>
							<div>
								<dfn class="my-handle">{{ vehicleLine.nickname.substring(0,1) }}</dfn>
								<cite>{{ vehicleLine.nickname }}</cite>
								<i @click="vehicleLineClick(vehicleLine)" class="fa fa-reorder"></i>
							</div>

							<div class="adminisdi_item_list" v-if="vehicleLineid == vehicleLine.id">
								<div style="max-width: 80%;">
									<div class="adminisdi_item">
										<div>
											<i class="fa fa-user"></i>
										</div>
										<div class="adminisdi_item_name">
											{{vehicleLine.attr.contact}}
										</div>
									</div>
									<div class="adminisdi_item">
										<div>
											<i class="fa fa-phone"></i>
										</div>
										<div class="adminisdi_item_name" @click="callPhone(vehicleLine.attr.phone)">
											{{vehicleLine.attr.phone}}
										</div>
									</div>
									<div class="adminisdi_item">
										<div>
											<i class="fa fa-map-marker"></i>
										</div>
										<div class="adminisdi_item_name">
											{{vehicleLine.attr.address}}
										</div>
									</div>
								</div>
								<div class="location_box">
									<div class="location" @click="mapClick(vehicleLine)">
										<i class="fa fa-location-arrow"></i> 导航
									</div>
								</div>
							</div>

						</div>

					</li>
				</template>
			</ol>
		</article>
		<section class="placewr_ws"><img src="../../../../static/img/adminis_pic9.png" alt="" /><cite>亲，目前暂无数据～</cite></section>

		<judge></judge>
		<footerw></footerw>
		<weiapi></weiapi>
	</article>
</template>
<style>

</style>
<script>
	import APIUrl from '../../../../config/apiurl'
	import * as types from '../../../../config/types'

	export default {
		components: {
			'footerw': () =>
				import('../public/footerw.vue'), // 底部导航
			'judge': () =>
				import('../public/judge.vue'), // 判断加背景颜色
			'weiapi': () =>
				import('../../login/weiapi.vue'), // 验证微信
		},
		data() {
			return {
				vehicleLine: [], // 采购单
				vehicleLineid: '',
			}
		},
		methods: {
			callPhone(phoneNumber) {
				window.location.href = 'tel://' + phoneNumber
			},
			vehicleLineClick(data) {
				if(this.vehicleLineid != data.id) {
					this.vehicleLineid = data.id;
				} else if(this.vehicleLineid == data.id) {
					this.vehicleLineid = '';
				}
			},
			mapClick(data) {
				if(data.latitude == '' && data.longitude == '') {
					this.$Toast({
						message: '该用户没有定位信息',
						duration: 1000
					});
				} else {
					var add = {};
					let x_pi = 3.14159265358979324 * 3000.0 / 180.0;
					let x = data.longitude - 0.0065;
					let y = data.latitude - 0.006;
					let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
					let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
					add.lngs = z * Math.cos(theta);
					add.lats = z * Math.sin(theta);
					wx.openLocation({
						latitude: Number(add.lats), // 纬度，浮点数，范围为90 ~ -90
						longitude: Number(add.lngs), // 经度，浮点数，范围为180 ~ -180。
						name: data.nickname, // 位置名
						address: data.attr.address, // 地址详情说明
						scale: 15, // 地图缩放级别,整形值,范围从1~28。默认为最大
						infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
					});
				}
			},
		},
		mounted() {
			(function() {
				var console = window.console;
				Sortable.create(foo, {
					group: "words",
					animation: 150,
					handle: ".my-handle",
					store: {
						get: function(sortable) {
							var order = localStorage.getItem(sortable.options.group);
							return order ? order.split('|') : [];
						},
						set: function(sortable) {
							var order = sortable.toArray();
							localStorage.setItem("create", order.join('|'));
							var shjian = new Date().getTime() + 5 * 60 * 60 * 1000;
							localStorage.setItem("xianlu", shjian);
						}
					},
					onAdd: function(evt) {
						// console.log('onAdd.foo:', [evt.item, evt.from]); 
					},
					onUpdate: function(evt) {
						// console.log('onUpdate.foo:', [evt.item, evt.from]); 
					},
					onRemove: function(evt) {
						// console.log('onRemove.foo:', [evt.item, evt.from]); 
					},
					onStart: function(evt) {
						// console.log('onStart.foo:', [evt.item, evt.from]);
					},
					onSort: function(evt) {
						// console.log('onStart.foo:', [evt.item, evt.from]);
					},
					onEnd: function(evt) {
						// console.log('onEnd.foo:', [evt.item, evt.from]);
					}
				});
			})();
		},
		created() {
			this.$Indicator.open('加载中...');
			// 获取采购单列表
			let sign = this.$md5('appid=' + APIUrl.appid + '&timeStamp=' + APIUrl.timeStamp + APIUrl.appsecret);
			this.$get(APIUrl.vehicleLine, {
					appid: APIUrl.appid,
					timeStamp: APIUrl.timeStamp,
					page: 1,
					sign: sign
				})
				.then((response) => {
					this.$Indicator.close();
					if(response.code == 401) {
						let signw = this.$md5('appid=' + APIUrl.appid + '&timeStamp=' + APIUrl.timeStamp + APIUrl.appsecret);
						this.$get(APIUrl.logout, {
								appid: APIUrl.appid,
								timeStamp: APIUrl.timeStamp,
								sign: signw
							})
							.then((response) => {
								this.$Toast({
									message: '请重新登录',
									duration: 1000
								});
								setTimeout(() => {
									this.$store.commit(types.LOGOUT)
									this.$router.push("/");
								}, 1500)
							});
						return false
					} else if(response.code == 200) {
						if(response.data.length != 0) {
							// 排序
							var yourString = localStorage.getItem('create');
							var xianlu = localStorage.getItem('xianlu');
							if(yourString != null) {
								if(new Date().getTime() >= xianlu) {
									localStorage.removeItem("create");
									localStorage.removeItem("xianlu");
									this.vehicleLine = response.data;
								} else {
									var result = yourString.split("|");
									if(response.data.length == result.length) {
										for(var i = 0; i < result.length; i++) {
											var id = result[i];
											for(var w = 0; w < response.data.length; w++) {

												if(id == response.data[w].id) {
													this.vehicleLine.push(response.data[w]);
												}
											}
										}
									} else {
										this.vehicleLine = response.data;
									}
								}
							} else {
								this.vehicleLine = response.data;
							}
						} else {
							$(".placewr_ws").show();
						}
					}
				});
		}
	}
</script>