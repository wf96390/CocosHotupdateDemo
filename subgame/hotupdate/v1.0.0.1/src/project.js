require = function n(e, t, a) {
function r(o, c) {
if (!t[o]) {
if (!e[o]) {
var s = "function" == typeof require && require;
if (!c && s) return s(o, !0);
if (i) return i(o, !0);
var u = new Error("Cannot find module '" + o + "'");
throw u.code = "MODULE_NOT_FOUND", u;
}
var d = t[o] = {
exports: {}
};
e[o][0].call(d.exports, function(n) {
var t = e[o][1][n];
return r(t || n);
}, d, d.exports, n, e, t, a);
}
return t[o].exports;
}
for (var i = "function" == typeof require && require, o = 0; o < a.length; o++) r(a[o]);
return r;
}({
dragon: [ function(n, e, t) {
"use strict";
cc._RF.push(e, "b465bvKnixEo65m92WLl9lL", "dragon");
cc.Class({
extends: cc.Component,
onLoad: function() {
this._armatureDisPlay = this.getComponent(dragonBones.ArmatureDisplay);
this._armature = this._armatureDisPlay.armature();
this._armatureDisPlay.addEventListener(dragonBones.EventObject.FADE_IN_COMPLETE, this.animationEventHandler, this);
this._armatureDisPlay.addEventListener(dragonBones.EventObject.FADE_OUT_COMPLETE, this.animationEventHandler, this);
},
walk: function() {
this._armature.animation.fadeIn("walk", -1, -1, 0, "hit");
},
jump: function() {
this._armatureDisPlay.playAnimation("jump", 1);
},
animationEventHandler: function(n) {
n.type == dragonBones.EventObject.FADE_IN_COMPLETE ? cc.log(n.detail.animationName + " fade in complete") : n.type == dragonBones.EventObject.FADE_OUT_COMPLETE && cc.log(n.detail.animationName + " fade out complete");
},
backHall: function() {
cc.director.loadScene("helloworld");
},
openPrefab: function() {
cc.loader.loadRes("prefabA", cc.Prefab, function(n, e) {
var t = cc.instantiate(e);
cc.find("Canvas").addChild(t);
});
}
});
cc._RF.pop();
}, {} ]
}, {}, [ "dragon" ]);