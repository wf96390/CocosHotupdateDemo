cc.Class({
    extends: cc.Component,
    
    onLoad: function() {
        //获取 ArmatureDisplay
        this._armatureDisPlay = this.getComponent(dragonBones.ArmatureDisplay)
        //获取 Armatrue
        this._armature = this._armatureDisPlay.armature()
        //添加动画监听
        this._armatureDisPlay.addEventListener(dragonBones.EventObject.FADE_IN_COMPLETE, this.animationEventHandler, this)
        this._armatureDisPlay.addEventListener(dragonBones.EventObject.FADE_OUT_COMPLETE, this.animationEventHandler, this)
    },

    walk: function() {
         //动画执行方式一
         this._armature.animation.fadeIn('walk', -1, -1, 0, 'hit');
    },

    jump: function() {
        //动画执行方式二
        this._armatureDisPlay.playAnimation('jump', 1);
    }, 

    animationEventHandler: function (event) {
        if (event.type == dragonBones.EventObject.FADE_IN_COMPLETE) {
          cc.log(event.detail.animationName + ' fade in complete');
        } else if (event.type == dragonBones.EventObject.FADE_OUT_COMPLETE) {
          cc.log(event.detail.animationName + ' fade out complete');
        }
    },

    backHall: function() {
        cc.director.loadScene('helloworld');
    },

    openPrefab: function() {
        cc.loader.loadRes('prefabA', cc.Prefab, (err, prefab) => {
            let prefabA = cc.instantiate(prefab);
            cc.find('Canvas').addChild(prefabA);
        });
    }
});
