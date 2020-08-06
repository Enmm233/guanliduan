<template>
	<article class="main">
		<article class="adminis_ti adminis_ti1">
			<section class="adminis_tio">采购</section>
			<section class="adminis_tir">
				<a href="javascript:void(0);" @click.navicon="adminispu_gys">供应商</a>
			</section>
		</article>
		<article class="adminispu_se">
			<form @submit.prevent="submit" action="">
				<section class="adminispo_sel adminisdl_sel adminisdl_sel1">
					<section class="adminisdl_sel_b">
						<input type="text" class="adminispu_seb_zdi" autocomplete="off">
						<cite class="adminispu_seb_zd1" @click.navicon=""><dfn>置顶</dfn></cite>
						<input type="text" name="send_time" placeholder="创建时间" id="start_date" autocomplete="off" readonly>
					</section>
					<button type="submit"><i class="iconfont  icon-sousuo"></i></button>
				</section>
			</form>
		</article>
		<section class="adminispu_seh"></section>
		<section class="adminis_gd"></section>

		<article class="adminispu_list adminiszd_list">
			<ol>
				<template v-for="(buyerlist, index) in buyerlist">
					<li>
						<section class="adminispu_list_ba">
							<section class="adminispu_list_ti"><dfn></dfn><cite>{{ buyerlist.title }}</cite><em>{{ buyerlist.supplier_name }}</em></section>
							<section class="adminispu_list_ad">
								<template v-if="buyerlist.attr_title==''">
									<address><aside>规格</aside><dfn>/</dfn></address>
								</template>
								<template v-else>
									<address><aside>规格</aside><dfn>{{ buyerlist.attr_title }}</dfn></address>
								</template>
								<address><aside>需采量</aside><dfn>{{ buyerlist.amount }}{{ buyerlist.unit }}</dfn></address>
								<!-- <address><aside>备注</aside><dfn>{{ buyerlist.remark }}</dfn></address>-->
								<div class="remark_box">
									<div class="remark_name">备注</div>
									<div class="remark_txt">{{ buyerlist.remark }}</div>
									<div class="remark_btn" @click="remark_btn(buyerlist.remark_type,index)">展开</div>
								</div>
								<div class="remark_conceal_box" v-if="buyerlist.remark_type">
									<div class="remark_conceal" v-for="(remarks,index) in buyerlist.remark.split(',')">
										<span>采购量：{{remarks.split("（")[0]}}</span>
										<span v-if="remarks.substring(remarks.indexOf('（') + 1, remarks.indexOf('）')) != ''" style="color:#999;">备注：{{remarks.substring(remarks.indexOf("（") + 1, remarks.indexOf("）"))}}</span>
									</div>
								</div>
							</section>
							<section class="adminispu_list_in">
								<input type="text" placeholder="数量" class="appadqd_list_in" autocomplete="off">
								<input type="text" placeholder="单价" class="appadqd_list_in1" autocomplete="off">
								<input type="text" placeholder="合计" class="appadqd_list_in2" autocomplete="off">
								<button type="button" @click.navicon="adminispu_list_in" :data-id="buyerlist.list_id" :data-index="index">完成</button>
							</section>
						</section>
						<section class="adminis_gd1"></section>
					</li>
				</template>
			</ol>
		</article>

		<section class="placewr_ws"><img src="../../../../static/img/adminis_pic9.png" alt="" /><cite>亲，目前暂无数据～</cite></section>

		<!-- 遮罩 -->
		<article class="adminis_zo" @click.navicon="adminis_zo"></article>
		<article class="adminispu_gy">
			<cite>供应商选择</cite>
			<mt-checklist v-model="value" :options="options" @change="checkon">
			</mt-checklist>
		</article>

		<judge></judge>
		<footerw></footerw>
	</article>
