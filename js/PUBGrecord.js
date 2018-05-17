//============================== 全局变量 ==============================//
var domian = "http://dev.api.5v5.com";
//============================== 初始化 ==============================//
var app = new Vue({
	el: '#app',
	data: {
		colors: ['#F64F4F','#F5A623','#16C17E','#BD10E0','#0076EE','#F64FDC'],
		form: {
			user_id: '21180613',
			play_time: '1525442731'
		},
		matchInfo: {
			sFaceUrl: '',
			sNickName: '',
			lBattleTime: '',
			emBattle: '',
			iCurShowScore: '',
			iRankInDs: '',
			dTimesKill: '',		//本场击杀
			sDamageAmount: '',	//伤害量
			sHeadShotCount: '', //爆头率
			sSurvivalTime: '',	//生存时间
			sHealAmount: '',	//治疗量
			sMovingDistance: ''	//移动距离
		},
		vTag: [],	//风格标签
		vTeamInfo: []	//队友数据
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
				url: domian + "/api/game/detail/chicken",
				data: that.form,
				dataType: "json",
				headers:{
					Authorization:'Bearer 383ac2bb501ac29f6793c18dd82655b1'
	            },
				success: function(result){
					var initData = result.data;
					that.matchInfo.sFaceUrl = initData.sFaceUrl;
					that.matchInfo.sNickName = initData.sNickName;
					var time = that.format(Number(initData.lBattleTime));
					that.matchInfo.lBattleTime = time;
					that.matchInfo.emBattle = Number(initData.emBattle);
					that.matchInfo.iCurShowScore = initData.iCurShowScore;
					that.matchInfo.iRankInDs = Number(initData.iRankInDs);
					that.matchInfo.dTimesKill = initData.dTimesKill;
					that.matchInfo.sDamageAmount = initData.sDamageAmount;
					that.matchInfo.sHeadShotCount = initData.sHeadShotCount;
					that.matchInfo.sSurvivalTime = initData.sSurvivalTime;
					that.matchInfo.sHealAmount = initData.sHealAmount;
					that.matchInfo.sMovingDistance = initData.sMovingDistance;
					//本场风格标签
					if(initData.vTag.length == 0){
						that.matchInfo.vTag = 0;
					}else{
						that.matchInfo.vTag = initData.vTag;
					}
					//队友数据
					if(initData.vTeamInfo.length == 0){
						that.vTeamInfo = 0
					}else{
						that.vTeamInfo = initData.vTeamInfo;
					}
					
					that.cycle();
				}
			});
		},
		/**
		 * 循环颜色
		 */
		cycle() {
			var that = this;
			var span = document.querySelectorAll(".style-tag span");
			for(var i=0;i<span.length;i++){
				var index = i%6;
				span[i].style.borderColor = that.colors[index];
				span[i].style.color = that.colors[index];
			}
		},
		/**
		 * 格式化时间
		 */
		format(time) {
			var newDate = new Date(time);
			return (((newDate.getMonth() + 1)>9)?(newDate.getMonth() + 1):"0"+(newDate.getMonth() + 1)) + "/" + (newDate.getDate()>9?newDate.getDate():"0"+newDate.getDate());
		}
	}
});
