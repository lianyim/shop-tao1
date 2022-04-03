import Vue from 'vue'

export default {
	
  initTitleNav() {
    uni.getSystemInfo({
      success: function (e) {
        // #ifndef MP
        Vue.prototype.StatusBar = e.statusBarHeight;
        if (e.platform === 'android') {
          Vue.prototype.CustomBar = e.statusBarHeight + 50;
        } else {
          Vue.prototype.CustomBar = e.statusBarHeight + 45;
        }
        // #endif
        // #ifdef MP-WEIXIN
        Vue.prototype.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        Vue.prototype.Custom = custom;
        Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
        // #endif
        // #ifdef MP-ALIPAY
        // Vue.prototype.StatusBar = e.statusBarHeight;
        // Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
        // #endif
        // #ifdef MP-QQ
        Vue.prototype.StatusBar = e.statusBarHeight;
        let customQQ = qq.getMenuButtonBoundingClientRect();
        Vue.prototype.Custom = customQQ;
        Vue.prototype.CustomBar = customQQ.bottom + customQQ.top - e.statusBarHeight;
        if (e.model.indexOf("iPhone X") > -1) {
          Vue.prototype.CustomBar = 82;
        } else {
          Vue.prototype.CustomBar = 60;
        }
        // #endif
        // #ifdef MP-TOUTIAO
        // Vue.prototype.StatusBar = e.statusBarHeight;
        // let customTT = tt.getMenuButtonBoundingClientRect();
        // Vue.prototype.Custom = customTT;
        // Vue.prototype.CustomBar = customTT.bottom + customTT.top - e.statusBarHeight
        // #endif
      }
    })
  },
  initShareMenu() {
    // #ifdef MP-WEIXIN
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
	wx.getUpdateManager({
		// 在app.js里写下以下代码
		 onLaunch () {
		  if (wx.canIUse('getUpdateManager')) {
		   const updateManager = wx.getUpdateManager()
		   updateManager.onCheckForUpdate(function (res) {
		    console.log('onCheckForUpdate====', res)
		    // 请求完新版本信息的回调
		    if (res.hasUpdate) {
		     console.log('res.hasUpdate====')
		     updateManager.onUpdateReady(function () {
		      wx.showModal({
		       title: '更新提示',
		       content: '新版本已经准备好，是否重启应用？',
		       success: function (res) {
		        console.log('success====', res)
		        // res: {errMsg: "showModal: ok", cancel: false, confirm: true}
		        if (res.confirm) {
		         // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
		         updateManager.applyUpdate()
		        }
		       }
		      })
		     })
		     updateManager.onUpdateFailed(function () {
		      // 新的版本下载失败
		      wx.showModal({
		       title: '已经有新版本了哟~',
		       content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
		      })
		     })
		    }
		   })
		  }
		 }
	})
    // #endif
    // #ifdef MP-QQ
    uni.showShareMenu({
      withShareTicket: true
    })
    // #endif
  }

};