</template>
<script>
	import APIUrl from '../../../../config/apiurl'
	import * as types from '../../../../config/types'

	export default {
		components: {
			'footerw': () =>
				import('../public/footerw.vue'), // 底部导航
			'judge': () =>
				import('../public/judge.vue'), // 判断加背景颜色
		},
		data() {
			return {
				// 存放所选选项
				value: [],
				// 供应商列表 checklist设置
				options: [],
				buyerlist: [], // 采购列表
			}
		},
		methods: {
			remark_btn(data,index) { //判断当前是否打开备注
				for(var i=0;i<this.buyerlist.length;i++){
					this.buyerlist[i].remark_type = false;
				}
				if(data == false) {
					this.buyerlist[index].remark_type = true;
				} else {
					this.buyerlist[index].remark_type = false;
				}

			},
			// 获取当前时间函数
			timeFormate() {
				let timeStamp = new Date()
				let year = new Date(timeStamp).getFullYear();
				let month = new Date(timeStamp).getMonth() + 1 < 10 ? "0" + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1;
				let date = new Date(timeStamp).getDate() < 10 ? "0" + new Date(timeStamp).getDate() : new Date(timeStamp).getDate();
				let hh = new Date(timeStamp).getHours() < 10 ? "0" + new Date(timeStamp).getHours() : new Date(timeStamp).getHours();
				let mm = new Date(timeStamp).getMinutes() < 10 ? "0" + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes();
				// let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
				// return year + "年" + month + "月" + date +"日"+" "+hh+":"+mm ;
				$("#start_date").val(year + "-" + month + "-" + date);
//				$("#start_date").val('2019-07-01');
			},
			//表单提交
			submit: function() {
				this.$Indicator.open('加载中...');
				// 采购单
				var created_at = $("#start_date").val();
				let sign = this.$md5('appid=' + APIUrl.appid + '&timeStamp=' + APIUrl.timeStamp + APIUrl.appsecret);
				this.$get(APIUrl.buyerItemList, {
						appid: APIUrl.appid,
						created_at: created_at,
						timeStamp: APIUrl.timeStamp,
						sign: sign
					})
					.then((response) => {
						this.$Indicator.close();
						this.buyerlist = [];
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
							if(response.data.list.length != 0) {
								$(".placewr_ws").hide();
								this.buyerlist = response.data.list;
							} else {
								$(".placewr_ws").show();
							}
						}
					});
			},
			// 实时监控勾选
			checkon() {
				setTimeout(() => {
					this.$Indicator.open('加载中...');
					// 获取采购列表
					var supplier_id = this.value;
					var data = {};
					data.supplier_id = supplier_id;
					data.shjian = new Date().getTime() + 5 * 60 * 60 * 1000;
					var str = JSON.stringify(data);
					localStorage.setItem("caigou", str);
					let sign = this.$md5('appid=' + APIUrl.appid + '&timeStamp=' + APIUrl.timeStamp + APIUrl.appsecret);
					this.$get(APIUrl.buyerItemList, {
							appid: APIUrl.appid,
							supplier_id: supplier_id,
							timeStamp: APIUrl.timeStamp,
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
								this.buyerlist = [];
								if(response.data.list.length != 0) {
									this.buyerlist = response.data.list;
									$(".placewr_ws").hide();
								} else {
									$(".placewr_ws").show();
								}
							}
						});
				}, 100)
			},
			// 点击完成
			adminispu_list_in() {
				var id = event.target.getAttribute("data-id");
				var index = event.target.getAttribute("data-index");
				var num = $(".adminispu_list_in button[data-id=" + id + "]").siblings(".appadqd_list_in").val();
				var price = $(".adminispu_list_in button[data-id=" + id + "]").siblings(".appadqd_list_in1").val();
				var total = $(".adminispu_list_in button[data-id=" + id + "]").siblings(".appadqd_list_in2").val();
				if(num == '') {
					this.$Toast({
						message: '数量不能为空',
						duration: 1200
					});
					return false;
				} else if(price == '') {
					this.$Toast({
						message: '单价不能为空',
						duration: 1200
					});
					return false;
				} else if(total == '') {
					this.$Toast({
						message: '合计不能为空',
						duration: 1200
					});
					return false;
				} else {
					this.$Indicator.open('加载中...');
					let sign = this.$md5('appid=' + APIUrl.appid + '&id=' + id + '&num=' + num + '&price=' + price + '&timeStamp=' + APIUrl.timeStamp + '&total=' + total + APIUrl.appsecret);
					this.$post(APIUrl.buyerInputPrice, {
							appid: APIUrl.appid,
							id: id,
							num: num,
							price: price,
							total: total,
							timeStamp: APIUrl.timeStamp,
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
								this.$Toast({
									message: '完成',
									duration: 1200
								});
								this.buyerlist.splice(index, 1);
								if(this.buyerlist.length == 0) {
									$(".placewr_ws").show();
								}
								$(".appadqd_list_in,.appadqd_list_in1,.appadqd_list_in2").val("");
							}
						});
				}
			},
			// 显示供应商
			adminispu_gys() {
				$(".adminispu_gy,.adminis_zo").show();
			},
			// 隐藏供应商
			adminis_zo() {
				$(".adminispu_gy,.adminis_zo").hide();
			},
			// 采购列表
			buyerliste(supplier_id) {
				this.$Indicator.open('加载中...');
				// 获取采购列表
				let sign = this.$md5('appid=' + APIUrl.appid + '&timeStamp=' + APIUrl.timeStamp + APIUrl.appsecret);
				this.$get(APIUrl.buyerItemList, {
						appid: APIUrl.appid,
						supplier_id: supplier_id,
						timeStamp: APIUrl.timeStamp,
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
							if(response.data.list.length != 0) {
								this.buyerlist = response.data.list;

							} else {
								$(".placewr_ws").show();
							}
						}
					});
				// 供应商
				this.$get(APIUrl.supplier, {
						appid: APIUrl.appid,
						timeStamp: APIUrl.timeStamp,
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
							this.options = response.data;
						}
					});
			}
		},
		mounted() {
			this.timeFormate();
			// 选择时间
			var calendar = new LCalendar();
			calendar.init({
				'trigger': '#start_date', //标签id
				'type': 'date', //date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择,
				'minDate': (new Date().getFullYear() - 13) + '-' + 1 + '-' + 1, //最小日期
				'maxDate': (new Date().getFullYear() + 3) + '-' + 12 + '-' + 31 //最大日期
			});
		},
		destroyed(){
			// $("#start_date").val()=='';
		},
		created() {
			var str1 = localStorage.getItem("caigou");
			var resultw = JSON.parse(str1);
			if(resultw != null) {
				var shjian = resultw.shjian;
				if(new Date().getTime() >= shjian) {
					localStorage.removeItem("caigou");
					var supplier_id = '';
					this.buyerliste(supplier_id)
				} else {
					var supplier_id = resultw.supplier_id;
					for(var i = 0; i < supplier_id.length; i++) {
						this.value.push(supplier_id[i]);
					}
					this.buyerliste(supplier_id)
				}
			} else {
				var supplier_id = '';
				this.buyerliste(supplier_id)
			}
		}
	};
</script>