//============================== 全局变量 ==============================//
var domian = "http://dev.api.5v5.com"
//============================== 初始化 ==============================//
var app = new Vue({
	el: '#app',
	data: {
		form: {
			user_id: '21180649',
			play_time: '1525438809'
		},
		matchInfo: {
			gameResult: 0, //比赛结果 1-胜利 2-失败
			useTime: 0, 	//使用时间 单位 分钟
			battleType: '',
			ourKill: 0,
			enemyKill: 0
		},
		ourBattleInfo: [], //我方数据
		enemyBattleInfo: []  //敌方数据
	},
	created() {
		this.loaddata();
	},
	methods: {
		/**
		 * 获取数据
		 */
		loaddata() {
			var that = this;
			$.ajax({
				type:"get",
				url: domian + "/api/game/detail/king",
				data: that.form,
				dataType: "json",
				headers:{
					Authorization:'Bearer 383ac2bb501ac29f6793c18dd82655b1'
	            },
				success: function(result){
					var initData = result.data;
					that.matchInfo.gameResult = initData.gameResult;
					that.matchInfo.useTime = initData.useTime;
					that.matchInfo.battleType = initData.battleType;
					that.matchInfo.ourKill = initData.ourKill;
					that.matchInfo.enemyKill = initData.enemyKill;
					that.ourBattleInfo = initData.ourBattleInfo;
					that.enemyBattleInfo = initData.enemyBattleInfo;
				}
			});
		}
	}
});
