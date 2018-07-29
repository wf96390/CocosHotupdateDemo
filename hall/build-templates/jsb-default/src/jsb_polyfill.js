(function() {
function t(t) {
return t && t.toString && "[object CallbackConstructor]" === t.toString() ? "function" : "object";
}
(function(i, n, o) {
function r(o, c) {
var a = n[o];
if (!a) {
var l = i[o];
if (!l) {
var h = "function" == ("object" == (e = typeof require) ? t(require) : e) && require;
if (!c && h) return h(o, !0);
if (s) return s(o, !0);
var u = new Error("Cannot find module '" + o + "'");
u.code = "MODULE_NOT_FOUND";
throw u;
}
var d = {};
a = n[o] = {
exports: d
};
l[0]((function(t) {
return r(l[1][t] || t);
}), a, d);
}
return a.exports;
}
for (var s = "function" == ("object" == (e = typeof require) ? t(require) : e) && require, c = 0; c < o.length; c++) r(o[c]);
})({
1: [ (function(t, e, i) {}), {} ],
2: [ (function(t, e, i) {
function n(t, e) {
return function(i) {
"use strict";
if (1 !== arguments.length) {
var n = "";
2 === arguments.length ? n = "Arguments: " + arguments[1] : arguments.length > 2 && (n = "Arguments: " + cc.js.shiftArguments.apply(null, arguments).join(", "));
t(e + " " + i + ", please go to " + r + "#" + i + " to see details. " + n);
} else t(e + " " + i + ", please go to " + r + "#" + i + " to see details.");
};
}
var o = t("./cocos2d/core/platform/CCEnum");
cc.DebugMode = o({
NONE: 0,
INFO: 1,
WARN: 2,
ERROR: 3,
INFO_FOR_WEB_PAGE: 4,
WARN_FOR_WEB_PAGE: 5,
ERROR_FOR_WEB_PAGE: 6
});
cc._initDebugSetting = function(t) {
cc.log = cc.logID = cc.warn = cc.warnID = cc.error = cc.errorID = cc._throw = cc.assert = cc.assertID = function() {};
if (t !== cc.DebugMode.NONE) {
if (console && console.log.apply) {
console.error || (console.error = console.log);
console.warn || (console.warn = console.log);
console.error.bind ? cc.error = console.error.bind(console) : cc.error = console.error;
cc.assert = function(t, e) {
if (!t) {
e && (e = cc.js.formatStr.apply(null, cc.js.shiftArguments.apply(null, arguments)));
0;
throw new Error(e);
}
};
}
t !== cc.DebugMode.ERROR && (console.warn.bind ? cc.warn = console.warn.bind(console) : cc.warn = console.warn);
if (t === cc.DebugMode.INFO) {
"JavaScriptCore" === scriptEngineType ? cc.log = function() {
return console.log.apply(console, arguments);
} : cc.log = console.log;
cc.info = "JavaScriptCore" === scriptEngineType ? function() {
(console.info || console.log).apply(console, arguments);
} : console.info || console.log;
}
cc.warnID = n(cc.warn, "Warning");
cc.errorID = n(cc.error, "Error");
cc.logID = n(cc.log, "Log");
var e = n((function() {
for (var t = [ !1 ], e = 0; e < arguments.length; ++e) t.push(arguments[e]);
cc.assert.apply(null, t);
}), "Assert");
cc.assertID = function(t) {
"use strict";
t || e.apply(null, cc.js.shiftArguments.apply(null, arguments));
};
}
};
cc._throw = function(t) {
var e = t.stack;
e ? cc.error(t + "\n" + e) : cc.error(t);
};
var r = "https://github.com/cocos-creator/engine/blob/master/EngineErrorMap.md";
}), {
"./cocos2d/core/platform/CCEnum": 129
} ],
3: [ (function(t, e, i) {}), {} ],
4: [ (function(i, n, o) {
function r(t, e) {
a.call(this);
this.target = t;
this.animation = e;
this._anims = new c.array.MutableForwardIterator([]);
}
function s(i, n) {
function o(t) {
if (!Array.isArray(t)) return !1;
for (var e = 0, i = t.length; e < i; e++) {
var n = t[e];
if (!Array.isArray(n) || 6 !== n.length) return !1;
}
return !0;
}
function r(i, r, s) {
var a = i instanceof cc.Node && "position" === r, d = [], f = new l();
f.target = i;
var _, g = r.indexOf(".");
-1 !== g ? i[_ = r.slice(0, g)] : _ = r;
f.prop = _;
f.subProps = (function(t) {
var e = t.split(".");
e.shift();
return e.length > 0 ? e : null;
})(r);
for (var y = 0, v = s.length; y < v; y++) {
var m = s[y], C = m.frame / n.duration;
f.ratios.push(C);
if (a) {
var T = m.motionPath;
if (T && !o(T)) {
cc.errorID(3904, i.name, r, y);
T = null;
}
d.push(T);
}
var b = m.value;
f.values.push(b);
var S = m.curve;
if (S) {
if ("string" === ("object" == (e = typeof S) ? t(S) : e)) {
f.types.push(S);
continue;
}
if (Array.isArray(S)) {
S[0] === S[1] && S[2] === S[3] ? f.types.push(l.Linear) : f.types.push(l.Bezier(S));
continue;
}
}
f.types.push(l.Linear);
}
a && u(d, f, c.duration, c.sample);
for (var E, x, A = f.ratios, N = !0, O = 1, L = A.length; O < L; O++) {
E = A[O] - A[O - 1];
if (1 === O) x = E; else if (Math.abs(E - x) > 1e-6) {
N = !1;
break;
}
}
f._findFrameIndex = N ? h : p;
return f;
}
function s(t, e) {
var i = e.props, n = e.comps;
if (i) for (var o in i) {
var s = r(t, o, i[o]);
a.push(s);
}
if (n) for (var c in n) {
var l = t.getComponent(c);
if (l) {
var h = n[c];
for (var o in h) {
s = r(l, o, h[o]);
a.push(s);
}
}
}
}
var c = n.clip, a = n.curves;
a.length = 0;
n.duration = c.duration;
n.speed = c.speed;
n.wrapMode = c.wrapMode;
n.frameRate = c.sample;
(n.wrapMode & _.Loop) === _.Loop ? n.repeatCount = Infinity : n.repeatCount = 1;
var g = c.curveData, y = g.paths;
s(i, g);
for (var v in y) {
var m = cc.find(v, i);
if (m) {
s(m, y[v]);
}
}
var C = c.events;
if (C) for (var T, b = 0, S = C.length; b < S; b++) {
if (!T) {
(T = new d()).target = i;
a.push(T);
}
var E, x = C[b], A = x.frame / n.duration, N = p(T.ratios, A);
if (N >= 0) E = T.events[N]; else {
E = new f();
T.ratios.push(A);
T.events.push(E);
}
E.add(x.func, x.params);
}
}
var c = cc.js, a = i("./playable"), l = i("./animation-curves").DynamicAnimCurve, h = i("./animation-curves").quickFindIndex, u = i("./motion-path-helper").sampleMotionPaths, d = i("./animation-curves").EventAnimCurve, f = i("./animation-curves").EventInfo, _ = i("./types").WrapModeMask, p = i("../core/utils/binary-search").binarySearchEpsilon;
c.extend(r, a);
var g = r.prototype;
g.playState = function(i, n) {
if (i.clip) {
i.curveLoaded || s(this.target, i);
i.animator = this;
i.play();
"number" === ("object" == (e = typeof n) ? t(n) : e) && i.setTime(n);
this.play();
}
};
g.stopStatesExcept = function(t) {
var e = this._anims, i = e.array;
for (e.i = 0; e.i < i.length; ++e.i) {
var n = i[e.i];
n !== t && this.stopState(n);
}
};
g.addAnimation = function(t) {
-1 === this._anims.array.indexOf(t) && this._anims.push(t);
t._setListeners(this.animation);
};
g.removeAnimation = function(t) {
var e = this._anims.array.indexOf(t);
if (e >= 0) {
this._anims.fastRemoveAt(e);
0 === this._anims.array.length && this.stop();
} else cc.errorID(3908);
t.animator = null;
};
g.sample = function() {
var t = this._anims, e = t.array;
for (t.i = 0; t.i < e.length; ++t.i) {
e[t.i].sample();
}
};
g.stopState = function(t) {
t && t.stop();
};
g.pauseState = function(t) {
t && t.pause();
};
g.resumeState = function(t) {
t && t.resume();
this.isPaused && this.resume();
};
g.setStateTime = function(t, e) {
if (void 0 !== e) {
if (t) {
t.setTime(e);
t.sample();
}
} else {
e = t;
for (var i = this._anims.array, n = 0; n < i.length; ++n) {
var o = i[n];
o.setTime(e);
o.sample();
}
}
};
g.onStop = function() {
var t = this._anims, e = t.array;
for (t.i = 0; t.i < e.length; ++t.i) {
e[t.i].stop();
}
};
g.onPause = function() {
for (var t = this._anims.array, e = 0; e < t.length; ++e) {
var i = t[e];
i.pause();
i.animator = null;
}
};
g.onResume = function() {
for (var t = this._anims.array, e = 0; e < t.length; ++e) {
var i = t[e];
i.animator = this;
i.resume();
}
};
g._reloadClip = function(t) {
s(this.target, t);
};
0;
0;
n.exports = r;
}), {
"../core/utils/binary-search": 149,
"./animation-curves": 6,
"./motion-path-helper": 12,
"./playable": 13,
"./types": 14
} ],
5: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.AnimationClip",
extends: cc.Asset,
properties: {
_duration: {
default: 0,
type: "Float"
},
duration: {
get: function() {
return this._duration;
}
},
sample: {
default: 60
},
speed: {
default: 1
},
wrapMode: {
default: cc.WrapMode.Normal
},
curveData: {
default: {},
visible: !1
},
events: {
default: [],
visible: !1
}
},
statics: {
createWithSpriteFrames: function(t, e) {
if (!Array.isArray(t)) {
cc.errorID(3905);
return null;
}
var i = new n();
i.sample = e || i.sample;
i._duration = t.length / i.sample;
for (var o = [], r = 1 / i.sample, s = 0, c = t.length; s < c; s++) o[s] = {
frame: s * r,
value: t[s]
};
i.curveData = {
comps: {
"cc.Sprite": {
spriteFrame: o
}
}
};
return i;
}
}
});
cc.AnimationClip = e.exports = n;
}), {} ],
6: [ (function(i, n, o) {
function r(i, n) {
if ("string" === ("object" == (e = typeof n) ? t(n) : e)) {
var o = cc.Easing[n];
o ? i = o(i) : cc.errorID(3906, n);
} else Array.isArray(n) && (i = s(n, i));
return i;
}
var s = i("./bezier").bezierByTime, c = i("../core/utils/binary-search").binarySearchEpsilon, a = i("./types").WrapModeMask, l = i("./types").WrappedInfo, h = cc.Class({
name: "cc.AnimCurve",
sample: function(t, e, i) {},
onTimeChangedManually: void 0
}), u = cc.Class({
name: "cc.DynamicAnimCurve",
extends: h,
properties: {
target: null,
prop: "",
values: [],
ratios: [],
types: [],
subProps: null
},
_findFrameIndex: c,
sample: function(i, n, o) {
var s = this.values, c = this.ratios, a = c.length;
if (0 !== a) {
var l, h = this._findFrameIndex(c, n);
if (h < 0) if ((h = ~h) <= 0) l = s[0]; else if (h >= a) l = s[a - 1]; else {
var u = s[h - 1], d = "number" === ("object" == (e = typeof u) ? t(u) : e), f = u && u.lerp;
if (d || f) {
var _ = c[h - 1], p = c[h], g = this.types[h - 1], y = (n - _) / (p - _);
g && (y = r(y, g));
var v = s[h];
d ? l = u + (v - u) * y : f && (l = u.lerp(v, y));
} else l = u;
} else l = s[h];
var m = this.subProps;
if (m) {
for (var C = this.target[this.prop], T = C, b = 0; b < m.length - 1; b++) {
var S = m[b];
if (!T) return;
T = T[S];
}
var E = m[m.length - 1];
if (!T) return;
T[E] = l;
l = C;
}
this.target[this.prop] = l;
}
}
});
u.Linear = null;
u.Bezier = function(t) {
return t;
};
var d = function() {
this.events = [];
};
d.prototype.add = function(t, e) {
this.events.push({
func: t || "",
params: e || []
});
};
var f = cc.Class({
name: "cc.EventAnimCurve",
extends: h,
properties: {
target: null,
ratios: [],
events: [],
_wrappedInfo: {
default: function() {
return new l();
}
},
_lastWrappedInfo: null,
_ignoreIndex: NaN
},
_wrapIterations: function(t) {
t - (0 | t) == 0 && (t -= 1);
return 0 | t;
},
sample: function(t, e, i) {
var n = this.ratios.length, o = i.getWrappedInfo(i.time, this._wrappedInfo), r = o.direction, s = c(this.ratios, o.ratio);
if (s < 0) {
s = ~s - 1;
r < 0 && (s += 1);
}
this._ignoreIndex !== s && (this._ignoreIndex = NaN);
o.frameIndex = s;
if (this._lastWrappedInfo) {
var h = i.wrapMode, u = this._wrapIterations(o.iterations), d = this._lastWrappedInfo, f = this._wrapIterations(d.iterations), _ = d.frameIndex, p = d.direction, g = -1 !== f && u !== f;
if (_ === s && g && 1 === n) this._fireEvent(0); else if (_ !== s || g) {
r = p;
do {
if (_ !== s) {
if (-1 === r && 0 === _ && s > 0) {
(h & a.PingPong) === a.PingPong ? r *= -1 : _ = n;
f++;
} else if (1 === r && _ === n - 1 && s < n - 1) {
(h & a.PingPong) === a.PingPong ? r *= -1 : _ = -1;
f++;
}
if (_ === s) break;
if (f > u) break;
}
_ += r;
cc.director.getAnimationManager().pushDelayEvent(this, "_fireEvent", [ _ ]);
} while (_ !== s && _ > -1 && _ < n);
}
this._lastWrappedInfo.set(o);
} else {
this._fireEvent(s);
this._lastWrappedInfo = new l(o);
}
},
_fireEvent: function(t) {
if (!(t < 0 || t >= this.events.length || this._ignoreIndex === t)) {
var e = this.events[t].events;
if (this.target.isValid) for (var i = this.target._components, n = 0; n < e.length; n++) for (var o = e[n], r = o.func, s = 0; s < i.length; s++) {
var c = i[s], a = c[r];
a && a.apply(c, o.params);
}
}
},
onTimeChangedManually: function(t, e) {
this._lastWrappedInfo = null;
this._ignoreIndex = NaN;
var i = e.getWrappedInfo(t, this._wrappedInfo), n = i.direction, o = c(this.ratios, i.ratio);
if (o < 0) {
o = ~o - 1;
n < 0 && (o += 1);
this._ignoreIndex = o;
}
}
});
0;
n.exports = {
AnimCurve: h,
DynamicAnimCurve: u,
EventAnimCurve: f,
EventInfo: d,
computeRatioByType: r,
quickFindIndex: function(t, e) {
var i = t.length - 1;
if (0 === i) return 0;
var n = t[0];
if (e < n) return 0;
var o = t[i];
if (e > o) return i;
var r = (e = (e - n) / (o - n)) / (1 / i), s = 0 | r;
return r - s < 1e-6 ? s : ~(s + 1);
}
};
}), {
"../core/utils/binary-search": 149,
"./bezier": 9,
"./types": 14
} ],
7: [ (function(t, e, n) {
var o = cc.js, r = cc.Class({
ctor: function() {
this.__instanceId = cc.ClassManager.getNewInstanceId();
this._anims = new o.array.MutableForwardIterator([]);
this._delayEvents = [];
},
update: function(t) {
var e = this._anims, n = e.array;
for (e.i = 0; e.i < n.length; ++e.i) {
var o = n[e.i];
o._isPlaying && !o._isPaused && o.update(t);
}
var r = this._delayEvents;
for (i = 0, l = r.length; i < l; i++) {
var s = r[i];
s.target[s.func].apply(s.target, s.args);
}
r.length = 0;
},
destruct: function() {},
addAnimation: function(t) {
-1 === this._anims.array.indexOf(t) && this._anims.push(t);
},
removeAnimation: function(t) {
var e = this._anims.array.indexOf(t);
e >= 0 ? this._anims.fastRemoveAt(e) : cc.errorID(3907);
},
pushDelayEvent: function(t, e, i) {
this._delayEvents.push({
target: t,
func: e,
args: i
});
}
});
cc.AnimationManager = e.exports = r;
}), {} ],
8: [ (function(t, e, i) {
function n(t, e) {
c.call(this);
cc.EventTarget.call(this);
this._firstFramePlayed = !1;
this._delay = 0;
this._delayTime = 0;
this._wrappedInfo = new l();
this._lastWrappedInfo = null;
this._process = o;
this._clip = t;
this._name = e || t && t.name;
this.animator = null;
this.curves = [];
this.delay = 0;
this.repeatCount = 1;
this.duration = 1;
this.speed = 1;
this.wrapMode = h.Normal;
this.time = 0;
this._emit = this.emit;
this.emit = function() {
for (var t = new Array(arguments.length), e = 0, i = t.length; e < i; e++) t[e] = arguments[e];
cc.director.getAnimationManager().pushDelayEvent(this, "_emit", t);
};
}
function o() {
var t = this.sample(), e = this._hasListenerCache;
if (e && e.lastframe) {
var i;
i || (i = this._lastWrappedInfo = new l(t));
this.repeatCount > 1 && (0 | t.iterations) > (0 | i.iterations) && ((this.wrapMode & u.Reverse) === u.Reverse ? i.direction < 0 && this.emit("lastframe", this) : i.direction > 0 && this.emit("lastframe", this));
i.set(t);
}
if (t.stopped) {
this.stop();
this.emit("finished", this);
}
}
function r() {
var t = this.time, e = this.duration;
t > e ? 0 === (t %= e) && (t = e) : t < 0 && 0 !== (t %= e) && (t += e);
for (var i = t / e, n = this.curves, o = 0, r = n.length; o < r; o++) {
n[o].sample(t, i, this);
}
var s = this._hasListenerCache;
if (s && s.lastframe) {
var c = t > 0 ? t / e : -t / e, a = this._lastIterations;
void 0 === a && (a = this._lastIterations = c);
(0 | c) > (0 | a) && this.emit("lastframe", this);
this._lastIterations = c;
}
}
var s = cc.js, c = t("./playable"), a = t("./types"), l = a.WrappedInfo, h = a.WrapMode, u = a.WrapModeMask;
s.extend(n, c);
var d = n.prototype;
cc.js.mixin(d, cc.EventTarget.prototype);
d._setListeners = function(t) {
this._capturingListeners = t ? t._capturingListeners : null;
this._bubblingListeners = t ? t._bubblingListeners : null;
this._hasListenerCache = t ? t._hasListenerCache : null;
};
d.onPlay = function() {
this.setTime(0);
this._delayTime = this._delay;
cc.director.getAnimationManager().addAnimation(this);
this.animator && this.animator.addAnimation(this);
this.emit("play", this);
};
d.onStop = function() {
this.isPaused || cc.director.getAnimationManager().removeAnimation(this);
this.animator && this.animator.removeAnimation(this);
this.emit("stop", this);
};
d.onResume = function() {
cc.director.getAnimationManager().addAnimation(this);
this.emit("resume", this);
};
d.onPause = function() {
cc.director.getAnimationManager().removeAnimation(this);
this.emit("pause", this);
};
d.setTime = function(t) {
this.time = t || 0;
for (var e = this.curves, i = 0, n = e.length; i < n; i++) {
var o = e[i];
o.onTimeChangedManually && o.onTimeChangedManually(t, this);
}
};
d.update = function(t) {
if (this._delayTime > 0) {
this._delayTime -= t;
if (this._delayTime > 0) return;
}
this._firstFramePlayed ? this.time += t * this.speed : this._firstFramePlayed = !0;
this._process();
};
d._needRevers = function(t) {
var e = this.wrapMode, i = !1;
if ((e & u.PingPong) === u.PingPong) {
t - (0 | t) == 0 && t > 0 && (t -= 1);
1 & t && (i = !i);
}
(e & u.Reverse) === u.Reverse && (i = !i);
return i;
};
d.getWrappedInfo = function(t, e) {
e = e || new l();
var i = !1, n = this.duration, o = this.repeatCount, r = t > 0 ? t / n : -t / n;
if (r >= o) {
r = o;
i = !0;
var s = o - (0 | o);
0 === s && (s = 1);
t = s * n * (t > 0 ? 1 : -1);
}
if (t > n) {
var c = t % n;
t = 0 === c ? n : c;
} else t < 0 && 0 !== (t %= n) && (t += n);
var a = !1, h = this._wrapMode & u.ShouldWrap;
h && (a = this._needRevers(r));
var d = a ? -1 : 1;
this.speed < 0 && (d *= -1);
h && a && (t = n - t);
e.ratio = t / n;
e.time = t;
e.direction = d;
e.stopped = i;
e.iterations = r;
return e;
};
d.sample = function() {
for (var t = this.getWrappedInfo(this.time, this._wrappedInfo), e = this.curves, i = 0, n = e.length; i < n; i++) {
e[i].sample(t.time, t.ratio, this);
}
return t;
};
s.get(d, "clip", (function() {
return this._clip;
}));
s.get(d, "name", (function() {
return this._name;
}));
s.obsolete(d, "AnimationState.length", "duration");
s.getset(d, "curveLoaded", (function() {
return this.curves.length > 0;
}), (function() {
this.curves.length = 0;
}));
s.getset(d, "wrapMode", (function() {
return this._wrapMode;
}), (function(t) {
this._wrapMode = t;
0;
this.time = 0;
t & u.Loop ? this.repeatCount = Infinity : this.repeatCount = 1;
}));
s.getset(d, "repeatCount", (function() {
return this._repeatCount;
}), (function(t) {
this._repeatCount = t;
var e = this._wrapMode & u.ShouldWrap, i = (this.wrapMode & u.Reverse) === u.Reverse;
this._process = Infinity !== t || e || i ? o : r;
}));
s.getset(d, "delay", (function() {
return this._delay;
}), (function(t) {
this._delayTime = this._delay = t;
}));
cc.AnimationState = e.exports = n;
}), {
"./playable": 13,
"./types": 14
} ],
9: [ (function(t, e, i) {
function n(t, e, i, n, o) {
var r = 1 - o;
return t * r * r * r + 3 * e * r * r * o + 3 * i * r * o * o + n * o * o * o;
}
function o(t) {
return t < 0 ? -Math.pow(-t, 1 / 3) : Math.pow(t, 1 / 3);
}
function r(t, e) {
var i = (function(t, e) {
var i, n, r, u, d = e - 0, f = e - t[0], _ = 3 * d, p = 3 * f, g = 3 * (e - t[2]), y = 1 / (-d + p - g + (e - 1)), v = (_ - 6 * f + g) * y, m = v * (1 / 3), C = (-_ + p) * y, T = 1 / 3 * (3 * C - v * v), b = T * (1 / 3), S = (2 * v * v * v - 9 * v * C + d * y * 27) / 27, E = S / 2, x = E * E + b * b * b;
if (x < 0) {
var A = 1 / 3 * -T, N = h(A * A * A), O = -S / (2 * N), L = c(O < -1 ? -1 : O > 1 ? 1 : O), w = 2 * o(N);
n = w * s(L * (1 / 3)) - m;
r = w * s((L + l) * (1 / 3)) - m;
u = w * s((L + 2 * l) * (1 / 3)) - m;
return 0 <= n && n <= 1 ? 0 <= r && r <= 1 ? 0 <= u && u <= 1 ? a(n, r, u) : a(n, r) : 0 <= u && u <= 1 ? a(n, u) : n : 0 <= r && r <= 1 ? 0 <= u && u <= 1 ? a(r, u) : r : u;
}
if (0 === x) {
r = -(i = E < 0 ? o(-E) : -o(E)) - m;
return 0 <= (n = 2 * i - m) && n <= 1 ? 0 <= r && r <= 1 ? a(n, r) : n : r;
}
var I = h(x);
return n = (i = o(-E + I)) - o(E + I) - m;
})(t, e), n = 1 - i;
return 0 * n * n * n + 3 * t[1] * i * n * n + 3 * t[3] * i * i * n + 1 * i * i * i;
}
var s = Math.cos, c = Math.acos, a = Math.max, l = 2 * Math.PI, h = Math.sqrt;
0;
e.exports = {
bezier: n,
bezierByTime: r
};
}), {} ],
10: [ (function(t, e, i) {
function n(t, e) {
return function(i) {
return i < .5 ? e(2 * i) / 2 : t(2 * i - 1) / 2 + .5;
};
}
var o = {
constant: function() {
return 0;
},
linear: function(t) {
return t;
},
quadIn: function(t) {
return t * t;
},
quadOut: function(t) {
return t * (2 - t);
},
quadInOut: function(t) {
return (t *= 2) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1);
},
cubicIn: function(t) {
return t * t * t;
},
cubicOut: function(t) {
return --t * t * t + 1;
},
cubicInOut: function(t) {
return (t *= 2) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2);
},
quartIn: function(t) {
return t * t * t * t;
},
quartOut: function(t) {
return 1 - --t * t * t * t;
},
quartInOut: function(t) {
return (t *= 2) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2);
},
quintIn: function(t) {
return t * t * t * t * t;
},
quintOut: function(t) {
return --t * t * t * t * t + 1;
},
quintInOut: function(t) {
return (t *= 2) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2);
},
sineIn: function(t) {
return 1 - Math.cos(t * Math.PI / 2);
},
sineOut: function(t) {
return Math.sin(t * Math.PI / 2);
},
sineInOut: function(t) {
return .5 * (1 - Math.cos(Math.PI * t));
},
expoIn: function(t) {
return 0 === t ? 0 : Math.pow(1024, t - 1);
},
expoOut: function(t) {
return 1 === t ? 1 : 1 - Math.pow(2, -10 * t);
},
expoInOut: function(t) {
return 0 === t ? 0 : 1 === t ? 1 : (t *= 2) < 1 ? .5 * Math.pow(1024, t - 1) : .5 * (2 - Math.pow(2, -10 * (t - 1)));
},
circIn: function(t) {
return 1 - Math.sqrt(1 - t * t);
},
circOut: function(t) {
return Math.sqrt(1 - --t * t);
},
circInOut: function(t) {
return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
},
elasticIn: function(t) {
var e, i = .1;
if (0 === t) return 0;
if (1 === t) return 1;
if (!i || i < 1) {
i = 1;
e = .1;
} else e = .4 * Math.asin(1 / i) / (2 * Math.PI);
return -i * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / .4);
},
elasticOut: function(t) {
var e, i = .1;
if (0 === t) return 0;
if (1 === t) return 1;
if (!i || i < 1) {
i = 1;
e = .1;
} else e = .4 * Math.asin(1 / i) / (2 * Math.PI);
return i * Math.pow(2, -10 * t) * Math.sin((t - e) * (2 * Math.PI) / .4) + 1;
},
elasticInOut: function(t) {
var e, i = .1;
if (0 === t) return 0;
if (1 === t) return 1;
if (!i || i < 1) {
i = 1;
e = .1;
} else e = .4 * Math.asin(1 / i) / (2 * Math.PI);
return (t *= 2) < 1 ? i * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / .4) * -.5 : i * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / .4) * .5 + 1;
},
backIn: function(t) {
return t * t * (2.70158 * t - 1.70158);
},
backOut: function(t) {
return --t * t * (2.70158 * t + 1.70158) + 1;
},
backInOut: function(t) {
var e = 2.5949095;
return (t *= 2) < 1 ? t * t * ((e + 1) * t - e) * .5 : .5 * ((t -= 2) * t * ((e + 1) * t + e) + 2);
},
bounceOut: function(t) {
return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
},
smooth: function(t) {
return t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t);
},
fade: function(t) {
return t <= 0 ? 0 : t >= 1 ? 1 : t * t * t * (t * (6 * t - 15) + 10);
}
};
o.quadOutIn = n(o.quadIn, o.quadOut);
o.cubicOutIn = n(o.cubicIn, o.cubicOut);
o.quartOutIn = n(o.quartIn, o.quartOut);
o.quintOutIn = n(o.quintIn, o.quintOut);
o.sineOutIn = n(o.sineIn, o.sineOut);
o.expoOutIn = n(o.expoIn, o.expoOut);
o.circOutIn = n(o.circIn, o.circOut);
o.backOutIn = n(o.backIn, o.backOut);
o.backOutIn = n(o.backIn, o.backOut);
o.bounceIn = function(t) {
return 1 - o.bounceOut(1 - t);
};
o.bounceInOut = function(t) {
return t < .5 ? .5 * o.bounceIn(2 * t) : .5 * o.bounceOut(2 * t - 1) + .5;
};
o.bounceOutIn = n(o.bounceIn, o.bounceOut);
cc.Easing = e.exports = o;
}), {} ],
11: [ (function(t, e, i) {
t("./bezier");
t("./easing");
t("./types");
t("./motion-path-helper");
t("./animation-curves");
t("./animation-clip");
t("./animation-manager");
t("./animation-state");
t("./animation-animator");
}), {
"./animation-animator": 4,
"./animation-clip": 5,
"./animation-curves": 6,
"./animation-manager": 7,
"./animation-state": 8,
"./bezier": 9,
"./easing": 10,
"./motion-path-helper": 12,
"./types": 14
} ],
12: [ (function(t, e, i) {
function n(t) {
this.points = t || [];
this.beziers = [];
this.ratios = [];
this.progresses = [];
this.length = 0;
this.computeBeziers();
}
function o() {
this.start = h();
this.end = h();
this.startCtrlPoint = h();
this.endCtrlPoint = h();
}
function r(t, e, i, o) {
function r(t) {
return t instanceof cc.Vec2 ? {
in: t,
pos: t,
out: t
} : Array.isArray(t) && 6 === t.length ? {
in: h(t[2], t[3]),
pos: h(t[0], t[1]),
out: h(t[4], t[5])
} : {
in: cc.Vec2.ZERO,
pos: cc.Vec2.ZERO,
out: cc.Vec2.ZERO
};
}
function a(t, e, i) {
_.push(t);
p.push(e);
g.push(i);
}
var u = e.values;
if (0 !== t.length && 0 !== u.length) if (1 !== (u = u.map((function(t) {
return h(t[0], t[1]);
}))).length) {
for (var d = e.types, f = e.ratios, _ = e.values = [], p = e.types = [], g = e.ratios = [], y = 0, v = s.Linear, m = 0, C = t.length; m < C - 1; m++) {
var T, b = t[m], S = f[m], E = f[m + 1] - S, x = u[m], A = u[m + 1], N = d[m], O = [], L = y / E, w = 1 / (E * i * o);
if (b && b.length > 0) {
var I = [];
I.push(r(x));
for (var R = 0, P = b.length; R < P; R++) {
var D = r(b[R]);
I.push(D);
}
I.push(r(A));
var B = new n(I);
B.computeBeziers();
for (var M = B.progresses; 1 - L > 1e-6; ) {
var F, z, j, V;
if ((T = c(T = L, N)) < 0) {
V = (0 - T) * (z = B.beziers[0]).getLength();
j = z.start.sub(z.endCtrlPoint).normalize();
F = z.start.add(j.mul(V));
} else if (T > 1) {
V = (T - 1) * (z = B.beziers[B.beziers.length - 1]).getLength();
j = z.end.sub(z.startCtrlPoint).normalize();
F = z.end.add(j.mul(V));
} else {
var k = l(M, T);
k < 0 && (k = ~k);
T -= k > 0 ? M[k - 1] : 0;
T /= B.ratios[k];
F = B.beziers[k].getPointAt(T);
}
O.push(F);
L += w;
}
} else for (;1 - L > 1e-6; ) {
T = c(T = L, N);
O.push(x.lerp(A, T));
L += w;
}
v = "constant" === N ? N : s.Linear;
for (R = 0, P = O.length; R < P; R++) {
var G = S + y + w * R * E;
a(O[R], v, G);
}
y = Math.abs(L - 1) > 1e-6 ? (L - 1) * E : 0;
}
f[f.length - 1] !== g[g.length - 1] && a(u[u.length - 1], v, f[f.length - 1]);
} else e.values = u;
}
var s = t("./animation-curves").DynamicAnimCurve, c = t("./animation-curves").computeRatioByType, a = t("./bezier").bezier, l = t("../core/utils/binary-search").binarySearchEpsilon, h = cc.v2;
n.prototype.computeBeziers = function() {
this.beziers.length = 0;
this.ratios.length = 0;
this.progresses.length = 0;
this.length = 0;
for (var t, e = 1; e < this.points.length; e++) {
var i = this.points[e - 1], n = this.points[e];
(t = new o()).start = i.pos;
t.startCtrlPoint = i.out;
t.end = n.pos;
t.endCtrlPoint = n.in;
this.beziers.push(t);
this.length += t.getLength();
}
var r = 0;
for (e = 0; e < this.beziers.length; e++) {
t = this.beziers[e];
this.ratios[e] = t.getLength() / this.length;
this.progresses[e] = r += this.ratios[e];
}
return this.beziers;
};
o.prototype.getPointAt = function(t) {
var e = this.getUtoTmapping(t);
return this.getPoint(e);
};
o.prototype.getPoint = function(t) {
var e = a(this.start.x, this.startCtrlPoint.x, this.endCtrlPoint.x, this.end.x, t), i = a(this.start.y, this.startCtrlPoint.y, this.endCtrlPoint.y, this.end.y, t);
return new h(e, i);
};
o.prototype.getLength = function() {
var t = this.getLengths();
return t[t.length - 1];
};
o.prototype.getLengths = function(t) {
t || (t = this.__arcLengthDivisions ? this.__arcLengthDivisions : 200);
if (this.cacheArcLengths && this.cacheArcLengths.length === t + 1) return this.cacheArcLengths;
var e, i, n = [], o = this.getPoint(0), r = 0;
n.push(0);
for (i = 1; i <= t; i++) {
e = this.getPoint(i / t);
r += cc.pDistance(e, o);
n.push(r);
o = e;
}
this.cacheArcLengths = n;
return n;
};
o.prototype.getUtoTmapping = function(t, e) {
var i, n = this.getLengths(), o = 0, r = n.length;
i = e || t * n[r - 1];
for (var s, c = 0, a = r - 1; c <= a; ) if ((s = n[o = Math.floor(c + (a - c) / 2)] - i) < 0) c = o + 1; else {
if (!(s > 0)) {
a = o;
break;
}
a = o - 1;
}
if (n[o = a] === i) {
return o / (r - 1);
}
var l = n[o];
return (o + (i - l) / (n[o + 1] - l)) / (r - 1);
};
0;
e.exports = {
sampleMotionPaths: r,
Curve: n,
Bezier: o
};
}), {
"../core/utils/binary-search": 149,
"./animation-curves": 6,
"./bezier": 9
} ],
13: [ (function(t, e, i) {
function n() {
this._isPlaying = !1;
this._isPaused = !1;
this._stepOnce = !1;
}
var o = cc.js, r = n.prototype;
o.get(r, "isPlaying", (function() {
return this._isPlaying;
}), !0);
o.get(r, "isPaused", (function() {
return this._isPaused;
}), !0);
var s = function() {};
r.onPlay = s;
r.onPause = s;
r.onResume = s;
r.onStop = s;
r.onError = s;
r.play = function() {
if (this._isPlaying) if (this._isPaused) {
this._isPaused = !1;
this.onResume();
} else this.onError("already-playing"); else {
this._isPlaying = !0;
this.onPlay();
}
};
r.stop = function() {
if (this._isPlaying) {
this._isPlaying = !1;
this.onStop();
this._isPaused = !1;
}
};
r.pause = function() {
if (this._isPlaying && !this._isPaused) {
this._isPaused = !0;
this.onPause();
}
};
r.resume = function() {
if (this._isPlaying && this._isPaused) {
this._isPaused = !1;
this.onResume();
}
};
r.step = function() {
this.pause();
this._stepOnce = !0;
this._isPlaying || this.play();
};
e.exports = n;
}), {} ],
14: [ (function(t, e, i) {
function n(t) {
if (t) this.set(t); else {
this.ratio = 0;
this.time = 0;
this.direction = 1;
this.stopped = !0;
this.iterations = 0;
this.frameIndex = void 0;
}
}
cc.js;
var o = {
Loop: 2,
ShouldWrap: 4,
PingPong: 22,
Reverse: 36
}, r = cc.Enum({
Default: 0,
Normal: 1,
Reverse: o.Reverse,
Loop: o.Loop,
LoopReverse: o.Loop | o.Reverse,
PingPong: o.PingPong,
PingPongReverse: o.PingPong | o.Reverse
});
cc.WrapMode = r;
n.prototype.set = function(t) {
this.ratio = t.ratio;
this.time = t.time;
this.direction = t.direction;
this.stopped = t.stopped;
this.iterations = t.iterations;
this.frameIndex = t.frameIndex;
};
e.exports = {
WrapModeMask: o,
WrapMode: r,
WrappedInfo: n
};
}), {} ],
15: [ (function(t, e, i) {
var n = cc.js;
i.removed = function(t) {
function e() {
cc.errorID(1403);
}
n.getset(t, "willPlayMusic", e, e);
};
i.deprecated = function(t) {
var e = -1, i = 1, o = 1, r = 1, s = 1;
n.get(t, "playMusic", (function() {
return function(n, s) {
t.stop(e);
e = t.play(n, s, r);
i = n;
o = s;
return e;
};
}));
n.get(t, "stopMusic", (function() {
return function() {
t.stop(e);
return e;
};
}));
n.get(t, "pauseMusic", (function() {
return function() {
t.pause(e);
return e;
};
}));
n.get(t, "resumeMusic", (function() {
return function() {
t.resume(e);
return e;
};
}));
n.get(t, "rewindMusic", (function() {
return function() {
t.setCurrentTime(e, 0);
return e;
};
}));
n.get(t, "getMusicVolume", (function() {
return function() {
return r;
};
}));
n.get(t, "setMusicVolume", (function() {
return function(i) {
r = i;
t.setVolume(e, r);
return r;
};
}));
n.get(t, "isMusicPlaying", (function() {
return function() {
return t.getState(e) === t.AudioState.PLAYING;
};
}));
n.get(t, "playEffect", (function() {
return function(e, i, n) {
return t.play(e, i || !1, void 0 === n ? s : n);
};
}));
n.get(t, "setEffectsVolume", (function(i) {
return function(i) {
s = i;
var n = t._id2audio;
for (var o in n) o !== e && t.setVolume(o, i);
};
}));
n.get(t, "getEffectsVolume", (function() {
return function() {
return s;
};
}));
n.get(t, "pauseEffect", (function() {
return function(e) {
return t.pause(e);
};
}));
n.get(t, "pauseAllEffects", (function() {
return function() {
var i = t.getState(e) === t.AudioState.PLAYING;
t.pauseAll();
i && t.resume(e);
};
}));
n.get(t, "resumeEffect", (function() {
return function(e) {
t.resume(e);
};
}));
n.get(t, "resumeAllEffects", (function() {
return function() {
var i = t.getState(e) === t.AudioState.PAUSED;
t.resumeAll();
i && t.getState(e) === t.AudioState.PLAYING && t.pause(e);
};
}));
n.get(t, "stopEffect", (function() {
return function(e) {
return t.stop(e);
};
}));
n.get(t, "stopAllEffects", (function() {
return function() {
var n = t.getState(e) === t.AudioState.PLAYING, r = t.getCurrentTime(e);
t.stopAll();
if (n) {
e = t.play(i, o);
t.setCurrentTime(e, r);
}
};
}));
n.get(t, "unloadEffect", (function() {
return function(e) {
return t.stop(e);
};
}));
0;
};
}), {} ],
16: [ (function(i, n, o) {
"use strict";
function r(t) {
var e = cc.Mask;
if (e) for (var i = 0, n = t; n && cc.Node.isNode(n); n = n._parent, ++i) if (n.getComponent(e)) return {
index: i,
node: n
};
return null;
}
var s = i("./utils/prefab-helper"), c = i("./utils/scene-graph-helper"), a = i("./event-manager"), l = cc.Object.Flags.Destroying, h = "position-changed", u = "size-changed", d = "anchor-changed", f = "rotation-changed", _ = "scale-changed", p = i("./utils/misc"), g = i("./event/event"), y = !!cc.ActionManager, v = function() {}, m = cc.Enum({
TOUCH_START: "touchstart",
TOUCH_MOVE: "touchmove",
TOUCH_END: "touchend",
TOUCH_CANCEL: "touchcancel",
MOUSE_DOWN: "mousedown",
MOUSE_MOVE: "mousemove",
MOUSE_ENTER: "mouseenter",
MOUSE_LEAVE: "mouseleave",
MOUSE_UP: "mouseup",
MOUSE_WHEEL: "mousewheel"
}), C = [ m.TOUCH_START, m.TOUCH_MOVE, m.TOUCH_END, m.TOUCH_CANCEL ], T = [ m.MOUSE_DOWN, m.MOUSE_ENTER, m.MOUSE_MOVE, m.MOUSE_LEAVE, m.MOUSE_UP, m.MOUSE_WHEEL ], b = null, S = function(t, e) {
var i = t.getLocation(), n = this.owner;
if (n._hitTest(i, this)) {
(e = g.EventTouch.pool.get(e)).type = m.TOUCH_START;
e.touch = t;
e.bubbles = !0;
n.dispatchEvent(e);
e.touch = null;
e._touches = null;
g.EventTouch.pool.put(e);
return !0;
}
return !1;
}, E = function(t, e) {
e = g.EventTouch.pool.get(e);
var i = this.owner;
e.type = m.TOUCH_MOVE;
e.touch = t;
e.bubbles = !0;
i.dispatchEvent(e);
e.touch = null;
e._touches = null;
g.EventTouch.pool.put(e);
}, x = function(t, e) {
e = g.EventTouch.pool.get(e);
var i = t.getLocation(), n = this.owner;
n._hitTest(i, this) ? e.type = m.TOUCH_END : e.type = m.TOUCH_CANCEL;
e.touch = t;
e.bubbles = !0;
n.dispatchEvent(e);
e.touch = null;
e._touches = null;
g.EventTouch.pool.put(e);
}, A = function(t, e) {
e = g.EventTouch.pool.get(e);
t.getLocation();
var i = this.owner;
e.type = m.TOUCH_CANCEL;
e.touch = t;
e.bubbles = !0;
i.dispatchEvent(e);
e.touch = null;
e._touches = null;
g.EventTouch.pool.put(e);
}, N = function(t) {
var e = t.getLocation(), i = this.owner;
if (i._hitTest(e, this)) {
t.stopPropagation();
(t = g.EventMouse.pool.get(t)).type = m.MOUSE_DOWN;
t.bubbles = !0;
i.dispatchEvent(t);
g.EventMouse.pool.put(t);
}
}, O = function(t) {
var e = t.getLocation(), i = this.owner, n = i._hitTest(e, this);
if (n || this._previousIn) {
t.stopPropagation();
t = g.EventMouse.pool.get(t);
}
if (n) {
if (!this._previousIn) {
if (b) {
t.type = m.MOUSE_LEAVE;
b.dispatchEvent(t);
b._mouseListener._previousIn = !1;
}
b = this.owner;
t.type = m.MOUSE_ENTER;
i.dispatchEvent(t);
this._previousIn = !0;
}
t.type = m.MOUSE_MOVE;
t.bubbles = !0;
i.dispatchEvent(t);
} else {
if (!this._previousIn) return;
t.type = m.MOUSE_LEAVE;
i.dispatchEvent(t);
this._previousIn = !1;
b = null;
}
g.EventMouse.pool.put(t);
}, L = function(t) {
var e = t.getLocation(), i = this.owner;
if (i._hitTest(e, this)) {
t.stopPropagation();
(t = g.EventMouse.pool.get(t)).type = m.MOUSE_UP;
t.bubbles = !0;
i.dispatchEvent(t);
g.EventMouse.pool.put(t);
}
}, w = function(t) {
var e = t.getLocation(), i = this.owner;
if (i._hitTest(e, this)) {
t.stopPropagation();
(t = g.EventMouse.pool.get(t)).type = m.MOUSE_WHEEL;
t.bubbles = !0;
i.dispatchEvent(t);
g.EventMouse.pool.put(t);
}
}, I = cc.Class({
name: "cc.Node",
extends: i("./utils/base-node"),
properties: {
_opacity: 255,
_color: cc.Color.WHITE,
_cascadeOpacityEnabled: !0,
_anchorPoint: cc.p(.5, .5),
_contentSize: cc.size(0, 0),
_rotationX: 0,
_rotationY: 0,
_scaleX: 1,
_scaleY: 1,
_position: cc.p(0, 0),
_skewX: 0,
_skewY: 0,
_localZOrder: 0,
_globalZOrder: 0,
_opacityModifyRGB: !1,
groupIndex: {
default: 0,
type: cc.Integer
},
group: {
get: function() {
return cc.game.groupList[this.groupIndex] || "";
},
set: function(t) {
this.groupIndex = cc.game.groupList.indexOf(t);
this.emit("group-changed");
}
},
x: {
get: function() {
return this._position.x;
},
set: function(t) {
var e = this._position;
if (t !== e.x) {
e.x = t;
this._sgNode.setPositionX(t);
var i = this._hasListenerCache;
i && i[h] && this.emit(h);
}
}
},
y: {
get: function() {
return this._position.y;
},
set: function(t) {
var e = this._position;
if (t !== e.y) {
e.y = t;
this._sgNode.setPositionY(t);
var i = this._hasListenerCache;
i && i[h] && this.emit(h);
}
}
},
rotation: {
get: function() {
this._rotationX !== this._rotationY && cc.logID(1602);
return this._rotationX;
},
set: function(t) {
if (this._rotationX !== t || this._rotationY !== t) {
this._rotationX = this._rotationY = t;
this._sgNode.rotation = t;
var e = this._hasListenerCache;
e && e[f] && this.emit(f);
}
}
},
rotationX: {
get: function() {
return this._rotationX;
},
set: function(t) {
if (this._rotationX !== t) {
this._rotationX = t;
this._sgNode.rotationX = t;
var e = this._hasListenerCache;
e && e[f] && this.emit(f);
}
}
},
rotationY: {
get: function() {
return this._rotationY;
},
set: function(t) {
if (this._rotationY !== t) {
this._rotationY = t;
this._sgNode.rotationY = t;
var e = this._hasListenerCache;
e && e[f] && this.emit(f);
}
}
},
scaleX: {
get: function() {
return this._scaleX;
},
set: function(t) {
if (this._scaleX !== t) {
this._scaleX = t;
this._sgNode.scaleX = t;
var e = this._hasListenerCache;
e && e[_] && this.emit(_);
}
}
},
scaleY: {
get: function() {
return this._scaleY;
},
set: function(t) {
if (this._scaleY !== t) {
this._scaleY = t;
this._sgNode.scaleY = t;
var e = this._hasListenerCache;
e && e[_] && this.emit(_);
}
}
},
skewX: {
get: function() {
return this._skewX;
},
set: function(t) {
this._skewX = t;
this._sgNode.skewX = t;
}
},
skewY: {
get: function() {
return this._skewY;
},
set: function(t) {
this._skewY = t;
this._sgNode.skewY = t;
}
},
opacity: {
get: function() {
return this._opacity;
},
set: function(t) {
if (this._opacity !== t) {
this._opacity = t;
this._sgNode.setOpacity(t);
if (!this._cascadeOpacityEnabled) {
var e = this._sizeProvider;
e instanceof _ccsg.Node && e !== this._sgNode && e.setOpacity(t);
}
}
},
range: [ 0, 255 ]
},
cascadeOpacity: {
get: function() {
return this._cascadeOpacityEnabled;
},
set: function(t) {
if (this._cascadeOpacityEnabled !== t) {
this._cascadeOpacityEnabled = t;
this._sgNode.cascadeOpacity = t;
var e = t ? 255 : this._opacity, i = this._sizeProvider;
i instanceof _ccsg.Node && i.setOpacity(e);
}
}
},
color: {
get: function() {
return this._color.clone();
},
set: function(t) {
if (!this._color.equals(t)) {
this._color.fromColor(t);
0;
this._sizeProvider instanceof _ccsg.Node && this._sizeProvider.setColor(t);
}
}
},
anchorX: {
get: function() {
return this._anchorPoint.x;
},
set: function(t) {
var e = this._anchorPoint;
if (e.x !== t) {
e.x = t;
var i = this._sizeProvider;
i instanceof _ccsg.Node && i.setAnchorPoint(e);
this.emit(d);
}
}
},
anchorY: {
get: function() {
return this._anchorPoint.y;
},
set: function(t) {
var e = this._anchorPoint;
if (e.y !== t) {
e.y = t;
var i = this._sizeProvider;
i instanceof _ccsg.Node && i.setAnchorPoint(e);
this.emit(d);
}
}
},
width: {
get: function() {
if (this._sizeProvider) {
var t = this._sizeProvider._getWidth();
this._contentSize.width = t;
return t;
}
return this._contentSize.width;
},
set: function(t) {
if (t !== this._contentSize.width) {
var e = this._sizeProvider;
e && e.setContentSize(t, e._getHeight());
this._contentSize.width = t;
this.emit(u);
}
}
},
height: {
get: function() {
if (this._sizeProvider) {
var t = this._sizeProvider._getHeight();
this._contentSize.height = t;
return t;
}
return this._contentSize.height;
},
set: function(t) {
if (t !== this._contentSize.height) {
var e = this._sizeProvider;
e && e.setContentSize(e._getWidth(), t);
this._contentSize.height = t;
this.emit(u);
}
}
},
zIndex: {
get: function() {
return this._localZOrder;
},
set: function(t) {
if (this._localZOrder !== t) {
this._localZOrder = t;
this._sgNode.zIndex = t;
this._parent && (function(t) {
t._parent._delaySort();
})(this);
}
}
}
},
ctor: function(t) {
var e = this._sgNode = new _ccsg.Node();
e.retain();
e._entity = this;
e.onEnter = function() {
_ccsg.Node.prototype.onEnter.call(this);
if (this._entity && !this._entity._active) {
y && cc.director.getActionManager().pauseTarget(this);
a.pauseTarget(this);
}
};
cc.game._isCloning || (e.cascadeOpacity = !0);
this._sizeProvider = null;
this._reorderChildDirty = !1;
this._widget = null;
this._touchListener = null;
this._mouseListener = null;
this._retainedActions = [];
},
statics: {
isNode: function(t) {
return t instanceof I && (t.constructor === I || !(t instanceof cc.Scene));
}
},
_onSetParent: function(t) {
var e = this._sgNode;
e.parent && e.parent.removeChild(e, !1);
if (t) {
t._sgNode.addChild(e);
t._delaySort();
}
},
_onSiblingIndexChanged: function(t) {
var e, i = this._parent, n = i._children, o = 0, r = n.length;
if (cc.runtime) for (;o < r; o++) {
var s = (e = n[o]._sgNode).getLocalZOrder();
e.setLocalZOrder(s + 1);
e.setLocalZOrder(s);
} else {
i._sgNode.removeChild(this._sgNode, !1);
if (t + 1 < n.length) {
var c = n[t + 1], a = this._sgNode.getLocalZOrder();
i._sgNode.insertChildBefore(this._sgNode, c._sgNode);
a !== this._sgNode.getLocalZOrder() && this._sgNode.setLocalZOrder(a);
} else i._sgNode.addChild(this._sgNode);
}
},
_onPreDestroy: function() {
var t = this._onPreDestroyBase();
y && cc.director.getActionManager().removeAllActionsFromTarget(this);
b === this && (b = null);
cc.macro.ENABLE_GC_FOR_NATIVE_OBJECTS || this._releaseAllActions();
if (this._touchListener) {
this._touchListener.release();
this._touchListener.owner = null;
this._touchListener.mask = null;
this._touchListener = null;
}
if (this._mouseListener) {
this._mouseListener.release();
this._mouseListener.owner = null;
this._mouseListener.mask = null;
this._mouseListener = null;
}
this._reorderChildDirty && cc.director.__fastOff(cc.Director.EVENT_AFTER_UPDATE, this.sortAllChildren, this);
a.removeListeners(this);
if (t) {
this._sgNode._entity = null;
this._sgNode = null;
} else {
this._removeSgNode();
0;
}
},
_onPostActivated: function(t) {
var e = y ? cc.director.getActionManager() : null;
if (t) {
e && e.resumeTarget(this);
a.resumeTarget(this);
if (this._touchListener) {
var i = this._touchListener.mask = r(this);
this._mouseListener && (this._mouseListener.mask = i);
} else this._mouseListener && (this._mouseListener.mask = r(this));
} else {
e && e.pauseTarget(this);
a.pauseTarget(this);
}
},
_onHierarchyChanged: function(t) {
this._onHierarchyChangedBase(t);
cc._widgetManager._nodesOrderDirty = !0;
},
_onBatchCreated: function() {
var t = this._prefab;
t && t.sync && !t._synced && t.root === this && s.syncWithPrefab(this);
this._updateDummySgNode();
this._parent && this._parent._sgNode.addChild(this._sgNode);
if (!this._activeInHierarchy) {
y && cc.director.getActionManager().pauseTarget(this);
a.pauseTarget(this);
}
for (var e = this._children, i = 0, n = e.length; i < n; i++) e[i]._onBatchCreated();
},
on: function(t, e, i, n) {
var o = !1;
if (-1 !== C.indexOf(t)) {
if (!this._touchListener) {
this._touchListener = cc.EventListener.create({
event: cc.EventListener.TOUCH_ONE_BY_ONE,
swallowTouches: !0,
owner: this,
mask: r(this),
onTouchBegan: S,
onTouchMoved: E,
onTouchEnded: x,
onTouchCancelled: A
});
this._touchListener.retain();
a.addListener(this._touchListener, this);
o = !0;
}
} else if (-1 !== T.indexOf(t) && !this._mouseListener) {
this._mouseListener = cc.EventListener.create({
event: cc.EventListener.MOUSE,
_previousIn: !1,
owner: this,
mask: r(this),
onMouseDown: N,
onMouseMove: O,
onMouseUp: L,
onMouseScroll: w
});
this._mouseListener.retain();
a.addListener(this._mouseListener, this);
o = !0;
}
o && !this._activeInHierarchy && cc.director.getScheduler().schedule((function() {
this._activeInHierarchy || a.pauseTarget(this);
}), this, 0, 0, 0, !1);
return this._EventTargetOn(t, e, i, n);
},
off: function(t, e, i, n) {
this._EventTargetOff(t, e, i, n);
-1 !== C.indexOf(t) ? this._checkTouchListeners() : -1 !== T.indexOf(t) && this._checkMouseListeners();
},
targetOff: function(t) {
this._EventTargetTargetOff(t);
this._checkTouchListeners();
this._checkMouseListeners();
},
pauseSystemEvents: function(t) {
a.pauseTarget(this, t);
},
resumeSystemEvents: function(t) {
a.resumeTarget(this, t);
},
_checkTouchListeners: function() {
if (!(this._objFlags & l) && this._touchListener) {
var t = 0;
if (this._bubblingListeners) for (;t < C.length; ++t) if (this._bubblingListeners.has(C[t])) return;
if (this._capturingListeners) for (;t < C.length; ++t) if (this._capturingListeners.has(C[t])) return;
a.removeListener(this._touchListener);
this._touchListener = null;
}
},
_checkMouseListeners: function() {
if (!(this._objFlags & l) && this._mouseListener) {
var t = 0;
if (this._bubblingListeners) for (;t < T.length; ++t) if (this._bubblingListeners.has(T[t])) return;
if (this._capturingListeners) for (;t < T.length; ++t) if (this._capturingListeners.has(T[t])) return;
b === this && (b = null);
a.removeListener(this._mouseListener);
this._mouseListener = null;
}
},
_hitTest: function(t, e) {
var i = this.width, n = this.height, o = t, r = cc.Camera;
r && r.main && r.main.containsNode(this) && (o = r.main.getCameraToWorldPoint(o));
var s = cc.affineTransformInvertIn(this._sgNode.getNodeToWorldTransform());
(o = cc.pointApplyAffineTransform(o, s)).x += this._anchorPoint.x * i;
o.y += this._anchorPoint.y * n;
var c = o.x, a = i - o.x, l = o.y, h = n - o.y;
if (c >= 0 && a >= 0 && h >= 0 && l >= 0) {
if (e && e.mask) {
for (var u = e.mask, d = this, f = 0; d && f < u.index; ++f, d = d.parent) ;
if (d === u.node) {
var _ = d.getComponent(cc.Mask);
return !_ || !_.enabledInHierarchy || _._hitTest(t);
}
e.mask = null;
return !0;
}
return !0;
}
return !1;
},
_getCapturingTargets: function(t, e) {
for (var i = this.parent; i; ) {
i.hasEventListener(t, !0) && e.push(i);
i = i.parent;
}
},
_getBubblingTargets: function(t, e) {
for (var i = this.parent; i; ) {
i.hasEventListener(t) && e.push(i);
i = i.parent;
}
},
isRunning: function() {
return this._activeInHierarchy;
},
runAction: y ? function(t) {
if (this.active) {
cc.assertID(t, 1618);
cc.macro.ENABLE_GC_FOR_NATIVE_OBJECTS || this._retainAction(t);
this._sgNode._owner = this;
cc.director.getActionManager().addAction(t, this, !1);
return t;
}
} : v,
pauseAllActions: y ? function() {
cc.director.getActionManager().pauseTarget(this);
} : v,
resumeAllActions: y ? function() {
cc.director.getActionManager().resumeTarget(this);
} : v,
stopAllActions: y ? function() {
cc.director.getActionManager().removeAllActionsFromTarget(this);
} : v,
stopAction: y ? function(t) {
cc.director.getActionManager().removeAction(t);
} : v,
stopActionByTag: y ? function(t) {
t !== cc.Action.TAG_INVALID ? cc.director.getActionManager().removeActionByTag(t, this) : cc.logID(1612);
} : v,
getActionByTag: y ? function(t) {
if (t === cc.Action.TAG_INVALID) {
cc.logID(1613);
return null;
}
return cc.director.getActionManager().getActionByTag(t, this);
} : function() {
return null;
},
getNumberOfRunningActions: y ? function() {
return cc.director.getActionManager().getNumberOfRunningActionsInTarget(this);
} : function() {
return 0;
},
_retainAction: function(t) {
if (t instanceof cc.Action && -1 === this._retainedActions.indexOf(t)) {
this._retainedActions.push(t);
t.retain();
}
},
_releaseAllActions: function() {
for (var t = 0; t < this._retainedActions.length; ++t) this._retainedActions[t].release();
this._retainedActions.length = 0;
},
setTag: function(t) {
this._tag = t;
this._sgNode.tag = t;
},
getPosition: function() {
return new cc.Vec2(this._position);
},
setPosition: function(i, n) {
var o;
if ("undefined" === ("object" == (e = typeof n) ? t(n) : e)) {
o = i.x;
n = i.y;
} else o = i;
var r = this._position;
if (r.x !== o || r.y !== n) {
r.x = o;
r.y = n;
this._sgNode.setPosition(o, n);
var s = this._hasListenerCache;
s && s[h] && this.emit(h);
}
},
getScale: function() {
this._scaleX !== this._scaleY && cc.logID(1603);
return this._scaleX;
},
setScale: function(i, n) {
if ("object" === ("object" == (e = typeof i) ? t(i) : e)) {
n = i.y;
i = i.x;
} else n = n || 0 === n ? n : i;
if (this._scaleX !== i || this._scaleY !== n) {
this._scaleX = i;
this._scaleY = n;
this._sgNode.setScale(i, n);
var o = this._hasListenerCache;
o && o[_] && this.emit(_);
}
},
getContentSize: function(t) {
if (this._sizeProvider && !t) {
var e = this._sizeProvider.getContentSize();
this._contentSize = e;
return cc.size(e);
}
return cc.size(this._contentSize);
},
setContentSize: function(t, e) {
var i = this._contentSize;
if (void 0 === e) {
if (t.width === i.width && t.height === i.height) return;
0;
i.width = t.width;
i.height = t.height;
} else {
if (t === i.width && e === i.height) return;
0;
i.width = t;
i.height = e;
}
this._sizeProvider && this._sizeProvider.setContentSize(i);
this.emit(u);
},
setOpacityModifyRGB: function(t) {
if (this._opacityModifyRGB !== t) {
this._opacityModifyRGB = t;
this._sgNode.setOpacityModifyRGB(t);
var e = this._sizeProvider;
e instanceof _ccsg.Node && e !== this._sgNode && e.setOpacityModifyRGB(t);
}
},
isOpacityModifyRGB: function() {
return this._opacityModifyRGB;
},
setGlobalZOrder: function(t) {
this._globalZOrder = t;
this._sgNode.setGlobalZOrder(t);
},
getGlobalZOrder: function() {
this._globalZOrder = this._sgNode.getGlobalZOrder();
return this._globalZOrder;
},
getAnchorPoint: function() {
return cc.p(this._anchorPoint);
},
setAnchorPoint: function(t, e) {
var i = this._anchorPoint;
if (void 0 === e) {
if (t.x === i.x && t.y === i.y) return;
i.x = t.x;
i.y = t.y;
} else {
if (t === i.x && e === i.y) return;
i.x = t;
i.y = e;
}
var n = this._sizeProvider;
n instanceof _ccsg.Node && n.setAnchorPoint(i);
this.emit(d);
},
getAnchorPointInPoints: function() {
return this._sgNode.getAnchorPointInPoints();
},
getDisplayedOpacity: function() {
return this._sgNode.getDisplayedOpacity();
},
_updateDisplayedOpacity: function(t) {
this._sgNode.updateDisplayedOpacity(t);
},
getDisplayedColor: function() {
return this._sgNode.getDisplayedColor();
},
getNodeToParentTransformAR: function() {
var t = this.getContentSize(), e = this._sgNode.getNodeToParentTransform();
if (!this._isSgTransformArToMe(t)) {
var i = this._anchorPoint.x * t.width, n = this._anchorPoint.y * t.height, o = cc.affineTransformMake(1, 0, 0, 1, i, n);
e = cc.affineTransformConcatIn(o, e);
}
return e;
},
getBoundingBox: function() {
var t = this.getContentSize(), e = cc.rect(0, 0, t.width, t.height);
return cc._rectApplyAffineTransformIn(e, this.getNodeToParentTransform());
},
getBoundingBoxToWorld: function() {
var t;
this.parent && (t = this.parent.getNodeToWorldTransformAR());
return this._getBoundingBoxTo(t);
},
_getBoundingBoxTo: function(t) {
var e = this.getContentSize(), i = e.width, n = e.height, o = cc.rect(-this._anchorPoint.x * i, -this._anchorPoint.y * n, i, n), r = cc.affineTransformConcat(this.getNodeToParentTransformAR(), t);
cc._rectApplyAffineTransformIn(o, r);
if (!this._children) return o;
for (var s = this._children, c = 0; c < s.length; c++) {
var a = s[c];
if (a && a.active) {
var l = a._getBoundingBoxTo(r);
l && (o = cc.rectUnion(o, l));
}
}
return o;
},
getNodeToParentTransform: function() {
var t = this.getContentSize(), e = this._sgNode.getNodeToParentTransform();
if (this._isSgTransformArToMe(t)) {
var i = -this._anchorPoint.x * t.width, n = -this._anchorPoint.y * t.height, o = cc.affineTransformMake(1, 0, 0, 1, i, n);
e = cc.affineTransformConcatIn(o, e);
}
return e;
},
getNodeToWorldTransform: function() {
var t = this.getContentSize();
cc._renderType === cc.game.RENDER_TYPE_CANVAS && cc.director._visitScene();
var e = this._sgNode.getNodeToWorldTransform();
if (this._isSgTransformArToMe(t)) {
var i = -this._anchorPoint.x * t.width, n = -this._anchorPoint.y * t.height, o = cc.affineTransformMake(1, 0, 0, 1, i, n);
e = cc.affineTransformConcatIn(o, e);
}
return e;
},
getNodeToWorldTransformAR: function() {
var t = this.getContentSize();
cc._renderType === cc.game.RENDER_TYPE_CANVAS && cc.director._visitScene();
var e = this._sgNode.getNodeToWorldTransform();
if (!this._isSgTransformArToMe(t)) {
var i = this._anchorPoint.x * t.width, n = this._anchorPoint.y * t.height, o = cc.affineTransformMake(1, 0, 0, 1, i, n);
e = cc.affineTransformConcatIn(o, e);
}
return e;
},
getParentToNodeTransform: function() {
return this._sgNode.getParentToNodeTransform();
},
getWorldToNodeTransform: function() {
cc._renderType === cc.game.RENDER_TYPE_CANVAS && cc.director._visitScene();
return this._sgNode.getWorldToNodeTransform();
},
_isSgTransformArToMe: function(t) {
var e = this._sgNode.getContentSize();
return 0 === e.width && 0 === e.height && (0 !== t.width || 0 !== t.height) || !!this._sgNode.isIgnoreAnchorPointForPosition();
},
convertToNodeSpace: function(t) {
cc._renderType === cc.game.RENDER_TYPE_CANVAS && cc.director._visitScene();
var e = this._sgNode.convertToNodeSpace(t);
return cc.pAdd(e, cc.p(this._anchorPoint.x * this._contentSize.width, this._anchorPoint.y * this._contentSize.height));
},
convertToWorldSpace: function(t) {
cc._renderType === cc.game.RENDER_TYPE_CANVAS && cc.director._visitScene();
var e = t.x - this._anchorPoint.x * this._contentSize.width, i = t.y - this._anchorPoint.y * this._contentSize.height;
return cc.v2(this._sgNode.convertToWorldSpace(cc.v2(e, i)));
},
convertToNodeSpaceAR: function(t) {
cc._renderType === cc.game.RENDER_TYPE_CANVAS && cc.director._visitScene();
return this._sgNode.isIgnoreAnchorPointForPosition() ? cc.v2(this._sgNode.convertToNodeSpace(t)) : this._sgNode.convertToNodeSpaceAR(t);
},
convertToWorldSpaceAR: function(t) {
cc._renderType === cc.game.RENDER_TYPE_CANVAS && cc.director._visitScene();
return this._sgNode.isIgnoreAnchorPointForPosition() ? cc.v2(this._sgNode.convertToWorldSpace(t)) : cc.v2(this._sgNode.convertToWorldSpaceAR(t));
},
convertTouchToNodeSpace: function(t) {
return this.convertToNodeSpace(t.getLocation());
},
convertTouchToNodeSpaceAR: function(t) {
return this.convertToNodeSpaceAR(t.getLocation());
},
setNodeDirty: function() {
this._sgNode.setNodeDirty();
},
addChild: function(i, n, o) {
n = void 0 === n ? i._localZOrder : n;
var r, s = !1;
if ("undefined" === ("object" == (e = typeof o) ? t(o) : e)) {
o = void 0;
r = i._name;
} else if (cc.js.isString(o)) {
r = o;
o = void 0;
} else if (cc.js.isNumber(o)) {
s = !0;
r = "";
}
0;
cc.assertID(i, 1606);
cc.assertID(null === i._parent, 1605);
i.parent = this;
i.zIndex = n;
s ? i.setTag(o) : i.setName(r);
},
cleanup: function() {
y && cc.director.getActionManager().removeAllActionsFromTarget(this);
a.removeListeners(this);
var t, e, i = this._children.length;
for (t = 0; t < i; ++t) (e = this._children[t]) && e.cleanup();
},
sortAllChildren: function() {
if (this._reorderChildDirty) {
this._reorderChildDirty = !1;
var t = this._children;
if (t.length > 1) {
var e, i, n, o = t.length;
for (e = 1; e < o; e++) {
n = t[e];
i = e - 1;
for (;i >= 0; ) {
if (n._localZOrder < t[i]._localZOrder) t[i + 1] = t[i]; else {
if (!(n._localZOrder === t[i]._localZOrder && n._sgNode._arrivalOrder < t[i]._sgNode._arrivalOrder)) break;
t[i + 1] = t[i];
}
i--;
}
t[i + 1] = n;
}
this.emit("child-reorder");
}
cc.director.__fastOff(cc.Director.EVENT_AFTER_UPDATE, this.sortAllChildren, this);
}
},
_delaySort: function() {
if (!this._reorderChildDirty) {
this._reorderChildDirty = !0;
cc.director.__fastOn(cc.Director.EVENT_AFTER_UPDATE, this.sortAllChildren, this);
}
},
_updateDummySgNode: function() {
var t = this._sgNode;
t.setPosition(this._position);
t.setRotationX(this._rotationX);
t.setRotationY(this._rotationY);
t.setScale(this._scaleX, this._scaleY);
t.setSkewX(this._skewX);
t.setSkewY(this._skewY);
var e = t._arrivalOrder;
t.setLocalZOrder(this._localZOrder);
t._arrivalOrder = e;
t.setGlobalZOrder(this._globalZOrder);
t.setColor(this._color);
t.setOpacity(this._opacity);
t.setOpacityModifyRGB(this._opacityModifyRGB);
t.setCascadeOpacityEnabled(this._cascadeOpacityEnabled);
t.setTag(this._tag);
},
_updateSgNode: function() {
this._updateDummySgNode();
var t = this._sgNode;
t.setAnchorPoint(this._anchorPoint);
t.setVisible(this._active);
t.setColor(this._color);
var e = y ? cc.director.getActionManager() : null;
if (this._activeInHierarchy) {
e && e.resumeTarget(this);
a.resumeTarget(this);
} else {
e && e.pauseTarget(this);
a.pauseTarget(this);
}
},
_removeSgNode: c.removeSgNode,
onRestore: !1
}), R = function() {
this._activeInHierarchy || a.pauseTarget(this);
};
cc.js.getset(I.prototype, "_sgNode", (function() {
return this.__sgNode;
}), (function(t) {
this.__sgNode = t;
if (this._touchListener || this._mouseListener) {
if (this._touchListener) {
this._touchListener.retain();
a.removeListener(this._touchListener);
a.addListener(this._touchListener, this);
this._touchListener.release();
}
if (this._mouseListener) {
this._mouseListener.retain();
a.removeListener(this._mouseListener);
a.addListener(this._mouseListener, this);
this._mouseListener.release();
}
cc.director.once(cc.Director.EVENT_BEFORE_UPDATE, R, this);
}
}), !0);
p.propertyDefine(I, [ "parent", "tag", "skewX", "skewY", "position", "rotation", "rotationX", "rotationY", "scale", "scaleX", "scaleY", "opacity", "color" ], {
x: [ "getPositionX", "setPositionX" ],
y: [ "getPositionY", "setPositionY" ],
zIndex: [ "getLocalZOrder", "setLocalZOrder" ],
opacityModifyRGB: [ "isOpacityModifyRGB", "setOpacityModifyRGB" ],
cascadeOpacity: [ "isCascadeOpacityEnabled", "setCascadeOpacityEnabled" ]
});
I.EventType = m;
cc.Node = n.exports = I;
}), {
"./event-manager": 76,
"./event/event": 79,
"./utils/base-node": 148,
"./utils/misc": 152,
"./utils/prefab-helper": 154,
"./utils/scene-graph-helper": 155
} ],
17: [ (function(t, e, i) {
cc.Scene = cc.Class({
name: "cc.Scene",
extends: t("./CCNode"),
properties: {
autoReleaseAssets: {
default: void 0,
type: cc.Boolean
}
},
ctor: function() {
var t = this._sgNode = new _ccsg.Scene();
t.retain();
t.setAnchorPoint(0, 0);
this._anchorPoint.x = 0;
this._anchorPoint.y = 0;
this._activeInHierarchy = !1;
this._inited = !cc.game._isCloning;
this.dependAssets = null;
},
destroy: function() {
this._super();
this._activeInHierarchy = !1;
},
_onHierarchyChanged: function() {},
_instantiate: null,
_load: function() {
if (!this._inited) {
0;
this._onBatchCreated();
this._inited = !0;
}
},
_activate: function(t) {
t = !1 !== t;
0;
cc.director._nodeActivator.activateNode(this, t);
}
});
e.exports = cc.Scene;
}), {
"./CCNode": 16
} ],
18: [ (function(t, e, i) {
var n = t("./CCRawAsset");
cc.Asset = cc.Class({
name: "cc.Asset",
extends: n,
properties: {
rawUrl: {
get: function() {
if (this._rawFiles) {
if (cc.AssetLibrary) return cc.AssetLibrary.getLibUrlNoExt(this._uuid) + "/" + this._rawFiles[0];
cc.errorID(6400);
}
return "";
},
visible: !1
},
rawUrls: {
get: function() {
if (this._rawFiles) {
if (cc.AssetLibrary) {
var t = cc.AssetLibrary.getLibUrlNoExt(this._uuid) + "/";
return this._rawFiles.map((function(e) {
return t + e;
}));
}
cc.errorID(6401);
}
return [];
},
visible: !1
},
_rawFiles: null
},
statics: {
deserialize: function(t) {
return cc.deserialize(t);
},
preventDeferredLoadDependents: !1
},
serialize: function() {
return Editor.serialize(this);
},
createNode: null,
_setRawFiles: function(t) {
this._rawFiles = t.length > 0 ? t : null;
},
_preloadRawFiles: null
});
e.exports = cc.Asset;
}), {
"./CCRawAsset": 24
} ],
19: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.AudioClip",
extends: cc.RawAsset
});
cc.AudioClip = n;
e.exports = n;
}), {} ],
20: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.BitmapFont",
extends: cc.Font,
properties: {
fntDataStr: {
default: ""
},
spriteFrame: {
default: null,
type: cc.SpriteFrame
},
fontSize: {
default: -1
},
_fntConfig: null
}
});
cc.BitmapFont = n;
e.exports = n;
}), {} ],
21: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.Font",
extends: cc.Asset
});
cc.Font = n;
e.exports = n;
}), {} ],
22: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.LabelAtlas",
extends: cc.BitmapFont
});
cc.LabelAtlas = n;
e.exports = n;
}), {} ],
23: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.Prefab",
extends: cc.Asset,
properties: {
data: null,
asyncLoadAssets: void 0,
_createFunction: {
default: null,
serializable: !1
}
},
createNode: !1,
compileCreateFunction: function() {
var e = t("../platform/instantiate-jit");
this._createFunction = e.compile(this.data);
},
_doInstantiate: function(t) {
this.data._prefab ? this.data._prefab._synced = !0 : cc.warnID(3700);
this._createFunction || this.compileCreateFunction();
return this._createFunction(t);
},
_instantiate: function() {
var t;
t = this._doInstantiate();
this.data._instantiate(t);
0;
return t;
}
});
cc.Prefab = e.exports = n;
cc.js.obsolete(cc, "cc._Prefab", "Prefab");
}), {
"../platform/instantiate-jit": 140
} ],
24: [ (function(t, e, i) {
var n = t("../platform/CCObject");
cc.RawAsset = cc.Class({
name: "cc.RawAsset",
extends: n,
ctor: function() {
Object.defineProperty(this, "_uuid", {
value: "",
writable: !0
});
},
statics: {
createNodeByInfo: null
}
});
Object.defineProperty(cc.RawAsset, "isRawAssetType", {
value: function(t) {
return cc.isChildClassOf(t, cc.RawAsset) && !cc.isChildClassOf(t, cc.Asset);
}
});
e.exports = cc.RawAsset;
}), {
"../platform/CCObject": 131
} ],
25: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.SceneAsset",
extends: cc.Asset,
properties: {
scene: null,
asyncLoadAssets: void 0
}
});
cc.SceneAsset = n;
e.exports = n;
}), {} ],
26: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.Script",
extends: cc.Asset
});
cc._Script = n;
var o = cc.Class({
name: "cc.JavaScript",
extends: n
});
cc._JavaScript = o;
var r = cc.Class({
name: "cc.CoffeeScript",
extends: n
});
cc._CoffeeScript = r;
var s = cc.Class({
name: "cc.TypeScript",
extends: n
});
cc._TypeScript = s;
}), {} ],
27: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.SpriteAtlas",
extends: cc.Asset,
properties: {
_spriteFrames: {
default: {}
}
},
getTexture: function() {
var t = Object.keys(this._spriteFrames);
if (t.length > 0) {
var e = this._spriteFrames[t[0]];
return e ? e.getTexture() : null;
}
return null;
},
getSpriteFrame: function(t) {
return this._spriteFrames[t];
},
getSpriteFrames: function() {
var t = [], e = this._spriteFrames;
for (var i in e) t.push(e[i]);
return t;
}
});
cc.SpriteAtlas = n;
e.exports = n;
}), {} ],
28: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.TTFFont",
extends: cc.Font
});
cc.TTFFont = n;
e.exports = n;
}), {} ],
29: [ (function(t, e, i) {
t("./CCRawAsset");
t("./CCAsset");
t("./CCFont");
t("./CCPrefab");
t("./CCAudioClip");
t("./CCScripts");
t("./CCSceneAsset");
t("../sprites/CCSpriteFrame");
t("../textures/CCTexture2D");
t("./CCTTFFont");
t("./CCSpriteAtlas");
t("./CCBitmapFont");
t("./CCLabelAtlas");
}), {
"../sprites/CCSpriteFrame": 1,
"../textures/CCTexture2D": 1,
"./CCAsset": 18,
"./CCAudioClip": 19,
"./CCBitmapFont": 20,
"./CCFont": 21,
"./CCLabelAtlas": 22,
"./CCPrefab": 23,
"./CCRawAsset": 24,
"./CCSceneAsset": 25,
"./CCScripts": 26,
"./CCSpriteAtlas": 27,
"./CCTTFFont": 28
} ],
30: [ (function(t, e, i) {
function n(t) {
return t instanceof cc.Scene ? cc.visibleRect : !t._sizeProvider || t._sizeProvider instanceof _ccsg.Node ? t._contentSize : t.getContentSize();
}
function o(t, e, i, n) {
for (var o = t._parent._scaleX, r = t._parent._scaleY, s = 0, c = 0, a = t._parent; ;) {
var l = a._position;
s += l.x;
c += l.y;
if (!(a = a._parent)) {
i.x = i.y = 0;
n.x = n.y = 1;
return;
}
if (a === e) break;
var h = a._scaleX, u = a._scaleY;
s *= h;
c *= u;
o *= h;
r *= u;
}
n.x = 0 !== o ? 1 / o : 1;
n.y = 0 !== r ? 1 / r : 1;
i.x = -s;
i.y = -c;
}
function r(t, e) {
var i, r, s, c = e._target;
c ? o(t, i = c, r = u, s = d) : i = t._parent;
var a = n(i), f = i._anchorPoint, _ = i instanceof cc.Scene, p = t._position.x, g = t._position.y, y = t._anchorPoint;
if (e._alignFlags & l) {
var v, m, C = a.width;
if (_) {
v = cc.visibleRect.left.x;
m = cc.visibleRect.right.x;
} else m = (v = -f.x * C) + C;
v += e._isAbsLeft ? e._left : e._left * C;
m -= e._isAbsRight ? e._right : e._right * C;
if (c) {
v += r.x;
v *= s.x;
m += r.x;
m *= s.x;
}
var T, b = y.x, S = t._scaleX;
if (S < 0) {
b = 1 - b;
S = -S;
}
if (e.isStretchWidth) {
T = m - v;
0 !== S && (t.width = T / S);
p = v + b * T;
} else {
T = t.width * S;
if (e.isAlignHorizontalCenter) {
var E = e._isAbsHorizontalCenter ? e._horizontalCenter : e._horizontalCenter * C, x = (.5 - f.x) * a.width;
if (c) {
E *= s.x;
x += r.x;
x *= s.x;
}
p = x + (b - .5) * T + E;
} else p = e.isAlignLeft ? v + b * T : m + (b - 1) * T;
}
}
if (e._alignFlags & h) {
var A, N, O = a.height;
if (_) {
N = cc.visibleRect.bottom.y;
A = cc.visibleRect.top.y;
} else A = (N = -f.y * O) + O;
N += e._isAbsBottom ? e._bottom : e._bottom * O;
A -= e._isAbsTop ? e._top : e._top * O;
if (c) {
N += r.y;
N *= s.y;
A += r.y;
A *= s.y;
}
var L, w = y.y, I = t._scaleY;
if (I < 0) {
w = 1 - w;
I = -I;
}
if (e.isStretchHeight) {
L = A - N;
0 !== I && (t.height = L / I);
g = N + w * L;
} else {
L = t.height * I;
if (e.isAlignVerticalCenter) {
var R = e._isAbsVerticalCenter ? e._verticalCenter : e._verticalCenter * O, P = (.5 - f.y) * a.height;
if (c) {
R *= s.y;
P += r.y;
P *= s.y;
}
g = P + (w - .5) * L + R;
} else g = e.isAlignBottom ? N + w * L : A + (w - 1) * L;
}
}
t.setPosition(p, g);
}
function s(t) {
var e = t._widget;
if (e) {
r(t, e);
e.isAlignOnce ? e.enabled = !1 : f.push(e);
}
for (var i = t._children, n = 0; n < i.length; n++) {
var o = i[n];
o._active && s(o);
}
}
function c() {
var t = cc.director.getScene();
if (t) {
_.isAligning = !0;
if (_._nodesOrderDirty) {
f.length = 0;
s(t);
_._nodesOrderDirty = !1;
} else {
var e, i = _._activeWidgetsIterator;
for (i.i = 0; i.i < f.length; ++i.i) r((e = f[i.i]).node, e);
}
_.isAligning = !1;
}
0;
}
function a(t) {
var e = t._parent;
cc.Node.isNode(e) && a(e);
var i = t._widget || t.getComponent(cc.Widget);
i && r(t, i);
}
var l = 56, h = 7, u = cc.Vec2.ZERO, d = cc.Vec2.ONE, f = [], _ = cc._widgetManager = e.exports = {
_AlignFlags: {
TOP: 1,
MID: 2,
BOT: 4,
LEFT: 8,
CENTER: 16,
RIGHT: 32
},
isAligning: !1,
_nodesOrderDirty: !1,
_activeWidgetsIterator: new cc.js.array.MutableForwardIterator(f),
init: function(t) {
t.on(cc.Director.EVENT_BEFORE_VISIT, c);
},
add: function(t) {
t.node._widget = t;
this._nodesOrderDirty = !0;
0;
},
remove: function(t) {
t.node._widget = null;
this._activeWidgetsIterator.remove(t);
0;
},
updateAlignment: a
};
0;
}), {} ],
31: [ (function(t, e, i) {
0;
var n = cc.Class({
name: "cc.Camera",
extends: cc._RendererUnderSG,
ctor: function() {
this.viewMatrix = cc.affineTransformMake();
this.invertViewMatrix = cc.affineTransformMake();
this._lastViewMatrix = cc.affineTransformMake();
this._sgTarges = [];
this._checkedTimes = 0;
this.visibleRect = {
left: cc.v2(),
right: cc.v2(),
top: cc.v2(),
bottom: cc.v2()
};
this.viewPort = cc.rect();
},
editor: !1,
properties: {
_targets: {
default: [],
type: cc.Node,
visible: !0
},
zoomRatio: 1
},
statics: {
main: null
},
_createSgNode: function() {
if (cc._renderType === cc.game.RENDER_TYPE_CANVAS) {
cc.errorID(8301);
var t = new _ccsg.Node();
t.setTransform = t.addTarget = t.removeTarget = function() {};
return t;
}
return new _ccsg.CameraNode();
},
_initSgNode: function() {
this._sgNode.setContentSize(this.node.getContentSize(!0));
},
_addSgTargetInSg: function(t) {
var e;
t instanceof cc.Node ? e = t._sgNode : t instanceof _ccsg.Node && (e = t);
if (e && !e._cameraInfo) {
e._cameraInfo = {
touched: this._checkedTimes
};
this._sgNode.addTarget(e);
this._sgTarges.push(e);
}
},
_removeTargetInSg: function(t) {
var e;
t instanceof cc.Node ? e = t._sgNode : t instanceof _ccsg.Node && (e = t);
if (e && e._cameraInfo) {
this._sgNode.removeTarget(e);
delete e._cameraInfo;
cc.js.array.remove(this._sgTarges, e);
}
},
onEnable: function() {
if (n.main) cc.errorID(8300); else {
n.main = this;
this._sgNode.setEnable(!0);
for (var t = this._targets, e = 0, i = t.length; e < i; e++) this._addSgTargetInSg(t[e]);
}
},
onDisable: function() {
if (n.main === this) {
n.main = null;
this._sgNode.setEnable(!1);
for (var t = this._sgTarges, e = t.length - 1; e >= 0; e--) this._removeTargetInSg(t[e]);
}
},
addTarget: function(t) {
if (-1 === this._targets.indexOf(t)) {
this._addSgTargetInSg(t);
this._targets.push(t);
}
},
removeTarget: function(t) {
if (-1 !== this._targets.indexOf(t)) {
this._removeTargetInSg(t);
cc.js.array.remove(this._targets, t);
}
},
getTargets: function() {
return this._targets;
},
getNodeToCameraTransform: function(t) {
var e = t.getNodeToWorldTransform();
this.containsNode(t) && (e = cc.affineTransformConcatIn(e, cc.Camera.main.viewMatrix));
return e;
},
getCameraToWorldPoint: function(t) {
cc.Camera.main && (t = cc.pointApplyAffineTransform(t, cc.Camera.main.invertViewMatrix));
return t;
},
containsNode: function(t) {
t instanceof cc.Node && (t = t._sgNode);
for (var e = this._sgTarges; t; ) {
if (-1 !== e.indexOf(t)) return !0;
t = t.parent;
}
return !1;
},
_setSgNodesCullingDirty: function() {
for (var t = this._sgTarges, e = 0; e < t.length; e++) t[e].markCullingDirty();
},
_checkSgTargets: function() {
for (var t = this._targets, e = this._sgTarges, i = ++this._checkedTimes, n = 0, o = t.length; n < o; n++) {
var r = t[n], s = r;
r instanceof cc.Node && (s = r._sgNode) && !s._cameraInfo && this._addSgTargetInSg(s);
s && (s._cameraInfo.touched = i);
}
for (var c = e.length - 1; c >= 0; c--) {
var a = e[c];
a._cameraInfo.touched !== i && this._removeTargetInSg(a);
}
},
lateUpdate: function() {
this._checkSgTargets();
var t = this.viewMatrix, e = this.invertViewMatrix, i = this.viewPort, n = cc.visibleRect, o = this.visibleRect, r = this.node.getNodeToWorldTransformAR(), s = .5 * -(Math.atan2(r.b, r.a) + Math.atan2(-r.c, r.d)), c = 1, a = 0, l = 0, h = 1;
if (s) {
l = Math.sin(s);
c = h = Math.cos(s);
a = -l;
}
var u = this.zoomRatio;
c *= u;
a *= u;
l *= u;
h *= u;
t.a = c;
t.b = a;
t.c = l;
t.d = h;
var d = n.center;
t.tx = d.x - (c * r.tx + l * r.ty);
t.ty = d.y - (a * r.tx + h * r.ty);
cc.affineTransformInvertOut(t, e);
i.x = n.bottomLeft.x;
i.y = n.bottomLeft.y;
i.width = n.width;
i.height = n.height;
cc._rectApplyAffineTransformIn(i, e);
o.left.x = i.xMin;
o.right.x = i.xMax;
o.bottom.y = i.yMin;
o.top.y = i.yMax;
this._sgNode.setTransform(c, a, l, h, t.tx, t.ty);
var f = this._lastViewMatrix;
if (f.a !== t.a || f.b !== t.b || f.c !== t.c || f.d !== t.d || f.tx !== t.tx || f.ty !== t.ty) {
this._setSgNodesCullingDirty();
f.a = t.a;
f.b = t.b;
f.c = t.c;
f.d = t.d;
f.tx = t.tx;
f.ty = t.ty;
}
}
});
n.flags = cc.Enum({
InCamera: 1,
ParentInCamera: 2
});
e.exports = cc.Camera = n;
}), {
"./CCSGCameraNode": 1
} ],
32: [ (function(t, e, i) {
cc.Collider.Box = cc.Class({
properties: {
_offset: cc.v2(0, 0),
_size: cc.size(100, 100),
offset: {
tooltip: !1,
get: function() {
return this._offset;
},
set: function(t) {
this._offset = t;
},
type: cc.Vec2
},
size: {
tooltip: !1,
get: function() {
return this._size;
},
set: function(t) {
this._size.width = t.width < 0 ? 0 : t.width;
this._size.height = t.height < 0 ? 0 : t.height;
},
type: cc.Size
}
},
resetInEditor: !1
});
var n = cc.Class({
name: "cc.BoxCollider",
extends: cc.Collider,
mixins: [ cc.Collider.Box ],
editor: !1
});
cc.BoxCollider = e.exports = n;
}), {} ],
33: [ (function(t, e, i) {
cc.Collider.Circle = cc.Class({
properties: {
_offset: cc.v2(0, 0),
_radius: 50,
offset: {
get: function() {
return this._offset;
},
set: function(t) {
this._offset = t;
},
type: cc.Vec2
},
radius: {
tooltip: !1,
get: function() {
return this._radius;
},
set: function(t) {
this._radius = t < 0 ? 0 : t;
}
}
},
resetInEditor: !1
});
var n = cc.Class({
name: "cc.CircleCollider",
extends: cc.Collider,
mixins: [ cc.Collider.Circle ],
editor: !1
});
cc.CircleCollider = e.exports = n;
}), {} ],
34: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.Collider",
extends: cc.Component,
properties: {
editing: {
default: !1,
serializable: !1,
tooltip: !1
},
tag: {
tooltip: !1,
default: 0,
range: [ 0, 1e7 ],
type: cc.Integer
}
},
onDisable: function() {
cc.director.getCollisionManager().removeCollider(this);
},
onEnable: function() {
cc.director.getCollisionManager().addCollider(this);
}
});
cc.Collider = e.exports = n;
}), {} ],
35: [ (function(t, e, i) {
var n = t("./CCContact"), o = n.CollisionType, r = cc.rect(), s = cc.v2(), c = cc.Class({
mixins: [ cc.EventTarget ],
properties: {
enabled: !1,
enabledDrawBoundingBox: !1
},
ctor: function() {
this.__instanceId = cc.ClassManager.getNewInstanceId();
this._contacts = [];
this._colliders = [];
this._debugDrawer = null;
this._enabledDebugDraw = !1;
},
update: function(t) {
if (this.enabled) {
var e, i, n = this._colliders;
for (e = 0, i = n.length; e < i; e++) this.updateCollider(n[e]);
var r = this._contacts, s = [];
for (e = 0, i = r.length; e < i; e++) {
var c = r[e].updateState();
c !== o.None && s.push([ c, r[e] ]);
}
for (e = 0, i = s.length; e < i; e++) {
var a = s[e];
this._doCollide(a[0], a[1]);
}
this.drawColliders();
}
},
_doCollide: function(t, e) {
var i;
switch (t) {
case o.CollisionEnter:
i = "onCollisionEnter";
break;

case o.CollisionStay:
i = "onCollisionStay";
break;

case o.CollisionExit:
i = "onCollisionExit";
}
var n, r, s, c = e.collider1, a = e.collider2, l = c.node._components, h = a.node._components;
for (n = 0, r = l.length; n < r; n++) (s = l[n])[i] && s[i](a, c);
for (n = 0, r = h.length; n < r; n++) (s = h[n])[i] && s[i](c, a);
},
shouldCollide: function(t, e) {
var i = t.node, n = e.node, o = cc.game.collisionMatrix;
return i !== n && o[i.groupIndex][n.groupIndex];
},
initCollider: function(t) {
if (!t.world) {
var e = t.world = {};
e.aabb = cc.rect();
e.preAabb = cc.rect();
e.radius = 0;
if (t instanceof cc.BoxCollider) {
e.position = null;
e.points = [ cc.v2(), cc.v2(), cc.v2(), cc.v2() ];
} else if (t instanceof cc.PolygonCollider) {
e.position = null;
e.points = t.points.map((function(t) {
return cc.v2(t.x, t.y);
}));
} else if (t instanceof cc.CircleCollider) {
e.position = cc.v2();
e.points = null;
}
}
},
updateCollider: function(t) {
var e = t.offset, i = t.world, n = i.aabb, o = i.transform = t.node.getNodeToWorldTransformAR(), c = i.preAabb;
c.x = n.x;
c.y = n.y;
c.width = n.width;
c.height = n.height;
if (t instanceof cc.BoxCollider) {
var a = t.size;
r.x = e.x - a.width / 2;
r.y = e.y - a.height / 2;
r.width = a.width;
r.height = a.height;
var l = i.points, h = l[0], u = l[1], d = l[2], f = l[3];
cc.obbApplyAffineTransform(r, o, h, u, d, f);
var _ = Math.min(h.x, u.x, d.x, f.x), p = Math.min(h.y, u.y, d.y, f.y), g = Math.max(h.x, u.x, d.x, f.x), y = Math.max(h.y, u.y, d.y, f.y);
n.x = _;
n.y = p;
n.width = g - _;
n.height = y - p;
} else if (t instanceof cc.CircleCollider) {
var v = cc.pointApplyAffineTransform(t.offset, o);
i.position.x = v.x;
i.position.y = v.y;
o.tx = o.ty = 0;
s.x = t.radius;
s.y = 0;
var m = cc.pointApplyAffineTransform(s, o), C = Math.sqrt(m.x * m.x + m.y * m.y);
i.radius = C;
n.x = v.x - C;
n.y = v.y - C;
n.width = 2 * C;
n.height = 2 * C;
} else if (t instanceof cc.PolygonCollider) {
var T = t.points, b = i.points;
b.length = T.length;
_ = 1e6, p = 1e6, g = -1e6, y = -1e6;
for (var S = 0, E = T.length; S < E; S++) {
b[S] || (b[S] = cc.v2());
s.x = T[S].x + e.x;
s.y = T[S].y + e.y;
v = cc.pointApplyAffineTransform(s, o);
b[S].x = v.x;
b[S].y = v.y;
v.x > g && (g = v.x);
v.x < _ && (_ = v.x);
v.y > y && (y = v.y);
v.y < p && (p = v.y);
}
n.x = _;
n.y = p;
n.width = g - _;
n.height = y - p;
}
},
addCollider: function(t) {
var e = this._colliders;
if (-1 === e.indexOf(t)) {
for (var i = 0, o = e.length; i < o; i++) {
var r = e[i];
if (this.shouldCollide(t, r)) {
var s = new n(t, r);
this._contacts.push(s);
}
}
e.push(t);
this.initCollider(t);
}
t.node.on("group-changed", this.onNodeGroupChanged, this);
},
removeCollider: function(t) {
var e = this._colliders, i = e.indexOf(t);
if (i >= 0) {
e.splice(i, 1);
for (var n = this._contacts, r = n.length - 1; r >= 0; r--) {
var s = n[r];
if (s.collider1 === t || s.collider2 === t) {
s.touching && this._doCollide(o.CollisionExit, s);
n.splice(r, 1);
}
}
t.node.off("group-changed", this.onNodeGroupChanged, this);
} else cc.errorID(6600);
},
attachDebugDrawToCamera: function(t) {
this._debugDrawer && t.addTarget(this._debugDrawer);
},
detachDebugDrawFromCamera: function(t) {
this._debugDrawer && t.removeTarget(this._debugDrawer);
},
onNodeGroupChanged: function(t) {
for (var e = t.currentTarget.getComponents(cc.Collider), i = 0, n = e.length; i < n; i++) {
this.removeCollider(e[i]);
this.addCollider(e[i]);
}
},
drawColliders: function() {
var t = this._debugDrawer;
if (this._enabledDebugDraw && t) {
t.clear();
for (var e = this._colliders, i = 0, n = e.length; i < n; i++) {
var o = e[i];
if (o instanceof cc.BoxCollider || o instanceof cc.PolygonCollider) {
var r = o.world.points;
if (r.length > 0) {
t.strokeColor = cc.Color.WHITE;
t.moveTo(r[0].x, r[0].y);
for (var s = 1; s < r.length; s++) t.lineTo(r[s].x, r[s].y);
t.close();
t.stroke();
}
} else if (o instanceof cc.CircleCollider) {
t.circle(o.world.position.x, o.world.position.y, o.world.radius);
t.stroke();
}
if (this.enabledDrawBoundingBox) {
var c = o.world.aabb;
t.strokeColor = cc.Color.BLUE;
t.moveTo(c.xMin, c.yMin);
t.lineTo(c.xMin, c.yMax);
t.lineTo(c.xMax, c.yMax);
t.lineTo(c.xMax, c.yMin);
t.close();
t.stroke();
}
}
}
},
onSceneLaunched: function() {
if (this._enabledDebugDraw && this._debugDrawer) {
this._debugDrawer.removeFromParent();
cc.director.getScene()._sgNode.addChild(this._debugDrawer);
}
}
});
cc.js.getset(c.prototype, "enabledDebugDraw", (function() {
return this._enabledDebugDraw;
}), (function(t) {
if (t && !this._enabledDebugDraw) {
if (!this._debugDrawer) {
this._debugDrawer = new _ccsg.GraphicsNode();
this._debugDrawer.retain();
}
cc.director.getScene()._sgNode.addChild(this._debugDrawer);
cc.director.on(cc.Director.EVENT_AFTER_SCENE_LAUNCH, this.onSceneLaunched, this);
} else if (!t && this._enabledDebugDraw) {
this._debugDrawer.clear();
this._debugDrawer.removeFromParent(!1);
cc.director.off(cc.Director.EVENT_AFTER_SCENE_LAUNCH, this.onSceneLaunched, this);
}
this._enabledDebugDraw = t;
}));
cc.CollisionManager = e.exports = c;
}), {
"./CCContact": 36
} ],
36: [ (function(t, e, i) {
function n(t, e) {
this.collider1 = t;
this.collider2 = e;
this.touching = !1;
var i = t instanceof cc.BoxCollider || t instanceof cc.PolygonCollider, n = e instanceof cc.BoxCollider || e instanceof cc.PolygonCollider, r = t instanceof cc.CircleCollider, s = e instanceof cc.CircleCollider;
if (i && n) this.testFunc = o.polygonPolygon; else if (r && s) this.testFunc = o.circleCircle; else if (i && s) this.testFunc = o.polygonCircle; else if (r && n) {
this.testFunc = o.polygonCircle;
this.collider1 = e;
this.collider2 = t;
} else cc.errorID(6601, cc.js.getClassName(t), cc.js.getClassName(e));
}
var o = t("./CCIntersection"), r = cc.Enum({
None: 0,
CollisionEnter: 1,
CollisionStay: 2,
CollisionExit: 3
});
n.prototype.test = function() {
var t = this.collider1.world, e = this.collider2.world;
return !!t.aabb.intersects(e.aabb) && (this.testFunc === o.polygonPolygon ? this.testFunc(t.points, e.points) : this.testFunc === o.circleCircle ? this.testFunc(t, e) : this.testFunc === o.polygonCircle && this.testFunc(t.points, e));
};
n.prototype.updateState = function() {
var t = this.test(), e = r.None;
if (t && !this.touching) {
this.touching = !0;
e = r.CollisionEnter;
} else if (t && this.touching) e = r.CollisionStay; else if (!t && this.touching) {
this.touching = !1;
e = r.CollisionExit;
}
return e;
};
n.CollisionType = r;
e.exports = n;
}), {
"./CCIntersection": 37
} ],
37: [ (function(t, e, i) {
function n(t, e, i, n) {
var o = (n.x - i.x) * (t.y - i.y) - (n.y - i.y) * (t.x - i.x), r = (e.x - t.x) * (t.y - i.y) - (e.y - t.y) * (t.x - i.x), s = (n.y - i.y) * (e.x - t.x) - (n.x - i.x) * (e.y - t.y);
if (0 !== s) {
var c = o / s, a = r / s;
if (0 <= c && c <= 1 && 0 <= a && a <= 1) return !0;
}
return !1;
}
function o(t, e, i) {
for (var o = i.length, r = 0; r < o; ++r) {
if (n(t, e, i[r], i[(r + 1) % o])) return !0;
}
return !1;
}
function r(t, e) {
for (var i = !1, n = t.x, o = t.y, r = e.length, s = 0, c = r - 1; s < r; c = s++) {
var a = e[s].x, l = e[s].y, h = e[c].x, u = e[c].y;
l > o != u > o && n < (h - a) * (o - l) / (u - l) + a && (i = !i);
}
return i;
}
function s(t, e, i, n) {
var o, r = i.x - e.x, s = i.y - e.y, c = r * r + s * s, a = ((t.x - e.x) * r + (t.y - e.y) * s) / c;
o = n ? c ? a < 0 ? e : a > 1 ? i : cc.v2(e.x + a * r, e.y + a * s) : e : cc.v2(e.x + a * r, e.y + a * s);
r = t.x - o.x;
s = t.y - o.y;
return Math.sqrt(r * r + s * s);
}
var c = {};
c.lineLine = n;
c.lineRect = function(t, e, i) {
var o = new cc.Vec2(i.x, i.y), r = new cc.Vec2(i.x, i.yMax), s = new cc.Vec2(i.xMax, i.yMax), c = new cc.Vec2(i.xMax, i.y);
return !!(n(t, e, o, r) || n(t, e, r, s) || n(t, e, s, c) || n(t, e, c, o));
};
c.linePolygon = o;
c.rectRect = function(t, e) {
var i = t.x, n = t.y, o = t.x + t.width, r = t.y + t.height, s = e.x, c = e.y, a = e.x + e.width, l = e.y + e.height;
return i <= a && o >= s && n <= l && r >= c;
};
c.rectPolygon = function(t, e) {
var i, n, s = new cc.Vec2(t.x, t.y), c = new cc.Vec2(t.x, t.yMax), a = new cc.Vec2(t.xMax, t.yMax), l = new cc.Vec2(t.xMax, t.y);
if (o(s, c, e)) return !0;
if (o(c, a, e)) return !0;
if (o(a, l, e)) return !0;
if (o(l, s, e)) return !0;
for (i = 0, n = e.length; i < n; ++i) if (r(e[i], t)) return !0;
return !!(r(s, e) || r(c, e) || r(a, e) || r(l, e));
};
c.polygonPolygon = function(t, e) {
var i, n;
for (i = 0, n = t.length; i < n; ++i) if (o(t[i], t[(i + 1) % n], e)) return !0;
for (i = 0, n = e.length; i < n; ++i) if (r(e[i], t)) return !0;
for (i = 0, n = t.length; i < n; ++i) if (r(t[i], e)) return !0;
return !1;
};
c.circleCircle = function(t, e) {
return t.position.sub(e.position).mag() < t.radius + e.radius;
};
c.polygonCircle = function(t, e) {
var i = e.position;
if (r(i, t)) return !0;
for (var n = 0, o = t.length; n < o; n++) if (s(i, 0 === n ? t[t.length - 1] : t[n - 1], t[n], !0) < e.radius) return !0;
return !1;
};
c.pointInPolygon = r;
c.pointLineDistance = s;
cc.Intersection = e.exports = c;
}), {} ],
38: [ (function(t, e, i) {
cc.Collider.Polygon = cc.Class({
properties: {
threshold: {
default: 1,
serializable: !1,
visible: !1
},
_offset: cc.v2(0, 0),
offset: {
get: function() {
return this._offset;
},
set: function(t) {
this._offset = t;
},
type: cc.Vec2
},
points: {
tooltip: !1,
default: function() {
return [ cc.v2(-50, -50), cc.v2(50, -50), cc.v2(50, 50), cc.v2(-50, 50) ];
},
type: [ cc.Vec2 ]
}
},
resetPointsByContour: !1
});
var n = cc.Class({
name: "cc.PolygonCollider",
extends: cc.Collider,
mixins: [ cc.Collider.Polygon ],
editor: !1
});
cc.PolygonCollider = e.exports = n;
}), {} ],
39: [ (function(t, e, i) {
t("./CCCollisionManager");
t("./CCCollider");
t("./CCBoxCollider");
t("./CCCircleCollider");
t("./CCPolygonCollider");
}), {
"./CCBoxCollider": 32,
"./CCCircleCollider": 33,
"./CCCollider": 34,
"./CCCollisionManager": 35,
"./CCPolygonCollider": 38
} ],
40: [ (function(i, n, o) {
function r(t, e) {
for (var i = e.constructor._executionOrder, n = e.__instanceId, o = 0, r = t.length - 1, s = r >>> 1; o <= r; s = o + r >>> 1) {
var c = t[s], a = c.constructor._executionOrder;
if (a > i) r = s - 1; else if (a < i) o = s + 1; else {
var l = c.__instanceId;
if (l > n) r = s - 1; else {
if (!(l < n)) return s;
o = s + 1;
}
}
}
return ~o;
}
function s(t, e) {
for (var i = t.array, n = t.i + 1; n < i.length; ) {
var o = i[n];
if (o._enabled && o.node._activeInHierarchy) ++n; else {
t.removeAt(n);
e && (o._objFlags &= ~e);
}
}
}
function c(t, e) {
return t.constructor._executionOrder - e.constructor._executionOrder;
}
function a(i, n) {
if ("function" === ("object" == (e = typeof i) ? t(i) : e)) return n ? function(t, e) {
var n = t.array;
for (t.i = 0; t.i < n.length; ++t.i) {
var o = n[t.i];
i(o, e);
}
} : function(t) {
var e = t.array;
for (t.i = 0; t.i < e.length; ++t.i) {
var n = e[t.i];
i(n);
}
};
var o = "var a=it.array;for(it.i=0;it.i<a.length;++it.i){var c=a[it.i];" + i + "}";
return n ? Function("it", "dt", o) : Function("it", o);
}
function l() {
this.startInvoker = new v(a(_));
this.updateInvoker = new m(a(p, !0));
this.lateUpdateInvoker = new m(a(g, !0));
this.scheduleInNextFrame = [];
this._updating = !1;
}
i("./platform/CCClass");
var h = i("./platform/CCObject").Flags, u = i("./platform/js").array, d = h.IsStartCalled, f = h.IsOnEnableCalled, _ = (h.IsEditorOnEnableCalled, 
"c.start();c._objFlags|=" + d), p = "c.update(dt)", g = "c.lateUpdate(dt)", y = cc.Class({
__ctor__: function(t) {
var e = u.MutableForwardIterator;
this._zero = new e([]);
this._neg = new e([]);
this._pos = new e([]);
0;
this._invoke = t;
},
statics: {
stableRemoveInactive: s
},
add: null,
remove: null,
invoke: null
}), v = cc.Class({
extends: y,
add: function(t) {
var e = t.constructor._executionOrder;
(0 === e ? this._zero : e < 0 ? this._neg : this._pos).array.push(t);
},
remove: function(t) {
var e = t.constructor._executionOrder;
(0 === e ? this._zero : e < 0 ? this._neg : this._pos).fastRemove(t);
},
cancelInactive: function(t) {
s(this._zero, t);
s(this._neg, t);
s(this._pos, t);
},
invoke: function() {
var t = this._neg;
if (t.array.length > 0) {
t.array.sort(c);
this._invoke(t);
t.array.length = 0;
}
this._invoke(this._zero);
this._zero.array.length = 0;
var e = this._pos;
if (e.array.length > 0) {
e.array.sort(c);
this._invoke(e);
e.array.length = 0;
}
}
}), m = cc.Class({
extends: y,
add: function(t) {
var e = t.constructor._executionOrder;
if (0 === e) this._zero.array.push(t); else {
var i = e < 0 ? this._neg.array : this._pos.array, n = r(i, t);
n < 0 && i.splice(~n, 0, t);
}
},
remove: function(t) {
var e = t.constructor._executionOrder;
if (0 === e) this._zero.fastRemove(t); else {
var i = e < 0 ? this._neg : this._pos, n = r(i.array, t);
n >= 0 && i.removeAt(n);
}
},
invoke: function(t) {
this._neg.array.length > 0 && this._invoke(this._neg, t);
this._invoke(this._zero, t);
this._pos.array.length > 0 && this._invoke(this._pos, t);
}
}), C = cc.Class({
ctor: l,
unscheduleAll: l,
statics: {
LifeCycleInvoker: y,
OneOffInvoker: v,
createInvokeImpl: a,
invokeOnEnable: function(t) {
var e = cc.director._compScheduler, i = t.array;
for (t.i = 0; t.i < i.length; ++t.i) {
var n = i[t.i];
if (n._enabled) {
n.onEnable();
!n.node._activeInHierarchy || e._onEnabled(n);
}
}
}
},
_onEnabled: function(t) {
cc.director.getScheduler().resumeTarget(t);
t._objFlags |= f;
this._updating ? this.scheduleInNextFrame.push(t) : this._scheduleImmediate(t);
},
_onDisabled: function(t) {
cc.director.getScheduler().pauseTarget(t);
t._objFlags &= ~f;
var e = this.scheduleInNextFrame.indexOf(t);
if (e >= 0) u.fastRemoveAt(this.scheduleInNextFrame, e); else {
!t.start || t._objFlags & d || this.startInvoker.remove(t);
t.update && this.updateInvoker.remove(t);
t.lateUpdate && this.lateUpdateInvoker.remove(t);
}
},
enableComp: function(t, e) {
if (!(t._objFlags & f)) {
if (t.onEnable) {
if (e) {
e.add(t);
return;
}
t.onEnable();
if (!t.node._activeInHierarchy) return;
}
this._onEnabled(t);
}
},
disableComp: function(t) {
if (t._objFlags & f) {
t.onDisable && t.onDisable();
this._onDisabled(t);
}
},
_scheduleImmediate: function(t) {
!t.start || t._objFlags & d || this.startInvoker.add(t);
t.update && this.updateInvoker.add(t);
t.lateUpdate && this.lateUpdateInvoker.add(t);
},
_deferredSchedule: function() {
for (var t = this.scheduleInNextFrame, e = 0, i = t.length; e < i; e++) {
var n = t[e];
this._scheduleImmediate(n);
}
t.length = 0;
},
startPhase: function() {
this._updating = !0;
this.scheduleInNextFrame.length > 0 && this._deferredSchedule();
this.startInvoker.invoke();
},
updatePhase: function(t) {
this.updateInvoker.invoke(t);
},
lateUpdatePhase: function(t) {
this.lateUpdateInvoker.invoke(t);
this._updating = !1;
}
});
n.exports = C;
}), {
"./platform/CCClass": 127,
"./platform/CCObject": 131,
"./platform/js": 142,
"./utils/misc": 152
} ],
41: [ (function(t, e, i) {
function n(t, e) {
return t === e || t && e && (t.name === e.name || t._uuid === e._uuid);
}
var o = t("../../animation/animation-animator"), r = t("../../animation/animation-clip"), s = cc.Class({
name: "cc.Animation",
extends: t("./CCComponent"),
mixins: [ cc.EventTarget ],
editor: !1,
ctor: function() {
cc.EventTarget.call(this);
this._animator = null;
this._nameToState = {};
this._didInit = !1;
this._currentClip = null;
},
properties: {
_defaultClip: {
default: null,
type: r
},
defaultClip: {
type: r,
get: function() {
return this._defaultClip;
},
set: function(t) {
return;
},
tooltip: !1
},
currentClip: {
get: function() {
return this._currentClip;
},
set: function(t) {
this._currentClip = t;
},
type: r,
visible: !1
},
_clips: {
default: [],
type: [ r ],
tooltip: !1,
visible: !0
},
playOnLoad: {
default: !1,
tooltip: !1
}
},
start: function() {
if (this.playOnLoad && this._defaultClip) {
if (!(this._animator && this._animator.isPlaying)) {
var t = this.getAnimationState(this._defaultClip.name);
this._animator.playState(t);
}
}
},
onEnable: function() {
this._animator && this._animator.resume();
},
onDisable: function() {
this._animator && this._animator.pause();
},
onDestroy: function() {
this.stop();
},
getClips: function() {
return this._clips;
},
play: function(t, e) {
var i = this.playAdditive(t, e);
this._animator.stopStatesExcept(i);
return i;
},
playAdditive: function(t, e) {
this._init();
var i = this.getAnimationState(t || this._defaultClip && this._defaultClip.name);
if (i) {
this.enabled = !0;
var n = this._animator;
if (n.isPlaying && i.isPlaying) if (i.isPaused) n.resumeState(i); else {
n.stopState(i);
n.playState(i, e);
} else n.playState(i, e);
this.currentClip = i.clip;
}
return i;
},
stop: function(t) {
if (this._didInit) if (t) {
var e = this._nameToState[t];
e && this._animator.stopState(e);
} else this._animator.stop();
},
pause: function(t) {
if (this._didInit) if (t) {
var e = this._nameToState[t];
e && this._animator.pauseState(e);
} else this.enabled = !1;
},
resume: function(t) {
if (this._didInit) if (t) {
var e = this._nameToState[t];
e && this._animator.resumeState(e);
} else this.enabled = !0;
},
setCurrentTime: function(t, e) {
this._init();
if (e) {
var i = this._nameToState[e];
i && this._animator.setStateTime(i, t);
} else this._animator.setStateTime(t);
},
getAnimationState: function(t) {
this._init();
var e = this._nameToState[t];
0;
e && !e.curveLoaded && this._animator._reloadClip(e);
return e || null;
},
addClip: function(t, e) {
if (t) {
this._init();
cc.js.array.contains(this._clips, t) || this._clips.push(t);
e = e || t.name;
var i = this._nameToState[e];
if (i) {
if (i.clip === t) return i;
var n = this._clips.indexOf(i.clip);
-1 !== n && this._clips.splice(n, 1);
}
var o = new cc.AnimationState(t, e);
this._nameToState[e] = o;
return o;
}
cc.warnID(3900);
},
removeClip: function(t, e) {
if (t) {
this._init();
var i;
for (var n in this._nameToState) {
if ((i = this._nameToState[n]).clip === t) break;
}
if (t === this._defaultClip) {
if (!e) {
cc.warnID(3902);
return;
}
this._defaultClip = null;
}
if (i && i.isPlaying) {
if (!e) {
cc.warnID(3903);
return;
}
this.stop(i.name);
}
this._clips = this._clips.filter((function(e) {
return e !== t;
}));
i && delete this._nameToState[i.name];
} else cc.warnID(3901);
},
sample: function(t) {
this._init();
if (t) {
var e = this._nameToState[t];
e && e.sample();
} else this._animator.sample();
},
on: function(t, e, i, n) {
this._init();
for (var o = cc.EventTarget.prototype.on.call(this, t, e, i, n), r = this._animator._anims.array, s = 0; s < r.length; ++s) r[s]._setListeners(this);
return o;
},
off: function(t, e, i, n) {
this._init();
cc.EventTarget.prototype.off.call(this, t, e, i, n);
var o = this._nameToState;
for (var r in o) {
o[r]._setListeners(null);
}
},
_init: function() {
if (!this._didInit) {
this._didInit = !0;
this._animator = new o(this.node, this);
this._createStates();
}
},
_createStates: function() {
this._nameToState = {};
for (var t = null, e = !1, i = 0; i < this._clips.length; ++i) {
var o = this._clips[i];
if (o) {
t = new cc.AnimationState(o);
0;
this._nameToState[t.name] = t;
n(this._defaultClip, o) && (e = t);
}
}
if (this._defaultClip && !e) {
t = new cc.AnimationState(this._defaultClip);
0;
this._nameToState[t.name] = t;
}
}
});
cc.Animation = e.exports = s;
}), {
"../../animation/animation-animator": 4,
"../../animation/animation-clip": 5,
"./CCComponent": 46
} ],
42: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.AudioSource",
extends: t("./CCComponent"),
editor: !1,
ctor: function() {
this.audio = new cc.Audio();
},
properties: {
_clip: {
default: "",
url: cc.AudioClip
},
_volume: 1,
_mute: !1,
_loop: !1,
_pausedFlag: {
default: !1,
serializable: !1
},
isPlaying: {
get: function() {
if (!this.audio) return !1;
return this.audio.getState() === cc.Audio.State.PLAYING;
},
visible: !1
},
clip: {
get: function() {
return this._clip;
},
set: function(t) {
if (t !== this._clip) {
this._clip = t;
this.audio.stop();
this.audio.src = this._clip;
this.audio.preload && this.audio.preload();
}
},
url: cc.AudioClip,
tooltip: !1,
animatable: !1
},
volume: {
get: function() {
return this._volume;
},
set: function(t) {
t = cc.clamp01(t);
this._volume = t;
var e = this.audio;
if (e && !this._mute) {
e.setVolume(t);
e._loaded || e.on("load", (function() {
e.setVolume(t);
}));
}
return t;
},
tooltip: !1
},
mute: {
get: function() {
return this._mute;
},
set: function(t) {
this._mute = t;
this.audio && this.audio.setVolume(t ? 0 : this._volume);
return t;
},
animatable: !1,
tooltip: !1
},
loop: {
get: function() {
return this._loop;
},
set: function(t) {
this._loop = t;
this.audio && this.audio.setLoop(t);
return t;
},
animatable: !1,
tooltip: !1
},
playOnLoad: {
default: !1,
tooltip: !1,
animatable: !1
},
preload: {
default: !1,
animatable: !1
}
},
_pausedCallback: function() {
var t = this.audio;
if (t && !t.paused) {
this.audio.pause();
this._pausedFlag = !0;
}
},
_restoreCallback: function() {
if (this.audio) {
this._pausedFlag && this.audio.resume();
this._pausedFlag = !1;
}
},
onEnable: function() {
this.playOnLoad && this.play();
if (this.preload) {
this.audio.src = this._clip;
this.audio.preload();
}
cc.game.on(cc.game.EVENT_HIDE, this._pausedCallback, this);
cc.game.on(cc.game.EVENT_SHOW, this._restoreCallback, this);
},
onDisable: function() {
this.stop();
cc.game.off(cc.game.EVENT_HIDE, this._pausedCallback, this);
cc.game.off(cc.game.EVENT_SHOW, this._restoreCallback, this);
},
onDestroy: function() {
this.stop();
cc.audioEngine.uncache(this._clip);
},
play: function() {
if (this._clip) {
var t = this._mute ? 0 : this._volume, e = this.audio, i = this._loop;
if (e._loaded) {
e.stop();
e.setCurrentTime(0);
e.play();
} else {
e.src = this._clip;
e.once("load", (function() {
e.setLoop(i);
e.setVolume(t);
e.play();
}));
e.preload();
}
}
},
stop: function() {
this.audio && this.audio.stop();
},
pause: function() {
this.audio && this.audio.pause();
},
resume: function() {
this.audio && this.audio.resume();
},
rewind: function() {
this.audio && this.audio.setCurrentTime(0);
},
getCurrentTime: function() {
var t = 0;
this.audio && (t = this.audio.getCurrentTime());
return t;
},
setCurrentTime: function(t) {
var e = this.audio;
if (!e) return t;
if (!e._loaded) {
e.once("load", (function() {
e.setCurrentTime(t);
}));
return t;
}
e.setCurrentTime(t);
return t;
},
getDuration: function() {
var t = 0;
this.audio && (t = this.audio.getDuration());
return t;
}
});
cc.AudioSource = e.exports = n;
}), {
"./CCComponent": 46
} ],
43: [ (function(t, e, i) {
function n(t) {
t.stopPropagation();
}
var o = [ "touchstart", "touchmove", "touchend", "mousedown", "mousemove", "mouseup", "mouseenter", "mouseleave", "mousewheel" ], r = cc.Class({
name: "cc.BlockInputEvents",
extends: t("./CCComponent"),
editor: {
menu: "i18n:MAIN_MENU.component.ui/Block Input Events",
inspector: "packages://inspector/inspectors/comps/block-input-events.js",
help: "i18n:COMPONENT.help_url.block-input-events"
},
onEnable: function() {
for (var t = 0; t < o.length; t++) this.node.on(o[t], n, this);
},
onDisable: function() {
for (var t = 0; t < o.length; t++) this.node.off(o[t], n, this);
}
});
cc.BlockInputEvents = e.exports = r;
}), {
"./CCComponent": 46
} ],
44: [ (function(t, e, i) {
var n = cc.Enum({
NONE: 0,
COLOR: 1,
SPRITE: 2,
SCALE: 3
}), o = cc.Class({
name: "cc.Button",
extends: t("./CCComponent"),
ctor: function() {
this._resetState();
this._fromColor = null;
this._toColor = null;
this._time = 0;
this._transitionFinished = !0;
this._fromScale = 1;
this._toScale = 1;
this._originalScale = 1;
this._sprite = null;
0;
},
_resetState: function() {
this._pressed = !1;
this._hovered = !1;
},
editor: !1,
properties: {
interactable: {
default: !0,
tooltip: !1,
notify: function(t) {
0;
this._updateState();
this.interactable || this._resetState();
},
animatable: !1
},
_resizeToTarget: {
animatable: !1,
set: function(t) {
t && this._resizeNodeToTargetNode();
}
},
enableAutoGrayEffect: {
default: !1,
tooltip: !1,
notify: function() {
this._updateDisabledState();
}
},
transition: {
default: n.NONE,
tooltip: !1,
type: n,
animatable: !1
},
normalColor: {
default: cc.color(214, 214, 214),
displayName: "Normal",
tooltip: !1,
notify: function() {
this._updateState();
}
},
pressedColor: {
default: cc.color(211, 211, 211),
displayName: "Pressed",
tooltip: !1
},
hoverColor: {
default: cc.Color.WHITE,
displayName: "Hover",
tooltip: !1
},
disabledColor: {
default: cc.color(124, 124, 124),
displayName: "Disabled",
tooltip: !1,
notify: function() {
this._updateState();
}
},
duration: {
default: .1,
range: [ 0, 10 ],
tooltip: !1
},
zoomScale: {
default: 1.2,
tooltip: !1
},
normalSprite: {
default: null,
type: cc.SpriteFrame,
displayName: "Normal",
tooltip: !1,
notify: function() {
this._updateState();
}
},
pressedSprite: {
default: null,
type: cc.SpriteFrame,
displayName: "Pressed",
tooltip: !1,
formerlySerializedAs: "pressedSprite",
notify: function() {
this._updateState();
}
},
hoverSprite: {
default: null,
type: cc.SpriteFrame,
displayName: "Hover",
tooltip: !1,
formerlySerializedAs: "hoverSprite",
notify: function() {
this._updateState();
}
},
disabledSprite: {
default: null,
type: cc.SpriteFrame,
displayName: "Disabled",
tooltip: !1,
notify: function() {
this._updateState();
}
},
target: {
default: null,
type: cc.Node,
tooltip: !1,
notify: function() {
this._applyTarget();
}
},
clickEvents: {
default: [],
type: cc.Component.EventHandler,
tooltip: !1
}
},
statics: {
Transition: n
},
__preload: function() {
this.target || (this.target = this.node);
this._applyTarget();
this._updateState();
},
onEnable: function() {
this.normalSprite && this.normalSprite.ensureLoadTexture();
this.hoverSprite && this.hoverSprite.ensureLoadTexture();
this.pressedSprite && this.pressedSprite.ensureLoadTexture();
this.disabledSprite && this.disabledSprite.ensureLoadTexture();
this._registerEvent();
},
update: function(t) {
var e = this.target;
if (!this._transitionFinished && (this.transition === n.COLOR || this.transition === n.SCALE)) {
this.time += t;
var i = 1;
this.duration > 0 && (i = this.time / this.duration);
if (i >= 1) {
i = 1;
this._transitionFinished = !0;
}
this.transition === n.COLOR ? e.color = this._fromColor.lerp(this._toColor, i) : this.transition === n.SCALE && (e.scale = cc.lerp(this._fromScale, this._toScale, i));
}
},
_registerEvent: function() {
this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
this.node.on(cc.Node.EventType.MOUSE_ENTER, this._onMouseMoveIn, this);
this.node.on(cc.Node.EventType.MOUSE_LEAVE, this._onMouseMoveOut, this);
},
_getTargetSprite: function(t) {
var e = null;
t && (e = t.getComponent(cc.Sprite));
return e;
},
_applyTarget: function() {
this._sprite = this._getTargetSprite(this.target);
this.target && (this._originalScale = this.target.scale);
},
_onTouchBegan: function(t) {
if (this.interactable && this.enabledInHierarchy) {
this._pressed = !0;
this._updateState();
t.stopPropagation();
}
},
_onTouchMove: function(t) {
if (this.interactable && this.enabledInHierarchy && this._pressed) {
var e = t.touch, i = this.node._hitTest(e.getLocation());
if (this.transition === n.SCALE && this.target) if (i) {
this._fromScale = this._originalScale;
this._toScale = this._originalScale * this.zoomScale;
this._transitionFinished = !1;
} else {
this.time = 0;
this._transitionFinished = !0;
this.target.scale = this._originalScale;
} else {
var o;
o = i ? "pressed" : "normal";
this._applyTransition(o);
}
t.stopPropagation();
}
},
_onTouchEnded: function(t) {
if (this.interactable && this.enabledInHierarchy) {
if (this._pressed) {
cc.Component.EventHandler.emitEvents(this.clickEvents, t);
this.node.emit("click", this);
}
this._pressed = !1;
this._updateState();
t.stopPropagation();
}
},
_zoomUp: function() {
this._fromScale = this._originalScale;
this._toScale = this._originalScale * this.zoomScale;
this.time = 0;
this._transitionFinished = !1;
},
_zoomBack: function() {
this._fromScale = this.target.scale;
this._toScale = this._originalScale;
this.time = 0;
this._transitionFinished = !1;
},
_onTouchCancel: function() {
if (this.interactable && this.enabledInHierarchy) {
this._pressed = !1;
this._updateState();
}
},
_onMouseMoveIn: function() {
if (!this._pressed && this.interactable && this.enabledInHierarchy && (this.transition !== n.SPRITE || this.hoverSprite) && !this._hovered) {
this._hovered = !0;
this._updateState();
}
},
_onMouseMoveOut: function() {
if (this._hovered) {
this._hovered = !1;
this._updateState();
}
},
_updateState: function() {
var t = this._getButtonState();
this._applyTransition(t);
this._updateDisabledState();
},
onDisable: function() {
this._hovered = !1;
this._pressed = !1;
this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
this.node.off(cc.Node.EventType.MOUSE_ENTER, this._onMouseMoveIn, this);
this.node.off(cc.Node.EventType.MOUSE_LEAVE, this._onMouseMoveOut, this);
},
_getButtonState: function() {
return this.interactable ? this._pressed ? "pressed" : this._hovered ? "hover" : "normal" : "disabled";
},
_updateColorTransition: function(t) {
var e = this[t + "Color"], i = this.target;
this._fromColor = i.color.clone();
this._toColor = e;
this.time = 0;
this._transitionFinished = !1;
},
_updateSpriteTransition: function(t) {
var e = this[t + "Sprite"];
this._sprite && e && (this._sprite.spriteFrame = e);
},
_updateScaleTransition: function(t) {
"pressed" === t ? this._zoomUp() : this._zoomBack();
},
_applyTransition: function(t) {
var e = this.transition;
e === n.COLOR ? this._updateColorTransition(t) : e === n.SPRITE ? this._updateSpriteTransition(t) : e === n.SCALE && this._updateScaleTransition(t);
},
_resizeNodeToTargetNode: !1,
_updateDisabledState: function() {
this._sprite && this._sprite._sgNode.setState(0);
this.enableAutoGrayEffect && this.transition !== n.COLOR && (this.transition === n.SPRITE && this.disabledSprite || this._sprite && !this.interactable && this._sprite._sgNode.setState(1));
}
});
cc.Button = e.exports = o;
}), {
"./CCComponent": 46
} ],
45: [ (function(t, e, i) {
var n = t("../event-manager"), o = {
getContentSize: function() {
return cc.visibleRect;
},
setContentSize: function(t) {},
_getWidth: function() {
return this.getContentSize().width;
},
_getHeight: function() {
return this.getContentSize().height;
}
}, r = cc.Class({
name: "cc.Canvas",
extends: t("./CCComponent"),
editor: !1,
resetInEditor: !1,
statics: {
instance: null
},
properties: {
_designResolution: cc.size(960, 640),
designResolution: {
get: function() {
return cc.size(this._designResolution);
},
set: function(t) {
this._designResolution.width = t.width;
this._designResolution.height = t.height;
this.applySettings();
},
tooltip: !1
},
_fitWidth: !1,
_fitHeight: !0,
fitHeight: {
get: function() {
return this._fitHeight;
},
set: function(t) {
if (this._fitHeight !== t) {
this._fitHeight = t;
this.applySettings();
}
},
tooltip: !1
},
fitWidth: {
get: function() {
return this._fitWidth;
},
set: function(t) {
if (this._fitWidth !== t) {
this._fitWidth = t;
this.applySettings();
}
},
tooltip: !1
}
},
ctor: function() {
this._thisOnResized = cc.EventListener.create({
event: cc.EventListener.CUSTOM,
eventName: "window-resize",
callback: this.onResized.bind(this)
});
this._thisOnResized.retain();
},
__preload: function() {
if (r.instance) return cc.errorID(6700, this.node.name, r.instance.node.name);
r.instance = this;
if (this.node._sizeProvider) {
} else this.node._sizeProvider = o;
cc.director.on(cc.Director.EVENT_BEFORE_VISIT, this.alignWithScreen, this);
n.addListener(this._thisOnResized, 1);
this.applySettings();
this.onResized();
},
onDestroy: function() {
this.node._sizeProvider === o && (this.node._sizeProvider = null);
cc.director.off(cc.Director.EVENT_BEFORE_VISIT, this.alignWithScreen, this);
n.removeListener(this._thisOnResized);
this._thisOnResized.release();
r.instance === this && (r.instance = null);
},
alignWithScreen: function() {
var t, e = cc.visibleRect, i = 0, n = 0;
if (!this.fitHeight && !this.fitWidth) {
i = .5 * ((t = cc.view.getDesignResolutionSize()).width - e.width);
n = .5 * (t.height - e.height);
}
this.node.setPosition(.5 * e.width + i, .5 * e.height + n);
},
onResized: function() {
this.alignWithScreen();
},
applySettings: function() {
var t, e = cc.ResolutionPolicy;
t = this.fitHeight && this.fitWidth ? e.SHOW_ALL : this.fitHeight || this.fitWidth ? this.fitWidth ? e.FIXED_WIDTH : e.FIXED_HEIGHT : e.NO_BORDER;
var i = this._designResolution;
cc.view.setDesignResolutionSize(i.width, i.height, t);
}
});
cc.Canvas = e.exports = r;
}), {
"../event-manager": 76,
"./CCComponent": 46
} ],
46: [ (function(i, n, o) {
var r = i("../platform/CCObject"), s = i("../platform/js"), c = new (i("../platform/id-generater"))("Comp"), a = r.Flags.IsOnEnableCalled, l = r.Flags.IsOnLoadCalled, h = cc.Class({
name: "cc.Component",
extends: r,
ctor: function() {
this.__instanceId = cc.ClassManager.getNewInstanceId();
this.__eventTargets = [];
},
properties: {
node: {
default: null,
visible: !1
},
name: {
get: function() {
if (this._name) return this._name;
var t = cc.js.getClassName(this), e = t.lastIndexOf(".");
e >= 0 && (t = t.slice(e + 1));
return this.node.name + "<" + t + ">";
},
set: function(t) {
this._name = t;
},
visible: !1
},
_id: {
default: "",
serializable: !1
},
uuid: {
get: function() {
var t = this._id;
if (!t) {
t = this._id = c.getNewId();
0;
}
return t;
},
visible: !1
},
__scriptAsset: !1,
_enabled: !0,
enabled: {
get: function() {
return this._enabled;
},
set: function(t) {
if (this._enabled !== t) {
this._enabled = t;
if (this.node._activeInHierarchy) {
var e = cc.director._compScheduler;
t ? e.enableComp(this) : e.disableComp(this);
}
}
},
visible: !1
},
enabledInHierarchy: {
get: function() {
return (this._objFlags & a) > 0;
},
visible: !1
},
_isOnLoadCalled: {
get: function() {
return this._objFlags & l;
}
}
},
update: null,
lateUpdate: null,
__preload: null,
onLoad: null,
start: null,
onEnable: null,
onDisable: null,
onDestroy: null,
onFocusInEditor: null,
onLostFocusInEditor: null,
resetInEditor: null,
addComponent: function(t) {
return this.node.addComponent(t);
},
getComponent: function(t) {
return this.node.getComponent(t);
},
getComponents: function(t) {
return this.node.getComponents(t);
},
getComponentInChildren: function(t) {
return this.node.getComponentInChildren(t);
},
getComponentsInChildren: function(t) {
return this.node.getComponentsInChildren(t);
},
_getLocalBounds: null,
onRestore: null,
destroy: function() {
this._super() && this._enabled && this.node._activeInHierarchy && cc.director._compScheduler.disableComp(this);
},
_onPreDestroy: function() {
this.unscheduleAllCallbacks();
for (var t = this.__eventTargets, e = 0, i = t.length; e < i; ++e) {
var n = t[e];
n && n.targetOff(this);
}
t.length = 0;
0;
cc.director._nodeActivator.destroyComp(this);
this.node._removeComponent(this);
0;
},
_instantiate: function(t) {
t || (t = cc.instantiate._clone(this, this));
t.node = null;
return t;
},
isRunning: function() {
return this.enabledInHierarchy;
},
schedule: function(t, e, i, n) {
cc.assertID(t, 1619);
cc.assertID(e >= 0, 1620);
e = e || 0;
i = isNaN(i) ? cc.macro.REPEAT_FOREVER : i;
n = n || 0;
var o = cc.director.getScheduler(), r = o.isTargetPaused(this);
o.schedule(t, this, e, i, n, r);
},
scheduleOnce: function(t, e) {
this.schedule(t, 0, 0, e);
},
unschedule: function(t) {
t && cc.director.getScheduler().unschedule(t, this);
},
unscheduleAllCallbacks: function() {
cc.director.getScheduler().unscheduleAllForTarget(this);
}
});
h._requireComponent = null;
h._executionOrder = 0;
0;
s.value(h, "_registerEditorProps", (function(i, n) {
var o = n.requireComponent;
o && (i._requireComponent = o);
var r = n.executionOrder;
r && "number" === ("object" == (e = typeof r) ? t(r) : e) && (i._executionOrder = r);
}));
h.prototype.__scriptUuid = "";
cc.Component = n.exports = h;
}), {
"../platform/CCObject": 131,
"../platform/id-generater": 138,
"../platform/js": 142
} ],
47: [ (function(i, n, o) {
cc.Component.EventHandler = cc.Class({
name: "cc.ClickEvent",
properties: {
target: {
default: null,
type: cc.Node
},
component: {
default: ""
},
handler: {
default: ""
},
customEventData: {
default: ""
}
},
statics: {
emitEvents: function(t) {
"use strict";
var e, i, n;
if (arguments.length > 0) for (i = 0, n = (e = new Array(arguments.length - 1)).length; i < n; i++) e[i] = arguments[i + 1];
for (i = 0, n = t.length; i < n; i++) {
var o = t[i];
o instanceof cc.Component.EventHandler && o.emit(e);
}
}
},
emit: function(i) {
var n = this.target;
if (cc.isValid(n)) {
var o = n.getComponent(this.component);
if (cc.isValid(o)) {
var r = o[this.handler];
if ("function" === ("object" == (e = typeof r) ? t(r) : e)) {
null != this.customEventData && "" !== this.customEventData && (i = i.slice()).push(this.customEventData);
r.apply(o, i);
}
}
}
}
});
}), {} ],
48: [ (function(t, e, i) {
t("../editbox/CCSGEditBox");
var n = _ccsg.EditBox.KeyboardReturnType, o = _ccsg.EditBox.InputMode, r = _ccsg.EditBox.InputFlag, s = cc.Class({
name: "cc.EditBox",
extends: cc._RendererUnderSG,
editor: !1,
properties: {
_useOriginalSize: !0,
_string: "",
string: {
tooltip: !1,
get: function() {
return this._sgNode.string;
},
set: function(t) {
this._sgNode.string = this._string = t;
}
},
backgroundImage: {
tooltip: !1,
default: null,
type: cc.SpriteFrame,
notify: function() {
var t = this._sgNode, e = t.getBackgroundSprite();
if (this.backgroundImage) {
this._createBackgroundSprite().setContentSize(t.getContentSize());
} else e.removeFromParent();
}
},
returnType: {
default: n.DEFAULT,
tooltip: !1,
displayName: "KeyboardReturnType",
type: n,
notify: function() {
this._sgNode.returnType = this.returnType;
}
},
inputFlag: {
tooltip: !1,
default: r.DEFAULT,
type: r,
notify: function() {
this._sgNode.inputFlag = this.inputFlag;
}
},
inputMode: {
tooltip: !1,
default: o.ANY,
type: o,
notify: function() {
this._sgNode.inputMode = this.inputMode;
}
},
fontSize: {
tooltip: !1,
default: 20,
notify: function() {
this._sgNode.fontSize = this.fontSize;
}
},
lineHeight: {
tooltip: !1,
default: 40,
notify: function() {
this._sgNode.setLineHeight(this.lineHeight);
}
},
fontColor: {
tooltip: !1,
default: cc.Color.WHITE,
notify: function() {
this._sgNode.fontColor = this.fontColor;
}
},
placeholder: {
tooltip: !1,
default: "Enter text here...",
notify: function() {
this._sgNode.placeholder = this.placeholder;
}
},
placeholderFontSize: {
tooltip: !1,
default: 20,
notify: function() {
this._sgNode.placeholderFontSize = this.placeholderFontSize;
}
},
placeholderFontColor: {
tooltip: !1,
default: cc.Color.GRAY,
notify: function() {
this._sgNode.placeholderFontColor = this.placeholderFontColor;
}
},
maxLength: {
tooltip: !1,
default: 20,
notify: function() {
this._sgNode.maxLength = this.maxLength;
}
},
stayOnTop: {
tooltip: !1,
default: !1,
notify: function() {
0;
}
},
_tabIndex: 0,
tabIndex: {
tooltip: !1,
get: function() {
return this._tabIndex;
},
set: function(t) {
this._tabIndex = t;
this._sgNode.setTabIndex(t);
}
},
editingDidBegan: {
default: [],
type: cc.Component.EventHandler
},
textChanged: {
default: [],
type: cc.Component.EventHandler
},
editingDidEnded: {
default: [],
type: cc.Component.EventHandler
},
editingReturn: {
default: [],
type: cc.Component.EventHandler
}
},
statics: {
KeyboardReturnType: n,
InputFlag: r,
InputMode: o
},
_applyCapInset: function(t) {
var e = this.backgroundImage;
t.setInsetTop(e.insetTop);
t.setInsetBottom(e.insetBottom);
t.setInsetRight(e.insetRight);
t.setInsetLeft(e.insetLeft);
},
_createSgNode: function() {
return new _ccsg.EditBox(cc.size(160, 40));
},
_createBackgroundSprite: function() {
var t = this._sgNode, e = new cc.Scale9Sprite();
e.setRenderingType(cc.Scale9Sprite.RenderingType.SLICED);
if (this.backgroundImage) {
this.backgroundImage.ensureLoadTexture();
e.setSpriteFrame(this.backgroundImage);
this._applyCapInset(e);
}
t.initWithSizeAndBackgroundSprite(cc.size(160, 40), e);
return e;
},
_initSgNode: function() {
var t = this._sgNode;
0;
this._createBackgroundSprite();
t.setContentSize(this.node.getContentSize());
t.inputMode = this.inputMode;
t.maxLength = this.maxLength;
t.string = this._string;
t.fontSize = this.fontSize;
t.fontColor = this.fontColor;
t.placeholder = this.placeholder;
t.placeholderFontSize = this.placeholderFontSize;
t.placeholderFontColor = this.placeholderFontColor;
t.inputFlag = this.inputFlag;
t.returnType = this.returnType;
t.setLineHeight(this.lineHeight);
t.stayOnTop(this.stayOnTop);
t.setTabIndex(this.tabIndex);
t.setDelegate(this);
},
editBoxEditingDidBegan: function() {
cc.Component.EventHandler.emitEvents(this.editingDidBegan, this);
this.node.emit("editing-did-began", this);
},
editBoxEditingDidEnded: function() {
cc.Component.EventHandler.emitEvents(this.editingDidEnded, this);
this.node.emit("editing-did-ended", this);
},
editBoxTextChanged: function(t, e) {
cc.Component.EventHandler.emitEvents(this.textChanged, e, this);
this.node.emit("text-changed", this);
},
editBoxEditingReturn: function() {
cc.Component.EventHandler.emitEvents(this.editingReturn, this);
this.node.emit("editing-return", this);
},
onDestroy: function() {
this._sgNode.setDelegate(null);
this._super();
},
__preload: function() {
this._super();
this._registerEvent();
},
_registerEvent: function() {
0;
},
_onTouchBegan: function(t) {
this._sgNode && this._sgNode._onTouchBegan(t.touch);
t.stopPropagation();
},
_onTouchEnded: function(t) {
this._sgNode && this._sgNode._onTouchEnded();
t.stopPropagation();
},
setFocus: function() {
this._sgNode && this._sgNode.setFocus();
},
isFocused: function() {
var t = !1;
this._sgNode && (t = this._sgNode.isFocused());
return t;
}
});
s.prototype.editBoxEditingDidBegin = function(t) {
this.editBoxEditingDidBegan(t);
};
s.prototype.editBoxEditingDidEnd = function(t) {
this.editBoxEditingDidEnded(t);
};
cc.EditBox = e.exports = s;
}), {
"../editbox/CCSGEditBox": 1
} ],
49: [ (function(i, n, o) {
i("../label/CCSGLabel");
i("../label/CCSGLabelCanvasRenderCmd");
i("../label/CCSGLabelWebGLRenderCmd");
var r = cc.TextAlignment, s = cc.VerticalTextAlignment, c = _ccsg.Label.Overflow, a = cc.Class({
name: "cc.Label",
extends: cc._RendererUnderSG,
ctor: function() {
0;
},
editor: !1,
_updateSgNodeString: function() {
this._sgNode.setString(this.string);
this._updateNodeSize();
},
_updateSgNodeFontSize: function() {
if (this._sgNode) {
this._sgNode.setFontSize(this._fontSize);
this._updateNodeSize();
}
},
properties: {
_useOriginalSize: !0,
string: {
default: "Label",
multiline: !0,
tooltip: !1,
notify: function() {
this._sgNode && this._updateSgNodeString();
}
},
horizontalAlign: {
default: r.LEFT,
type: r,
tooltip: !1,
notify: function() {
this._sgNode && this._sgNode.setHorizontalAlign(this.horizontalAlign);
},
animatable: !1
},
verticalAlign: {
default: s.TOP,
type: s,
tooltip: !1,
notify: function() {
this._sgNode && this._sgNode.setVerticalAlign(this.verticalAlign);
},
animatable: !1
},
_actualFontSize: {
default: 40
},
actualFontSize: {
displayName: "Actual Font Size",
animatable: !1,
readonly: !0,
get: function() {
this._sgNode && (this._actualFontSize = this._sgNode.getFontSize());
return this._actualFontSize;
}
},
_fontSize: 40,
fontSize: {
get: function() {
return this._fontSize;
},
set: function(t) {
this._fontSize = t;
this._updateSgNodeFontSize();
},
tooltip: !1
},
fontFamily: {
default: "Arial",
tooltip: !1,
notify: function() {
this._sgNode && this._sgNode.setFontFamily(this.fontFamily);
},
animatable: !1
},
_lineHeight: 40,
lineHeight: {
get: function() {
this._sgNode && (this._lineHeight = this._sgNode.getLineHeight());
return this._lineHeight;
},
set: function(t) {
this._lineHeight = t;
if (this._sgNode) {
this._sgNode.setLineHeight(t);
this._updateNodeSize();
}
},
tooltip: !1
},
overflow: {
default: c.NONE,
type: c,
tooltip: !1,
notify: function() {
if (this._sgNode) {
this._sgNode.setOverflow(this.overflow);
this._updateNodeSize();
}
},
animatable: !1
},
_enableWrapText: !0,
enableWrapText: {
get: function() {
this._sgNode && (this._enableWrapText = this._sgNode.isWrapTextEnabled());
return this._enableWrapText;
},
set: function(t) {
this._enableWrapText = t;
this._sgNode && this._sgNode.enableWrapText(t);
},
animatable: !1,
tooltip: !1
},
_N$file: null,
font: {
get: function() {
return this._N$file;
},
set: function(i) {
i || (this._isSystemFontUsed = !0);
0;
this._N$file = i;
this._bmFontOriginalSize = -1;
i && this._isSystemFontUsed && (this._isSystemFontUsed = !1);
if (this._sgNode) {
"string" === ("object" == (e = typeof i) ? t(i) : e) && cc.warnID(4e3);
var n = this.font;
if (n instanceof cc.BitmapFont) if (n.spriteFrame) if (n.spriteFrame.textureLoaded()) this._sgNode.setFontAsset(n); else {
cc.warnID(4012, n.name);
this._sgNode.setFontFamily("");
} else {
cc.warnID(4011, n.name);
this._sgNode.setFontFamily("");
} else this._sgNode.setFontAsset(n);
}
i instanceof cc.BitmapFont && (this._bmFontOriginalSize = i.fontSize);
},
type: cc.Font,
tooltip: !1,
animatable: !1
},
_isSystemFontUsed: !0,
useSystemFont: {
get: function() {
return this._isSystemFontUsed;
},
set: function(t) {
0;
this._isSystemFontUsed = !!t;
if (t) {
this.font = null;
this._sgNode && this._sgNode.setFontFamily(this.fontFamily);
}
},
animatable: !1,
tooltip: !1
},
_bmFontOriginalSize: {
displayName: "BMFont Original Size",
default: -1,
serializable: !1,
readonly: !0,
visible: !0,
animatable: !1
},
_spacingX: 0,
spacingX: {
get: function() {
return this._spacingX;
},
set: function(t) {
this._spacingX = t;
if (this._sgNode) {
this._sgNode.setSpacingX(this.spacingX);
this._updateNodeSize();
}
}
}
},
statics: {
HorizontalAlign: r,
VerticalAlign: s,
Overflow: c
},
__preload: function() {
this._super();
0;
this._updateNodeSize();
},
_createSgNode: function() {
return null;
},
_initSgNode: function() {
var i = this.font;
"string" === ("object" == (e = typeof i) ? t(i) : e) && cc.warnID(4e3);
var n;
if (i instanceof cc.BitmapFont) if (i.spriteFrame) if (i.spriteFrame.textureLoaded()) n = this._sgNode = new _ccsg.Label(this.string, JSON.stringify(i._fntConfig), i.spriteFrame); else {
cc.warnID(4012, i.name);
n = this._sgNode = new _ccsg.Label(this.string, null, null, this._fontSize);
} else {
cc.warnID(4011, i.name);
n = this._sgNode = _ccsg.Label.pool.get(this.string);
} else n = this._sgNode = _ccsg.Label.pool.get(this.string, i, null, this._fontSize);
n.retain();
i instanceof cc.BitmapFont && (this._bmFontOriginalSize = i.fontSize);
n.setVisible(!1);
n.setHorizontalAlign(this.horizontalAlign);
n.setVerticalAlign(this.verticalAlign);
n.setFontSize(this._fontSize);
this.useSystemFont && n.setFontFamily(this.fontFamily);
n.setOverflow(this.overflow);
n.enableWrapText(this._enableWrapText);
n.setLineHeight(this._lineHeight);
n.setString(this.string);
i instanceof cc.BitmapFont && n.setSpacingX(this.spacingX);
0;
n.setContentSize(this.node.getContentSize());
n.setColor(this.node.color);
},
_updateNodeSize: function() {
this._sgNode && this._sgNode.parent && (this.overflow !== c.NONE && this.overflow !== c.RESIZE_HEIGHT || this.node.setContentSize(this._sgNode.getContentSize()));
},
onDestroy: function() {
var t = this._sgNode;
this._super();
if (t) {
t.removeFromParent(!0);
_ccsg.Label.pool.put(t);
}
}
});
cc.Label = n.exports = a;
}), {
"../label/CCSGLabel": 1,
"../label/CCSGLabelCanvasRenderCmd": 1,
"../label/CCSGLabelWebGLRenderCmd": 1
} ],
50: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.LabelOutline",
extends: t("./CCComponent"),
editor: !1,
ctor: function() {
this._labelSGNode = null;
},
properties: {
_color: cc.color(255, 255, 255, 255),
_width: 1,
color: {
get: function() {
return this._color;
},
set: function(t) {
this._color = cc.color(t);
this._labelSGNode && this._labelSGNode.setOutlineColor(cc.color(this._color));
}
},
width: {
get: function() {
return this._width;
},
set: function(t) {
this._width = t;
if (this._labelSGNode) {
this._labelSGNode.setOutlineWidth(t);
this._labelSGNode.setMargin(t);
}
}
}
},
onEnable: function() {
var t = this.node.getComponent("cc.Label"), e = this._labelSGNode = t && t._sgNode;
if (this._labelSGNode) {
e.setOutlined(!0);
e.setOutlineColor(cc.color(this._color));
e.setOutlineWidth(this._width);
e.setMargin(this._width);
}
},
onDisable: function() {
if (this._labelSGNode) {
this._labelSGNode.setOutlined(!1);
this._labelSGNode.setMargin(0);
}
this._labelSGNode = null;
}
});
cc.LabelOutline = e.exports = n;
}), {
"./CCComponent": 46
} ],
51: [ (function(t, e, i) {
var n = cc.Enum({
NONE: 0,
HORIZONTAL: 1,
VERTICAL: 2,
GRID: 3
}), o = cc.Enum({
NONE: 0,
CONTAINER: 1,
CHILDREN: 2
}), r = cc.Enum({
HORIZONTAL: 0,
VERTICAL: 1
}), s = cc.Enum({
BOTTOM_TO_TOP: 0,
TOP_TO_BOTTOM: 1
}), c = cc.Enum({
LEFT_TO_RIGHT: 0,
RIGHT_TO_LEFT: 1
}), a = cc.Class({
name: "cc.Layout",
extends: t("./CCComponent"),
editor: !1,
properties: {
_layoutSize: cc.size(300, 200),
_layoutDirty: {
default: !0,
serializable: !1
},
_resize: o.NONE,
_N$layoutType: n.NONE,
type: {
type: n,
get: function() {
return this._N$layoutType;
},
set: function(t) {
this._N$layoutType = t;
this._doLayoutDirty();
},
tooltip: !1,
animatable: !1
},
resizeMode: {
type: o,
tooltip: !1,
animatable: !1,
get: function() {
return this._resize;
},
set: function(t) {
if (this.type !== n.NONE || t !== o.CHILDREN) {
this._resize = t;
this._doLayoutDirty();
}
}
},
cellSize: {
default: cc.size(40, 40),
tooltip: !1,
type: cc.Size,
notify: function() {
this._doLayoutDirty();
}
},
startAxis: {
default: r.HORIZONTAL,
tooltip: !1,
type: r,
notify: function() {
this._doLayoutDirty();
},
animatable: !1
},
_N$padding: {
default: 0
},
paddingLeft: {
default: 0,
tooltip: !1,
notify: function() {
this._doLayoutDirty();
}
},
paddingRight: {
default: 0,
tooltip: !1,
notify: function() {
this._doLayoutDirty();
}
},
paddingTop: {
default: 0,
tooltip: !1,
notify: function() {
this._doLayoutDirty();
}
},
paddingBottom: {
default: 0,
tooltip: !1,
notify: function() {
this._doLayoutDirty();
}
},
spacingX: {
default: 0,
notify: function() {
this._doLayoutDirty();
},
tooltip: !1
},
spacingY: {
default: 0,
notify: function() {
this._doLayoutDirty();
},
tooltip: !1
},
verticalDirection: {
default: s.TOP_TO_BOTTOM,
type: s,
notify: function() {
this._doLayoutDirty();
},
tooltip: !1,
animatable: !1
},
horizontalDirection: {
default: c.LEFT_TO_RIGHT,
type: c,
notify: function() {
this._doLayoutDirty();
},
tooltip: !1,
animatable: !1
}
},
statics: {
Type: n,
VerticalDirection: s,
HorizontalDirection: c,
ResizeMode: o,
AxisDirection: r
},
_migratePaddingData: function() {
this.paddingLeft = this._N$padding;
this.paddingRight = this._N$padding;
this.paddingTop = this._N$padding;
this.paddingBottom = this._N$padding;
this._N$padding = 0;
},
onEnable: function() {
this._addEventListeners();
cc.sizeEqualToSize(this.node.getContentSize(), cc.size(0, 0)) && this.node.setContentSize(this._layoutSize);
0 !== this._N$padding && this._migratePaddingData();
this._doLayoutDirty();
},
onDisable: function() {
this._removeEventListeners();
},
_doLayoutDirty: function() {
this._layoutDirty = !0;
},
_addEventListeners: function() {
cc.director.on(cc.Director.EVENT_BEFORE_VISIT, this.updateLayout, this);
this.node.on("size-changed", this._resized, this);
this.node.on("anchor-changed", this._doLayoutDirty, this);
this.node.on("child-added", this._childAdded, this);
this.node.on("child-removed", this._childRemoved, this);
this.node.on("child-reorder", this._doLayoutDirty, this);
this._addChildrenEventListeners();
},
_removeEventListeners: function() {
cc.director.off(cc.Director.EVENT_BEFORE_VISIT, this.updateLayout, this);
this.node.off("size-changed", this._resized, this);
this.node.off("anchor-changed", this._doLayoutDirty, this);
this.node.off("child-added", this._childAdded, this);
this.node.off("child-removed", this._childRemoved, this);
this.node.off("child-reorder", this._doLayoutDirty, this);
this._removeChildrenEventListeners();
},
_addChildrenEventListeners: function() {
this.node.children.forEach(function(t) {
t.on("size-changed", this._doLayoutDirty, this);
t.on("position-changed", this._doLayoutDirty, this);
t.on("anchor-changed", this._doLayoutDirty, this);
t.on("active-in-hierarchy-changed", this._doLayoutDirty, this);
}.bind(this));
},
_removeChildrenEventListeners: function() {
this.node.children.forEach(function(t) {
t.off("size-changed", this._doLayoutDirty, this);
t.off("position-changed", this._doLayoutDirty, this);
t.off("anchor-changed", this._doLayoutDirty, this);
t.off("active-in-hierarchy-changed", this._doLayoutDirty, this);
}.bind(this));
},
_childAdded: function(t) {
var e = t.detail;
e.on("size-changed", this._doLayoutDirty, this);
e.on("position-changed", this._doLayoutDirty, this);
e.on("anchor-changed", this._doLayoutDirty, this);
e.on("active-in-hierarchy-changed", this._doLayoutDirty, this);
this._doLayoutDirty();
},
_childRemoved: function(t) {
var e = t.detail;
e.off("size-changed", this._doLayoutDirty, this);
e.off("position-changed", this._doLayoutDirty, this);
e.off("anchor-changed", this._doLayoutDirty, this);
e.off("active-in-hierarchy-changed", this._doLayoutDirty, this);
this._doLayoutDirty();
},
_resized: function() {
this._layoutSize = this.node.getContentSize();
this._doLayoutDirty();
},
_doLayoutHorizontally: function(t, e, i, r) {
var a = this.node.getAnchorPoint(), l = this.node.children, h = 1, u = this.paddingLeft, d = -a.x * t;
if (this.horizontalDirection === c.RIGHT_TO_LEFT) {
h = -1;
d = (1 - a.x) * t;
u = this.paddingRight;
}
var f = d + h * u - h * this.spacingX, _ = 0, p = 0, g = 0, y = 0, v = 0, m = 0, C = this.cellSize.width;
this.type !== n.GRID && this.resizeMode === o.CHILDREN && (C = (t - (this.paddingLeft + this.paddingRight) - (l.length - 1) * this.spacingX) / l.length);
l.forEach(function(l) {
if (l.activeInHierarchy) {
if (this._resize === o.CHILDREN) {
l.width = C;
this.type === n.GRID && (l.height = this.cellSize.height);
}
var T = l.anchorX;
g > p && (p = g);
if (l.height >= p) {
g = p;
p = l.height;
m = l.getAnchorPoint().y;
}
this.horizontalDirection === c.RIGHT_TO_LEFT && (T = 1 - l.anchorX);
f = f + h * T * l.width + h * this.spacingX;
var b = h * (1 - T) * l.width;
if (e) {
var S = f + b + h * (h > 0 ? this.paddingRight : this.paddingLeft), E = this.horizontalDirection === c.LEFT_TO_RIGHT && S > (1 - a.x) * t, x = this.horizontalDirection === c.RIGHT_TO_LEFT && S < -a.x * t;
if (E || x) {
if (l.height >= p) {
0 === g && (g = p);
_ += g;
g = p;
} else {
_ += p;
g = l.height;
p = 0;
}
f = d + h * (u + T * l.width);
y++;
}
}
var A = i(l, _, y);
t >= l.width + this.paddingLeft + this.paddingRight && r && l.setPosition(cc.p(f, A));
var N, O = 1, L = 0 === p ? l.height : p;
if (this.verticalDirection === s.TOP_TO_BOTTOM) {
v = v || this.node._contentSize.height;
(N = A + (O = -1) * (L * m + this.paddingBottom)) < v && (v = N);
} else {
v = v || -this.node._contentSize.height;
(N = A + O * (L * m + this.paddingTop)) > v && (v = N);
}
f += b;
}
}.bind(this));
return v;
},
_getVerticalBaseHeight: function(t) {
var e = 0, i = 0;
if (this.resizeMode === o.CONTAINER) {
t.forEach((function(t) {
if (t.activeInHierarchy) {
i++;
e += t.height;
}
}));
e += (i - 1) * this.spacingY + this.paddingBottom + this.paddingTop;
} else e = this.node.getContentSize().height;
return e;
},
_doLayoutVertically: function(t, e, i, r) {
var a = this.node.getAnchorPoint(), l = this.node.children, h = 1, u = this.paddingBottom, d = -a.y * t;
if (this.verticalDirection === s.TOP_TO_BOTTOM) {
h = -1;
d = (1 - a.y) * t;
u = this.paddingTop;
}
var f = d + h * u - h * this.spacingY, _ = 0, p = 0, g = 0, y = 0, v = 0, m = 0, C = this.cellSize.height;
this.type !== n.GRID && this.resizeMode === o.CHILDREN && (C = (t - (this.paddingTop + this.paddingBottom) - (l.length - 1) * this.spacingY) / l.length);
l.forEach(function(l) {
if (l.activeInHierarchy) {
if (this.resizeMode === o.CHILDREN) {
l.height = C;
this.type === n.GRID && (l.width = this.cellSize.width);
}
var T = l.anchorY;
g > p && (p = g);
if (l.width >= p) {
g = p;
p = l.width;
m = l.getAnchorPoint().x;
}
this.verticalDirection === s.TOP_TO_BOTTOM && (T = 1 - l.anchorY);
f = f + h * T * l.height + h * this.spacingY;
var b = h * (1 - T) * l.height;
if (e) {
var S = f + b + h * (h > 0 ? this.paddingTop : this.paddingBottom), E = this.verticalDirection === s.BOTTOM_TO_TOP && S > (1 - a.y) * t, x = this.verticalDirection === s.TOP_TO_BOTTOM && S < -a.y * t;
if (E || x) {
if (l.width >= p) {
0 === g && (g = p);
_ += g;
g = p;
} else {
_ += p;
g = l.width;
p = 0;
}
f = d + h * (u + T * l.height);
y++;
}
}
var A = i(l, _, y);
t >= l.height + (this.paddingTop + this.paddingBottom) && r && l.setPosition(cc.p(A, f));
var N, O = 1, L = 0 === p ? l.width : p;
if (this.horizontalDirection === c.RIGHT_TO_LEFT) {
O = -1;
v = v || this.node._contentSize.width;
(N = A + O * (L * m + this.paddingLeft)) < v && (v = N);
} else {
v = v || -this.node._contentSize.width;
(N = A + O * (L * m + this.paddingRight)) > v && (v = N);
}
f += b;
}
}.bind(this));
return v;
},
_doLayoutBasic: function() {
var t = null;
this.node.children.forEach((function(e) {
e.activeInHierarchy && (t = t ? cc.rectUnion(t, e.getBoundingBoxToWorld()) : e.getBoundingBoxToWorld());
}));
if (t) {
var e = this.node.parent.convertToNodeSpaceAR(cc.p(t.x, t.y));
e = cc.pAdd(e, cc.p(-this.paddingLeft, -this.paddingBottom));
var i = this.node.parent.convertToNodeSpaceAR(cc.p(t.x + t.width, t.y + t.height));
i = cc.pAdd(i, cc.p(this.paddingRight, this.paddingTop));
var n = cc.size(parseFloat((i.x - e.x).toFixed(2)), parseFloat((i.y - e.y).toFixed(2))), o = this.node.getPosition(), r = (o.x - e.x) / n.width, s = (o.y - e.y) / n.height, c = cc.p(parseFloat(r.toFixed(2)), parseFloat(s.toFixed(2)));
this.node.setAnchorPoint(c);
this.node.setContentSize(n);
}
},
_doLayoutGridAxisHorizontal: function(t, e) {
var i = e.width, n = 1, r = -t.y * e.height, c = this.paddingBottom;
if (this.verticalDirection === s.TOP_TO_BOTTOM) {
n = -1;
r = (1 - t.y) * e.height;
c = this.paddingTop;
}
var a = function(t, e, i) {
return r + n * (e + t.anchorY * t.height + c + i * this.spacingY);
}.bind(this), l = 0;
if (this.resizeMode === o.CONTAINER) {
var h = this._doLayoutHorizontally(i, !0, a, !1);
(l = r - h) < 0 && (l *= -1);
r = -t.y * l;
if (this.verticalDirection === s.TOP_TO_BOTTOM) {
n = -1;
r = (1 - t.y) * l;
}
}
this._doLayoutHorizontally(i, !0, a, !0);
this.resizeMode === o.CONTAINER && this.node.setContentSize(i, l);
},
_doLayoutGridAxisVertical: function(t, e) {
var i = e.height, n = 1, r = -t.x * e.width, s = this.paddingLeft;
if (this.horizontalDirection === c.RIGHT_TO_LEFT) {
n = -1;
r = (1 - t.x) * e.width;
s = this.paddingRight;
}
var a = function(t, e, i) {
return r + n * (e + t.anchorX * t.width + s + i * this.spacingX);
}.bind(this), l = 0;
if (this.resizeMode === o.CONTAINER) {
var h = this._doLayoutVertically(i, !0, a, !1);
(l = r - h) < 0 && (l *= -1);
r = -t.x * l;
if (this.horizontalDirection === c.RIGHT_TO_LEFT) {
n = -1;
r = (1 - t.x) * l;
}
}
this._doLayoutVertically(i, !0, a, !0);
this.resizeMode === o.CONTAINER && this.node.setContentSize(l, i);
},
_doLayoutGrid: function() {
var t = this.node.getAnchorPoint(), e = this.node.getContentSize();
this.startAxis === r.HORIZONTAL ? this._doLayoutGridAxisHorizontal(t, e) : this.startAxis === r.VERTICAL && this._doLayoutGridAxisVertical(t, e);
},
_getHorizontalBaseWidth: function(t) {
var e = 0, i = 0;
if (this.resizeMode === o.CONTAINER) {
t.forEach((function(t) {
if (t.activeInHierarchy) {
i++;
e += t.width;
}
}));
e += (i - 1) * this.spacingX + this.paddingLeft + this.paddingRight;
} else e = this.node.getContentSize().width;
return e;
},
_doLayout: function() {
if (this.type === n.HORIZONTAL) {
var t = this._getHorizontalBaseWidth(this.node.children), e = function(t) {
return t.y;
};
this._doLayoutHorizontally(t, !1, e, !0);
this.node.width = t;
} else if (this.type === n.VERTICAL) {
var i = this._getVerticalBaseHeight(this.node.children), r = function(t) {
return t.x;
};
this._doLayoutVertically(i, !1, r, !0);
this.node.height = i;
} else this.type === n.NONE ? this.resizeMode === o.CONTAINER && this._doLayoutBasic() : this.type === n.GRID && this._doLayoutGrid();
},
updateLayout: function() {
if (this._layoutDirty && this.node.children.length > 0) {
this._doLayout();
this._layoutDirty = !1;
}
}
});
Object.defineProperty(a.prototype, "padding", {
get: function() {
cc.warnID(4100);
return this.paddingLeft;
},
set: function(t) {
this._N$padding = t;
this._migratePaddingData();
this._doLayoutDirty();
}
});
cc.Layout = e.exports = a;
}), {
"./CCComponent": 46
} ],
52: [ (function(t, e, i) {
t("../../clipping-nodes/CCClippingNode");
t("../../clipping-nodes/CCClippingNodeCanvasRenderCmd");
t("../../clipping-nodes/CCClippingNodeWebGLRenderCmd");
t("../../shape-nodes/CCDrawNode");
var n = cc._RendererInSG, o = cc.Enum({
RECT: 0,
ELLIPSE: 1,
IMAGE_STENCIL: 2
}), r = cc.Class({
name: "cc.Mask",
extends: n,
editor: !1,
properties: {
_clippingStencil: {
default: null,
serializable: !1
},
_type: o.RECT,
type: {
get: function() {
return this._type;
},
set: function(t) {
this._type = t;
this._refreshStencil();
},
type: o,
tooltip: !1
},
spriteFrame: {
default: null,
type: cc.SpriteFrame,
tooltip: !1,
notify: function() {
this._refreshStencil();
}
},
alphaThreshold: {
default: 1,
type: cc.Float,
range: [ 0, 1, .1 ],
slide: !0,
tooltip: !1,
notify: function() {
cc._renderType !== cc.game.RENDER_TYPE_CANVAS ? this._sgNode.setAlphaThreshold(this.alphaThreshold) : cc.warnID(4201);
}
},
inverted: {
default: !1,
type: cc.Boolean,
tooltip: !1,
notify: function() {
cc._renderType !== cc.game.RENDER_TYPE_CANVAS ? this._sgNode.setInverted(this.inverted) : cc.warnID(4202);
}
},
_segements: 64,
segements: {
get: function() {
return this._segements;
},
set: function(t) {
this._segements = cc.clampf(t, 3, 1e4);
this._refreshStencil();
},
tooltip: !1
},
_resizeToTarget: {
animatable: !1,
set: function(t) {
t && this._resizeNodeToTargetNode();
}
}
},
statics: {
Type: o
},
_resizeNodeToTargetNode: !1,
_initSgNode: function() {},
_createSgNode: function() {
return new cc.ClippingNode();
},
_hitTest: function(t) {
var e = this.node.getContentSize(), i = e.width, n = e.height, r = this.node.getNodeToWorldTransform();
if (this.type === o.RECT || this.type === o.IMAGE_STENCIL) {
var s = cc.rect(0, 0, i, n);
cc._rectApplyAffineTransformIn(s, r);
var c = t.x - s.x, a = s.x + s.width - t.x, l = t.y - s.y, h = s.y + s.height - t.y;
return c >= 0 && a >= 0 && h >= 0 && l >= 0;
}
if (this.type === o.ELLIPSE) {
var u = i / 2, d = n / 2, f = r.a * u + r.c * d + r.tx, _ = r.b * u + r.d * d + r.ty, p = t.x - f, g = t.y - _;
return p * p / (u * u) + g * g / (d * d) < 1;
}
},
onEnable: function() {
this._super();
this.spriteFrame && this.spriteFrame.ensureLoadTexture();
this._refreshStencil();
this.node.on("size-changed", this._refreshStencil, this);
this.node.on("anchor-changed", this._refreshStencil, this);
},
onDisable: function() {
this._super();
this.node.off("size-changed", this._refreshStencil, this);
this.node.off("anchor-changed", this._refreshStencil, this);
},
_calculateCircle: function(t, e, i) {
for (var n = [], o = 2 * Math.PI / i, r = 0; r < i; ++r) n.push(cc.v2(e.x * Math.cos(o * r) + t.x, e.y * Math.sin(o * r) + t.y));
return n;
},
_refreshStencil: function() {
this.type === o.IMAGE_STENCIL && (cc._renderType, cc.game.RENDER_TYPE_WEBGL), 0;
var t = this.node.getContentSize(), e = this.node.getAnchorPoint(), i = this._clippingStencil;
if (this._type === o.IMAGE_STENCIL) {
if (!(i instanceof cc.Scale9Sprite) || i._spriteFrame !== this.spriteFrame) {
(i = new cc.Scale9Sprite()).setSpriteFrame(this.spriteFrame);
this._sgNode.setStencil(i);
}
i.setContentSize(t);
i.setAnchorPoint(e);
this._sgNode.setAlphaThreshold(this.alphaThreshold);
} else {
if (!(i instanceof cc.DrawNode)) {
(i = new cc.DrawNode()).retain();
this._sgNode.setStencil(i);
}
var n = t.width, r = t.height, s = -n * e.x, c = -r * e.y, a = cc.color(255, 255, 255, 0);
i.clear();
if (this._type === o.RECT) {
var l = [ cc.v2(s, c), cc.v2(s + n, c), cc.v2(s + n, c + r), cc.v2(s, c + r) ];
i.drawPoly(l, a, 0, a);
} else if (this._type === o.ELLIPSE) {
var h = cc.v2(s + n / 2, c + r / 2), u = {
x: n / 2,
y: r / 2
};
i.drawPoly(this._calculateCircle(h, u, this._segements), a, 0, a);
}
}
this._sgNode.setInverted(this.inverted);
this._clippingStencil = i;
0;
}
});
r.prototype.__superOnDestroy = n.prototype.onDestroy;
r.prototype.onDestroy = function() {
this.__superOnDestroy();
if (this._clippingStencil) {
this._clippingStencil.release();
this._clippingStencil = null;
}
};
cc.Mask = e.exports = r;
}), {
"../../clipping-nodes/CCClippingNode": 1,
"../../clipping-nodes/CCClippingNodeCanvasRenderCmd": 1,
"../../clipping-nodes/CCClippingNodeWebGLRenderCmd": 1,
"../../shape-nodes/CCDrawNode": 1
} ],
53: [ (function(t, e, i) {
var n = cc.Enum({
Unified: 0,
Free: 1
}), o = cc.Enum({
Horizontal: 0,
Vertical: 1
}), r = cc.Enum({
PAGE_TURNING: 0
}), s = cc.Class({
name: "cc.PageView",
extends: cc.ScrollView,
editor: !1,
ctor: function() {
this._curPageIdx = 0;
this._lastPageIdx = 0;
this._pages = [];
this._scrollCenterOffsetX = [];
this._scrollCenterOffsetY = [];
},
properties: {
sizeMode: {
default: n.Unified,
type: n,
tooltip: !1,
notify: function() {
this._syncSizeMode();
}
},
direction: {
default: o.Horizontal,
type: o,
tooltip: !1,
notify: function() {
this._syncScrollDirection();
}
},
scrollThreshold: {
default: .5,
type: cc.Float,
slide: !0,
range: [ 0, 1, .01 ],
tooltip: !1
},
autoPageTurningThreshold: {
default: 100,
type: cc.Float,
tooltip: !1
},
pageTurningEventTiming: {
default: .1,
type: cc.Float,
range: [ 0, 1, .01 ],
tooltip: !1
},
indicator: {
default: null,
type: cc.PageViewIndicator,
tooltip: !1,
notify: function() {
this.indicator && this.indicator.setPageView(this);
}
},
pageTurningSpeed: {
default: .3,
type: cc.Float,
tooltip: !1
},
pageEvents: {
default: [],
type: cc.Component.EventHandler,
tooltip: !1
}
},
statics: {
SizeMode: n,
Direction: o,
EventType: r
},
__preload: function() {
this.node.on("size-changed", this._updateAllPagesSize, this);
},
onEnable: function() {
this._super();
this.node.on("scroll-ended-with-threshold", this._dispatchPageTurningEvent, this);
},
onDisable: function() {
this._super();
this.node.off("scroll-ended-with-threshold", this._dispatchPageTurningEvent, this);
},
onLoad: function() {
this._initPages();
this.indicator && this.indicator.setPageView(this);
},
onDestroy: function() {
this.node.off("size-changed", this._updateAllPagesSize, this);
},
getCurrentPageIndex: function() {
return this._curPageIdx;
},
setCurrentPageIndex: function(t) {
this.scrollToPage(t, !0);
},
getPages: function() {
return this._pages;
},
addPage: function(t) {
if (t && -1 === this._pages.indexOf(t) && this.content) {
this.content.addChild(t);
this._pages.push(t);
this._updatePageView();
}
},
insertPage: function(t, e) {
if (!(e < 0) && t && -1 === this._pages.indexOf(t) && this.content) {
if (e >= this._pages.length) this.addPage(t); else {
this._pages.splice(e, 0, t);
this.content.addChild(t);
this._updatePageView();
}
}
},
removePage: function(t) {
if (t && this.content) {
var e = this._pages.indexOf(t);
-1 !== e ? this.removePageAtIndex(e) : cc.warnID(4300, t.name);
}
},
removePageAtIndex: function(t) {
var e = this._pages;
if (!(t < 0 || t >= e.length)) {
var i = e[t];
if (i) {
this.content.removeChild(i);
e.splice(t, 1);
this._updatePageView();
}
}
},
removeAllPages: function() {
if (this.content) {
for (var t = this._pages, e = 0, i = t.length; e < i; e++) this.content.removeChild(t[e]);
this._pages.length = 0;
this._updatePageView();
}
},
scrollToPage: function(t, e) {
if (!(t < 0 || t >= this._pages.length)) {
e = void 0 !== e ? e : .3;
this._curPageIdx = t;
this.scrollToOffset(this._moveOffsetValue(t), e, !0);
this.indicator && this.indicator._changedState();
}
},
getScrollEndedEventTiming: function() {
return this.pageTurningEventTiming;
},
_syncScrollDirection: function() {
this.horizontal = this.direction === o.Horizontal;
this.vertical = this.direction === o.Vertical;
},
_syncSizeMode: function() {
if (this.content) {
var t = this.content.getComponent(cc.Layout);
if (t) {
if (0 === this._pages.length) t.padding = 0; else {
var e = this._pages[this._pages.length - 1];
if (this.sizeMode === n.Free) if (this.direction === o.Horizontal) {
t.paddingLeft = (this.node.width - this._pages[0].width) / 2;
t.paddingRight = (this.node.width - e.width) / 2;
} else if (this.direction === o.Vertical) {
t.paddingTop = (this.node.height - this._pages[0].height) / 2;
t.paddingBottom = (this.node.height - e.height) / 2;
}
}
t.updateLayout();
}
}
},
_updatePageView: function() {
var t = this._pages.length;
if (this._curPageIdx >= t) {
this._curPageIdx = 0 === t ? 0 : t - 1;
this._lastPageIdx = this._curPageIdx;
}
for (var e = 0; e < t; ++e) {
this._pages[e].setSiblingIndex(e);
this.direction === o.Horizontal ? this._scrollCenterOffsetX[e] = Math.abs(this.content.x + this._pages[e].x) : this._scrollCenterOffsetY[e] = Math.abs(this.content.y + this._pages[e].y);
}
var i = this.content.getComponent(cc.Layout);
i && i.enabled && i.updateLayout();
this.indicator && this.indicator._refresh();
},
_updateAllPagesSize: function() {
if (this.sizeMode === n.Unified) for (var t = this._pages, e = this.node.getContentSize(), i = 0, o = t.length; i < o; i++) t[i].setContentSize(e);
},
_initPages: function() {
if (this.content) {
for (var t = this.content.children, e = 0; e < t.length; ++e) {
var i = t[e];
this._pages.indexOf(i) >= 0 || this._pages.push(i);
}
this._syncScrollDirection();
this._syncSizeMode();
this._updatePageView();
}
},
_dispatchPageTurningEvent: function() {
if (this._lastPageIdx !== this._curPageIdx) {
this._lastPageIdx = this._curPageIdx;
cc.Component.EventHandler.emitEvents(this.pageEvents, this, r.PAGE_TURNING);
this.node.emit("page-turning", this);
}
},
_isScrollable: function(t, e, i) {
if (this.sizeMode === n.Free) {
var r, s;
if (this.direction === o.Horizontal) {
r = this._scrollCenterOffsetX[e];
s = this._scrollCenterOffsetX[i];
return Math.abs(t.x) >= Math.abs(r - s) * this.scrollThreshold;
}
if (this.direction === o.Vertical) {
r = this._scrollCenterOffsetY[e];
s = this._scrollCenterOffsetY[i];
return Math.abs(t.y) >= Math.abs(r - s) * this.scrollThreshold;
}
} else {
if (this.direction === o.Horizontal) return Math.abs(t.x) >= this.node.width * this.scrollThreshold;
if (this.direction === o.Vertical) return Math.abs(t.y) >= this.node.height * this.scrollThreshold;
}
},
_isQuicklyScrollable: function(t) {
if (this.direction === o.Horizontal) {
if (Math.abs(t.x) > this.autoPageTurningThreshold) return !0;
} else if (this.direction === o.Vertical && Math.abs(t.y) > this.autoPageTurningThreshold) return !0;
return !1;
},
_moveOffsetValue: function(t) {
var e = cc.p(0, 0);
this.sizeMode === n.Free ? this.direction === o.Horizontal ? e.x = this._scrollCenterOffsetX[t] : this.direction === o.Vertical && (e.y = this._scrollCenterOffsetY[t]) : this.direction === o.Horizontal ? e.x = t * this.node.width : this.direction === o.Vertical && (e.y = t * this.node.height);
return e;
},
_getDragDirection: function(t) {
return this.direction === o.Horizontal ? 0 === t.x ? 0 : t.x > 0 ? 1 : -1 : this.direction === o.Vertical ? 0 === t.y ? 0 : t.y < 0 ? 1 : -1 : void 0;
},
_handleReleaseLogic: function(t) {
var e = this._startBounceBackIfNeeded(), i = cc.pSub(this._touchBeganPosition, this._touchEndPosition);
if (e) {
var n = this._getDragDirection(i);
if (0 === n) return;
this._curPageIdx = n > 0 ? this._pages.length - 1 : 0;
this.indicator && this.indicator._changedState();
} else {
var o = this._curPageIdx, r = o + this._getDragDirection(i), s = this.pageTurningSpeed * Math.abs(o - r);
if (r < this._pages.length) {
if (this._isScrollable(i, o, r)) {
this.scrollToPage(r, s);
return;
}
var c = this._calculateTouchMoveVelocity();
if (this._isQuicklyScrollable(c)) {
this.scrollToPage(r, s);
return;
}
}
this.scrollToPage(o, s);
}
},
_onTouchBegan: function(t, e) {
this._touchBeganPosition = t.touch.getLocation();
this._super(t, e);
},
_onTouchMoved: function(t, e) {
this._super(t, e);
},
_onTouchEnded: function(t, e) {
this._touchEndPosition = t.touch.getLocation();
this._super(t, e);
},
_onTouchCancelled: function(t, e) {
this._touchEndPosition = t.touch.getLocation();
this._super(t, e);
},
_onMouseWheel: function() {}
});
cc.PageView = e.exports = s;
}), {} ],
54: [ (function(t, e, i) {
var n = cc.Enum({
HORIZONTAL: 0,
VERTICAL: 1
}), o = cc.Class({
name: "cc.PageViewIndicator",
extends: t("./CCComponent"),
editor: !1,
properties: {
_layout: null,
_pageView: null,
_indicators: [],
spriteFrame: {
default: null,
type: cc.SpriteFrame,
tooltip: !1
},
direction: {
default: n.HORIZONTAL,
type: n,
tooltip: !1
},
cellSize: {
default: cc.size(20, 20),
tooltip: !1
},
spacing: {
default: 0,
tooltip: !1
}
},
statics: {
Direction: n
},
onLoad: function() {
this._updateLayout();
},
setPageView: function(t) {
this._pageView = t;
this._refresh();
},
_updateLayout: function() {
this._layout = this.getComponent(cc.Layout);
this._layout || (this._layout = this.addComponent(cc.Layout));
if (this.direction === n.HORIZONTAL) {
this._layout.type = cc.Layout.Type.HORIZONTAL;
this._layout.spacingX = this.spacing;
} else if (this.direction === n.VERTICAL) {
this._layout.type = cc.Layout.Type.VERTICAL;
this._layout.spacingY = this.spacing;
}
this._layout.resizeMode = cc.Layout.ResizeMode.CONTAINER;
},
_createIndicator: function() {
var t = new cc.Node();
t.addComponent(cc.Sprite).spriteFrame = this.spriteFrame;
t.parent = this.node;
t.width = this.cellSize.width;
t.height = this.cellSize.height;
return t;
},
_changedState: function() {
var t = this._indicators;
if (0 !== t.length) {
var e = this._pageView._curPageIdx;
if (!(e >= t.length)) {
for (var i = 0; i < t.length; ++i) {
t[i].opacity = 127.5;
}
t[e].opacity = 255;
}
}
},
_refresh: function() {
if (this._pageView) {
var t = this._indicators, e = this._pageView.getPages();
if (e.length !== t.length) {
var i = 0;
if (e.length > t.length) for (i = 0; i < e.length; ++i) t[i] || (t[i] = this._createIndicator()); else {
for (i = t.length - e.length; i > 0; --i) {
var n = t[i - 1];
this.node.removeChild(n);
t.splice(i - 1, 1);
}
}
this._layout && this._layout.enabledInHierarchy && this._layout.updateLayout();
this._changedState();
}
}
}
});
cc.PageViewIndicator = e.exports = o;
}), {
"./CCComponent": 46
} ],
55: [ (function(t, e, i) {
var n = cc.Enum({
HORIZONTAL: 0,
VERTICAL: 1,
FILLED: 2
}), o = cc.Class({
name: "cc.ProgressBar",
extends: t("./CCComponent"),
editor: !1,
_initBarSprite: function() {
if (this.barSprite) {
var t = this.barSprite.node;
if (!t) return;
var e = this.node.getContentSize(), i = this.node.getAnchorPoint(), o = t.getContentSize();
t.parent === this.node && this.node.setContentSize(o);
this.barSprite.fillType === cc.Sprite.FillType.RADIAL && (this.mode = n.FILLED);
var r = t.getContentSize();
this.mode === n.HORIZONTAL ? this.totalLength = r.width : this.mode === n.VERTICAL ? this.totalLength = r.height : this.totalLength = this.barSprite.fillRange;
if (t.parent === this.node) {
var s = -e.width * i.x;
t.setPosition(cc.p(s, 0));
}
}
},
_updateBarStatus: function() {
if (this.barSprite) {
var t = this.barSprite.node;
if (!t) return;
var e, i, o, r = t.getAnchorPoint(), s = t.getContentSize(), c = t.getPosition(), a = cc.p(0, .5), l = cc.clamp01(this.progress), h = this.totalLength * l;
switch (this.mode) {
case n.HORIZONTAL:
this.reverse && (a = cc.p(1, .5));
e = cc.size(h, s.height);
i = this.totalLength;
o = s.height;
break;

case n.VERTICAL:
a = this.reverse ? cc.p(.5, 1) : cc.p(.5, 0);
e = cc.size(s.width, h);
i = s.width;
o = this.totalLength;
}
if (this.mode === n.FILLED) if (this.barSprite.type !== cc.Sprite.Type.FILLED) cc.warn("ProgressBar FILLED mode only works when barSprite's Type is FILLED!"); else {
this.reverse && (h *= -1);
this.barSprite.fillRange = h;
} else if (this.barSprite.type !== cc.Sprite.Type.FILLED) {
var u = a.x - r.x, d = a.y - r.y, f = cc.p(i * u, o * d);
t.setPosition(cc.pAdd(c, f));
t.setAnchorPoint(a);
t.setContentSize(e);
} else cc.warn("ProgressBar non-FILLED mode only works when barSprite's Type is non-FILLED!");
}
},
properties: {
barSprite: {
default: null,
type: cc.Sprite,
tooltip: !1,
notify: function() {
this._initBarSprite();
},
animatable: !1
},
mode: {
default: n.HORIZONTAL,
type: n,
tooltip: !1,
notify: function() {
if (this.barSprite) {
var t = this.barSprite.node;
if (!t) return;
var e = t.getContentSize();
this.mode === n.HORIZONTAL ? this.totalLength = e.width : this.mode === n.VERTICAL ? this.totalLength = e.height : this.mode === n.FILLED && (this.totalLength = this.barSprite.fillRange);
}
},
animatable: !1
},
_N$totalLength: 1,
totalLength: {
range: [ 0, Number.MAX_VALUE ],
tooltip: !1,
get: function() {
return this._N$totalLength;
},
set: function(t) {
this.mode === n.FILLED && (t = cc.clamp01(t));
this._N$totalLength = t;
this._updateBarStatus();
}
},
progress: {
default: 1,
type: "Float",
range: [ 0, 1, .1 ],
slide: !0,
tooltip: !1,
notify: function() {
this._updateBarStatus();
}
},
reverse: {
default: !1,
tooltip: !1,
notify: function() {
this.barSprite && (this.barSprite.fillStart = 1 - this.barSprite.fillStart);
this._updateBarStatus();
},
animatable: !1
}
},
statics: {
Mode: n
}
});
cc.ProgressBar = e.exports = o;
}), {
"./CCComponent": 46
} ],
56: [ (function(t, e, i) {
var n = cc.Class({
extends: t("./CCSGComponent"),
name: "cc._RendererInSG",
ctor: function() {
var t = this._sgNode = this._createSgNode();
t.setVisible(!1);
0;
t.retain();
this._plainNode = new _ccsg.Node();
this._plainNode.retain();
},
__preload: function() {
this._initSgNode();
},
onEnable: function() {
if (cc.director._actionManager && cc.director._actionManager.getNumberOfRunningActionsInTarget(this.node) > 0) {
cc.errorID(1629, this.node.name);
cc.errorID(1630);
cc.errorID(1631);
}
this._replaceSgNode(this._sgNode);
},
onDisable: function() {
this._replaceSgNode(this._plainNode);
},
onDestroy: function() {
this._removeSgNode();
var t = this.node._sgNode;
if (this._plainNode !== t) {
this._plainNode.release();
this._plainNode = null;
}
},
_replaceSgNode: function(t) {
0;
var e = this.node, i = e._sgNode;
i._entity = null;
0;
var n = i.getChildren().slice();
i.removeAllChildren(!1);
if (t.getChildrenCount() > 0) {
0;
t.removeAllChildren(!1);
}
for (var o = 0, r = n.length; o < r; ++o) t.addChild(n[o]);
var s = i.getParent();
if (s) if (cc.runtime) {
s.removeChild(i, !1);
s.addChild(t);
t.arrivalOrder = i.arrivalOrder;
} else {
s.insertChildBefore(t, i);
s.removeChild(i, !1);
}
e._sgNode = t;
e._sgNode._entity = e;
e._updateSgNode();
}
});
cc._RendererInSG = e.exports = n;
}), {
"./CCSGComponent": 59
} ],
57: [ (function(t, e, i) {
var n = cc.Class({
extends: t("./CCSGComponent"),
name: "cc._RendererUnderSG",
ctor: function() {
var t = this._sgNode = this._createSgNode();
if (t) {
t.retain();
t.setVisible(!1);
}
},
__preload: function() {
this._initSgNode();
this._registSizeProvider();
this._appendSgNode(this._sgNode);
},
onEnable: function() {
this._sgNode && this._sgNode.setVisible(!0);
},
onDisable: function() {
this._sgNode && this._sgNode.setVisible(!1);
},
onDestroy: function() {
this.node._sizeProvider === this._sgNode && (this.node._sizeProvider = null);
this._removeSgNode();
},
_appendSgNode: function(t) {
if (t) {
var e = this.node;
t.setColor(e._color);
e._cascadeOpacityEnabled || t.setOpacity(e._opacity);
t.setAnchorPoint(e._anchorPoint);
t.setOpacityModifyRGB(e._opacityModifyRGB);
t.setLocalZOrder(-1);
e._sgNode.addChild(t);
}
}
});
cc._RendererUnderSG = e.exports = n;
}), {
"./CCSGComponent": 59
} ],
58: [ (function(t, e, i) {
t("../label/CCHtmlTextParser");
t("../label/CCTextUtils");
var n = cc.TextAlignment, o = cc.VerticalTextAlignment, r = cc.Class({
name: "cc.RichText",
extends: cc._RendererUnderSG,
ctor: function() {
this._textArray = null;
this._labelSegments = [];
this._labelSegmentsCache = [];
this._linesWidth = [];
this._resetState();
this._updateRichTextStatus = this._updateRichText;
},
editor: !1,
properties: {
string: {
default: "<color=#00ff00>Rich</c><color=#0fffff>Text</color>",
multiline: !0,
tooltip: !1,
notify: function() {
this._updateRichTextStatus();
}
},
horizontalAlign: {
default: n.LEFT,
type: n,
tooltip: !1,
animatable: !1,
notify: function(t) {
if (this.horizontalAlign !== t) {
this._layoutDirty = !0;
this._updateRichTextStatus();
}
}
},
fontSize: {
default: 40,
tooltip: !1,
notify: function(t) {
if (this.fontSize !== t) {
this._layoutDirty = !0;
this._updateRichTextStatus();
}
}
},
font: {
default: null,
type: cc.TTFFont,
tooltip: !1,
notify: function(t) {
if (this.font !== t) {
this._layoutDirty = !0;
0;
this._updateRichTextStatus();
}
}
},
maxWidth: {
default: 0,
tooltip: !1,
notify: function(t) {
if (this.maxWidth !== t) {
this._layoutDirty = !0;
this._updateRichTextStatus();
}
}
},
lineHeight: {
default: 40,
tooltip: !1,
notify: function(t) {
if (this.lineHeight !== t) {
this._layoutDirty = !0;
this._updateRichTextStatus();
}
}
},
imageAtlas: {
default: null,
type: cc.SpriteAtlas,
tooltip: !1,
notify: function(t) {
if (this.imageAtlas !== t) {
this._layoutDirty = !0;
this._updateRichTextStatus();
}
}
},
handleTouchEvent: {
default: !0,
tooltip: !1,
notify: function(t) {
this.handleTouchEvent !== t && this.enabledInHierarchy && (this.handleTouchEvent ? this._addEventListeners() : this._removeEventListeners());
}
}
},
statics: {
HorizontalAlign: n,
VerticalAlign: o
},
onEnable: function() {
this._super();
this.handleTouchEvent && this._addEventListeners();
},
onDisable: function() {
this._super();
this.handleTouchEvent && this._removeEventListeners();
},
_addEventListeners: function() {
this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
},
_removeEventListeners: function() {
this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
},
_createSgNode: function() {
var t = new _ccsg.Node();
t.setCascadeOpacityEnabled(!0);
var e = this;
t.setColor = function() {
e._updateLabelSegmentTextAttributes();
};
t._setContentSize = t.setContentSize;
t.setContentSize = function() {};
return t;
},
_updateLabelSegmentTextAttributes: function() {
this._labelSegments.forEach(function(t) {
this._applyTextAttribute(t);
}.bind(this));
},
_initSgNode: function() {
this._updateRichText();
0;
},
_createFontLabel: function(t) {
return _ccsg.Label.pool.get(t, this.font, null, this.fontSize);
},
_getFontRawUrl: function() {
return this.font instanceof cc.TTFFont ? this.font.rawUrl : "";
},
_onTTFLoaded: function() {
var t = this._getFontRawUrl();
if (t) {
var e = this;
cc.CustomFontLoader.loadTTF(t, (function() {
e._layoutDirty = !0;
e._updateRichText();
}));
}
},
_measureText: function(t, e) {
var i = this, n = function(e) {
var n;
if (0 === i._labelSegmentsCache.length) {
n = i._createFontLabel(e);
i._labelSegmentsCache.push(n);
} else (n = i._labelSegmentsCache[0]).setString(e);
n._styleIndex = t;
i._applyTextAttribute(n);
return n.getContentSize().width;
};
return e ? n(e) : n;
},
_onTouchEnded: function(t) {
for (var e = this.node.getComponents(cc.Component), i = 0; i < this._labelSegments.length; ++i) {
var n = this._labelSegments[i], o = n._clickHandler;
if (o && this._containsTouchLocation(n, t.touch.getLocation())) {
e.forEach((function(e) {
e.enabledInHierarchy && e[o] && e[o](t);
}));
t.stopPropagation();
}
}
},
_containsTouchLocation: function(t, e) {
var i = t.getBoundingBoxToWorld();
return cc.rectContainsPoint(i, e);
},
_resetState: function() {
var t = this._sgNode;
t && t.removeAllChildren();
this._labelSegments.length = 0;
this._labelSegmentsCache.length = 0;
this._linesWidth.length = 0;
this._lineOffsetX = 0;
this._lineCount = 1;
this._labelWidth = 0;
this._labelHeight = 0;
this._layoutDirty = !0;
},
_addLabelSegment: function(t, e) {
var i;
0 === this._labelSegmentsCache.length ? i = this._createFontLabel(t) : (i = this._labelSegmentsCache.pop()).setString(t);
i._styleIndex = e;
i._lineCount = this._lineCount;
this._applyTextAttribute(i);
i.setAnchorPoint(0, 0);
this._sgNode.addChild(i);
this._labelSegments.push(i);
i.setOverflow(1);
var n = i.getContentSize();
i.enableWrap(!1);
i.setDimensions(n.width, this.lineHeight);
return i;
},
_updateRichTextWithMaxWidth: function(t, e, i) {
var n = e;
if (this._lineOffsetX > 0 && n + this._lineOffsetX > this.maxWidth) for (var o = 0; this._lineOffsetX <= this.maxWidth; ) {
var r = this._getFirstWordLen(t, o, t.length), s = t.substr(o, r), c = this._measureText(i, s);
if (!(this._lineOffsetX + c <= this.maxWidth)) {
if (o > 0) {
var a = t.substr(0, o);
this._addLabelSegment(a, i);
t = t.substr(o, t.length);
n = this._measureText(i, t);
}
this._updateLineInfo();
break;
}
this._lineOffsetX += c;
o += r;
}
if (n > this.maxWidth) for (var l = cc.TextUtils.fragmentText(t, n, this.maxWidth, this._measureText(i)), h = 0; h < l.length; ++h) {
var u = l[h], d = this._addLabelSegment(u, i).getContentSize();
this._lineOffsetX += d.width;
l.length > 1 && h < l.length - 1 && this._updateLineInfo();
} else {
this._lineOffsetX += n;
this._addLabelSegment(t, i);
}
},
_isLastComponentCR: function(t) {
return t.length - 1 === t.lastIndexOf("\n");
},
_updateLineInfo: function() {
this._linesWidth.push(this._lineOffsetX);
this._lineOffsetX = 0;
this._lineCount++;
},
_needsUpdateTextLayout: function(t) {
if (this._layoutDirty || !this._textArray || !t) return !0;
if (this._textArray.length !== t.length) return !0;
for (var e = 0; e < this._textArray.length; ++e) {
var i = this._textArray[e], n = t[e];
if (i.text != n.text) return !0;
if (i.style) {
if (n.style) {
if (i.style.size !== n.style.size || i.style.italic !== n.style.italic || i.style.isImage !== n.style.isImage) return !0;
if (i.style.isImage === n.style.isImage && i.style.src !== n.style.src) return !0;
} else if (i.style.size || i.style.italic || i.style.isImage) return !0;
} else if (n.style && (n.style.size || n.style.italic || n.style.isImage)) return !0;
}
return !1;
},
_onSpriteFrameLoaded: function(t, e) {
var i;
(i = e || t.target).__sprite.setSpriteFrame(i);
},
_applySpriteFrame: function(t) {
if (t) if (t.textureLoaded()) this._onSpriteFrameLoaded(null, t); else {
t.once("load", this._onSpriteFrameLoaded, this);
t.ensureLoadTexture();
}
},
_addRichTextImageElement: function(t) {
var e = t.style.src, i = this.imageAtlas.getSpriteFrame(e);
if (i) {
var n = new cc.Scale9Sprite();
n.setAnchorPoint(0, 0);
i.__sprite = n;
this._sgNode.addChild(n);
this._labelSegments.push(n);
var o = i.getRect(), r = 1, s = o.width, c = o.height, a = t.style.imageWidth, l = t.style.imageHeight;
if (l > 0 && l < this.lineHeight) {
s *= r = l / c;
c *= r;
} else {
s *= r = this.lineHeight / c;
c *= r;
}
a > 0 && (s = a);
if (this.maxWidth > 0) {
this._lineOffsetX + s > this.maxWidth && this._updateLineInfo();
this._lineOffsetX += s;
} else {
this._lineOffsetX += s;
this._lineOffsetX > this._labelWidth && (this._labelWidth = this._lineOffsetX);
}
this._applySpriteFrame(i);
n.setContentSize(s, c);
n._lineCount = this._lineCount;
t.style.event && t.style.event.click && (n._clickHandler = t.style.event.click);
} else cc.warnID(4400);
},
_updateRichText: function() {
if (this.enabled) {
var t = cc.htmlTextParser.parse(this.string);
if (this._needsUpdateTextLayout(t)) {
this._textArray = t;
this._resetState();
for (var e, i = !1, n = 0; n < this._textArray.length; ++n) {
var o = this._textArray[n], r = o.text;
if ("" === r) {
if (o.style && o.style.newline) {
this._updateLineInfo();
continue;
}
if (o.style && o.style.isImage && this.imageAtlas) {
this._addRichTextImageElement(o);
continue;
}
}
for (var s = r.split("\n"), c = 0; c < s.length; ++c) {
var a = s[c];
if ("" !== a) {
i = !1;
if (this.maxWidth > 0) {
var l = this._measureText(n, a);
this._updateRichTextWithMaxWidth(a, l, n);
s.length > 1 && c < s.length - 1 && this._updateLineInfo();
} else {
e = this._addLabelSegment(a, n).getContentSize();
this._lineOffsetX += e.width;
this._lineOffsetX > this._labelWidth && (this._labelWidth = this._lineOffsetX);
s.length > 1 && c < s.length - 1 && this._updateLineInfo();
}
} else {
if (this._isLastComponentCR(r) && c == s.length - 1) continue;
this._updateLineInfo();
i = !0;
}
}
}
i || this._linesWidth.push(this._lineOffsetX);
this.maxWidth > 0 && (this._labelWidth = this.maxWidth);
this._labelHeight = this._lineCount * this.lineHeight;
this.node.setContentSize(this._labelWidth, this._labelHeight);
this._sgNode._setContentSize(this._labelWidth, this._labelHeight);
this._updateRichTextPosition();
this._layoutDirty = !1;
} else {
this._textArray = t;
this._updateLabelSegmentTextAttributes();
}
}
},
_getFirstWordLen: function(t, e, i) {
var n = t.charAt(e);
if (cc.TextUtils.isUnicodeCJK(n) || cc.TextUtils.isUnicodeSpace(n)) return 1;
for (var o = 1, r = e + 1; r < i; ++r) {
n = t.charAt(r);
if (cc.TextUtils.isUnicodeSpace(n) || cc.TextUtils.isUnicodeCJK(n)) break;
o++;
}
return o;
},
_updateRichTextPosition: function() {
for (var t = 0, e = 1, i = this._lineCount, n = 0; n < this._labelSegments.length; ++n) {
var o = this._labelSegments[n], r = o._lineCount;
if (r > e) {
t = 0;
e = r;
}
var s = 0;
switch (this.horizontalAlign) {
case cc.TextAlignment.LEFT:
s = 0;
break;

case cc.TextAlignment.CENTER:
s = (this._labelWidth - this._linesWidth[r - 1]) / 2;
break;

case cc.TextAlignment.RIGHT:
s = this._labelWidth - this._linesWidth[r - 1];
}
o.setPositionX(t + s);
var c = o.getContentSize(), a = (i - r) * this.lineHeight;
o instanceof cc.Scale9Sprite && (a += (this.lineHeight - o.getContentSize().height) / 2);
o.setPositionY(a);
r === e && (t += c.width);
}
},
_convertLiteralColorValue: function(t) {
var e = t.toUpperCase();
return cc.Color[e] ? cc.Color[e] : cc.hexToColor(t);
},
_applyTextAttribute: function(t) {
if (!(t instanceof cc.Scale9Sprite)) {
var e = t._styleIndex;
t.setLineHeight(this.lineHeight);
t.setVerticalAlign(o.CENTER);
var i = null;
this._textArray[e] && (i = this._textArray[e].style);
i && i.color ? t.setColor(this._convertLiteralColorValue(i.color)) : t.setColor(this.node.color);
i && i.bold ? t.enableBold(!0) : t.enableBold(!1);
i && i.italic ? t.enableItalics(!0) : t.enableItalics(!1);
i && i.underline ? t.enableUnderline(!0) : t.enableUnderline(!1);
if (i && i.outline) {
t.setOutlined(!0);
t.setOutlineColor(this._convertLiteralColorValue(i.outline.color));
t.setOutlineWidth(i.outline.width);
t.setMargin(i.outline.width);
} else {
t.setOutlined(!1);
t.setMargin(0);
}
i && i.size ? t.setFontSize(i.size) : t.setFontSize(this.fontSize);
i && i.event && i.event.click && (t._clickHandler = i.event.click);
}
},
onDestroy: function() {
this._super();
for (var t = 0; t < this._labelSegments.length; ++t) {
this._labelSegments[t].removeFromParent(!0);
_ccsg.Label.pool.put(this._labelSegments[t]);
}
this._resetState();
}
});
cc.RichText = e.exports = r;
}), {
"../label/CCHtmlTextParser": 86,
"../label/CCTextUtils": 87
} ],
59: [ (function(t, e, i) {
var n = t("../utils/scene-graph-helper"), o = cc.Class({
extends: t("./CCComponent"),
name: "cc._SGComponent",
editor: !1,
properties: {
_sgNode: {
default: null,
serializable: !1
}
},
_createSgNode: null,
_initSgNode: null,
_removeSgNode: n.removeSgNode,
_registSizeProvider: function() {
if (this.node._sizeProvider) {
} else this.node._sizeProvider = this._sgNode;
}
});
cc._SGComponent = e.exports = o;
}), {
"../utils/scene-graph-helper": 155,
"./CCComponent": 46
} ],
60: [ (function(t, e, i) {
var n = cc.Enum({
HORIZONTAL: 0,
VERTICAL: 1
}), o = cc.Class({
name: "cc.Scrollbar",
extends: t("./CCComponent"),
editor: !1,
properties: {
_scrollView: null,
_touching: !1,
_autoHideRemainingTime: {
default: 0,
serializable: !1
},
_opacity: 255,
handle: {
default: null,
type: cc.Sprite,
tooltip: !1,
notify: function() {
this._onScroll(cc.p(0, 0));
},
animatable: !1
},
direction: {
default: n.HORIZONTAL,
type: n,
tooltip: !1,
notify: function() {
this._onScroll(cc.p(0, 0));
},
animatable: !1
},
enableAutoHide: {
default: !0,
animatable: !1,
tooltip: !1
},
autoHideTime: {
default: 1,
animatable: !1,
tooltip: !1
}
},
statics: {
Direction: n
},
setTargetScrollView: function(t) {
this._scrollView = t;
},
_convertToScrollViewSpace: function(t) {
var e = t.convertToWorldSpace(cc.p(0, 0));
return this._scrollView.node.convertToNodeSpace(e);
},
_setOpacity: function(t) {
this.handle && this.node.setOpacity(t);
},
_onScroll: function(t) {
if (this._scrollView) {
var e = this._scrollView.content;
if (e) {
var i = e.getContentSize(), o = this._scrollView.node.getContentSize(), r = this.node.getContentSize();
if (this._conditionalDisableScrollBar(i, o)) return;
if (this.enableAutoHide) {
this._autoHideRemainingTime = this.autoHideTime;
this._setOpacity(this._opacity);
}
var s = 0, c = 0, a = 0, l = 0, h = 0;
if (this.direction === n.HORIZONTAL) {
s = i.width;
c = o.width;
h = r.width;
a = t.x;
l = -this._convertToScrollViewSpace(e).x;
} else if (this.direction === n.VERTICAL) {
s = i.height;
c = o.height;
h = r.height;
a = t.y;
l = -this._convertToScrollViewSpace(e).y;
}
var u = this._calculateLength(s, c, h, a), d = this._calculatePosition(s, c, h, l, a, u);
this._updateLength(u);
this._updateHanlderPosition(d);
}
}
},
_updateHanlderPosition: function(t) {
if (this.handle) {
var e = this._fixupHandlerPosition();
this.handle.node.setPosition(cc.pAdd(t, e));
}
},
_fixupHandlerPosition: function() {
var t = this.node.getContentSize(), e = this.node.getAnchorPoint(), i = this.handle.node.getContentSize(), o = this.handle.node.parent, r = this.node.convertToWorldSpaceAR(cc.p(-t.width * e.x, -t.height * e.y)), s = o.convertToNodeSpaceAR(r);
this.direction === n.HORIZONTAL ? s = cc.pAdd(s, cc.p(0, (t.height - i.height) / 2)) : this.direction === n.VERTICAL && (s = cc.pAdd(s, cc.p((t.width - i.width) / 2, 0)));
this.handle.node.setPosition(s);
return s;
},
_onTouchBegan: function() {
this.enableAutoHide && (this._touching = !0);
},
_conditionalDisableScrollBar: function(t, e) {
return t.width <= e.width && this.direction === n.HORIZONTAL || t.height <= e.height && this.direction === n.VERTICAL;
},
_onTouchEnded: function() {
if (this.enableAutoHide) {
this._touching = !1;
if (!(this.autoHideTime <= 0)) {
if (this._scrollView) {
var t = this._scrollView.content;
if (t) {
var e = t.getContentSize(), i = this._scrollView.node.getContentSize();
if (this._conditionalDisableScrollBar(e, i)) return;
}
}
this._autoHideRemainingTime = this.autoHideTime;
}
}
},
_calculateLength: function(t, e, i, n) {
var o = t;
n && (o += 20 * (n > 0 ? n : -n));
return i * (e / o);
},
_calculatePosition: function(t, e, i, o, r, s) {
var c = t - e;
r && (c += Math.abs(r));
var a = 0;
if (c) {
a = o / c;
a = cc.clamp01(a);
}
var l = (i - s) * a;
return this.direction === n.VERTICAL ? cc.p(0, l) : cc.p(l, 0);
},
_updateLength: function(t) {
if (this.handle) {
var e = this.handle.node, i = e.getContentSize();
e.setAnchorPoint(cc.p(0, 0));
this.direction === n.HORIZONTAL ? e.setContentSize(t, i.height) : e.setContentSize(i.width, t);
}
},
_processAutoHide: function(t) {
if (this.enableAutoHide && !(this._autoHideRemainingTime <= 0) && !this._touching) {
this._autoHideRemainingTime -= t;
if (this._autoHideRemainingTime <= this.autoHideTime) {
this._autoHideRemainingTime = Math.max(0, this._autoHideRemainingTime);
var e = this._opacity * (this._autoHideRemainingTime / this.autoHideTime);
this._setOpacity(e);
}
}
},
start: function() {
this.enableAutoHide && this._setOpacity(0);
},
hide: function() {
this._autoHideRemainingTime = 0;
this._setOpacity(0);
},
show: function() {
this._autoHideRemainingTime = this.autoHideTime;
this._setOpacity(this._opacity);
},
update: function(t) {
this._processAutoHide(t);
}
});
cc.Scrollbar = e.exports = o;
}), {
"./CCComponent": 46
} ],
61: [ (function(t, e, i) {
var n = function() {
return new Date().getMilliseconds();
}, o = cc.Enum({
SCROLL_TO_TOP: 0,
SCROLL_TO_BOTTOM: 1,
SCROLL_TO_LEFT: 2,
SCROLL_TO_RIGHT: 3,
SCROLLING: 4,
BOUNCE_TOP: 5,
BOUNCE_BOTTOM: 6,
BOUNCE_LEFT: 7,
BOUNCE_RIGHT: 8,
SCROLL_ENDED: 9,
TOUCH_UP: 10,
AUTOSCROLL_ENDED_WITH_THRESHOLD: 11,
SCROLL_BEGAN: 12
}), r = {
"scroll-to-top": o.SCROLL_TO_TOP,
"scroll-to-bottom": o.SCROLL_TO_BOTTOM,
"scroll-to-left": o.SCROLL_TO_LEFT,
"scroll-to-right": o.SCROLL_TO_RIGHT,
scrolling: o.SCROLLING,
"bounce-bottom": o.BOUNCE_BOTTOM,
"bounce-left": o.BOUNCE_LEFT,
"bounce-right": o.BOUNCE_RIGHT,
"bounce-top": o.BOUNCE_TOP,
"scroll-ended": o.SCROLL_ENDED,
"touch-up": o.TOUCH_UP,
"scroll-ended-with-threshold": o.AUTOSCROLL_ENDED_WITH_THRESHOLD,
"scroll-began": o.SCROLL_BEGAN
}, s = cc.Class({
name: "cc.ScrollView",
extends: t("./CCViewGroup"),
editor: !1,
ctor: function() {
this._topBoundary = 0;
this._bottomBoundary = 0;
this._leftBoundary = 0;
this._rightBoundary = 0;
this._touchMoveDisplacements = [];
this._touchMoveTimeDeltas = [];
this._touchMovePreviousTimestamp = 0;
this._touchMoved = !1;
this._autoScrolling = !1;
this._autoScrollAttenuate = !1;
this._autoScrollStartPosition = cc.p(0, 0);
this._autoScrollTargetDelta = cc.p(0, 0);
this._autoScrollTotalTime = 0;
this._autoScrollAccumulatedTime = 0;
this._autoScrollCurrentlyOutOfBoundary = !1;
this._autoScrollBraking = !1;
this._autoScrollBrakingStartPosition = cc.p(0, 0);
this._outOfBoundaryAmount = cc.p(0, 0);
this._outOfBoundaryAmountDirty = !0;
this._stopMouseWheel = !1;
this._mouseWheelEventElapsedTime = 0;
this._isScrollEndedWithThresholdEventFired = !1;
this._scrollEventEmitMask = 0;
this._isBouncing = !1;
this._scrolling = !1;
},
properties: {
content: {
default: void 0,
type: cc.Node,
tooltip: !1
},
horizontal: {
default: !0,
animatable: !1,
tooltip: !1
},
vertical: {
default: !0,
animatable: !1,
tooltip: !1
},
inertia: {
default: !0,
tooltip: !1
},
brake: {
default: .5,
type: "Float",
range: [ 0, 1, .1 ],
tooltip: !1
},
elastic: {
default: !0,
animatable: !1,
tooltip: !1
},
bounceDuration: {
default: 1,
range: [ 0, 10 ],
tooltip: !1
},
horizontalScrollBar: {
default: void 0,
type: cc.Scrollbar,
tooltip: !1,
notify: function() {
if (this.horizontalScrollBar) {
this.horizontalScrollBar.setTargetScrollView(this);
this._updateScrollBar(0);
}
},
animatable: !1
},
verticalScrollBar: {
default: void 0,
type: cc.Scrollbar,
tooltip: !1,
notify: function() {
if (this.verticalScrollBar) {
this.verticalScrollBar.setTargetScrollView(this);
this._updateScrollBar(0);
}
},
animatable: !1
},
scrollEvents: {
default: [],
type: cc.Component.EventHandler,
tooltip: !1
},
cancelInnerEvents: {
default: !0,
animatable: !1,
tooltip: !1
}
},
statics: {
EventType: o
},
scrollToBottom: function(t, e) {
var i = this._calculateMovePercentDelta({
anchor: cc.p(0, 0),
applyToHorizontal: !1,
applyToVertical: !0
});
t ? this._startAutoScroll(i, t, !1 !== e) : this._moveContent(i, !0);
},
scrollToTop: function(t, e) {
var i = this._calculateMovePercentDelta({
anchor: cc.p(0, 1),
applyToHorizontal: !1,
applyToVertical: !0
});
t ? this._startAutoScroll(i, t, !1 !== e) : this._moveContent(i);
},
scrollToLeft: function(t, e) {
var i = this._calculateMovePercentDelta({
anchor: cc.p(0, 0),
applyToHorizontal: !0,
applyToVertical: !1
});
t ? this._startAutoScroll(i, t, !1 !== e) : this._moveContent(i);
},
scrollToRight: function(t, e) {
var i = this._calculateMovePercentDelta({
anchor: cc.p(1, 0),
applyToHorizontal: !0,
applyToVertical: !1
});
t ? this._startAutoScroll(i, t, !1 !== e) : this._moveContent(i);
},
scrollToTopLeft: function(t, e) {
var i = this._calculateMovePercentDelta({
anchor: cc.p(0, 1),
applyToHorizontal: !0,
applyToVertical: !0
});
t ? this._startAutoScroll(i, t, !1 !== e) : this._moveContent(i);
},
scrollToTopRight: function(t, e) {
var i = this._calculateMovePercentDelta({
anchor: cc.p(1, 1),
applyToHorizontal: !0,
applyToVertical: !0
});
t ? this._startAutoScroll(i, t, !1 !== e) : this._moveContent(i);
},
scrollToBottomLeft: function(t, e) {
var i = this._calculateMovePercentDelta({
anchor: cc.p(0, 0),
applyToHorizontal: !0,
applyToVertical: !0
});
t ? this._startAutoScroll(i, t, !1 !== e) : this._moveContent(i);
},
scrollToBottomRight: function(t, e) {
var i = this._calculateMovePercentDelta({
anchor: cc.p(1, 0),
applyToHorizontal: !0,
applyToVertical: !0
});
t ? this._startAutoScroll(i, t, !1 !== e) : this._moveContent(i);
},
scrollToOffset: function(t, e, i) {
var n = this.getMaxScrollOffset(), o = cc.p(0, 0);
0 === n.x ? o.x = 0 : o.x = t.x / n.x;
0 === n.y ? o.y = 1 : o.y = (n.y - t.y) / n.y;
this.scrollTo(o, e, i);
},
getScrollOffset: function() {
var t = this._getContentTopBoundary() - this._topBoundary, e = this._getContentLeftBoundary() - this._leftBoundary;
return cc.p(e, t);
},
getMaxScrollOffset: function() {
var t = this.node.getContentSize(), e = this.content.getContentSize(), i = e.width - t.width, n = e.height - t.height;
i = i >= 0 ? i : 0;
n = n >= 0 ? n : 0;
return cc.p(i, n);
},
scrollToPercentHorizontal: function(t, e, i) {
var n = this._calculateMovePercentDelta({
anchor: cc.p(t, 0),
applyToHorizontal: !0,
applyToVertical: !1
});
e ? this._startAutoScroll(n, e, !1 !== i) : this._moveContent(n);
},
scrollTo: function(t, e, i) {
var n = this._calculateMovePercentDelta({
anchor: t,
applyToHorizontal: !0,
applyToVertical: !0
});
e ? this._startAutoScroll(n, e, !1 !== i) : this._moveContent(n);
},
scrollToPercentVertical: function(t, e, i) {
var n = this._calculateMovePercentDelta({
anchor: cc.p(0, t),
applyToHorizontal: !1,
applyToVertical: !0
});
e ? this._startAutoScroll(n, e, !1 !== i) : this._moveContent(n);
},
stopAutoScroll: function() {
this._autoScrolling = !1;
this._autoScrollAccumulatedTime = this._autoScrollTotalTime;
},
setContentPosition: function(t) {
if (!cc.pFuzzyEqual(t, this.getContentPosition(), 1e-4)) {
this.content.setPosition(t);
this._outOfBoundaryAmountDirty = !0;
}
},
getContentPosition: function() {
return this.content.getPosition();
},
isScrolling: function() {
return this._scrolling;
},
isAutoScrolling: function() {
return this._autoScrolling;
},
_registerEvent: function() {
this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this, !0);
this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this, !0);
this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this, !0);
this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancelled, this, !0);
this.node.on(cc.Node.EventType.MOUSE_WHEEL, this._onMouseWheel, this, !0);
},
_unregisterEvent: function() {
this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this, !0);
this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this, !0);
this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this, !0);
this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancelled, this, !0);
this.node.off(cc.Node.EventType.MOUSE_WHEEL, this._onMouseWheel, this, !0);
},
_onMouseWheel: function(t, e) {
if (this.enabledInHierarchy && !this._hasNestedViewGroup(t, e)) {
var i = cc.p(0, 0), n = -.1;
n = -7;
this.vertical ? i = cc.p(0, t.getScrollY() * n) : this.horizontal && (i = cc.p(t.getScrollY() * n, 0));
this._mouseWheelEventElapsedTime = 0;
this._processDeltaMove(i);
if (!this._stopMouseWheel) {
this._handlePressLogic();
this.schedule(this._checkMouseWheel, 1 / 60);
this._stopMouseWheel = !0;
}
this._stopPropagationIfTargetIsMe(t);
}
},
_checkMouseWheel: function(t) {
var e = this._getHowMuchOutOfBoundary();
if (cc.pFuzzyEqual(e, cc.p(0, 0), 1e-4)) {
this._mouseWheelEventElapsedTime += t;
if (this._mouseWheelEventElapsedTime > .1) {
this._onScrollBarTouchEnded();
this.unschedule(this._checkMouseWheel);
this._stopMouseWheel = !1;
}
} else {
this._processInertiaScroll();
this.unschedule(this._checkMouseWheel);
this._stopMouseWheel = !1;
}
},
_calculateMovePercentDelta: function(t) {
var e = t.anchor, i = t.applyToHorizontal, n = t.applyToVertical;
this._calculateBoundary();
e = cc.pClamp(e, cc.p(0, 0), cc.p(1, 1));
var o = this.node.getContentSize(), r = this.content.getContentSize(), s = this._getContentBottomBoundary() - this._bottomBoundary;
s = -s;
var c = this._getContentLeftBoundary() - this._leftBoundary;
c = -c;
var a = cc.p(0, 0), l = 0;
if (i) {
l = r.width - o.width;
a.x = c - l * e.x;
}
if (n) {
l = r.height - o.height;
a.y = s - l * e.y;
}
return a;
},
_moveContentToTopLeft: function(t) {
var e = this.content.getContentSize(), i = this._getContentBottomBoundary() - this._bottomBoundary;
i = -i;
var n = cc.p(0, 0), o = 0, r = this._getContentLeftBoundary() - this._leftBoundary;
r = -r;
if (e.height < t.height) {
o = e.height - t.height;
n.y = i - o;
this.verticalScrollBar && this.verticalScrollBar.hide();
} else this.verticalScrollBar && this.verticalScrollBar.show();
if (e.width < t.width) {
o = e.width - t.width;
n.x = r;
this.horizontalScrollBar && this.horizontalScrollBar.hide();
} else this.horizontalScrollBar && this.horizontalScrollBar.show();
this._moveContent(n);
this._adjustContentOutOfBoundary();
},
_calculateBoundary: function() {
if (this.content) {
var t = this.content.getComponent(cc.Layout);
t && t.enabledInHierarchy && t.updateLayout();
var e = this.node.getContentSize(), i = this._convertToContentParentSpace(cc.p(0, 0));
this._leftBoundary = i.x;
this._bottomBoundary = i.y;
var n = this._convertToContentParentSpace(cc.p(e.width, e.height));
this._rightBoundary = n.x;
this._topBoundary = n.y;
this._moveContentToTopLeft(e);
}
},
_convertToContentParentSpace: function(t) {
var e = this.node.convertToWorldSpace(t);
return this.content.parent.convertToNodeSpaceAR(e);
},
_hasNestedViewGroup: function(t, e) {
if (t.eventPhase === cc.Event.CAPTURING_PHASE) {
if (e) for (var i = 0; i < e.length; ++i) {
var n = e[i];
if (this.node === n) return !!t.target.getComponent(cc.ViewGroup);
if (n.getComponent(cc.ViewGroup)) return !0;
}
return !1;
}
},
_stopPropagationIfTargetIsMe: function(t) {
t.eventPhase === cc.Event.AT_TARGET && t.target === this.node && t.stopPropagation();
},
_onTouchBegan: function(t, e) {
if (this.enabledInHierarchy && !this._hasNestedViewGroup(t, e)) {
var i = t.touch;
this.content && this._handlePressLogic(i);
this._touchMoved = !1;
this._stopPropagationIfTargetIsMe(t);
}
},
_onTouchMoved: function(t, e) {
if (this.enabledInHierarchy && !this._hasNestedViewGroup(t, e)) {
var i = t.touch;
this.content && this._handleMoveLogic(i);
if (this.cancelInnerEvents) {
var n = cc.pSub(i.getLocation(), i.getStartLocation());
if (cc.pLength(n) > 7 && !this._touchMoved && t.target !== this.node) {
var o = new cc.Event.EventTouch(t.getTouches(), t.bubbles);
o.type = cc.Node.EventType.TOUCH_CANCEL;
o.touch = t.touch;
o.simulate = !0;
t.target.dispatchEvent(o);
this._touchMoved = !0;
}
this._stopPropagationIfTargetIsMe(t);
}
}
},
_onTouchEnded: function(t, e) {
if (this.enabledInHierarchy && !this._hasNestedViewGroup(t, e)) {
this._dispatchEvent("touch-up");
var i = t.touch;
this.content && this._handleReleaseLogic(i);
this._touchMoved ? t.stopPropagation() : this._stopPropagationIfTargetIsMe(t);
}
},
_onTouchCancelled: function(t, e) {
if (this.enabledInHierarchy && !this._hasNestedViewGroup(t, e)) {
if (!t.simulate) {
var i = t.touch;
this.content && this._handleReleaseLogic(i);
}
this._stopPropagationIfTargetIsMe(t);
}
},
_processDeltaMove: function(t) {
this._scrollChildren(t);
this._gatherTouchMove(t);
},
_handleMoveLogic: function(t) {
var e = t.getDelta();
this._processDeltaMove(e);
},
_scrollChildren: function(t) {
var e, i = t = this._clampDelta(t);
if (this.elastic) {
e = this._getHowMuchOutOfBoundary();
i.x *= 0 === e.x ? 1 : .5;
i.y *= 0 === e.y ? 1 : .5;
}
if (!this.elastic) {
e = this._getHowMuchOutOfBoundary(i);
i = cc.pAdd(i, e);
}
var n = -1;
if (i.y > 0) {
this.content.y - this.content.anchorY * this.content.height + i.y > this._bottomBoundary && (n = "scroll-to-bottom");
} else if (i.y < 0) {
this.content.y - this.content.anchorY * this.content.height + this.content.height + i.y <= this._topBoundary && (n = "scroll-to-top");
} else if (i.x < 0) {
this.content.x - this.content.anchorX * this.content.width + this.content.width + i.x <= this._rightBoundary && (n = "scroll-to-right");
} else if (i.x > 0) {
this.content.x - this.content.anchorX * this.content.width + i.x >= this._leftBoundary && (n = "scroll-to-left");
}
this._moveContent(i, !1);
if (0 !== i.x || 0 !== i.y) {
if (!this._scrolling) {
this._scrolling = !0;
this._dispatchEvent("scroll-began");
}
this._dispatchEvent("scrolling");
}
-1 !== n && this._dispatchEvent(n);
},
_handlePressLogic: function() {
this._autoScrolling && this._dispatchEvent("scroll-ended");
this._autoScrolling = !1;
this._isBouncing = !1;
this._touchMovePreviousTimestamp = n();
this._touchMoveDisplacements.length = 0;
this._touchMoveTimeDeltas.length = 0;
this._onScrollBarTouchBegan();
},
_clampDelta: function(t) {
var e = this.content.getContentSize(), i = this.node.getContentSize();
e.width < i.width && (t.x = 0);
e.height < i.height && (t.y = 0);
return t;
},
_gatherTouchMove: function(t) {
t = this._clampDelta(t);
for (;this._touchMoveDisplacements.length >= 5; ) {
this._touchMoveDisplacements.shift();
this._touchMoveTimeDeltas.shift();
}
this._touchMoveDisplacements.push(t);
var e = n();
this._touchMoveTimeDeltas.push((e - this._touchMovePreviousTimestamp) / 1e3);
this._touchMovePreviousTimestamp = e;
},
_startBounceBackIfNeeded: function() {
if (!this.elastic) return !1;
var t = this._getHowMuchOutOfBoundary();
t = this._clampDelta(t);
if (cc.pFuzzyEqual(t, cc.p(0, 0), 1e-4)) return !1;
var e = Math.max(this.bounceDuration, 0);
this._startAutoScroll(t, e, !0);
if (!this._isBouncing) {
t.y > 0 && this._dispatchEvent("bounce-top");
t.y < 0 && this._dispatchEvent("bounce-bottom");
t.x > 0 && this._dispatchEvent("bounce-right");
t.x < 0 && this._dispatchEvent("bounce-left");
this._isBouncing = !0;
}
return !0;
},
_processInertiaScroll: function() {
if (!this._startBounceBackIfNeeded() && this.inertia) {
var t = this._calculateTouchMoveVelocity();
!cc.pFuzzyEqual(t, cc.p(0, 0), 1e-4) && this.brake < 1 && this._startInertiaScroll(t);
}
this._onScrollBarTouchEnded();
},
_handleReleaseLogic: function(t) {
var e = t.getDelta();
this._gatherTouchMove(e);
this._processInertiaScroll();
if (this._scrolling) {
this._scrolling = !1;
this._autoScrolling || this._dispatchEvent("scroll-ended");
}
},
_isOutOfBoundary: function() {
var t = this._getHowMuchOutOfBoundary();
return !cc.pFuzzyEqual(t, cc.p(0, 0), 1e-4);
},
_isNecessaryAutoScrollBrake: function() {
if (this._autoScrollBraking) return !0;
if (this._isOutOfBoundary()) {
if (!this._autoScrollCurrentlyOutOfBoundary) {
this._autoScrollCurrentlyOutOfBoundary = !0;
this._autoScrollBraking = !0;
this._autoScrollBrakingStartPosition = this.getContentPosition();
return !0;
}
} else this._autoScrollCurrentlyOutOfBoundary = !1;
return !1;
},
getScrollEndedEventTiming: function() {
return 1e-4;
},
_processAutoScrolling: function(t) {
var e = this._isNecessaryAutoScrollBrake(), i = e ? .05 : 1;
this._autoScrollAccumulatedTime += t * (1 / i);
var n = Math.min(1, this._autoScrollAccumulatedTime / this._autoScrollTotalTime);
this._autoScrollAttenuate && (n = (function(t) {
return (t -= 1) * t * t * t * t + 1;
})(n));
var o = cc.pAdd(this._autoScrollStartPosition, cc.pMult(this._autoScrollTargetDelta, n)), r = Math.abs(n - 1) <= 1e-4;
if (Math.abs(n - 1) <= this.getScrollEndedEventTiming() && !this._isScrollEndedWithThresholdEventFired) {
this._dispatchEvent("scroll-ended-with-threshold");
this._isScrollEndedWithThresholdEventFired = !0;
}
if (this.elastic) {
var s = cc.pSub(o, this._autoScrollBrakingStartPosition);
e && (s = cc.pMult(s, i));
o = cc.pAdd(this._autoScrollBrakingStartPosition, s);
} else {
var c = cc.pSub(o, this.getContentPosition()), a = this._getHowMuchOutOfBoundary(c);
if (!cc.pFuzzyEqual(a, cc.p(0, 0), 1e-4)) {
o = cc.pAdd(o, a);
r = !0;
}
}
r && (this._autoScrolling = !1);
var l = cc.pSub(o, this.getContentPosition());
this._moveContent(l, r);
this._dispatchEvent("scrolling");
if (!this._autoScrolling) {
this._isBouncing = !1;
this._dispatchEvent("scroll-ended");
}
},
_startInertiaScroll: function(t) {
var e = cc.pMult(t, .7);
this._startAttenuatingAutoScroll(e, t);
},
_calculateAttenuatedFactor: function(t) {
if (this.brake <= 0) return 1 - this.brake;
return (1 - this.brake) * (1 / (1 + 14e-6 * t + t * t * 8e-9));
},
_startAttenuatingAutoScroll: function(t, e) {
var i = this._calculateAutoScrollTimeByInitalSpeed(cc.pLength(e)), n = cc.pNormalize(t), o = this.content.getContentSize(), r = this.node.getContentSize(), s = o.width - r.width, c = o.height - r.height, a = this._calculateAttenuatedFactor(s), l = this._calculateAttenuatedFactor(c);
n = cc.p(n.x * s * (1 - this.brake) * a, n.y * c * l * (1 - this.brake));
var h = cc.pLength(t), u = cc.pLength(n) / h;
n = cc.pAdd(n, t);
if (this.brake > 0 && u > 7) {
u = Math.sqrt(u);
n = cc.pAdd(cc.pMult(t, u), t);
}
this.brake > 0 && u > 3 && (i *= u = 3);
0 === this.brake && u > 1 && (i *= u);
this._startAutoScroll(n, i, !0);
},
_calculateAutoScrollTimeByInitalSpeed: function(t) {
return Math.sqrt(Math.sqrt(t / 5));
},
_startAutoScroll: function(t, e, i) {
var n = this._flattenVectorByDirection(t);
this._autoScrolling = !0;
this._autoScrollTargetDelta = n;
this._autoScrollAttenuate = i;
this._autoScrollStartPosition = this.getContentPosition();
this._autoScrollTotalTime = e;
this._autoScrollAccumulatedTime = 0;
this._autoScrollBraking = !1;
this._isScrollEndedWithThresholdEventFired = !1;
this._autoScrollBrakingStartPosition = cc.p(0, 0);
var o = this._getHowMuchOutOfBoundary();
if (!cc.pFuzzyEqual(o, cc.p(0, 0), 1e-4)) {
this._autoScrollCurrentlyOutOfBoundary = !0;
var r = this._getHowMuchOutOfBoundary(n);
(o.x * r.x > 0 || o.y * r.y > 0) && (this._autoScrollBraking = !0);
}
},
_calculateTouchMoveVelocity: function() {
var t = 0;
if ((t = this._touchMoveTimeDeltas.reduce((function(t, e) {
return t + e;
}), t)) <= 0 || t >= .5) return cc.p(0, 0);
var e = cc.p(0, 0);
e = this._touchMoveDisplacements.reduce((function(t, e) {
return cc.pAdd(t, e);
}), e);
return cc.p(e.x * (1 - this.brake) / t, e.y * (1 - this.brake) / t);
},
_flattenVectorByDirection: function(t) {
var e = t;
e.x = this.horizontal ? e.x : 0;
e.y = this.vertical ? e.y : 0;
return e;
},
_moveContent: function(t, e) {
var i = this._flattenVectorByDirection(t), n = cc.pAdd(this.getContentPosition(), i);
this.setContentPosition(n);
var o = this._getHowMuchOutOfBoundary();
this._updateScrollBar(o);
this.elastic && e && this._startBounceBackIfNeeded();
},
_getContentLeftBoundary: function() {
return this.getContentPosition().x - this.content.getAnchorPoint().x * this.content.getContentSize().width;
},
_getContentRightBoundary: function() {
var t = this.content.getContentSize();
return this._getContentLeftBoundary() + t.width;
},
_getContentTopBoundary: function() {
var t = this.content.getContentSize();
return this._getContentBottomBoundary() + t.height;
},
_getContentBottomBoundary: function() {
return this.getContentPosition().y - this.content.getAnchorPoint().y * this.content.getContentSize().height;
},
_getHowMuchOutOfBoundary: function(t) {
t = t || cc.p(0, 0);
if (cc.pFuzzyEqual(t, cc.p(0, 0), 1e-4) && !this._outOfBoundaryAmountDirty) return this._outOfBoundaryAmount;
var e = cc.p(0, 0);
this._getContentLeftBoundary() + t.x > this._leftBoundary ? e.x = this._leftBoundary - (this._getContentLeftBoundary() + t.x) : this._getContentRightBoundary() + t.x < this._rightBoundary && (e.x = this._rightBoundary - (this._getContentRightBoundary() + t.x));
this._getContentTopBoundary() + t.y < this._topBoundary ? e.y = this._topBoundary - (this._getContentTopBoundary() + t.y) : this._getContentBottomBoundary() + t.y > this._bottomBoundary && (e.y = this._bottomBoundary - (this._getContentBottomBoundary() + t.y));
if (cc.pFuzzyEqual(t, cc.p(0, 0), 1e-4)) {
this._outOfBoundaryAmount = e;
this._outOfBoundaryAmountDirty = !1;
}
return e = this._clampDelta(e);
},
_updateScrollBar: function(t) {
this.horizontalScrollBar && this.horizontalScrollBar._onScroll(t);
this.verticalScrollBar && this.verticalScrollBar._onScroll(t);
},
_onScrollBarTouchBegan: function() {
this.horizontalScrollBar && this.horizontalScrollBar._onTouchBegan();
this.verticalScrollBar && this.verticalScrollBar._onTouchBegan();
},
_onScrollBarTouchEnded: function() {
this.horizontalScrollBar && this.horizontalScrollBar._onTouchEnded();
this.verticalScrollBar && this.verticalScrollBar._onTouchEnded();
},
_dispatchEvent: function(t) {
if ("scroll-ended" === t) this._scrollEventEmitMask = 0; else if ("scroll-to-top" === t || "scroll-to-bottom" === t || "scroll-to-left" === t || "scroll-to-right" === t) {
var e = 1 << r[t];
if (this._scrollEventEmitMask & e) return;
this._scrollEventEmitMask |= e;
}
cc.Component.EventHandler.emitEvents(this.scrollEvents, this, r[t]);
this.node.emit(t, this);
},
_adjustContentOutOfBoundary: function() {
this._outOfBoundaryAmountDirty = !0;
if (this._isOutOfBoundary()) {
var t = this._getHowMuchOutOfBoundary(cc.p(0, 0)), e = cc.pAdd(this.getContentPosition(), t);
if (this.content) {
this.content.setPosition(e);
this._updateScrollBar(0);
}
}
},
start: function() {
this._calculateBoundary();
this.content && cc.director.once(cc.Director.EVENT_AFTER_VISIT, this._adjustContentOutOfBoundary, this);
},
_hideScrollbar: function() {
this.horizontalScrollBar && this.horizontalScrollBar.hide();
this.verticalScrollBar && this.verticalScrollBar.hide();
},
_showScrollbar: function() {
this.horizontalScrollBar && this.horizontalScrollBar.show();
this.verticalScrollBar && this.verticalScrollBar.show();
},
onDisable: function() {
this._unregisterEvent();
this.node.off("size-changed", this._calculateBoundary, this);
this.node.off("scale-changed", this._calculateBoundary, this);
if (this.content) {
this.content.off("size-changed", this._calculateBoundary, this);
this.content.off("scale-changed", this._calculateBoundary, this);
}
this._hideScrollbar();
this.stopAutoScroll();
},
onEnable: function() {
this._registerEvent();
this.node.on("size-changed", this._calculateBoundary, this);
this.node.on("scale-changed", this._calculateBoundary, this);
if (this.content) {
this.content.on("size-changed", this._calculateBoundary, this);
this.content.on("scale-changed", this._calculateBoundary, this);
}
this._showScrollbar();
},
update: function(t) {
this._autoScrolling && this._processAutoScrolling(t);
}
});
cc.ScrollView = e.exports = s;
}), {
"./CCViewGroup": 70
} ],
62: [ (function(t, e, i) {
var n = cc.Enum({
Horizontal: 0,
Vertical: 1
}), o = cc.Class({
name: "cc.Slider",
extends: t("./CCComponent"),
editor: !1,
ctor: function() {
this._dragging = !1;
},
properties: {
handle: {
default: null,
type: cc.Button,
tooltip: !1,
notify: function() {
0;
}
},
direction: {
default: n.Horizontal,
type: n,
tooltip: !1
},
progress: {
default: .5,
type: cc.Float,
range: [ 0, 1, .1 ],
slide: !0,
tooltip: !1,
notify: function() {
this._updateHandlePosition();
}
},
slideEvents: {
default: [],
type: cc.Component.EventHandler,
tooltip: !1
}
},
statics: {
Direction: n
},
__preload: function() {
this._updateHandlePosition();
},
onEnable: function() {
this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancelled, this);
if (this.handle && this.handle.isValid) {
this.handle.node.on(cc.Node.EventType.TOUCH_START, this._onHandleDragStart, this);
this.handle.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
this.handle.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
}
},
onDisable: function() {
this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancelled, this);
if (this.handle && this.handle.isValid) {
this.handle.node.off(cc.Node.EventType.TOUCH_START, this._onHandleDragStart, this);
this.handle.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
this.handle.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
}
},
_onHandleDragStart: function(t) {
this._dragging = !0;
t.stopPropagation();
},
_onTouchBegan: function(t) {
if (this.handle) {
this._dragging = !0;
this._handleSliderLogic(t.touch);
t.stopPropagation();
}
},
_onTouchMoved: function(t) {
if (this._dragging) {
this._handleSliderLogic(t.touch);
t.stopPropagation();
}
},
_onTouchEnded: function(t) {
this._dragging = !1;
t.stopPropagation();
},
_onTouchCancelled: function(t) {
this._dragging = !1;
t.stopPropagation();
},
_handleSliderLogic: function(t) {
this._updateProgress(t);
this._emitSlideEvent();
},
_emitSlideEvent: function() {
cc.Component.EventHandler.emitEvents(this.slideEvents, this);
this.node.emit("slide", this);
},
_updateProgress: function(t) {
if (this.handle) {
var e = null, i = 0, o = this.node.convertTouchToNodeSpaceAR(t);
if (this.direction === n.Horizontal) {
e = this.node.width / 2 - this.handle.node.width * this.handle.node.anchorX;
i = cc.clamp01((o.x + e) / (2 * e), 0, 1);
} else if (this.direction === n.Vertical) {
e = this.node.height / 2 - this.handle.node.height * this.handle.node.anchorY;
i = cc.clamp01((o.y + e) / (2 * e), 0, 1);
}
this.progress = i;
}
},
_updateHandlePosition: function() {
if (this.handle) {
var t;
t = this.direction === n.Horizontal ? cc.p(-this.node.width * this.node.anchorX + this.progress * this.node.width, 0) : cc.p(0, -this.node.height * this.node.anchorY + this.progress * this.node.height);
var e = this.node.convertToWorldSpaceAR(t);
this.handle.node.position = this.handle.node.parent.convertToNodeSpaceAR(e);
}
}
});
cc.Slider = e.exports = o;
}), {
"./CCComponent": 46
} ],
63: [ (function(t, e, i) {
var n = t("./CCRendererUnderSG"), o = cc.Scale9Sprite.RenderingType, r = cc.Scale9Sprite.FillType, s = cc.BlendFunc.BlendFactor, c = cc.Enum({
CUSTOM: 0,
TRIMMED: 1,
RAW: 2
}), a = cc.Class({
name: "cc.Sprite",
extends: n,
editor: !1,
ctor: function() {
this._blendFunc = new cc.BlendFunc(this._srcBlendFactor, this._dstBlendFactor);
},
properties: {
_spriteFrame: {
default: null,
type: cc.SpriteFrame
},
_type: o.SIMPLE,
_sizeMode: c.TRIMMED,
_fillType: 0,
_fillCenter: cc.v2(0, 0),
_fillStart: 0,
_fillRange: 0,
_isTrimmedMode: !0,
_srcBlendFactor: s.SRC_ALPHA,
_dstBlendFactor: s.ONE_MINUS_SRC_ALPHA,
_atlas: {
default: null,
type: cc.SpriteAtlas,
tooltip: !1,
editorOnly: !0,
visible: !0,
animatable: !1
},
spriteFrame: {
get: function() {
return this._spriteFrame;
},
set: function(t, e) {
var i = this._spriteFrame;
if (i !== t) {
this._spriteFrame = t;
this._applySpriteFrame(i);
0;
}
},
type: cc.SpriteFrame
},
type: {
get: function() {
return this._type;
},
set: function(t) {
this._type = t;
this._sgNode.setRenderingType(t);
},
type: o,
animatable: !1,
tooltip: !1
},
fillType: {
get: function() {
return this._fillType;
},
set: function(t) {
this._fillType = t;
this._sgNode && this._sgNode.setFillType(t);
},
type: r,
tooltip: !1
},
fillCenter: {
get: function() {
return this._fillCenter;
},
set: function(t) {
this._fillCenter = cc.v2(t);
this._sgNode && this._sgNode.setFillCenter(this._fillCenter);
},
tooltip: !1
},
fillStart: {
get: function() {
return this._fillStart;
},
set: function(t) {
this._fillStart = cc.clampf(t, -1, 1);
this._sgNode && this._sgNode.setFillStart(t);
},
tooltip: !1
},
fillRange: {
get: function() {
return this._fillRange;
},
set: function(t) {
this._fillRange = cc.clampf(t, -1, 1);
this._sgNode && this._sgNode.setFillRange(t);
},
tooltip: !1
},
trim: {
get: function() {
return this._isTrimmedMode;
},
set: function(t) {
if (this._isTrimmedMode !== t) {
this._isTrimmedMode = t;
this._sgNode.enableTrimmedContentSize(t);
}
},
animatable: !1,
tooltip: !1
},
srcBlendFactor: {
get: function() {
return this._srcBlendFactor;
},
set: function(t) {
this._srcBlendFactor = t;
this._blendFunc.src = t;
this._sgNode.setBlendFunc(this._blendFunc);
},
animatable: !1,
type: s,
tooltip: !1
},
dstBlendFactor: {
get: function() {
return this._dstBlendFactor;
},
set: function(t) {
this._dstBlendFactor = t;
this._blendFunc.dst = t;
this._sgNode.setBlendFunc(this._blendFunc);
},
animatable: !1,
type: s,
tooltip: !1
},
sizeMode: {
get: function() {
return this._sizeMode;
},
set: function(t) {
this._sizeMode = t;
t !== c.CUSTOM && this._applySpriteSize();
},
animatable: !1,
type: c,
tooltip: !1
}
},
statics: {
FillType: r,
Type: o,
SizeMode: c
},
setVisible: function(t) {
this.enabled = t;
},
setInsetLeft: function(t) {
this._sgNode.setInsetLeft(t);
},
getInsetLeft: function() {
return this._sgNode.getInsetLeft();
},
setInsetTop: function(t) {
this._sgNode.setInsetTop(t);
},
getInsetTop: function() {
return this._sgNode.getInsetTop();
},
setInsetRight: function(t) {
this._sgNode.setInsetRight(t);
},
getInsetRight: function() {
return this._sgNode.getInsetRight();
},
setInsetBottom: function(t) {
this._sgNode.setInsetBottom(t);
},
getInsetBottom: function() {
return this._sgNode.getInsetBottom();
},
onEnable: function() {
this._sgNode && this._spriteFrame && this._spriteFrame.textureLoaded() && this._sgNode.setVisible(!0);
},
_applyAtlas: !1,
_applySpriteFrameInsets: function() {
var t = this._spriteFrame, e = this._sgNode;
e.setInsetTop(t.insetTop);
e.setInsetBottom(t.insetBottom);
e.setInsetRight(t.insetRight);
e.setInsetLeft(t.insetLeft);
},
_applySpriteSize: function() {
if (this._spriteFrame) if (c.RAW === this._sizeMode) {
var t = this._spriteFrame.getOriginalSize();
this.node.setContentSize(t);
} else if (c.TRIMMED === this._sizeMode) {
var e = this._spriteFrame.getRect();
this.node.setContentSize(e.width, e.height);
}
},
_onTextureLoaded: function(t) {
if (this.isValid) {
var e = this._sgNode;
e.setSpriteFrame(this._spriteFrame);
this._applySpriteSize();
this.enabledInHierarchy && !e.isVisible() && e.setVisible(!0);
}
},
_applySpriteFrame: function(t, e) {
var i = this._sgNode;
t && t.off && t.off("load", this._onTextureLoaded, this);
var n = this._spriteFrame;
if (n) {
e || this._applySpriteFrameInsets();
if (n.textureLoaded()) this._onTextureLoaded(null); else {
n.once("load", this._onTextureLoaded, this);
n.ensureLoadTexture();
}
} else i.setVisible(!1);
0;
},
_createSgNode: function() {
return new cc.Scale9Sprite();
},
_initSgNode: function() {
var t = this._sgNode, e = 0 !== t.getInsetLeft() || 0 !== t.getInsetRight() || 0 !== t.getInsetTop() || 0 !== t.getInsetBottom();
this._applySpriteFrame(null, e);
t.setContentSize(this.node.getContentSize(!0));
this._applySpriteSize();
t.setRenderingType(this._type);
t.setFillType(this._fillType);
t.setFillCenter(this._fillCenter);
t.setFillStart(this._fillStart);
t.setFillRange(this._fillRange);
t.enableTrimmedContentSize(this._isTrimmedMode);
this._blendFunc.src = this._srcBlendFactor;
this._blendFunc.dst = this._dstBlendFactor;
t.setBlendFunc(this._blendFunc);
},
_resized: !1
});
0;
t("../utils/misc").propertyDefine(a, [ "insetLeft", "insetTop", "insetRight", "insetBottom" ], {
type: [ null, "setRenderingType" ]
});
cc.Sprite = e.exports = a;
}), {
"../utils/misc": 152,
"./CCRendererUnderSG": 57
} ],
64: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.SpriteDistortion",
extends: t("./CCComponent"),
editor: !1,
ctor: function() {
this._spriteSGNode = null;
},
properties: {
_distortionOffset: cc.v2(0, 0),
offset: {
get: function() {
return this._distortionOffset;
},
set: function(t) {
this._distortionOffset.x = t.x;
this._distortionOffset.y = t.y;
this._spriteSGNode && this._spriteSGNode.setDistortionOffset(this._distortionOffset);
}
},
_distortionTiling: cc.v2(1, 1),
tiling: {
get: function() {
return this._distortionTiling;
},
set: function(t) {
this._distortionTiling.x = t.x;
this._distortionTiling.y = t.y;
this._spriteSGNode && this._spriteSGNode.setDistortionTiling(this._distortionTiling);
}
}
},
onEnable: function() {
var t = this.node.getComponent("cc.Sprite"), e = this._spriteSGNode = t && t._sgNode;
if (this._spriteSGNode) {
e.setState(cc.Scale9Sprite.state.DISTORTION);
e.setDistortionOffset(this._distortionOffset);
e.setDistortionTiling(this._distortionTiling);
}
},
onDisable: function() {
this._spriteSGNode && this._spriteSGNode.setState(cc.Scale9Sprite.state.NORMAL);
this._spriteSGNode = null;
}
});
cc.SpriteDistortion = e.exports = n;
}), {
"./CCComponent": 46
} ],
65: [ (function(t, e, i) {
var n = cc.Enum({
NONE: 0,
CHECKBOX: 1,
TEXT_ATLAS: 2,
SLIDER_BAR: 3,
LIST_VIEW: 4,
PAGE_VIEW: 5
}), o = cc.Enum({
VERTICAL: 0,
HORIZONTAL: 1
}), r = cc.Enum({
TOP: 0,
CENTER: 1,
BOTTOM: 2
}), s = cc.Enum({
LEFT: 0,
CENTER: 1,
RIGHT: 2
}), c = cc.Class({
name: "cc.StudioComponent",
extends: cc.Component,
editor: !1,
properties: !1,
statics: {
ComponentType: n,
ListDirection: o,
VerticalAlign: r,
HorizontalAlign: s
}
}), a = t("../utils/prefab-helper");
c.PlaceHolder = cc.Class({
name: "cc.StudioComponent.PlaceHolder",
extends: cc.Component,
properties: {
_baseUrl: "",
nestedPrefab: cc.Prefab
},
onLoad: function() {
this.nestedPrefab && this._replaceWithNestedPrefab();
},
_replaceWithNestedPrefab: function() {
var t = this.node, e = t._prefab;
e.root = t;
e.asset = this.nestedPrefab;
a.syncWithPrefab(t);
}
});
cc.StudioComponent = e.exports = c;
}), {
"../utils/prefab-helper": 154
} ],
66: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.Toggle",
extends: t("./CCButton"),
editor: !1,
properties: {
isChecked: {
default: !0,
tooltip: !1,
notify: function() {
this._updateCheckMark();
}
},
toggleGroup: {
default: null,
tooltip: !1,
type: t("./CCToggleGroup")
},
checkMark: {
default: null,
type: cc.Sprite,
tooltip: !1
},
checkEvents: {
default: [],
type: cc.Component.EventHandler
},
_resizeToTarget: {
animatable: !1,
set: function(t) {
t && this._resizeNodeToTargetNode();
}
}
},
onEnable: function() {
this._super();
this._registerToggleEvent();
this.toggleGroup && this.toggleGroup.enabled && this.toggleGroup.addToggle(this);
},
onDisable: function() {
this._super();
this._unregisterToggleEvent();
this.toggleGroup && this.toggleGroup.enabled && this.toggleGroup.removeToggle(this);
},
_updateCheckMark: function() {
this.checkMark && (this.checkMark.node.active = !!this.isChecked);
},
_updateDisabledState: function() {
this._super();
this.checkMark && this.checkMark._sgNode.setState(0);
this.enableAutoGrayEffect && this.checkMark && !this.interactable && this.checkMark._sgNode.setState(1);
},
_registerToggleEvent: function() {
this.node.on("click", this.toggle, this);
},
_unregisterToggleEvent: function() {
this.node.off("click", this.toggle, this);
},
toggle: function(t) {
var e = this.toggleGroup || this._toggleContainer;
if (!(e && e.enabled && this.isChecked) || e.allowSwitchOff) {
this.isChecked = !this.isChecked;
this._updateCheckMark();
e && e.enabled && e.updateToggles(this);
this._emitToggleEvents(t);
}
},
_emitToggleEvents: function() {
this.node.emit("toggle", this);
this.checkEvents && cc.Component.EventHandler.emitEvents(this.checkEvents, this);
},
check: function() {
var t = this.toggleGroup || this._toggleContainer;
if (!(t && t.enabled && this.isChecked) || t.allowSwitchOff) {
this.isChecked = !0;
t && t.enabled && t.updateToggles(this);
this._emitToggleEvents();
}
},
uncheck: function() {
var t = this.toggleGroup || this._toggleContainer;
if (!(t && t.enabled && this.isChecked) || t.allowSwitchOff) {
this.isChecked = !1;
this._emitToggleEvents();
}
}
});
cc.Toggle = e.exports = n;
t("../platform/js").get(n.prototype, "_toggleContainer", (function() {
var t = this.node.parent;
return cc.Node.isNode(t) ? t.getComponent(cc.ToggleContainer) : null;
}));
}), {
"../platform/js": 142,
"./CCButton": 44,
"./CCToggleGroup": 68
} ],
67: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.ToggleContainer",
extends: cc.Component,
editor: !1,
properties: {
allowSwitchOff: {
tooltip: !1,
default: !1
}
},
updateToggles: function(t) {
this.toggleItems.forEach((function(e) {
t.isChecked && e !== t && (e.isChecked = !1);
}));
},
_allowOnlyOneToggleChecked: function() {
var t = !1;
this.toggleItems.forEach((function(e) {
t ? e.isChecked = !1 : e.isChecked && (t = !0);
}));
return t;
},
_makeAtLeastOneToggleChecked: function() {
if (!this._allowOnlyOneToggleChecked() && !this.allowSwitchOff) {
var t = this.toggleItems;
t.length > 0 && t[0].check();
}
},
onEnable: function() {
this.node.on("child-added", this._allowOnlyOneToggleChecked, this);
this.node.on("child-removed", this._makeAtLeastOneToggleChecked, this);
},
onDisable: function() {
this.node.off("child-added", this._allowOnlyOneToggleChecked, this);
this.node.off("child-removed", this._makeAtLeastOneToggleChecked, this);
},
start: function() {
this._makeAtLeastOneToggleChecked();
}
});
t("../platform/js").get(n.prototype, "toggleItems", (function() {
return this.node.getComponentsInChildren(cc.Toggle);
}));
cc.ToggleContainer = e.exports = n;
}), {
"../platform/js": 142
} ],
68: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.ToggleGroup",
extends: cc.Component,
ctor: function() {
this._toggleItems = [];
},
editor: !1,
properties: {
allowSwitchOff: {
tooltip: !1,
default: !1
},
toggleItems: {
get: function() {
return this._toggleItems;
}
}
},
updateToggles: function(t) {
this.enabledInHierarchy && this._toggleItems.forEach((function(e) {
t.isChecked && e !== t && e.isChecked && e.enabled && (e.isChecked = !1);
}));
},
addToggle: function(t) {
-1 === this._toggleItems.indexOf(t) && this._toggleItems.push(t);
this._allowOnlyOneToggleChecked();
},
removeToggle: function(t) {
var e = this._toggleItems.indexOf(t);
e > -1 && this._toggleItems.splice(e, 1);
this._makeAtLeastOneToggleChecked();
},
_allowOnlyOneToggleChecked: function() {
var t = !1;
this._toggleItems.forEach((function(e) {
t && e.enabled && (e.isChecked = !1);
e.isChecked && e.enabled && (t = !0);
}));
return t;
},
_makeAtLeastOneToggleChecked: function() {
this._allowOnlyOneToggleChecked() || this.allowSwitchOff || this._toggleItems.length > 0 && (this._toggleItems[0].isChecked = !0);
},
start: function() {
this._makeAtLeastOneToggleChecked();
}
}), o = (t("../platform/js"), !1);
cc.js.get(cc, "ToggleGroup", (function() {
if (!o) {
cc.logID(1405, "cc.ToggleGroup", "cc.ToggleContainer");
o = !0;
}
return n;
}));
cc.ToggleGroup = e.exports = n;
}), {
"../platform/js": 142
} ],
69: [ (function(i, n, o) {
i("../videoplayer/CCSGVideoPlayer");
var r = _ccsg.VideoPlayer.EventType, s = cc.Enum({
REMOTE: 0,
LOCAL: 1
}), c = cc.Class({
name: "cc.VideoPlayer",
extends: cc._RendererUnderSG,
editor: !1,
properties: {
_resourceType: s.REMOTE,
resourceType: {
tooltip: !1,
type: s,
set: function(t) {
this._resourceType = t;
this._updateVideoSource();
},
get: function() {
return this._resourceType;
}
},
_remoteURL: "",
remoteURL: {
tooltip: !1,
type: cc.String,
set: function(t) {
this._remoteURL = t;
this._updateVideoSource();
},
get: function() {
return this._remoteURL;
}
},
_clip: {
default: null,
url: cc.RawAsset
},
clip: {
tooltip: !1,
get: function() {
return this._clip;
},
set: function(i) {
"string" !== ("object" == (e = typeof i) ? t(i) : e) && (i = "");
this._clip = i;
this._updateVideoSource();
},
url: cc.RawAsset
},
currentTime: {
tooltip: !1,
type: cc.Float,
set: function(t) {
this._sgNode && this._sgNode.seekTo(t);
},
get: function() {
return this._sgNode ? this._sgNode.currentTime() : -1;
}
},
keepAspectRatio: {
tooltip: !1,
default: !0,
type: cc.Boolean,
notify: function() {
this._sgNode.setKeepAspectRatioEnabled(this.keepAspectRatio);
}
},
isFullscreen: {
tooltip: !1,
default: !1,
type: cc.Boolean,
notify: function() {
this._sgNode.setFullScreenEnabled(this.isFullscreen);
}
},
videoPlayerEvent: {
default: [],
type: cc.Component.EventHandler
}
},
statics: {
EventType: r,
ResourceType: s
},
onLoad: function() {
cc.sys.os !== cc.sys.OS_OSX && cc.sys.os !== cc.sys.OS_WINDOWS || (this.enabled = !1);
},
_createSgNode: function() {
if (cc.sys.os === cc.sys.OS_OSX || cc.sys.os === cc.sys.OS_WINDOWS) {
console.log("VideoPlayer is not supported on Mac and Windows!");
return null;
}
return new _ccsg.VideoPlayer();
},
_updateVideoSource: function() {
var t = this._sgNode;
this.resourceType === s.REMOTE ? t.setURL(this.remoteURL) : t.setURL(this._clip || "");
},
_initSgNode: function() {
var t = this._sgNode;
if (t) {
0;
this._updateVideoSource();
t.seekTo(this.currentTime);
t.setKeepAspectRatioEnabled(this.keepAspectRatio);
t.setFullScreenEnabled(this.isFullscreen);
t.setContentSize(this.node.getContentSize());
this.pause();
t.setEventListener(r.PLAYING, this.onPlaying.bind(this));
t.setEventListener(r.PAUSED, this.onPasued.bind(this));
t.setEventListener(r.STOPPED, this.onStopped.bind(this));
t.setEventListener(r.COMPLETED, this.onCompleted.bind(this));
t.setEventListener(r.META_LOADED, this.onMetaLoaded.bind(this));
t.setEventListener(r.CLICKED, this.onClicked.bind(this));
t.setEventListener(r.READY_TO_PLAY, this.onReadyToPlay.bind(this));
}
},
onReadyToPlay: function() {
cc.Component.EventHandler.emitEvents(this.videoPlayerEvent, this, r.READY_TO_PLAY);
this.node.emit("ready-to-play", this);
},
onMetaLoaded: function() {
cc.Component.EventHandler.emitEvents(this.videoPlayerEvent, this, r.META_LOADED);
this.node.emit("meta-loaded", this);
},
onClicked: function() {
cc.Component.EventHandler.emitEvents(this.videoPlayerEvent, this, r.CLICKED);
this.node.emit("clicked", this);
},
onPlaying: function() {
cc.Component.EventHandler.emitEvents(this.videoPlayerEvent, this, r.PLAYING);
this.node.emit("playing", this);
},
onPasued: function() {
cc.Component.EventHandler.emitEvents(this.videoPlayerEvent, this, r.PAUSED);
this.node.emit("paused", this);
},
onStopped: function() {
cc.Component.EventHandler.emitEvents(this.videoPlayerEvent, this, r.STOPPED);
this.node.emit("stopped", this);
},
onCompleted: function() {
cc.Component.EventHandler.emitEvents(this.videoPlayerEvent, this, r.COMPLETED);
this.node.emit("completed", this);
},
play: function() {
this._sgNode && this._sgNode.play();
},
resume: function() {
this._sgNode && this._sgNode.resume();
},
pause: function() {
this._sgNode && this._sgNode.pause();
},
stop: function() {
this._sgNode && this._sgNode.stop();
},
getDuration: function() {
return this._sgNode ? this._sgNode.duration() : -1;
},
isPlaying: function() {
return !!this._sgNode && this._sgNode.isPlaying();
}
});
cc.VideoPlayer = n.exports = c;
}), {
"../videoplayer/CCSGVideoPlayer": 1
} ],
70: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.ViewGroup",
extends: t("./CCComponent")
});
cc.ViewGroup = e.exports = n;
}), {
"./CCComponent": 46
} ],
71: [ (function(t, e, i) {
function n() {}
t("../webview/CCSGWebView");
var o = _ccsg.WebView.EventType, r = cc.Class({
name: "cc.WebView",
extends: cc._RendererUnderSG,
editor: !1,
properties: {
_useOriginalSize: !0,
_url: "",
url: {
type: String,
tooltip: !1,
get: function() {
return this._url;
},
set: function(t) {
this._url = t;
var e = this._sgNode;
e && e.loadURL(t);
}
},
webviewEvents: {
default: [],
type: cc.Component.EventHandler
}
},
statics: {
EventType: o
},
onLoad: function() {
cc.sys.os !== cc.sys.OS_OSX && cc.sys.os !== cc.sys.OS_WINDOWS || (this.enabled = !1);
},
_createSgNode: function() {
if (cc.sys.os === cc.sys.OS_OSX || cc.sys.os === cc.sys.OS_WINDOWS) {
console.log("WebView is not supported on Mac and Windows!");
return null;
}
return new _ccsg.WebView();
},
_initSgNode: function() {
var t = this._sgNode;
if (t) {
0;
t.loadURL(this._url);
t.setContentSize(this.node.getContentSize());
}
},
onEnable: function() {
this._super();
var t = this._sgNode;
t.setEventListener(o.LOADED, this._onWebViewLoaded.bind(this));
t.setEventListener(o.LOADING, this._onWebViewLoading.bind(this));
t.setEventListener(o.ERROR, this._onWebViewLoadError.bind(this));
},
onDisable: function() {
this._super();
var t = this._sgNode;
t.setEventListener(o.LOADED, n);
t.setEventListener(o.LOADING, n);
t.setEventListener(o.ERROR, n);
},
_onWebViewLoaded: function() {
cc.Component.EventHandler.emitEvents(this.webviewEvents, this, o.LOADED);
this.node.emit("loaded", this);
},
_onWebViewLoading: function() {
cc.Component.EventHandler.emitEvents(this.webviewEvents, this, o.LOADING);
this.node.emit("loading", this);
return !0;
},
_onWebViewLoadError: function() {
cc.Component.EventHandler.emitEvents(this.webviewEvents, this, o.ERROR);
this.node.emit("error", this);
},
setJavascriptInterfaceScheme: function(t) {
this._sgNode && this._sgNode.setJavascriptInterfaceScheme(t);
},
setOnJSCallback: function(t) {
this._sgNode && this._sgNode.setOnJSCallback(t);
},
evaluateJS: function(t) {
this._sgNode && this._sgNode.evaluateJS(t);
}
});
cc.WebView = e.exports = r;
}), {
"../webview/CCSGWebView": 1
} ],
72: [ (function(t, e, i) {
var n = t("../base-ui/CCWidgetManager"), o = n._AlignFlags, r = o.TOP, s = o.MID, c = o.BOT, a = o.LEFT, l = o.CENTER, h = o.RIGHT, u = r | c, d = a | h, f = cc.Class({
name: "cc.Widget",
extends: t("./CCComponent"),
editor: !1,
properties: {
target: {
get: function() {
return this._target;
},
set: function(t) {
this._target = t;
0;
},
type: cc.Node,
tooltip: !1
},
isAlignTop: {
get: function() {
return (this._alignFlags & r) > 0;
},
set: function(t) {
this._setAlign(r, t);
},
animatable: !1,
tooltip: !1
},
isAlignVerticalCenter: {
get: function() {
return (this._alignFlags & s) > 0;
},
set: function(t) {
if (t) {
this.isAlignTop = !1;
this.isAlignBottom = !1;
this._alignFlags |= s;
} else this._alignFlags &= ~s;
},
animatable: !1,
tooltip: !1
},
isAlignBottom: {
get: function() {
return (this._alignFlags & c) > 0;
},
set: function(t) {
this._setAlign(c, t);
},
animatable: !1,
tooltip: !1
},
isAlignLeft: {
get: function() {
return (this._alignFlags & a) > 0;
},
set: function(t) {
this._setAlign(a, t);
},
animatable: !1,
tooltip: !1
},
isAlignHorizontalCenter: {
get: function() {
return (this._alignFlags & l) > 0;
},
set: function(t) {
if (t) {
this.isAlignLeft = !1;
this.isAlignRight = !1;
this._alignFlags |= l;
} else this._alignFlags &= ~l;
},
animatable: !1,
tooltip: !1
},
isAlignRight: {
get: function() {
return (this._alignFlags & h) > 0;
},
set: function(t) {
this._setAlign(h, t);
},
animatable: !1,
tooltip: !1
},
isStretchWidth: {
get: function() {
return (this._alignFlags & d) === d;
},
visible: !1
},
isStretchHeight: {
get: function() {
return (this._alignFlags & u) === u;
},
visible: !1
},
top: {
get: function() {
return this._top;
},
set: function(t) {
this._top = t;
},
tooltip: !1
},
bottom: {
get: function() {
return this._bottom;
},
set: function(t) {
this._bottom = t;
},
tooltip: !1
},
left: {
get: function() {
return this._left;
},
set: function(t) {
this._left = t;
},
tooltip: !1
},
right: {
get: function() {
return this._right;
},
set: function(t) {
this._right = t;
},
tooltip: !1
},
horizontalCenter: {
get: function() {
return this._horizontalCenter;
},
set: function(t) {
this._horizontalCenter = t;
},
tooltip: !1
},
verticalCenter: {
get: function() {
return this._verticalCenter;
},
set: function(t) {
this._verticalCenter = t;
},
tooltip: !1
},
isAbsoluteHorizontalCenter: {
get: function() {
return this._isAbsHorizontalCenter;
},
set: function(t) {
this._isAbsHorizontalCenter = t;
},
animatable: !1
},
isAbsoluteVerticalCenter: {
get: function() {
return this._isAbsVerticalCenter;
},
set: function(t) {
this._isAbsVerticalCenter = t;
},
animatable: !1
},
isAbsoluteTop: {
get: function() {
return this._isAbsTop;
},
set: function(t) {
this._isAbsTop = t;
},
animatable: !1
},
isAbsoluteBottom: {
get: function() {
return this._isAbsBottom;
},
set: function(t) {
this._isAbsBottom = t;
},
animatable: !1
},
isAbsoluteLeft: {
get: function() {
return this._isAbsLeft;
},
set: function(t) {
this._isAbsLeft = t;
},
animatable: !1
},
isAbsoluteRight: {
get: function() {
return this._isAbsRight;
},
set: function(t) {
this._isAbsRight = t;
},
animatable: !1
},
isAlignOnce: {
default: !0,
tooltip: !1,
displayName: "AlignOnce"
},
_target: null,
_alignFlags: 0,
_left: 0,
_right: 0,
_top: 0,
_bottom: 0,
_verticalCenter: 0,
_horizontalCenter: 0,
_isAbsLeft: !0,
_isAbsRight: !0,
_isAbsTop: !0,
_isAbsBottom: !0,
_isAbsHorizontalCenter: !0,
_isAbsVerticalCenter: !0,
_originalWidth: 0,
_originalHeight: 0
},
onEnable: function() {
n.add(this);
},
onDisable: function() {
n.remove(this);
},
_setAlign: function(t, e) {
if (e != (this._alignFlags & t) > 0) {
var i = (t & d) > 0;
if (e) {
this._alignFlags |= t;
if (i) {
this.isAlignHorizontalCenter = !1;
if (this.isStretchWidth) {
this._originalWidth = this.node.width;
0;
}
} else {
this.isAlignVerticalCenter = !1;
if (this.isStretchHeight) {
this._originalHeight = this.node.height;
0;
}
}
0;
} else {
i ? this.isStretchWidth && (this.node.width = this._originalWidth) : this.isStretchHeight && (this.node.height = this._originalHeight);
this._alignFlags &= ~t;
}
}
},
updateAlignment: function() {
n.updateAlignment(this.node);
}
});
cc.Widget = e.exports = f;
}), {
"../base-ui/CCWidgetManager": 30,
"./CCComponent": 46
} ],
73: [ (function(t, e, i) {
t("./CCComponent");
t("./CCRendererInSG");
t("./CCRendererUnderSG");
t("./CCComponentEventHandler");
t("./missing-script");
e.exports = [ t("./CCSprite"), t("./CCWidget"), t("./CCCanvas"), t("./CCAudioSource"), t("./CCAnimation"), t("./CCButton"), t("./CCLabel"), t("./CCProgressBar"), t("./CCMask"), t("./CCScrollBar"), t("./CCScrollView"), t("./CCPageViewIndicator"), t("./CCPageView"), t("./CCSlider"), t("./CCLayout"), t("./CCEditBox"), t("./CCVideoPlayer"), t("./CCWebView"), t("./CCSpriteDistortion"), t("./CCLabelOutline"), t("./CCRichText"), t("./CCToggleContainer"), t("./CCToggleGroup"), t("./CCToggle"), t("./CCBlockInputEvents") ];
}), {
"./CCAnimation": 41,
"./CCAudioSource": 42,
"./CCBlockInputEvents": 43,
"./CCButton": 44,
"./CCCanvas": 45,
"./CCComponent": 46,
"./CCComponentEventHandler": 47,
"./CCEditBox": 48,
"./CCLabel": 49,
"./CCLabelOutline": 50,
"./CCLayout": 51,
"./CCMask": 52,
"./CCPageView": 53,
"./CCPageViewIndicator": 54,
"./CCProgressBar": 55,
"./CCRendererInSG": 56,
"./CCRendererUnderSG": 57,
"./CCRichText": 58,
"./CCScrollBar": 60,
"./CCScrollView": 61,
"./CCSlider": 62,
"./CCSprite": 63,
"./CCSpriteDistortion": 64,
"./CCToggle": 66,
"./CCToggleContainer": 67,
"./CCToggleGroup": 68,
"./CCVideoPlayer": 69,
"./CCWebView": 71,
"./CCWidget": 72,
"./missing-script": 74
} ],
74: [ (function(t, e, i) {
var n = cc.js, o = t("../utils/misc").BUILTIN_CLASSID_RE, r = cc.Class({
name: "cc.MissingClass",
properties: {
_$erialized: {
default: null,
visible: !1,
editorOnly: !0
}
}
}), s = cc.Class({
name: "cc.MissingScript",
extends: cc.Component,
editor: {
inspector: "packages://inspector/inspectors/comps/missing-script.js"
},
properties: {
compiled: {
default: !1,
serializable: !1
},
_$erialized: {
default: null,
visible: !1,
editorOnly: !0
}
},
ctor: !1,
statics: {
safeFindClass: function(t, e) {
var i = n._getClassById(t);
if (i) return i;
if (t) {
cc.deserialize.reportMissingClass(t);
return s.getMissingWrapper(t, e);
}
return null;
},
getMissingWrapper: function(t, e) {
return e.node && (/^[0-9a-zA-Z+/]{23}$/.test(t) || o.test(t)) ? s : r;
}
},
onLoad: function() {
cc.warnID(4600, this.node.name);
}
});
cc._MissingScript = e.exports = s;
}), {
"../utils/misc": 152
} ],
75: [ (function(t, e, i) {
var n = cc.js;
t("../event/event");
var o = function(t, e) {
cc.Event.call(this, cc.Event.MOUSE, e);
this._eventType = t;
this._button = 0;
this._x = 0;
this._y = 0;
this._prevX = 0;
this._prevY = 0;
this._scrollX = 0;
this._scrollY = 0;
};
n.extend(o, cc.Event);
var r = o.prototype;
r.setScrollData = function(t, e) {
this._scrollX = t;
this._scrollY = e;
};
r.getScrollX = function() {
return this._scrollX;
};
r.getScrollY = function() {
return this._scrollY;
};
r.setLocation = function(t, e) {
this._x = t;
this._y = e;
};
r.getLocation = function() {
return {
x: this._x,
y: this._y
};
};
r.getLocationInView = function() {
return {
x: this._x,
y: cc.view._designResolutionSize.height - this._y
};
};
r._setPrevCursor = function(t, e) {
this._prevX = t;
this._prevY = e;
};
r.getPreviousLocation = function() {
return {
x: this._prevX,
y: this._prevY
};
};
r.getDelta = function() {
return {
x: this._x - this._prevX,
y: this._y - this._prevY
};
};
r.getDeltaX = function() {
return this._x - this._prevX;
};
r.getDeltaY = function() {
return this._y - this._prevY;
};
r.setButton = function(t) {
this._button = t;
};
r.getButton = function() {
return this._button;
};
r.getLocationX = function() {
return this._x;
};
r.getLocationY = function() {
return this._y;
};
o.NONE = 0;
o.DOWN = 1;
o.UP = 2;
o.MOVE = 3;
o.SCROLL = 4;
o.BUTTON_LEFT = 0;
o.BUTTON_RIGHT = 2;
o.BUTTON_MIDDLE = 1;
o.BUTTON_4 = 3;
o.BUTTON_5 = 4;
o.BUTTON_6 = 5;
o.BUTTON_7 = 6;
o.BUTTON_8 = 7;
var s = function(t, e) {
cc.Event.call(this, cc.Event.TOUCH, e);
this._eventCode = 0;
this._touches = t || [];
this.touch = null;
this.currentTouch = null;
};
n.extend(s, cc.Event);
(r = s.prototype).getEventCode = function() {
return this._eventCode;
};
r.getTouches = function() {
return this._touches;
};
r._setEventCode = function(t) {
this._eventCode = t;
};
r._setTouches = function(t) {
this._touches = t;
};
r.setLocation = function(t, e) {
this.touch && this.touch.setTouchInfo(this.touch.getID(), t, e);
};
r.getLocation = function() {
return this.touch ? this.touch.getLocation() : cc.v2();
};
r.getLocationInView = function() {
return this.touch ? this.touch.getLocationInView() : cc.v2();
};
r.getPreviousLocation = function() {
return this.touch ? this.touch.getPreviousLocation() : cc.v2();
};
r.getStartLocation = function() {
return this.touch ? this.touch.getStartLocation() : cc.v2();
};
r.getID = function() {
return this.touch ? this.touch.getID() : null;
};
r.getDelta = function() {
return this.touch ? this.touch.getDelta() : cc.v2();
};
r.getDeltaX = function() {
return this.touch ? this.touch.getDelta().x : 0;
};
r.getDeltaY = function() {
return this.touch ? this.touch.getDelta().y : 0;
};
r.getLocationX = function() {
return this.touch ? this.touch.getLocationX() : 0;
};
r.getLocationY = function() {
return this.touch ? this.touch.getLocationY() : 0;
};
s.MAX_TOUCHES = 5;
s.BEGAN = 0;
s.MOVED = 1;
s.ENDED = 2;
s.CANCELED = 3;
var c = function(t, e) {
cc.Event.call(this, cc.Event.ACCELERATION, e);
this.acc = t;
};
n.extend(c, cc.Event);
var a = function(t, e, i) {
cc.Event.call(this, cc.Event.KEYBOARD, i);
this.keyCode = t;
this.isPressed = e;
};
n.extend(a, cc.Event);
cc.Event.EventMouse = o;
cc.Event.EventTouch = s;
cc.Event.EventAcceleration = c;
cc.Event.EventKeyboard = a;
e.exports = cc.Event;
}), {
"../event/event": 79
} ],
76: [ (function(t, e, i) {
t("./CCEvent");
var n;
n = cc.eventManager;
e.exports = n;
}), {
"./CCEvent": 75,
"./CCEventListener": 1,
"./CCEventManager": 1,
"./CCTouch": 1
} ],
77: [ (function(t, e, i) {
function n() {
r.call(this);
}
var o = cc.js, r = t("../platform/callbacks-invoker").CallbacksHandler;
o.extend(n, r);
n.prototype.invoke = function(t, e) {
var i = t.type, n = this._callbackTable[i];
if (n) {
var o = !n.isInvoking;
n.isInvoking = !0;
for (var r = n.callbacks, s = n.targets, c = 0, a = r.length; c < a; ++c) {
var l = r[c];
if (l) {
var h = s[c] || t.currentTarget;
l.call(h, t, e);
if (t._propagationImmediateStopped) break;
}
}
if (o) {
n.isInvoking = !1;
n.containCanceled && n.purgeCanceled();
}
}
};
e.exports = n;
0;
}), {
"../platform/callbacks-invoker": 135
} ],
78: [ (function(i, n, o) {
function r() {
this._capturingListeners = null;
this._bubblingListeners = null;
this._hasListenerCache = null;
}
var s = i("./event-listeners");
i("./event");
var c = cc.js.array.fastRemove, a = new Array(16);
a.length = 0;
var l = r.prototype;
l._addEventFlag = function(t, e, i) {
var n = this._hasListenerCache;
n || (n = this._hasListenerCache = cc.js.createMap());
void 0 === n[t] && (n[t] = 0);
var o = i ? 2 : 4;
n[t] |= o;
};
l._purgeEventFlag = function(t, e, i) {
var n = this._hasListenerCache;
if (n && !e.has(t)) {
var o = i ? 2 : 4;
n[t] &= ~o;
0 === n[t] && delete n[t];
}
};
l._resetFlagForTarget = function(t, e, i) {
var n = this._hasListenerCache;
if (n) {
var o = i ? 2 : 4;
for (var r in n) if (!e.has(r)) {
n[r] &= ~o;
0 === n[r] && delete n[r];
}
}
};
l.hasEventListener = function(t, e) {
var i = this._hasListenerCache;
if (!i) return !1;
var n = e ? 2 : 4;
return (i[t] & n) > 0;
};
l.on = function(i, n, o, r) {
if ("boolean" === ("object" == (e = typeof o) ? t(o) : e)) {
r = o;
o = void 0;
} else r = !!r;
if (n) {
var c = null;
if (!(c = r ? this._capturingListeners = this._capturingListeners || new s() : this._bubblingListeners = this._bubblingListeners || new s()).has(i, n, o)) {
c.add(i, n, o);
o && o.__eventTargets && o.__eventTargets.push(this);
this._addEventFlag(i, c, r);
}
return n;
}
cc.errorID(6800);
};
l.off = function(i, n, o, r) {
if ("boolean" === ("object" == (e = typeof o) ? t(o) : e)) {
r = o;
o = void 0;
} else r = !!r;
if (n) {
var s = r ? this._capturingListeners : this._bubblingListeners;
if (s) {
s.remove(i, n, o);
o && o.__eventTargets && c(o.__eventTargets, this);
this._purgeEventFlag(i, s, r);
}
} else {
this._capturingListeners && this._capturingListeners.removeAll(i);
this._bubblingListeners && this._bubblingListeners.removeAll(i);
this._hasListenerCache && delete this._hasListenerCache[i];
}
};
l.targetOff = function(t) {
if (this._capturingListeners) {
this._capturingListeners.removeAll(t);
this._resetFlagForTarget(t, this._capturingListeners, !0);
}
if (this._bubblingListeners) {
this._bubblingListeners.removeAll(t);
this._resetFlagForTarget(t, this._bubblingListeners, !1);
}
};
l.once = function(t, e, i, n) {
var o = "__ONCE_FLAG:" + t, r = n ? this._capturingListeners : this._bubblingListeners;
if (!(r && r.has(o, e, i))) {
var s = this, c = function(a) {
s.off(t, c, i, n);
r.remove(o, e, i);
e.call(this, a);
};
this.on(t, c, i, n);
r || (r = n ? this._capturingListeners : this._bubblingListeners);
r.add(o, e, i);
}
};
l.dispatchEvent = function(t) {
(function(t, e) {
var i, n;
e.target = t;
a.length = 0;
t._getCapturingTargets(e.type, a);
e.eventPhase = 1;
for (n = a.length - 1; n >= 0; --n) if ((i = a[n])._isTargetActive(e.type) && i._capturingListeners) {
e.currentTarget = i;
i._capturingListeners.invoke(e, a);
if (e._propagationStopped) {
a.length = 0;
return;
}
}
a.length = 0;
if (t._isTargetActive(e.type)) {
e.eventPhase = 2;
e.currentTarget = t;
t._capturingListeners && t._capturingListeners.invoke(e);
!e._propagationImmediateStopped && t._bubblingListeners && t._bubblingListeners.invoke(e);
}
if (!e._propagationStopped && e.bubbles) {
t._getBubblingTargets(e.type, a);
e.eventPhase = 3;
for (n = 0; n < a.length; ++n) if ((i = a[n])._isTargetActive(e.type) && i._bubblingListeners) {
e.currentTarget = i;
i._bubblingListeners.invoke(e);
if (e._propagationStopped) {
a.length = 0;
return;
}
}
}
a.length = 0;
})(this, t);
a.length = 0;
};
l.emit = function(t, e) {
0;
var i = this._hasListenerCache;
if (i) {
var n = i[t];
if (n) {
var o = cc.Event.EventCustom.get(t);
o.detail = e;
o.eventPhase = 2;
o.target = o.currentTarget = this;
var r = this._capturingListeners;
r && 2 & n && r.invoke(o);
var s = this._bubblingListeners;
s && 4 & n && !o._propagationImmediateStopped && s.invoke(o);
cc.Event.EventCustom.put(o);
}
}
};
l._isTargetActive = function(t) {
return !0;
};
l._getCapturingTargets = function(t, e) {};
l._getBubblingTargets = function(t, e) {};
r.prototype._EventTargetOn = r.prototype.on;
r.prototype._EventTargetOnce = r.prototype.once;
r.prototype._EventTargetOff = r.prototype.off;
r.prototype._EventTargetTargetOff = r.prototype.targetOff;
cc.EventTarget = n.exports = r;
}), {
"./event": 79,
"./event-listeners": 77
} ],
79: [ (function(t, e, i) {
var n = t("../platform/js");
cc.Event = function(t, e) {
this.type = t;
this.bubbles = !!e;
this.target = null;
this.currentTarget = null;
this.eventPhase = 0;
this._propagationStopped = !1;
this._propagationImmediateStopped = !1;
};
cc.Event.prototype = {
constructor: cc.Event,
unuse: function() {
this.type = cc.Event.NO_TYPE;
this.target = null;
this.currentTarget = null;
this.eventPhase = cc.Event.NONE;
this._propagationStopped = !1;
this._propagationImmediateStopped = !1;
},
reuse: function(t, e) {
this.type = t;
this.bubbles = e || !1;
},
stopPropagation: function() {
this._propagationStopped = !0;
},
stopPropagationImmediate: function() {
this._propagationImmediateStopped = !0;
},
isStopped: function() {
return this._propagationStopped || this._propagationImmediateStopped;
},
getCurrentTarget: function() {
return this.currentTarget;
},
getType: function() {
return this.type;
}
};
cc.Event.NO_TYPE = "no_type";
cc.Event.TOUCH = "touch";
cc.Event.MOUSE = "mouse";
cc.Event.KEYBOARD = "keyboard";
cc.Event.ACCELERATION = "acceleration";
cc.Event.NONE = 0;
cc.Event.CAPTURING_PHASE = 1;
cc.Event.AT_TARGET = 2;
cc.Event.BUBBLING_PHASE = 3;
var o = function(t, e) {
cc.Event.call(this, t, e);
this.detail = null;
};
n.extend(o, cc.Event);
o.prototype.reset = o;
o.prototype.setUserData = function(t) {
this.detail = t;
};
o.prototype.getUserData = function() {
return this.detail;
};
o.prototype.getEventName = cc.Event.prototype.getType;
var r = new n.Pool(10);
o.put = function(t) {
r.put(t);
};
o.get = function(t, e) {
var i = r._get();
i ? i.reset(t, e) : i = new o(t, e);
return i;
};
cc.Event.EventCustom = o;
e.exports = cc.Event;
}), {
"../platform/js": 142
} ],
80: [ (function(t, e, i) {
t("./event");
t("./event-listeners");
t("./event-target");
t("./system-event");
}), {
"./event": 79,
"./event-listeners": 77,
"./event-target": 78,
"./system-event": 81
} ],
81: [ (function(t, e, i) {
var n, o = t("../event/event-target"), r = t("../event-manager");
n = cc.inputManager;
var s = cc.Enum({
KEY_DOWN: "keydown",
KEY_UP: "keyup",
DEVICEMOTION: "devicemotion"
}), c = null, a = null, l = 0, h = cc.Class({
name: "SystemEvent",
extends: o,
statics: {
EventType: s
},
setAccelerometerEnabled: function(t) {
n.setAccelerometerEnabled(t);
},
setAccelerometerInterval: function(t) {
n.setAccelerometerInterval(t);
},
on: function(t, e, i, n) {
this._super(t, e, i, n);
if (t === s.KEY_DOWN || t === s.KEY_UP) {
c || (c = cc.EventListener.create({
event: cc.EventListener.KEYBOARD,
onKeyPressed: function(t, e) {
e.type = s.KEY_DOWN;
e.keyCode = t;
e.isPressed = !0;
cc.systemEvent.dispatchEvent(e);
},
onKeyReleased: function(t, e) {
e.type = s.KEY_UP;
e.keyCode = t;
e.isPressed = !1;
cc.systemEvent.dispatchEvent(e);
}
}));
if (!r.hasEventListener(cc._EventListenerKeyboard.LISTENER_ID)) {
var o = cc.director.getTotalFrames();
if (o !== l) {
r.addListener(c, 1);
l = o;
}
}
}
if (t === s.DEVICEMOTION) {
a || (a = cc.EventListener.create({
event: cc.EventListener.ACCELERATION,
callback: function(t, e) {
e.type = s.DEVICEMOTION;
e.acc = t;
cc.systemEvent.dispatchEvent(e);
}
}));
r.hasEventListener(cc._EventListenerAcceleration.LISTENER_ID) || r.addListener(a, 1);
}
},
off: function(t, e, i, n) {
this._super(t, e, i, n);
if (c && (t === s.KEY_DOWN || t === s.KEY_UP)) {
var o = this.hasEventListener(s.KEY_DOWN), l = this.hasEventListener(s.KEY_UP);
o || l || r.removeListener(c);
}
a && t === s.DEVICEMOTION && r.removeListener(a);
}
});
cc.SystemEvent = e.exports = h;
cc.systemEvent = new cc.SystemEvent();
}), {
"../event-manager": 76,
"../event/event-target": 78,
"../platform/CCInputManager": 1
} ],
82: [ (function(t, e, i) {
var n = t("./types").LineCap, o = t("./types").LineJoin, r = cc.Class({
name: "cc.Graphics",
extends: cc._RendererUnderSG,
editor: !1,
properties: {
_lineWidth: 1,
_strokeColor: cc.Color.BLACK,
_lineJoin: o.MITER,
_lineCap: n.BUTT,
_fillColor: cc.Color.WHITE,
_miterLimit: 10,
lineWidth: {
get: function() {
return this._lineWidth;
},
set: function(t) {
this._sgNode.lineWidth = this._lineWidth = t;
}
},
lineJoin: {
get: function() {
return this._lineJoin;
},
set: function(t) {
this._sgNode.lineJoin = this._lineJoin = t;
},
type: o
},
lineCap: {
get: function() {
return this._lineCap;
},
set: function(t) {
this._sgNode.lineCap = this._lineCap = t;
},
type: n
},
strokeColor: {
get: function() {
return this._strokeColor;
},
set: function(t) {
this._sgNode.strokeColor = this._strokeColor = t;
}
},
fillColor: {
get: function() {
return this._fillColor;
},
set: function(t) {
this._sgNode.fillColor = this._fillColor = t;
}
},
miterLimit: {
get: function() {
return this._miterLimit;
},
set: function(t) {
this._sgNode.miterLimit = this._miterLimit = t;
}
}
},
statics: {
LineJoin: o,
LineCap: n
},
_createSgNode: function() {
if (!_ccsg.GraphicsNode) {
var t = new _ccsg.Node(), e = function() {};
[ "moveTo", "lineTo", "bezierCurveTo", "quadraticCurveTo", "arc", "ellipse", "circle", "rect", "roundRect", "fillRect", "clear", "close", "stroke", "fill" ].forEach((function(i) {
t[i] = e;
}));
return t;
}
return new _ccsg.GraphicsNode();
},
_initSgNode: function() {
var t = this._sgNode;
t.lineWidth = this._lineWidth;
t.lineJoin = this._lineJoin;
t.lineCap = this._lineCap;
t.strokeColor = this._strokeColor;
t.fillColor = this._fillColor;
t.miterLimit = this._miterLimit;
t.setContentSize(this.node.getContentSize(!0));
},
moveTo: function(t, e) {
this._sgNode.moveTo(t, e);
},
lineTo: function(t, e) {
this._sgNode.lineTo(t, e);
},
bezierCurveTo: function(t, e, i, n, o, r) {
this._sgNode.bezierCurveTo(t, e, i, n, o, r);
},
quadraticCurveTo: function(t, e, i, n) {
this._sgNode.quadraticCurveTo(t, e, i, n);
},
arc: function(t, e, i, n, o, r) {
r = r || !1;
this._sgNode.arc(t, e, i, n, o, r);
},
ellipse: function(t, e, i, n) {
this._sgNode.ellipse(t, e, i, n);
},
circle: function(t, e, i) {
this._sgNode.circle(t, e, i);
},
rect: function(t, e, i, n) {
this._sgNode.rect(t, e, i, n);
},
roundRect: function(t, e, i, n, o) {
this._sgNode.roundRect(t, e, i, n, o);
},
fillRect: function(t, e, i, n) {
this._sgNode.fillRect(t, e, i, n);
},
clear: function(t) {
this._sgNode.clear(!!t);
},
close: function() {
this._sgNode.close();
},
stroke: function() {
this._sgNode.stroke();
},
fill: function() {
this._sgNode.fill();
}
});
cc.Graphics = e.exports = r;
}), {
"./types": 84
} ],
83: [ (function(t, e, i) {
"use strict";
var n;
if (n = _ccsg.GraphicsNode = cc.GraphicsNode) {
t("../utils/misc").propertyDefine(n, [ "lineWidth", "lineCap", "lineJoin", "miterLimit", "strokeColor", "fillColor" ], {});
}
t("./graphics");
}), {
"../utils/misc": 152,
"./graphics": 82,
"./graphics-node": 1
} ],
84: [ (function(t, e, i) {
"use strict";
var n = cc.Enum({
BUTT: 0,
ROUND: 1,
SQUARE: 2
}), o = cc.Enum({
BEVEL: 0,
ROUND: 1,
MITER: 2
});
e.exports = {
LineCap: n,
LineJoin: o
};
}), {} ],
85: [ (function(t, e, i) {
t("./platform");
t("./assets");
t("./CCNode");
t("./CCScene");
t("./components");
t("./graphics");
t("./collider");
t("./collider/CCIntersection");
t("./physics");
t("./camera/CCCamera");
t("./base-ui/CCWidgetManager");
}), {
"./CCNode": 16,
"./CCScene": 17,
"./assets": 29,
"./base-ui/CCWidgetManager": 30,
"./camera/CCCamera": 31,
"./collider": 39,
"./collider/CCIntersection": 37,
"./components": 73,
"./graphics": 83,
"./physics": 115,
"./platform": 139
} ],
86: [ (function(t, e, i) {
var n = /^(click)(\s)*=/, o = /(\s)*src(\s)*=|(\s)*height(\s)*=|(\s)*width(\s)*=|(\s)*click(\s)*=/;
cc.HtmlTextParser = function() {
this._parsedObject = {};
this._specialSymbolArray = [];
this._specialSymbolArray.push([ /&lt;/g, "<" ]);
this._specialSymbolArray.push([ /&gt;/g, ">" ]);
this._specialSymbolArray.push([ /&amp;/g, "&" ]);
this._specialSymbolArray.push([ /&quot;/g, '"' ]);
this._specialSymbolArray.push([ /&apos;/g, "'" ]);
};
cc.HtmlTextParser.prototype = {
constructor: cc.HtmlTextParser,
parse: function(t) {
this._resultObjectArray = [];
this._stack = [];
for (var e = 0, i = t.length; e < i; ) {
var n = t.indexOf("<", e);
if (n < 0) {
this._stack.pop();
this._processResult(t.substring(e));
e = i;
} else {
this._processResult(t.substring(e, n));
var o = t.indexOf(">", e);
-1 === o ? o = n : "/" === t.charAt(n + 1) ? this._stack.pop() : this._addToStack(t.substring(n + 1, o));
e = o + 1;
}
}
return this._resultObjectArray;
},
_attributeToObject: function(t) {
var e, i, n, r, s = {}, c = (t = t.trim()).match(/^(color|size)(\s)*=/);
if (c) {
e = c[0];
if ("" === (t = t.substring(e.length).trim())) return s;
i = t.indexOf(" ");
switch (e[0]) {
case "c":
s.color = i > -1 ? t.substring(0, i).trim() : t;
break;

case "s":
s.size = parseInt(t);
}
if (i > -1) {
r = t.substring(i + 1).trim();
n = this._processEventHandler(r);
s.event = n;
}
return s;
}
if ((c = t.match(/^(br(\s)*\/)/)) && c[0].length > 0 && (e = c[0].trim()).startsWith("br") && "/" === e[e.length - 1]) {
s.isNewLine = !0;
this._resultObjectArray.push({
text: "",
style: {
newline: !0
}
});
return s;
}
if ((c = t.match(/^(img(\s)*src(\s)*=[^>]+\/)/)) && c[0].length > 0 && (e = c[0].trim()).startsWith("img") && "/" === e[e.length - 1]) {
c = t.match(o);
for (var a, l = !1; c; ) {
e = (t = t.substring(t.indexOf(c[0]))).substr(0, c[0].length);
d = (i = (a = t.substring(e.length).trim()).indexOf(" ")) > -1 ? a.substr(0, i) : a;
e = (e = e.replace(/[^a-zA-Z]/g, "").trim()).toLocaleLowerCase();
t = a.substring(i).trim();
if ("src" === e) {
s.isImage = !0;
d.endsWith("/") && (d = d.substring(0, d.length - 1));
if (0 === d.indexOf("'")) {
l = !0;
d = d.substring(1, d.length - 1);
} else if (0 === d.indexOf('"')) {
l = !0;
d = d.substring(1, d.length - 1);
}
s.src = d;
} else "height" === e ? s.imageHeight = parseInt(d) : "width" === e ? s.imageWidth = parseInt(d) : "click" === e && (s.event = this._processEventHandler(e + "=" + d));
c = t.match(o);
}
l && s.isImage && this._resultObjectArray.push({
text: "",
style: s
});
return {};
}
if (c = t.match(/^(outline(\s)*[^>]*)/)) {
var h = {
color: "#ffffff",
width: 1
};
if (t = c[0].substring("outline".length).trim()) {
var u = /(\s)*color(\s)*=|(\s)*width(\s)*=|(\s)*click(\s)*=/;
c = t.match(u);
for (var d; c; ) {
e = (t = t.substring(t.indexOf(c[0]))).substr(0, c[0].length);
d = (i = (a = t.substring(e.length).trim()).indexOf(" ")) > -1 ? a.substr(0, i) : a;
e = (e = e.replace(/[^a-zA-Z]/g, "").trim()).toLocaleLowerCase();
t = a.substring(i).trim();
"click" === e ? s.event = this._processEventHandler(e + "=" + d) : "color" === e ? h.color = d : "width" === e && (h.width = parseInt(d));
c = t.match(u);
}
}
s.outline = h;
}
if ((c = t.match(/^(on|u|b|i)(\s)*/)) && c[0].length > 0) {
e = c[0];
t = t.substring(e.length).trim();
switch (e[0]) {
case "u":
s.underline = !0;
break;

case "i":
s.italic = !0;
break;

case "b":
s.bold = !0;
}
if ("" === t) return s;
n = this._processEventHandler(t);
s.event = n;
}
return s;
},
_processEventHandler: function(t) {
for (var e = 0, i = {}, o = t.match(n), r = !1; o; ) {
var s = o[0], c = "";
r = !1;
if ('"' === (t = t.substring(s.length).trim()).charAt(0)) {
if ((e = t.indexOf('"', 1)) > -1) {
c = t.substring(1, e).trim();
r = !0;
}
e++;
} else if ("'" === t.charAt(0)) {
if ((e = t.indexOf("'", 1)) > -1) {
c = t.substring(1, e).trim();
r = !0;
}
e++;
} else {
var a = t.match(/(\S)+/);
e = (c = a ? a[0] : "").length;
}
r && (i[s = s.substring(0, s.length - 1).trim()] = c);
o = (t = t.substring(e).trim()).match(n);
}
return i;
},
_addToStack: function(t) {
var e = this._attributeToObject(t);
if (0 === this._stack.length) this._stack.push(e); else {
if (e.isNewLine || e.isImage) return;
var i = this._stack[this._stack.length - 1];
for (var n in i) e[n] || (e[n] = i[n]);
this._stack.push(e);
}
},
_processResult: function(t) {
if ("" !== t) {
t = this._escapeSpecialSymbol(t);
this._stack.length > 0 ? this._resultObjectArray.push({
text: t,
style: this._stack[this._stack.length - 1]
}) : this._resultObjectArray.push({
text: t
});
}
},
_escapeSpecialSymbol: function(t) {
for (var e = 0; e < this._specialSymbolArray.length; ++e) {
var i = this._specialSymbolArray[e][0], n = this._specialSymbolArray[e][1];
t = t.replace(i, n);
}
return t;
}
};
cc.htmlTextParser = new cc.HtmlTextParser();
}), {} ],
87: [ (function(t, e, i) {
var n = function() {
this._status = "unloaded";
this._observers = [];
this._isLoadWithCSS = !1;
};
n.prototype.onLoaded = function() {
this._status = "loaded";
this._observers.forEach((function(t) {
t();
}));
};
n.prototype.isLoaded = function() {
return "loaded" === this._status;
};
n.prototype.addHandler = function(t) {
-1 === this._observers.indexOf(t) && this._observers.push(t);
};
var o = {
_fontCache: {},
_fontWidthCache: {},
_canvasContext: null,
_testString: "BESbswy",
_allFontsLoaded: !1,
_intervalId: 0,
loadTTF: function(t, e) {
var i = this._getFontFamily(t), n = cc.loader.md5Pipe;
n && (t = n.transformURL(t));
var o = cc.sys.browserType !== cc.sys.BROWSER_TYPE_BAIDU && cc.sys.browserType !== cc.sys.BROWSER_TYPE_BAIDU_APP && cc.sys.browserType !== cc.sys.BROWSER_TYPE_MOBILE_QQ;
window.FontFace && o ? this._loadWithFontFace(i, t, e) : this._loadWithCSS(i, t, e);
0 === this._intervalId && (this._intervalId = setInterval(this._checkFontLoaded.bind(this), 100));
},
_checkFontLoaded: function() {
this._allFontsLoaded = !0;
for (var t in this._fontCache) {
var e = this._fontCache[t];
if (!e.isLoaded() && e._isLoadWithCSS) {
var i = this._fontWidthCache[t];
this._canvasContext.font = "40px " + t;
i !== this._canvasContext.measureText(this._testString).width ? e.onLoaded() : this._allFontsLoaded = !1;
}
}
if (this._allFontsLoaded) {
clearInterval(this._intervalId);
this._intervalId = 0;
}
},
_loadWithFontFace: function(t, e, i) {
var o = this._fontCache[t];
if (o) o.isLoaded() || o.addHandler(i); else {
var r = new FontFace(t, "url('" + e + "')");
document.fonts.add(r);
(o = new n()).addHandler(i);
this._fontCache[t] = o;
r.loaded.then((function() {
o.onLoaded();
}));
}
},
_loadWithCSS: function(t, e, i) {
var o = this._fontCache[t];
if (o) o.isLoaded() || o.addHandler(i); else {
var r = document, s = document.createElement("style");
s.type = "text/css";
r.body.appendChild(s);
var c = "";
isNaN(t - 0) ? c += "@font-face { font-family:" + t + "; src:" : c += "@font-face { font-family:'" + t + "'; src:";
c += "url('" + e + "');";
s.textContent = c + "}";
var a = document.createElement("div"), l = a.style;
l.fontFamily = t;
a.innerHTML = ".";
l.position = "absolute";
l.left = "-100px";
l.top = "-100px";
r.body.appendChild(a);
(o = new n()).addHandler(i);
this._fontCache[t] = o;
o._isLoadWithCSS = !0;
if (!this._canvasContext) {
var h = document.createElement("canvas");
h.width = 100;
h.height = 100;
this._canvasContext = h.getContext("2d");
}
var u = "40px " + t;
this._canvasContext.font = u;
var d = this._canvasContext.measureText(this._testString).width;
this._fontWidthCache[t] = d;
var f = this;
s.onload = function() {
setTimeout((function() {
if (!f._allFontsLoaded) {
cc.logID(4004);
o.onLoaded();
cc.director.getScheduler().unschedule(this._checkFontLoaded, this);
}
}), 2e4);
};
}
},
_getFontFamily: function(t) {
var e = t.lastIndexOf(".ttf");
if (-1 === e) return t;
var i = t.lastIndexOf("/");
return -1 === i ? t.substring(0, e) + "_LABEL" : t.substring(i + 1, e) + "_LABEL";
}
};
cc.TextUtils = e.exports = {
label_wordRex: /([a-zA-Z0-9ÄÖÜäöüßéèçàùêâîôûа-яА-ЯЁё]+|\S)/,
label_symbolRex: /^[!,.:;'}\]%\?>、‘“》？。，！]/,
label_lastWordRex: /([a-zA-Z0-9ÄÖÜäöüßéèçàùêâîôûаíìÍÌïÁÀáàÉÈÒÓòóŐőÙÚŰúűñÑæÆœŒÃÂãÔõěščřžýáíéóúůťďňĚŠČŘŽÁÍÉÓÚŤżźśóńłęćąŻŹŚÓŃŁĘĆĄ-яА-ЯЁё]+|\S)$/,
label_lastEnglish: /[a-zA-Z0-9ÄÖÜäöüßéèçàùêâîôûаíìÍÌïÁÀáàÉÈÒÓòóŐőÙÚŰúűñÑæÆœŒÃÂãÔõěščřžýáíéóúůťďňĚŠČŘŽÁÍÉÓÚŤżźśóńłęćąŻŹŚÓŃŁĘĆĄ-яА-ЯЁё]+$/,
label_firstEnglish: /^[a-zA-Z0-9ÄÖÜäöüßéèçàùêâîôûаíìÍÌïÁÀáàÉÈÒÓòóŐőÙÚŰúűñÑæÆœŒÃÂãÔõěščřžýáíéóúůťďňĚŠČŘŽÁÍÉÓÚŤżźśóńłęćąŻŹŚÓŃŁĘĆĄ-яА-ЯЁё]/,
label_wrapinspection: !0,
isUnicodeCJK: function(t) {
return /^[\u4E00-\u9FFF\u3400-\u4DFF]+$/.test(t) || /[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g.test(t) || /^[\u1100-\u11FF]|[\u3130-\u318F]|[\uA960-\uA97F]|[\uAC00-\uD7AF]|[\uD7B0-\uD7FF]+$/.test(t);
},
isUnicodeSpace: function(t) {
return (t = t.charCodeAt(0)) >= 9 && t <= 13 || 32 === t || 133 === t || 160 === t || 5760 === t || t >= 8192 && t <= 8202 || 8232 === t || 8233 === t || 8239 === t || 8287 === t || 12288 === t;
},
fragmentText: function(t, e, i, n) {
var o = [];
if (0 === t.length || i < 0) {
o.push("");
return o;
}
for (var r = t; e > i && r.length > 1; ) {
for (var s = r.length * (i / e) | 0, c = r.substr(s), a = e - n(c), l = c, h = 0, u = 0; a > i && u++ < 10; ) {
s *= i / a;
s |= 0;
a = e - n(c = r.substr(s));
}
u = 0;
for (;a < i && u++ < 10; ) {
if (c) {
var d = this.label_wordRex.exec(c);
h = d ? d[0].length : 1;
l = c;
}
s += h;
a = e - n(c = r.substr(s));
}
if (0 == (s -= h)) {
s = 1;
l = l.substr(1);
}
var f, _ = r.substr(0, s);
if (this.label_wrapinspection && this.label_symbolRex.test(l || c)) {
0 == (s -= (f = this.label_lastWordRex.exec(_)) ? f[0].length : 0) && (s = 1);
l = r.substr(s);
_ = r.substr(0, s);
}
if (this.label_firstEnglish.test(l) && (f = this.label_lastEnglish.exec(_)) && _ !== f[0]) {
s -= f[0].length;
l = r.substr(s);
_ = r.substr(0, s);
}
0 === o.length && "" === l && "" === c ? o.push(_) : (_ = _.trim()).length > 0 && o.push(_);
e = n(r = l || c);
}
0 === o.length ? o.push(r) : (r = r.trim()).length > 0 && o.push(r);
return o;
}
};
cc.CustomFontLoader = e.exports = o;
}), {} ],
88: [ (function(i, n, o) {
function r(i) {
var n, o, r;
if ("object" === ("object" == (e = typeof i) ? t(i) : e)) {
o = i;
if (i.url) return o;
n = i.uuid;
} else {
o = {};
n = i;
}
r = o.type ? "uuid" === o.type : cc.AssetLibrary._getAssetUrl(n);
cc.AssetLibrary._getAssetInfoInRuntime(n, y);
o.url = r ? y.url : n;
if (y.url && "uuid" === o.type && y.raw) {
o.type = null;
o.isRawAsset = !0;
} else r || (o.isRawAsset = !0);
return o;
}
function s() {
var t = new h(), e = new u(), i = new d();
a.call(this, [ t, e, i ]);
this.assetLoader = t;
this.downloader = e;
this.loader = i;
this.onProgress = null;
this._autoReleaseSetting = {};
0;
}
var c = i("../platform/js"), a = i("./pipeline"), l = i("./loading-items"), h = i("./asset-loader"), u = i("./downloader"), d = i("./loader"), f = i("./asset-table"), _ = i("../platform/utils").callInNextTick, p = i("./auto-release-utils"), g = new f(), y = {
url: null,
raw: !1
}, v = [], m = [];
c.extend(s, a);
var C = s.prototype;
C.init = function(t) {};
C.getXMLHttpRequest = function() {
return window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject("MSXML2.XMLHTTP");
};
C.addDownloadHandlers = function(t) {
this.downloader.addHandlers(t);
};
C.addLoadHandlers = function(t) {
this.loader.addHandlers(t);
};
C.load = function(t, e, i) {
if (void 0 === i) {
i = e;
e = this.onProgress || null;
}
var n = this, o = !1;
if (!(t instanceof Array)) {
o = !0;
t = t ? [ t ] : [];
}
v.length = 0;
for (var s = 0; s < t.length; ++s) {
var c = t[s];
if (c && c.id) {
cc.warnID(4920, c.id);
c.uuid || c.url || (c.url = c.id);
}
var a = r(c);
if (a.url || a.uuid) {
var h = this._cache[a.url];
v.push(h || a);
}
}
var u = l.create(this, e, (function(t, e) {
_((function() {
if (i) {
if (o) {
var r = a.url;
i.call(n, e.getError(r), e.getContent(r));
} else i.call(n, t, e);
i = null;
}
e.destroy();
}));
}));
l.initQueueDeps(u);
u.append(v);
v.length = 0;
};
C.flowInDeps = function(t, e, i) {
m.length = 0;
for (var n = 0; n < e.length; ++n) {
var o = r(e[n]);
if (o.url || o.uuid) {
var s = this._cache[o.url];
s ? m.push(s) : m.push(o);
}
}
var c = l.create(this, t ? function(t, e, i) {
this._ownerQueue && this._ownerQueue.onProgress && this._ownerQueue._childOnProgress(i);
} : null, (function(e, n) {
i(e, n);
t && t.deps && (t.deps.length = 0);
n.destroy();
}));
if (t) {
var a = l.getQueue(t);
c._ownerQueue = a._ownerQueue || a;
}
var h = c.append(m, t);
m.length = 0;
return h;
};
C._resources = g;
C._getResUuid = function(t, e, i) {
if (!t) return null;
var n = t.indexOf("?");
-1 !== n && (t = t.substr(0, n));
var o = g.getUuid(t, e);
if (!o) {
var r = cc.path.extname(t);
if (r) {
t = t.slice(0, -r.length);
(o = g.getUuid(t, e)) && !i && cc.warnID(4901, t, r);
}
}
return o;
};
C._getReferenceKey = function(i) {
var n;
"object" === ("object" == (e = typeof i) ? t(i) : e) ? n = i._uuid || null : "string" === ("object" == (e = typeof i) ? t(i) : e) && (n = this._getResUuid(i, null, !0) || i);
if (!n) {
cc.warnID(4800, i);
return n;
}
cc.AssetLibrary._getAssetInfoInRuntime(n, y);
return this._cache[y.url] ? y.url : n;
};
C._urlNotFound = function(t, e, i) {
_((function() {
t = cc.url.normalize(t);
var n = (e ? c.getClassName(e) : "Asset") + ' in "resources/' + t + '" does not exist.';
i && i(new Error(n), []);
}));
};
C._parseLoadResArgs = function(t, e, i) {
if (void 0 === i) {
var n = cc.isChildClassOf(t, cc.RawAsset);
if (e) {
i = e;
n && (e = this.onProgress || null);
} else if (void 0 === e && !n) {
i = t;
e = this.onProgress || null;
t = null;
}
if (void 0 !== e && !n) {
e = t;
t = null;
}
}
return {
type: t,
onProgress: e,
onComplete: i
};
};
C.loadRes = function(t, e, i, n) {
var o = this._parseLoadResArgs(e, i, n);
e = o.type;
i = o.onProgress;
n = o.onComplete;
var r = this, s = r._getResUuid(t, e);
s ? this.load({
type: "uuid",
uuid: s
}, i, (function(t, e) {
e && r.setAutoReleaseRecursively(s, !1);
n && n(t, e);
})) : r._urlNotFound(t, e, n);
};
C._loadResUuids = function(t, e, i, n) {
if (t.length > 0) {
var o = this, r = t.map((function(t) {
return {
type: "uuid",
uuid: t
};
}));
this.load(r, e, (function(t, e) {
if (i) {
for (var s = [], c = n && [], a = 0; a < r.length; ++a) {
var l = r[a].uuid, h = this._getReferenceKey(l), u = e.getContent(h);
if (u) {
o.setAutoReleaseRecursively(l, !1);
s.push(u);
c && c.push(n[a]);
}
}
n ? i(t, s, c) : i(t, s);
}
}));
} else i && _((function() {
n ? i(null, [], []) : i(null, []);
}));
};
C.loadResArray = function(t, e, i, n) {
var o = this._parseLoadResArgs(e, i, n);
e = o.type;
i = o.onProgress;
n = o.onComplete;
for (var r = [], s = 0; s < t.length; s++) {
var c = t[s], a = this._getResUuid(c, e);
if (!a) {
this._urlNotFound(c, e, n);
return;
}
r.push(a);
}
this._loadResUuids(r, i, n);
};
C.loadResDir = function(t, e, i, n) {
var o = this._parseLoadResArgs(e, i, n);
e = o.type;
i = o.onProgress;
n = o.onComplete;
var r = [], s = g.getUuidArray(t, e, r);
this._loadResUuids(s, i, n, r);
};
C.getRes = function(t, e) {
var i = this._cache[t];
if (!i) {
var n = this._getResUuid(t, e, !0);
if (!n) return null;
var o = this._getReferenceKey(n);
i = this._cache[o];
}
i && i.alias && (i = i.alias);
return i && i.complete ? i.content : null;
};
C.getResCount = function() {
return Object.keys(this._cache).length;
};
C.getDependsRecursively = function(t) {
if (t) {
var e = this._getReferenceKey(t), i = p.getDependsRecursively(e);
i.push(e);
return i;
}
return [];
};
C.release = function(t) {
if (Array.isArray(t)) for (var e = 0; e < t.length; e++) {
var i = t[e];
this.release(i);
} else if (t) {
var n = this._getReferenceKey(t), o = this.getItem(n);
if (o) {
var r = this.removeItem(n);
if ((t = o.content) instanceof cc.Asset) {
t instanceof cc.SpriteFrame && r && t.release();
for (var s = t.rawUrls, c = 0; c < s.length; c++) this.release(s[c]);
} else t instanceof cc.Texture2D && cc.textureCache.removeTextureForKey(o.rawUrl || o.url);
0;
}
}
};
C.releaseAsset = function(t) {
var e = t._uuid;
e && this.release(e);
};
C.releaseRes = function(t, e) {
var i = this._getResUuid(t, e);
i ? this.release(i) : cc.errorID(4914, t);
};
C.releaseResDir = function(t, e) {
for (var i = g.getUuidArray(t, e), n = 0; n < i.length; n++) {
var o = i[n];
this.release(o);
}
};
C.releaseAll = function() {
for (var t in this._cache) this.release(t);
};
C.removeItem = function(t) {
var e = a.prototype.removeItem.call(this, t);
delete this._autoReleaseSetting[t];
return e;
};
C.setAutoRelease = function(t, e) {
var i = this._getReferenceKey(t);
i && (this._autoReleaseSetting[i] = !!e);
};
C.setAutoReleaseRecursively = function(t, e) {
e = !!e;
var i = this._getReferenceKey(t);
if (i) {
this._autoReleaseSetting[i] = e;
for (var n = p.getDependsRecursively(i), o = 0; o < n.length; o++) {
var r = n[o];
this._autoReleaseSetting[r] = e;
}
} else 0;
};
C.isAutoRelease = function(t) {
var e = this._getReferenceKey(t);
return !!e && !!this._autoReleaseSetting[e];
};
cc.loader = new s();
0;
n.exports = cc.loader;
}), {
"../platform/js": 142,
"../platform/utils": 146,
"./asset-loader": 89,
"./asset-table": 90,
"./auto-release-utils": 91,
"./downloader": 92,
"./loader": 95,
"./loading-items": 96,
"./pipeline": 99,
"./released-asset-checker": 100
} ],
89: [ (function(t, e, i) {
var n = t("../utils/CCPath"), o = t("./pipeline"), r = t("./loading-items"), s = function(t) {
this.id = "AssetLoader";
this.async = !0;
this.pipeline = null;
};
s.ID = "AssetLoader";
var c = [];
s.prototype.handle = function(t, e) {
var i = t.uuid;
if (!i) return t.content ? t.content : null;
cc.AssetLibrary.queryAssetInfo(i, (function(o, s, a) {
if (o) e(o); else {
t.url = t.rawUrl = s;
t.isRawAsset = a;
if (a) {
var l = n.extname(s).toLowerCase();
if (!l) {
e(new Error("Download Uuid: can not find type of raw asset[" + i + "]: " + s));
return;
}
l = l.substr(1);
var h = r.getQueue(t);
c[0] = {
queueId: t.queueId,
id: s,
url: s,
type: l,
error: null,
alias: t,
complete: !0
};
0;
h.append(c);
t.type = l;
e(null, t.content);
} else {
t.type = "uuid";
e(null, t.content);
}
}
}));
};
o.AssetLoader = e.exports = s;
}), {
"../utils/CCPath": 147,
"./loading-items": 96,
"./pipeline": 99
} ],
90: [ (function(t, e, i) {
function n() {
this._pathToUuid = this._pathToUuid || {};
}
function o(t, e) {
if (t.length > e.length) {
var i = t.charCodeAt(e.length);
return 46 === i || 47 === i;
}
return !0;
}
var r = t("../utils/misc").pushToMap, s = n.prototype;
s.getUuid = function(t, e) {
t = cc.url.normalize(t);
var i = this._pathToUuid[t];
if (i) if (Array.isArray(i)) {
if (!e) return i[0].uuid;
for (var n = 0; n < i.length; n++) {
var o = i[n];
if (cc.isChildClassOf(o.type, e)) return o.uuid;
}
} else if (!e || cc.isChildClassOf(i.type, e)) return i.uuid;
return "";
};
s.getUuidArray = function(t, e, i) {
"/" === (t = cc.url.normalize(t))[t.length - 1] && (t = t.slice(0, -1));
var n = this._pathToUuid, r = [], s = cc.isChildClassOf;
for (var c in n) if (c.startsWith(t) && o(c, t) || !t) {
var a = n[c];
if (Array.isArray(a)) for (var l = 0; l < a.length; l++) {
var h = a[l];
if (!e || s(h.type, e)) {
r.push(h.uuid);
i && i.push(c);
}
} else if (!e || s(a.type, e)) {
r.push(a.uuid);
i && i.push(c);
}
}
return r;
};
s.add = function(t, e, i, n) {
t = t.substring(0, t.length - cc.path.extname(t).length);
var o = new function(t, e) {
this.uuid = t;
this.type = e;
}(e, i);
r(this._pathToUuid, t, o, n);
};
s._getInfo_DEBUG = !1;
s.reset = function() {
this._pathToUuid = this._pathToUuid || {};
};
e.exports = n;
}), {
"../utils/misc": 152
} ],
91: [ (function(i, n, o) {
function r(t, e) {
var i = cc.loader.getItem(t);
if (i) {
var n = i.dependKeys;
if (n) for (var o = 0; o < n.length; o++) {
var s = n[o];
if (!e[s]) {
e[s] = !0;
r(s, e);
}
}
}
}
function s(t, e) {
var i = cc.loader._getReferenceKey(t);
if (!e[i]) {
e[i] = !0;
r(i, e);
}
}
function c(i, n) {
for (var o = Object.getOwnPropertyNames(i), r = 0; r < o.length; r++) {
var c = i[o[r]];
if ("object" === ("object" == (e = typeof c) ? t(c) : e) && c) if (Array.isArray(c)) for (var a = 0; a < c.length; a++) {
var l = c[a];
l instanceof cc.RawAsset && s(l, n);
} else if (c.constructor && c.constructor !== Object) c instanceof cc.RawAsset && s(c, n); else for (var h = Object.getOwnPropertyNames(c), u = 0; u < h.length; u++) {
var d = c[h[u]];
d instanceof cc.RawAsset && s(d, n);
}
}
}
function a(t, e) {
for (var i = 0; i < t._components.length; i++) c(t._components[i], e);
for (var n = 0; n < t._children.length; n++) a(t._children[n], e);
}
var l = i("../platform/js");
n.exports = {
autoRelease: function(t, e, i) {
var n = cc.loader._autoReleaseSetting, o = l.createMap();
if (e) for (var r = 0; r < e.length; r++) o[e[r]] = !0;
for (var s = 0; s < i.length; s++) a(i[s], o);
if (t) for (var c = 0; c < t.length; c++) {
var h = t[c];
!1 === n[h] || o[h] || cc.loader.release(h);
}
for (var u = Object.keys(n), d = 0; d < u.length; d++) {
var f = u[d];
!0 !== n[f] || o[f] || cc.loader.release(f);
}
},
getDependsRecursively: function(t) {
var e = {};
r(t, e);
return Object.keys(e);
}
};
}), {
"../platform/js": 142
} ],
92: [ (function(t, e, i) {
function n(t, e, i, o) {
void 0 === i && (i = !0);
var r = _(t.url);
o = o || h.imagePool.get();
i && "file:" !== window.location.protocol ? o.crossOrigin = "anonymous" : o.crossOrigin = null;
if (o.complete && o.naturalWidth > 0 && o.src === r) return o;
(function() {
function i() {
o.removeEventListener("load", i);
o.removeEventListener("error", s);
e(null, o);
}
function s() {
o.removeEventListener("load", i);
o.removeEventListener("error", s);
"https:" !== window.location.protocol && o.crossOrigin && "anonymous" === o.crossOrigin.toLowerCase() ? n(t, e, !1, o) : e(new Error("Load image (" + r + ") failed"));
}
o.addEventListener("load", i);
o.addEventListener("error", s);
o.src = r;
})();
}
function o(t, e, i) {
var n = document, o = document.createElement("style");
o.type = "text/css";
n.body.appendChild(o);
var r = "";
isNaN(t - 0) ? r += "@font-face { font-family:" + t + "; src:" : r += "@font-face { font-family:'" + t + "'; src:";
if (e instanceof Array) for (var s = 0, c = e.length; s < c; s++) {
var a = e[s];
i = l.extname(a).toLowerCase();
r += "url('" + e[s] + "') format('" + p[i] + "')";
r += s === c - 1 ? ";" : ",";
} else {
i = i.toLowerCase();
r += "url('" + e + "') format('" + p[i] + "');";
}
o.textContent += r + "}";
var h = document.createElement("div"), u = h.style;
u.fontFamily = t;
h.innerHTML = ".";
u.position = "absolute";
u.left = "-100px";
u.top = "-100px";
n.body.appendChild(h);
}
function r(t, e) {
var i = t.url, n = t.type, r = t.name, s = t.srcs;
if (r && s) {
-1 === s.indexOf(i) && s.push(i);
o(r, s);
} else {
n = l.extname(i);
o(r = l.basename(i, n), i, n);
}
if (!document.fonts) return null;
document.fonts.load("1em " + r).then((function() {
e(null, null);
}), (function(t) {
e(t);
}));
}
var s, c = t("../platform/js"), a = t("../platform/CCSys"), l = t("../utils/CCPath"), h = t("../utils/misc"), u = t("./pipeline"), d = t("./pack-downloader"), f = t("./text-downloader"), _ = t("./utils").urlAppendTimestamp, p = {
".eot": "embedded-opentype",
".ttf": "truetype",
".ttc": "truetype",
".woff": "woff",
".svg": "svg"
}, g = {
js: function(e, i, n) {
function o() {
l.parentNode.removeChild(l);
l.removeEventListener("load", o, !1);
l.removeEventListener("error", r, !1);
i(null, s);
}
function r() {
l.parentNode.removeChild(l);
l.removeEventListener("load", o, !1);
l.removeEventListener("error", r, !1);
i(new Error("Load " + s + " failed!"), s);
}
if (a.platform !== a.WECHAT_GAME) {
var s = e.url, c = document, l = document.createElement("script");
l.async = n;
l.src = _(s);
l.addEventListener("load", o, !1);
l.addEventListener("error", r, !1);
c.body.appendChild(l);
} else {
t(e.url);
i(null, e.url);
}
},
png: n,
jpg: n,
bmp: n,
jpeg: n,
gif: n,
ico: n,
tiff: n,
webp: function(t, e, i, o) {
return cc.sys.capabilities.webp ? n(t, e, i, o) : new Error("Load Webp ( " + t.url + " ) failed");
},
image: n,
mp3: s = t("./audio-downloader"),
ogg: s,
wav: s,
m4a: s,
txt: f,
xml: f,
vsh: f,
fsh: f,
atlas: f,
tmx: f,
tsx: f,
json: f,
ExportJson: f,
plist: f,
fnt: f,
font: r,
eot: r,
ttf: r,
woff: r,
svg: r,
ttc: r,
uuid: function(t, e) {
var i = d.load(t, e);
return void 0 === i ? this.extMap.json(t, e) : i || void 0;
},
default: f
}, y = function(t) {
this.id = "Downloader";
this.async = !0;
this.pipeline = null;
this._curConcurrent = 0;
this._loadQueue = [];
this.extMap = c.mixin(t, g);
};
y.ID = "Downloader";
y.PackDownloader = d;
y.prototype.addHandlers = function(t) {
c.mixin(this.extMap, t);
};
y.prototype._handleLoadQueue = function() {
for (;this._curConcurrent < cc.macro.DOWNLOAD_MAX_CONCURRENT; ) {
var t = this._loadQueue.shift();
if (!t) break;
var e = this.handle(t.item, t.callback);
void 0 !== e && (e instanceof Error ? t.callback(e) : t.callback(null, e));
}
};
y.prototype.handle = function(t, e) {
var i = this, n = this.extMap[t.type] || this.extMap.default, o = void 0;
if (this._curConcurrent < cc.macro.DOWNLOAD_MAX_CONCURRENT) {
this._curConcurrent++;
if (void 0 !== (o = n.call(this, t, (function(t, n) {
i._curConcurrent = Math.max(0, i._curConcurrent - 1);
i._handleLoadQueue();
e && e(t, n);
})))) {
this._curConcurrent = Math.max(0, this._curConcurrent - 1);
this._handleLoadQueue();
return o;
}
} else if (t.ignoreMaxConcurrency) {
if (void 0 !== (o = n.call(this, t, e))) return o;
} else this._loadQueue.push({
item: t,
callback: e
});
};
u.Downloader = e.exports = y;
}), {
"../platform/CCSys": 132,
"../platform/js": 142,
"../utils/CCPath": 147,
"../utils/misc": 152,
"./audio-downloader": 1,
"./pack-downloader": 98,
"./pipeline": 99,
"./text-downloader": 101,
"./utils": 102
} ],
93: [ (function(t, e, i) {
t("./downloader");
t("./loader");
t("./json-unpacker");
t("./loading-items");
t("./pipeline");
t("./CCLoader");
}), {
"./CCLoader": 88,
"./downloader": 92,
"./json-unpacker": 94,
"./loader": 95,
"./loading-items": 96,
"./pipeline": 99
} ],
94: [ (function(i, n, o) {
function r() {
this.jsons = {};
this.state = -1;
}
r.prototype.read = function(i, n) {
var o = "string" === ("object" == (e = typeof n) ? t(n) : e) ? JSON.parse(n) : n;
o.length !== i.length && cc.errorID(4915);
for (var r = 0; r < i.length; r++) {
var s = i[r], c = o[r];
this.jsons[s] = c;
}
};
r.prototype.retrieve = function(t) {
return this.jsons[t] || null;
};
0;
n.exports = r;
}), {} ],
95: [ (function(i, n, o) {
function r(i, n) {
if ("string" !== ("object" == (e = typeof i.content) ? t(i.content) : e)) return new Error("JSON Loader: Input item doesn't contain string content");
try {
return JSON.parse(i.content);
} catch (t) {
return new Error("JSON Loader: Parse json [" + i.id + "] failed : " + t);
}
}
function s(t, e) {
if (a.platform !== a.WECHAT_GAME && !(t.content instanceof Image)) return new Error("Image Loader: Input item doesn't contain Image content");
var i = t.rawUrl, n = cc.textureCache.getTextureForKey(i) || new h();
n.url = i;
n.initWithElement(t.content);
n.handleLoadedTexture();
cc.textureCache.cacheImage(i, n);
return n;
}
var c = i("../platform/js"), a = i("../platform/CCSys"), l = i("./pipeline"), h = i("../textures/CCTexture2D"), u = i("./uuid-loader"), d = (i("../utils/misc"), 
{
png: s,
jpg: s,
bmp: s,
jpeg: s,
gif: s,
ico: s,
tiff: s,
webp: s,
image: s,
json: r,
ExportJson: r,
plist: function(i, n) {
if ("string" !== ("object" == (e = typeof i.content) ? t(i.content) : e)) return new Error("Plist Loader: Input item doesn't contain string content");
var o = cc.plistParser.parse(i.content);
return o || new Error("Plist Loader: Parse [" + i.id + "] failed");
},
uuid: u,
prefab: u,
fire: u,
scene: u,
default: function(t, e) {
return null;
}
}), f = function(t) {
this.id = "Loader";
this.async = !0;
this.pipeline = null;
this.extMap = c.mixin(t, d);
};
f.ID = "Loader";
f.prototype.addHandlers = function(t) {
this.extMap = c.mixin(this.extMap, t);
};
f.prototype.handle = function(t, e) {
return (this.extMap[t.type] || this.extMap.default).call(this, t, e);
};
l.Loader = n.exports = f;
}), {
"../platform/CCSys": 132,
"../platform/js": 142,
"../textures/CCTexture2D": 1,
"../utils/misc": 152,
"./pipeline": 99,
"./uuid-loader": 103
} ],
96: [ (function(i, n, o) {
function r(i) {
var n = i.url || i;
return "string" === ("object" == (e = typeof n) ? t(n) : e);
}
function s(i, n) {
var o = "object" === ("object" == (e = typeof i) ? t(i) : e) ? i.url : i, r = {
queueId: n,
id: o,
url: o,
rawUrl: void 0,
urlParam: (function(t) {
if (t) {
var e = t.split("?");
if (e && e[0] && e[1]) {
var i = {};
e[1].split("&").forEach((function(t) {
var e = t.split("=");
i[e[0]] = e[1];
}));
return i;
}
}
})(o),
type: "",
error: null,
content: null,
complete: !1,
states: {},
deps: null
};
if ("object" === ("object" == (e = typeof i) ? t(i) : e)) {
h.mixin(r, i);
if (i.skips) for (var s = 0; s < i.skips.length; s++) {
var c = i.skips[s];
r.states[c] = _.COMPLETE;
}
}
r.rawUrl = r.url;
o && !r.type && (r.type = l.extname(o).toLowerCase().substr(1));
return r;
}
function c(t, e, i) {
if (!t || !e) return !1;
var n = !1;
g.push(e.id);
if (e.deps) {
var o, r, s = e.deps;
for (o = 0; o < s.length; o++) {
if ((r = s[o]).id === t.id) {
n = !0;
break;
}
if (!(g.indexOf(r.id) >= 0) && (r.deps && c(t, r, !0))) {
n = !0;
break;
}
}
}
i || (g.length = 0);
return n;
}
var a = i("../platform/callbacks-invoker"), l = i("../utils/CCPath"), h = i("../platform/js"), u = 0 | 998 * Math.random(), d = {}, f = [], _ = {
WORKING: 1,
COMPLETE: 2,
ERROR: 3
}, p = {}, g = [], y = function(t, e, i, n) {
a.call(this);
this._id = ++u;
d[this._id] = this;
this._pipeline = t;
this._errorUrls = [];
this._appending = !1;
this._ownerQueue = null;
this.onProgress = i;
this.onComplete = n;
this.map = {};
this.completed = {};
this.totalCount = 0;
this.completedCount = 0;
this._pipeline ? this.active = !0 : this.active = !1;
e && (e.length > 0 ? this.append(e) : this.allComplete());
};
y.ItemState = new cc.Enum(_);
y.create = function(i, n, o, r) {
if (void 0 === o) {
if ("function" === ("object" == (e = typeof n) ? t(n) : e)) {
r = n;
n = o = null;
}
} else if (void 0 === r) if ("function" === ("object" == (e = typeof n) ? t(n) : e)) {
r = o;
o = n;
n = null;
} else {
r = o;
o = null;
}
var s = f.pop();
if (s) {
s._pipeline = i;
s.onProgress = o;
s.onComplete = r;
d[s._id] = s;
s._pipeline && (s.active = !0);
n && s.append(n);
} else s = new y(i, n, o, r);
return s;
};
y.getQueue = function(t) {
return t.queueId ? d[t.queueId] : null;
};
y.itemComplete = function(t) {
var e = d[t.queueId];
e && e.itemComplete(t.id);
};
y.initQueueDeps = function(t) {
var e = p[t._id];
if (e) {
e.completed.length = 0;
e.deps.length = 0;
} else e = p[t._id] = {
completed: [],
deps: []
};
};
y.registerQueueDep = function(t, e) {
var i = t.queueId || t;
if (!i) return !1;
var n = p[i];
if (n) -1 === n.deps.indexOf(e) && n.deps.push(e); else if (t.id) for (var o in p) {
var r = p[o];
-1 !== r.deps.indexOf(t.id) && -1 === r.deps.indexOf(e) && r.deps.push(e);
}
};
y.finishDep = function(t) {
for (var e in p) {
var i = p[e];
-1 !== i.deps.indexOf(t) && -1 === i.completed.indexOf(t) && i.completed.push(t);
}
};
var v = y.prototype;
h.mixin(v, a.prototype);
v.append = function(t, e) {
if (!this.active) return [];
e && !e.deps && (e.deps = []);
this._appending = !0;
var i, n, o, a = [];
for (i = 0; i < t.length; ++i) if (!(n = t[i]).queueId || this.map[n.id]) {
if (r(n)) {
var l = (o = s(n, this._id)).id;
if (!this.map[l]) {
this.map[l] = o;
this.totalCount++;
e && e.deps.push(o);
y.registerQueueDep(e || this._id, l);
a.push(o);
}
}
} else {
this.map[n.id] = n;
e && e.deps.push(n);
if (n.complete || c(e, n)) {
this.totalCount++;
this.itemComplete(n.id);
continue;
}
var h = this, u = d[n.queueId];
if (u) {
this.totalCount++;
y.registerQueueDep(e || this._id, n.id);
u.addListener(n.id, (function(t) {
h.itemComplete(t.id);
}));
}
}
this._appending = !1;
this.completedCount === this.totalCount ? this.allComplete() : this._pipeline.flowIn(a);
return a;
};
v._childOnProgress = function(t) {
if (this.onProgress) {
var e = p[this._id];
this.onProgress(e ? e.completed.length : this.completedCount, e ? e.deps.length : this.totalCount, t);
}
};
v.allComplete = function() {
var t = 0 === this._errorUrls.length ? null : this._errorUrls;
this.onComplete && this.onComplete(t, this);
};
v.isCompleted = function() {
return this.completedCount >= this.totalCount;
};
v.isItemCompleted = function(t) {
return !!this.completed[t];
};
v.exists = function(t) {
return !!this.map[t];
};
v.getContent = function(t) {
var e = this.map[t], i = null;
e && (e.content ? i = e.content : e.alias && (i = e.alias.content));
return i;
};
v.getError = function(t) {
var e = this.map[t], i = null;
e && (e.error ? i = e.error : e.alias && (i = e.alias.error));
return i;
};
v.addListener = a.prototype.add;
v.hasListener = a.prototype.has;
v.removeListener = a.prototype.remove;
v.removeAllListeners = a.prototype.removeAll;
v.removeItem = function(t) {
var e = this.map[t];
if (e && this.completed[e.alias || t]) {
delete this.completed[t];
delete this.map[t];
if (e.alias) {
delete this.completed[e.alias.id];
delete this.map[e.alias.id];
}
this.completedCount--;
this.totalCount--;
}
};
v.itemComplete = function(t) {
var e = this.map[t];
if (e) {
var i = this._errorUrls.indexOf(t);
e.error && -1 === i ? this._errorUrls.push(t) : e.error || -1 === i || this._errorUrls.splice(i, 1);
this.completed[t] = e;
this.completedCount++;
y.finishDep(e.id);
if (this.onProgress) {
var n = p[this._id];
this.onProgress(n ? n.completed.length : this.completedCount, n ? n.deps.length : this.totalCount, e);
}
this.invoke(t, e);
this.removeAll(t);
!this._appending && this.completedCount >= this.totalCount && this.allComplete();
}
};
v.destroy = function() {
this.active = !1;
this._appending = !1;
this._pipeline = null;
this._ownerQueue = null;
this._errorUrls.length = 0;
this.onProgress = null;
this.onComplete = null;
this.map = {};
this.completed = {};
this.totalCount = 0;
this.completedCount = 0;
a.call(this);
d[this._id] = null;
if (p[this._id]) {
p[this._id].completed.length = 0;
p[this._id].deps.length = 0;
}
-1 === f.indexOf(this) && f.length < 10 && f.push(this);
};
cc.LoadingItems = n.exports = y;
}), {
"../platform/callbacks-invoker": 135,
"../platform/js": 142,
"../utils/CCPath": 147
} ],
97: [ (function(t, e, i) {
var n = t("./pipeline"), o = /(\.[^.\n\\/]*)$/, r = function(t, e, i) {
this.id = "MD5Pipe";
this.async = !1;
this.pipeline = null;
this.md5AssetsMap = t;
this.libraryBase = e;
this.rawAssetsBase = i;
};
r.ID = "MD5Pipe";
r.prototype.handle = function(t) {
t.url = this.transformURL(t.url);
return t;
};
r.prototype.transformURL = function(t) {
var e = t.indexOf("?"), i = t;
-1 !== e && (i = t.substr(0, e));
if (i.startsWith(this.libraryBase)) i = i.slice(this.libraryBase.length); else {
if (!i.startsWith(this.rawAssetsBase)) return t;
i = i.slice(this.rawAssetsBase.length);
}
var n = this.md5AssetsMap[i];
if (n) {
var r = !1;
t = t.replace(o, (function(t, e) {
r = !0;
return "." + n + e;
}));
r || (t = t + "." + n);
}
return t;
};
n.MD5Pipe = e.exports = r;
}), {
"./pipeline": 99
} ],
98: [ (function(t, e, i) {
function n(t, e) {
return new Error("Can not retrieve " + t + " from packer " + e);
}
var o = t("./json-unpacker"), r = t("../utils/misc").pushToMap, s = s || {}, c = c || {}, a = a || {}, l = 0, h = 2, u = 3;
e.exports = {
initPacks: function(t) {

//c = t;
/// 并不替换c内容，而是增加t的内容到c中
for (var e in t) {
c[e] = t[e];
}
       
for (var e in t) for (var i = t[e], n = 0; n < i.length; n++) {
var o = i[n], a = 1 === i.length;
r(s, o, e, a);
}
},
_loadNewPack: function(t, e, i) {
var o = this, r = cc.AssetLibrary.getLibUrlNoExt(e) + ".json";
cc.loader.load({
url: r,
ignoreMaxConcurrency: !0
}, (function(r, s) {
if (r) {
cc.errorID(4916, t);
return i(r);
}
var c = o._doLoadNewPack(t, e, s);
c ? i(null, c) : i(n(t, e));
}));
},
_doLoadNewPack: function(t, e, i) {
var n = a[e];
if (n.state !== u) {
n.read(c[e], i);
n.state = u;
}
return n.retrieve(t);
},
_selectLoadedPack: function(t) {
for (var e = l, i = "", n = 0; n < t.length; n++) {
var o = t[n], r = a[o];
if (r) {
var s = r.state;
if (s === u) return o;
if (s > e) {
e = s;
i = o;
}
}
}
return e !== l ? i : t[0];
},
load: function(t, e) {
var i = t.uuid, r = s[i];
if (r) {
Array.isArray(r) && (r = this._selectLoadedPack(r));
var c = a[r];
if (c && c.state === u) {
var l = c.retrieve(i);
return l || n(i, r);
}
if (!c) {
console.log("Create unpacker %s for %s", r, i);
(c = a[r] = new o()).state = h;
}
this._loadNewPack(i, r, e);
return null;
}
}
};
0;
}), {
"../utils/misc": 152,
"./json-unpacker": 94
} ],
99: [ (function(t, e, i) {
function n(t, e) {
var i = t.id, o = e.states[i], s = t.next, c = t.pipeline;
if (!e.error && o !== r.WORKING && o !== r.ERROR) if (o === r.COMPLETE) s ? n(s, e) : c.flowOut(e); else {
e.states[i] = r.WORKING;
var a = t.handle(e, (function(t, o) {
if (t) {
e.error = t;
e.states[i] = r.ERROR;
c.flowOut(e);
} else {
o && (e.content = o);
e.states[i] = r.COMPLETE;
s ? n(s, e) : c.flowOut(e);
}
}));
if (a instanceof Error) {
e.error = a;
e.states[i] = r.ERROR;
c.flowOut(e);
} else if (void 0 !== a) {
null !== a && (e.content = a);
e.states[i] = r.COMPLETE;
s ? n(s, e) : c.flowOut(e);
}
}
}
t("../platform/js");
var o = t("./loading-items"), r = o.ItemState, s = function(t) {
this._pipes = t;
this._cache = {};
for (var e = 0; e < t.length; ++e) {
var i = t[e];
if (i.handle && i.id) {
i.pipeline = this;
i.next = e < t.length - 1 ? t[e + 1] : null;
}
}
};
s.ItemState = r;
var c = s.prototype;
c.insertPipe = function(t, e) {
if (!t.handle || !t.id || e > this._pipes.length) cc.warnID(4921); else if (this._pipes.indexOf(t) > 0) cc.warnID(4922); else {
t.pipeline = this;
var i = null;
e < this._pipes.length && (i = this._pipes[e]);
var n = null;
e > 0 && (n = this._pipes[e - 1]);
n && (n.next = t);
t.next = i;
this._pipes.splice(e, 0, t);
}
};
c.insertPipeAfter = function(t, e) {
var i = this._pipes.indexOf(t);
i < 0 || this.insertPipe(e, i + 1);
};
c.appendPipe = function(t) {
if (t.handle && t.id) {
t.pipeline = this;
t.next = null;
this._pipes.length > 0 && (this._pipes[this._pipes.length - 1].next = t);
this._pipes.push(t);
}
};
c.flowIn = function(t) {
var e, i, o = this._pipes[0];
if (o) {
for (e = 0; e < t.length; e++) {
i = t[e];
this._cache[i.id] = i;
}
for (e = 0; e < t.length; e++) n(o, i = t[e]);
} else for (e = 0; e < t.length; e++) this.flowOut(t[e]);
};
c.flowInDeps = function(t, e, i) {
return o.create(this, (function(t, e) {
i(t, e);
e.destroy();
})).append(e, t);
};
c.flowOut = function(t) {
t.error ? delete this._cache[t.id] : this._cache[t.id] || (this._cache[t.id] = t);
t.complete = !0;
o.itemComplete(t);
};
c.copyItemStates = function(t, e) {
if (e instanceof Array) for (var i = 0; i < e.length; ++i) e[i].states = t.states; else e.states = t.states;
};
c.isFlowing = function() {
return !0;
};
c.getItems = function() {
return null;
};
c.getItem = function(t) {
var e = this._cache[t];
if (!e) return e;
e.alias && (e = e.alias);
return e;
};
c.removeItem = function(t) {
var e = this._cache[t];
e && e.complete && delete this._cache[t];
return e;
};
c.clear = function() {
for (var t in this._cache) {
var e = this._cache[t];
delete this._cache[t];
if (!e.complete) {
e.error = new Error("Canceled manually");
this.flowOut(e);
}
}
};
cc.Pipeline = e.exports = s;
}), {
"../platform/js": 142,
"./loading-items": 96
} ],
100: [ (function(t, e, i) {}), {
"../platform/js": 142
} ],
101: [ (function(i, n, o) {
i("../platform/CCSys");
n.exports = function(i, n) {
var o = i.url, r = jsb.fileUtils.getStringFromFile(o);
return "string" === ("object" == (e = typeof r) ? t(r) : e) && r ? r : new Error("Download text failed: " + o);
};
}), {
"../platform/CCSys": 132,
"./utils": 102
} ],
102: [ (function(i, n, o) {
var r = /\?/;
n.exports = {
urlAppendTimestamp: function(i) {
cc.game.config.noCache && "string" === ("object" == (e = typeof i) ? t(i) : e) && (r.test(i) ? i += "&_t=" + (new Date() - 0) : i += "?_t=" + (new Date() - 0));
return i;
}
};
}), {} ],
103: [ (function(i, n, o) {
function r(t) {
return t && (t[0] && "cc.Scene" === t[0].__type__ || t[1] && "cc.Scene" === t[1].__type__ || t[0] && "cc.Prefab" === t[0].__type__);
}
function s(i, n) {
0;
var o;
if ("string" === ("object" == (e = typeof i.content) ? t(i.content) : e)) try {
o = JSON.parse(i.content);
} catch (t) {
return new Error("Uuid Loader: Parse asset [" + i.id + "] failed : " + t.stack);
} else {
if ("object" !== ("object" == (e = typeof i.content) ? t(i.content) : e)) return new Error("JSON Loader: Input item doesn't contain string content");
o = i.content;
}
var s, l = r(o);
s = l ? cc._MissingScript.safeFindClass : function(t) {
var e = c._getClassById(t);
if (e) return e;
cc.warnID(4903, t);
return Object;
};
var h, u = cc.deserialize.Details.pool.get();
try {
h = cc.deserialize(o, u, {
classFinder: s,
target: i.existingAsset,
customEnv: i
});
} catch (t) {
cc.deserialize.Details.pool.put(u);
var d = t + "\n" + t.stack;
return new Error("Uuid Loader: Deserialize asset [" + i.id + "] failed : " + d);
}
h._uuid = i.uuid;
0;
(function(t, e, i, n, o, r) {
var s, c, l, h, u, d = n.uuidList, f = e.dependKeys = [];
if (o) {
s = [];
c = [];
l = [];
for (h = 0; h < d.length; h++) {
u = d[h];
var _ = n.uuidObjList[h], p = n.uuidPropList[h], g = cc.AssetLibrary._getAssetInfoInRuntime(u);
if (g.raw) {
var y = g.url;
_[p] = y;
f.push(y);
} else {
s.push(_);
c.push(p);
l.push({
type: "uuid",
uuid: u,
deferredLoadRaw: !0
});
}
}
} else {
s = n.uuidObjList;
c = n.uuidPropList;
l = new Array(d.length);
for (h = 0; h < d.length; h++) {
u = d[h];
l[h] = {
type: "uuid",
uuid: u
};
}
}
if (n.rawProp) {
s.push(i);
c.push(n.rawProp);
l.push(e.url);
}
if (i._preloadRawFiles) {
var v = r;
r = function() {
i._preloadRawFiles((function(t) {
v(t || null, i);
}));
};
}
if (0 === l.length) {
cc.deserialize.Details.pool.put(n);
return r(null, i);
}
e.content = i;
t.flowInDeps(e, l, (function(t, e) {
var o;
for (var h in e.map) (o = e.map[h]).uuid && o.content && (o.content._uuid = o.uuid);
for (var u = 0; u < l.length; u++) {
var d = l[u].uuid, _ = l[u].url, p = s[u], g = c[u];
if (o = e.map[_]) {
var y = {
obj: p,
prop: g
};
function v(t) {
var e = t.isRawAsset ? t.rawUrl : t.content;
this.obj[this.prop] = e;
t.uuid !== i._uuid && f.indexOf(t.id) < 0 && f.push(t.id);
}
if (o.complete || o.content) o.error ? cc._throw(o.error) : v.call(y, o); else {
var m = a.getQueue(o), C = m._callbackTable[d];
C ? C.unshift(v, y) : m.addListener(d, v, y);
}
}
}
cc.deserialize.Details.pool.put(n);
r(null, i);
}));
})(this.pipeline, i, h, u, !1, n);
}
var c = i("../platform/js");
i("../platform/deserialize");
var a = i("./loading-items");
n.exports = s;
s.isSceneObj = r;
}), {
"../platform/deserialize": 137,
"../platform/js": 142,
"./loading-items": 96
} ],
104: [ (function(i, n, o) {
function r(t, e, i) {
0;
e ? t._removeComponent(e) : l.array.removeAt(t._components, i);
}
function s() {
this._activatingStack = [];
}
var c = i("./component-scheduler"), a = i("./platform/CCObject").Flags, l = i("./platform/js"), h = a.IsPreloadStarted, u = a.IsOnLoadStarted, d = a.IsOnLoadCalled, f = a.Deactivating, _ = "c.onLoad();c._objFlags|=" + d, p = cc.Class({
extends: c.LifeCycleInvoker,
add: function(t) {
this._zero.array.push(t);
},
remove: function(t) {
this._zero.fastRemove(t);
},
cancelInactive: function(t) {
c.LifeCycleInvoker.stableRemoveInactive(this._zero, t);
},
invoke: function() {
this._invoke(this._zero);
this._zero.array.length = 0;
}
}), g = c.createInvokeImpl("c.__preload();"), y = c.createInvokeImpl(_), v = new l.Pool(4);
v.get = function() {
var t = this._get() || {
preload: new p(g),
onLoad: new c.OneOffInvoker(y),
onEnable: new c.OneOffInvoker(c.invokeOnEnable)
};
t.preload._zero.i = -1;
var e = t.onLoad;
e._zero.i = -1;
e._neg.i = -1;
e._pos.i = -1;
(e = t.onEnable)._zero.i = -1;
e._neg.i = -1;
e._pos.i = -1;
return t;
};
var m = cc.Class({
ctor: s,
reset: s,
_activateNodeRecursively: function(t, e, i, n) {
if (t._objFlags & f) cc.errorID(3816, t.name); else {
t._activeInHierarchy = !0;
for (var o = t._components.length, s = 0; s < o; ++s) {
var c = t._components[s];
if (c instanceof cc.Component) this.activateComp(c, e, i, n); else {
r(t, c, s);
--s;
--o;
}
}
for (var a = 0, l = t._children.length; a < l; ++a) {
var h = t._children[a];
h._active && this._activateNodeRecursively(h, e, i, n);
}
t._onPostActivated(!0);
}
},
_deactivateNodeRecursively: function(t) {
0;
t._objFlags |= f;
t._activeInHierarchy = !1;
for (var e = t._components.length, i = 0; i < e; ++i) {
var n = t._components[i];
if (n._enabled) {
cc.director._compScheduler.disableComp(n);
if (t._activeInHierarchy) {
t._objFlags &= ~f;
return;
}
}
}
for (var o = 0, r = t._children.length; o < r; ++o) {
var s = t._children[o];
if (s._activeInHierarchy) {
this._deactivateNodeRecursively(s);
if (t._activeInHierarchy) {
t._objFlags &= ~f;
return;
}
}
}
t._onPostActivated(!1);
t._objFlags &= ~f;
},
activateNode: function(t, e) {
if (e) {
var i = v.get();
this._activatingStack.push(i);
this._activateNodeRecursively(t, i.preload, i.onLoad, i.onEnable);
i.preload.invoke();
i.onLoad.invoke();
i.onEnable.invoke();
this._activatingStack.pop();
v.put(i);
} else {
this._deactivateNodeRecursively(t);
for (var n = this._activatingStack, o = 0; o < n.length; o++) {
var r = n[o];
r.preload.cancelInactive(h);
r.onLoad.cancelInactive(u);
r.onEnable.cancelInactive();
}
}
t.emit("active-in-hierarchy-changed", t);
},
activateComp: function(i, n, o, r) {
if (!(i._objFlags & h)) {
i._objFlags |= h;
"function" === ("object" == (e = typeof i.__preload) ? t(i.__preload) : e) && (n ? n.add(i) : i.__preload());
}
if (!(i._objFlags & u)) {
i._objFlags |= u;
if (i.onLoad) if (o) o.add(i); else {
i.onLoad();
i._objFlags |= d;
} else i._objFlags |= d;
}
if (i._enabled) {
if (!i.node._activeInHierarchy) return;
cc.director._compScheduler.enableComp(i, r);
}
},
destroyComp: function(t) {
cc.director._compScheduler.disableComp(t);
t.onDestroy && t._objFlags & d && t.onDestroy();
},
resetComp: !1
});
n.exports = m;
}), {
"./component-scheduler": 40,
"./platform/CCObject": 131,
"./platform/js": 142,
"./utils/misc": 152
} ],
105: [ (function(t, e, i) {
function n() {
this.localPoint = cc.v2();
this.normalImpulse = 0;
this.tangentImpulse = 0;
}
function o() {}
var r = t("./CCPhysicsTypes").PTM_RATIO, s = t("./CCPhysicsTypes").ContactType, c = [], a = [ cc.v2(), cc.v2() ];
0;
var l = {
points: [],
separations: [],
normal: cc.v2()
}, h = [ new n(), new n() ];
0;
var u = {
type: 0,
localPoint: cc.v2(),
localNormal: cc.v2(),
points: []
}, d = {
normalImpulses: [],
tangentImpulses: []
};
o.prototype.init = function(t) {
this.colliderA = t.GetFixtureA().collider;
this.colliderB = t.GetFixtureB().collider;
this.disabled = !1;
this.disabledOnce = !1;
this._impulse = null;
this._inverted = !1;
this._b2contact = t;
t._contact = this;
};
o.prototype.reset = function() {
this.colliderA = null;
this.colliderB = null;
this.disabled = !1;
this._impulse = null;
this._b2contact._contact = null;
this._b2contact = null;
};
o.prototype.getWorldManifold = function() {
var t = l.points, e = l.separations, i = l.normal, n = cc.PhysicsUtils.getContactWorldManifoldWrapper(this._b2contact), o = n.getCount();
t.length = e.length = o;
for (var r = 0; r < o; r++) {
var s = a[r];
s.x = n.getX(r);
s.y = n.getY(r);
t[r] = s;
e[r] = n.getSeparation(r);
}
i.x = n.getNormalX();
i.y = n.getNormalY();
if (this._inverted) {
i.x *= -1;
i.y *= -1;
}
return l;
};
o.prototype.getManifold = function() {
for (var t = u.points, e = u.localNormal, i = u.localPoint, n = cc.PhysicsUtils.getContactManifoldWrapper(), o = t.length = n.getCount(), r = 0; r < o; r++) {
var s;
(s = h[r]).localPoint.x = n.getX(r);
s.localPoint.y = n.getX(r);
s.normalImpulse = n.getNormalImpulse(r);
s.tangentImpulse = n.getTangentImpulse(r);
t[r] = s;
}
e.x = n.getLocalNormalX();
e.y = n.getLocalNormalY();
i.x = n.getLocalPointX();
i.y = n.getLocalPointY();
u.type = n.getType();
if (this._inverted) {
e.x *= -1;
e.y *= -1;
}
return u;
};
o.prototype.getImpulse = function() {
var t = this._impulse;
if (!t) return null;
var e, i = d.normalImpulses, n = d.tangentImpulses;
e = t.getCount();
for (var o = 0; o < e; o++) {
i[o] = t.getNormalImpulse(o);
n[o] = t.getTangentImpulse(o);
}
n.length = i.length = e;
return d;
};
o.prototype.emit = function(t) {
var e;
switch (t) {
case s.BEGIN_CONTACT:
e = "onBeginContact";
break;

case s.END_CONTACT:
e = "onEndContact";
break;

case s.PRE_SOLVE:
e = "onPreSolve";
break;

case s.POST_SOLVE:
e = "onPostSolve";
}
var i, n, o, r, c = this.colliderA, a = this.colliderB, l = c.body, h = a.body;
if (l.enabledContactListener) {
i = l.node._components;
this._inverted = !1;
for (n = 0, o = i.length; n < o; n++) (r = i[n])[e] && r[e](this, c, a);
}
if (h.enabledContactListener) {
i = h.node._components;
this._inverted = !0;
for (n = 0, o = i.length; n < o; n++) (r = i[n])[e] && r[e](this, a, c);
}
if (this.disabled || this.disabledOnce) {
this.setEnabled(!1);
this.disabledOnce = !1;
}
};
o.get = function(t) {
var e;
(e = 0 === c.length ? new cc.PhysicsContact() : c.pop()).init(t);
return e;
};
o.put = function(t) {
var e = t._contact;
if (e) {
c.push(e);
e.reset();
}
};
var f = o.prototype;
f.setEnabled = function(t) {
this._b2contact.SetEnabled(t);
};
f.isTouching = function() {
return this._b2contact.IsTouching();
};
f.setTangentSpeed = function(t) {
this._b2contact.SetTangentSpeed(t / r);
};
f.getTangentSpeed = function() {
return this._b2contact.GetTangentSpeed() * r;
};
f.setFriction = function(t) {
this._b2contact.SetFriction(t);
};
f.getFriction = function() {
return this._b2contact.GetFriction();
};
f.resetFriction = function() {
return this._b2contact.ResetFriction();
};
f.setRestitution = function(t) {
this._b2contact.SetRestitution(t);
};
f.getRestitution = function() {
return this._b2contact.GetRestitution();
};
f.resetRestitution = function() {
return this._b2contact.ResetRestitution();
};
o.ContactType = s;
cc.PhysicsContact = e.exports = o;
}), {
"./CCPhysicsTypes": 107
} ],
106: [ (function(t, e, i) {
var n = t("./CCPhysicsTypes").ContactType, o = t("./CCPhysicsTypes").BodyType, r = t("./CCPhysicsTypes").RayCastType, s = t("./CCPhysicsTypes").PTM_RATIO, c = (t("./CCPhysicsTypes").ANGLE_TO_PHYSICS_ANGLE, 
t("./CCPhysicsTypes").PHYSICS_ANGLE_TO_ANGLE, new b2.AABB()), a = new b2.Vec2(), l = new b2.Vec2(), h = cc.Class({
mixins: [ cc.EventTarget ],
statics: {
DrawBits: b2.Draw,
PTM_RATIO: s,
VELOCITY_ITERATIONS: 10,
POSITION_ITERATIONS: 10
},
ctor: function() {
this.__instanceId = cc.ClassManager.getNewInstanceId();
this._debugDrawFlags = 0;
this._debugDrawer = null;
this._world = null;
this._bodies = [];
this._contactMap = {};
this._contactID = 0;
this._delayEvents = [];
this._accumulator = 0;
this.enabledAccumulator = !1;
},
pushDelayEvent: function(t, e, i) {
this._steping ? this._delayEvents.push({
target: t,
func: e,
args: i
}) : t[e].apply(t, i);
},
update: function(t) {
var e = this._world;
if (e && this.enabled) {
this.emit("before-step");
this._steping = !0;
var i = h.VELOCITY_ITERATIONS, n = h.POSITION_ITERATIONS;
if (this.enabledAccumulator) {
this._accumulator += t;
this._accumulator > .2 && (this._accumulator = .2);
for (;this._accumulator > 1 / 60; ) {
e.Step(1 / 60, i, n);
this._accumulator -= 1 / 60;
}
} else {
var o = 1 / cc.game.config.frameRate;
e.Step(o, i, n);
}
e.DrawDebugData();
this._steping = !1;
for (var r = this._delayEvents, s = 0, c = r.length; s < c; s++) {
var a = r[s];
a.target[a.func].apply(a.target, a.args);
}
r.length = 0;
this._syncNode();
}
},
testPoint: function(t) {
var e = a.x = t.x / s, i = a.y = t.y / s, n = .2 / s;
c.lowerBound.x = e - n;
c.lowerBound.y = i - n;
c.upperBound.x = e + n;
c.upperBound.y = i + n;
var o = this._aabbQueryCallback;
o.init(a);
this._world.QueryAABB(o, c);
var r = o.getFixture();
return r ? r.collider : null;
},
testAABB: function(t) {
c.lowerBound.x = t.xMin / s;
c.lowerBound.y = t.yMin / s;
c.upperBound.x = t.xMax / s;
c.upperBound.y = t.yMax / s;
var e = this._aabbQueryCallback;
e.init();
this._world.QueryAABB(e, c);
return e.getFixtures().map((function(t) {
return t.collider;
}));
},
rayCast: function(t, e, i) {
if (t.equals(e)) return [];
i = i || r.Closest;
a.x = t.x / s;
a.y = t.y / s;
l.x = e.x / s;
l.y = e.y / s;
var n = this._raycastQueryCallback;
n.init(i);
this._world.RayCast(n, a, l);
var o = n.getFixtures();
if (o.length > 0) {
for (var c = n.getPoints(), h = n.getNormals(), u = n.getFractions(), d = [], f = 0, _ = o.length; f < _; f++) {
var p = o[f], g = p.collider;
if (i === r.AllClosest) {
var y = d.find((function(t) {
return t.collider === g;
}));
if (y) {
if (u[f] < y.fraction) {
y.fixtureIndex = g._getFixtureIndex(p);
y.point.x = c[f].x * s;
y.point.y = c[f].y * s;
y.normal.x = h[f].x;
y.normal.y = h[f].y;
y.fraction = u[f];
}
continue;
}
}
d.push({
collider: g,
fixtureIndex: g._getFixtureIndex(p),
point: cc.v2(c[f].x * s, c[f].y * s),
normal: cc.v2(h[f]),
fraction: u[f]
});
}
return d;
}
return [];
},
syncPosition: function() {
for (var t = this._bodies, e = 0; e < t.length; e++) t[e].syncPosition();
},
syncRotation: function() {
for (var t = this._bodies, e = 0; e < t.length; e++) t[e].syncRotation();
},
attachDebugDrawToCamera: function(t) {
this._debugDrawer && t.addTarget(this._debugDrawer.getDrawer());
},
detachDebugDrawFromCamera: function(t) {
this._debugDrawer && t.removeTarget(this._debugDrawer.getDrawer());
},
_registerContactFixture: function(t) {
this._contactListener.registerContactFixture(t);
},
_unregisterContactFixture: function(t) {
this._contactListener.unregisterContactFixture(t);
},
_addBody: function(t, e) {
var i = this._world, n = t.node;
if (i && n) {
t._b2Body = i.CreateBody(e);
t._b2Body.SetUserData(n._sgNode);
t._b2Body.body = t;
this._utils.addB2Body(t._b2Body);
this._bodies.push(t);
}
},
_removeBody: function(t) {
var e = this._world;
if (e) {
t._b2Body.SetUserData(null);
t._b2Body.body = null;
this._utils.removeB2Body(t._b2Body);
e.DestroyBody(t._b2Body);
t._b2Body = null;
var i = this._bodies.indexOf(t);
-1 !== i && this._bodies.splice(i, 1);
}
},
_initCallback: function() {
if (this._world) {
if (!this._contactListener) {
var t = new cc.PhysicsContactListener();
t.setBeginContact(this._onBeginContact);
t.setEndContact(this._onEndContact);
t.setPreSolve(this._onPreSolve);
t.setPostSolve(this._onPostSolve);
this._world.SetContactListener(t);
this._contactListener = t;
this._aabbQueryCallback = new cc.PhysicsAABBQueryCallback();
this._raycastQueryCallback = new cc.PhysicsRayCastCallback();
}
} else cc.warn("Please init PhysicsManager first");
},
_init: function() {
this.enabled = !0;
this.debugDrawFlags = b2.Draw.e_shapeBit;
},
_getWorld: function() {
return this._world;
},
_syncNode: function() {
this._utils.syncNode();
for (var t = this._bodies, e = 0, i = t.length; e < i; e++) {
var n = t[e], r = n.node;
r._position.x = r._sgNode.getPositionX();
r._position.y = r._sgNode.getPositionY();
r._rotationX = r._rotationY = r._sgNode.getRotation();
n.type === o.Animated && n.resetVelocity();
}
},
_onSceneLaunched: function() {
this._debugDrawer.AddDrawerToNode(cc.director.getScene()._sgNode);
},
_onBeginContact: function(t) {
cc.PhysicsContact.get(t).emit(n.BEGIN_CONTACT);
},
_onEndContact: function(t) {
var e = t._contact;
if (e) {
e.emit(n.END_CONTACT);
cc.PhysicsContact.put(t);
}
},
_onPreSolve: function(t) {
var e = t._contact;
e && e.emit(n.PRE_SOLVE);
},
_onPostSolve: function(t, e) {
var i = t._contact;
if (i) {
i._impulse = e;
i.emit(n.POST_SOLVE);
i._impulse = null;
}
}
});
cc.js.getset(h.prototype, "enabled", (function() {
return this._enabled;
}), (function(t) {
if (t && !this._world) {
var e = new b2.World(new b2.Vec2(0, -10));
e.SetAllowSleeping(!0);
this._world = e;
this._utils = new cc.PhysicsUtils();
this._initCallback();
}
this._enabled = t;
}));
cc.js.getset(h.prototype, "debugDrawFlags", (function() {
return this._debugDrawFlags;
}), (function(t) {
if (t && !this._debugDrawFlags) {
if (!this._debugDrawer) {
this._debugDrawer = new cc.PhysicsDebugDraw(s);
this._world.SetDebugDraw(this._debugDrawer);
}
cc.director.getScene() && this._debugDrawer.AddDrawerToNode(cc.director.getScene()._sgNode);
cc.director.on(cc.Director.EVENT_AFTER_SCENE_LAUNCH, this._onSceneLaunched, this);
} else !t && this._debugDrawFlags && cc.director.off(cc.Director.EVENT_AFTER_SCENE_LAUNCH, this._onSceneLaunched, this);
this._debugDrawFlags = t;
this._debugDrawer && this._debugDrawer.SetFlags(t);
}));
cc.js.getset(h.prototype, "gravity", (function() {
if (this._world) {
var t = this._world.GetGravity();
return cc.v2(t.x * s, t.y * s);
}
return cc.v2();
}), (function(t) {
this._world && this._world.SetGravity(new b2.Vec2(t.x / s, t.y / s));
}));
cc.PhysicsManager = e.exports = h;
}), {
"./CCPhysicsTypes": 107
} ],
107: [ (function(t, e, i) {
var n = cc.Enum({
Static: 0,
Kinematic: 1,
Dynamic: 2,
Animated: 3
});
cc.RigidBodyType = n;
var o = cc.Enum({
Closest: 0,
Any: 1,
AllClosest: 2,
All: 3
});
cc.RayCastType = o;
e.exports = {
BodyType: n,
ContactType: {
BEGIN_CONTACT: "begin-contact",
END_CONTACT: "end-contact",
PRE_SOLVE: "pre-solve",
POST_SOLVE: "post-solve"
},
RayCastType: o,
PTM_RATIO: 32,
ANGLE_TO_PHYSICS_ANGLE: -Math.PI / 180,
PHYSICS_ANGLE_TO_ANGLE: -180 / Math.PI
};
}), {} ],
108: [ (function(i, n, o) {
function r(t, e) {
var i = e.length;
return e[t < 0 ? i - -t % i : t % i];
}
function s(t, e, i) {
for (var n = []; e < t; ) e += i.length;
for (;t <= e; ++t) n.push(r(t, i));
return n;
}
function c(t) {
_(t);
for (var e, i, n, o, p, y, v = [], m = cc.v2(), C = cc.v2(), T = 0, b = 0, S = 0; S < t.length; ++S) if (a(S, t)) {
i = n = 1e8;
for (var E = 0; E < t.length; ++E) {
if (h(r(S - 1, t), r(S, t), r(E, t)) && d(r(S - 1, t), r(S, t), r(E - 1, t))) {
o = g(r(S - 1, t), r(S, t), r(E, t), r(E - 1, t));
if (l(r(S + 1, t), r(S, t), o) && (e = f(r(S, t), o)) < i) {
i = e;
m = o;
T = E;
}
}
if (h(r(S + 1, t), r(S, t), r(E + 1, t)) && d(r(S + 1, t), r(S, t), r(E, t))) {
o = g(r(S + 1, t), r(S, t), r(E, t), r(E + 1, t));
if (h(r(S - 1, t), r(S, t), o) && (e = f(r(S, t), o)) < n) {
n = e;
b = E;
C = o;
}
}
}
if (T == (b + 1) % t.length) {
var x = m.add(C).div(2);
(p = s(S, b, t)).push(x);
(y = s(T, S, t)).push(x);
} else {
for (var A = 0, N = T; b < T; ) b += t.length;
for (E = T; E <= b; ++E) if (function(t, e, i) {
if (a(t, i)) {
if (u(r(t, i), r(t - 1, i), r(e, i)) && d(r(t, i), r(t + 1, i), r(e, i))) return !1;
} else if (d(r(t, i), r(t + 1, i), r(e, i)) || u(r(t, i), r(t - 1, i), r(e, i))) return !1;
if (a(e, i)) {
if (u(r(e, i), r(e - 1, i), r(t, i)) && d(r(e, i), r(e + 1, i), r(t, i))) return !1;
} else if (d(r(e, i), r(e + 1, i), r(t, i)) || u(r(e, i), r(e - 1, i), r(t, i))) return !1;
for (var n = 0; n < i.length; ++n) if ((n + 1) % i.length != t && n != t && (n + 1) % i.length != e && n != e) {
var o = cc.v2();
if (function(t, e, i, n, o) {
if (t == i || t == n || e == i || e == n) return !1;
var r = t.x, s = t.y, c = e.x, a = e.y, l = i.x, h = i.y, u = n.x, d = n.y;
if (Math.max(r, c) < Math.min(l, u) || Math.max(l, u) < Math.min(r, c)) return !1;
if (Math.max(s, a) < Math.min(h, d) || Math.max(h, d) < Math.min(s, a)) return !1;
var f = (u - l) * (s - h) - (d - h) * (r - l), _ = (c - r) * (s - h) - (a - s) * (r - l), p = (d - h) * (c - r) - (u - l) * (a - s);
if (Math.abs(p) < 1e-6) return !1;
_ /= p;
if (0 < (f /= p) && f < 1 && 0 < _ && _ < 1) {
o.x = r + f * (c - r);
o.y = s + f * (a - s);
return !0;
}
return !1;
}(r(t, i), r(e, i), r(n, i), r(n + 1, i), o)) return !1;
}
return !0;
}(S, E, t)) {
var O = 1 / (f(r(S, t), r(E, t)) + 1);
a(E, t) ? d(r(E - 1, t), r(E, t), r(S, t)) && u(r(E + 1, t), r(E, t), r(S, t)) ? O += 3 : O += 2 : O += 1;
if (O > A) {
N = E;
A = O;
}
}
p = s(S, N, t);
y = s(N, S, t);
}
return v = (v = v.concat(c(p))).concat(c(y));
}
v.push(t);
for (S = v.length - 1; S >= 0; S--) 0 == v[S].length && v.splice(S, 0);
return v;
}
function a(t, e) {
return l(t, e);
}
function l(i, n, o) {
if ("undefined" === ("object" == (e = typeof o) ? t(o) : e)) {
var s = i, c = n;
i = r(s - 1, c);
n = r(s, c);
o = r(s + 1, c);
}
return y(i, n, o) < 0;
}
function h(t, e, i) {
return y(t, e, i) > 0;
}
function u(t, e, i) {
return y(t, e, i) >= 0;
}
function d(t, e, i) {
return y(t, e, i) <= 0;
}
function f(t, e) {
var i = e.x - t.x, n = e.y - t.y;
return i * i + n * n;
}
function _(t) {
p(t) || t.reverse();
}
function p(t) {
return t.length < 3 || (function(t) {
var e, i = 0;
for (e = 0; e < t.length; e++) {
var n = (e + 1) % t.length;
i += t[e].x * t[n].y;
i -= t[e].y * t[n].x;
}
return i /= 2;
})(t) > 0;
}
function g(t, e, i, n) {
var o = cc.v2(), r = e.y - t.y, s = t.x - e.x, c = r * t.x + s * t.y, a = n.y - i.y, l = i.x - n.x, h = a * i.x + l * i.y, u = r * l - a * s;
if (!(function(t, e) {
return Math.abs(t - e) <= 1e-6;
})(u, 0)) {
o.x = (l * c - s * h) / u;
o.y = (r * h - a * c) / u;
}
return o;
}
function y(t, e, i) {
return t.x * (e.y - i.y) + e.x * (i.y - t.y) + i.x * (t.y - e.y);
}
n.exports = {
ConvexPartition: c,
ForceCounterClockWise: _,
IsCounterClockWise: p
};
}), {} ],
109: [ (function(t, e, i) {
var n = t("./CCPhysicsTypes").PTM_RATIO, o = t("./CCPhysicsTypes").ANGLE_TO_PHYSICS_ANGLE, r = t("./CCPhysicsTypes").PHYSICS_ANGLE_TO_ANGLE, s = t("./utils").getWorldRotation, c = t("./CCPhysicsTypes").BodyType, a = new b2.Vec2(), l = new b2.Vec2(), h = cc.Vec2.ZERO, u = cc.Class({
name: "cc.RigidBody",
extends: cc.Component,
editor: !1,
properties: {
_type: c.Dynamic,
_allowSleep: !0,
_gravityScale: 1,
_linearDamping: 0,
_angularDamping: 0,
_linearVelocity: cc.v2(0, 0),
_angularVelocity: 0,
_fixedRotation: !1,
enabled: {
get: function() {
return this._enabled;
},
set: function() {
cc.warnID("8200");
},
visible: !1,
override: !0
},
enabledContactListener: {
default: !1,
tooltip: !1
},
bullet: {
default: !1,
tooltip: !1
},
type: {
type: c,
tooltip: !1,
get: function() {
return this._type;
},
set: function(t) {
this._type = t;
this._b2Body && (t === c.Animated ? this._b2Body.SetType(c.Kinematic) : this._b2Body.SetType(t));
}
},
allowSleep: {
tooltip: !1,
get: function() {
return this._b2Body ? this._b2Body.IsSleepingAllowed() : this._allowSleep;
},
set: function(t) {
this._allowSleep = t;
this._b2Body && this._b2Body.SetSleepingAllowed(t);
}
},
gravityScale: {
tooltip: !1,
get: function() {
return this._gravityScale;
},
set: function(t) {
this._gravityScale = t;
this._b2Body && this._b2Body.SetGravityScale(t);
}
},
linearDamping: {
tooltip: !1,
get: function() {
return this._linearDamping;
},
set: function(t) {
this._linearDamping = t;
this._b2Body && this._b2Body.SetLinearDamping(this._linearDamping);
}
},
angularDamping: {
tooltip: !1,
get: function() {
return this._angularDamping;
},
set: function(t) {
this._angularDamping = t;
this._b2Body && this._b2Body.SetAngularDamping(t);
}
},
linearVelocity: {
tooltip: !1,
type: cc.Vec2,
get: function() {
var t = this._linearVelocity;
if (this._b2Body) {
var e = this._b2Body.GetLinearVelocity();
t.x = e.x * n;
t.y = e.y * n;
}
return t;
},
set: function(t) {
this._linearVelocity = t;
var e = this._b2Body;
if (e) {
var i = a;
i.Set(t.x / n, t.y / n);
e.SetLinearVelocity(i);
}
}
},
angularVelocity: {
tooltip: !1,
get: function() {
return this._b2Body ? this._b2Body.GetAngularVelocity() * r : this._angularVelocity;
},
set: function(t) {
this._angularVelocity = t;
this._b2Body && this._b2Body.SetAngularVelocity(t * o);
}
},
fixedRotation: {
tooltip: !1,
get: function() {
return this._fixedRotation;
},
set: function(t) {
this._fixedRotation = t;
this._b2Body && this._b2Body.SetFixedRotation(t);
}
},
awake: {
tooltip: !1,
get: function() {
return !!this._b2Body && this._b2Body.IsAwake();
},
set: function(t) {
this._b2Body && this._b2Body.SetAwake(t);
}
},
active: {
visible: !1,
get: function() {
return !!this._b2Body && this._b2Body.IsActive();
},
set: function(t) {
this._b2Body && this._b2Body.SetActive(t);
}
}
},
getLocalPoint: function(t, e) {
e = e || cc.v2();
if (this._b2Body) {
a.Set(t.x / n, t.y / n);
var i = this._b2Body.GetLocalPoint(a);
e.x = i.x * n;
e.y = i.y * n;
}
return e;
},
getWorldPoint: function(t, e) {
e = e || cc.v2();
if (this._b2Body) {
a.Set(t.x / n, t.y / n);
var i = this._b2Body.GetWorldPoint(a);
e.x = i.x * n;
e.y = i.y * n;
}
return e;
},
getWorldVector: function(t, e) {
e = e || cc.v2();
if (this._b2Body) {
a.Set(t.x / n, t.y / n);
var i = this._b2Body.GetWorldVector(a);
e.x = i.x * n;
e.y = i.y * n;
}
return e;
},
getLocalVector: function(t, e) {
e = e || cc.v2();
if (this._b2Body) {
a.Set(t.x / n, t.y / n);
var i = this._b2Body.GetLocalVector(a);
e.x = i.x * n;
e.y = i.y * n;
}
return e;
},
getWorldPosition: function(t) {
t = t || cc.v2();
if (this._b2Body) {
var e = this._b2Body.GetPosition();
t.x = e.x * n;
t.y = e.y * n;
}
return t;
},
getWorldRotation: function() {
return this._b2Body ? this._b2Body.GetAngle() * r : 0;
},
getLocalCenter: function(t) {
t = t || cc.v2();
if (this._b2Body) {
var e = this._b2Body.GetLocalCenter();
t.x = e.x * n;
t.y = e.y * n;
}
return t;
},
getWorldCenter: function(t) {
t = t || cc.v2();
if (this._b2Body) {
var e = this._b2Body.GetWorldCenter();
t.x = e.x * n;
t.y = e.y * n;
}
return t;
},
getLinearVelocityFromWorldPoint: function(t, e) {
e = e || cc.v2();
if (this._b2Body) {
a.Set(t.x / n, t.y / n);
var i = this._b2Body.GetLinearVelocityFromWorldPoint(a);
e.x = i.x * n;
e.y = i.y * n;
}
return e;
},
getMass: function() {
return this._b2Body ? this._b2Body.GetMass() : 0;
},
getInertia: function() {
return this._b2Body ? this._b2Body.GetInertia() * n * n : 0;
},
getJointList: function() {
if (!this._b2Body) return [];
for (var t = this._b2Body.GetJointList(), e = 0; e < t.length; e++) t[e] = t[e]._joint;
return t;
},
applyForce: function(t, e, i) {
if (this._b2Body) {
a.Set(t.x / n, t.y / n);
l.Set(e.x / n, e.y / n);
this._b2Body.ApplyForce(a, l, i);
}
},
applyForceToCenter: function(t, e) {
if (this._b2Body) {
a.Set(t.x / n, t.y / n);
this._b2Body.ApplyForceToCenter(a, e);
}
},
applyTorque: function(t, e) {
this._b2Body && this._b2Body.ApplyTorque(t / n, e);
},
applyLinearImpulse: function(t, e, i) {
if (this._b2Body) {
a.Set(t.x / n, t.y / n);
l.Set(e.x / n, e.y / n);
this._b2Body.ApplyLinearImpulse(a, l, i);
}
},
applyAngularImpulse: function(t, e) {
this._b2Body && this._b2Body.ApplyAngularImpulse(t / n / n, e);
},
syncPosition: function(t) {
var e = this._b2Body;
if (e) {
var i, o = this.node.convertToWorldSpaceAR(h);
(i = a).x = o.x / n;
i.y = o.y / n;
if (this.type === c.Animated && t) {
var r = e.GetPosition(), s = cc.game.config.frameRate;
i.x = (i.x - r.x) * s;
i.y = (i.y - r.y) * s;
e.SetAwake(!0);
e.SetLinearVelocity(i);
} else e.SetTransform(i, e.GetAngle());
}
},
syncRotation: function(t) {
var e = this._b2Body;
if (e) {
var i = o * s(this.node);
if (this.type === c.Animated && t) {
var n = e.GetAngle(), r = cc.game.config.frameRate;
e.SetAwake(!0);
e.SetAngularVelocity((i - n) * r);
} else e.SetTransform(e.GetPosition(), i);
}
},
resetVelocity: function() {
var t = this._b2Body;
if (t) {
var e = a;
e.Set(0, 0);
t.SetLinearVelocity(e);
t.SetAngularVelocity(0);
}
},
onEnable: function() {
this._init();
},
onDisable: function() {
this._destroy();
},
_registerNodeEvents: function() {
var t = this.node;
t.on("position-changed", this._onNodePositionChanged, this);
t.on("rotation-changed", this._onNodeRotationChanged, this);
t.on("scale-changed", this._onNodeScaleChanged, this);
},
_unregisterNodeEvents: function() {
var t = this.node;
t.off("position-changed", this._onNodePositionChanged, this);
t.off("rotation-changed", this._onNodeRotationChanged, this);
t.off("scale-changed", this._onNodeScaleChanged, this);
},
_onNodePositionChanged: function() {
this.syncPosition(!0);
},
_onNodeRotationChanged: function(t) {
this.syncRotation(!0);
},
_onNodeScaleChanged: function(t) {
if (this._b2Body) for (var e = this.getComponents(cc.PhysicsCollider), i = 0; i < e.length; i++) e[i].apply();
},
_init: function() {
cc.director.getPhysicsManager().pushDelayEvent(this, "__init", []);
},
_destroy: function() {
cc.director.getPhysicsManager().pushDelayEvent(this, "__destroy", []);
},
__init: function() {
if (!this._inited) {
this._registerNodeEvents();
var t = new b2.BodyDef();
this.type === c.Animated ? t.type = c.Kinematic : t.type = this.type;
t.allowSleep = this.allowSleep;
t.gravityScale = this.gravityScale;
t.linearDamping = this.linearDamping;
t.angularDamping = this.angularDamping;
var e = this.linearVelocity;
t.linearVelocity = new b2.Vec2(e.x / n, e.y / n);
t.angularVelocity = this.angularVelocity * o;
t.fixedRotation = this.fixedRotation;
t.bullet = this.bullet;
var i = this.node, r = i.convertToWorldSpaceAR(h);
t.position = new b2.Vec2(r.x / n, r.y / n);
t.angle = -Math.PI / 180 * s(i);
cc.director.getPhysicsManager()._addBody(this, t);
this._inited = !0;
}
},
__destroy: function() {
if (this._inited) {
cc.director.getPhysicsManager()._removeBody(this);
this._unregisterNodeEvents();
this._inited = !1;
}
},
_getBody: function() {
return this._b2Body;
}
});
cc.RigidBody = e.exports = u;
}), {
"./CCPhysicsTypes": 107,
"./utils": 125
} ],
110: [ (function(t, e, i) {
var n = t("../CCPhysicsTypes").PTM_RATIO, o = cc.Class({
name: "cc.PhysicsBoxCollider",
extends: cc.PhysicsCollider,
mixins: [ cc.Collider.Box ],
editor: {
menu: !1,
requireComponent: cc.RigidBody
},
_createShape: function(t) {
var e = Math.abs(t.x), i = Math.abs(t.y), o = this.size.width / 2 / n * e, r = this.size.height / 2 / n * i, s = this.offset.x / n * e, c = this.offset.y / n * i, a = new b2.PolygonShape();
a.SetAsBox(o, r, new b2.Vec2(s, c), 0);
return a;
}
});
cc.PhysicsBoxCollider = e.exports = o;
}), {
"../CCPhysicsTypes": 107
} ],
111: [ (function(t, e, i) {
var n = t("../CCPhysicsTypes").PTM_RATIO, o = cc.Class({
name: "cc.PhysicsChainCollider",
extends: cc.PhysicsCollider,
editor: {
menu: !1,
inspector: !1,
requireComponent: cc.RigidBody
},
properties: {
loop: !1,
points: {
default: function() {
return [ cc.v2(-50, 0), cc.v2(50, 0) ];
},
type: [ cc.Vec2 ]
},
threshold: {
default: 1,
serializable: !1,
visible: !1
}
},
_createShape: function(t) {
for (var e = new b2.ChainShape(), i = this.points, o = [], r = 0; r < i.length; r++) {
var s = i[r];
o.push(new b2.Vec2(s.x / n * t.x, s.y / n * t.y));
}
this.loop ? e.CreateLoop(o, o.length) : e.CreateChain(o, o.length);
return e;
},
resetInEditor: !1,
resetPointsByContour: !1
});
cc.PhysicsChainCollider = e.exports = o;
}), {
"../CCPhysicsTypes": 107
} ],
112: [ (function(t, e, i) {
var n = t("../CCPhysicsTypes").PTM_RATIO, o = cc.Class({
name: "cc.PhysicsCircleCollider",
extends: cc.PhysicsCollider,
mixins: [ cc.Collider.Circle ],
editor: {
menu: !1,
requireComponent: cc.RigidBody
},
_createShape: function(t) {
var e = Math.abs(t.x), i = Math.abs(t.y), o = this.offset.x / n * e, r = this.offset.y / n * i, s = new b2.CircleShape();
s.m_radius = this.radius / n * e;
s.m_p = new b2.Vec2(o, r);
return s;
}
});
cc.PhysicsCircleCollider = e.exports = o;
}), {
"../CCPhysicsTypes": 107
} ],
113: [ (function(t, e, i) {
var n = t("../CCPhysicsTypes").PTM_RATIO, o = t("../utils").getWorldScale, r = cc.Class({
name: "cc.PhysicsCollider",
extends: cc.Collider,
ctor: function() {
this._fixtures = [];
this._shapes = [];
this._inited = !1;
this._rect = cc.rect();
},
properties: {
_density: 1,
_sensor: !1,
_friction: .2,
_restitution: 0,
density: {
tooltip: !1,
get: function() {
return this._density;
},
set: function(t) {
this._density = t;
}
},
sensor: {
tooltip: !1,
get: function() {
return this._sensor;
},
set: function(t) {
this._sensor = t;
}
},
friction: {
tooltip: !1,
get: function() {
return this._friction;
},
set: function(t) {
this._friction = t;
}
},
restitution: {
tooltip: !1,
get: function() {
return this._restitution;
},
set: function(t) {
this._restitution = t;
}
},
body: {
default: null,
type: cc.RigidBody,
visible: !1
}
},
onDisable: function() {
this._destroy();
},
onEnable: function() {
this._init();
},
start: function() {
this._init();
},
_getFixtureIndex: function(t) {
return this._fixtures.indexOf(t);
},
_init: function() {
cc.director.getPhysicsManager().pushDelayEvent(this, "__init", []);
},
_destroy: function() {
cc.director.getPhysicsManager().pushDelayEvent(this, "__destroy", []);
},
__init: function() {
if (!this._inited) {
var t = this.body || this.getComponent(cc.RigidBody);
if (t) {
var e = t._getBody();
if (e) {
var i = t.node, n = o(i), r = 0 === n.x && 0 === n.y ? [] : this._createShape(n);
r instanceof Array || (r = [ r ]);
for (var s = 1 << i.groupIndex, c = 0, a = cc.game.collisionMatrix[i.groupIndex], l = 0; l < a.length; l++) a[l] && (c |= 1 << l);
for (var h = {
categoryBits: s,
maskBits: c,
groupIndex: 0
}, u = cc.director.getPhysicsManager(), d = 0; d < r.length; d++) {
var f = r[d], _ = new b2.FixtureDef();
_.density = this.density;
_.isSensor = this.sensor;
_.friction = this.friction;
_.restitution = this.restitution;
_.shape = f;
_.filter = h;
var p = e.CreateFixture(_);
p.collider = this;
t.enabledContactListener && u._registerContactFixture(p);
this._shapes.push(f);
this._fixtures.push(p);
}
this.body = t;
this._inited = !0;
}
}
}
},
__destroy: function() {
if (this._inited) {
for (var t = this._fixtures, e = this.body._getBody(), i = cc.director.getPhysicsManager(), n = t.length - 1; n >= 0; n--) {
var o = t[n];
o.collider = null;
cc.sys.isObjectValid(o) && i._unregisterContactFixture(o);
e && e.DestroyFixture(o);
}
this.body = null;
this._fixtures.length = 0;
this._shapes.length = 0;
this._inited = !1;
}
},
_createShape: function() {},
apply: function() {
this._destroy();
this._init();
},
getAABB: function() {
for (var t = 1e7, e = 1e7, i = -1e7, o = -1e7, r = this._fixtures, s = 0; s < r.length; s++) for (var c = r[s], a = c.GetShape().GetChildCount(), l = 0; l < a; l++) {
var h = c.GetAABB(l);
h.lowerBound.x < t && (t = h.lowerBound.x);
h.lowerBound.y < e && (e = h.lowerBound.y);
h.upperBound.x > i && (i = h.upperBound.x);
h.upperBound.y > o && (o = h.upperBound.y);
}
t *= n;
e *= n;
i *= n;
o *= n;
var u = this._rect;
u.x = t;
u.y = e;
u.width = i - t;
u.height = o - e;
return u;
}
});
cc.PhysicsCollider = e.exports = r;
}), {
"../CCPhysicsTypes": 107,
"../utils": 125
} ],
114: [ (function(t, e, i) {
var n = t("../CCPhysicsTypes").PTM_RATIO, o = t("../CCPolygonSeparator"), r = cc.Class({
name: "cc.PhysicsPolygonCollider",
extends: cc.PhysicsCollider,
mixins: [ cc.Collider.Polygon ],
editor: {
menu: !1,
inspector: !1,
requireComponent: cc.RigidBody
},
_createShape: function(t) {
var e = [], i = this.points;
i.length > 0 && i[0].equals(i[i.length - 1]) && (i.length -= 1);
for (var r = o.ConvexPartition(i), s = this.offset, c = 0; c < r.length; c++) {
for (var a = r[c], l = null, h = [], u = null, d = 0, f = a.length; d < f; d++) {
l || (l = new b2.PolygonShape());
var _ = a[d], p = (_.x + s.x) / n * t.x, g = (_.y + s.y) / n * t.y, y = new b2.Vec2(p, g);
h.push(y);
u || (u = y);
if (h.length === b2.maxPolygonVertices) {
l.Set(h, h.length);
e.push(l);
l = null;
d < f - 1 && (h = [ u, h[h.length - 1] ]);
}
}
if (l) {
l.Set(h, h.length);
e.push(l);
}
}
return e;
}
});
cc.PhysicsPolygonCollider = e.exports = r;
}), {
"../CCPhysicsTypes": 107,
"../CCPolygonSeparator": 108
} ],
115: [ (function(t, e, i) {
0;
t("./CCPhysicsManager");
t("./CCRigidBody");
t("./CCPhysicsContact");
t("./collider/CCPhysicsCollider");
t("./collider/CCPhysicsChainCollider");
t("./collider/CCPhysicsCircleCollider");
t("./collider/CCPhysicsBoxCollider");
t("./collider/CCPhysicsPolygonCollider");
t("./joint/CCJoint");
t("./joint/CCDistanceJoint");
t("./joint/CCRevoluteJoint");
t("./joint/CCMouseJoint");
t("./joint/CCMotorJoint");
t("./joint/CCPrismaticJoint");
t("./joint/CCWeldJoint");
t("./joint/CCWheelJoint");
t("./joint/CCRopeJoint");
0;
}), {
"../../../external/box2d/box2d": 1,
"./CCPhysicsContact": 105,
"./CCPhysicsManager": 106,
"./CCRigidBody": 109,
"./collider/CCPhysicsBoxCollider": 110,
"./collider/CCPhysicsChainCollider": 111,
"./collider/CCPhysicsCircleCollider": 112,
"./collider/CCPhysicsCollider": 113,
"./collider/CCPhysicsPolygonCollider": 114,
"./joint/CCDistanceJoint": 116,
"./joint/CCJoint": 117,
"./joint/CCMotorJoint": 118,
"./joint/CCMouseJoint": 119,
"./joint/CCPrismaticJoint": 120,
"./joint/CCRevoluteJoint": 121,
"./joint/CCRopeJoint": 122,
"./joint/CCWeldJoint": 123,
"./joint/CCWheelJoint": 124,
"./platform/CCPhysicsAABBQueryCallback": 1,
"./platform/CCPhysicsContactListner": 1,
"./platform/CCPhysicsDebugDraw": 1,
"./platform/CCPhysicsRayCastCallback": 1,
"./platform/CCPhysicsUtils": 1
} ],
116: [ (function(t, e, i) {
var n = t("../CCPhysicsTypes").PTM_RATIO, o = cc.Class({
name: "cc.DistanceJoint",
extends: cc.Joint,
editor: !1,
properties: {
_distance: 1,
_frequency: 0,
_dampingRatio: 0,
distance: {
tooltip: !1,
get: function() {
return this._distance;
},
set: function(t) {
this._distance = t;
this._joint && this._joint.SetLength(t);
}
},
frequency: {
tooltip: !1,
get: function() {
return this._frequency;
},
set: function(t) {
this._frequency = t;
this._joint && this._joint.SetFrequency(t);
}
},
dampingRatio: {
tooltip: !1,
get: function() {
return this._dampingRatio;
},
set: function(t) {
this._dampingRatio = t;
this._joint && this._joint.SetDampingRatio(t);
}
}
},
_createJointDef: function() {
var t = new b2.DistanceJointDef();
t.localAnchorA = new b2.Vec2(this.anchor.x / n, this.anchor.y / n);
t.localAnchorB = new b2.Vec2(this.connectedAnchor.x / n, this.connectedAnchor.y / n);
t.length = this.distance / n;
t.dampingRatio = this.dampingRatio;
t.frequencyHz = this.frequency;
return t;
}
});
cc.DistanceJoint = e.exports = o;
}), {
"../CCPhysicsTypes": 107
} ],
117: [ (function(t, e, i) {
var n = t("../CCPhysicsTypes").PTM_RATIO, o = cc.Class({
name: "cc.Joint",
extends: cc.Component,
editor: {
requireComponent: cc.RigidBody
},
properties: {
anchor: {
default: cc.v2(0, 0),
tooltip: !1
},
connectedAnchor: {
default: cc.v2(0, 0),
tooltip: !1
},
connectedBody: {
default: null,
type: cc.RigidBody,
tooltip: !1
},
collideConnected: {
default: !1,
tooltip: !1
}
},
onDisable: function() {
this._destroy();
},
onEnable: function() {
this._init();
},
start: function() {
this._init();
},
apply: function() {
this._destroy();
this._init();
},
getWorldAnchor: function() {
if (this._joint) {
var t = this._joint.GetAnchorA();
return cc.v2(t.x * n, t.y * n);
}
return cc.Vec2.ZERO;
},
getWorldConnectedAnchor: function() {
if (this._joint) {
var t = this._joint.GetAnchorB();
return cc.v2(t.x * n, t.y * n);
}
return cc.Vec2.ZERO;
},
getReactionForce: function(t) {
return this._joint ? this._joint.GetReactionForce(t) : 0;
},
getReactionTorque: function(t) {
return this._joint ? this._joint.GetReactionTorque(t) : 0;
},
_init: function() {
cc.director.getPhysicsManager().pushDelayEvent(this, "__init", []);
},
_destroy: function() {
cc.director.getPhysicsManager().pushDelayEvent(this, "__destroy", []);
},
__init: function() {
if (!this._inited) {
this.body = this.getComponent(cc.RigidBody);
if (this._isValid()) {
var t = cc.director.getPhysicsManager()._getWorld(), e = this._createJointDef();
if (!e) return;
e.bodyA = this.body._getBody();
e.bodyB = this.connectedBody._getBody();
e.collideConnected = this.collideConnected;
this._joint = t.CreateJoint(e);
this._joint && (this._joint._joint = this);
this._inited = !0;
}
}
},
__destroy: function() {
if (this._inited) {
this._isValid() && cc.director.getPhysicsManager()._getWorld().DestroyJoint(this._joint);
this._joint && (this._joint._joint = null);
this._joint = null;
this._inited = !1;
}
},
_createJointDef: function() {
return null;
},
_isValid: function() {
return this.body && this.body._getBody() && this.connectedBody && this.connectedBody._getBody();
}
});
cc.Joint = e.exports = o;
}), {
"../CCPhysicsTypes": 107
} ],
118: [ (function(t, e, i) {
var n = t("../CCPhysicsTypes").PTM_RATIO, o = t("../CCPhysicsTypes").ANGLE_TO_PHYSICS_ANGLE, r = cc.Class({
name: "cc.MotorJoint",
extends: cc.Joint,
editor: !1,
properties: {
_linearOffset: cc.v2(0, 0),
_angularOffset: 0,
_maxForce: 1,
_maxTorque: 1,
_correctionFactor: .3,
anchor: {
tooltip: !1,
default: cc.v2(0, 0),
override: !0,
visible: !1
},
connectedAnchor: {
tooltip: !1,
default: cc.v2(0, 0),
override: !0,
visible: !1
},
linearOffset: {
tooltip: !1,
get: function() {
return this._linearOffset;
},
set: function(t) {
this._linearOffset = t;
this._joint && this._joint.SetLinearOffset(new b2.Vec2(t.x / n, t.y / n));
}
},
angularOffset: {
tooltip: !1,
get: function() {
return this._angularOffset;
},
set: function(t) {
this._angularOffset = t;
this._joint && this._joint.SetAngularOffset(t);
}
},
maxForce: {
tooltip: !1,
get: function() {
return this._maxForce;
},
set: function(t) {
this._maxForce = t;
this._joint && this._joint.SetMaxForce(t);
}
},
maxTorque: {
tooltip: !1,
get: function() {
return this._maxTorque;
},
set: function(t) {
this._maxTorque = t;
this._joint && this._joint.SetMaxTorque(t);
}
},
correctionFactor: {
tooltip: !1,
get: function() {
return this._correctionFactor;
},
set: function(t) {
this._correctionFactor = t;
this._joint && this._joint.SetCorrectionFactor(t);
}
}
},
_createJointDef: function() {
var t = new b2.MotorJointDef();
t.linearOffset = new b2.Vec2(this.linearOffset.x / n, this.linearOffset.y / n);
t.angularOffset = this.angularOffset * o;
t.maxForce = this.maxForce;
t.maxTorque = this.maxTorque;
t.correctionFactor = this.correctionFactor;
return t;
}
});
cc.MotorJoint = e.exports = r;
}), {
"../CCPhysicsTypes": 107
} ],
119: [ (function(t, e, i) {
var n = t("../CCPhysicsTypes").PTM_RATIO, o = new b2.Vec2(), r = cc.Class({
name: "cc.MouseJoint",
extends: cc.Joint,
editor: !1,
properties: {
_target: 1,
_frequency: 5,
_dampingRatio: .7,
_maxForce: 0,
connectedBody: {
default: null,
type: cc.RigidBody,
visible: !1,
override: !0
},
collideConnected: {
default: !0,
visible: !1,
override: !0
},
anchor: {
tooltip: !1,
default: cc.v2(0, 0),
override: !0,
visible: !1
},
connectedAnchor: {
tooltip: !1,
default: cc.v2(0, 0),
override: !0,
visible: !1
},
mouseRegion: {
tooltip: !1,
default: null,
type: cc.Node
},
target: {
tooltip: !1,
visible: !1,
get: function() {
return this._target;
},
set: function(t) {
this._target = t;
if (this._joint) {
o.x = t.x / n;
o.y = t.y / n;
this._joint.SetTarget(o);
}
}
},
frequency: {
tooltip: !1,
get: function() {
return this._frequency;
},
set: function(t) {
this._frequency = t;
this._joint && this._joint.SetFrequency(t);
}
},
dampingRatio: {
tooltip: !1,
get: function() {
return this._dampingRatio;
},
set: function(t) {
this._dampingRatio = t;
this._joint && this._joint.SetDampingRatio(t);
}
},
maxForce: {
tooltip: !1,
visible: !1,
get: function() {
return this._maxForce;
},
set: function(t) {
this._maxForce = t;
this._joint && this._joint.SetMaxForce(t);
}
}
},
onLoad: function() {
var t = this.mouseRegion || this.node;
t.on(cc.Node.EventType.TOUCH_START, this.onTouchBegan, this);
t.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
t.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
},
onEnable: function() {},
start: function() {},
onTouchBegan: function(t) {
var e = cc.director.getPhysicsManager(), i = this._pressPoint = t.touch.getLocation();
cc.Camera && cc.Camera.main && (i = cc.Camera.main.getCameraToWorldPoint(i));
var n = e.testPoint(i);
if (n) {
(this.connectedBody = n.body).awake = !0;
this.maxForce = 1e3 * this.connectedBody.getMass();
this.target = i;
this._init();
}
},
onTouchMove: function(t) {
this._pressPoint = t.touch.getLocation();
},
onTouchEnd: function(t) {
this._destroy();
this._pressPoint = null;
},
_createJointDef: function() {
var t = new b2.MouseJointDef();
o.x = this.target.x / n;
o.y = this.target.y / n;
t.target = o;
t.maxForce = this.maxForce;
t.dampingRatio = this.dampingRatio;
t.frequencyHz = this.frequency;
return t;
},
update: function() {
this._pressPoint && this._isValid() && (cc.Camera && cc.Camera.main ? this.target = cc.Camera.main.getCameraToWorldPoint(this._pressPoint) : this.target = this._pressPoint);
}
});
cc.MouseJoint = e.exports = r;
}), {
"../CCPhysicsTypes": 107
} ],
120: [ (function(t, e, i) {
var n = t("../CCPhysicsTypes").PTM_RATIO, o = t("../CCPhysicsTypes").ANGLE_TO_PHYSICS_ANGLE, r = cc.Class({
name: "cc.PrismaticJoint",
extends: cc.Joint,
editor: !1,
properties: {
localAxisA: {
default: cc.v2(1, 0),
tooltip: !1
},
referenceAngle: {
default: 0,
tooltip: !1
},
enableLimit: {
default: !1,
tooltip: !1
},
enableMotor: {
default: !1,
tooltip: !1
},
lowerLimit: {
default: 0,
tooltip: !1
},
upperLimit: {
default: 0,
tooltip: !1
},
_maxMotorForce: 0,
_motorSpeed: 0,
maxMotorForce: {
tooltip: !1,
get: function() {
return this._maxMotorForce;
},
set: function(t) {
this._maxMotorForce = t;
this._joint && this._joint.SetMaxMotorForce(t);
}
},
motorSpeed: {
tooltip: !1,
get: function() {
return this._motorSpeed;
},
set: function(t) {
this._motorSpeed = t;
this._joint && this._joint.SetMotorSpeed(t);
}
}
},
_createJointDef: function() {
var t = new b2.PrismaticJointDef();
t.localAnchorA = new b2.Vec2(this.anchor.x / n, this.anchor.y / n);
t.localAnchorB = new b2.Vec2(this.connectedAnchor.x / n, this.connectedAnchor.y / n);
t.localAxisA = new b2.Vec2(this.localAxisA.x, this.localAxisA.y);
t.referenceAngle = this.referenceAngle * o;
t.enableLimit = this.enableLimit;
t.lowerTranslation = this.lowerLimit / n;
t.upperTranslation = this.upperLimit / n;
t.enableMotor = this.enableMotor;
t.maxMotorForce = this.maxMotorForce;
t.motorSpeed = this.motorSpeed;
return t;
}
});
cc.PrismaticJoint = e.exports = r;
}), {
"../CCPhysicsTypes": 107
} ],
121: [ (function(t, e, i) {
var n = t("../CCPhysicsTypes").PTM_RATIO, o = t("../CCPhysicsTypes").ANGLE_TO_PHYSICS_ANGLE, r = t("../CCPhysicsTypes").PHYSICS_ANGLE_TO_ANGLE, s = cc.Class({
name: "cc.RevoluteJoint",
extends: cc.Joint,
editor: !1,
properties: {
_maxMotorTorque: 0,
_motorSpeed: 0,
_enableLimit: !1,
_enableMotor: !1,
referenceAngle: {
default: 0,
tooltip: !1
},
lowerAngle: {
default: 0,
tooltip: !1
},
upperAngle: {
default: 0,
tooltip: !1
},
maxMotorTorque: {
tooltip: !1,
get: function() {
return this._maxMotorTorque;
},
set: function(t) {
this._maxMotorTorque = t;
this._joint && this._joint.SetMaxMotorTorque(t);
}
},
motorSpeed: {
tooltip: !1,
get: function() {
return this._motorSpeed;
},
set: function(t) {
this._motorSpeed = t;
this._joint && this._joint.SetMotorSpeed(t * o);
}
},
enableLimit: {
tooltip: !1,
get: function() {
return this._enableLimit;
},
set: function(t) {
this._enableLimit = t;
this._joint && this._joint.EnableLimit(t);
}
},
enableMotor: {
tooltip: !1,
get: function() {
return this._enableMotor;
},
set: function(t) {
this._enableMotor = t;
this._joint && this._joint.EnableMotor(t);
}
}
},
getJointAngle: function() {
return this._joint ? this._joint.GetJointAngle() * r : 0;
},
_createJointDef: function() {
var t = new b2.RevoluteJointDef();
t.localAnchorA = new b2.Vec2(this.anchor.x / n, this.anchor.y / n);
t.localAnchorB = new b2.Vec2(this.connectedAnchor.x / n, this.connectedAnchor.y / n);
t.lowerAngle = (this.upperAngle + 90) * o;
t.upperAngle = (this.lowerAngle + 90) * o;
t.maxMotorTorque = this.maxMotorTorque;
t.motorSpeed = this.motorSpeed * o;
t.enableLimit = this.enableLimit;
t.enableMotor = this.enableMotor;
t.referenceAngle = this.referenceAngle * o;
return t;
}
});
cc.RevoluteJoint = e.exports = s;
}), {
"../CCPhysicsTypes": 107
} ],
122: [ (function(t, e, i) {
var n = t("../CCPhysicsTypes").PTM_RATIO, o = cc.Class({
name: "cc.RopeJoint",
extends: cc.Joint,
editor: !1,
properties: {
_maxLength: 1,
maxLength: {
tooltip: !1,
get: function() {
return this._maxLength;
},
set: function(t) {
this._maxLength = t;
this._joint && this._joint.SetMaxLength(t);
}
}
},
_createJointDef: function() {
var t = new b2.RopeJointDef();
t.localAnchorA = new b2.Vec2(this.anchor.x / n, this.anchor.y / n);
t.localAnchorB = new b2.Vec2(this.connectedAnchor.x / n, this.connectedAnchor.y / n);
t.maxLength = this.maxLength / n;
return t;
}
});
cc.RopeJoint = e.exports = o;
}), {
"../CCPhysicsTypes": 107
} ],
123: [ (function(t, e, i) {
var n = t("../CCPhysicsTypes").PTM_RATIO, o = t("../CCPhysicsTypes").ANGLE_TO_PHYSICS_ANGLE, r = cc.Class({
name: "cc.WeldJoint",
extends: cc.Joint,
editor: !1,
properties: {
referenceAngle: {
default: 0,
tooltip: !1
},
_frequency: 0,
_dampingRatio: 0,
frequency: {
tooltip: !1,
get: function() {
return this._frequency;
},
set: function(t) {
this._frequency = t;
this._joint && this._joint.SetFrequency(t);
}
},
dampingRatio: {
tooltip: !1,
get: function() {
return this._dampingRatio;
},
set: function(t) {
this._dampingRatio = t;
this._joint && this._joint.SetDampingRatio(t);
}
}
},
_createJointDef: function() {
var t = new b2.WeldJointDef();
t.localAnchorA = new b2.Vec2(this.anchor.x / n, this.anchor.y / n);
t.localAnchorB = new b2.Vec2(this.connectedAnchor.x / n, this.connectedAnchor.y / n);
t.referenceAngle = this.referenceAngle * o;
t.frequencyHz = this.frequency;
t.dampingRatio = this.dampingRatio;
return t;
}
});
cc.WeldJoint = e.exports = r;
}), {
"../CCPhysicsTypes": 107
} ],
124: [ (function(t, e, i) {
var n = t("../CCPhysicsTypes").PTM_RATIO, o = t("../CCPhysicsTypes").ANGLE_TO_PHYSICS_ANGLE, r = cc.Class({
name: "cc.WheelJoint",
extends: cc.Joint,
editor: !1,
properties: {
_maxMotorTorque: 0,
_motorSpeed: 0,
_enableMotor: !1,
_frequency: 2,
_dampingRatio: .7,
localAxisA: {
default: cc.v2(1, 0),
tooltip: !1
},
maxMotorTorque: {
tooltip: !1,
get: function() {
return this._maxMotorTorque;
},
set: function(t) {
this._maxMotorTorque = t;
this._joint && this._joint.SetMaxMotorTorque(t);
}
},
motorSpeed: {
tooltip: !1,
get: function() {
return this._motorSpeed;
},
set: function(t) {
this._motorSpeed = t;
this._joint && this._joint.SetMotorSpeed(t * o);
}
},
enableMotor: {
tooltip: !1,
get: function() {
return this._enableMotor;
},
set: function(t) {
this._enableMotor = t;
this._joint && this._joint.EnableMotor(t);
}
},
frequency: {
tooltip: !1,
get: function() {
return this._frequency;
},
set: function(t) {
this._frequency = t;
this._joint && this._joint.SetFrequency(t);
}
},
dampingRatio: {
tooltip: !1,
get: function() {
return this._dampingRatio;
},
set: function(t) {
this._dampingRatio = t;
this._joint && this._joint.SetDampingRatio(t);
}
}
},
_createJointDef: function() {
var t = new b2.WheelJointDef();
t.localAnchorA = new b2.Vec2(this.anchor.x / n, this.anchor.y / n);
t.localAnchorB = new b2.Vec2(this.connectedAnchor.x / n, this.connectedAnchor.y / n);
t.localAxisA = new b2.Vec2(this.localAxisA.x, this.localAxisA.y);
t.maxMotorTorque = this.maxMotorTorque;
t.motorSpeed = this.motorSpeed * o;
t.enableMotor = this.enableMotor;
t.dampingRatio = this.dampingRatio;
t.frequencyHz = this.frequency;
return t;
}
});
cc.WheelJoint = e.exports = r;
}), {
"../CCPhysicsTypes": 107
} ],
125: [ (function(t, e, i) {
e.exports = {
getWorldRotation: function(t) {
for (var e = t.rotationX, i = t.parent; i.parent; ) {
e += i.rotationX;
i = i.parent;
}
return e;
},
getWorldScale: function(t) {
for (var e = t.scaleX, i = t.scaleY, n = t.parent; n.parent; ) {
e *= n.scaleX;
i *= n.scaleY;
n = n.parent;
}
return cc.v2(e, i);
},
convertToNodeRotation: function(t, e) {
e -= t.rotationX;
for (var i = t.parent; i.parent; ) {
e -= i.rotationX;
i = i.parent;
}
return e;
}
};
}), {} ],
126: [ (function(i, n, o) {
function r(t) {
return t && (t.constructor === cc.SceneAsset || t instanceof cc.Scene);
}
function s(t, e) {
this.url = t;
this.type = e;
}
var c = i("../assets/CCAsset"), a = i("./utils").callInNextTick, l = i("../load-pipeline/CCLoader"), h = i("../load-pipeline/pack-downloader"), u = i("../load-pipeline/auto-release-utils"), d = i("../utils/decode-uuid"), f = i("../load-pipeline/md5-pipe"), _ = "", p = "", g = g || {}, y = {
loadAsset: function(i, n, o) {
if ("string" !== ("object" == (e = typeof i) ? t(i) : e)) return a(n, new Error("[AssetLibrary] uuid must be string"), null);
var s = {
uuid: i,
type: "uuid"
};
o && o.existingAsset && (s.existingAsset = o.existingAsset);
l.load(s, (function(t, e) {
if (t || !e) t = new Error("[AssetLibrary] loading JSON or dependencies failed: " + (t ? t.message : "Unknown error")); else {
if (e.constructor === cc.SceneAsset) {
var o = cc.loader._getReferenceKey(i);
e.scene.dependAssets = u.getDependsRecursively(o);
}
if (r(e)) {
var s = cc.loader._getReferenceKey(i);
l.removeItem(s);
}
}
n && n(t, e);
}));
},
getLibUrlNoExt: function(t) {
t = d(t);
return _ + t.slice(0, 2) + "/" + t;
},
_queryAssetInfoInEditor: function(t, e) {
0;
},
_getAssetInfoInRuntime: function(t, e) {
e = e || {
url: null,
raw: !1
};
var i = g[t];
if (i && !cc.isChildClassOf(i.type, cc.Asset)) {
e.url = p + i.url;
e.raw = !0;
} else {
e.url = this.getLibUrlNoExt(t) + ".json";
e.raw = !1;
}
return e;
},
_getAssetUrl: function(t) {
var e = g[t];
return e ? p + e.url : null;
},
queryAssetInfo: function(t, e) {
var i = this._getAssetInfoInRuntime(t);
e(null, i.url, i.raw);
},
parseUuidInEditor: function(t) {},
loadJson: function(t, e) {
var i = "" + (new Date().getTime() + Math.random()), n = {
uuid: i,
type: "uuid",
content: t,
skips: [ l.assetLoader.id, l.downloader.id ]
};
l.load(n, (function(t, n) {
if (t) t = new Error("[AssetLibrary] loading JSON or dependencies failed: " + t.message); else {
if (n.constructor === cc.SceneAsset) {
var o = cc.loader._getReferenceKey(i);
n.scene.dependAssets = u.getDependsRecursively(o);
}
if (r(n)) {
var s = cc.loader._getReferenceKey(i);
l.removeItem(s);
}
}
n._uuid = "";
e && e(t, n);
}));
},
getAssetByUuid: function(t) {
return y._uuidToAsset[t] || null;
},
init: function(t) {
0;
var e = t.libraryPath;
e = e.replace(/\\/g, "/");
_ = cc.path.stripSep(e) + "/";
p = t.rawAssetsBase;
var i = t.md5AssetsMap;
if (i) {
var n = new f(i, _, p);
cc.loader.insertPipeAfter(cc.loader.assetLoader, n);
cc.loader.md5Pipe = n;
}
var o = l._resources;
o.reset();
var r = t.rawAssets;
if (r) {
var a = "resources/";
for (var u in r) {
var d = r[u];
for (var y in d) {
var v = d[y], m = v[0], C = v[1], T = cc.js._getClassById(C);
if (T) {
g[y] = new s(u + "/" + m, T);
if ("assets" === u && m.startsWith(a)) {
if (cc.isChildClassOf(T, c)) {
var b = cc.path.extname(m);
m = b ? m.slice(a.length, -b.length) : m.slice(a.length);
} else m = m.slice(a.length);
var S = 1 === v[2];
o.add(m, y, T, !S);
}
} else cc.error("Cannot get", C);
}
}
}
t.packedAssets && h.initPacks(t.packedAssets);
var E = t.mountPaths;
E || (E = {
assets: p + "assets",
internal: p + "internal"
});
cc.url._init(E);
}
};
y._uuidToAsset = {};
n.exports = cc.AssetLibrary = y;
}), {
"../assets/CCAsset": 18,
"../load-pipeline/CCLoader": 88,
"../load-pipeline/auto-release-utils": 91,
"../load-pipeline/md5-pipe": 97,
"../load-pipeline/pack-downloader": 98,
"../utils/decode-uuid": 150,
"./utils": 146
} ],
127: [ (function(i, n, o) {
function r(t, e) {
t.indexOf(e) < 0 && t.push(e);
}
function s(t, e) {
0;
r(t.__props__, e);
}
function c(t, e, i, n, o) {
var r = n.default;
0;
b.setClassAttr(t, i, "default", r);
s(t, i);
var c = v(t, n, e, i, !1);
if (c) {
for (var a = O, l = 0; l < c.length; l++) {
var h = c[l];
b.attr(t, i, h);
h._onAfterProp && a.push(h._onAfterProp);
}
for (var u = 0; u < a.length; u++) a[u](t, i);
O.length = 0;
c.length = 0;
}
}
function a(t, e, i, n, o) {
var r = n.get, s = n.set, c = t.prototype, a = Object.getOwnPropertyDescriptor(c, i), l = !a;
if (r) {
0;
for (var h = v(t, n, e, i, !0), u = 0; u < h.length; u++) b.attr(t, i, h[u]);
h.length = 0;
b.setClassAttr(t, i, "serializable", !1);
0;
o || m.get(c, i, r, l, l);
0;
}
if (s) {
if (!o) {
0;
m.set(c, i, s, l, l);
}
0;
}
}
function l(i) {
return "function" === ("object" == (e = typeof i) ? t(i) : e) ? i() : i;
}
function h(t, e, i) {
for (var n in e) t.hasOwnProperty(n) || i && !i(n) || Object.defineProperty(t, n, m.getPropertyDescriptor(e, n));
}
function u(t, e, i, n) {
var o, s, c = n.__ctor__, a = n.ctor, l = n.__ES6__;
if (l) {
o = [ a ];
s = a;
} else {
o = c ? [ c ] : (function(t, e, i) {
function n(t) {
return y._isCCClass(t) ? t.__ctors__ || [] : [ t ];
}
for (var o = [], s = [ t ].concat(e), c = 0; c < s.length; c++) {
var a = s[c];
if (a) for (var l = n(a), h = 0; h < l.length; h++) r(o, l[h]);
}
var u = i.ctor;
u && o.push(u);
return o;
})(e, i, n);
s = w(o, e, t, n);
m.value(s, "extend", (function(t) {
t.extends = this;
return y(t);
}), !0);
}
m.value(s, "__ctors__", o.length > 0 ? o : null, !0);
var u = s.prototype;
if (e) {
if (!l) {
m.extend(s, e);
u = s.prototype;
}
m.value(s, "$super", e);
0;
}
if (i) {
for (var d = i.length - 1; d >= 0; d--) {
var f = i[d];
h(u, f.prototype);
h(s, f, (function(t) {
return f.hasOwnProperty(t) && !0;
}));
y._isCCClass(f) && h(b.getClassAttrs(s).constructor.prototype, b.getClassAttrs(f).constructor.prototype);
}
u.constructor = s;
}
l || (u.__initProps__ = _);
m.setClassName(t, s);
return s;
}
function d(i) {
for (var n = m.getClassName(i), o = i.constructor, r = "new " + n + "(", s = 0; s < o.__props__.length; s++) {
var c = i[o.__props__[s]];
if ("object" === ("object" == (e = typeof c) ? t(c) : e)) {
cc.errorID(3641, n);
return "new " + n + "()";
}
r += c;
s < o.__props__.length - 1 && (r += ",");
}
return r + ")";
}
function f(t) {
return JSON.stringify(t).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
}
function _(i) {
var n = b.getClassAttrs(i), o = i.__props__;
if (null === o) {
N.init();
o = i.__props__;
}
var r = (function(i, n) {
for (var o = [], r = "", s = 0; s < n.length; s++) {
var c = n[s], a = c + S + "default";
if (a in i) {
var l;
l = L.test(c) ? "this." + c + "=" : "this[" + f(c) + "]=";
var h, u = i[a];
if ("object" === ("object" == (e = typeof u) ? t(u) : e) && u) h = u instanceof cc.ValueType ? d(u) : Array.isArray(u) ? "[]" : "{}"; else if ("function" === ("object" == (e = typeof u) ? t(u) : e)) {
var _ = o.length;
o.push(u);
h = "F[" + _ + "]()";
} else h = "string" === ("object" == (e = typeof u) ? t(u) : e) ? f(u) : u;
r += l = l + h + ";\n";
}
}
return 0 === o.length ? Function(r) : Function("F", "return (function(){\n" + r + "})")(o);
})(n, o);
i.prototype.__initProps__ = r;
r.call(this);
}
function p(i, n, o) {
var r = !1;
for (var s in n) if (!(A.indexOf(s) >= 0)) {
var c = n[s];
if ("function" === ("object" == (e = typeof c) ? t(c) : e)) {
var a = m.getPropertyDescriptor(i.prototype, s);
if (a) {
var l = a.value;
if ("function" === ("object" == (e = typeof l) ? t(l) : e)) {
if (I.test(c)) {
r = !0;
n[s] = (function(t, e) {
return function() {
var i = this._super;
this._super = t;
var n = e.apply(this, arguments);
this._super = i;
return n;
};
})(l, c);
}
continue;
}
}
0;
}
}
return r;
}
function g(t, e, i, n, o, r) {
t.__props__ = [];
n && n.__props__ && (t.__props__ = n.__props__.slice());
if (o) for (var s = 0; s < o.length; ++s) {
var l = o[s];
l.__props__ && (t.__props__ = t.__props__.concat(l.__props__.filter((function(e) {
return t.__props__.indexOf(e) < 0;
}))));
}
if (i) {
x.preprocessAttrs(i, e, t, r);
for (var h in i) {
var u = i[h];
"default" in u ? c(t, e, h, u) : a(t, e, h, u, r);
}
}
}
function y(i) {
var n = (i = i || {}).name, o = i.extends, r = i.mixins, s = (function(t, e, i, n) {
var o = cc.Component, r = cc._RF.peek();
if (r && cc.isChildClassOf(e, o)) {
if (cc.isChildClassOf(r.cls, o)) {
cc.errorID(3615);
return null;
}
t = t || r.script;
}
var s = u(t, e, i, n);
if (r) if (cc.isChildClassOf(e, o)) {
var c = r.uuid;
c && m._setClassId(c, s);
r.cls = s;
} else cc.isChildClassOf(r.cls, o) || (r.cls = s);
return s;
})(n, o, r, i);
n || (n = cc.js.getClassName(s));
var c = i.properties;
if ("function" === ("object" == (e = typeof c) ? t(c) : e) || o && null === o.__props__ || r && r.some((function(t) {
return null === t.__props__;
}))) {
N.push({
cls: s,
props: c,
mixins: r
});
s.__props__ = null;
} else g(s, n, c, o, i.mixins, i.__ES6__);
var a = i.statics;
if (a) {
var l;
0;
for (l in a) s[l] = a[l];
}
for (var h in i) if (!(A.indexOf(h) >= 0)) {
var d = i[h];
x.validateMethodWithProps(d, h, n, s, o) && m.value(s.prototype, h, d, !0, !0);
}
var f = i.editor;
f && cc.isChildClassOf(o, cc.Component) && cc.Component._registerEditorProps(s, f);
return s;
}
function v(i, n, o, r, s) {
function c() {
h = r + S;
return l = b.getClassAttrsProto(i);
}
function a(i, o) {
if (i in n) {
var r = n[i];
("object" == (e = typeof r) ? t(r) : e) === o && ((l || c())[h + i] = r);
}
}
var l = null, h = "";
P.length = 0;
var u = P, d = n.type;
if (d) {
var f = R[d];
if (f) u.push({
type: d,
_onAfterProp: E(f, "cc." + d)
}); else if ("Object" === d) 0; else if (d === b.ScriptUuid) {
var _ = b.ObjectType(cc.ScriptAsset);
_.type = "Script";
u.push(_);
} else "object" === ("object" == (e = typeof d) ? t(d) : e) ? C.isEnum(d) && u.push({
type: "Enum",
enumList: C.getList(d)
}) : "function" === ("object" == (e = typeof d) ? t(d) : e) && (n.url ? u.push({
type: "Object",
ctor: d,
_onAfterProp: E("String", "cc.String")
}) : u.push(n._short ? {
type: "Object",
ctor: d
} : b.ObjectType(d)));
}
n.editorOnly && ((l || c())[h + "editorOnly"] = !0);
0;
n.url && ((l || c())[h + "saveUrlAsAsset"] = !0);
!1 === n.serializable && ((l || c())[h + "serializable"] = !1);
a("formerlySerializedAs", "string");
0;
var p = n.range;
if (p) if (Array.isArray(p)) if (p.length >= 2) {
(l || c())[h + "min"] = p[0];
l[h + "max"] = p[1];
p.length > 2 && (l[h + "step"] = p[2]);
} else 0; else 0;
a("min", "number");
a("max", "number");
a("step", "number");
return u;
}
var m = i("./js"), C = i("./CCEnum"), T = i("./utils"), b = (T.isPlainEmptyObj_DEV, 
T.cloneable_DEV, i("./attribute")), S = b.DELIMETER, E = b.getTypeChecker, x = i("./preprocess-class");
i("./requiring-frame");
var A = [ "name", "extends", "mixins", "ctor", "__ctor__", "properties", "statics", "editor", "__ES6__" ], N = {
datas: null,
push: function(t) {
if (this.datas) this.datas.push(t); else {
this.datas = [ t ];
var e = this;
setTimeout((function() {
e.init();
}), 0);
}
},
init: function() {
var i = this.datas;
if (i) {
for (var n = 0; n < i.length; ++n) {
var o = i[n], r = o.cls, s = o.props;
"function" === ("object" == (e = typeof s) ? t(s) : e) && (s = s());
var c = m.getClassName(r);
s ? g(r, c, s, r.$super, o.mixins) : cc.errorID(3633, c);
}
this.datas = null;
}
}
}, O = [], L = /^[$A-Za-z_][0-9A-Za-z_$]*$/, w = function(t, e, i, n) {
var o = "return function CCClass(){\n";
e && p(e, n) && (o += "this._super=null;\n");
o += "this.__initProps__(CCClass);\n";
var r = t.length;
if (r > 0) {
var s = !(i && i.startsWith("cc."));
s && (o += "try{\n");
var c = "].apply(this,arguments);\n";
if (1 === r) o += "CCClass.__ctors__[0" + c; else {
o += "var cs=CCClass.__ctors__;\n";
for (var a = 0; a < r; a++) o += "cs[" + a + c;
}
s && (o += "}catch(e){\ncc._throw(e);\n}\n");
}
o += "}";
return Function(o)();
}, I = /xyz/.test((function() {
xyz;
})) ? /\b\._super\b/ : /.*/;
/xyz/.test((function() {
xyz;
}));
y._isCCClass = function(t) {
return t && t.hasOwnProperty("__ctors__");
};
y._fastDefine = function(t, e, i) {
m.setClassName(t, e);
for (var n = e.__props__ = Object.keys(i), o = b.getClassAttrsProto(e), r = 0; r < n.length; r++) {
var s = n[r];
o[s + S + "visible"] = !1;
o[s + S + "default"] = i[s];
}
};
y.Attr = b;
y.attr = b.attr;
cc.isChildClassOf = function(i, n) {
if (i && n) {
if ("function" !== ("object" == (e = typeof i) ? t(i) : e)) return !1;
if ("function" !== ("object" == (e = typeof n) ? t(n) : e)) {
0;
return !1;
}
if (i === n) return !0;
for (;;) {
if (!(i = m.getSuper(i))) return !1;
if (i === n) return !0;
}
}
return !1;
};
y.getInheritanceChain = function(t) {
for (var e = []; t = m.getSuper(t); ) t !== Object && e.push(t);
return e;
};
var R = {
Integer: "Number",
Float: "Number",
Boolean: "Boolean",
String: "String"
}, P = [];
cc.Class = y;
n.exports = {
isArray: function(t) {
t = l(t);
return Array.isArray(t);
},
fastDefine: y._fastDefine,
getNewValueTypeCode: d,
IDENTIFIER_RE: L,
escapeForJS: f,
getDefault: l
};
0;
}), {
"./CCEnum": 129,
"./attribute": 134,
"./js": 142,
"./preprocess-class": 143,
"./requiring-frame": 144,
"./utils": 146
} ],
128: [ (function(i, n, o) {
function r(t) {
return t;
}
function s(t, e) {
return t[e] || (t[e] = {});
}
function c(i) {
return function(n) {
return "function" === ("object" == (e = typeof n) ? t(n) : e) ? i(n) : function(t) {
return i(t, n);
};
};
}
function a(t, e, i) {
return function(t) {
0;
return function(i) {
return e(i, t);
};
};
}
function l(t) {
return a.bind(null, !1);
}
function h(t, e) {
0;
return s(t, g);
}
function u(i, n, o, r, s, c) {
var a = r && (_.getFullFormOfProperty(r) || r), l = n[o], h = p.mixin(l || {}, a || {});
if (s && (s.get || s.set)) {
s.get && (h.get = s.get);
s.set && (h.set = s.set);
} else {
0;
var u = void 0;
if (s) {
if (s.initializer) {
u = (function(i) {
var n;
try {
n = i();
} catch (t) {
return i;
}
return "object" !== ("object" == (e = typeof n) ? t(n) : e) || null === n ? n : i;
})(s.initializer);
!0;
}
} else {
var d = c.default || (c.default = (function(t) {
var e;
try {
e = new t();
} catch (t) {
return {};
}
return e;
})(i));
if (d.hasOwnProperty(o)) {
u = d[o];
!0;
}
}
0;
h.default = u;
}
n[o] = h;
}
function d(t, e, i) {
return t((function(t, n) {
var o = h(t);
if (o) {
var r = void 0 !== i ? i : n;
s(s(o, "proto"), "editor")[e] = r;
}
}), e);
}
function f(t) {
return t(r);
}
i("./CCClass");
var _ = i("./preprocess-class"), p = i("./js"), g = "__ccclassCache__", y = a.bind(null, !1), v = l(), m = l(), C = c((function(t, e) {
var i = p.getSuper(t);
i === Object && (i = null);
var n = {
name: e,
extends: i,
ctor: t,
__ES6__: !0
}, o = t[g];
if (o) {
var r = o.proto;
r && p.mixin(n, r);
t[g] = void 0;
}
return cc.Class(n);
})), T = f(c), b = d(y, "requireComponent"), S = f(v), E = d(m, "executionOrder"), x = f(c), A = f(c), N = f(v), O = f(v), L = f(v);
cc._decorator = n.exports = {
ccclass: C,
property: function(i, n, o) {
function r(t, e, i) {
var n = h(t.constructor);
if (n) {
var o = s(s(n, "proto"), "properties");
u(t.constructor, o, e, c, i, n);
}
}
var c = null;
if ("undefined" === ("object" == (e = typeof n) ? t(n) : e)) {
c = i;
return r;
}
r(i, n, o);
},
executeInEditMode: T,
requireComponent: b,
menu: S,
executionOrder: E,
disallowMultiple: x,
playOnFocus: A,
inspector: N,
icon: O,
help: L,
mixins: function() {
for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
return function(e) {
var i = h(e);
i && (s(i, "proto").mixins = t);
};
}
};
}), {
"./CCClass": 127,
"./js": 142,
"./preprocess-class": 143,
"./utils": 146
} ],
129: [ (function(i, n, o) {
function r(i) {
if ("__enums__" in i) return i;
s.value(i, "__enums__", null, !0);
for (var n = -1, o = Object.keys(i), r = 0; r < o.length; r++) {
var c = o[r], a = i[c];
if (-1 === a) {
a = ++n;
i[c] = a;
} else if ("number" === ("object" == (e = typeof a) ? t(a) : e)) n = a; else if ("string" === ("object" == (e = typeof a) ? t(a) : e) && Number.isInteger(parseFloat(c))) continue;
var l = "" + a;
if (c !== l) {
0;
s.value(i, l, c);
}
}
return i;
}
var s = i("./js");
r.isEnum = function(t) {
return t && t.hasOwnProperty("__enums__");
};
r.getList = function(t) {
if (t.__enums__) return t.__enums__;
var e = t.__enums__ = [];
for (var i in t) {
var n = t[i];
Number.isInteger(n) && e.push({
name: i,
value: n
});
}
e.sort((function(t, e) {
return t.value - e.value;
}));
return e;
};
n.exports = cc.Enum = r;
}), {
"./js": 142
} ],
130: [ (function(t, e, i) {
t("./_CCClass");
cc.KEY = {
none: 0,
back: 6,
menu: 18,
backspace: 8,
tab: 9,
enter: 13,
shift: 16,
ctrl: 17,
alt: 18,
pause: 19,
capslock: 20,
escape: 27,
space: 32,
pageup: 33,
pagedown: 34,
end: 35,
home: 36,
left: 37,
up: 38,
right: 39,
down: 40,
select: 41,
insert: 45,
Delete: 46,
0: 48,
1: 49,
2: 50,
3: 51,
4: 52,
5: 53,
6: 54,
7: 55,
8: 56,
9: 57,
a: 65,
b: 66,
c: 67,
d: 68,
e: 69,
f: 70,
g: 71,
h: 72,
i: 73,
j: 74,
k: 75,
l: 76,
m: 77,
n: 78,
o: 79,
p: 80,
q: 81,
r: 82,
s: 83,
t: 84,
u: 85,
v: 86,
w: 87,
x: 88,
y: 89,
z: 90,
num0: 96,
num1: 97,
num2: 98,
num3: 99,
num4: 100,
num5: 101,
num6: 102,
num7: 103,
num8: 104,
num9: 105,
"*": 106,
"+": 107,
"-": 109,
numdel: 110,
"/": 111,
f1: 112,
f2: 113,
f3: 114,
f4: 115,
f5: 116,
f6: 117,
f7: 118,
f8: 119,
f9: 120,
f10: 121,
f11: 122,
f12: 123,
numlock: 144,
scrolllock: 145,
";": 186,
semicolon: 186,
equal: 187,
"=": 187,
",": 188,
comma: 188,
dash: 189,
".": 190,
period: 190,
forwardslash: 191,
grave: 192,
"[": 219,
openbracket: 219,
backslash: 220,
"]": 221,
closebracket: 221,
quote: 222,
dpadLeft: 1e3,
dpadRight: 1001,
dpadUp: 1003,
dpadDown: 1004,
dpadCenter: 1005
};
cc.ImageFormat = cc.Enum({
JPG: 0,
PNG: 1,
TIFF: 2,
WEBP: 3,
PVR: 4,
ETC: 5,
S3TC: 6,
ATITC: 7,
TGA: 8,
RAWDATA: 9,
UNKNOWN: 10
});
cc.getImageFormatByData = function(t) {
return t.length > 8 && 137 === t[0] && 80 === t[1] && 78 === t[2] && 71 === t[3] && 13 === t[4] && 10 === t[5] && 26 === t[6] && 10 === t[7] ? cc.ImageFormat.PNG : t.length > 2 && (73 === t[0] && 73 === t[1] || 77 === t[0] && 77 === t[1] || 255 === t[0] && 216 === t[1]) ? cc.ImageFormat.TIFF : cc.ImageFormat.UNKNOWN;
};
cc.macro = {
INVALID_INDEX: -1,
NODE_TAG_INVALID: -1,
PI: Math.PI,
PI2: 2 * Math.PI,
FLT_MAX: parseFloat("3.402823466e+38F"),
FLT_MIN: parseFloat("1.175494351e-38F"),
RAD: Math.PI / 180,
DEG: 180 / Math.PI,
UINT_MAX: 4294967295,
REPEAT_FOREVER: 4294967295,
FLT_EPSILON: 1.192092896e-7,
ONE: 1,
ZERO: 0,
SRC_ALPHA: 770,
SRC_ALPHA_SATURATE: 776,
SRC_COLOR: 768,
DST_ALPHA: 772,
DST_COLOR: 774,
ONE_MINUS_SRC_ALPHA: 771,
ONE_MINUS_SRC_COLOR: 769,
ONE_MINUS_DST_ALPHA: 773,
ONE_MINUS_DST_COLOR: 775,
ONE_MINUS_CONSTANT_ALPHA: 32772,
ONE_MINUS_CONSTANT_COLOR: 32770,
LINEAR: 9729,
BLEND_DST: 771,
WEB_ORIENTATION_PORTRAIT: 0,
WEB_ORIENTATION_LANDSCAPE_LEFT: -90,
WEB_ORIENTATION_PORTRAIT_UPSIDE_DOWN: 180,
WEB_ORIENTATION_LANDSCAPE_RIGHT: 90,
ORIENTATION_PORTRAIT: 1,
ORIENTATION_LANDSCAPE: 2,
ORIENTATION_AUTO: 3,
DENSITYDPI_DEVICE: "device-dpi",
DENSITYDPI_HIGH: "high-dpi",
DENSITYDPI_MEDIUM: "medium-dpi",
DENSITYDPI_LOW: "low-dpi",
VERTEX_ATTRIB_FLAG_NONE: 0,
VERTEX_ATTRIB_FLAG_POSITION: 1,
VERTEX_ATTRIB_FLAG_COLOR: 2,
VERTEX_ATTRIB_FLAG_TEX_COORDS: 4,
VERTEX_ATTRIB_FLAG_POS_COLOR_TEX: 7,
GL_ALL: 0,
VERTEX_ATTRIB_POSITION: 0,
VERTEX_ATTRIB_COLOR: 1,
VERTEX_ATTRIB_TEX_COORDS: 2,
VERTEX_ATTRIB_MAX: 3,
UNIFORM_PMATRIX: 0,
UNIFORM_MVMATRIX: 1,
UNIFORM_MVPMATRIX: 2,
UNIFORM_TIME: 3,
UNIFORM_SINTIME: 4,
UNIFORM_COSTIME: 5,
UNIFORM_RANDOM01: 6,
UNIFORM_SAMPLER: 7,
UNIFORM_MAX: 8,
SHADER_POSITION_TEXTURECOLOR: "ShaderPositionTextureColor",
SHADER_SPRITE_POSITION_TEXTURECOLOR: "ShaderSpritePositionTextureColor",
SHADER_POSITION_TEXTURECOLORALPHATEST: "ShaderPositionTextureColorAlphaTest",
SHADER_SPRITE_POSITION_TEXTURECOLORALPHATEST: "ShaderSpritePositionTextureColorAlphaTest",
SHADER_POSITION_COLOR: "ShaderPositionColor",
SHADER_SPRITE_POSITION_COLOR: "ShaderSpritePositionColor",
SHADER_POSITION_TEXTURE: "ShaderPositionTexture",
SHADER_POSITION_TEXTURE_UCOLOR: "ShaderPositionTexture_uColor",
SHADER_POSITION_TEXTUREA8COLOR: "ShaderPositionTextureA8Color",
SHADER_POSITION_UCOLOR: "ShaderPosition_uColor",
SHADER_POSITION_LENGTHTEXTURECOLOR: "ShaderPositionLengthTextureColor",
UNIFORM_PMATRIX_S: "CC_PMatrix",
UNIFORM_MVMATRIX_S: "CC_MVMatrix",
UNIFORM_MVPMATRIX_S: "CC_MVPMatrix",
UNIFORM_TIME_S: "CC_Time",
UNIFORM_SINTIME_S: "CC_SinTime",
UNIFORM_COSTIME_S: "CC_CosTime",
UNIFORM_RANDOM01_S: "CC_Random01",
UNIFORM_SAMPLER_S: "CC_Texture0",
UNIFORM_ALPHA_TEST_VALUE_S: "CC_alpha_value",
ATTRIBUTE_NAME_COLOR: "a_color",
ATTRIBUTE_NAME_POSITION: "a_position",
ATTRIBUTE_NAME_TEX_COORD: "a_texCoord",
ITEM_SIZE: 32,
CURRENT_ITEM: 3233828865,
ZOOM_ACTION_TAG: 3233828866,
NORMAL_TAG: 8801,
SELECTED_TAG: 8802,
DISABLE_TAG: 8803,
FIX_ARTIFACTS_BY_STRECHING_TEXEL: 0,
FIX_ARTIFACTS_BY_STRECHING_TEXEL_TMX: 1,
DIRECTOR_STATS_POSITION: cc.p(0, 0),
DIRECTOR_FPS_INTERVAL: .5,
COCOSNODE_RENDER_SUBPIXEL: 1,
SPRITEBATCHNODE_RENDER_SUBPIXEL: 1,
AUTO_PREMULTIPLIED_ALPHA_FOR_PNG: 0,
OPTIMIZE_BLEND_FUNC_FOR_PREMULTIPLIED_ALPHA: 0,
TEXTURE_NPOT_SUPPORT: 0,
USE_LA88_LABELS: 1,
SPRITE_DEBUG_DRAW: 0,
LABELBMFONT_DEBUG_DRAW: 0,
LABELATLAS_DEBUG_DRAW: 0,
ENABLE_STACKABLE_ACTIONS: 1,
ENABLE_GL_STATE_CACHE: 1,
TOUCH_TIMEOUT: 5e3,
BATCH_VERTEX_COUNT: 2e4,
ENABLE_GC_FOR_NATIVE_OBJECTS: !0,
ENABLE_TILEDMAP_CULLING: !0,
DOWNLOAD_MAX_CONCURRENT: 64,
ENABLE_TRANSPARENT_CANVAS: !1
};
var n = !0;
cc.defineGetterSetter(cc.macro, "ENABLE_CULLING", (function() {
return n;
}), (function(t) {
n = t;
var e = cc.director.getScene();
if (e) {
e._sgNode.markCullingDirty();
cc.director.setCullingEnabled(t);
}
}));
cc.defineGetterSetter(cc.macro, "BLEND_SRC", (function() {
return cc._renderType === cc.game.RENDER_TYPE_WEBGL && cc.macro.OPTIMIZE_BLEND_FUNC_FOR_PREMULTIPLIED_ALPHA ? cc.macro.ONE : cc.macro.SRC_ALPHA;
}));
cc.lerp = function(t, e, i) {
return t + (e - t) * i;
};
cc.rand = function() {
return 16777215 * Math.random();
};
cc.randomMinus1To1 = function() {
return 2 * (Math.random() - .5);
};
cc.random0To1 = Math.random;
cc.degreesToRadians = function(t) {
return t * cc.macro.RAD;
};
cc.radiansToDegrees = function(t) {
return t * cc.macro.DEG;
};
cc.nodeDrawSetup = function(t) {
if (t._shaderProgram) {
t._shaderProgram.use();
t._shaderProgram.setUniformForModelViewAndProjectionMatrixWithMat4();
}
};
cc.incrementGLDraws = function(t) {
cc.g_NumberOfDraws += t;
};
cc.checkGLErrorDebug = function() {
if (cc._renderType === cc.game.RENDER_TYPE_WEBGL) {
var t = cc._renderContext.getError();
t && cc.logID(2400, t);
}
};
e.exports = cc.macro;
}), {
"./_CCClass": 133
} ],
131: [ (function(i, n, o) {
function r() {
this._name = "";
this._objFlags = 0;
}
function s() {
for (var t = h.length, e = 0; e < t; ++e) {
var i = h[e];
i._objFlags & l || i._destroyImmediate();
}
t === h.length ? h.length = 0 : h.splice(0, t);
0;
}
var c = i("./js"), a = i("./CCClass"), l = 1;
a.fastDefine("cc.Object", r, {
_name: "",
_objFlags: 0
});
c.value(r, "Flags", {
Destroyed: l,
DontSave: 8,
EditorOnly: 16,
Dirty: 32,
DontDestroy: 64,
PersistentMask: -4192741,
Destroying: 128,
Deactivating: 256,
IsPreloadStarted: 8192,
IsOnLoadStarted: 32768,
IsOnLoadCalled: 16384,
IsOnEnableCalled: 2048,
IsStartCalled: 65536,
IsEditorOnEnableCalled: 4096,
IsPositionLocked: 1 << 21,
IsRotationLocked: 1 << 17,
IsScaleLocked: 1 << 18,
IsAnchorLocked: 1 << 19,
IsSizeLocked: 1 << 20
});
var h = [];
c.value(r, "_deferredDestroy", s);
0;
var u = r.prototype;
c.getset(u, "name", (function() {
return this._name;
}), (function(t) {
this._name = t;
}));
c.get(u, "isValid", (function() {
return !(this._objFlags & l);
}));
0;
u.destroy = function() {
if (this._objFlags & l) {
cc.warnID(5e3);
return !1;
}
if (4 & this._objFlags) return !1;
this._objFlags |= 4;
h.push(this);
0;
return !0;
};
0;
u._destruct = function() {
var i = this.constructor, n = i.__destruct__;
if (!n) {
n = (function(i, n) {
var o, r = {};
for (o in i) if (i.hasOwnProperty(o)) switch ("object" == (e = typeof i[o]) ? t(i[o]) : e) {
case "string":
r[o] = "";
break;

case "object":
case "function":
r[o] = null;
}
if (cc.Class._isCCClass(n)) for (var s = cc.Class.Attr.getClassAttrs(n), c = n.__props__, l = 0; l < c.length; l++) {
var h = (o = c[l]) + cc.Class.Attr.DELIMETER + "default";
if (h in s) switch ("object" == (e = typeof s[h]) ? t(s[h]) : e) {
case "string":
r[o] = "";
break;

case "object":
case "function":
r[o] = null;
break;

case "undefined":
r[o] = void 0;
}
}
var u = i instanceof cc._BaseNode || i instanceof cc.Component, d = "";
for (o in r) if (!u || "_id" !== o) {
var f;
f = a.IDENTIFIER_RE.test(o) ? "o." + o + "=" : "o[" + a.escapeForJS(o) + "]=";
var _ = r[o];
"" === _ && (_ = '""');
d += f + _ + ";\n";
}
return Function("o", d);
})(this, i);
c.value(i, "__destruct__", n, !0);
}
n(this);
};
u._onPreDestroy = null;
u._destroyImmediate = function() {
if (this._objFlags & l) cc.errorID(5e3); else {
this._onPreDestroy && this._onPreDestroy();
this._destruct();
this._objFlags |= l;
}
};
0;
u._deserialize = null;
cc.isValid = function(i) {
return "object" === ("object" == (e = typeof i) ? t(i) : e) ? !(!i || i._objFlags & l) : "undefined" !== ("object" == (e = typeof i) ? t(i) : e);
};
0;
cc.Object = n.exports = r;
}), {
"./CCClass": 127,
"./js": 142
} ],
132: [ (function(i, n, o) {
if (!cc.sys) {
cc.sys = {};
var r = cc.sys;
r.LANGUAGE_ENGLISH = "en";
r.LANGUAGE_CHINESE = "zh";
r.LANGUAGE_FRENCH = "fr";
r.LANGUAGE_ITALIAN = "it";
r.LANGUAGE_GERMAN = "de";
r.LANGUAGE_SPANISH = "es";
r.LANGUAGE_DUTCH = "du";
r.LANGUAGE_RUSSIAN = "ru";
r.LANGUAGE_KOREAN = "ko";
r.LANGUAGE_JAPANESE = "ja";
r.LANGUAGE_HUNGARIAN = "hu";
r.LANGUAGE_PORTUGUESE = "pt";
r.LANGUAGE_ARABIC = "ar";
r.LANGUAGE_NORWEGIAN = "no";
r.LANGUAGE_POLISH = "pl";
r.LANGUAGE_TURKISH = "tr";
r.LANGUAGE_UKRAINIAN = "uk";
r.LANGUAGE_ROMANIAN = "ro";
r.LANGUAGE_BULGARIAN = "bg";
r.LANGUAGE_UNKNOWN = "unknown";
r.OS_IOS = "iOS";
r.OS_ANDROID = "Android";
r.OS_WINDOWS = "Windows";
r.OS_MARMALADE = "Marmalade";
r.OS_LINUX = "Linux";
r.OS_BADA = "Bada";
r.OS_BLACKBERRY = "Blackberry";
r.OS_OSX = "OS X";
r.OS_WP8 = "WP8";
r.OS_WINRT = "WINRT";
r.OS_UNKNOWN = "Unknown";
r.UNKNOWN = -1;
r.WIN32 = 0;
r.LINUX = 1;
r.MACOS = 2;
r.ANDROID = 3;
r.IPHONE = 4;
r.IPAD = 5;
r.BLACKBERRY = 6;
r.NACL = 7;
r.EMSCRIPTEN = 8;
r.TIZEN = 9;
r.WINRT = 10;
r.WP8 = 11;
r.MOBILE_BROWSER = 100;
r.DESKTOP_BROWSER = 101;
r.EDITOR_PAGE = 102;
r.EDITOR_CORE = 103;
r.WECHAT_GAME = 104;
r.BROWSER_TYPE_WECHAT = "wechat";
r.BROWSER_TYPE_WECHAT_GAME = "wechatgame";
r.BROWSER_TYPE_ANDROID = "androidbrowser";
r.BROWSER_TYPE_IE = "ie";
r.BROWSER_TYPE_QQ = "qqbrowser";
r.BROWSER_TYPE_MOBILE_QQ = "mqqbrowser";
r.BROWSER_TYPE_UC = "ucbrowser";
r.BROWSER_TYPE_360 = "360browser";
r.BROWSER_TYPE_BAIDU_APP = "baiduboxapp";
r.BROWSER_TYPE_BAIDU = "baidubrowser";
r.BROWSER_TYPE_MAXTHON = "maxthon";
r.BROWSER_TYPE_OPERA = "opera";
r.BROWSER_TYPE_OUPENG = "oupeng";
r.BROWSER_TYPE_MIUI = "miuibrowser";
r.BROWSER_TYPE_FIREFOX = "firefox";
r.BROWSER_TYPE_SAFARI = "safari";
r.BROWSER_TYPE_CHROME = "chrome";
r.BROWSER_TYPE_LIEBAO = "liebao";
r.BROWSER_TYPE_QZONE = "qzone";
r.BROWSER_TYPE_SOUGOU = "sogou";
r.BROWSER_TYPE_UNKNOWN = "unknown";
r.isNative = !1;
r.isBrowser = "object" === ("object" == (e = typeof window) ? t(window) : e) && "object" === ("object" == (e = typeof document) ? t(document) : e) && !0;
cc.create3DContext = function(t, e, i) {
if (!i) return cc.create3DContext(t, e, "webgl") || cc.create3DContext(t, e, "experimental-webgl") || cc.create3DContext(t, e, "webkit-3d") || cc.create3DContext(t, e, "moz-webgl") || null;
try {
return t.getContext(i, e);
} catch (t) {
return null;
}
};
var s = window, c = s.navigator, a = document, l = a.documentElement, h = c.userAgent.toLowerCase();
r.isMobile = /mobile|android|iphone|ipad/.test(h);
r.platform = r.isMobile ? r.MOBILE_BROWSER : r.DESKTOP_BROWSER;
var u = c.language;
u = (u = u || c.browserLanguage) ? u.split("-")[0] : r.LANGUAGE_ENGLISH;
r.language = u;
var d = !1, f = !1, _ = "", p = 0, g = /android (\d+(?:\.\d+)+)/i.exec(h) || /android (\d+(?:\.\d+)+)/i.exec(c.platform);
if (g) {
d = !0;
_ = g[1] || "";
p = parseInt(_) || 0;
}
if (g = /(iPad|iPhone|iPod).*OS ((\d+_?){2,3})/i.exec(h)) {
f = !0;
_ = g[2] || "";
p = parseInt(_) || 0;
} else if (/(iPhone|iPad|iPod)/.exec(c.platform)) {
f = !0;
_ = "";
p = 0;
}
var y = r.OS_UNKNOWN;
-1 !== c.appVersion.indexOf("Win") ? y = r.OS_WINDOWS : f ? y = r.OS_IOS : -1 !== c.appVersion.indexOf("Mac") ? y = r.OS_OSX : -1 !== c.appVersion.indexOf("X11") && -1 === c.appVersion.indexOf("Linux") ? y = r.OS_UNIX : d ? y = r.OS_ANDROID : -1 === c.appVersion.indexOf("Linux") && -1 === h.indexOf("ubuntu") || (y = r.OS_LINUX);
r.os = y;
r.osVersion = _;
r.osMainVersion = p;
r.browserType = r.BROWSER_TYPE_UNKNOWN;
(function() {
var t = /mqqbrowser|micromessenger|qq|sogou|qzone|liebao|maxthon|ucbrowser|360 aphone|360browser|baiduboxapp|baidubrowser|maxthon|mxbrowser|miuibrowser/i.exec(h);
t || (t = /qqbrowser|chrome|safari|firefox|trident|opera|opr\/|oupeng/i.exec(h));
var e = t ? t[0].toLowerCase() : r.BROWSER_TYPE_UNKNOWN;
"micromessenger" === e ? e = r.BROWSER_TYPE_WECHAT : "safari" === e && d ? e = r.BROWSER_TYPE_ANDROID : "qq" === e && h.match(/android.*applewebkit/i) ? e = r.BROWSER_TYPE_ANDROID : "trident" === e ? e = r.BROWSER_TYPE_IE : "360 aphone" === e ? e = r.BROWSER_TYPE_360 : "mxbrowser" === e ? e = r.BROWSER_TYPE_MAXTHON : "opr/" === e && (e = r.BROWSER_TYPE_OPERA);
r.browserType = e;
})();
r.browserVersion = "";
(function() {
var t = h.match(/(mqqbrowser|micromessenger|qq|sogou|qzone|liebao|maxthon|uc|360 aphone|360|baiduboxapp|baidu|maxthon|mxbrowser|miui)(mobile)?(browser)?\/?([\d.]+)/i);
t || (t = h.match(/(qqbrowser|chrome|safari|firefox|trident|opera|opr\/|oupeng)(mobile)?(browser)?\/?([\d.]+)/i));
r.browserVersion = t ? t[4] : "";
})();
var v = window.innerWidth || document.documentElement.clientWidth, m = window.innerHeight || document.documentElement.clientHeight, C = window.devicePixelRatio || 1;
r.windowPixelResolution = {
width: C * v,
height: C * m
};
r._checkWebGLRenderMode = function() {
if (cc._renderType !== cc.game.RENDER_TYPE_WEBGL) throw new Error("This feature supports WebGL render mode only.");
};
var T = document.createElement("canvas"), b = document.createElement("canvas");
r._supportCanvasNewBlendModes = (function() {
var t = T;
t.width = 1;
t.height = 1;
var e = t.getContext("2d");
e.fillStyle = "#000";
e.fillRect(0, 0, 1, 1);
e.globalCompositeOperation = "multiply";
var i = b;
i.width = 1;
i.height = 1;
var n = i.getContext("2d");
n.fillStyle = "#fff";
n.fillRect(0, 0, 1, 1);
e.drawImage(i, 0, 0, 1, 1);
return 0 === e.getImageData(0, 0, 1, 1).data[0];
})();
if (cc.sys.isMobile) {
var S = document.createElement("style");
S.type = "text/css";
document.body.appendChild(S);
S.textContent = "body,canvas,div{ -moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;-khtml-user-select: none;-webkit-tap-highlight-color:rgba(0,0,0,0);}";
}
try {
var E = r.localStorage = s.localStorage;
E.setItem("storage", "");
E.removeItem("storage");
E = null;
} catch (t) {
var x = function() {
cc.warnID(5200);
};
r.localStorage = {
getItem: x,
setItem: x,
removeItem: x,
clear: x
};
}
var A = T.toDataURL("image/webp").startsWith("data:image/webp"), N = !!T.getContext("2d"), O = !1;
if (s.WebGLRenderingContext) {
cc.create3DContext(document.createElement("CANVAS")) && (O = !0);
if (O && r.os === r.OS_ANDROID) {
var L = parseFloat(r.browserVersion);
switch (r.browserType) {
case r.BROWSER_TYPE_MOBILE_QQ:
case r.BROWSER_TYPE_BAIDU:
case r.BROWSER_TYPE_BAIDU_APP:
O = L >= 6.2;
break;

case r.BROWSER_TYPE_ANDROID:
r.osMainVersion && r.osMainVersion >= 5 && (O = !0);
break;

case r.BROWSER_TYPE_CHROME:
O = L >= 30;
break;

case r.BROWSER_TYPE_UC:
O = L > 11;

case r.BROWSER_TYPE_360:
O = !1;
}
}
}
var w = r.capabilities = {
canvas: N,
opengl: O,
webp: A
};
(void 0 !== l.ontouchstart || void 0 !== a.ontouchstart || c.msPointerEnabled) && (w.touches = !0);
void 0 !== l.onmouseup && (w.mouse = !0);
void 0 !== l.onkeyup && (w.keyboard = !0);
(s.DeviceMotionEvent || s.DeviceOrientationEvent) && (w.accelerometer = !0);
var I;
(function() {
r.browserVersion;
var t = !!(window.AudioContext || window.webkitAudioContext || window.mozAudioContext);
I = {
ONLY_ONE: !1,
WEB_AUDIO: t,
DELAY_CREATE_CTX: !1
};
r.os === r.OS_IOS && (I.USE_LOADER_EVENT = "loadedmetadata");
if (r.browserType === r.BROWSER_TYPE_FIREFOX) {
I.DELAY_CREATE_CTX = !0;
I.USE_LOADER_EVENT = "canplay";
}
r.os === r.OS_ANDROID && r.browserType === r.BROWSER_TYPE_UC && (I.ONE_SOURCE = !0);
!1;
})();
try {
if (I.WEB_AUDIO) {
I.context = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext)();
I.DELAY_CREATE_CTX && setTimeout((function() {
I.context = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext)();
}), 0);
}
} catch (t) {
I.WEB_AUDIO = !1;
cc.logID(5201);
}
I.format = (function() {
var t = [], e = document.createElement("audio");
if (e.canPlayType) {
e.canPlayType('audio/ogg; codecs="vorbis"') && t.push(".ogg");
e.canPlayType("audio/mpeg") && t.push(".mp3");
e.canPlayType('audio/wav; codecs="1"') && t.push(".wav");
e.canPlayType("audio/mp4") && t.push(".mp4");
e.canPlayType("audio/x-m4a") && t.push(".m4a");
}
return t;
})();
r.__audioSupport = I;
r.garbageCollect = function() {};
r.dumpRoot = function() {};
r.restartVM = function() {};
r.cleanScript = function(t) {};
r.isObjectValid = function(t) {
return !!t;
};
r.dump = function() {
var t = "";
t += "isMobile : " + this.isMobile + "\r\n";
t += "language : " + this.language + "\r\n";
t += "browserType : " + this.browserType + "\r\n";
t += "browserVersion : " + this.browserVersion + "\r\n";
t += "capabilities : " + JSON.stringify(this.capabilities) + "\r\n";
t += "os : " + this.os + "\r\n";
t += "osVersion : " + this.osVersion + "\r\n";
t += "platform : " + this.platform + "\r\n";
t += "Using " + (cc._renderType === cc.game.RENDER_TYPE_WEBGL ? "WEBGL" : "CANVAS") + " renderer.\r\n";
cc.log(t);
};
r.openURL = function(t) {
window.open(t);
};
r.now = function() {
return Date.now ? Date.now() : +new Date();
};
n.exports = r;
}
}), {} ],
133: [ (function(i, n, o) {
var r = cc.ClassManager = {
instanceId: 0 | 998 * Math.random(),
getNewInstanceId: function() {
return this.instanceId++;
}
}, s = /\b_super\b/, c = function() {};
c.extend = function(i) {
var n, o = this.prototype, a = Object.create(o), l = {
writable: !0,
enumerable: !1,
configurable: !0
};
if (cc.game && cc.game.config && cc.game.config[cc.game.CONFIG_KEY.exposeClassName]) {
var h = "return (function " + (i._className || "Class") + "(arg0,arg1,arg2,arg3,arg4) {\nthis.__instanceId = cc.ClassManager.getNewInstanceId();\nif (this.ctor) {\nswitch (arguments.length) {\ncase 0: this.ctor(); break;\ncase 1: this.ctor(arg0); break;\ncase 2: this.ctor(arg0,arg1); break;\ncase 3: this.ctor(arg0,arg1,arg2); break;\ncase 4: this.ctor(arg0,arg1,arg2,arg3); break;\ncase 5: this.ctor(arg0,arg1,arg2,arg3,arg4); break;\ndefault: this.ctor.apply(this, arguments);\n}\n}\n});";
n = Function(h)();
} else n = function(t, e, i, n, o) {
this.__instanceId = r.getNewInstanceId();
if (this.ctor) switch (arguments.length) {
case 0:
this.ctor();
break;

case 1:
this.ctor(t);
break;

case 2:
this.ctor(t, e);
break;

case 3:
this.ctor(t, e, i);
break;

case 4:
this.ctor(t, e, i, n);
break;

case 5:
this.ctor(t, e, i, n, o);
break;

default:
this.ctor.apply(this, arguments);
}
};
n.prototype = a;
l.value = n;
Object.defineProperty(a, "constructor", l);
for (var u in i) {
var d = "function" === ("object" == (e = typeof i[u]) ? t(i[u]) : e);
if (d && "function" === ("object" == (e = typeof o[u]) ? t(o[u]) : e) && s.test(i[u])) {
l.value = (function(t, e) {
return function() {
var i = this._super;
this._super = o[t];
var n = e.apply(this, arguments);
this._super = i;
return n;
};
})(u, i[u]);
Object.defineProperty(a, u, l);
} else if (d) {
l.value = i[u];
Object.defineProperty(a, u, l);
} else a[u] = i[u];
}
n.extend = c.extend;
n.implement = function(t) {
for (var e in t) a[e] = t[e];
};
return n;
};
cc.defineGetterSetter = function(t, e, i, n, o, r) {
if (t.__defineGetter__) {
i && t.__defineGetter__(e, i);
n && t.__defineSetter__(e, n);
} else {
if (!Object.defineProperty) throw new Error("browser does not support getters");
var s = {
configurable: !0
};
i && (s.get = i);
n && (s.set = n);
Object.defineProperty(t, e, s);
}
};
cc.clone = function(i) {
var n = i.constructor ? new i.constructor() : {};
for (var o in i) {
var r = i[o];
"object" !== ("object" == (e = typeof r) ? t(r) : e) || !r || r instanceof _ccsg.Node ? n[o] = r : n[o] = cc.clone(r);
}
return n;
};
cc._Class = n.exports = c;
}), {} ],
134: [ (function(i, n, o) {
function r(t, e, i) {
var n;
n = function() {};
i && h.extend(n, i.constructor);
var o = new n();
h.value(t, "__attrs__", o);
return o;
}
function s(i, n, o) {
var s, a, l;
if ("function" === ("object" == (e = typeof i) ? t(i) : e)) a = (s = c(i)).constructor.prototype; else {
var h = i;
if (!(s = h.__attrs__)) {
s = r(h, 0, c(i = h.constructor));
}
a = s;
}
if ("undefined" === ("object" == (e = typeof o) ? t(o) : e)) {
var d = n + u, f = {};
for (l in s) l.startsWith(d) && (f[l.slice(d.length)] = s[l]);
return f;
}
if ("object" === ("object" == (e = typeof o) ? t(o) : e)) for (l in o) 95 !== l.charCodeAt(0) && (a[n + u + l] = o[l]); else 0;
}
function c(t) {
return t.hasOwnProperty("__attrs__") && t.__attrs__ || (function(t) {
for (var e, i = cc.Class.getInheritanceChain(t), n = i.length - 1; n >= 0; n--) {
var o = i[n];
o.hasOwnProperty("__attrs__") && o.__attrs__ || r(o, 0, (e = i[n + 1]) && e.__attrs__);
}
r(t, 0, (e = i[0]) && e.__attrs__);
return t.__attrs__;
})(t);
}
function a(t) {
return c(t).constructor.prototype;
}
function l(t, e) {
0;
}
var h = i("./js"), u = (i("./utils").isPlainEmptyObj_DEV, "$_$");
cc.Integer = "Integer";
cc.Float = "Float";
0;
cc.Boolean = "Boolean";
cc.String = "String";
n.exports = {
attr: s,
getClassAttrs: c,
getClassAttrsProto: a,
setClassAttr: function(t, e, i, n) {
a(t)[e + u + i] = n;
},
DELIMETER: u,
getTypeChecker: l,
ObjectType: function(t) {
return {
type: "Object",
ctor: t,
_onAfterProp: !1
};
},
ScriptUuid: {}
};
}), {
"./CCClass": 127,
"./js": 142,
"./utils": 146
} ],
135: [ (function(i, n, o) {
function r() {
this.callbacks = [];
this.targets = [];
this.isInvoking = !1;
this.containCanceled = !1;
}
function s() {
this._callbackTable = c.createMap(!0);
}
var c = i("./js"), a = c.array.fastRemoveAt, l = r.prototype;
l.removeBy = function(t, e) {
for (var i = this.callbacks, n = this.targets, o = 0; o < t.length; ++o) if (t[o] === e) {
a(i, o);
a(n, o);
--o;
}
};
l.cancel = function(t) {
this.callbacks[t] = this.targets[t] = null;
this.containCanceled = !0;
};
l.cancelAll = function() {
for (var t = this.callbacks, e = this.targets, i = 0; i < t.length; i++) t[i] = e[i] = null;
this.containCanceled = !0;
};
l.purgeCanceled = function() {
this.removeBy(this.callbacks, null);
this.containCanceled = !1;
};
var h = new c.Pool(function(t) {
t.callbacks.length = 0;
t.targets.length = 0;
t.isInvoking = !1;
t.containCanceled = !1;
}, 16);
h.get = function() {
return this._get() || new r();
};
(l = s.prototype).add = function(t, e, i) {
var n = this._callbackTable[t];
n || (n = this._callbackTable[t] = h.get());
n.callbacks.push(e);
n.targets.push(i || null);
};
l.has = function(t, e, i) {
var n = this._callbackTable[t];
if (!n) return !1;
var o = n.callbacks;
if (!e) {
for (var r = 0; r < o.length; r++) if (o[r]) return !0;
return !1;
}
i = i || null;
for (var s = n.targets, c = 0; c < o.length; ++c) if (o[c] === e && s[c] === i) return !0;
return !1;
};
l.removeAll = function(i) {
if ("string" === ("object" == (e = typeof i) ? t(i) : e)) {
var n = this._callbackTable[i];
if (n) if (n.isInvoking) n.cancelAll(); else {
h.put(n);
delete this._callbackTable[i];
}
} else if (i) for (var o in this._callbackTable) {
var r = this._callbackTable[o];
if (r.isInvoking) for (var s = r.targets, c = 0; c < s.length; ++c) s[c] === i && r.cancel(c); else r.removeBy(r.targets, i);
}
};
l.remove = function(t, e, i) {
var n = this._callbackTable[t];
if (n) {
i = i || null;
for (var o = n.callbacks, r = n.targets, s = 0; s < o.length; ++s) if (o[s] === e && r[s] === i) {
if (n.isInvoking) n.cancel(s); else {
a(o, s);
a(r, s);
}
break;
}
}
};
var u = function() {
s.call(this);
};
c.extend(u, s);
0;
u.prototype.invoke = function(t, e, i, n, o, r) {
var s = this._callbackTable[t];
if (s) {
var c = !s.isInvoking;
s.isInvoking = !0;
for (var a = s.callbacks, l = s.targets, h = 0, u = a.length; h < u; ++h) {
var d = a[h];
if (d) {
var f = l[h];
f ? d.call(f, e, i, n, o, r) : d(e, i, n, o, r);
}
}
if (c) {
s.isInvoking = !1;
s.containCanceled && s.purgeCanceled();
}
}
};
u.CallbacksHandler = s;
n.exports = u;
}), {
"./js": 142
} ],
136: [ (function(t, e, i) {
function n(t, e) {
for (var i = 0; i < e.length; i++) {
var o = e[i];
Array.isArray(o) ? n(t, o) : t.push(o);
}
}
e.exports = {
flattenCodeArray: function(t) {
var e = [];
n(e, t);
return e.join("");
}
};
}), {} ],
137: [ (function(i, n, o) {
var r = i("./js"), s = (i("./CCObject"), i("./attribute")), c = i("./CCClass"), a = i("../utils/misc"), l = function() {
this.uuidList = [];
this.uuidObjList = [];
this.uuidPropList = [];
this.rawProp = "";
};
l.prototype.reset = function() {
this.uuidList.length = 0;
this.uuidObjList.length = 0;
this.uuidPropList.length = 0;
this.rawProp = "";
};
0;
l.prototype.getUuidOf = function(t, e) {
for (var i = 0; i < this.uuidObjList.length; i++) if (this.uuidObjList[i] === t && this.uuidPropList[i] === e) return this.uuidList[i];
return "";
};
l.prototype.push = function(t, e, i) {
this.uuidList.push(i);
this.uuidObjList.push(t);
this.uuidPropList.push(e);
};
(l.pool = new r.Pool(function(t) {
t.reset();
}, 10)).get = function() {
return this._get() || new l();
};
var h = (function() {
function i(t, e, i, n, o) {
this.result = t;
this.customEnv = n;
this.deserializedList = [];
this.deserializedData = null;
this._classFinder = i;
0;
this._idList = [];
this._idObjList = [];
this._idPropList = [];
}
function n(t, e, i, n, o) {
var s;
if (n.hasOwnProperty("__deserialize__")) s = n.__deserialize__; else {
s = h(t, n);
r.value(n, "__deserialize__", s, !0);
}
s(t, e, i, n, o);
0;
}
var o = i.prototype;
o.deserialize = function(t) {
if (Array.isArray(t)) {
var e = t, i = e.length;
this.deserializedList.length = i;
for (var n = 0; n < i; n++) if (e[n]) {
this.deserializedList[n] = this._deserializeObject(e[n]);
}
this.deserializedData = i > 0 ? this.deserializedList[0] : [];
} else {
this.deserializedList.length = 1;
this.deserializedData = t ? this._deserializeObject(t) : null;
this.deserializedList[0] = this.deserializedData;
}
(function(t) {
var e, i, n, o = t.deserializedList, r = t._idPropList, s = t._idList, c = t._idObjList;
t._classFinder && t._classFinder.onDereferenced;
for (e = 0; e < s.length; e++) {
i = r[e];
n = s[e];
c[e][i] = o[n];
}
})(this);
return this.deserializedData;
};
o._deserializeObject = function(i, o, s, c) {
var a, l = null, h = null, u = i.__type__;
if (u) {
if (!(h = this._classFinder(u, i, s, c))) {
this._classFinder === r._getClassById && cc.deserialize.reportMissingClass(u);
return null;
}
if ((l = new h())._deserialize) {
l._deserialize(i.content, this);
return l;
}
cc.Class._isCCClass(h) ? n(this, l, i, h, o) : this._deserializeTypedObject(l, i, h);
} else if (Array.isArray(i)) {
l = new Array(i.length);
for (var d = 0; d < i.length; d++) {
a = i[d];
"object" === ("object" == (e = typeof a) ? t(a) : e) && a ? this._deserializeObjField(l, a, "" + d) : l[d] = a;
}
} else {
l = {};
this._deserializePrimitiveObject(l, i);
}
return l;
};
o._deserializeObjField = function(i, n, o, r) {
var s = n.__id__;
if ("undefined" === ("object" == (e = typeof s) ? t(s) : e)) {
var c = n.__uuid__;
if (c) {
this.result.uuidList.push(c);
this.result.uuidObjList.push(i);
this.result.uuidPropList.push(o);
} else i[o] = this._deserializeObject(n);
} else {
var a = this.deserializedList[s];
if (a) i[o] = a; else {
this._idList.push(s);
this._idObjList.push(i);
this._idPropList.push(o);
}
}
};
o._deserializePrimitiveObject = function(i, n) {
for (var o in n) if (n.hasOwnProperty(o)) {
var r = n[o];
"object" !== ("object" == (e = typeof r) ? t(r) : e) ? "__type__" !== o && (i[o] = r) : r ? this._deserializeObjField(i, r, o) : i[o] = null;
}
};
o._deserializeTypedObject = function(i, n, o) {
if (o !== cc.Vec2) if (o !== cc.Color) if (o !== cc.Size) {
var r = o.__props__;
r || (r = Object.keys(i));
for (var s = 0; s < r.length; s++) {
var c = r[s], a = n[c];
"undefined" !== ("object" == (e = typeof a) ? t(a) : e) && n.hasOwnProperty(c) && ("object" !== ("object" == (e = typeof a) ? t(a) : e) ? i[c] = a : a ? this._deserializeObjField(i, a, c) : i[c] = null);
}
} else {
i.width = n.width || 0;
i.height = n.height || 0;
} else {
i.r = n.r || 0;
i.g = n.g || 0;
i.b = n.b || 0;
var l = n.a;
i.a = void 0 === l ? 255 : l;
} else {
i.x = n.x || 0;
i.y = n.y || 0;
}
};
var l = function(t, e, i, n, o) {
if (e instanceof cc.ValueType) {
o || t.push("if(prop){");
var s = r.getClassName(e);
t.push("s._deserializeTypedObject(o" + i + ",prop," + s + ");");
o || t.push("}else o" + i + "=null;");
} else {
t.push("if(prop){");
t.push("s._deserializeObjField(o,prop," + n + ");");
t.push("}else o" + i + "=null;");
}
}, h = function(i, n) {
for (var o = s.DELIMETER + "type", h = s.DELIMETER + "rawType", u = (s.DELIMETER, 
s.DELIMETER + "serializable"), d = s.DELIMETER + "default", f = s.DELIMETER + "saveUrlAsAsset", _ = s.DELIMETER + "formerlySerializedAs", p = s.getClassAttrs(n), g = n.__props__, y = [ "var prop;" ], v = a.BUILTIN_CLASSID_RE.test(r._getClassId(n)), m = 0; m < g.length; m++) {
var C, T = g[m];
if (p[T + h]) {
C = c.IDENTIFIER_RE.test(T) ? '"' + T + '"' : c.escapeForJS(T);
y.push('if(s.result.rawProp)\ncc.error("not support multi raw object in a file");');
y.push("s.result.rawProp=" + C + ";");
} else {
if (!1 === p[T + u]) continue;
var b;
if (c.IDENTIFIER_RE.test(T)) {
C = '"' + T + '"';
b = "." + T;
} else b = "[" + (C = c.escapeForJS(T)) + "]";
var S = b;
if (p[T + _]) {
var E = p[T + _];
S = c.IDENTIFIER_RE.test(E) ? "." + E : "[" + c.escapeForJS(E) + "]";
}
y.push("prop=d" + S + ";");
y.push('if(typeof (prop)!=="undefined"){');
var x = c.getDefault(p[T + d]);
if (v) {
var A, N = p[T + o];
if (void 0 === x && N) A = N === cc.String || N === cc.Integer || N === cc.Float || N === cc.Boolean; else {
var O = "object" == (e = typeof x) ? t(x) : e;
A = "string" === O && !p[T + f] || "number" === O || "boolean" === O;
}
A ? y.push("o" + b + "=prop;") : l(y, x, b, C, !0);
} else {
y.push('if(typeof (prop)!=="object"){o' + b + "=prop;}else{");
l(y, x, b, C, !1);
y.push("}");
}
y.push("}");
}
}
if ("_$erialized" === g[g.length - 1]) {
y.push("o._$erialized=JSON.parse(JSON.stringify(d));");
y.push("s._deserializePrimitiveObject(o._$erialized,d);");
}
return Function("s", "o", "d", "k", "t", y.join(""));
};
(i.pool = new r.Pool(function(t) {
t.result = null;
t.customEnv = null;
t.deserializedList.length = 0;
t.deserializedData = null;
t._classFinder = null;
0;
t._idList.length = 0;
t._idObjList.length = 0;
t._idPropList.length = 0;
}, 1)).get = function(t, e, n, o, r) {
var s = this._get();
if (s) {
s.result = t;
s.customEnv = o;
s._classFinder = n;
0;
return s;
}
return new i(t, e, n, o, r);
};
return i;
})();
cc.deserialize = function(i, n, o) {
var s = (o = o || {}).classFinder || r._getClassById, c = o.createAssetRefs || cc.sys.platform === cc.sys.EDITOR_CORE, a = o.customEnv, u = o.ignoreEditorOnly;
0;
"string" === ("object" == (e = typeof i) ? t(i) : e) && (i = JSON.parse(i));
var d = !n;
n = n || l.pool.get();
var f = h.pool.get(n, !1, s, a, u);
cc.game._isCloning = !0;
var _ = f.deserialize(i);
cc.game._isCloning = !1;
h.pool.put(f);
c && n.assignAssetsBy(Editor.serialize.asAsset);
d && l.pool.put(n);
return _;
};
cc.deserialize.Details = l;
cc.deserialize.reportMissingClass = function(t) {
cc.warnID(5302, t);
};
}), {
"../utils/misc": 152,
"./CCClass": 127,
"./CCObject": 131,
"./attribute": 134,
"./js": 142
} ],
138: [ (function(t, e, i) {
function n(t) {
this.id = 0 | 998 * Math.random();
this.prefix = t ? t + o : "";
}
var o = ".";
n.prototype.getNewId = function() {
return this.prefix + ++this.id;
};
n.global = new n("global");
e.exports = n;
}), {} ],
139: [ (function(t, e, i) {
t("./js");
t("./CCClass");
t("./CCClassDecorator");
t("./CCEnum");
t("./CCObject");
t("./callbacks-invoker");
t("./url");
t("./deserialize");
t("./instantiate");
t("./instantiate-jit");
t("./requiring-frame");
t("./CCSys");
t("./CCMacro");
t("./CCAssetLibrary");
0;
}), {
"./CCAssetLibrary": 126,
"./CCClass": 127,
"./CCClassDecorator": 128,
"./CCEnum": 129,
"./CCMacro": 130,
"./CCObject": 131,
"./CCSys": 132,
"./CCVisibleRect": 1,
"./callbacks-invoker": 135,
"./deserialize": 137,
"./instantiate": 141,
"./instantiate-jit": 140,
"./js": 142,
"./requiring-frame": 144,
"./url": 145
} ],
140: [ (function(i, n, o) {
function r(t, e) {
this.varName = t;
this.expression = e;
}
function s(t, e) {
return e instanceof r ? new r(e.varName, t + e.expression) : t + e;
}
function c(t, e, i) {
if (Array.isArray(i)) {
i[0] = s(e, i[0]);
t.push(i);
} else t.push(s(e, i) + ";");
}
function a(t) {
this._exps = [];
this._targetExp = t;
}
function l(i, n) {
if ("function" === ("object" == (e = typeof i) ? t(i) : e)) try {
i = i();
} catch (t) {
return !1;
}
if (i === n) return !0;
if (i && n) {
if (i instanceof cc.ValueType && i.equals(n)) return !0;
if (Array.isArray(i) && Array.isArray(n) || i.constructor === Object && n.constructor === Object) try {
return JSON.stringify(i) === JSON.stringify(n);
} catch (t) {}
}
return !1;
}
function h(t) {
return T.test(t) ? "." + t : "[" + b(t) + "]";
}
function u(t, e) {
this.parent = e;
this.objsToClear_iN$t = [];
this.codeArray = [];
this.objs = [];
this.funcs = [];
this.funcModuleCache = g.createMap();
g.mixin(this.funcModuleCache, A);
this.globalVariables = [];
this.globalVariableId = 0;
this.localVariableId = 0;
this.codeArray.push(S + E + "," + x + ";", "if(R){", E + "=R;", "}else{", E + "=R=new " + this.getFuncModule(t.constructor, !0) + "();", "}");
t._iN$t = {
globalVar: "R"
};
this.objsToClear_iN$t.push(t);
this.enumerateObject(this.codeArray, t);
var i;
this.globalVariables.length > 0 && (i = S + this.globalVariables.join(",") + ";");
var n = v.flattenCodeArray([ "return (function(R){", i || [], this.codeArray, "return o;", "})" ]);
this.result = Function("O", "F", n)(this.objs, this.funcs);
for (var o = 0, r = this.objsToClear_iN$t.length; o < r; ++o) this.objsToClear_iN$t[o]._iN$t = null;
this.objsToClear_iN$t.length = 0;
}
var d = i("./CCObject"), f = d.Flags.Destroyed, _ = d.Flags.PersistentMask, p = i("./attribute"), g = i("./js"), y = i("./CCClass"), v = i("./compiler"), m = p.DELIMETER + "serializable", C = p.DELIMETER + "default", T = y.IDENTIFIER_RE, b = y.escapeForJS, S = "var ", E = "o", x = "t", A = {
"cc.Node": "cc.Node",
"cc.Sprite": "cc.Sprite",
"cc.Label": "cc.Label",
"cc.Button": "cc.Button",
"cc.Widget": "cc.Widget",
"cc.Animation": "cc.Animation",
"cc.ClickEvent": !1,
"cc.PrefabInfo": !1
};
r.prototype.toString = function() {
return S + this.varName + "=" + this.expression + ";";
};
a.prototype.append = function(t, e) {
this._exps.push([ t, e ]);
};
a.prototype.writeCode = function(t) {
var e;
if (this._exps.length > 1) {
t.push(x + "=" + this._targetExp + ";");
e = x;
} else {
if (1 !== this._exps.length) return;
e = this._targetExp;
}
for (var i = 0; i < this._exps.length; i++) {
var n = this._exps[i];
c(t, e + h(n[0]) + "=", n[1]);
}
};
(a.pool = new g.Pool(function(t) {
t._exps.length = 0;
t._targetExp = null;
}, 1)).get = function(t) {
var e = this._get() || new a();
e._targetExp = t;
return e;
};
var N = u.prototype;
N.getFuncModule = function(t, e) {
var i = g.getClassName(t);
if (i) {
var n = this.funcModuleCache[i];
if (n) return n;
if (void 0 === n) {
var o = -1 !== i.indexOf(".");
if (o) try {
if (o = t === Function("return " + i)()) {
this.funcModuleCache[i] = i;
return i;
}
} catch (t) {}
}
}
var r = this.funcs.indexOf(t);
if (r < 0) {
r = this.funcs.length;
this.funcs.push(t);
}
var s = "F[" + r + "]";
e && (s = "(" + s + ")");
this.funcModuleCache[i] = s;
return s;
};
N.getObjRef = function(t) {
var e = this.objs.indexOf(t);
if (e < 0) {
e = this.objs.length;
this.objs.push(t);
}
return "O[" + e + "]";
};
N.setValueType = function(t, e, i, n) {
var o = a.pool.get(n), r = e.constructor.__props__;
r || (r = Object.keys(e));
for (var s = 0; s < r.length; s++) {
var c = r[s], l = i[c];
if (e[c] !== l) {
var h = this.enumerateField(i, c, l);
o.append(c, h);
}
}
o.writeCode(t);
a.pool.put(o);
};
N.enumerateCCClass = function(i, n, o) {
for (var r = o.__props__, s = p.getClassAttrs(o), c = 0; c < r.length; c++) {
var a = r[c];
0;
if (!1 !== s[a + m]) {
var u = n[a];
if (l(d = s[a + C], u)) continue;
if ("object" === ("object" == (e = typeof u) ? t(u) : e) && u instanceof cc.ValueType) {
var d;
if (((d = y.getDefault(d)) && d.constructor) === u.constructor) {
var f = E + h(a);
this.setValueType(i, d, u, f);
continue;
}
}
this.setObjProp(i, n, a, u);
}
}
};
N.instantiateArray = function(t) {
if (0 === t.length) return "[]";
var e = "a" + ++this.localVariableId, i = [ new r(e, "new Array(" + t.length + ")") ];
t._iN$t = {
globalVar: "",
source: i
};
this.objsToClear_iN$t.push(t);
for (var n = 0; n < t.length; ++n) {
c(i, e + "[" + n + "]=", this.enumerateField(t, n, t[n]));
}
return i;
};
N.enumerateField = function(i, n, o) {
if ("object" === ("object" == (e = typeof o) ? t(o) : e) && o) {
var r = o._iN$t;
if (r) {
var c = r.globalVar;
if (!c) {
c = r.globalVar = "v" + ++this.globalVariableId;
this.globalVariables.push(c);
var a = r.source[0];
r.source[0] = s(c + "=", a);
}
return c;
}
return Array.isArray(o) ? this.instantiateArray(o) : this.instantiateObj(o);
}
if ("function" === ("object" == (e = typeof o) ? t(o) : e)) return this.getFuncModule(o);
if ("string" === ("object" == (e = typeof o) ? t(o) : e)) return b(o);
"_objFlags" === n && i instanceof d && (o &= _);
return o;
};
N.setObjProp = function(t, e, i, n) {
c(t, E + h(i) + "=", this.enumerateField(e, i, n));
};
N.enumerateObject = function(i, n) {
var o = n.constructor;
if (cc.Class._isCCClass(o)) this.enumerateCCClass(i, n, o); else for (var r in n) if (n.hasOwnProperty(r) && (95 !== r.charCodeAt(0) || 95 !== r.charCodeAt(1) || "__type__" === r)) {
var s = n[r];
"object" === ("object" == (e = typeof s) ? t(s) : e) && s && s === n._iN$t || this.setObjProp(i, n, r, s);
}
};
N.instantiateObj = function(t) {
if (t instanceof cc.ValueType) return y.getNewValueTypeCode(t);
if (t instanceof cc.Asset) return this.getObjRef(t);
if (t._objFlags & f) return null;
var e, i = t.constructor;
if (cc.Class._isCCClass(i)) {
if (this.parent) if (this.parent instanceof cc.Component) {
if (t instanceof cc._BaseNode || t instanceof cc.Component) return this.getObjRef(t);
} else if (this.parent instanceof cc._BaseNode) if (t instanceof cc._BaseNode) {
if (!t.isChildOf(this.parent)) return this.getObjRef(t);
} else if (t instanceof cc.Component && !t.node.isChildOf(this.parent)) return this.getObjRef(t);
e = new r(E, "new " + this.getFuncModule(i, !0) + "()");
} else if (i === Object) e = new r(E, "{}"); else {
if (i) return this.getObjRef(t);
e = new r(E, "Object.create(null)");
}
var n = [ e ];
t._iN$t = {
globalVar: "",
source: n
};
this.objsToClear_iN$t.push(t);
this.enumerateObject(n, t);
return [ "(function(){", n, "return o;})();" ];
};
n.exports = {
compile: function(t) {
return new u(t, t instanceof cc._BaseNode && t).result;
},
equalsToDefault: l
};
0;
}), {
"./CCClass": 127,
"./CCObject": 131,
"./attribute": 134,
"./compiler": 136,
"./js": 142
} ],
141: [ (function(i, n, o) {
function r(i, n) {
if (!n) {
if ("object" !== ("object" == (e = typeof i) ? t(i) : e) || Array.isArray(i)) {
0;
return null;
}
if (!i) {
0;
return null;
}
if (!cc.isValid(i)) {
0;
return null;
}
0;
}
var o;
if (i instanceof l) {
if (i._instantiate) {
cc.game._isCloning = !0;
o = i._instantiate();
cc.game._isCloning = !1;
return o;
}
if (i instanceof cc.Asset) {
0;
return null;
}
}
cc.game._isCloning = !0;
o = s(i);
cc.game._isCloning = !1;
return o;
}
function s(t, e) {
if (Array.isArray(t)) {
0;
return null;
}
0;
var i;
if (t._iN$t) i = t._iN$t; else if (t.constructor) {
i = new (0, t.constructor)();
} else i = Object.create(null);
c(t, i, e);
for (var n = 0, o = f.length; n < o; ++n) f[n]._iN$t = null;
f.length = 0;
return i;
}
function c(i, n, o) {
i._iN$t = n;
f.push(i);
var r = i.constructor;
if (cc.Class._isCCClass(r)) (function(i, n, o, r) {
for (var s = i.__props__, c = d.getClassAttrs(i), l = 0; l < s.length; l++) {
var h = s[l];
if (!1 !== c[h + _]) {
var u = n[h];
"object" === ("object" == (e = typeof u) ? t(u) : e) && u ? o[h] = u._iN$t || a(u, r) : o[h] = u;
}
}
})(r, i, n, o); else for (var s in i) if (i.hasOwnProperty(s) && (95 !== s.charCodeAt(0) || 95 !== s.charCodeAt(1) || "__type__" === s)) {
var c = i[s];
if ("object" === ("object" == (e = typeof c) ? t(c) : e) && c) {
if (c === n) continue;
n[s] = c._iN$t || a(c, o);
} else n[s] = c;
}
i instanceof l && (n._objFlags &= u);
}
function a(i, n) {
if (i instanceof cc.ValueType) return i.clone();
if (i instanceof cc.Asset) return i;
var o;
if (Array.isArray(i)) {
var r = i.length;
o = new Array(r);
i._iN$t = o;
for (var s = 0; s < r; ++s) {
var l = i[s];
"object" === ("object" == (e = typeof l) ? t(l) : e) && l ? o[s] = l._iN$t || a(l, n) : o[s] = l;
}
f.push(i);
return o;
}
if (i._objFlags & h) return null;
var u = i.constructor;
if (cc.Class._isCCClass(u)) {
if (n) if (n instanceof cc.Component) {
if (i instanceof cc._BaseNode || i instanceof cc.Component) return i;
} else if (n instanceof cc._BaseNode) if (i instanceof cc._BaseNode) {
if (!i.isChildOf(n)) return i;
} else if (i instanceof cc.Component && !i.node.isChildOf(n)) return i;
o = new u();
} else if (u === Object) o = {}; else {
if (u) return i;
o = Object.create(null);
}
c(i, o, n);
return o;
}
var l = i("./CCObject"), h = l.Flags.Destroyed, u = l.Flags.PersistentMask, d = i("./attribute"), f = (i("./utils").isDomNode, 
[]), _ = d.DELIMETER + "serializable";
r._clone = s;
cc.instantiate = r;
n.exports = r;
}), {
"./CCObject": 131,
"./attribute": 134,
"./utils": 146
} ],
142: [ (function(i, n, o) {
function r(t, e) {
for (;t; ) {
var i = Object.getOwnPropertyDescriptor(t, e);
if (i) return i;
t = Object.getPrototypeOf(t);
}
return null;
}
function s(t, e, i) {
var n = r(e, t);
Object.defineProperty(i, t, n);
}
function c(t, e) {
t.splice(e, 1);
}
function a(t, e) {
var i = t.indexOf(e);
if (i >= 0) {
c(t, i);
return !0;
}
return !1;
}
function l(i, n) {
if ("number" === ("object" == (e = typeof i) ? t(i) : e)) {
n = i;
i = null;
}
this.get = null;
this.count = 0;
this._pool = new Array(n);
this._cleanup = i;
}
var h = new (i("./id-generater"))("TmpCId."), u = {
isNumber: function(i) {
return "number" === ("object" == (e = typeof i) ? t(i) : e) || i instanceof Number;
},
isString: function(i) {
return "string" === ("object" == (e = typeof i) ? t(i) : e) || i instanceof String;
},
addon: function(i) {
"use strict";
i = i || {};
for (var n = 1, o = arguments.length; n < o; n++) {
var r = arguments[n];
if (r) {
if ("object" !== ("object" == (e = typeof r) ? t(r) : e)) {
cc.errorID(5402, r);
continue;
}
for (var c in r) c in i || s(c, r, i);
}
}
return i;
},
mixin: function(i) {
"use strict";
i = i || {};
for (var n = 1, o = arguments.length; n < o; n++) {
var r = arguments[n];
if (r) {
if ("object" !== ("object" == (e = typeof r) ? t(r) : e)) {
cc.errorID(5403, r);
continue;
}
for (var c in r) s(c, r, i);
}
}
return i;
},
extend: function(t, e) {
0;
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
t.prototype = Object.create(e.prototype, {
constructor: {
value: t,
writable: !0,
configurable: !0
}
});
return t;
},
getSuper: function(t) {
if (t.hasOwnProperty("$super")) return t.$super;
var e = t.prototype, i = e && Object.getPrototypeOf(e);
return i && i.constructor;
},
clear: function(t) {
for (var e = Object.keys(t), i = 0; i < e.length; i++) delete t[e[i]];
},
getPropertyDescriptor: r
}, d = {
value: void 0,
enumerable: !1,
writable: !1,
configurable: !0
};
u.value = function(t, e, i, n, o) {
d.value = i;
d.writable = n;
d.enumerable = o;
Object.defineProperty(t, e, d);
d.value = void 0;
};
var f = {
get: null,
set: null,
enumerable: !1
};
u.getset = function(i, n, o, r, s) {
if ("function" !== ("object" == (e = typeof r) ? t(r) : e)) {
s = r;
r = void 0;
}
f.get = o;
f.set = r;
f.enumerable = s;
Object.defineProperty(i, n, f);
f.get = null;
f.set = null;
};
var _ = {
get: null,
enumerable: !1,
configurable: !1
};
u.get = function(t, e, i, n, o) {
_.get = i;
_.enumerable = n;
_.configurable = o;
Object.defineProperty(t, e, _);
_.get = null;
};
var p = {
set: null,
enumerable: !1,
configurable: !1
};
u.set = function(t, e, i, n, o) {
p.set = i;
p.enumerable = n;
p.configurable = o;
Object.defineProperty(t, e, p);
p.set = null;
};
u.getClassName = function(i) {
if ("function" === ("object" == (e = typeof i) ? t(i) : e)) {
var n = i.prototype;
if (n && n.hasOwnProperty("__classname__") && n.__classname__) return n.__classname__;
var o = "";
i.name && (o = i.name);
if (i.toString) {
var r, s = i.toString();
(r = "[" === s.charAt(0) ? s.match(/\[\w+\s*(\w+)\]/) : s.match(/function\s*(\w+)/)) && 2 === r.length && (o = r[1]);
}
return "Object" !== o ? o : "";
}
return i && i.constructor ? u.getClassName(i.constructor) : "";
};
(function() {
function i(t, e) {
return function(i, n) {
n.prototype.hasOwnProperty(t) && delete e[n.prototype[t]];
u.value(n.prototype, t, i);
if (i) {
var o = e[i];
if (o && o !== n) {
var r = "A Class already exists with the same " + t + ' : "' + i + '".';
0;
cc.error(r);
} else e[i] = n;
}
};
}
var n = {}, o = {};
u._setClassId = i("__cid__", n);
var r = i("__classname__", o);
u.setClassName = function(t, e) {
r(t, e);
if (!e.prototype.hasOwnProperty("__cid__")) {
var i = t || h.getNewId();
i && u._setClassId(i, e);
}
};
u.unregisterClass = function() {
for (var t = 0; t < arguments.length; t++) {
var e = arguments[t].prototype, i = e.__cid__;
i && delete n[i];
var r = e.__classname__;
r && delete o[r];
}
};
u._getClassById = function(t) {
return n[t];
};
u.getClassByName = function(t) {
return o[t];
};
u._getClassId = function(i, n) {
n = "undefined" === ("object" == (e = typeof n) ? t(n) : e) || n;
if ("function" === ("object" == (e = typeof i) ? t(i) : e) && i.prototype.hasOwnProperty("__cid__")) {
0;
return i.prototype.__cid__;
}
if (i && i.constructor) {
var o = i.constructor.prototype;
if (o && o.hasOwnProperty("__cid__")) {
0;
return i.__cid__;
}
}
return "";
};
0;
})();
u.obsolete = function(t, e, i, n) {
function o() {
0;
return this[i];
}
var r = /([^.]+)$/.exec(e)[0];
n ? u.getset(t, r, o, (function(t) {
0;
this[i] = t;
})) : u.get(t, r, o);
};
u.obsoletes = function(t, e, i, n) {
for (var o in i) {
var r = i[o];
u.obsolete(t, e + "." + o, r, n);
}
};
var g = /(%d)|(%s)/, y = /%s/;
u.formatStr = function() {
var i = arguments.length;
if (0 === i) return "";
var n = arguments[0];
if (1 === i) return "" + n;
if ("string" === ("object" == (e = typeof n) ? t(n) : e) && g.test(n)) for (var o = 1; o < i; ++o) {
var r = arguments[o], s = "number" === ("object" == (e = typeof r) ? t(r) : e) ? g : y;
s.test(n) ? n = n.replace(s, r) : n += " " + r;
} else for (var c = 1; c < i; ++c) n += " " + arguments[c];
return n;
};
u.shiftArguments = function() {
for (var t = arguments.length - 1, e = new Array(t), i = 0; i < t; ++i) e[i] = arguments[i + 1];
return e;
};
u.createMap = function(t) {
var e = Object.create(null);
if (t) {
e["."] = !0;
e["/"] = !0;
delete e["."];
delete e["/"];
}
return e;
};
var v = Array.prototype.indexOf;
u.array = {
remove: a,
fastRemove: function(t, e) {
var i = t.indexOf(e);
if (i >= 0) {
t[i] = t[t.length - 1];
--t.length;
}
},
removeAt: c,
fastRemoveAt: function(t, e) {
var i = t.length;
if (!(e < 0 || e >= i)) {
t[e] = t[i - 1];
t.length = i - 1;
}
},
contains: function(t, e) {
return t.indexOf(e) >= 0;
},
verifyType: function(t, e) {
if (t && t.length > 0) for (var i = 0; i < t.length; i++) if (!(t[i] instanceof e)) {
cc.logID(1300);
return !1;
}
return !0;
},
removeArray: function(t, e) {
for (var i = 0, n = e.length; i < n; i++) a(t, e[i]);
},
appendObjectsAt: function(t, e, i) {
t.splice.apply(t, [ i, 0 ].concat(e));
return t;
},
copy: function(t) {
var e, i = t.length, n = new Array(i);
for (e = 0; e < i; e += 1) n[e] = t[e];
return n;
},
indexOf: v,
MutableForwardIterator: i("../utils/mutable-forward-iterator")
};
l.prototype._get = function() {
if (this.count > 0) {
--this.count;
var t = this._pool[this.count];
this._pool[this.count] = null;
return t;
}
return null;
};
l.prototype.put = function(t) {
var e = this._pool;
if (this.count < e.length) {
if (this._cleanup && !1 === this._cleanup(t)) return;
e[this.count] = t;
++this.count;
}
};
l.prototype.resize = function(t) {
if (t >= 0) {
this._pool.length = t;
this.count > t && (this.count = t);
}
};
u.Pool = l;
cc.js = u;
n.exports = u;
}), {
"../utils/mutable-forward-iterator": 153,
"./id-generater": 138
} ],
143: [ (function(i, n, o) {
function r(t, e, i, n) {
if (t.get || t.set) 0; else if (t.hasOwnProperty("default")) {
var o = "_N$" + e;
t.get = function() {
return this[o];
};
t.set = function(t) {
var e = this[o];
this[o] = t;
i.call(this, e);
};
var r = {};
n[o] = r;
for (var s in l) {
var c = l[s];
if (t.hasOwnProperty(s)) {
r[s] = t[s];
c.canUsedInGet || delete t[s];
}
}
} else 0;
}
function s(t, e, i, n) {
Array.isArray(n) && n.length > 0 && (n = n[0]);
0;
t.type = n;
}
function c(t, e, i, n) {
if (Array.isArray(e)) {
if (!(e.length > 0)) return cc.errorID(5508, i, n);
if (cc.RawAsset.isRawAssetType(e[0])) {
t.url = e[0];
delete t.type;
return;
}
t.type = e = e[0];
}
0;
}
function a(t, e, i, n) {
0;
}
var l = {
url: {
canUsedInGet: !0
},
default: {},
serializable: {},
editorOnly: {},
rawType: {},
formerlySerializedAs: {}
};
o.getFullFormOfProperty = function(i) {
if (!(i && i.constructor === Object)) {
if (Array.isArray(i) && i.length > 0) return {
default: [],
type: i,
_short: !0
};
if ("function" === ("object" == (e = typeof i) ? t(i) : e)) {
var n = i;
return cc.RawAsset.isRawAssetType(n) ? {
default: "",
url: n,
_short: !0
} : {
default: cc.isChildClassOf(n, cc.ValueType) ? new n() : null,
type: n,
_short: !0
};
}
return {
default: i,
_short: !0
};
}
return null;
};
o.preprocessAttrs = function(t, e, i, n) {
for (var l in t) {
var h = t[l], u = o.getFullFormOfProperty(h);
u && (h = t[l] = u);
if (h) {
var d = h.notify;
d && r(h, l, d, t);
"type" in h && c(h, h.type, e, l);
"url" in h && s(h, 0, 0, h.url);
"type" in h && a(0, h.type);
}
}
};
0;
o.validateMethodWithProps = function(i, n, o, r, s) {
0;
if ("function" !== ("object" == (e = typeof i) ? t(i) : e) && null !== i) {
return !1;
}
0;
return !0;
};
}), {
"./CCClass": 127
} ],
144: [ (function(t, e, i) {
var n = [];
cc._RF = {
push: function(t, e, i) {
if (void 0 === i) {
i = e;
e = "";
}
n.push({
uuid: e,
script: i,
module: t,
exports: t.exports,
beh: null
});
},
pop: function() {
var t = n.pop(), e = t.module, i = e.exports;
if (i === t.exports) {
for (var o in i) return;
e.exports = i = t.cls;
}
},
peek: function() {
return n[n.length - 1];
}
};
0;
}), {} ],
145: [ (function(t, e, i) {
var n = {};
cc.url = {
_rawAssets: "",
_builtinRawAssets: "",
normalize: function(t) {
46 === t.charCodeAt(0) && 47 === t.charCodeAt(1) ? t = t.slice(2) : 47 === t.charCodeAt(0) && (t = t.slice(1));
return t;
},
raw: function(t) {
0;
(t = this.normalize(t)).startsWith("resources/") || cc.errorID(7002, t);
return this._rawAssets + t;
},
builtinRaw: !1,
_init: function(t) {
for (var e in t) {
var i = t[e];
i = cc.path.stripSep(i) + "/";
n[e] = i;
}
this._rawAssets = n.assets;
this._builtinRawAssets = n.internal;
}
};
e.exports = cc.url;
}), {} ],
146: [ (function(i, n, o) {
n.exports = {
contains: function(i, n) {
if ("function" == ("object" == (e = typeof i.contains) ? t(i.contains) : e)) return i.contains(n);
if ("function" == ("object" == (e = typeof i.compareDocumentPosition) ? t(i.compareDocumentPosition) : e)) return !!(16 & i.compareDocumentPosition(n));
var o = n.parentNode;
if (o) do {
if (o === i) return !0;
o = o.parentNode;
} while (null !== o);
return !1;
},
isDomNode: "object" === ("object" == (e = typeof window) ? t(window) : e) && ("function" === ("object" == (e = typeof Node) ? t(Node) : e) ? function(t) {
return t instanceof Node;
} : function(i) {
return i && "object" === ("object" == (e = typeof i) ? t(i) : e) && "number" === ("object" == (e = typeof i.nodeType) ? t(i.nodeType) : e) && "string" === ("object" == (e = typeof i.nodeName) ? t(i.nodeName) : e);
}),
callInNextTick: function(t, e, i) {
t && cc.director.once(cc.Director._EVENT_NEXT_TICK, (function() {
t(e, i);
}));
}
};
0;
0;
}), {} ],
147: [ (function(t, e, i) {
t("../platform/CCSys");
var n = /(\.[^\.\/\?\\]*)(\?.*)?$/, o = /((.*)(\/|\\|\\\\))?(.*?\..*$)?/, r = /[^\.\/]+\/\.\.\//;
cc.path = {
join: function() {
for (var t = arguments.length, e = "", i = 0; i < t; i++) e = (e + ("" === e ? "" : "/") + arguments[i]).replace(/(\/|\\\\)$/, "");
return e;
},
extname: function(t) {
var e = n.exec(t);
return e ? e[1] : "";
},
mainFileName: function(t) {
if (t) {
var e = t.lastIndexOf(".");
if (-1 !== e) return t.substring(0, e);
}
return t;
},
basename: function(t, e) {
var i = t.indexOf("?");
i > 0 && (t = t.substring(0, i));
var n = /(\/|\\\\)([^(\/|\\\\)]+)$/g.exec(t.replace(/(\/|\\\\)$/, ""));
if (!n) return null;
var o = n[2];
return e && t.substring(t.length - e.length).toLowerCase() === e.toLowerCase() ? o.substring(0, o.length - e.length) : o;
},
dirname: function(t) {
var e = o.exec(t);
return e ? e[2] : "";
},
changeExtname: function(t, e) {
e = e || "";
var i = t.indexOf("?"), n = "";
if (i > 0) {
n = t.substring(i);
t = t.substring(0, i);
}
return (i = t.lastIndexOf(".")) < 0 ? t + e + n : t.substring(0, i) + e + n;
},
changeBasename: function(t, e, i) {
if (0 === e.indexOf(".")) return this.changeExtname(t, e);
var n = t.indexOf("?"), o = "", r = i ? this.extname(t) : "";
if (n > 0) {
o = t.substring(n);
t = t.substring(0, n);
}
n = (n = t.lastIndexOf("/")) <= 0 ? 0 : n + 1;
return t.substring(0, n) + e + r + o;
},
_normalize: function(t) {
var e = t = String(t);
do {
e = t;
t = t.replace(r, "");
} while (e.length !== t.length);
return t;
},
sep: cc.sys.os === cc.sys.OS_WINDOWS ? "\\" : "/",
stripSep: function(t) {
return t.replace(/[\/\\]$/, "");
}
};
e.exports = cc.path;
}), {
"../platform/CCSys": 132
} ],
148: [ (function(i, n, o) {
function r(i) {
if (!i) {
cc.errorID(3804);
return null;
}
return "string" === ("object" == (e = typeof i) ? t(i) : e) ? f.getClassByName(i) : i;
}
function s(t, e) {
for (var i = 0; i < t._components.length; ++i) {
var n = t._components[i];
if (n instanceof e) return n;
}
return null;
}
function c(t, e, i) {
for (var n = 0; n < t._components.length; ++n) {
var o = t._components[n];
o instanceof e && i.push(o);
}
}
function a(t, e) {
for (var i = 0; i < t.length; ++i) {
var n = t[i], o = s(n, e);
if (o) return o;
if (n._children.length > 0 && (o = a(n._children, e))) return o;
}
return null;
}
function l(t, e, i) {
for (var n = 0; n < t.length; ++n) {
var o = t[n];
c(o, e, i);
o._children.length > 0 && l(o._children, e, i);
}
}
var h = i("../platform/CCObject").Flags, u = i("./misc"), d = i("../platform/id-generater"), f = (i("../event-manager"), 
cc.js), _ = h.Destroying, p = h.DontDestroy, g = new d("Node"), y = cc.Class({
name: "cc._BaseNode",
extends: cc.Object,
mixins: [ cc.EventTarget ],
properties: {
_parent: null,
_children: [],
_tag: cc.macro.NODE_TAG_INVALID,
_active: !0,
_components: [],
_prefab: null,
_persistNode: {
get: function() {
return (this._objFlags & p) > 0;
},
set: function(t) {
t ? this._objFlags |= p : this._objFlags &= ~p;
}
},
name: {
get: function() {
return this._name;
},
set: function(t) {
0;
this._name = t;
}
},
_id: {
default: "",
editorOnly: !0
},
uuid: {
get: function() {
var t = this._id;
t || (t = this._id = g.getNewId());
return t;
}
},
children: {
get: function() {
return this._children;
}
},
childrenCount: {
get: function() {
return this._children.length;
}
},
active: {
get: function() {
return this._active;
},
set: function(t) {
t = !!t;
if (this._active !== t) {
this._active = t;
var e = this._parent;
if (e) {
e._activeInHierarchy && cc.director._nodeActivator.activateNode(this, t);
}
}
}
},
activeInHierarchy: {
get: function() {
return this._activeInHierarchy;
}
}
},
ctor: function(i) {
this._name = "undefined" !== ("object" == (e = typeof i) ? t(i) : e) ? i : "New Node";
this._activeInHierarchy = !1;
this.__instanceId = this._id || cc.ClassManager.getNewInstanceId();
this.__eventTargets = [];
},
getTag: function() {
return this._tag;
},
setTag: function(t) {
this._tag = t;
},
getParent: function() {
return this._parent;
},
setParent: function(t) {
if (this._parent !== t) {
0;
var e = this._parent;
this._parent = t || null;
this._onSetParent(t);
if (t) {
0;
t._children.push(this);
t.emit("child-added", this);
}
if (e) {
if (!(e._objFlags & _)) {
var i = e._children.indexOf(this);
0;
e._children.splice(i, 1);
e.emit("child-removed", this);
this._onHierarchyChanged(e);
}
} else t && this._onHierarchyChanged(null);
}
},
init: function() {
return !0;
},
attr: function(t) {
f.mixin(this, t);
},
getChildByTag: function(t) {
var e = this._children;
if (null !== e) for (var i = 0; i < e.length; i++) {
var n = e[i];
if (n && n._tag === t) return n;
}
return null;
},
getChildByUuid: function(t) {
if (!t) {
cc.log("Invalid uuid");
return null;
}
for (var e = this._children, i = 0, n = e.length; i < n; i++) if (e[i]._id === t) return e[i];
return null;
},
getChildByName: function(t) {
if (!t) {
cc.log("Invalid name");
return null;
}
for (var e = this._children, i = 0, n = e.length; i < n; i++) if (e[i]._name === t) return e[i];
return null;
},
addChild: function(t) {
0;
cc.assertID(t, 1606);
cc.assertID(null === t._parent, 1605);
t.setParent(this);
},
insertChild: function(t, e) {
t.parent = this;
t.setSiblingIndex(e);
},
getSiblingIndex: function() {
return this._parent ? this._parent._children.indexOf(this) : 0;
},
setSiblingIndex: function(t) {
if (this._parent) {
var e = this._parent._children;
t = -1 !== t ? t : e.length - 1;
var i = e.indexOf(this);
if (t !== i) {
e.splice(i, 1);
t < e.length ? e.splice(t, 0, this) : e.push(this);
this._onSiblingIndexChanged && this._onSiblingIndexChanged(t);
}
}
},
cleanup: function() {},
removeFromParent: function(t) {
if (this._parent) {
void 0 === t && (t = !0);
this._parent.removeChild(this, t);
}
},
removeChild: function(t, e) {
if (this._children.indexOf(t) > -1) {
(e || void 0 === e) && t.cleanup();
t.parent = null;
}
},
removeChildByTag: function(t, e) {
t === cc.macro.NODE_TAG_INVALID && cc.logID(1609);
var i = this.getChildByTag(t);
i ? this.removeChild(i, e) : cc.logID(1610, t);
},
removeAllChildren: function(t) {
var e = this._children;
void 0 === t && (t = !0);
for (var i = e.length - 1; i >= 0; i--) {
var n = e[i];
if (n) {
t && n.cleanup();
n.parent = null;
}
}
this._children.length = 0;
},
isChildOf: function(t) {
var e = this;
do {
if (e === t) return !0;
e = e._parent;
} while (e);
return !1;
},
getComponent: function(t) {
var e = r(t);
return e ? s(this, e) : null;
},
getComponents: function(t) {
var e = r(t), i = [];
e && c(this, e, i);
return i;
},
getComponentInChildren: function(t) {
var e = r(t);
return e ? a(this._children, e) : null;
},
getComponentsInChildren: function(t) {
var e = r(t), i = [];
if (e) {
c(this, e, i);
l(this._children, e, i);
}
return i;
},
_checkMultipleComp: !1,
addComponent: function(i) {
0;
var n;
if ("string" === ("object" == (e = typeof i) ? t(i) : e)) {
if (!(n = f.getClassByName(i))) {
cc.errorID(3807, i);
cc._RFpeek() && cc.errorID(3808, i);
return null;
}
} else {
if (!i) {
cc.errorID(3804);
return null;
}
n = i;
}
if ("function" !== ("object" == (e = typeof n) ? t(n) : e)) {
cc.errorID(3809);
return null;
}
if (!cc.isChildClassOf(n, cc.Component)) {
cc.errorID(3810);
return null;
}
0;
var o = n._requireComponent;
if (o && !this.getComponent(o)) {
if (!this.addComponent(o)) return null;
}
var r = new n();
r.node = this;
this._components.push(r);
this._activeInHierarchy && cc.director._nodeActivator.activateComp(r);
return r;
},
_addComponentAt: !1,
removeComponent: function(t) {
if (t) {
t instanceof cc.Component || (t = this.getComponent(t));
t && t.destroy();
} else cc.errorID(3813);
},
_getDependComponent: !1,
_removeComponent: function(t) {
if (t) {
if (!(this._objFlags & _)) {
var e = this._components.indexOf(t);
-1 !== e ? this._components.splice(e, 1) : t.node !== this && cc.errorID(3815);
}
} else cc.errorID(3814);
},
_disableChildComps: function() {
var t, e = this._components.length;
for (t = 0; t < e; ++t) {
var i = this._components[t];
i._enabled && cc.director._compScheduler.disableComp(i);
}
for (t = 0, e = this._children.length; t < e; ++t) {
var n = this._children[t];
n._active && n._disableChildComps();
}
},
destroy: function() {
cc.Object.prototype.destroy.call(this) && this._activeInHierarchy && this._disableChildComps();
},
destroyAllChildren: function() {
for (var t = this._children, e = 0; e < t.length; ++e) t[e].destroy();
},
_onSetParent: function(t) {},
_onPostActivated: function() {},
_onHierarchyChanged: function(t) {
var e = this._parent;
if (this._persistNode && !(e instanceof cc.Scene)) {
cc.game.removePersistRootNode(this);
0;
}
var i = this._active && !(!e || !e._activeInHierarchy);
this._activeInHierarchy !== i && cc.director._nodeActivator.activateNode(this, i);
},
_onBatchCreated: function() {
var t = this._prefab;
t && t.sync && !t._synced && t.root === this && PrefabHelper.syncWithPrefab(this);
for (var e = this._children, i = 0, n = e.length; i < n; i++) e[i]._onBatchCreated();
},
_instantiate: function(t) {
t || (t = cc.instantiate._clone(this, this));
var e = this._prefab;
0;
e && this === e.root && e.sync && (t._prefab._synced = e._synced);
t._parent = null;
t._onBatchCreated();
return t;
},
_registerIfAttached: !1,
_onPreDestroy: function() {
var t, e;
this._objFlags |= _;
var i = this._parent, n = i && i._objFlags & _;
0;
var o = this._children;
for (t = 0, e = o.length; t < e; ++t) o[t]._destroyImmediate();
for (t = 0, e = this._components.length; t < e; ++t) {
this._components[t]._destroyImmediate();
}
var r = this.__eventTargets;
for (t = 0, e = r.length; t < e; ++t) {
var s = r[t];
s && s.targetOff(this);
}
r.length = 0;
this._persistNode && cc.game.removePersistRootNode(this);
if (!n && i) {
var c = i._children.indexOf(this);
i._children.splice(c, 1);
i.emit("child-removed", this);
}
return n;
},
onRestore: !1
});
y.prototype._onPreDestroyBase = y.prototype._onPreDestroy;
0;
y.prototype._onHierarchyChangedBase = y.prototype._onHierarchyChanged;
0;
u.propertyDefine(y, [ "name", "children", "childrenCount" ], {});
0;
cc._BaseNode = n.exports = y;
}), {
"../event-manager": 76,
"../platform/CCObject": 131,
"../platform/id-generater": 138,
"./misc": 152
} ],
149: [ (function(t, e, i) {
var n = 1e-6;
e.exports = {
binarySearchEpsilon: function(t, e) {
for (var i = 0, o = t.length - 1, r = o >>> 1; i <= o; r = i + o >>> 1) {
var s = t[r];
if (s > e + n) o = r - 1; else {
if (!(s < e - n)) return r;
i = r + 1;
}
}
return ~i;
}
};
}), {} ],
150: [ (function(t, e, i) {
var n = t("./misc").BASE64_VALUES, o = "0123456789abcdef".split(""), r = [ "", "", "", "" ], s = r.concat(r, "-", r, "-", r, "-", r, "-", r, r, r), c = s.map((function(t, e) {
return "-" === t ? NaN : e;
})).filter(isFinite);
e.exports = function(t) {
if (22 !== t.length) return t;
s[0] = t[0];
s[1] = t[1];
for (var e = 2, i = 2; e < 22; e += 2) {
var r = n[t.charCodeAt(e)], a = n[t.charCodeAt(e + 1)];
s[c[i++]] = o[r >> 2];
s[c[i++]] = o[(3 & r) << 2 | a >> 4];
s[c[i++]] = o[15 & a];
}
return s.join("");
};
0;
}), {
"./misc": 152
} ],
151: [ (function(t, e, i) {
cc.find = e.exports = function(t, e) {
if (null == t) {
cc.errorID(5600);
return null;
}
if (e) 0; else {
var i = cc.director.getScene();
if (!i) {
0;
return null;
}
0;
e = i;
}
for (var n = e, o = "/" !== t[0] ? 0 : 1, r = t.split("/"), s = o; s < r.length; s++) {
var c = r[s], a = n._children;
n = null;
for (var l = 0, h = a.length; l < h; ++l) {
var u = a[l];
if (u.name === c) {
n = u;
break;
}
}
if (!n) return null;
}
return n;
};
}), {} ],
152: [ (function(t, e, i) {
var n = t("../platform/js"), o = t("../platform/CCSys"), r = i;
r.propertyDefine = function(t, e, i) {
function n(t, e, i, n) {
var o = Object.getOwnPropertyDescriptor(t, e);
if (o) {
o.get && (t[i] = o.get);
o.set && n && (t[n] = o.set);
} else {
var r = t[i];
cc.js.getset(t, e, r, t[n]);
}
}
for (var o, r = t.prototype, s = 0; s < e.length; s++) {
var c = (o = e[s])[0].toUpperCase() + o.slice(1);
n(r, o, "get" + c, "set" + c);
}
for (o in i) {
var a = i[o];
n(r, o, a[0], a[1]);
}
};
r.NextPOT = function(t) {
t -= 1;
t |= t >> 1;
t |= t >> 2;
t |= t >> 4;
t |= t >> 8;
return (t |= t >> 16) + 1;
};
0;
r.imagePool = new n.Pool(function(t) {
if (t instanceof HTMLImageElement) {
t.src = this._smallImg;
return !0;
}
return !1;
}, 10);
r.imagePool.get = function() {
return this._get() || new Image();
};
r.imagePool._smallImg = "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=";
o.os !== o.OS_WINDOWS && o.os !== o.OS_LINUX || o.browserType === o.BROWSER_TYPE_CHROME || r.imagePool.resize(0);
r.BUILTIN_CLASSID_RE = /^(?:cc|dragonBones|sp|ccsg)\..+/;
for (var s = new Array(123), c = 0; c < 123; ++c) s[c] = 64;
for (var a = 0; a < 64; ++a) s["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charCodeAt(a)] = a;
r.BASE64_VALUES = s;
r.pushToMap = function(t, e, i, n) {
var o = t[e];
if (o) if (Array.isArray(o)) if (n) {
o.push(o[0]);
o[0] = i;
} else o.push(i); else t[e] = n ? [ i, o ] : [ o, i ]; else t[e] = i;
};
}), {
"../platform/CCSys": 132,
"../platform/js": 142
} ],
153: [ (function(t, e, i) {
function n(t) {
this.i = 0;
this.array = t;
}
var o = n.prototype;
o.remove = function(t) {
var e = this.array.indexOf(t);
e >= 0 && this.removeAt(e);
};
o.removeAt = function(t) {
this.array.splice(t, 1);
t <= this.i && --this.i;
};
o.fastRemove = function(t) {
var e = this.array.indexOf(t);
e >= 0 && this.fastRemoveAt(e);
};
o.fastRemoveAt = function(t) {
var e = this.array;
e[t] = e[e.length - 1];
--e.length;
t <= this.i && --this.i;
};
o.push = function(t) {
this.array.push(t);
};
e.exports = n;
}), {} ],
154: [ (function(t, e, i) {
cc._PrefabInfo = cc.Class({
name: "cc.PrefabInfo",
properties: {
root: null,
asset: null,
fileId: "",
sync: !1,
_synced: {
default: !1,
serializable: !1
}
}
});
e.exports = {
syncWithPrefab: function(t) {
var e = t._prefab;
e._synced = !0;
if (e.asset) {
var i = t._objFlags, n = t._parent, o = t._id, r = t._name, s = t._active, c = t._position.x, a = t._position.y, l = t._rotationX, h = t._rotationY, u = t._localZOrder, d = t._globalZOrder;
cc.game._isCloning = !0;
e.asset._doInstantiate(t);
cc.game._isCloning = !1;
t._objFlags = i;
t._parent = n;
t._id = o;
t._prefab = e;
t._name = r;
t._active = s;
t._position.x = c;
t._position.y = a;
t._rotationX = l;
t._rotationY = h;
t._localZOrder = u;
t._globalZOrder = d;
} else {
cc.errorID(3701, t.name);
t._prefab = null;
}
}
};
}), {} ],
155: [ (function(t, e, i) {
var n = {
removeSgNode: function() {
var t = this._sgNode;
if (t) {
var e = t._parent;
e ? e.removeChild(t) : t.cleanup();
t._entity && (t._entity = null);
}
}
};
0;
e.exports = n;
}), {} ],
156: [ (function(t, e, i) {
cc.AffineTransform = function(t, e, i, n, o, r) {
this.a = t;
this.b = e;
this.c = i;
this.d = n;
this.tx = o;
this.ty = r;
};
cc.affineTransformMake = function(t, e, i, n, o, r) {
return {
a: t,
b: e,
c: i,
d: n,
tx: o,
ty: r
};
};
cc.affineTransformClone = function(t) {
return {
a: t.a,
b: t.b,
c: t.c,
d: t.d,
tx: t.tx,
ty: t.ty
};
};
cc.pointApplyAffineTransform = function(t, e, i) {
var n, o;
if (void 0 === i) {
i = e;
n = t.x;
o = t.y;
} else {
n = t;
o = e;
}
return {
x: i.a * n + i.c * o + i.tx,
y: i.b * n + i.d * o + i.ty
};
};
cc._pointApplyAffineTransformIn = function(t, e, i, n) {
var o, r, s;
if (void 0 === n) {
s = e;
o = t.x;
r = t.y;
n = i;
} else {
o = t;
r = e;
s = i;
}
n.x = s.a * o + s.c * r + s.tx;
n.y = s.b * o + s.d * r + s.ty;
};
cc._pointApplyAffineTransform = function(t, e, i) {
return cc.pointApplyAffineTransform(t, e, i);
};
cc.sizeApplyAffineTransform = function(t, e) {
return {
width: e.a * t.width + e.c * t.height,
height: e.b * t.width + e.d * t.height
};
};
cc.affineTransformMakeIdentity = function() {
return {
a: 1,
b: 0,
c: 0,
d: 1,
tx: 0,
ty: 0
};
};
cc.affineTransformIdentity = function() {
return {
a: 1,
b: 0,
c: 0,
d: 1,
tx: 0,
ty: 0
};
};
cc.rectApplyAffineTransform = function(t, e) {
var i = t.x, n = t.y, o = i + t.width, r = n + t.height, s = e.a * i + e.c * n + e.tx, c = e.b * i + e.d * n + e.ty, a = e.a * o + e.c * n + e.tx, l = e.b * o + e.d * n + e.ty, h = e.a * i + e.c * r + e.tx, u = e.b * i + e.d * r + e.ty, d = e.a * o + e.c * r + e.tx, f = e.b * o + e.d * r + e.ty, _ = Math.min(s, a, h, d), p = Math.max(s, a, h, d), g = Math.min(c, l, u, f), y = Math.max(c, l, u, f);
return cc.rect(_, g, p - _, y - g);
};
cc._rectApplyAffineTransformIn = function(t, e) {
var i = t.x, n = t.y, o = i + t.width, r = n + t.height, s = e.a * i + e.c * n + e.tx, c = e.b * i + e.d * n + e.ty, a = e.a * o + e.c * n + e.tx, l = e.b * o + e.d * n + e.ty, h = e.a * i + e.c * r + e.tx, u = e.b * i + e.d * r + e.ty, d = e.a * o + e.c * r + e.tx, f = e.b * o + e.d * r + e.ty, _ = Math.min(s, a, h, d), p = Math.max(s, a, h, d), g = Math.min(c, l, u, f), y = Math.max(c, l, u, f);
t.x = _;
t.y = g;
t.width = p - _;
t.height = y - g;
return t;
};
cc.obbApplyAffineTransform = function(t, e, i, n, o, r) {
var s = t.x, c = t.y, a = t.width, l = t.height, h = e.a * s + e.c * c + e.tx, u = e.b * s + e.d * c + e.ty, d = e.a * a, f = e.b * a, _ = e.c * l, p = e.d * l;
n.x = h;
n.y = u;
o.x = d + h;
o.y = f + u;
i.x = _ + h;
i.y = p + u;
r.x = d + _ + h;
r.y = f + p + u;
};
cc.affineTransformTranslate = function(t, e, i) {
return {
a: t.a,
b: t.b,
c: t.c,
d: t.d,
tx: t.tx + t.a * e + t.c * i,
ty: t.ty + t.b * e + t.d * i
};
};
cc.affineTransformScale = function(t, e, i) {
return {
a: t.a * e,
b: t.b * e,
c: t.c * i,
d: t.d * i,
tx: t.tx,
ty: t.ty
};
};
cc.affineTransformRotate = function(t, e) {
var i = Math.sin(e), n = Math.cos(e);
return {
a: t.a * n + t.c * i,
b: t.b * n + t.d * i,
c: t.c * n - t.a * i,
d: t.d * n - t.b * i,
tx: t.tx,
ty: t.ty
};
};
cc.affineTransformConcat = function(t, e) {
return {
a: t.a * e.a + t.b * e.c,
b: t.a * e.b + t.b * e.d,
c: t.c * e.a + t.d * e.c,
d: t.c * e.b + t.d * e.d,
tx: t.tx * e.a + t.ty * e.c + e.tx,
ty: t.tx * e.b + t.ty * e.d + e.ty
};
};
cc.affineTransformConcatIn = function(t, e) {
var i = t.a, n = t.b, o = t.c, r = t.d, s = t.tx, c = t.ty;
t.a = i * e.a + n * e.c;
t.b = i * e.b + n * e.d;
t.c = o * e.a + r * e.c;
t.d = o * e.b + r * e.d;
t.tx = s * e.a + c * e.c + e.tx;
t.ty = s * e.b + c * e.d + e.ty;
return t;
};
cc.affineTransformEqualToTransform = function(t, e) {
return t.a === e.a && t.b === e.b && t.c === e.c && t.d === e.d && t.tx === e.tx && t.ty === e.ty;
};
cc.affineTransformInvert = function(t) {
var e = 1 / (t.a * t.d - t.b * t.c);
return {
a: e * t.d,
b: -e * t.b,
c: -e * t.c,
d: e * t.a,
tx: e * (t.c * t.ty - t.d * t.tx),
ty: e * (t.b * t.tx - t.a * t.ty)
};
};
cc.affineTransformInvertIn = function(t) {
var e = t.a, i = t.b, n = t.c, o = t.d, r = 1 / (e * o - i * n), s = t.tx, c = t.ty;
t.a = r * o;
t.b = -r * i;
t.c = -r * n;
t.d = r * e;
t.tx = r * (n * c - o * s);
t.ty = r * (i * s - e * c);
return t;
};
cc.affineTransformInvertOut = function(t, e) {
var i = t.a, n = t.b, o = t.c, r = t.d, s = 1 / (i * r - n * o);
e.a = s * r;
e.b = -s * n;
e.c = -s * o;
e.d = s * i;
e.tx = s * (o * t.ty - r * t.tx);
e.ty = s * (n * t.tx - i * t.ty);
};
}), {} ],
157: [ (function(i, n, o) {
var r = i("./CCValueType"), s = i("../platform/js"), c = (function() {
function n(i, n, o, r) {
if ("object" === ("object" == (e = typeof i) ? t(i) : e)) {
n = i.g;
o = i.b;
r = i.a;
i = i.r;
}
i = i || 0;
n = n || 0;
o = o || 0;
r = "number" === ("object" == (e = typeof r) ? t(r) : e) ? r : 255;
this._val = (~~i << 24 >>> 0) + (~~n << 16) + (~~o << 8) + ~~r;
}
s.extend(n, r);
i("../platform/CCClass").fastDefine("cc.Color", n, {
r: 0,
g: 0,
b: 0,
a: 255
});
var o = {
WHITE: [ 255, 255, 255, 255 ],
BLACK: [ 0, 0, 0, 255 ],
TRANSPARENT: [ 0, 0, 0, 0 ],
GRAY: [ 127.5, 127.5, 127.5 ],
RED: [ 255, 0, 0 ],
GREEN: [ 0, 255, 0 ],
BLUE: [ 0, 0, 255 ],
YELLOW: [ 255, 235, 4 ],
ORANGE: [ 255, 127, 0 ],
CYAN: [ 0, 255, 255 ],
MAGENTA: [ 255, 0, 255 ]
};
for (var c in o) s.get(n, c, (function(t) {
return function() {
return new n(t[0], t[1], t[2], t[3]);
};
})(o[c]));
var a = n.prototype;
a.clone = function() {
var t = new n();
t._val = this._val;
return t;
};
a.equals = function(t) {
return t && this._val === t._val;
};
a.lerp = function(t, e, i) {
i = i || new n();
var o = this.r, r = this.g, s = this.b, c = this.a;
i.r = o + (t.r - o) * e;
i.g = r + (t.g - r) * e;
i.b = s + (t.b - s) * e;
i.a = c + (t.a - c) * e;
return i;
};
a.toString = function() {
return "rgba(" + this.r.toFixed() + ", " + this.g.toFixed() + ", " + this.b.toFixed() + ", " + this.a.toFixed() + ")";
};
a.getR = function() {
return (4278190080 & this._val) >>> 24;
};
a.setR = function(t) {
this._val = (16777215 & this._val | ~~t << 24 >>> 0) >>> 0;
return this;
};
a.getG = function() {
return (16711680 & this._val) >> 16;
};
a.setG = function(t) {
this._val = (4278255615 & this._val | ~~t << 16) >>> 0;
return this;
};
a.getB = function() {
return (65280 & this._val) >> 8;
};
a.setB = function(t) {
this._val = (4294902015 & this._val | ~~t << 8) >>> 0;
return this;
};
a.getA = function() {
return 255 & this._val;
};
a.setA = function(t) {
this._val = (4294967040 & this._val | ~~t) >>> 0;
return this;
};
s.getset(a, "r", a.getR, a.setR, !0);
s.getset(a, "g", a.getG, a.setG, !0);
s.getset(a, "b", a.getB, a.setB, !0);
s.getset(a, "a", a.getA, a.setA, !0);
a.toCSS = function(t) {
return "rgba" === t ? "rgba(" + (0 | this.r) + "," + (0 | this.g) + "," + (0 | this.b) + "," + (this.a / 255).toFixed(2) + ")" : "rgb" === t ? "rgb(" + (0 | this.r) + "," + (0 | this.g) + "," + (0 | this.b) + ")" : "#" + this.toHEX(t);
};
a.clamp = function() {};
a.fromHEX = function(t) {
t.length < 8 && (t += "FF");
var e = parseInt(t.indexOf("#") > -1 ? t.substring(1) : t, 16);
this._val = (0 & this._val | e) >>> 0;
return this;
};
a.toHEX = function(t) {
var e = [ (0 | this.r).toString(16), (0 | this.g).toString(16), (0 | this.b).toString(16) ], i = -1;
if ("#rgb" === t) for (i = 0; i < e.length; ++i) e[i].length > 1 && (e[i] = e[i][0]); else if ("#rrggbb" === t) for (i = 0; i < e.length; ++i) 1 === e[i].length && (e[i] = "0" + e[i]);
return e.join("");
};
a.toRGBValue = function() {
return 16777215 & this._val;
};
a.fromHSV = function(t, e, i) {
var o = n.hsv2rgb(t, e, i);
this._val = (o.r << 24 >>> 0) + (o.g << 16) + (o.b << 8) + this.a;
return this;
};
a.toHSV = function() {
return n.rgb2hsv(this.r, this.g, this.b);
};
a.fromColor = function(t) {
if (t._val) this._val = t._val; else {
this.r = t.r;
this.g = t.g;
this.b = t.b;
this.a = t.a;
}
};
return n;
})();
c.rgb2hsv = function(t, e, i) {
t /= 255;
e /= 255;
i /= 255;
var n = {
h: 0,
s: 0,
v: 0
}, o = Math.max(t, e, i), r = Math.min(t, e, i), s = 0;
n.v = o;
n.s = o ? (o - r) / o : 0;
if (n.s) {
s = o - r;
n.h = t === o ? (e - i) / s : e === o ? 2 + (i - t) / s : 4 + (t - e) / s;
n.h /= 6;
n.h < 0 && (n.h += 1);
} else n.h = 0;
return n;
};
c.hsv2rgb = function(t, e, i) {
var n = {
r: 0,
g: 0,
b: 0
};
if (0 === e) n.r = n.g = n.b = i; else if (0 === i) n.r = n.g = n.b = 0; else {
1 === t && (t = 0);
t *= 6;
e = e;
i = i;
var o = Math.floor(t), r = t - o, s = i * (1 - e), c = i * (1 - e * r), a = i * (1 - e * (1 - r));
switch (o) {
case 0:
n.r = i;
n.g = a;
n.b = s;
break;

case 1:
n.r = c;
n.g = i;
n.b = s;
break;

case 2:
n.r = s;
n.g = i;
n.b = a;
break;

case 3:
n.r = s;
n.g = c;
n.b = i;
break;

case 4:
n.r = a;
n.g = s;
n.b = i;
break;

case 5:
n.r = i;
n.g = s;
n.b = c;
}
}
n.r *= 255;
n.g *= 255;
n.b *= 255;
return n;
};
cc.Color = c;
cc.color = function(i, n, o, r) {
if ("string" === ("object" == (e = typeof i) ? t(i) : e)) {
return new cc.Color().fromHEX(i);
}
return "object" === ("object" == (e = typeof i) ? t(i) : e) ? new cc.Color(i.r, i.g, i.b, i.a) : new cc.Color(i, n, o, r);
};
cc.colorEqual = function(t, e) {
return void 0 !== t._val && void 0 !== e._val ? t._val === e._val : t.r === e.r && t.g === e.g && t.b === e.b;
};
cc.hexToColor = function(t) {
t = t.replace(/^#?/, "0x");
var e = parseInt(t), i = e >> 16, n = (65280 & e) >> 8, o = 255 & e;
return cc.color(i, n, o);
};
cc.colorToHex = function(t) {
var e = t.r.toString(16), i = t.g.toString(16), n = t.b.toString(16);
return "#" + (t.r < 16 ? "0" + e : e) + (t.g < 16 ? "0" + i : i) + (t.b < 16 ? "0" + n : n);
};
n.exports = cc.Color;
}), {
"../platform/CCClass": 127,
"../platform/js": 142,
"./CCValueType": 163
} ],
158: [ (function(t, e, i) {
var n = parseFloat("1.192092896e-07F");
cc.pNeg = function(t) {
return cc.p(-t.x, -t.y);
};
cc.pAdd = function(t, e) {
return cc.p(t.x + e.x, t.y + e.y);
};
cc.pSub = function(t, e) {
return cc.p(t.x - e.x, t.y - e.y);
};
cc.pMult = function(t, e) {
return cc.p(t.x * e, t.y * e);
};
cc.pMidpoint = function(t, e) {
return cc.pMult(cc.pAdd(t, e), .5);
};
cc.pDot = function(t, e) {
return t.x * e.x + t.y * e.y;
};
cc.pCross = function(t, e) {
return t.x * e.y - t.y * e.x;
};
cc.pPerp = function(t) {
return cc.p(-t.y, t.x);
};
cc.pRPerp = function(t) {
return cc.p(t.y, -t.x);
};
cc.pProject = function(t, e) {
return cc.pMult(e, cc.pDot(t, e) / cc.pDot(e, e));
};
cc.pLengthSQ = function(t) {
return cc.pDot(t, t);
};
cc.pDistanceSQ = function(t, e) {
return cc.pLengthSQ(cc.pSub(t, e));
};
cc.pLength = function(t) {
return Math.sqrt(cc.pLengthSQ(t));
};
cc.pDistance = function(t, e) {
return cc.pLength(cc.pSub(t, e));
};
cc.pNormalize = function(t) {
var e = cc.pLength(t);
return 0 === e ? cc.p(t) : cc.pMult(t, 1 / e);
};
cc.pForAngle = function(t) {
return cc.p(Math.cos(t), Math.sin(t));
};
cc.pToAngle = function(t) {
return Math.atan2(t.y, t.x);
};
cc.clampf = function(t, e, i) {
if (e > i) {
var n = e;
e = i;
i = n;
}
return t < e ? e : t < i ? t : i;
};
cc.clamp01 = function(t) {
return t < 0 ? 0 : t < 1 ? t : 1;
};
cc.pClamp = function(t, e, i) {
return cc.p(cc.clampf(t.x, e.x, i.x), cc.clampf(t.y, e.y, i.y));
};
cc.pFromSize = function(t) {
return cc.p(t.width, t.height);
};
cc.pCompOp = function(t, e) {
return cc.p(e(t.x), e(t.y));
};
cc.pLerp = function(t, e, i) {
return cc.pAdd(cc.pMult(t, 1 - i), cc.pMult(e, i));
};
cc.pFuzzyEqual = function(t, e, i) {
return t.x - i <= e.x && e.x <= t.x + i && t.y - i <= e.y && e.y <= t.y + i;
};
cc.pCompMult = function(t, e) {
return cc.p(t.x * e.x, t.y * e.y);
};
cc.pAngleSigned = function(t, e) {
var i = cc.pNormalize(t), o = cc.pNormalize(e), r = Math.atan2(i.x * o.y - i.y * o.x, cc.pDot(i, o));
return Math.abs(r) < n ? 0 : r;
};
cc.pAngle = function(t, e) {
var i = Math.acos(cc.pDot(cc.pNormalize(t), cc.pNormalize(e)));
return Math.abs(i) < n ? 0 : i;
};
cc.pRotateByAngle = function(t, e, i) {
var n = cc.pSub(t, e), o = Math.cos(i), r = Math.sin(i), s = n.x;
n.x = s * o - n.y * r + e.x;
n.y = s * r + n.y * o + e.y;
return n;
};
cc.pLineIntersect = function(t, e, i, n, o) {
if (t.x === e.x && t.y === e.y || i.x === n.x && i.y === n.y) return !1;
var r = e.x - t.x, s = e.y - t.y, c = n.x - i.x, a = n.y - i.y, l = t.x - i.x, h = t.y - i.y, u = a * r - c * s;
o.x = c * h - a * l;
o.y = r * h - s * l;
if (0 === u) return 0 === o.x || 0 === o.y;
o.x = o.x / u;
o.y = o.y / u;
return !0;
};
cc.pSegmentIntersect = function(t, e, i, n) {
var o = cc.p(0, 0);
return !!(cc.pLineIntersect(t, e, i, n, o) && o.x >= 0 && o.x <= 1 && o.y >= 0 && o.y <= 1);
};
cc.pIntersectPoint = function(t, e, i, n) {
var o = cc.p(0, 0);
if (cc.pLineIntersect(t, e, i, n, o)) {
var r = cc.p(0, 0);
r.x = t.x + o.x * (e.x - t.x);
r.y = t.y + o.x * (e.y - t.y);
return r;
}
return cc.p(0, 0);
};
cc.pSameAs = function(t, e) {
return null != t && null != e && (t.x === e.x && t.y === e.y);
};
cc.pZeroIn = function(t) {
t.x = 0;
t.y = 0;
};
cc.pIn = function(t, e) {
t.x = e.x;
t.y = e.y;
};
cc.pMultIn = function(t, e) {
t.x *= e;
t.y *= e;
};
cc.pSubIn = function(t, e) {
t.x -= e.x;
t.y -= e.y;
};
cc.pAddIn = function(t, e) {
t.x += e.x;
t.y += e.y;
};
cc.pNormalizeIn = function(t) {
cc.pMultIn(t, 1 / Math.sqrt(t.x * t.x + t.y * t.y));
};
}), {} ],
159: [ (function(i, n, o) {
function r(i, n, o, r) {
if (i && "object" === ("object" == (e = typeof i) ? t(i) : e)) {
n = i.y;
o = i.width;
r = i.height;
i = i.x;
}
this.x = i || 0;
this.y = n || 0;
this.width = o || 0;
this.height = r || 0;
}
var s = i("./CCValueType"), c = i("../platform/js");
c.extend(r, s);
i("../platform/CCClass").fastDefine("cc.Rect", r, {
x: 0,
y: 0,
width: 0,
height: 0
});
r.fromMinMax = function(t, e) {
var i = Math.min(t.x, e.x), n = Math.min(t.y, e.y);
return new r(i, n, Math.max(t.x, e.x) - i, Math.max(t.y, e.y) - n);
};
r.contain = function(t, e) {
return t.x < e.x && t.x + t.width > e.x + e.width && t.y < e.y && t.y + t.height > e.y + e.height ? 1 : e.x < t.x && e.x + e.width > t.x + t.width && e.y < t.y && e.y + e.height > t.y + t.height ? -1 : 0;
};
var a = r.prototype;
a.clone = function() {
return new r(this.x, this.y, this.width, this.height);
};
a.equals = function(t) {
return t && this.x === t.x && this.y === t.y && this.width === t.width && this.height === t.height;
};
a.lerp = function(t, e, i) {
i = i || new r();
var n = this.x, o = this.y, s = this.width, c = this.height;
i.x = n + (t.x - n) * e;
i.y = o + (t.y - o) * e;
i.width = s + (t.width - s) * e;
i.height = c + (t.height - c) * e;
return i;
};
a.toString = function() {
return "(" + this.x.toFixed(2) + ", " + this.y.toFixed(2) + ", " + this.width.toFixed(2) + ", " + this.height.toFixed(2) + ")";
};
c.getset(a, "xMin", (function() {
return this.x;
}), (function(t) {
this.width += this.x - t;
this.x = t;
}));
c.getset(a, "yMin", (function() {
return this.y;
}), (function(t) {
this.height += this.y - t;
this.y = t;
}));
c.getset(a, "xMax", (function() {
return this.x + this.width;
}), (function(t) {
this.width = t - this.x;
}));
c.getset(a, "yMax", (function() {
return this.y + this.height;
}), (function(t) {
this.height = t - this.y;
}));
c.getset(a, "center", (function() {
return new cc.Vec2(this.x + .5 * this.width, this.y + .5 * this.height);
}), (function(t) {
this.x = t.x - .5 * this.width;
this.y = t.y - .5 * this.height;
}));
c.getset(a, "origin", (function() {
return new cc.Vec2(this.x, this.y);
}), (function(t) {
this.x = t.x;
this.y = t.y;
}));
c.getset(a, "size", (function() {
return new cc.Size(this.width, this.height);
}), (function(t) {
this.width = t.width;
this.height = t.height;
}));
a.intersects = function(t) {
return cc.rectIntersectsRect(this, t);
};
a.contains = function(t) {
return this.x <= t.x && this.x + this.width >= t.x && this.y <= t.y && this.y + this.height >= t.y;
};
a.containsRect = function(t) {
return this.x <= t.x && this.x + this.width >= t.x + t.width && this.y <= t.y && this.y + this.height >= t.y + t.height;
};
cc.Rect = r;
cc.rect = function(t, e, i, n) {
return new r(t, e, i, n);
};
cc.rectEqualToRect = function(t, e) {
return t && e && t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height;
};
cc._rectEqualToZero = function(t) {
return t && 0 === t.x && 0 === t.y && 0 === t.width && 0 === t.height;
};
cc.rectContainsRect = function(t, e) {
return !(!t || !e) && !(t.x >= e.x || t.y >= e.y || t.x + t.width <= e.x + e.width || t.y + t.height <= e.y + e.height);
};
cc.rectGetMaxX = function(t) {
return t.x + t.width;
};
cc.rectGetMidX = function(t) {
return t.x + t.width / 2;
};
cc.rectGetMinX = function(t) {
return t.x;
};
cc.rectGetMaxY = function(t) {
return t.y + t.height;
};
cc.rectGetMidY = function(t) {
return t.y + t.height / 2;
};
cc.rectGetMinY = function(t) {
return t.y;
};
cc.rectContainsPoint = function(t, e) {
return e.x >= cc.rectGetMinX(t) && e.x <= cc.rectGetMaxX(t) && e.y >= cc.rectGetMinY(t) && e.y <= cc.rectGetMaxY(t);
};
cc.rectIntersectsRect = function(t, e) {
var i = t.x + t.width, n = t.y + t.height, o = e.x + e.width, r = e.y + e.height;
return !(i < e.x || o < t.x || n < e.y || r < t.y);
};
cc.rectOverlapsRect = function(t, e) {
return !(t.x + t.width < e.x || e.x + e.width < t.x || t.y + t.height < e.y || e.y + e.height < t.y);
};
cc.rectUnion = function(t, e) {
var i = cc.rect(0, 0, 0, 0);
i.x = Math.min(t.x, e.x);
i.y = Math.min(t.y, e.y);
i.width = Math.max(t.x + t.width, e.x + e.width) - i.x;
i.height = Math.max(t.y + t.height, e.y + e.height) - i.y;
return i;
};
cc.rectIntersection = function(t, e) {
var i = cc.rect(Math.max(cc.rectGetMinX(t), cc.rectGetMinX(e)), Math.max(cc.rectGetMinY(t), cc.rectGetMinY(e)), 0, 0);
i.width = Math.min(cc.rectGetMaxX(t), cc.rectGetMaxX(e)) - cc.rectGetMinX(i);
i.height = Math.min(cc.rectGetMaxY(t), cc.rectGetMaxY(e)) - cc.rectGetMinY(i);
return i;
};
n.exports = cc.Rect;
}), {
"../platform/CCClass": 127,
"../platform/js": 142,
"./CCValueType": 163
} ],
160: [ (function(i, n, o) {
function r(i, n) {
if (i && "object" === ("object" == (e = typeof i) ? t(i) : e)) {
n = i.height;
i = i.width;
}
this.width = i || 0;
this.height = n || 0;
}
var s = i("./CCValueType"), c = i("../platform/js");
c.extend(r, s);
i("../platform/CCClass").fastDefine("cc.Size", r, {
width: 0,
height: 0
});
c.get(r, "ZERO", (function() {
return new r(0, 0);
}));
var a = r.prototype;
a.clone = function() {
return new r(this.width, this.height);
};
a.equals = function(t) {
return t && this.width === t.width && this.height === t.height;
};
a.lerp = function(t, e, i) {
i = i || new r();
var n = this.width, o = this.height;
i.width = n + (t.width - n) * e;
i.height = o + (t.height - o) * e;
return i;
};
a.toString = function() {
return "(" + this.width.toFixed(2) + ", " + this.height.toFixed(2) + ")";
};
cc.size = function(t, e) {
return new r(t, e);
};
cc.sizeEqualToSize = function(t, e) {
return t && e && t.width === e.width && t.height === e.height;
};
cc.Size = n.exports = r;
}), {
"../platform/CCClass": 127,
"../platform/js": 142,
"./CCValueType": 163
} ],
161: [ (function(t, e, i) {
cc.Acceleration = function(t, e, i, n) {
this.x = t || 0;
this.y = e || 0;
this.z = i || 0;
this.timestamp = n || 0;
};
cc.BlendFunc = function(t, e) {
this.src = t;
this.dst = e;
};
var n = cc.Enum({
ONE: 1,
ZERO: 0,
SRC_ALPHA: 770,
SRC_COLOR: 768,
DST_ALPHA: 772,
DST_COLOR: 774,
ONE_MINUS_SRC_ALPHA: 771,
ONE_MINUS_SRC_COLOR: 769,
ONE_MINUS_DST_ALPHA: 773,
ONE_MINUS_DST_COLOR: 775
});
cc.BlendFunc._disable = function() {
return new cc.BlendFunc(n.ONE, n.ZERO);
};
cc.BlendFunc._alphaPremultiplied = function() {
return new cc.BlendFunc(n.ONE, n.ONE_MINUS_SRC_ALPHA);
};
cc.BlendFunc._alphaNonPremultiplied = function() {
return new cc.BlendFunc(n.SRC_ALPHA, n.ONE_MINUS_SRC_ALPHA);
};
cc.BlendFunc._additive = function() {
return new cc.BlendFunc(n.SRC_ALPHA, n.ONE);
};
cc.BlendFunc.BlendFactor = n;
cc.BlendFunc.DISABLE;
cc.js.get(cc.BlendFunc, "DISABLE", cc.BlendFunc._disable);
cc.BlendFunc.ALPHA_PREMULTIPLIED;
cc.js.get(cc.BlendFunc, "ALPHA_PREMULTIPLIED", cc.BlendFunc._alphaPremultiplied);
cc.BlendFunc.ALPHA_NON_PREMULTIPLIED;
cc.js.get(cc.BlendFunc, "ALPHA_NON_PREMULTIPLIED", cc.BlendFunc._alphaNonPremultiplied);
cc.BlendFunc.ADDITIVE;
cc.js.get(cc.BlendFunc, "ADDITIVE", cc.BlendFunc._additive);
cc.blendFuncDisable = cc.BlendFunc._disable;
cc.TextAlignment = cc.Enum({
LEFT: 0,
CENTER: 1,
RIGHT: 2
});
cc.VerticalTextAlignment = cc.Enum({
TOP: 0,
CENTER: 1,
BOTTOM: 2
});
}), {} ],
162: [ (function(i, n, o) {
cc.WebGLColor = function(i, n, o, r, s, c) {
this._arrayBuffer = s || new ArrayBuffer(cc.WebGLColor.BYTES_PER_ELEMENT);
this._offset = c || 0;
var a = this._arrayBuffer, l = this._offset;
this._view = new Uint8Array(a, l, 4);
this._view[0] = i || 0;
this._view[1] = n || 0;
this._view[2] = o || 0;
if ("number" === ("object" == (e = typeof r) ? t(r) : e)) this._view[3] = r; else {
this._view[3] = 255;
this.a_undefined = !0;
}
};
cc.WebGLColor.BYTES_PER_ELEMENT = 4;
(r = cc.WebGLColor.prototype)._getR = function() {
return this._view[0];
};
r._setR = function(t) {
this._view[0] = t < 0 ? 0 : t;
};
r._getG = function() {
return this._view[1];
};
r._setG = function(t) {
this._view[1] = t < 0 ? 0 : t;
};
r._getB = function() {
return this._view[2];
};
r._setB = function(t) {
this._view[2] = t < 0 ? 0 : t;
};
r._getA = function() {
return this._view[3];
};
r._setA = function(t) {
this._view[3] = t < 0 ? 0 : t;
};
r.r;
cc.js.getset(r, "r", r._getR, r._setR);
r.g;
cc.js.getset(r, "g", r._getG, r._setG);
r.b;
cc.js.getset(r, "b", r._getB, r._setB);
r.a;
cc.js.getset(r, "a", r._getA, r._setA);
cc.Vertex2F = function(t, e, i, n) {
this._arrayBuffer = i || new ArrayBuffer(cc.Vertex2F.BYTES_PER_ELEMENT);
this._offset = n || 0;
this._view = new Float32Array(this._arrayBuffer, this._offset, 2);
this._view[0] = t || 0;
this._view[1] = e || 0;
};
cc.Vertex2F.BYTES_PER_ELEMENT = 8;
var r;
(r = cc.Vertex2F.prototype)._getX = function() {
return this._view[0];
};
r._setX = function(t) {
this._view[0] = t;
};
r._getY = function() {
return this._view[1];
};
r._setY = function(t) {
this._view[1] = t;
};
cc.js.getset(r, "x", r._getX, r._setX);
cc.js.getset(r, "y", r._getY, r._setY);
cc.Vertex3F = function(t, e, i, n, o) {
this._arrayBuffer = n || new ArrayBuffer(cc.Vertex3F.BYTES_PER_ELEMENT);
this._offset = o || 0;
var r = this._arrayBuffer, s = this._offset;
this._view = new Float32Array(r, s, 3);
this._view[0] = t || 0;
this._view[1] = e || 0;
this._view[2] = i || 0;
};
cc.Vertex3F.BYTES_PER_ELEMENT = 12;
(r = cc.Vertex3F.prototype)._getX = function() {
return this._view[0];
};
r._setX = function(t) {
this._view[0] = t;
};
r._getY = function() {
return this._view[1];
};
r._setY = function(t) {
this._view[1] = t;
};
r._getZ = function() {
return this._view[2];
};
r._setZ = function(t) {
this._view[2] = t;
};
cc.js.getset(r, "x", r._getX, r._setX);
cc.js.getset(r, "y", r._getY, r._setY);
cc.js.getset(r, "z", r._getZ, r._setZ);
cc.Tex2F = function(t, e, i, n) {
this._arrayBuffer = i || new ArrayBuffer(cc.Tex2F.BYTES_PER_ELEMENT);
this._offset = n || 0;
this._view = new Float32Array(this._arrayBuffer, this._offset, 2);
this._view[0] = t || 0;
this._view[1] = e || 0;
};
cc.Tex2F.BYTES_PER_ELEMENT = 8;
(r = cc.Tex2F.prototype)._getU = function() {
return this._view[0];
};
r._setU = function(t) {
this._view[0] = t;
};
r._getV = function() {
return this._view[1];
};
r._setV = function(t) {
this._view[1] = t;
};
cc.js.getset(r, "u", r._getU, r._setU);
cc.js.getset(r, "v", r._getV, r._setV);
cc.Quad2 = function(t, e, i, n, o, r) {
this._arrayBuffer = o || new ArrayBuffer(cc.Quad2.BYTES_PER_ELEMENT);
this._offset = r || 0;
var s = this._arrayBuffer, c = this._offset, a = cc.Vertex2F.BYTES_PER_ELEMENT;
this._tl = t ? new cc.Vertex2F(t.x, t.y, s, c) : new cc.Vertex2F(0, 0, s, c);
c += a;
this._tr = e ? new cc.Vertex2F(e.x, e.y, s, c) : new cc.Vertex2F(0, 0, s, c);
c += a;
this._bl = i ? new cc.Vertex2F(i.x, i.y, s, c) : new cc.Vertex2F(0, 0, s, c);
c += a;
this._br = n ? new cc.Vertex2F(n.x, n.y, s, c) : new cc.Vertex2F(0, 0, s, c);
};
cc.Quad2.BYTES_PER_ELEMENT = 32;
(r = cc.Quad2.prototype)._getTL = function() {
return this._tl;
};
r._setTL = function(t) {
this._tl._view[0] = t.x;
this._tl._view[1] = t.y;
};
r._getTR = function() {
return this._tr;
};
r._setTR = function(t) {
this._tr._view[0] = t.x;
this._tr._view[1] = t.y;
};
r._getBL = function() {
return this._bl;
};
r._setBL = function(t) {
this._bl._view[0] = t.x;
this._bl._view[1] = t.y;
};
r._getBR = function() {
return this._br;
};
r._setBR = function(t) {
this._br._view[0] = t.x;
this._br._view[1] = t.y;
};
cc.js.getset(r, "tl", r._getTL, r._setTL);
cc.js.getset(r, "tr", r._getTR, r._setTR);
cc.js.getset(r, "bl", r._getBL, r._setBL);
cc.js.getset(r, "br", r._getBR, r._setBR);
cc.Quad3 = function(t, e, i, n, o, r) {
this._arrayBuffer = o || new ArrayBuffer(cc.Quad3.BYTES_PER_ELEMENT);
this._offset = r || 0;
var s = this._arrayBuffer, c = this._offset, a = cc.Vertex3F.BYTES_PER_ELEMENT;
this.bl = bl ? new cc.Vertex3F(bl.x, bl.y, bl.z, s, c) : new cc.Vertex3F(0, 0, 0, s, c);
c += a;
this.br = br ? new cc.Vertex3F(br.x, br.y, br.z, s, c) : new cc.Vertex3F(0, 0, 0, s, c);
c += a;
this.tl = tl ? new cc.Vertex3F(tl.x, tl.y, tl.z, s, c) : new cc.Vertex3F(0, 0, 0, s, c);
c += a;
this.tr = tr ? new cc.Vertex3F(tr.x, tr.y, tr.z, s, c) : new cc.Vertex3F(0, 0, 0, s, c);
};
cc.Quad3.BYTES_PER_ELEMENT = 48;
cc.V3F_C4B_T2F = function(t, e, i, n, o) {
this._arrayBuffer = n || new ArrayBuffer(cc.V3F_C4B_T2F.BYTES_PER_ELEMENT);
this._offset = o || 0;
var r = this._arrayBuffer, s = this._offset;
this._vertices = t ? new cc.Vertex3F(t.x, t.y, t.z, r, s) : new cc.Vertex3F(0, 0, 0, r, s);
s += cc.Vertex3F.BYTES_PER_ELEMENT;
this._colors = e ? new cc.WebGLColor(e.r, e.g, e.b, e.a, r, s) : new cc.WebGLColor(0, 0, 0, 0, r, s);
s += cc.WebGLColor.BYTES_PER_ELEMENT;
this._texCoords = i ? new cc.Tex2F(i.u, i.v, r, s) : new cc.Tex2F(0, 0, r, s);
};
cc.V3F_C4B_T2F.BYTES_PER_ELEMENT = 24;
(r = cc.V3F_C4B_T2F.prototype)._getVertices = function() {
return this._vertices;
};
r._setVertices = function(t) {
var e = this._vertices;
e._view[0] = t.x;
e._view[1] = t.y;
e._view[2] = t.z;
};
r._getColor = function() {
return this._colors;
};
r._setColor = function(t) {
var e = this._colors;
e._view[0] = t.r;
e._view[1] = t.g;
e._view[2] = t.b;
e._view[3] = t.a;
};
r._getTexCoords = function() {
return this._texCoords;
};
r._setTexCoords = function(t) {
this._texCoords._view[0] = t.u;
this._texCoords._view[1] = t.v;
};
cc.js.getset(r, "vertices", r._getVertices, r._setVertices);
cc.js.getset(r, "colors", r._getColor, r._setColor);
cc.js.getset(r, "texCoords", r._getTexCoords, r._setTexCoords);
cc.V3F_C4B_T2F_Quad = function(t, e, i, n, o, r) {
this._arrayBuffer = o || new ArrayBuffer(cc.V3F_C4B_T2F_Quad.BYTES_PER_ELEMENT);
this._offset = r || 0;
var s = this._arrayBuffer, c = this._offset, a = cc.V3F_C4B_T2F.BYTES_PER_ELEMENT;
this._tl = t ? new cc.V3F_C4B_T2F(t.vertices, t.colors, t.texCoords, s, c) : new cc.V3F_C4B_T2F(null, null, null, s, c);
c += a;
this._bl = e ? new cc.V3F_C4B_T2F(e.vertices, e.colors, e.texCoords, s, c) : new cc.V3F_C4B_T2F(null, null, null, s, c);
c += a;
this._tr = i ? new cc.V3F_C4B_T2F(i.vertices, i.colors, i.texCoords, s, c) : new cc.V3F_C4B_T2F(null, null, null, s, c);
c += a;
this._br = n ? new cc.V3F_C4B_T2F(n.vertices, n.colors, n.texCoords, s, c) : new cc.V3F_C4B_T2F(null, null, null, s, c);
};
cc.V3F_C4B_T2F_Quad.BYTES_PER_ELEMENT = 96;
(r = cc.V3F_C4B_T2F_Quad.prototype)._getTL = function() {
return this._tl;
};
r._setTL = function(t) {
var e = this._tl;
e.vertices = t.vertices;
e.colors = t.colors;
e.texCoords = t.texCoords;
};
r._getBL = function() {
return this._bl;
};
r._setBL = function(t) {
var e = this._bl;
e.vertices = t.vertices;
e.colors = t.colors;
e.texCoords = t.texCoords;
};
r._getTR = function() {
return this._tr;
};
r._setTR = function(t) {
var e = this._tr;
e.vertices = t.vertices;
e.colors = t.colors;
e.texCoords = t.texCoords;
};
r._getBR = function() {
return this._br;
};
r._setBR = function(t) {
var e = this._br;
e.vertices = t.vertices;
e.colors = t.colors;
e.texCoords = t.texCoords;
};
r._getArrayBuffer = function() {
return this._arrayBuffer;
};
cc.js.getset(r, "tl", r._getTL, r._setTL);
cc.js.getset(r, "tr", r._getTR, r._setTR);
cc.js.getset(r, "bl", r._getBL, r._setBL);
cc.js.getset(r, "br", r._getBR, r._setBR);
cc.js.get(r, "arrayBuffer", r._getArrayBuffer);
cc.V3F_C4B_T2F_QuadZero = function() {
return new cc.V3F_C4B_T2F_Quad();
};
cc.V3F_C4B_T2F_QuadCopy = function(t) {
if (!t) return cc.V3F_C4B_T2F_QuadZero();
var e = t.tl, i = t.bl, n = t.tr, o = t.br;
return {
tl: {
vertices: {
x: e.vertices.x,
y: e.vertices.y,
z: e.vertices.z
},
colors: {
r: e.colors.r,
g: e.colors.g,
b: e.colors.b,
a: e.colors.a
},
texCoords: {
u: e.texCoords.u,
v: e.texCoords.v
}
},
bl: {
vertices: {
x: i.vertices.x,
y: i.vertices.y,
z: i.vertices.z
},
colors: {
r: i.colors.r,
g: i.colors.g,
b: i.colors.b,
a: i.colors.a
},
texCoords: {
u: i.texCoords.u,
v: i.texCoords.v
}
},
tr: {
vertices: {
x: n.vertices.x,
y: n.vertices.y,
z: n.vertices.z
},
colors: {
r: n.colors.r,
g: n.colors.g,
b: n.colors.b,
a: n.colors.a
},
texCoords: {
u: n.texCoords.u,
v: n.texCoords.v
}
},
br: {
vertices: {
x: o.vertices.x,
y: o.vertices.y,
z: o.vertices.z
},
colors: {
r: o.colors.r,
g: o.colors.g,
b: o.colors.b,
a: o.colors.a
},
texCoords: {
u: o.texCoords.u,
v: o.texCoords.v
}
}
};
};
cc.V3F_C4B_T2F_QuadsCopy = function(t) {
if (!t) return [];
for (var e = [], i = 0; i < t.length; i++) e.push(cc.V3F_C4B_T2F_QuadCopy(t[i]));
return e;
};
cc.V2F_C4B_T2F = function(t, e, i, n, o) {
this._arrayBuffer = n || new ArrayBuffer(cc.V2F_C4B_T2F.BYTES_PER_ELEMENT);
this._offset = o || 0;
var r = this._arrayBuffer, s = this._offset;
this._vertices = t ? new cc.Vertex2F(t.x, t.y, r, s) : new cc.Vertex2F(0, 0, r, s);
s += cc.Vertex2F.BYTES_PER_ELEMENT;
this._colors = e ? new cc.WebGLColor(e.r, e.g, e.b, e.a, r, s) : new cc.WebGLColor(0, 0, 0, 0, r, s);
s += cc.WebGLColor.BYTES_PER_ELEMENT;
this._texCoords = i ? new cc.Tex2F(i.u, i.v, r, s) : new cc.Tex2F(0, 0, r, s);
};
cc.V2F_C4B_T2F.BYTES_PER_ELEMENT = 20;
(r = cc.V2F_C4B_T2F.prototype)._getVertices = function() {
return this._vertices;
};
r._setVertices = function(t) {
this._vertices._view[0] = t.x;
this._vertices._view[1] = t.y;
};
r._getColor = function() {
return this._colors;
};
r._setColor = function(t) {
var e = this._colors;
e._view[0] = t.r;
e._view[1] = t.g;
e._view[2] = t.b;
e._view[3] = t.a;
};
r._getTexCoords = function() {
return this._texCoords;
};
r._setTexCoords = function(t) {
this._texCoords._view[0] = t.u;
this._texCoords._view[1] = t.v;
};
cc.js.getset(r, "vertices", r._getVertices, r._setVertices);
cc.js.getset(r, "colors", r._getColor, r._setColor);
cc.js.getset(r, "texCoords", r._getTexCoords, r._setTexCoords);
cc.V2F_C4B_T2F_Triangle = function(t, e, i, n, o) {
this._arrayBuffer = n || new ArrayBuffer(cc.V2F_C4B_T2F_Triangle.BYTES_PER_ELEMENT);
this._offset = o || 0;
var r = this._arrayBuffer, s = this._offset, c = cc.V2F_C4B_T2F.BYTES_PER_ELEMENT;
this._a = t ? new cc.V2F_C4B_T2F(t.vertices, t.colors, t.texCoords, r, s) : new cc.V2F_C4B_T2F(null, null, null, r, s);
s += c;
this._b = e ? new cc.V2F_C4B_T2F(e.vertices, e.colors, e.texCoords, r, s) : new cc.V2F_C4B_T2F(null, null, null, r, s);
s += c;
this._c = i ? new cc.V2F_C4B_T2F(i.vertices, i.colors, i.texCoords, r, s) : new cc.V2F_C4B_T2F(null, null, null, r, s);
};
cc.V2F_C4B_T2F_Triangle.BYTES_PER_ELEMENT = 60;
(r = cc.V2F_C4B_T2F_Triangle.prototype)._getA = function() {
return this._a;
};
r._setA = function(t) {
var e = this._a;
e.vertices = t.vertices;
e.colors = t.colors;
e.texCoords = t.texCoords;
};
r._getB = function() {
return this._b;
};
r._setB = function(t) {
var e = this._b;
e.vertices = t.vertices;
e.colors = t.colors;
e.texCoords = t.texCoords;
};
r._getC = function() {
return this._c;
};
r._setC = function(t) {
var e = this._c;
e.vertices = t.vertices;
e.colors = t.colors;
e.texCoords = t.texCoords;
};
cc.js.getset(r, "a", r._getA, r._setA);
cc.js.getset(r, "b", r._getB, r._setB);
cc.js.getset(r, "c", r._getC, r._setC);
}), {} ],
163: [ (function(t, e, i) {
function n() {}
var o = t("../platform/js");
o.setClassName("cc.ValueType", n);
var r = n.prototype;
0;
r.toString = function() {
return "" + {};
};
cc.ValueType = n;
e.exports = n;
}), {
"../platform/js": 142
} ],
164: [ (function(i, n, o) {
function r(i, n) {
if (i && "object" === ("object" == (e = typeof i) ? t(i) : e)) {
n = i.y;
i = i.x;
}
this.x = i || 0;
this.y = n || 0;
}
var s = i("./CCValueType"), c = i("../platform/js"), a = i("../platform/CCClass");
c.extend(r, s);
a.fastDefine("cc.Vec2", r, {
x: 0,
y: 0
});
var l = r.prototype;
l.clone = function() {
return new r(this.x, this.y);
};
l.set = function(t) {
this.x = t.x;
this.y = t.y;
return this;
};
l.equals = function(t) {
return t && this.x === t.x && this.y === t.y;
};
l.toString = function() {
return "(" + this.x.toFixed(2) + ", " + this.y.toFixed(2) + ")";
};
l.lerp = function(t, e, i) {
i = i || new r();
var n = this.x, o = this.y;
i.x = n + (t.x - n) * e;
i.y = o + (t.y - o) * e;
return i;
};
l.addSelf = function(t) {
this.x += t.x;
this.y += t.y;
return this;
};
l.add = function(t, e) {
(e = e || new r()).x = this.x + t.x;
e.y = this.y + t.y;
return e;
};
l.subSelf = function(t) {
this.x -= t.x;
this.y -= t.y;
return this;
};
l.sub = function(t, e) {
(e = e || new r()).x = this.x - t.x;
e.y = this.y - t.y;
return e;
};
l.mulSelf = function(t) {
this.x *= t;
this.y *= t;
return this;
};
l.mul = function(t, e) {
(e = e || new r()).x = this.x * t;
e.y = this.y * t;
return e;
};
l.scaleSelf = function(t) {
this.x *= t.x;
this.y *= t.y;
return this;
};
l.scale = function(t, e) {
(e = e || new r()).x = this.x * t.x;
e.y = this.y * t.y;
return e;
};
l.divSelf = function(t) {
this.x /= t;
this.y /= t;
return this;
};
l.div = function(t, e) {
(e = e || new r()).x = this.x / t;
e.y = this.y / t;
return e;
};
l.negSelf = function() {
this.x = -this.x;
this.y = -this.y;
return this;
};
l.neg = function(t) {
(t = t || new r()).x = -this.x;
t.y = -this.y;
return t;
};
l.dot = function(t) {
return this.x * t.x + this.y * t.y;
};
l.cross = function(t) {
return this.y * t.x - this.x * t.y;
};
l.mag = function() {
return Math.sqrt(this.x * this.x + this.y * this.y);
};
l.magSqr = function() {
return this.x * this.x + this.y * this.y;
};
l.normalizeSelf = function() {
var t = this.x * this.x + this.y * this.y;
if (1 === t) return this;
if (0 === t) {
console.warn("Can't normalize zero vector");
return this;
}
var e = 1 / Math.sqrt(t);
this.x *= e;
this.y *= e;
return this;
};
l.normalize = function(t) {
(t = t || new r()).x = this.x;
t.y = this.y;
t.normalizeSelf();
return t;
};
l.angle = function(t) {
var e = this.magSqr(), i = t.magSqr();
if (0 === e || 0 === i) {
console.warn("Can't get angle between zero vector");
return 0;
}
var n = this.dot(t) / Math.sqrt(e * i);
n = cc.clampf(n, -1, 1);
return Math.acos(n);
};
l.signAngle = function(t) {
return Math.atan2(this.y, this.x) - Math.atan2(t.y, t.x);
};
l.rotate = function(t, e) {
(e = e || new r()).x = this.x;
e.y = this.y;
return e.rotateSelf(t);
};
l.rotateSelf = function(t) {
var e = Math.sin(t), i = Math.cos(t), n = this.x;
this.x = i * n - e * this.y;
this.y = e * n + i * this.y;
return this;
};
c.get(r, "ONE", (function() {
return new r(1, 1);
}));
c.get(r, "ZERO", (function() {
return new r(0, 0);
}));
c.get(r, "UP", (function() {
return new r(0, 1);
}));
c.get(r, "RIGHT", (function() {
return new r(1, 0);
}));
cc.Vec2 = r;
cc.v2 = function(t, e) {
return new r(t, e);
};
cc.p = cc.v2;
cc.pointEqualToPoint = function(t, e) {
return t && e && t.x === e.x && t.y === e.y;
};
n.exports = cc.Vec2;
}), {
"../platform/CCClass": 127,
"../platform/js": 142,
"./CCValueType": 163
} ],
165: [ (function(t, e, i) {
t("./CCValueType");
t("./CCVec2");
t("./CCPointExtension");
t("./CCSize");
t("./CCRect");
t("./CCColor");
t("./CCTypes");
t("./CCAffineTransform");
t("./CCTypesWebGL");
}), {
"./CCAffineTransform": 156,
"./CCColor": 157,
"./CCPointExtension": 158,
"./CCRect": 159,
"./CCSize": 160,
"./CCTypes": 161,
"./CCTypesWebGL": 162,
"./CCValueType": 163,
"./CCVec2": 164
} ],
166: [ (function(t, e, i) {
cc.js;
}), {} ],
167: [ (function(t, e, i) {
t("./CCSGMotionStreak");
t("./CCSGMotionStreakWebGLRenderCmd");
var n = cc.Class({
name: "cc.MotionStreak",
extends: cc.Component,
editor: !1,
ctor: function() {
this._root = null;
this._motionStreak = null;
},
properties: {
preview: {
default: !1,
editorOnly: !0,
notify: !1,
animatable: !1
},
_fadeTime: 1,
fadeTime: {
get: function() {
return this._fadeTime;
},
set: function(t) {
this._fadeTime = t;
this._motionStreak && this._motionStreak.setFadeTime(t);
},
animatable: !1,
tooltip: !1
},
_minSeg: 1,
minSeg: {
get: function() {
return this._minSeg;
},
set: function(t) {
this._minSeg = t;
this._motionStreak && this._motionStreak.setMinSeg(t);
},
animatable: !1,
tooltip: !1
},
_stroke: 64,
stroke: {
get: function() {
return this._stroke;
},
set: function(t) {
this._stroke = t;
this._motionStreak && this._motionStreak.setStroke(t);
},
animatable: !1,
tooltip: !1
},
_texture: {
default: "",
url: cc.Texture2D
},
texture: {
get: function() {
return this._texture;
},
set: function(t) {
this._texture = t;
if (this._motionStreak) {
t && cc.js.isString(t) && (t = cc.textureCache.addImage(t));
this._motionStreak.setTexture(t);
}
},
url: cc.Texture2D,
animatable: !1,
tooltip: !1
},
_color: cc.Color.WHITE,
color: {
get: function() {
return this._color;
},
set: function(t) {
this._color = t;
this._motionStreak && this._motionStreak.tintWithColor(t);
},
tooltip: !1
},
_fastMode: !1,
fastMode: {
get: function() {
return this._fastMode;
},
set: function(t) {
this._fastMode = t;
this._motionStreak && this._motionStreak.setFastMode(t);
},
animatable: !1,
tooltip: !1
}
},
onFocusInEditor: !1,
onLostFocusInEditor: !1,
reset: function() {
this._motionStreak.reset();
},
__preload: function() {
cc._renderType, cc.game.RENDER_TYPE_WEBGL, 0;
this._root = new _ccsg.Node();
var t = new _ccsg.MotionStreak();
t.initWithFade(this._fadeTime, this._minSeg, this._stroke, this.node.color, this._texture || null);
t.setFastMode(this._fastMode);
this._root.addChild(t);
var e = this.node._sgNode;
e && e.addChild(this._root, -10);
this._motionStreak = t;
},
onEnable: function() {
this.node.on("position-changed", this._onNodePositionChanged, this);
},
onDisable: function() {
this.node.off("position-changed", this._onNodePositionChanged, this);
},
_onNodePositionChanged: function() {
0;
if (this._motionStreak) {
var t = this.node, e = t.getNodeToWorldTransform(), i = e.tx - (t.width / 2 + t.anchorX * t.width), n = e.ty - (t.height / 2 + t.anchorY * t.height);
this._root.setPosition(-i, -n);
this._motionStreak.setPosition(i, n);
}
}
});
cc.MotionStreak = e.exports = n;
}), {
"./CCSGMotionStreak": 1,
"./CCSGMotionStreakWebGLRenderCmd": 1
} ],
168: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.ParticleAsset",
extends: cc.RawAsset
});
cc.ParticleAsset = e.exports = n;
}), {} ],
169: [ (function(t, e, i) {
t("./CCParticleAsset");
t("./CCSGParticleSystem");
t("./CCSGParticleSystemCanvasRenderCmd");
t("./CCSGParticleSystemWebGLRenderCmd");
var n = cc.BlendFunc.BlendFactor, o = cc.Enum({
GRAVITY: 0,
RADIUS: 1
}), r = cc.Enum({
FREE: 0,
RELATIVE: 1,
GROUPED: 2
}), s = {
preview: {
default: !0,
editorOnly: !0,
notify: !1,
animatable: !1,
tooltip: !1
},
_custom: !1,
custom: {
get: function() {
return this._custom;
},
set: function(t) {
0;
if (this._custom !== t) {
this._custom = t;
t ? this._applyCustoms() : this._applyFile();
0;
}
},
animatable: !1,
tooltip: !1
},
_file: {
default: "",
url: cc.ParticleAsset
},
file: {
get: function() {
return this._file;
},
set: function(t, e) {
if (this._file !== t) {
this._file = t;
if (t) {
this._applyFile();
0;
} else this.custom = !0;
}
},
animatable: !1,
url: cc.ParticleAsset,
tooltip: !1
},
_texture: {
default: "",
url: cc.Texture2D
},
texture: {
get: function() {
return this._texture;
},
set: function(t) {
this._texture = t;
this._sgNode.texture = t ? cc.textureCache.addImage(t) : null;
!t && this._file && this._applyFile();
},
url: cc.Texture2D,
tooltip: !1
},
particleCount: {
get: function() {
return this._sgNode.particleCount;
},
set: function(t) {
this._sgNode.particleCount = t;
},
visible: !1,
tooltip: !1
},
_srcBlendFactor: n.SRC_ALPHA,
srcBlendFactor: {
get: function() {
return this._srcBlendFactor;
},
set: function(t) {
this._srcBlendFactor = t;
this._blendFunc.src = t;
this._sgNode.setBlendFunc(this._blendFunc);
},
animatable: !1,
type: n,
tooltip: !1
},
_dstBlendFactor: n.ONE_MINUS_SRC_ALPHA,
dstBlendFactor: {
get: function() {
return this._dstBlendFactor;
},
set: function(t) {
this._dstBlendFactor = t;
this._blendFunc.dst = t;
this._sgNode.setBlendFunc(this._blendFunc);
},
animatable: !1,
type: n,
tooltip: !1
},
playOnLoad: !0,
_autoRemoveOnFinish: !1,
autoRemoveOnFinish: {
get: function() {
return this._autoRemoveOnFinish;
},
set: function(t) {
if (this._autoRemoveOnFinish !== t) {
this._autoRemoveOnFinish = t;
this._applyAutoRemove();
}
},
animatable: !1,
tooltip: !1
},
active: {
get: function() {
return !!this._sgNode && this._sgNode.isActive();
},
visible: !1
}
}, c = (function() {
for (var t = {
totalParticles: 150,
duration: -1,
emissionRate: 10,
life: 1,
lifeVar: 0,
startColor: cc.Color.WHITE,
startColorVar: cc.Color.BLACK,
endColor: cc.color(255, 255, 255, 0),
endColorVar: cc.color(0, 0, 0, 0),
angle: 90,
angleVar: 20,
startSize: 50,
startSizeVar: 0,
endSize: 0,
endSizeVar: 0,
startSpin: 0,
startSpinVar: 0,
endSpin: 0,
endSpinVar: 0,
sourcePos: cc.p(0, 0),
posVar: cc.p(0, 0),
positionType: r.FREE,
emitterMode: o.GRAVITY,
gravity: cc.p(0, 0),
speed: 180,
speedVar: 50,
tangentialAccel: 80,
tangentialAccelVar: 0,
radialAccel: 0,
radialAccelVar: 0,
rotationIsDir: !1,
startRadius: 0,
startRadiusVar: 0,
endRadius: 0,
endRadiusVar: 0,
rotatePerS: 0,
rotatePerSVar: 0
}, e = Object.keys(t), i = 0; i < e.length; ++i) {
var n = e[i];
(function(t, e) {
var i = "_" + t;
s[i] = e;
var n = e.constructor, o = s[t] = {};
if (cc.isChildClassOf(n, cc.ValueType)) {
o.get = function() {
return new n(this[i]);
};
o.type = n;
} else o.get = function() {
return this[i];
};
if (cc.isChildClassOf(n, cc.ValueType)) o.set = function(e) {
this[i] = new n(e);
this._sgNode[t] = e;
}; else {
o.set = function(e) {
this[i] = e;
this._sgNode[t] = e;
};
}
})(n, t[n]);
}
return e;
})();
s.positionType.type = r;
s.emitterMode.type = o;
var a = cc.Class({
name: "cc.ParticleSystem",
extends: cc._RendererUnderSG,
editor: !1,
ctor: function() {
this._previewTimer = null;
this._focused = !1;
this._willStart = !1;
this._blendFunc = new cc.BlendFunc(0, 0);
this._originOnExit = null;
},
properties: s,
statics: {
DURATION_INFINITY: -1,
START_SIZE_EQUAL_TO_END_SIZE: -1,
START_RADIUS_EQUAL_TO_END_RADIUS: -1,
EmitterMode: o,
PositionType: r
},
__preload: function() {
this._super();
this.playOnLoad && this.resetSystem();
this._applyAutoRemove();
},
onDestroy: function() {
this._autoRemoveOnFinish && (this.autoRemoveOnFinish = !1);
this._super();
},
onFocusInEditor: !1,
onLostFocusInEditor: !1,
_createSgNode: function() {
return new _ccsg.ParticleSystem();
},
_initSgNode: function() {
var t = this._sgNode;
if (this._file) if (this._custom) {
!this._texture ? this._applyFile() : this._applyCustoms();
} else this._applyFile(); else this._custom && this._applyCustoms();
t.stopSystem();
},
addParticle: function() {
return this._sgNode.addParticle();
},
stopSystem: function() {
this._sgNode.stopSystem();
},
resetSystem: function() {
this._sgNode.resetSystem();
},
isFull: function() {
return this.particleCount >= this._totalParticles;
},
setDisplayFrame: function(t) {
if (t) {
var e = t.getTexture();
e && (this._texture = e.url);
this._sgNode.setDisplayFrame(t);
}
},
setTextureWithRect: function(t, e) {
t instanceof cc.Texture2D && (this._texture = t.url);
this._sgNode.setTextureWithRect(t, e);
},
_applyFile: function() {
var t = this._file;
if (t) {
var e = this;
cc.loader.load(t, (function(i, n) {
if (i || !n) throw i || new Error("Unkown error");
if (e.isValid) {
var o = e._sgNode;
o.particleCount = 0;
var r = o.isActive();
o.initWithFile(t);
n.textureUuid && cc.AssetLibrary.queryAssetInfo(n.textureUuid, (function(t, i, n) {
t ? cc.error(t) : e.texture = i;
}));
n.emissionRate && (e.emissionRate = n.emissionRate);
o.setPosition(0, 0);
r || o.stopSystem();
e._applyAutoRemove();
e._custom && e._applyCustoms();
}
}));
}
},
_applyCustoms: function() {
for (var t = this._sgNode, e = t.isActive(), i = 0; i < c.length; i++) {
var n = c[i];
t[n] = this["_" + n];
}
this._blendFunc.src = this._srcBlendFactor;
this._blendFunc.dst = this._dstBlendFactor;
t.setBlendFunc(this._blendFunc);
this._texture && (t.texture = cc.textureCache.addImage(this._texture));
e || t.stopSystem();
this._applyAutoRemove();
},
_applyAutoRemove: function() {
var t = this._sgNode, e = this._autoRemoveOnFinish;
t.autoRemoveOnFinish = e;
if (e) {
if (this._originOnExit) return;
this._originOnExit = t.onExit;
var i = this;
t.onExit = function() {
i._originOnExit.call(this);
i.node.destroy();
};
} else if (this._originOnExit) {
t.onExit = this._originOnExit;
this._originOnExit = null;
}
}
});
cc.ParticleSystem = e.exports = a;
}), {
"./CCParticleAsset": 168,
"./CCSGParticleSystem": 1,
"./CCSGParticleSystemCanvasRenderCmd": 1,
"./CCSGParticleSystemWebGLRenderCmd": 1
} ],
170: [ (function(t, e, i) {
t("./CCSGTMXLayer");
t("./CCTMXLayerCanvasRenderCmd");
t("./CCTMXLayerWebGLRenderCmd");
var n = cc.Class({
name: "cc.TiledLayer",
extends: cc._SGComponent,
onEnable: function() {
this._sgNode && this._sgNode.setVisible(!0);
},
onDisable: function() {
this._sgNode && this._sgNode.setVisible(!1);
},
onDestroy: function() {
this.node._sizeProvider === this._sgNode && (this.node._sizeProvider = null);
},
_initSgNode: function() {
var t = this._sgNode;
if (t) {
this.enabledInHierarchy || t.setVisible(!1);
this._registSizeProvider();
var e = this.node;
t.setAnchorPoint(e.getAnchorPoint());
}
},
_replaceSgNode: function(t) {
if (t !== this._sgNode) {
this._removeSgNode();
this.node._sizeProvider === this._sgNode && (this.node._sizeProvider = null);
if (t && t instanceof _ccsg.TMXLayer) {
this._sgNode = t;
t.retain();
this._initSgNode();
} else this._sgNode = null;
}
},
getLayerName: function() {
return this._sgNode ? this._sgNode.getLayerName() : "";
},
setLayerName: function(t) {
this._sgNode && this._sgNode.setLayerName(t);
},
getProperty: function(t) {
return this._sgNode ? this._sgNode.getProperty(t) : null;
},
getPositionAt: function(t, e) {
if (this._sgNode) {
void 0 !== e && (t = cc.p(t, e));
return this._sgNode.getPositionAt(t);
}
return null;
},
removeTileAt: function(t, e) {
if (this._sgNode) {
void 0 !== e && (t = cc.p(t, e));
this._sgNode.removeTileAt(t);
}
},
setTileGID: function(t, e, i, n) {
if (this._sgNode) {
if (void 0 === e) throw new Error("_ccsg.TMXLayer.setTileGID(): pos should be non-null");
var o;
if (void 0 === n && e instanceof cc.Vec2) {
o = e;
n = i;
} else o = cc.p(e, i);
this._sgNode.setTileGID(t, o, n);
}
},
getTileGIDAt: function(t, e) {
if (this._sgNode) {
void 0 !== e && (t = cc.p(t, e));
return this._sgNode.getTileGIDAt(t);
}
return 0;
},
getTileAt: function(t, e) {
if (this._sgNode) {
void 0 !== e && (t = cc.p(t, e));
return this._sgNode.getTileAt(t);
}
return null;
},
releaseMap: function() {
this._sgNode && this._sgNode.releaseMap();
},
setContentSize: function(t, e) {
if (this._sgNode) {
void 0 !== e && (t = cc.size(t, e));
this._sgNode.setContentSize(t);
}
},
getTexture: function() {
return this._sgNode ? this._sgNode.getTexture() : null;
},
setTexture: function(t) {
this._sgNode && this._sgNode.setTexture(t);
},
setTileOpacity: function(t) {
this._sgNode && this._sgNode.setTileOpacity(t);
},
getLayerSize: function() {
return this._sgNode ? this._sgNode.getLayerSize() : cc.size(0, 0);
},
setLayerSize: function(t) {
this._sgNode && this._sgNode.setLayerSize(t);
},
getMapTileSize: function() {
return this._sgNode ? this._sgNode.getMapTileSize() : cc.size(0, 0);
},
setMapTileSize: function(t) {
this._sgNode && this._sgNode.setMapTileSize(t);
},
getTiles: function() {
return this._sgNode ? this._sgNode.getTiles() : null;
},
setTiles: function(t) {
this._sgNode && this._sgNode.setTiles(t);
},
getTileSet: function() {
return this._sgNode ? this._sgNode.getTileSet() : null;
},
setTileSet: function(t) {
this._sgNode && this._sgNode.setTileSet(t);
},
getLayerOrientation: function() {
return this._sgNode ? this._sgNode.getLayerOrientation() : 0;
},
setLayerOrientation: function(t) {
this._sgNode && this._sgNode.setLayerOrientation(t);
},
getProperties: function() {
return this._sgNode ? this._sgNode.getProperties() : null;
},
setProperties: function(t) {
this._sgNode && this._sgNode.setProperties(t);
},
_tryRemoveNode: function() {
this.node.removeComponent(cc.TiledLayer);
1 === this.node._components.length && 0 === this.node.getChildren().length && this.node.removeFromParent();
}
});
cc.TiledLayer = e.exports = n;
}), {
"./CCSGTMXLayer": 1,
"./CCTMXLayerCanvasRenderCmd": 1,
"./CCTMXLayerWebGLRenderCmd": 1
} ],
171: [ (function(t, e, i) {
t("./CCTiledMapAsset");
t("./CCTiledLayer");
t("./CCTiledObjectGroup");
t("./CCSGTMXTiledMap");
var n = cc.Enum({
ORTHO: 0,
HEX: 1,
ISO: 2
}), o = cc.Enum({
NONE: 0,
MAP: 1,
LAYER: 2,
OBJECTGROUP: 3,
OBJECT: 4,
TILE: 5
}), r = cc.Enum({
HORIZONTAL: 2147483648,
VERTICAL: 1073741824,
DIAGONAL: 536870912,
FLIPPED_ALL: 3758096384,
FLIPPED_MASK: 536870911
}), s = cc.Enum({
STAGGERAXIS_X: 0,
STAGGERAXIS_Y: 1
}), c = cc.Enum({
STAGGERINDEX_ODD: 0,
STAGGERINDEX_EVEN: 1
}), a = cc.Enum({
RECT: 0,
ELLIPSE: 1,
POLYGON: 2,
POLYLINE: 3,
IMAGE: 4
}), l = cc.Class({
name: "cc.TiledMap",
extends: cc._RendererInSG,
editor: !1,
statics: {
Orientation: n,
Property: o,
TileFlag: r,
StaggerAxis: s,
StaggerIndex: c,
TMXObjectType: a
},
properties: {
_detachedChildren: {
default: [],
serializable: !1
},
_tmxFile: {
default: null,
type: cc.TiledMapAsset
},
tmxAsset: {
get: function() {
return this._tmxFile;
},
set: function(t, e) {
if (this._tmxFile !== t) {
this._tmxFile = t;
this._applyFile();
}
},
type: cc.TiledMapAsset
}
},
getMapSize: function() {
return this._sgNode.getMapSize();
},
setMapSize: function(t) {
this._sgNode.setMapSize(t);
},
getTileSize: function() {
return this._sgNode.getTileSize();
},
setTileSize: function(t) {
this._sgNode.setTileSize(t);
},
getMapOrientation: function() {
return this._sgNode.getMapOrientation();
},
setMapOrientation: function(t) {
this._sgNode.setMapOrientation(t);
},
getObjectGroups: function() {
for (var t = this.node.children, e = [], i = 0, n = t.length; i < n; i++) {
var o = t[i].getComponent(cc.TiledObjectGroup);
o && e.push(o);
}
return e;
},
getProperties: function() {
return this._sgNode.getProperties();
},
setProperties: function(t) {
this._sgNode.setProperties(t);
},
initWithTMXFile: function(t) {
cc.errorID(7200);
},
initWithXML: function(t, e) {
cc.errorID(7201);
},
allLayers: function() {
for (var t = this.node.children, e = [], i = 0, n = t.length; i < n; i++) {
var o = t[i].getComponent(cc.TiledLayer);
o && e.push(o);
}
return e;
},
getLayer: function(t) {
for (var e = this.node.children, i = 0, n = e.length; i < n; i++) {
var o = e[i].getComponent(cc.TiledLayer);
if (o && o.getLayerName() === t) return o;
}
return null;
},
getObjectGroup: function(t) {
for (var e = this.node.children, i = 0, n = e.length; i < n; i++) {
var o = e[i].getComponent(cc.TiledObjectGroup);
if (o && o.getGroupName() === t) return o;
}
return null;
},
getProperty: function(t) {
return this._sgNode.getProperty(t);
},
getPropertiesForGID: function(t) {
return this._sgNode.getPropertiesForGID(t);
},
onEnable: function() {
0 === this._detachedChildren.length && this._moveLayersInSgNode(this._sgNode);
this._super();
this._tmxFile && this._refreshLayerEntities();
this.node.on("anchor-changed", this._anchorChanged, this);
this.node.on("child-added", this._childAdded, this);
this.node.on("child-reorder", this._syncChildrenOrder, this);
},
onDisable: function() {
this._super();
this._setLayersEnabled(!1);
var t = this._plainNode;
this._moveLayersInSgNode(t);
this.node.off("anchor-changed", this._anchorChanged, this);
this.node.off("child-added", this._childAdded, this);
this.node.off("child-reorder", this._syncChildrenOrder, this);
},
onDestroy: function() {
this._super();
this._removeLayerEntities();
},
_createSgNode: function() {
return new _ccsg.TMXTiledMap();
},
_initSgNode: function() {
this._applyFile();
},
_resetSgSize: function() {
this.node.setContentSize(this._sgNode.getContentSize());
this._sgNode.setContentSize(0, 0);
},
_onMapLoaded: function() {
this._refreshLayerEntities();
this._enabled ? this._anchorChanged() : this._moveLayersInSgNode(this._sgNode);
this._setLayersEnabled(this._enabled);
this._resetSgSize();
},
_setLayersEnabled: function(t) {
for (var e = this.node.getChildren(), i = e.length - 1; i >= 0; i--) {
var n = e[i].getComponent(cc.TiledLayer);
n && (n.enabled = t);
}
},
_moveLayersInSgNode: function(t) {
this._detachedChildren.length = 0;
for (var e = t.getChildren(), i = e.length - 1; i >= 0; i--) {
var n = e[i];
if (n instanceof _ccsg.TMXLayer || n instanceof _ccsg.TMXObjectGroup) {
t.removeChild(n);
var o = n.getLocalZOrder();
this._detachedChildren.push({
sgNode: n,
zorder: o
});
}
}
},
_removeLayerEntities: function() {
for (var t = this.node.getChildren(), e = t.length - 1; e >= 0; e--) {
var i = t[e];
if (i.isValid) {
var n = i.getComponent(cc.TiledLayer);
n && n._tryRemoveNode();
var o = i.getComponent(cc.TiledObjectGroup);
o && o._tryRemoveNode();
}
}
},
_refreshLayerEntities: function() {
var t, e, i = this.node.getChildren(), n = [], o = [], r = [];
for (t = 0; t < this._detachedChildren.length; t++) {
var s = this._detachedChildren[t];
this._sgNode.addChild(s.sgNode, s.zorder, s.zorder);
}
this._detachedChildren.length = 0;
var c = this._sgNode.allLayers().map((function(t) {
return t.getLayerName();
})), a = this._sgNode.getObjectGroups().map((function(t) {
return t.getGroupName();
}));
for (t = i.length - 1; t >= 0; t--) {
var l = i[t], h = l.getComponent(cc.TiledLayer), u = l.getComponent(cc.TiledObjectGroup);
if (h) {
var d = h.getLayerName();
d || (d = l._name);
if (c.indexOf(d) < 0) h._tryRemoveNode(); else {
n.push(l);
var f = this._sgNode.getLayer(d);
h._replaceSgNode(f);
h.enabled = !0;
}
} else if (u) {
var _ = u.getGroupName();
_ || (_ = l._name);
if (a.indexOf(_) < 0) u._tryRemoveNode(); else {
o.push(l);
var p = this._sgNode.getObjectGroup(_);
u._replaceSgNode(p);
u.enabled = p.isVisible();
}
} else r.push({
child: l,
index: l.getSiblingIndex()
});
}
var g = n.map((function(t) {
return t.getComponent(cc.TiledLayer).getLayerName();
}));
for (t = 0, e = c.length; t < e; t++) {
var y = c[t], v = this._sgNode.getLayer(y), m = g.indexOf(y);
if (m < 0) {
var C = this.node.getChildByName(y), T = null;
if (C && !C.getComponent(cc._SGComponent)) T = C.addComponent(cc.TiledLayer); else {
C = new cc.Node(y);
this.node.addChild(C);
T = C.addComponent(cc.TiledLayer);
}
C && T || cc.errorID(7202);
T._replaceSgNode(v);
C.setSiblingIndex(v.getLocalZOrder());
C.setAnchorPoint(this.node.getAnchorPoint());
}
}
var b = o.map((function(t) {
return t.getComponent(cc.TiledObjectGroup).getGroupName();
}));
for (t = 0, e = a.length; t < e; t++) {
y = a[t];
var S = this._sgNode.getObjectGroup(y);
if ((m = b.indexOf(y)) < 0) {
var E = null;
if ((C = this.node.getChildByName(y)) && !C.getComponent(cc._SGComponent)) E = C.addComponent(cc.TiledObjectGroup); else {
C = new cc.Node(y);
this.node.addChild(C);
E = C.addComponent(cc.TiledObjectGroup);
}
C && E || cc.errorID(7202);
E._replaceSgNode(S);
C.setSiblingIndex(S.getLocalZOrder());
C.setAnchorPoint(this.node.getAnchorPoint());
E.enabled = S.isVisible();
}
}
var x = this.node.getChildren(), A = [];
for (t = 0, e = x.length; t < e; t++) {
h = (l = x[t]).getComponent(cc.TiledLayer);
u = l.getComponent(cc.TiledObjectGroup);
(h || u) && A.push(l._name);
}
var N = [], O = [], L = this._sgNode.getChildren();
for (t = 0, e = L.length; t < e; t++) if ((l = L[t]) instanceof _ccsg.TMXLayer) {
N.push(l.getLayerName());
O.push(l);
} else if (l instanceof _ccsg.TMXObjectGroup) {
N.push(l.getGroupName());
O.push(l);
}
for (t = N.length - 1; t >= 0; t--) {
var w = N[t];
if (t !== A.indexOf(w)) {
this.node.getChildByName(w).setSiblingIndex(O[t].getLocalZOrder());
}
}
for (t = 0, e = r.length; t < e; t++) (s = r[t]).child.setSiblingIndex(s.index);
this._syncChildrenOrder();
},
_anchorChanged: function() {
for (var t = this.node.children, e = this.node.getAnchorPoint(), i = 0, n = t.length; i < n; i++) {
var o = t[i];
o.getComponent(cc.TiledLayer) && o.setAnchorPoint(e);
}
},
_childAdded: function(t) {
var e = t.detail;
if (e) {
var i = e.getComponent(cc.TiledLayer), n = e.getComponent(cc.TiledObjectGroup);
if (!i && !n) {
var o = this.node.getChildrenCount();
e.setSiblingIndex(o);
e._sgNode && e._sgNode.setLocalZOrder(o);
}
}
},
_syncChildrenOrder: function() {
for (var t = this.node.children, e = 0, i = t.length; e < i; e++) {
var n = t[e], o = n.getComponent(cc.TiledLayer), r = n.getComponent(cc.TiledObjectGroup), s = n.getSiblingIndex();
o && o._sgNode && o._sgNode.setLocalZOrder(s);
r && r._sgNode && r._sgNode.setLocalZOrder(s);
n._sgNode && n._sgNode.setLocalZOrder(s);
}
},
_applyFile: function() {
var t = this._sgNode, e = this._tmxFile;
if (e) {
var i = cc.url._rawAssets + e.tmxFolderPath;
i = cc.path.stripSep(i);
0;
if (t.initWithXML(e.tmxXmlStr, i)) {
this._detachedChildren.length = 0;
this._onMapLoaded();
}
} else {
for (var n = t.allLayers(), o = 0, r = n.length; o < r; o++) t.removeChild(n[o]);
var s = t.getObjectGroups();
for (o = 0, r = s.length; o < r; o++) t.removeChild(s[o]);
this._detachedChildren.length = 0;
this._removeLayerEntities();
}
}
});
cc.TiledMap = e.exports = l;
cc.js.obsolete(cc.TiledMap.prototype, "cc.TiledMap.tmxFile", "tmxAsset", !0);
cc.js.get(cc.TiledMap.prototype, "mapLoaded", (function() {
cc.errorID(7203);
return [];
}), !1);
}), {
"./CCSGTMXTiledMap": 1,
"./CCTiledLayer": 170,
"./CCTiledMapAsset": 172,
"./CCTiledObjectGroup": 173
} ],
172: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.TiledMapAsset",
extends: cc.Asset,
properties: {
tmxXmlStr: {
default: ""
},
tmxFolderPath: {
default: ""
},
textures: {
default: [],
url: [ cc.Texture2D ]
},
tsxFiles: {
default: [],
url: [ cc.RawAsset ]
}
},
statics: {
preventDeferredLoadDependents: !0
},
createNode: !1
});
cc.TiledMapAsset = n;
e.exports = n;
}), {} ],
173: [ (function(t, e, i) {
t("./CCSGTMXObjectGroup");
var n = cc.Class({
name: "cc.TiledObjectGroup",
extends: cc._SGComponent,
onEnable: function() {
this._sgNode && this._sgNode.setVisible(!0);
},
onDisable: function() {
this._sgNode && this._sgNode.setVisible(!1);
},
onDestroy: function() {
this.node._sizeProvider === this._sgNode && (this.node._sizeProvider = null);
},
_initSgNode: function() {
var t = this._sgNode;
if (t) {
this._registSizeProvider();
t.setAnchorPoint(this.node.getAnchorPoint());
}
},
_replaceSgNode: function(t) {
if (t !== this._sgNode) {
this._removeSgNode();
this.node._sizeProvider === this._sgNode && (this.node._sizeProvider = null);
if (t && t instanceof _ccsg.TMXObjectGroup) {
this._sgNode = t;
t.retain();
this._initSgNode();
} else this._sgNode = null;
}
},
getPositionOffset: function() {
return this._sgNode ? this._sgNode.getPositionOffset() : cc.p(0, 0);
},
setPositionOffset: function(t) {
this._sgNode && this._sgNode.setPositionOffset(t);
},
getProperties: function() {
return this._sgNode ? this._sgNode.getProperties() : null;
},
setProperties: function(t) {
this._sgNode && this._sgNode.setProperties(t);
},
getGroupName: function() {
return this._sgNode ? this._sgNode.getGroupName() : "";
},
setGroupName: function(t) {
this._sgNode && this._sgNode.setGroupName(t);
},
getProperty: function(t) {
return this._sgNode ? this._sgNode.propertyNamed(t) : null;
},
getObject: function(t) {
return this._sgNode ? this._sgNode.getObject(t) : null;
},
getObjects: function() {
return this._sgNode ? this._sgNode.getObjects() : [];
},
_tryRemoveNode: function() {
this.node.removeComponent(cc.TiledObjectGroup);
1 === this.node._components.length && 0 === this.node.getChildren().length && this.node.removeFromParent();
}
});
cc.TiledObjectGroup = e.exports = n;
}), {
"./CCSGTMXObjectGroup": 1
} ],
174: [ (function(t, e, i) {
t("./cocos2d/core");
t("./cocos2d/animation");
t("./cocos2d/particle/CCParticleSystem");
t("./cocos2d/tilemap/CCTiledMap");
t("./cocos2d/motion-streak/CCMotionStreak");
t("./cocos2d/core/components/CCStudioComponent");
t("./extensions/ccpool/CCNodePool");
t("./extensions/ccpool/CCPool");
0;
t("./extensions/spine");
t("./extensions/dragonbones");
t("./cocos2d/deprecated");
}), {
"./cocos2d/actions": 1,
"./cocos2d/animation": 11,
"./cocos2d/core": 85,
"./cocos2d/core/components/CCStudioComponent": 65,
"./cocos2d/deprecated": 166,
"./cocos2d/motion-streak/CCMotionStreak": 167,
"./cocos2d/particle/CCParticleAsset": 168,
"./cocos2d/particle/CCParticleSystem": 169,
"./cocos2d/tilemap/CCTiledMap": 171,
"./cocos2d/tilemap/CCTiledMapAsset": 172,
"./extensions/ccpool/CCNodePool": 175,
"./extensions/ccpool/CCPool": 176,
"./extensions/dragonbones": 180,
"./extensions/spine": 183,
"./external/chipmunk/chipmunk": 1
} ],
175: [ (function(t, e, i) {
cc.NodePool = function(t) {
this.poolHandlerComp = t;
this._pool = [];
};
cc.NodePool.prototype = {
constructor: cc.NodePool,
size: function() {
return this._pool.length;
},
clear: function() {
for (var t = this._pool.length, e = 0; e < t; ++e) this._pool[e].destroy();
this._pool.length = 0;
},
put: function(t) {
if (t && -1 === this._pool.indexOf(t)) {
t.removeFromParent(!1);
var e = this.poolHandlerComp ? t.getComponent(this.poolHandlerComp) : null;
e && e.unuse && e.unuse();
this._pool.push(t);
}
},
get: function() {
var t = this._pool.length - 1;
if (t < 0) return null;
var e = this._pool[t];
this._pool.length = t;
var i = this.poolHandlerComp ? e.getComponent(this.poolHandlerComp) : null;
i && i.reuse && i.reuse.apply(i, arguments);
return e;
}
};
e.exports = cc.NodePool;
}), {} ],
176: [ (function(t, e, i) {
var n = [];
cc.pool = {
_pool: {},
_releaseCB: function() {
this.release();
},
_autoRelease: function(t) {
var e = void 0 !== t._running && !t._running;
cc.director.getScheduler().schedule(this._releaseCB, t, 0, 0, 0, e);
},
putInPool: function(t) {
var e = cc.js._getClassId(t.constructor);
if (e) {
this._pool[e] || (this._pool[e] = []);
t.retain && t.retain();
t.unuse && t.unuse();
this._pool[e].push(t);
}
},
hasObject: function(t) {
var e = cc.js._getClassId(t), i = this._pool[e];
return !(!i || 0 === i.length);
},
removeObject: function(t) {
var e = cc.js._getClassId(t.constructor);
if (e) {
var i = this._pool[e];
if (i) for (var n = 0; n < i.length; n++) if (t === i[n]) {
t.release && t.release();
i.splice(n, 1);
}
}
},
getFromPool: function(t) {
if (this.hasObject(t)) {
var e = cc.js._getClassId(t), i = this._pool[e];
n.length = arguments.length - 1;
for (var o = 0; o < n.length; o++) n[o] = arguments[o + 1];
var r = i.pop();
r.reuse && r.reuse.apply(r, n);
r.release && this._autoRelease(r);
n.length = 0;
return r;
}
},
drainAllPools: function() {
for (var t in this._pool) for (var e = 0; e < this._pool[t].length; e++) {
var i = this._pool[t][e];
i.release && i.release();
}
this._pool = {};
}
};
}), {} ],
177: [ (function(t, e, i) {
var n = cc.Enum({
default: -1
}), o = cc.Enum({
"<None>": 0
});
dragonBones.ArmatureDisplay = cc.Class({
name: "dragonBones.ArmatureDisplay",
extends: cc._RendererUnderSG,
editor: !1,
properties: {
_factory: {
default: null,
type: dragonBones.CCFactory,
serializable: !1
},
_dragonBonesData: {
default: null,
type: dragonBones.DragonBonesData,
serializable: !1
},
dragonAsset: {
default: null,
type: dragonBones.DragonBonesAsset,
notify: function() {
this._parseDragonAsset();
this._refresh();
0;
},
tooltip: !1
},
dragonAtlasAsset: {
default: null,
type: dragonBones.DragonBonesAtlasAsset,
notify: function() {
this._parseDragonAtlasAsset();
this._refreshSgNode();
},
tooltip: !1
},
_armatureName: "",
armatureName: {
get: function() {
return this._armatureName;
},
set: function(t) {
this._armatureName = t;
var e = this.getAnimationNames(this._armatureName);
(!this.animationName || e.indexOf(this.animationName) < 0) && (this.animationName = "");
this._refresh();
},
visible: !1
},
_animationName: "",
animationName: {
get: function() {
return this._animationName;
},
set: function(t) {
this._animationName = t;
},
visible: !1
},
_defaultArmatureIndex: {
default: 0,
notify: function() {
var t = "";
if (this.dragonAsset) {
var e;
this.dragonAsset && (e = this.dragonAsset.getArmatureEnum());
if (!e) return cc.errorID(7400, this.name);
t = e[this._defaultArmatureIndex];
}
void 0 !== t ? this.armatureName = t : cc.errorID(7401, this.name);
},
type: n,
visible: !0,
editorOnly: !0,
displayName: "Armature",
tooltip: !1
},
_animationIndex: {
default: 0,
notify: function() {
if (0 !== this._animationIndex) {
var t;
this.dragonAsset && (t = this.dragonAsset.getAnimsEnum(this.armatureName));
if (t) {
var e = t[this._animationIndex];
void 0 !== e ? this.animationName = e : cc.errorID(7402, this.name);
}
} else this.animationName = "";
},
type: o,
visible: !0,
editorOnly: !0,
displayName: "Animation",
tooltip: !1
},
timeScale: {
default: 1,
notify: function() {
this._sgNode && (this._sgNode.animation().timeScale = this.timeScale);
},
tooltip: !1
},
playTimes: {
default: -1,
tooltip: !1
},
debugBones: {
default: !1,
notify: function() {
this._sgNode && this._sgNode.setDebugBones(this.debugBones);
},
editorOnly: !0,
tooltip: !1
}
},
ctor: function() {
this._factory = new dragonBones.CCFactory();
},
__preload: function() {
this._parseDragonAsset();
this._parseDragonAtlasAsset();
this._refresh();
},
_createSgNode: function() {
return this.dragonAsset && this.dragonAtlasAsset && this.armatureName ? this._factory.buildArmatureDisplay(this.armatureName, this._dragonBonesData.name) : null;
},
_initSgNode: function() {
var t = this._sgNode;
t.animation().timeScale = this.timeScale;
this.animationName && this.playAnimation(this.animationName, this.playTimes);
0;
},
_removeSgNode: function() {
var t = this._sgNode;
this._super();
t && t.armature().dispose();
},
_parseDragonAsset: function() {
if (this.dragonAsset) {
this._dragonBonesData = this._factory.parseDragonBonesData(this.dragonAsset.dragonBonesJson);
}
},
_parseDragonAtlasAsset: function() {
if (this.dragonAtlasAsset) {
this._factory.parseTextureAtlasData(this.dragonAtlasAsset.atlasJson, this.dragonAtlasAsset.texture);
}
},
_refreshSgNode: function() {
var t = null, e = null;
if (this._sgNode) {
t = this._sgNode._bubblingListeners;
e = this._sgNode._hasListenerCache;
this.node._sizeProvider === this._sgNode && (this.node._sizeProvider = null);
this._removeSgNode();
this._sgNode = null;
}
var i = this._sgNode = this._createSgNode();
if (i) {
i.retain();
this.enabledInHierarchy || i.setVisible(!1);
if (t) {
i._bubblingListeners = t;
i._hasListenerCache = e;
i.hasEventCallback() || i.setEventCallback((function(t) {
i.emit(t.type, t);
}));
}
this._initSgNode();
this._appendSgNode(i);
this._registSizeProvider();
}
},
_refresh: function() {
this._refreshSgNode();
0;
},
_updateAnimEnum: !1,
_updateArmatureEnum: !1,
playAnimation: function(t, e) {
if (this._sgNode) {
this.playTimes = void 0 === e ? -1 : e;
this.animationName = t;
return this._sgNode.animation().play(t, this.playTimes);
}
return null;
},
getArmatureNames: function() {
return this._dragonBonesData ? this._dragonBonesData.armatureNames : [];
},
getAnimationNames: function(t) {
var e = [];
if (this._dragonBonesData) {
var i = this._dragonBonesData.getArmature(t);
if (i) for (var n in i.animations) i.animations.hasOwnProperty(n) && e.push(n);
}
return e;
},
addEventListener: function(t, e, i) {
this._sgNode && this._sgNode.addEvent(t, e, i);
},
removeEventListener: function(t, e, i) {
this._sgNode && this._sgNode.removeEvent(t, e, i);
},
buildArmature: function(t) {
return this._factory ? this._factory.buildArmature(t) : null;
},
armature: function() {
return this._sgNode ? this._sgNode.armature() : null;
}
});
}), {} ],
178: [ (function(t, e, i) {
var n = cc.Class({
name: "dragonBones.DragonBonesAsset",
extends: cc.Asset,
properties: {
_dragonBonesJson: "",
dragonBonesJson: {
get: function() {
return this._dragonBonesJson;
},
set: function(t) {
this._dragonBonesJson = t;
this.reset();
}
}
},
statics: {
preventDeferredLoadDependents: !0
},
createNode: !1,
reset: function() {
0;
},
getRuntimeData: !1,
getArmatureEnum: !1,
getAnimsEnum: !1
});
dragonBones.DragonBonesAsset = e.exports = n;
}), {} ],
179: [ (function(t, e, i) {
var n = cc.Class({
name: "dragonBones.DragonBonesAtlasAsset",
extends: cc.Asset,
properties: {
_atlasJson: "",
atlasJson: {
get: function() {
return this._atlasJson;
},
set: function(t) {
this._atlasJson = t;
}
},
texture: {
default: "",
url: cc.Texture2D
}
},
statics: {
preventDeferredLoadDependents: !0
},
createNode: !1
});
dragonBones.DragonBonesAtlasAsset = e.exports = n;
}), {} ],
180: [ (function(t, e, i) {
dragonBones = dragonBones;
dragonBones.DisplayType = {
Image: 0,
Armature: 1,
Mesh: 2
};
dragonBones.ArmatureType = {
Armature: 0,
MovieClip: 1,
Stage: 2
};
dragonBones.ExtensionType = {
FFD: 0,
AdjustColor: 10,
BevelFilter: 11,
BlurFilter: 12,
DropShadowFilter: 13,
GlowFilter: 14,
GradientBevelFilter: 15,
GradientGlowFilter: 16
};
dragonBones.EventType = {
Frame: 0,
Sound: 1
};
dragonBones.ActionType = {
Play: 0,
Stop: 1,
GotoAndPlay: 2,
GotoAndStop: 3,
FadeIn: 4,
FadeOut: 5
};
dragonBones.AnimationFadeOutMode = {
None: 0,
SameLayer: 1,
SameGroup: 2,
SameLayerAndGroup: 3,
All: 4
};
0;
t("./DragonBonesAsset");
t("./DragonBonesAtlasAsset");
t("./ArmatureDisplay");
}), {
"./ArmatureDisplay": 177,
"./CCArmatureDisplay": 1,
"./CCFactory": 1,
"./CCSlot": 1,
"./CCTextureData": 1,
"./DragonBonesAsset": 178,
"./DragonBonesAtlasAsset": 179,
"./lib/dragonBones": 1
} ],
181: [ (function(i, n, o) {
var r = cc.Enum({
default: -1
}), s = cc.Enum({
"<None>": 0
});
sp.Skeleton = cc.Class({
name: "sp.Skeleton",
extends: cc._RendererUnderSG,
editor: !1,
properties: {
_startListener: {
default: null,
serializable: !1
},
_endListener: {
default: null,
serializable: !1
},
_completeListener: {
default: null,
serializable: !1
},
_eventListener: {
default: null,
serializable: !1
},
_disposeListener: {
default: null,
serializable: !1
},
_interruptListener: {
default: null,
serializable: !1
},
_paused: !1,
paused: {
get: function() {
return this._paused;
},
set: function(t) {
this._paused = t;
this._sgNode && (t ? this._sgNode.pause() : this._sgNode.resume());
},
visible: !1
},
skeletonData: {
default: null,
type: sp.SkeletonData,
notify: function() {
this.defaultSkin = "";
this.defaultAnimation = "";
this._refresh();
},
tooltip: !1
},
defaultSkin: {
default: "",
visible: !1
},
defaultAnimation: {
default: "",
visible: !1
},
animation: {
get: function() {
var t = this.getCurrent(0);
return t && t.animation.name || "";
},
set: function(t) {
this.defaultAnimation = t;
if (t) this.setAnimation(0, t, this.loop); else {
this.clearTrack(0);
this.setToSetupPose();
}
},
visible: !1
},
_defaultSkinIndex: {
get: function() {
if (this.skeletonData && this.defaultSkin) {
var t = this.skeletonData.getSkinsEnum();
if (t) {
var e = t[this.defaultSkin];
if (void 0 !== e) return e;
}
}
return 0;
},
set: function(t) {
var e;
this.skeletonData && (e = this.skeletonData.getSkinsEnum());
if (!e) return cc.errorID("", this.name);
var i = e[t];
if (void 0 !== i) {
this.defaultSkin = i;
0;
} else cc.errorID(7501, this.name);
},
type: r,
visible: !0,
displayName: "Default Skin",
tooltip: !1
},
_animationIndex: {
get: function() {
var t = this.animation;
if (this.skeletonData && t) {
var e = this.skeletonData.getAnimsEnum();
if (e) {
var i = e[t];
if (void 0 !== i) return i;
}
}
return 0;
},
set: function(t) {
if (0 !== t) {
var e;
this.skeletonData && (e = this.skeletonData.getAnimsEnum());
if (!e) return cc.errorID(7502, this.name);
var i = e[t];
void 0 !== i ? this.animation = i : cc.errorID(7503, this.name);
} else this.animation = "";
},
type: s,
visible: !0,
displayName: "Animation",
tooltip: !1
},
loop: {
default: !0,
tooltip: !1
},
_premultipliedAlpha: !0,
premultipliedAlpha: {
get: function() {
return this._premultipliedAlpha;
},
set: function(t) {
this._premultipliedAlpha = t;
this._sgNode && this._sgNode.setPremultipliedAlpha(t);
},
tooltip: !1
},
timeScale: {
default: 1,
notify: function() {
this._sgNode && this._sgNode.setTimeScale(this.timeScale);
},
tooltip: !1
},
debugSlots: {
default: !1,
notify: function() {
this._sgNode && this._sgNode.setDebugSlotsEnabled(this.debugSlots);
},
editorOnly: !0,
tooltip: !1
},
debugBones: {
default: !1,
notify: function() {
this._sgNode && this._sgNode.setDebugBonesEnabled(this.debugBones);
},
editorOnly: !0,
tooltip: !1
}
},
__preload: function() {
this.node.setContentSize(0, 0);
this._refresh();
},
_createSgNode: function() {
if (this.skeletonData) {
if (!this.skeletonData._uuid) {
cc.errorID(7504);
return null;
}
var i = this.skeletonData.rawUrl, n = this.skeletonData.atlasUrl;
if (n) {
if ("string" !== ("object" == (e = typeof n) ? t(n) : e)) {
cc.errorID(7505);
return null;
}
try {
return new sp._SGSkeletonAnimation(i, n, this.skeletonData.scale);
} catch (t) {
cc._throw(t);
}
}
}
return null;
},
_initSgNode: function() {
var t = this._sgNode;
t.setTimeScale(this.timeScale);
var e = this;
t.onEnter = function() {
_ccsg.Node.prototype.onEnter.call(this);
e._paused && this.pause();
};
this._startListener && this.setStartListener(this._startListener);
this._endListener && this.setEndListener(this._endListener);
this._completeListener && this.setCompleteListener(this._completeListener);
this._eventListener && this.setEventListener(this._eventListener);
this._interruptListener && this.setInterruptListener(this._interruptListener);
this._disposeListener && this.setDisposeListener(this._disposeListener);
if (this.defaultSkin) try {
t.setSkin(this.defaultSkin);
} catch (t) {
cc._throw(t);
}
t.setPremultipliedAlpha(this._premultipliedAlpha);
this.animation = this.defaultAnimation;
0;
},
_getLocalBounds: !1,
updateWorldTransform: function() {
this._sgNode && this._sgNode.updateWorldTransform();
},
setToSetupPose: function() {
this._sgNode && this._sgNode.setToSetupPose();
},
setBonesToSetupPose: function() {
this._sgNode && this._sgNode.setBonesToSetupPose();
},
setSlotsToSetupPose: function() {
this._sgNode && this._sgNode.setSlotsToSetupPose();
},
findBone: function(t) {
return this._sgNode ? this._sgNode.findBone(t) : null;
},
findSlot: function(t) {
return this._sgNode ? this._sgNode.findSlot(t) : null;
},
setSkin: function(t) {
return this._sgNode ? this._sgNode.setSkin(t) : null;
},
getAttachment: function(t, e) {
return this._sgNode ? this._sgNode.getAttachment(t, e) : null;
},
setAttachment: function(t, e) {
this._sgNode && this._sgNode.setAttachment(t, e);
},
setSkeletonData: function(t, e) {
this._sgNode && this._sgNode.setSkeletonData(t, e);
},
setAnimationStateData: function(t) {
if (this._sgNode) return this._sgNode.setAnimationStateData(t);
},
setMix: function(t, e, i) {
this._sgNode && this._sgNode.setMix(t, e, i);
},
setAnimationListener: function(t, e) {
this._sgNode && this._sgNode.setAnimationListener(t, e);
},
setAnimation: function(t, e, i) {
if (this._sgNode) {
0;
return this._sgNode.setAnimation(t, e, i);
}
return null;
},
_sample: function() {
this._sgNode && this._sgNode.update(0);
},
addAnimation: function(t, e, i, n) {
return this._sgNode ? this._sgNode.addAnimation(t, e, i, n || 0) : null;
},
findAnimation: function(t) {
return this._sgNode ? this._sgNode.findAnimation(t) : null;
},
getCurrent: function(t) {
return this._sgNode ? this._sgNode.getCurrent(t) : null;
},
clearTracks: function() {
this._sgNode && this._sgNode.clearTracks();
},
clearTrack: function(t) {
if (this._sgNode) {
this._sgNode.clearTrack(t);
0;
}
},
_updateAnimEnum: !1,
_updateSkinEnum: !1,
setStartListener: function(t) {
this._startListener = t;
this._sgNode && this._sgNode.setStartListener(t);
},
setInterruptListener: function(t) {
this._interruptListener = t;
this._sgNode && this._sgNode.setInterruptListener(t);
},
setEndListener: function(t) {
this._endListener = t;
this._sgNode && this._sgNode.setEndListener(t);
},
setDisposeListener: function(t) {
this._disposeListener = t;
this._sgNode && this._sgNode.setDisposeListener(t);
},
setCompleteListener: function(t) {
this._completeListener = t;
this._sgNode && this._sgNode.setCompleteListener(t);
},
setEventListener: function(t) {
this._eventListener = t;
this._sgNode && this._sgNode.setEventListener(t);
},
setTrackStartListener: function(t, e) {
this._sgNode && this._sgNode.setTrackStartListener(t, e);
},
setTrackInterruptListener: function(t, e) {
this._sgNode && this._sgNode.setTrackInterruptListener(t, e);
},
setTrackEndListener: function(t, e) {
this._sgNode && this._sgNode.setTrackEndListener(t, e);
},
setTrackDisposeListener: function(t, e) {
this._sgNode && this._sgNode.setTrackDisposeListener(t, e);
},
setTrackCompleteListener: function(t, e) {
this._sgNode && this._sgNode.setTrackCompleteListener(t, e);
},
setTrackEventListener: function(t, e) {
this._sgNode && this._sgNode.setTrackEventListener(t, e);
},
getState: function() {
if (this._sgNode) return this._sgNode.getState();
},
_refresh: function() {
if (this._sgNode) {
this.node._sizeProvider === this._sgNode && (this.node._sizeProvider = null);
this._removeSgNode();
this._sgNode = null;
}
var t = this._sgNode = this._createSgNode();
if (t) {
t.retain();
this.enabledInHierarchy || t.setVisible(!1);
t.setContentSize(0, 0);
this._initSgNode();
this._appendSgNode(t);
this._registSizeProvider();
}
0;
}
});
}), {} ],
182: [ (function(t, e, i) {
var n = cc.Class({
name: "sp.SkeletonData",
extends: cc.Asset,
ctor: function() {
this.reset();
},
properties: {
_skeletonJson: null,
skeletonJson: {
get: function() {
return this._skeletonJson;
},
set: function(t) {
this._skeletonJson = t;
this.reset();
}
},
_atlasText: "",
atlasText: {
get: function() {
return this._atlasText;
},
set: function(t) {
this._atlasText = t;
this.reset();
}
},
atlasUrl: {
default: "",
url: cc.RawAsset
},
textures: {
default: [],
url: [ cc.Texture2D ]
},
scale: 1
},
statics: {
preventDeferredLoadDependents: !0
},
createNode: !1,
reset: function() {
this._skeletonCache = null;
this._atlasCache = null;
0;
},
getRuntimeData: !1,
getSkinsEnum: !1,
getAnimsEnum: !1,
_getAtlas: !1
});
sp.SkeletonData = e.exports = n;
}), {} ],
183: [ (function(t, e, i) {
sp = sp;
sp.VERTEX_INDEX = {
X1: 0,
Y1: 1,
X2: 2,
Y2: 3,
X3: 4,
Y3: 5,
X4: 6,
Y4: 7
};
sp.ATTACHMENT_TYPE = {
REGION: 0,
BOUNDING_BOX: 1,
MESH: 2,
SKINNED_MESH: 3
};
sp.AnimationEventType = cc.Enum({
START: 0,
INTERRUPT: 1,
END: 2,
DISPOSE: 3,
COMPLETE: 4,
EVENT: 5
});
0;
t("./SkeletonData");
t("./Skeleton");
}), {
"./SGSkeleton": 1,
"./SGSkeletonAnimation": 1,
"./SGSkeletonCanvasRenderCmd": 1,
"./SGSkeletonTexture": 1,
"./SGSkeletonWebGLRenderCmd": 1,
"./Skeleton": 181,
"./SkeletonData": 182,
"./lib/spine": 1
} ],
184: [ (function(i, n, o) {
"use strict";
function r(i, n) {
"undefined" === ("object" == (e = typeof window[i]) ? t(window[i]) : e) && (window[i] = n);
}
function s(i) {
return "object" === ("object" == (e = typeof window[i]) ? t(window[i]) : e);
}
r("CC_TEST", s("tap") || s("QUnit"));
r("CC_EDITOR", s("Editor") && s("process") && "electron" in process.versions);
r("CC_PREVIEW", !0);
r("CC_DEV", !0);
r("CC_DEBUG", !0);
r("CC_JSB", s("jsb"));
r("CC_BUILD", !1);
r("CC_WECHATGAME", !1);
r("CC_SUPPORT_JIT", !0);
cc.ClassManager || (cc.ClassManager = window.ClassManager);
0;
i("../polyfill/misc");
i("../polyfill/string");
i("../polyfill/typescript");
i("../cocos2d/core/platform/js");
i("../cocos2d/core/value-types");
i("../cocos2d/core/utils/find");
i("../cocos2d/core/utils/mutable-forward-iterator");
i("../cocos2d/core/event");
i("../cocos2d/core/event-manager/CCEvent");
i("../CCDebugger");
0;
var c = i("../cocos2d/core/platform/CCMacro");
void 0 !== window.__ENABLE_GC_FOR_NATIVE_OBJECTS__ && (c.ENABLE_GC_FOR_NATIVE_OBJECTS = window.__ENABLE_GC_FOR_NATIVE_OBJECTS__);
i("./jsb-game");
i("./jsb-loader");
i("./jsb-director");
i("./jsb-tex-sprite-frame");
i("./jsb-scale9sprite");
i("./jsb-label");
i("./jsb-editbox");
i("./jsb-videoplayer");
i("./jsb-webview");
i("./jsb-particle");
i("./jsb-spine");
i("./jsb-enums");
i("./jsb-event");
i("./jsb-action");
i("./jsb-etc");
i("./jsb-audio");
i("./jsb-tiledmap");
i("./jsb-box2d");
i("./jsb-dragonbones");
i("../extends");
}), {
"../CCDebugger": 2,
"../DebugInfos": 3,
"../cocos2d/core/event": 80,
"../cocos2d/core/event-manager/CCEvent": 75,
"../cocos2d/core/platform/CCMacro": 130,
"../cocos2d/core/platform/js": 142,
"../cocos2d/core/utils/find": 151,
"../cocos2d/core/utils/mutable-forward-iterator": 153,
"../cocos2d/core/value-types": 165,
"../extends": 174,
"../polyfill/misc": 204,
"../polyfill/string": 205,
"../polyfill/typescript": 206,
"./jsb-action": 185,
"./jsb-audio": 186,
"./jsb-box2d": 187,
"./jsb-director": 188,
"./jsb-dragonbones": 189,
"./jsb-editbox": 190,
"./jsb-enums": 191,
"./jsb-etc": 192,
"./jsb-event": 193,
"./jsb-game": 194,
"./jsb-label": 195,
"./jsb-loader": 196,
"./jsb-particle": 197,
"./jsb-scale9sprite": 198,
"./jsb-spine": 199,
"./jsb-tex-sprite-frame": 200,
"./jsb-tiledmap": 201,
"./jsb-videoplayer": 202,
"./jsb-webview": 203
} ],
185: [ (function(t, e, i) {
function n(t, e, i) {
if (t) for (var n = t._owner.getComponentsInChildren(cc._SGComponent), o = 0; o < n.length; ++o) {
var r = n[o];
r.enabled = e ? !r.enabled : i;
}
}
function o(t) {
t instanceof cc.Component ? t = t.node._sgNode : t instanceof cc.Node ? t = t._sgNode : t instanceof _ccsg.Node || (t = null);
return t;
}
function r(t, e) {
var i = cc.ActionManager.prototype, n = i[t];
i[t] = function() {
for (var t = [], i = 0; i < arguments.length; i++) t[i] = i === e ? o(arguments[i]) : arguments[i];
return t[e] ? n.apply(this, t) : void 0;
};
}
function s(t) {
var e = this._getSgTarget();
if (e._owner) {
e._owner.x = e.getPositionX();
e._owner.y = e.getPositionY();
}
}
function c(t) {
var e = this._getSgTarget();
if (e._owner) {
e._owner.rotationX = e.getRotationX();
e._owner.rotationY = e.getRotationY();
}
}
function a(t) {
var e = this._getSgTarget();
e._owner && (e._owner.opacity = e.getOpacity());
}
function l(t) {
var e = this._getSgTarget();
if (e._owner) {
var i = e.getColor();
e._owner.color = i;
}
}
cc.macro.ENABLE_GC_FOR_NATIVE_OBJECTS;
cc.Action.prototype._getSgTarget = cc.Action.prototype.getTarget;
cc.Action.prototype.getTarget = function() {
var t = this._getSgTarget();
return t._owner || t;
};
cc.targetedAction = function(t, e) {
return new cc.TargetedAction(t, e);
};
cc.TargetedAction.prototype._ctor = function(t, e) {
var i = t._sgNode || t;
i._owner = t;
e && this.initWithTarget(i, e);
};
cc.follow = function(t, e) {
return new cc.Follow(t, e);
};
cc.Follow = cc.BaseJSAction.extend({
_followedNode: null,
_boundarySet: !1,
_boundaryFullyCovered: !1,
_halfScreenSize: null,
_fullScreenSize: null,
_worldRect: null,
leftBoundary: 0,
rightBoundary: 0,
topBoundary: 0,
bottomBoundary: 0,
ctor: function(t, e) {
cc.BaseJSAction.prototype.ctor.call(this);
this._followedNode = null;
this._boundarySet = !1;
this._boundaryFullyCovered = !1;
this._halfScreenSize = null;
this._fullScreenSize = null;
this.leftBoundary = 0;
this.rightBoundary = 0;
this.topBoundary = 0;
this.bottomBoundary = 0;
this._worldRect = cc.rect(0, 0, 0, 0);
t && (e ? this.initWithTarget(t, e) : this.initWithTarget(t));
},
clone: function() {
var t = new cc.Follow(), e = this._worldRect, i = new cc.Rect(e.x, e.y, e.width, e.height);
t.initWithTarget(this._followedNode, i);
return t;
},
isBoundarySet: function() {
return this._boundarySet;
},
setBoudarySet: function(t) {
this._boundarySet = t;
},
initWithTarget: function(t, e) {
if (!t) throw new Error("cc.Follow.initWithAction(): followedNode must be non nil");
e = e || cc.rect(0, 0, 0, 0);
this._followedNode = t;
this._worldRect = e;
this._boundarySet = !cc._rectEqualToZero(e);
this._boundaryFullyCovered = !1;
var i = cc.director.getWinSize();
this._fullScreenSize = cc.p(i.width, i.height);
this._halfScreenSize = cc.pMult(this._fullScreenSize, .5);
if (this._boundarySet) {
this.leftBoundary = -(e.x + e.width - this._fullScreenSize.x);
this.rightBoundary = -e.x;
this.topBoundary = -e.y;
this.bottomBoundary = -(e.y + e.height - this._fullScreenSize.y);
this.rightBoundary < this.leftBoundary && (this.rightBoundary = this.leftBoundary = (this.leftBoundary + this.rightBoundary) / 2);
this.topBoundary < this.bottomBoundary && (this.topBoundary = this.bottomBoundary = (this.topBoundary + this.bottomBoundary) / 2);
this.topBoundary === this.bottomBoundary && this.leftBoundary === this.rightBoundary && (this._boundaryFullyCovered = !0);
}
return !0;
},
step: function(t) {
var e = this.getTarget(), i = e.convertToWorldSpaceAR(cc.Vec2.ZERO), n = this._followedNode.convertToWorldSpaceAR(cc.Vec2.ZERO), o = cc.pSub(i, n), r = e.parent.convertToNodeSpaceAR(cc.pAdd(o, this._halfScreenSize));
if (this._boundarySet) {
if (this._boundaryFullyCovered) return;
e.setPosition(cc.clampf(r.x, this.leftBoundary, this.rightBoundary), cc.clampf(r.y, this.bottomBoundary, this.topBoundary));
} else e.setPosition(r.x, r.y);
},
isDone: function() {
return !this._followedNode.isRunning();
},
stop: function() {
this.setTarget(null);
cc.Action.prototype.stop.call(this);
}
});
var h = cc.FlipX;
cc.FlipX = h.extend({
_flippedX: !1,
ctor: function(t) {
h.prototype.ctor.call(this);
this.initWithFlipX(t);
},
initWithFlipX: function(t) {
this._flippedX = !!t;
return !0;
},
update: function(t) {
var e = this._getSgTarget();
e.scaleX = Math.abs(e.scaleX) * (this._flippedX ? -1 : 1);
},
reverse: function() {
return new cc.FlipX(!this._flippedX);
},
clone: function() {
return new cc.FlipX(this._flippedX);
}
});
cc.flipX = function(t) {
return new cc.FlipX(t);
};
var u = cc.FlipY;
cc.FlipY = u.extend({
_flippedY: !1,
ctor: function(t) {
u.prototype.ctor.call(this);
this.initWithFlipY(t);
},
initWithFlipY: function(t) {
this._flippedY = !!t;
return !0;
},
update: function(t) {
var e = this._getSgTarget();
e.scaleY = Math.abs(e.scaleY) * (this._flippedY ? -1 : 1);
},
reverse: function() {
return new cc.FlipY(!this._flippedY);
},
clone: function() {
return new cc.FlipY(this._flippedY);
}
});
cc.flipY = function(t) {
return new cc.FlipY(t);
};
cc.Show.prototype.update = function(t) {
n(this._getSgTarget(), !1, !0);
};
cc.Hide.prototype.update = function(t) {
n(this._getSgTarget(), !1, !1);
};
cc.ToggleVisibility.prototype.update = function(t) {
n(this._getSgTarget(), !0);
};
cc.callFunc = function(t, e, i) {
var n = function(e) {
e && (e = e._owner || e);
t.call(this, e, i);
};
return e ? cc.CallFunc.create(n, e) : cc.CallFunc.create(n);
};
cc.CallFunc.prototype._ctor = function(t, e, i) {
if (void 0 !== t) {
var n = function(e) {
e && (e = e._owner || e);
t.call(this, e, i);
};
void 0 === e ? this.initWithFunction(n) : this.initWithFunction(n, e);
}
};
var d = cc.ActionManager.prototype.addAction;
cc.ActionManager.prototype.addAction = function(t, e, i) {
(e = o(e)) && d.call(this, t, e, i);
};
for (var f = [ [ "removeAllActionsFromTarget", 0 ], [ "removeActionByTag", 1 ], [ "getActionByTag", 1 ], [ "getNumberOfRunningActionsInTarget", 0 ], [ "pauseTarget", 0 ], [ "resumeTarget", 0 ] ], _ = 0; _ < f.length; ++_) r.apply(null, f[_]);
cc.ActionManager.prototype.resumeTargets = function(t) {
if (t) for (var e = 0; e < t.length; e++) t[e] && this.resumeTarget(t[e]);
};
cc.ActionManager.prototype.pauseTargets = function(t) {
if (t) for (var e = 0; e < t.length; e++) t[e] && this.pauseTarget(t[e]);
};
var p = {
MoveBy: s,
JumpBy: s,
Place: s,
CardinalSplineTo: s,
RotateTo: c,
RotateBy: c,
ScaleTo: function(t) {
var e = this._getSgTarget();
if (e._owner) {
e._owner.scaleX = e.getScaleX();
e._owner.scaleY = e.getScaleY();
}
},
RemoveSelf: function(t) {
var e = this._getSgTarget();
e._owner && e._owner.removeFromParent();
},
SkewTo: function(t) {
var e = this._getSgTarget();
if (e._owner) {
e._owner.skewX = e.getSkewX();
e._owner.skewY = e.getSkewY();
}
},
Blink: a,
FadeIn: a,
FadeOut: a,
FadeTo: a,
TintTo: l,
TintBy: l,
BezierBy: s
};
for (var g in p) {
cc[g].prototype.update = p[g];
}
}), {} ],
186: [ (function(t, e, i) {
cc.Audio = function(t) {
this.src = t;
this.volume = 1;
this.loop = !1;
this.id = -1;
this._eventList = {};
this.type = cc.Audio.Type.NATIVE;
};
cc.Audio.Type = {
DOM: "AUDIO",
WEBAUDIO: "WEBAUDIO",
NATIVE: "NATIVE",
UNKNOWN: "UNKNOWN"
};
(function(e, i) {
cc.audioEngine = i;
i.play = i.play2d;
i.setMaxWebAudioSize = function() {};
var n = t("../cocos2d/audio/deprecated");
n.removed(i);
n.deprecated(i);
e.State = i.AudioState;
e.play = function() {
i.stop(this.id);
this.id = i.play2d(this.src, this.loop, this.volume);
};
e.pause = function() {
i.pause(this.id);
};
e.resume = function() {
i.resume(this.id);
};
e.stop = function() {
i.stop(this.id);
};
e.setLoop = function(t) {
this.loop = t;
i.setLoop(this.id, t);
};
e.getLoop = function() {
return i.getLoop(this.id);
};
e.setVolume = function(t) {
this.volume = t;
return i.setVolume(this.id, t);
};
e.getVolume = function() {
return i.getVolume(this.id);
};
e.setCurrentTime = function(t) {
i.setCurrentTime(this.id, t);
};
e.getCurrentTime = function() {
return i.getCurrentTime(this.id);
};
e.getDuration = function() {
return i.getDuration(this.id);
};
e.getState = function() {
return i.getState(this.id);
};
e.preload = function() {
this._loaded = !0;
this.emit("load");
};
e.on = function(t, e) {
var i = this._eventList[t];
i || (i = this._eventList[t] = []);
i.push(e);
};
e.once = function(t, e) {
var i = function(n) {
e.call(this, n);
this.off(t, i);
};
this.on(t, i);
};
e.emit = function(t) {
var e = this._eventList[t];
if (e) for (var i = 0; i < e.length; i++) e[i].call(this, this);
};
e.off = function(t, e) {
var i = this._eventList[t];
if (!i) return !1;
if (!e) {
this._eventList[t] = [];
return !0;
}
for (var n = 0; n < i.length; n++) if (i[n] === e) {
i.splice(n, 1);
break;
}
return !0;
};
})(cc.Audio.prototype, jsb.AudioEngine);
}), {
"../cocos2d/audio/deprecated": 15
} ],
187: [ (function(t, e, i) {
(function() {
window.b2 || (window.b2 = {});
var t = b2.Vec2 = function(t, e) {
void 0 === t && (t = 0);
void 0 === e && (e = 0);
this.x = t;
this.y = e;
};
t.Make = function(e, i) {
void 0 === e && (e = 0);
void 0 === i && (i = 0);
return new t(e, i);
};
t.prototype.SetZero = function() {
this.x = 0;
this.y = 0;
};
t.prototype.Set = function(t, e) {
void 0 === t && (t = 0);
void 0 === e && (e = 0);
this.x = t;
this.y = e;
};
t.prototype.SetV = function(t) {
this.x = t.x;
this.y = t.y;
};
t.prototype.GetNegative = function() {
return new t(-this.x, -this.y);
};
t.prototype.NegativeSelf = function() {
this.x = -this.x;
this.y = -this.y;
};
t.prototype.Copy = function() {
return new t(this.x, this.y);
};
t.prototype.Add = function(t) {
this.x += t.x;
this.y += t.y;
};
t.prototype.Subtract = function(t) {
this.x -= t.x;
this.y -= t.y;
};
t.prototype.Multiply = function(t) {
void 0 === t && (t = 0);
this.x *= t;
this.y *= t;
};
t.prototype.CrossVF = function(t) {
void 0 === t && (t = 0);
var e = this.x;
this.x = t * this.y;
this.y = -t * e;
};
t.prototype.CrossFV = function(t) {
void 0 === t && (t = 0);
var e = this.x;
this.x = -t * this.y;
this.y = t * e;
};
t.prototype.MinV = function(t) {
this.x = this.x < t.x ? this.x : t.x;
this.y = this.y < t.y ? this.y : t.y;
};
t.prototype.MaxV = function(t) {
this.x = this.x > t.x ? this.x : t.x;
this.y = this.y > t.y ? this.y : t.y;
};
t.prototype.Abs = function() {
this.x < 0 && (this.x = -this.x);
this.y < 0 && (this.y = -this.y);
};
t.prototype.Length = function() {
return Math.sqrt(this.x * this.x + this.y * this.y);
};
t.prototype.LengthSquared = function() {
return this.x * this.x + this.y * this.y;
};
t.prototype.Normalize = function() {
var t = Math.sqrt(this.x * this.x + this.y * this.y);
if (t < Number.MIN_VALUE) return 0;
var e = 1 / t;
this.x *= e;
this.y *= e;
return t;
};
t.IsValid = function(t) {
void 0 === t && (t = 0);
return isFinite(t);
};
t.prototype.IsValid = function() {
return t.IsValid(this.x) && t.IsValid(this.y);
};
var e = b2.AABB = function() {
this.lowerBound = new t();
this.upperBound = new t();
};
e.prototype.IsValid = function() {
var t = this.upperBound.x - this.lowerBound.x, e = this.upperBound.y - this.lowerBound.y, i = t >= 0 && e >= 0;
return i = i && this.lowerBound.IsValid() && this.upperBound.IsValid();
};
e.prototype.GetCenter = function() {
return new t((this.lowerBound.x + this.upperBound.x) / 2, (this.lowerBound.y + this.upperBound.y) / 2);
};
e.prototype.GetExtents = function() {
return new t((this.upperBound.x - this.lowerBound.x) / 2, (this.upperBound.y - this.lowerBound.y) / 2);
};
e.prototype.Contains = function(t) {
var e = !0;
return e = (e = (e = (e = e && this.lowerBound.x <= t.lowerBound.x) && this.lowerBound.y <= t.lowerBound.y) && t.upperBound.x <= this.upperBound.x) && t.upperBound.y <= this.upperBound.y;
};
e.prototype.RayCast = function(t, e) {
var i = -Number.MAX_VALUE, n = Number.MAX_VALUE, o = e.p1.x, r = e.p1.y, s = e.p2.x - e.p1.x, c = e.p2.y - e.p1.y, a = Math.abs(s), l = Math.abs(c), h = t.normal, u = 0, d = 0, f = 0, _ = 0, p = 0;
if (a < Number.MIN_VALUE) {
if (o < this.lowerBound.x || this.upperBound.x < o) return !1;
} else {
u = 1 / s;
p = -1;
if ((d = (this.lowerBound.x - o) * u) > (f = (this.upperBound.x - o) * u)) {
_ = d;
d = f;
f = _;
p = 1;
}
if (d > i) {
h.x = p;
h.y = 0;
i = d;
}
if (i > (n = Math.min(n, f))) return !1;
}
if (l < Number.MIN_VALUE) {
if (r < this.lowerBound.y || this.upperBound.y < r) return !1;
} else {
u = 1 / c;
p = -1;
if ((d = (this.lowerBound.y - r) * u) > (f = (this.upperBound.y - r) * u)) {
_ = d;
d = f;
f = _;
p = 1;
}
if (d > i) {
h.y = p;
h.x = 0;
i = d;
}
if (i > (n = Math.min(n, f))) return !1;
}
t.fraction = i;
return !0;
};
e.prototype.TestOverlap = function(t) {
var e = t.lowerBound.x - this.upperBound.x, i = t.lowerBound.y - this.upperBound.y, n = this.lowerBound.x - t.upperBound.x, o = this.lowerBound.y - t.upperBound.y;
return !(e > 0 || i > 0) && !(n > 0 || o > 0);
};
e.Combine = function(t, i) {
var n = new e();
n.Combine(t, i);
return n;
};
e.prototype.Combine = function(t, e) {
this.lowerBound.x = Math.min(t.lowerBound.x, e.lowerBound.x);
this.lowerBound.y = Math.min(t.lowerBound.y, e.lowerBound.y);
this.upperBound.x = Math.max(t.upperBound.x, e.upperBound.x);
this.upperBound.y = Math.max(t.upperBound.y, e.upperBound.y);
};
var i = b2.FilterData = function() {
this.categoryBits = 1;
this.maskBits = 65535;
this.groupIndex = 0;
};
i.prototype.Copy = function() {
var t = new i();
t.categoryBits = this.categoryBits;
t.maskBits = this.maskBits;
t.groupIndex = this.groupIndex;
return t;
};
b2.FixtureDef = function() {
this.filter = new i();
this.shape = null;
this.userData = null;
this.friction = .2;
this.restitution = 0;
this.density = 0;
this.isSensor = !1;
};
b2.BodyDef = function() {
this.position = new t(0, 0);
this.linearVelocity = new t(0, 0);
this.userData = null;
this.angle = 0;
this.angularVelocity = 0;
this.linearDamping = 0;
this.angularDamping = 0;
this.allowSleep = !0;
this.awake = !0;
this.fixedRotation = !1;
this.bullet = !1;
this.type = b2.Body.b2_staticBody;
this.active = !0;
this.inertiaScale = 1;
this.gravityScale = 1;
};
b2.JointDef = function() {
this.type = b2.Joint.e_unknownJoint;
this.userData = null;
this.bodyA = null;
this.bodyB = null;
this.collideConnected = !1;
};
b2.DistanceJointDef = function() {
b2.JointDef.apply(this, arguments);
this.type = b2.Joint.e_distanceJoint;
this.localAnchorA = new t();
this.localAnchorB = new t();
this.length = 1;
this.frequencyHz = 0;
this.dampingRatio = 0;
};
b2.FrictionJointDef = function() {
b2.JointDef.apply(this, arguments);
this.type = b2.Joint.e_frictionJoint;
this.localAnchorA = new t();
this.localAnchorB = new t();
this.maxForce = 0;
this.maxTorque = 0;
};
b2.GearJointDef = function() {
b2.JointDef.apply(this, arguments);
this.type = b2.Joint.e_gearJoint;
this.joint1 = null;
this.joint2 = null;
this.ratio = 1;
};
b2.MotorJointDef = function() {
b2.JointDef.apply(this, arguments);
this.type = b2.Joint.e_motorJoint;
this.linearOffset = new t();
this.angularOffset = 0;
this.maxForce = 1;
this.maxTorque = 1;
this.correctionFactor = .3;
};
b2.MouseJointDef = function() {
b2.JointDef.apply(this, arguments);
this.type = b2.Joint.e_mouseJoint;
this.target = new t();
this.maxForce = 0;
this.frequencyHz = 5;
this.dampingRatio = .7;
};
b2.PrismaticJointDef = function() {
b2.JointDef.apply(this, arguments);
this.type = b2.Joint.e_prismaticJoint;
this.localAnchorA = new t();
this.localAnchorB = new t();
this.localAxisA = new t(1, 0);
this.referenceAngle = 0;
this.enableLimit = !1;
this.lowerTranslation = 0;
this.upperTranslation = 0;
this.enableMotor = !1;
this.maxMotorForce = 0;
this.motorSpeed = 0;
};
b2.PulleyJointDef = function() {
b2.JointDef.apply(this, arguments);
this.type = b2.Joint.e_pulleyJoint;
this.groundAnchorA = new t(-1, 1);
this.groundAnchorB = new t(1, 1);
this.localAnchorA = new t(-1, 0);
this.localAnchorB = new t(1, 0);
this.lengthA = 0;
this.lengthB = 0;
this.ratio = 1;
this.collideConnected = !0;
};
b2.RevoluteJointDef = function() {
b2.JointDef.apply(this, arguments);
this.type = b2.Joint.e_revoluteJoint;
this.localAnchorA = new t(0, 0);
this.localAnchorB = new t(0, 0);
this.referenceAngle = 0;
this.lowerAngle = 0;
this.upperAngle = 0;
this.maxMotorTorque = 0;
this.motorSpeed = 0;
this.enableLimit = !1;
this.enableMotor = !1;
};
b2.RopeJointDef = function() {
b2.JointDef.apply(this, arguments);
this.type = b2.Joint.e_ropeJoint;
this.localAnchorA = new t(-1, 0);
this.localAnchorB = new t(1, 0);
this.maxLength = 0;
};
b2.WeldJointDef = function() {
b2.JointDef.apply(this, arguments);
this.type = b2.Joint.e_weldJoint;
this.localAnchorA = new t(0, 0);
this.localAnchorB = new t(0, 0);
this.referenceAngle = 0;
this.frequencyHz = 0;
this.dampingRatio = 0;
};
b2.WheelJointDef = function() {
b2.JointDef.apply(this, arguments);
this.type = b2.Joint.e_wheelJoint;
this.localAnchorA = new t();
this.localAnchorB = new t();
this.localAxisA = new t(1, 0);
this.enableMotor = !1;
this.maxMotorTorque = 0;
this.motorSpeed = 0;
this.frequencyHz = 2;
this.dampingRatio = .7;
};
b2.WorldManifold = function() {
this.normal = new b2.Vec2();
this.points = [];
this.separations = [];
};
var n = b2.Shape.prototype;
cc.defineGetterSetter(n, "m_radius", n.GetRadius, n.SetRadius);
n = b2.CircleShape.prototype;
cc.defineGetterSetter(n, "m_p", n.GetPosition, n.SetPosition);
b2.Body.b2_staticBody = 0;
b2.Body.b2_kinematicBody = 1;
b2.Body.b2_dynamicBody = 2;
b2.Draw.e_shapeBit = 1;
b2.Draw.e_jointBit = 2;
b2.Draw.e_aabbBit = 4;
b2.Draw.e_pairBit = 8;
b2.Draw.e_centerOfMassBit = 16;
b2.Joint.e_unknownJoint = 0;
b2.Joint.e_revoluteJoint = 1;
b2.Joint.e_prismaticJoint = 2;
b2.Joint.e_distanceJoint = 3;
b2.Joint.e_pulleyJoint = 4;
b2.Joint.e_mouseJoint = 5;
b2.Joint.e_gearJoint = 6;
b2.Joint.e_wheelJoint = 7;
b2.Joint.e_weldJoint = 8;
b2.Joint.e_frictionJoint = 9;
b2.Joint.e_ropeJoint = 10;
b2.Joint.e_motorJoint = 11;
b2.Joint.e_inactiveLimit = 0;
b2.Joint.e_atLowerLimit = 1;
b2.Joint.e_atUpperLimit = 2;
b2.Joint.e_equalLimits = 3;
b2.maxPolygonVertices = 8;
b2.maxManifoldPoints = 2;
})();
}), {} ],
188: [ (function(i, n, o) {
"use strict";
var r = i("../cocos2d/core/load-pipeline/auto-release-utils"), s = i("../cocos2d/core/component-scheduler"), c = i("../cocos2d/core/node-activator"), a = i("../cocos2d/core/event/event-listeners");
cc.director._purgeDirector = cc.director.purgeDirector;
cc.js.mixin(cc.director, {
sharedInit: function() {
this._compScheduler = new s();
this._nodeActivator = new c();
var t = this.getScheduler();
if (cc.AnimationManager) {
this._animationManager = new cc.AnimationManager();
t.scheduleUpdate(this._animationManager, cc.Scheduler.PRIORITY_SYSTEM, !1);
} else this._animationManager = null;
if (cc.CollisionManager) {
this._collisionManager = new cc.CollisionManager();
t.scheduleUpdate(this._collisionManager, cc.Scheduler.PRIORITY_SYSTEM, !1);
} else this._collisionManager = null;
if (cc.PhysicsManager) {
this._physicsManager = new cc.PhysicsManager();
this.getScheduler().scheduleUpdate(this._physicsManager, cc.Scheduler.PRIORITY_SYSTEM, !1);
} else this._physicsManager = null;
cc._widgetManager.init(this);
cc.loader.init(this);
},
purgeDirector: function() {
this._compScheduler.unscheduleAll();
this._nodeActivator.reset();
this._purgeDirector();
},
reset: function() {
this.purgeDirector();
cc.eventManager && cc.eventManager.setEnabled(!0);
this._animationManager && this.getScheduler().scheduleUpdate(this._animationManager, cc.Scheduler.PRIORITY_SYSTEM, !1);
this._collisionManager && this.getScheduler().scheduleUpdate(this._collisionManager, cc.Scheduler.PRIORITY_SYSTEM, !1);
this._physicsManager && this.getScheduler().scheduleUpdate(this._physicsManager, cc.Scheduler.PRIORITY_SYSTEM, !1);
this.startAnimation();
},
getActionManager: function() {
return this._actionManager;
},
setActionManager: function(t) {
if (this._actionManager !== t) {
this._actionManager && this._scheduler.unscheduleUpdate(this._actionManager);
this._actionManager = t;
this._scheduler.scheduleUpdate(this._actionManager, cc.Scheduler.PRIORITY_SYSTEM, !1);
}
},
getAnimationManager: function() {
return this._animationManager;
},
getCollisionManager: function() {
return this._collisionManager;
},
getPhysicsManager: function() {
return this._physicsManager;
},
getScene: function() {
return this._scene;
},
runSceneImmediate: function(t, e, i) {
var n = window.console;
if (t instanceof cc.Scene) {
n.time("I");
t._load();
n.timeEnd("I");
}
for (var o = cc.game, s = Object.keys(o._persistRootNodes).map((function(t) {
return o._persistRootNodes[t];
})), c = 0; c < s.length; c++) {
var a = s[c];
o._ignoreRemovePersistNode = a;
a.parent = null;
o._ignoreRemovePersistNode = null;
}
var l = this._scene;
n.time("AR");
var h = l && l.autoReleaseAssets && l.dependAssets;
r.autoRelease(h, t.dependAssets, s);
n.timeEnd("AR");
n.time("D");
cc.isValid(l) && l.destroy();
this._scene = null;
cc.Object._deferredDestroy();
n.timeEnd("D");
e && e();
this.emit(cc.Director.EVENT_BEFORE_SCENE_LAUNCH, t);
var u = t;
if (t instanceof cc.Scene) {
this._scene = t;
u = t._sgNode;
n.time("AP");
for (var d = 0; d < s.length; d++) {
var f = s[d], _ = t.getChildByUuid(f.uuid);
if (_) {
var p = _.getSiblingIndex();
_._destroyImmediate();
t.insertChild(f, p);
} else f.parent = t;
}
n.timeEnd("AP");
n.time("A");
t._activate();
n.timeEnd("A");
}
this.getRunningScene() ? this.replaceScene(u) : this.runWithScene(u);
i && i(null, t);
this.emit(cc.Director.EVENT_AFTER_SCENE_LAUNCH, t);
},
runScene: function(t, e, i) {
cc.assertID(t, 1205);
t instanceof cc.Scene && t._load();
this.once(cc.Director.EVENT_AFTER_UPDATE, (function() {
this.runSceneImmediate(t, e, i);
}));
},
_getSceneUuid: function(i) {
var n = cc.game._sceneInfos;
if ("string" === ("object" == (e = typeof i) ? t(i) : e)) {
i.endsWith(".fire") || (i += ".fire");
"/" === i[0] || i.startsWith("db://assets/") || (i = "/" + i);
for (var o = 0; o < n.length; o++) {
var r = n[o];
if (r.url.endsWith(i)) return r;
}
} else if ("number" === ("object" == (e = typeof i) ? t(i) : e)) {
if (0 <= i && i < n.length) return n[i];
cc.errorID(1211, i);
} else cc.errorID(1212, i);
return null;
},
setRuntimeLaunchScene: function(t) {
var e = this._getSceneUuid(t);
this._launchSceneUuid = e.uuid;
},
loadScene: function(t, e, i) {
if (this._loadingScene) {
cc.errorID(1213, t, this._loadingScene);
return !1;
}
var n = this._getSceneUuid(t);
if (n) {
var o = n.uuid;
this.emit(cc.Director.EVENT_BEFORE_SCENE_LOADING, t);
this._loadingScene = t;
if (cc.runtime && o !== this._launchSceneUuid) {
var r = this, s = cc.path.basename(n.url) + "_" + n.uuid;
console.log("==> start preload: " + s);
var c = !1;
cc.LoaderLayer.preload([ s ], (function() {
console.log("==> end preload: " + s);
c ? r._loadSceneByUuid(o, e, i) : setTimeout((function() {
r._loadSceneByUuid(o, e, i);
}), 0);
}));
c = !0;
} else this._loadSceneByUuid(o, e, i);
return !0;
}
cc.errorID(1214, t);
return !1;
},
preloadScene: function(t, e) {
var i = this._getSceneUuid(t);
if (i) {
this.emit(cc.Director.EVENT_BEFORE_SCENE_LOADING, t);
cc.loader.load({
uuid: i.uuid,
type: "uuid"
}, (function(i, n) {
i && cc.errorID(1215, t, i.message);
e && e(i, n);
}));
} else {
var n = 'Can not preload the scene "' + t + '" because it is not in the build settings.';
e(new Error(n));
cc.error("preloadScene: " + n);
}
},
_loadSceneByUuid: function(t, e, i, n) {
0;
console.time("LoadScene " + t);
cc.AssetLibrary.loadAsset(t, (function(n, o) {
console.timeEnd("LoadScene " + t);
var r = cc.director;
r._loadingScene = "";
if (n) {
n = "Failed to load scene: " + n;
cc.error(n);
} else {
if (o instanceof cc.SceneAsset) {
var s = o.scene;
s._id = o._uuid;
s._name = o._name;
r.runSceneImmediate(s, i, e);
return;
}
n = "The asset " + t + " is not a scene";
cc.error(n);
}
e && e(n);
}));
},
__fastOn: function(t, e, i) {
var n = this._bubblingListeners;
n || (n = this._bubblingListeners = new a());
n.add(t, e, i);
this._addEventFlag(t, n, !1);
},
__fastOff: function(t, e, i) {
var n = this._bubblingListeners;
if (n) {
n.remove(t, e, i);
this._purgeEventFlag(t, n, !1);
}
}
});
cc.defineGetterSetter(cc.director, "actionManager", cc.director.getActionManager, cc.director.setActionManager);
cc.EventTarget.call(cc.director);
cc.js.addon(cc.director, cc.EventTarget.prototype);
cc.Director.EVENT_PROJECTION_CHANGED = "director_projection_changed";
cc.Director.EVENT_AFTER_DRAW = "director_after_draw";
cc.Director.EVENT_BEFORE_VISIT = "director_before_visit";
cc.Director.EVENT_AFTER_VISIT = "director_after_visit";
cc.Director.EVENT_BEFORE_UPDATE = "director_before_update";
cc.Director.EVENT_AFTER_UPDATE = "director_after_update";
cc.Director.EVENT_BEFORE_SCENE_LOADING = "director_before_scene_loading";
cc.Director.EVENT_BEFORE_SCENE_LAUNCH = "director_before_scene_launch";
cc.Director.EVENT_AFTER_SCENE_LAUNCH = "director_after_scene_launch";
cc.Director._EVENT_NEXT_TICK = "_director_next_tick";
cc.Director._beforeUpdateListener = cc.EventListener.create({
event: cc.EventListener.CUSTOM,
eventName: cc.Director.EVENT_BEFORE_UPDATE,
callback: function() {
cc.director.emit(cc.Director._EVENT_NEXT_TICK);
cc.director.emit(cc.Director.EVENT_BEFORE_UPDATE);
cc.director._compScheduler.startPhase();
var t = cc.director.getDeltaTime();
cc.director._compScheduler.updatePhase(t);
}
});
cc.Director._afterUpdateListener = cc.EventListener.create({
event: cc.EventListener.CUSTOM,
eventName: cc.Director.EVENT_AFTER_UPDATE,
callback: function() {
var t = cc.director.getDeltaTime();
cc.director._compScheduler.lateUpdatePhase(t);
cc.director.emit(cc.Director.EVENT_AFTER_UPDATE);
cc.Object._deferredDestroy();
cc.director.emit(cc.Director.EVENT_BEFORE_VISIT, this);
}
});
cc.Director._afterVisitListener = cc.EventListener.create({
event: cc.EventListener.CUSTOM,
eventName: cc.Director.EVENT_AFTER_VISIT,
callback: function() {
cc.director.emit(cc.Director.EVENT_AFTER_VISIT, this);
}
});
cc.Director._afterDrawListener = cc.EventListener.create({
event: cc.EventListener.CUSTOM,
eventName: cc.Director.EVENT_AFTER_DRAW,
callback: function() {
cc.director.emit(cc.Director.EVENT_AFTER_DRAW, this);
}
});
cc.eventManager.addEventListenerWithFixedPriority(cc.Director._beforeUpdateListener, 1);
cc.eventManager.addEventListenerWithFixedPriority(cc.Director._afterUpdateListener, 1);
cc.eventManager.addEventListenerWithFixedPriority(cc.Director._afterVisitListener, 1);
cc.eventManager.addEventListenerWithFixedPriority(cc.Director._afterDrawListener, 1);
}), {
"../cocos2d/core/component-scheduler": 40,
"../cocos2d/core/event/event-listeners": 77,
"../cocos2d/core/load-pipeline/auto-release-utils": 91,
"../cocos2d/core/node-activator": 104
} ],
189: [ (function(t, e, i) {
var n = dragonBones.CCArmatureDisplay.prototype;
cc.js.mixin(n, cc.EventTarget.prototype);
n.addEvent = function(t, e, i) {
if (!this.hasEventCallback()) {
var n = this;
this.setEventCallback((function(t) {
n.emit(t.type, t);
}));
}
this.on(t, e, i);
};
var o = [ dragonBones.EventObject.START, dragonBones.EventObject.LOOP_COMPLETE, dragonBones.EventObject.COMPLETE, dragonBones.EventObject.FADE_IN, dragonBones.EventObject.FADE_IN_COMPLETE, dragonBones.EventObject.FADE_OUT, dragonBones.EventObject.FADE_OUT_COMPLETE, dragonBones.EventObject.FRAME_EVENT, dragonBones.EventObject.SOUND_EVENT ];
n.removeEvent = function(t, e, i) {
this.off(t, e, i);
for (var n = !0, r = 0, s = o.length; r < s; r++) {
var c = o[r];
if (this.hasEventListener(c)) {
n = !1;
break;
}
}
n && this.clearEventCallback();
};
var r = dragonBones.Armature.prototype;
r.addEventListener = function(t, e, i) {
this.display.addEvent(t, e, i);
};
r.removeEventListener = function(t, e, i) {
this.display.removeEvent(t, e, i);
};
}), {} ],
190: [ (function(t, e, i) {
"use strict";
var n = cc.EditBox.prototype;
n._setMaxLength = n.setMaxLength;
n.setMaxLength = function(t) {
t < 0 && (t = 65535);
this._setMaxLength(t);
};
cc.defineGetterSetter(n, "font", null, n.setFont);
cc.defineGetterSetter(n, "fontName", null, n.setFontName);
cc.defineGetterSetter(n, "fontSize", null, n.setFontSize);
cc.defineGetterSetter(n, "fontColor", null, n.setFontColor);
cc.defineGetterSetter(n, "string", n.getString, n.setString);
cc.defineGetterSetter(n, "maxLength", n.getMaxLength, n.setMaxLength);
cc.defineGetterSetter(n, "placeholder", n.getPlaceHolder, n.setPlaceHolder);
cc.defineGetterSetter(n, "placeholderFont", null, n.setPlaceholderFont);
cc.defineGetterSetter(n, "placeholderFontName", null, n.setPlaceholderFontName);
cc.defineGetterSetter(n, "placeholderFontSize", null, n.setPlaceholderFontSize);
cc.defineGetterSetter(n, "placeholderFontColor", null, n.setPlaceholderFontColor);
cc.defineGetterSetter(n, "inputFlag", null, n.setInputFlag);
cc.defineGetterSetter(n, "delegate", null, n.setDelegate);
cc.defineGetterSetter(n, "inputMode", null, n.setInputMode);
cc.defineGetterSetter(n, "returnType", null, n.setReturnType);
n.setLineHeight = function() {};
n.setTabIndex = function() {};
n.getTabIndex = function() {
return -1;
};
n.setFocus = function() {};
n.isFocused = function() {
return !1;
};
n.stayOnTop = function() {};
cc.EditBox.InputMode = cc.Enum({
ANY: 0,
EMAIL_ADDR: 1,
NUMERIC: 2,
PHONE_NUMBER: 3,
URL: 4,
DECIMAL: 5,
SINGLE_LINE: 6
});
cc.EditBox.InputFlag = cc.Enum({
PASSWORD: 0,
SENSITIVE: 1,
INITIAL_CAPS_WORD: 2,
INITIAL_CAPS_SENTENCE: 3,
INITIAL_CAPS_ALL_CHARACTERS: 4,
DEFAULT: 5
});
cc.EditBox.KeyboardReturnType = cc.Enum({
DEFAULT: 0,
DONE: 1,
SEND: 2,
SEARCH: 3,
GO: 4
});
}), {} ],
191: [ (function(t, e, i) {
"use strict";
cc.TextAlignment = cc.Enum({
LEFT: 0,
CENTER: 1,
RIGHT: 2
});
cc.VerticalTextAlignment = cc.Enum({
TOP: 0,
CENTER: 1,
BOTTOM: 2
});
}), {} ],
192: [ (function(i, n, o) {
"use strict";
cc.sys.now = function() {
return Date.now();
};
var r = /[^\.\/]+\/\.\.\//;
cc.js.mixin(cc.path, {
_normalize: function(t) {
var e = t = String(t);
do {
e = t;
t = t.replace(r, "");
} while (e.length !== t.length);
return t;
},
sep: cc.sys.os === cc.sys.OS_WINDOWS ? "\\" : "/",
stripSep: function(t) {
return t.replace(/[\/\\]$/, "");
}
});
var s = cc.Node.prototype;
cc.defineGetterSetter(s, "_parent", s.getParent, s.setParent);
cc.view.isViewReady = cc.view.isOpenGLReady;
cc.view.setOrientation = function() {};
var c = 0, a = {}, l = function(t) {
this.__instanceId = cc.ClassManager.getNewInstanceId();
this._intervalId = c++;
this._code = t;
};
l.prototype.fun = function() {
if (this._code) {
var i = this._code;
"string" === ("object" == (e = typeof i) ? t(i) : e) ? Function(i)() : "function" === ("object" == (e = typeof i) ? t(i) : e) && i.apply(null, this._args);
}
};
window.setTimeout = function(t, e) {
var i = new l(t);
arguments.length > 2 && (i._args = Array.prototype.slice.call(arguments, 2));
var n = i.fun;
i.fun = function() {
n.apply(this, arguments);
clearTimeout(i._intervalId);
};
cc.director.getScheduler().schedule(i.fun, i, e / 1e3, 0, 0, !1);
a[i._intervalId] = i;
return i._intervalId;
};
window.setInterval = function(t, e) {
var i = new l(t);
arguments.length > 2 && (i._args = Array.prototype.slice.call(arguments, 2));
cc.director.getScheduler().schedule(i.fun, i, e / 1e3, cc.macro.REPEAT_FOREVER, 0, !1);
a[i._intervalId] = i;
return i._intervalId;
};
window.clearInterval = function(t) {
var e = a[t];
if (e) {
cc.director.getScheduler().unschedule(e.fun, e);
delete a[t];
}
};
window.clearTimeout = clearInterval;
if (window.SocketIO) {
window.io = window.SocketIO;
SocketIO.prototype._jsbEmit = SocketIO.prototype.emit;
SocketIO.prototype.emit = function(i, n) {
"object" === ("object" == (e = typeof n) ? t(n) : e) && (n = JSON.stringify(n));
this._jsbEmit(i, n);
};
}
cc.Node.prototype.setIgnoreAnchorPointForPosition = cc.Node.prototype.ignoreAnchorPointForPosition;
window._ccsg = {
Node: cc.Node,
Scene: cc.Scene,
Sprite: cc.Sprite,
ParticleSystem: cc.ParticleSystem,
Label: cc.Label,
EditBox: cc.EditBox,
VideoPlayer: cc.VideoPlayer,
WebView: cc.WebView,
TMXTiledMap: cc.TMXTiledMap,
TMXObjectGroup: cc.TMXObjectGroup,
TMXObject: cc.TMXObject,
TMXObjectImage: cc.TMXObjetImage,
TMXObjectShape: cc.TMXObjectShape,
TMXLayer: cc.TMXLayer,
MotionStreak: cc.MotionStreak,
CameraNode: cc.CameraNode
};
cc.formatStr = cc.js.formatStr;
cc.Image && cc.Image.setPNGPremultipliedAlphaEnabled && cc.Image.setPNGPremultipliedAlphaEnabled(!1);
window.__cleanup = function() {
cc.director.getScene().destroy();
cc.Object._deferredDestroy();
cc.js._registeredClassIds = {};
cc.js._registeredClassNames = {};
cc.loader.releaseAll();
cc.textureCache.removeAllTextures();
};
}), {} ],
193: [ (function(i, n, o) {
"use strict";
var r = i("../cocos2d/core/platform/js").Pool, s = i("../cocos2d/core/event/event");
i("../cocos2d/core/event-manager/CCEvent");
s.EventMouse.pool = new r(5);
s.EventMouse.pool.get = function(t, e) {
var i = this._get() || new s.EventMouse(e, !0);
i._button = t.getButton();
var n = t.getLocation();
i._x = n.x;
i._y = n.y;
var o = t._listener;
if (o) {
i._prevX = o._previousX;
i._prevY = o._previousY;
}
i._scrollX = t.getScrollX();
i._scrollY = t.getScrollY();
i._target = null;
i._currentTarget = null;
i.eventPhase = cc.Event.NONE;
i._propagationStopped = !1;
i._propagationImmediateStopped = !1;
return i;
};
s.EventTouch.pool = new r(5);
s.EventTouch.pool.get = function(t) {
var e = t.getTouches(), i = this._get() || new s.EventTouch(e, !0);
i.eventPhase = cc.Event.NONE;
i._eventCode = t.getEventCode();
i._touches = e;
i._target = null;
i._currentTarget = null;
i._propagationStopped = !1;
i._propagationImmediateStopped = !1;
return i;
};
cc.eventManager.addListener = function(i, n) {
i instanceof cc.EventListener || (i = cc.EventListener.create(i));
if ("number" === ("object" == (e = typeof n) ? t(n) : e)) {
if (0 === n) {
cc.logID(3500);
return;
}
cc.eventManager.addEventListenerWithFixedPriority(i, n);
} else {
var o = n;
if (n instanceof cc._BaseNode) o = n._sgNode; else if (!(o instanceof _ccsg.Node)) {
cc.warnID(3506);
return;
}
cc.eventManager.addEventListenerWithSceneGraphPriority(i, o);
}
return i;
};
cc.eventManager._removeListeners = cc.eventManager.removeListeners;
cc.eventManager.removeListeners = function(t, e) {
t instanceof cc._BaseNode && (t = t._sgNode);
t instanceof _ccsg.Node || cc.js.isNumber(t) ? this._removeListeners(t, e || !1) : cc.warnID(3506);
};
cc.eventManager._pauseTarget = cc.eventManager.pauseTarget;
cc.eventManager.pauseTarget = function(t, e) {
var i = t;
t._eventPaused = !0;
if (t instanceof cc._BaseNode) i = t._sgNode; else if (!(i instanceof _ccsg.Node)) {
cc.warnID(3506);
return;
}
if (i !== t && !i.isRunning()) {
var n = i.onEnter;
i.onEnter = function() {
n.call(this);
t._eventPaused && cc.eventManager._pauseTarget(this, e || !1);
this.onEnter = n;
};
}
this._pauseTarget(i, e || !1);
};
cc.eventManager._resumeTarget = cc.eventManager.resumeTarget;
cc.eventManager.resumeTarget = function(t, e) {
t._eventPaused = !1;
if (t instanceof cc._BaseNode) t = t._sgNode; else if (!(t instanceof _ccsg.Node)) {
cc.warnID(3506);
return;
}
this._resumeTarget(t, e || !1);
};
cc._EventListenerKeyboard = cc.EventListenerKeyboard;
cc._EventListenerKeyboard.LISTENER_ID = "__cc_keyboard";
cc._EventListenerAcceleration = cc.EventListenerAcceleration;
cc._EventListenerAcceleration.LISTENER_ID = "__cc_acceleration";
cc._EventListenerTouchAllAtOnce = cc.EventListenerTouchAllAtOnce;
cc._EventListenerTouchAllAtOnce.LISTENER_ID = "__cc_touch_all_at_once";
cc._EventListenerTouchOneByOne = cc.EventListenerTouchOneByOne;
cc._EventListenerTouchOneByOne.LISTENER_ID = "__cc_touch_one_by_one";
cc._EventListenerMouse = cc.EventListenerMouse;
cc._EventListenerMouse.LISTENER_ID = "__cc_mouse";
}), {
"../cocos2d/core/event-manager/CCEvent": 75,
"../cocos2d/core/event/event": 79,
"../cocos2d/core/platform/js": 142
} ],
194: [ (function(i, n, o) {
"use strict";
cc.game = {
DEBUG_MODE_NONE: 0,
DEBUG_MODE_INFO: 1,
DEBUG_MODE_WARN: 2,
DEBUG_MODE_ERROR: 3,
DEBUG_MODE_INFO_FOR_WEB_PAGE: 4,
DEBUG_MODE_WARN_FOR_WEB_PAGE: 5,
DEBUG_MODE_ERROR_FOR_WEB_PAGE: 6,
EVENT_HIDE: "game_on_hide",
EVENT_SHOW: "game_on_show",
EVENT_RESIZE: "game_on_resize",
_onShowListener: null,
_onHideListener: null,
_paused: !1,
_prepareCalled: !1,
_prepared: !1,
config: null,
onStart: null,
_sceneInfos: [],
_persistRootNodes: {},
_ignoreRemovePersistNode: null,
RENDER_TYPE_CANVAS: 0,
RENDER_TYPE_WEBGL: 1,
RENDER_TYPE_OPENGL: 2,
EVENT_GAME_INITED: "game_inited",
CONFIG_KEY: {
width: "width",
height: "height",
modules: "modules",
debugMode: "debugMode",
showFPS: "showFPS",
frameRate: "frameRate",
id: "id",
renderMode: "renderMode",
registerSystemEvent: "registerSystemEvent",
jsList: "jsList",
scenes: "scenes"
},
setFrameRate: function(t) {
this.config[this.CONFIG_KEY.frameRate] = t;
cc.director.setAnimationInterval(1 / t);
},
step: function() {
cc.director.mainLoop();
},
pause: function() {
this._paused = !0;
cc.director.pause();
},
resume: function() {
this._paused = !1;
cc.director.resume();
},
isPaused: function() {
return this._paused;
},
restart: function() {
__restartVM();
},
end: function() {
close();
},
prepare: function(t) {
var e = this, i = e.config, n = e.CONFIG_KEY;
this._loadConfig();
if (this._prepared) t && t(); else if (!this._prepareCalled) {
this._prepareCalled = !0;
cc._renderType = cc.game.RENDER_TYPE_OPENGL;
cc.director.sharedInit();
var o = i[n.jsList];
if (o) cc.loader.load(o, (function(i) {
if (i) throw new Error(JSON.stringify(i));
e._prepared = !0;
t && t();
e.emit(e.EVENT_GAME_INITED);
})); else {
t && t();
e.emit(e.EVENT_GAME_INITED);
}
}
},
run: function(i, n) {
if ("function" === ("object" == (e = typeof i) ? t(i) : e)) cc.game.onStart = i; else {
i && (cc.game.config = i);
"function" === ("object" == (e = typeof n) ? t(n) : e) && (cc.game.onStart = n);
}
cc.director.startAnimation();
this.prepare(cc.game.onStart && cc.game.onStart.bind(cc.game));
},
addPersistRootNode: function(t) {
if (cc.Node.isNode(t) && t.uuid) {
var e = t.uuid;
if (!this._persistRootNodes[e]) {
var i = cc.director._scene;
if (cc.isValid(i)) {
if (t.parent) {
if (!(t.parent instanceof cc.Scene)) {
cc.warnID(3801);
return;
}
if (t.parent !== i) {
cc.warnID(3802);
return;
}
} else t.parent = i;
this._persistRootNodes[e] = t;
t._persistNode = !0;
}
}
} else cc.warnID(3803);
},
removePersistRootNode: function(t) {
if (t !== this._ignoreRemovePersistNode) {
var e = t._id || "";
if (t === this._persistRootNodes[e]) {
delete this._persistRootNodes[e];
t._persistNode = !1;
}
}
},
isPersistRootNode: function(t) {
return t._persistNode;
},
_loadConfig: function() {
if (this.config) this._initConfig(this.config); else try {
var t = jsb.fileUtils.getStringFromFile("project.json"), e = JSON.parse(t);
this._initConfig(e || {});
} catch (t) {
console.log("Failed to read or parse project.json");
this._initConfig({});
}
},
_initConfig: function(i) {
var n = this.CONFIG_KEY;
"number" !== ("object" == (e = typeof i[n.debugMode]) ? t(i[n.debugMode]) : e) && (i[n.debugMode] = 0);
"number" !== ("object" == (e = typeof i[n.frameRate]) ? t(i[n.frameRate]) : e) && (i[n.frameRate] = 60);
"number" !== ("object" == (e = typeof i[n.renderMode]) ? t(i[n.renderMode]) : e) && (i[n.renderMode] = 0);
i[n.showFPS] = !(n.showFPS in i) || !!i[n.showFPS];
this.groupList = i.groupList || [];
this.collisionMatrix = i.collisionMatrix || [];
this._sceneInfos = i[n.scenes] || [];
cc.director.setDisplayStats(i[n.showFPS]);
cc.director.setAnimationInterval(1 / i[n.frameRate]);
cc._initDebugSetting(i[n.debugMode]);
this.config = i;
}
};
cc.EventTarget.call(cc.game);
cc.js.addon(cc.game, cc.EventTarget.prototype);
cc.game._onHideListener = cc.eventManager.addCustomListener(cc.game.EVENT_HIDE, (function() {
cc.game.emit(cc.game.EVENT_HIDE, cc.game);
}));
cc.game._onShowListener = cc.eventManager.addCustomListener(cc.game.EVENT_SHOW, (function() {
cc.game.emit(cc.game.EVENT_SHOW, cc.game);
}));
cc._initDebugSetting(cc.game.DEBUG_MODE_INFO);
}), {} ],
195: [ (function(i, n, o) {
"use strict";
var r = cc.Label;
!r.createWithTTF && r.prototype.createWithTTF && (r.createWithTTF = r.prototype.createWithTTF);
r.prototype.setHorizontalAlign = r.prototype.setHorizontalAlignment;
r.prototype.setVerticalAlign = r.prototype.setVerticalAlignment;
r.prototype.setBMFontSize || (r.prototype.setBMFontSize = function() {});
r.prototype.getBMFontSize || (r.prototype.getBMFontSize = function() {});
r.prototype.setOverflow || (r.prototype.setOverflow = function() {});
r.prototype.getOverflow || (r.prototype.getOverflow = function() {});
r.prototype._setOverflow = r.prototype.setOverflow;
r.prototype.setOverflow = function(t) {
this._overFlow = t;
this._setOverflow(this._overFlow);
};
r.prototype.getOverflow = function() {
return this._overFlow;
};
r.prototype._enableBold = r.prototype.enableBold;
r.prototype.enableBold = function(t) {
t ? this._enableBold() : this.disableEffect(5);
};
r.prototype._enableItalics = r.prototype.enableItalics;
r.prototype.enableItalics = function(t) {
t ? this._enableItalics() : this.disableEffect(4);
};
r.prototype._enableUnderline = r.prototype.enableUnderline;
r.prototype.enableUnderline = function(t) {
t ? this._enableUnderline() : this.disableEffect(6);
};
r.prototype.setFontSize = function(t) {
this._fontSize = t;
if (this._labelType === _ccsg.Label.Type.SystemFont) this.setSystemFontSize(t); else if (this._labelType === _ccsg.Label.Type.BMFont) this.setBMFontSize(t); else if (this._labelType === _ccsg.Label.Type.TTF) {
var e = this.getTTFConfig();
e.fontSize = t;
this.setTTFConfig(e);
}
};
r.prototype.getFontSize = function() {
return this._fontSize;
};
r.prototype.enableWrapText = r.prototype.enableWrap || function() {};
r.prototype.isWrapTextEnabled = r.prototype.isWrapEnabled || function() {};
r.prototype._setLineHeight = r.prototype.setLineHeight;
r.prototype.setLineHeight = function(t) {
this._labelType !== _ccsg.Label.Type.SystemFont ? this._setLineHeight(t) : 40 !== t && cc.warnID(4013);
};
r.prototype._setColor = r.prototype.setColor;
r.prototype.setColor = function(t) {
this._labelType === _ccsg.Label.Type.BMFont ? this._setColor(t) : this.setTextColor(t);
};
r.prototype.setSpacingX = r.prototype.setAdditionalKerning;
r.prototype._setTTFConfig = r.prototype.setTTFConfig;
r.prototype.setTTFConfig = function(t) {
this._setTTFConfig(t);
this._ttfConfig = t;
};
r.prototype.getTTFConfig = function() {
return this._ttfConfig;
};
r.prototype._setContentSize = r.prototype.setContentSize;
r.prototype.setContentSize = function(i, n) {
var o = "number" === ("object" == (e = typeof i.width) ? t(i.width) : e) ? i.width : i, r = "number" === ("object" == (e = typeof i.height) ? t(i.height) : e) ? i.height : n;
if (this.getOverflow() === cc.Label.Overflow.NONE) {
o = 0;
r = 0;
} else this._setContentSize(o, r);
this.setDimensions(o, r);
};
r.prototype.setFontAsset = function(t) {
this._fontAsset = t;
var e = t instanceof cc.Font;
if (e) {
var i = e ? t.rawUrl : "";
if (".ttf" === cc.path.extname(i)) {
var n = this.isOutlined() ? this.getOutlineWidth() : 0;
if (this._ttfConfig) {
this._ttfConfig.outlineSize = n;
this._ttfConfig.fontFilePath = i;
} else this._ttfConfig = {
fontFilePath: i,
fontSize: this._fontSize,
outlineSize: n,
glyphs: 0,
customGlyphs: "",
distanceFieldEnable: !1
};
this._labelType = _ccsg.Label.Type.TTF;
this.setTTFConfig(this._ttfConfig);
} else if (t.spriteFrame) {
this._labelType = _ccsg.Label.Type.BMFont;
this.setBMFontFilePath(JSON.stringify(t._fntConfig), t.spriteFrame);
this.setFontSize(this.getFontSize());
}
this.getContentSize();
} else this.setFontFamily("Arial");
};
r.prototype.setFontFamily = function(t) {
t = t || "";
this._labelType = _ccsg.Label.Type.SystemFont;
this.setSystemFontName(t);
this._isSystemFontUsed = !0;
this.getContentSize();
};
r.prototype.setOutlined = function(t) {
this._outlined = !!t;
this._outlined ? this.enableOutline(this.getOutlineColor(), this.getOutlineWidth()) : this.disableEffect(1);
};
r.prototype.setOutlineWidth = function(t) {
this._outlineWidth = t;
if (this._outlined) {
var e = this.getOutlineWidth();
if (this._labelType === _ccsg.Label.Type.TTF) {
var i = this.getTTFConfig();
if (i.outlineSize !== e) {
i.outlineSize = e;
this.setTTFConfig(i);
}
} else this.enableOutline(this.getOutlineColor(), e);
}
};
r.prototype.setOutlineColor = function(t) {
this._outlineColor = cc.color(t);
this._outlined && this.enableOutline(this.getOutlineColor(), this.getOutlineWidth());
};
r.prototype.setMargin = function() {};
r.prototype.isOutlined = function() {
return this._outlined;
};
r.prototype.getOutlineWidth = function() {
return this._outlineWidth || 1;
};
r.prototype.getOutlineColor = function() {
return this._outlineColor || cc.color(255, 255, 255, 255);
};
cc.Label = function(t, e, i, n) {
e = e || "Arial";
var o = cc.path.extname(e), s = _ccsg.Label.Type.TTF;
this._fontSize = n;
var c;
if (".ttf" === o) {
var a = {
fontFilePath: e,
fontSize: this._fontSize,
outlineSize: 0,
glyphs: 0,
customGlyphs: "",
distanceFieldEnable: !1
};
(c = r.createWithTTF(a, t))._ttfConfig = a;
} else if (i) {
c = r.createWithBMFont(e, t, i);
s = _ccsg.Label.Type.BMFont;
} else {
c = r.createWithSystemFont(t || "", e, this._fontSize);
s = _ccsg.Label.Type.SystemFont;
c._isSystemFontUsed = !0;
}
c._labelType = s;
return c;
};
cc.Label.Type = cc.Enum({
TTF: 0,
BMFont: 1,
SystemFont: 2
});
cc.Label.Overflow = cc.Enum({
NONE: 0,
CLAMP: 1,
SHRINK: 2,
RESIZE_HEIGHT: 3
});
cc.Label.pool = new cc.js.Pool(0);
cc.Label.pool.get = function(t, e, i, n) {
this._fontAsset = e;
n = n || 40;
var o = e instanceof cc.Font;
if (!o) return new _ccsg.Label(t, null, null, n);
var r = o ? e.rawUrl : "";
return new _ccsg.Label(t, r, i, n);
};
}), {} ],
196: [ (function(t, e, i) {
"use strict";
function n(t, e) {
return null;
}
function o(e, i) {
t(e.url);
return null;
}
function r(t, e) {
return t.url;
}
function s(t, e) {
var i = t.url, n = cc.textureCache.getTextureForKey(i);
if (n) return n;
if (i.match(jsb.urlRegExp)) jsb.loadRemoteImg(i, (function(t, n) {
if (t) {
n.url = i;
e && e(null, n);
} else e && e(new Error("Load image failed: " + i));
})); else {
var o = function(t) {
if (t instanceof cc.Texture2D) {
t.url = i;
e && e(null, t);
} else e && e(new Error("Load image failed: " + i));
};
cc.textureCache._addImageAsync(i, o);
}
}
t("../cocos2d/core/load-pipeline");
cc.loader.addDownloadHandlers({
js: o,
jsc: o,
png: n,
jpg: n,
bmp: n,
jpeg: n,
gif: n,
ico: n,
tiff: n,
webp: n,
image: n,
mp3: r,
ogg: r,
wav: r,
mp4: r,
m4a: r,
font: n,
eot: n,
ttf: n,
woff: n,
svg: n,
ttc: n
});
cc.loader.addLoadHandlers({
png: s,
jpg: s,
bmp: s,
jpeg: s,
gif: s,
ico: s,
tiff: s,
webp: s,
image: s,
default: n
});
}), {
"../cocos2d/core/load-pipeline": 93
} ],
197: [ (function(t, e, i) {
"use strict";
function n(t, e) {
return function(i) {
this.getEmitterMode() === e && t.call(this, i);
};
}
cc.ParticleSystem.Mode = cc.Enum({
GRAVITY: 0,
RADIUS: 1
});
cc.ParticleSystem.Type = cc.Enum({
FREE: 0,
RELATIVE: 1,
GROUPED: 2
});
for (var o = [ {
tangentialAccel: "setTangentialAccel",
tangentialAccelVar: "setTangentialAccelVar",
radialAccel: "setRadialAccel",
radialAccelVar: "setRadialAccelVar",
rotationIsDir: "setRotationIsDir",
gravity: "setGravity",
speed: "setSpeed",
speedVar: "setSpeedVar"
}, {
startRadius: "setStartRadius",
startRadiusVar: "setStartRadiusVar",
endRadius: "setEndRadius",
endRadiusVar: "setEndRadiusVar",
rotatePerS: "setRotatePerSecond",
rotatePerSVar: "setRotatePerSecondVar"
} ], r = cc.ParticleSystem.prototype, s = 0; s < o.length; s++) {
var c = o[s];
for (var a in c) {
var l = c[a], h = r[l];
r[l] = n(h, s);
var u = l.replace("set", "get");
cc.defineGetterSetter(r, a, r[u], r[l]);
}
}
}), {} ],
198: [ (function(t, e, i) {
"use strict";
var n = !1;
if (cc.Scale9SpriteV2) {
n = !0;
cc.Scale9Sprite = cc.Scale9SpriteV2;
}
cc.Scale9Sprite.state = {
NORMAL: 0,
GRAY: 1,
DISTORTION: 2
};
cc.Scale9Sprite.RenderingType = cc.Enum({
SIMPLE: 0,
SLICED: 1,
TILED: 2,
FILLED: 3
});
cc.Scale9Sprite.FillType = cc.Enum({
Horizontal: 0,
Vertical: 1,
RADIAL: 2
});
var o = cc.Scale9Sprite.prototype;
if (n) {
var r = o.setContentSize;
o.setContentSize = function(t, e) {
void 0 !== e && (t = new cc.Size(t, e));
r.call(this, t);
};
var s = o.setAnchorPoint;
o.setAnchorPoint = function(t, e) {
void 0 !== e && (t = new cc.Vec2(t, e));
s.call(this, t);
};
} else {
o.setFillType = function() {};
o.setFillCenter = function() {};
o.setFillStart = function() {};
o.setFillRange = function() {};
o.enableTrimmedContentSize = function() {};
o._lazyInit = function() {
if (!this._onceInit) {
this._onceInit = !0;
this._insets = {
left: 0,
right: 0,
top: 0,
bottom: 0
};
this._trim = {
left: 0,
right: 0,
top: 0,
bottom: 0
};
this._contentSizeTrimmed = new cc.Size(0, 0);
this._anchorPointTrimmed = new cc.Vec2(0, 0);
this._sizeAfterTrimmed = new cc.Size(0, 0);
}
};
o._applyInsetsContentAnchor = function() {
var t = 1, e = 1;
if ((this._renderingType || this.getRenderingType && this.getRenderingType()) === cc.Scale9Sprite.RenderingType.SIMPLE) {
t = this._contentSizeTrimmed.width / this._sizeAfterTrimmed.width;
e = this._contentSizeTrimmed.height / this._sizeAfterTrimmed.height;
}
var i = new cc.Size(0, 0);
i.width = this._contentSizeTrimmed.width + (this._trim.left + this._trim.right) * t;
i.height = this._contentSizeTrimmed.height + (this._trim.top + this._trim.bottom) * e;
this._setContentSize(i);
var n = new cc.Vec2(0, 0);
n.x = this._contentSizeTrimmed.width * this._anchorPointTrimmed.x + this._trim.left * t;
n.y = this._contentSizeTrimmed.height * this._anchorPointTrimmed.y + this._trim.bottom * e;
n.x = n.x / i.width;
n.y = n.y / i.height;
this._setAnchorPoint(n);
var o = new cc.Rect(0, 0, 0, 0);
o.x = this._trim.left + this._insets.left;
o.y = this._trim.top + this._insets.top;
o.width = this._sizeAfterTrimmed.width - this._insets.left - this._insets.right;
o.height = this._sizeAfterTrimmed.height - this._insets.top - this._insets.bottom;
this.setCapInsets(o);
};
o._setBlendFunc = o.setBlendFunc;
o.setBlendFunc = function(t, e) {
void 0 !== e && (t = {
src: t,
dst: e
});
this._setBlendFunc && this._setBlendFunc(t);
};
o._getContentSize = o.getContentSize;
o.getContentSize = function() {
return new cc.Size(this._contentSizeTrimmed);
};
o._setContentSize = o.setContentSize;
o.setContentSize = function(t, e) {
this._lazyInit();
void 0 !== e && (t = new cc.Size(t, e));
this._contentSizeTrimmed = new cc.Size(t);
this._applyInsetsContentAnchor();
};
o._getAnchorPoint = o.getAnchorPoint;
o.getAnchorPoint = function() {
return new cc.Vec2(this._anchorPointTrimmed);
};
o._setAnchorPoint = o.setAnchorPoint;
o.setAnchorPoint = function(t, e) {
this._lazyInit();
void 0 !== e && (t = new cc.Vec2(t, e));
this._anchorPointTrimmed = new cc.Vec2(t);
this._applyInsetsContentAnchor();
};
o._getInsetLeft = o.getInsetLeft;
o._getInsetRight = o.getInsetRight;
o._getInsetBottom = o.getInsetBottom;
o._getInsetTop = o.getInsetTop;
o.getInsetLeft = function() {
return this._insets.left;
};
o.getInsetRight = function() {
return this._insets.right;
};
o.getInsetBottom = function() {
return this._insets.bottom;
};
o.getInsetTop = function() {
return this._insets.top;
};
o._setInsetLeft = o.setInsetLeft;
o.setInsetLeft = function(t) {
this._lazyInit();
this._insets.left = t;
this._applyInsetsContentAnchor();
};
o._setInsetRight = o.setInsetRight;
o.setInsetRight = function(t) {
this._lazyInit();
this._insets.right = t;
this._applyInsetsContentAnchor();
};
o._setInsetTop = o.setInsetTop;
o.setInsetTop = function(t) {
this._lazyInit();
this._insets.top = t;
this._applyInsetsContentAnchor();
};
o._setInsetBottom = o.setInsetBottom;
o.setInsetBottom = function(t) {
this._lazyInit();
this._insets.bottom = t;
this._applyInsetsContentAnchor();
};
o._setSpriteFrame = o.setSpriteFrame;
o.setSpriteFrame = function(t) {
this._lazyInit();
var e = t.getOriginalSize(), i = t.getRect(), n = t.getOffset(), o = (e.width + 2 * n.x - i.width) / 2, r = e.width - o - i.width, s = (e.height + 2 * n.y - i.height) / 2, c = e.height - s - i.height;
this._trim.left = o;
this._trim.right = r;
this._trim.top = c;
this._trim.bottom = s;
this._sizeAfterTrimmed = new cc.Size(i.width, i.height);
this._setSpriteFrame(t);
this._applyInsetsContentAnchor();
};
}
}), {} ],
199: [ (function(t, e, i) {
sp._SGSkeleton = sp.Skeleton;
sp._SGSkeletonAnimation = sp.SkeletonAnimation;
sp._SGSkeleton.prototype.setPremultipliedAlpha = sp._SGSkeleton.prototype.setOpacityModifyRGB;
sp._SGSkeleton.prototype.setOpacityModifyRGB = function() {};
}), {} ],
200: [ (function(i, n, o) {
"use strict";
i("../cocos2d/core/platform/CCClass");
i("../cocos2d/core/assets/CCAsset");
cc.TextureCache.prototype._addImageAsync || (cc.TextureCache.prototype._addImageAsync = cc.TextureCache.prototype.addImageAsync);
cc.TextureCache.prototype.addImageAsync = function(t, e, i) {
var n = null;
cc.loader.load(t, (function(t, o) {
t && (o = null);
e && e.call(i, o);
n = o;
}));
return n;
};
cc.TextureCache.prototype._addImage || (cc.TextureCache.prototype._addImage = cc.TextureCache.prototype.addImage);
cc.TextureCache.prototype.addImage = function(i, n, o) {
return "function" === ("object" == (e = typeof n) ? t(n) : e) ? this.addImageAsync(i, n, o) : n ? this._addImage(i, n) : this._addImage(i);
};
cc.textureCache._textures = {};
cc.textureCache.cacheImage = function(t, e) {
e instanceof cc.Texture2D && (this._textures[t] = e);
};
cc.textureCache._getTextureForKey = cc.textureCache.getTextureForKey;
cc.textureCache.getTextureForKey = function(t) {
var e = this._getTextureForKey(t);
e || (e = this._textures[t]);
return e || null;
};
cc.textureCache._removeTextureForKey = cc.textureCache.removeTextureForKey;
cc.textureCache.removeTextureForKey = function(t) {
this._textures[t] && delete this._textures[t];
this._removeTextureForKey(t);
};
cc.Class._fastDefine("cc.Texture2D", cc.Texture2D, []);
cc.js.value(cc.Texture2D, "$super", cc.RawAsset);
cc.Texture2D.PixelFormat = cc.Enum({
RGB565: cc.Texture2D.PIXEL_FORMAT_RGB565,
RGB5A1: cc.Texture2D.PIXEL_FORMAT_RGB5A1,
RGBA4444: cc.Texture2D.PIXEL_FORMAT_RGBA4444,
RGB888: cc.Texture2D.PIXEL_FORMAT_RGB888,
RGBA8888: cc.Texture2D.PIXEL_FORMAT_RGBA8888,
A8: cc.Texture2D.PIXEL_FORMAT_A8,
I8: cc.Texture2D.PIXEL_FORMAT_I8,
AI8: cc.Texture2D.PIXEL_FORMAT_AI8
});
cc.Texture2D.WrapMode = cc.Enum({
REPEAT: 10497,
CLAMP_TO_EDGE: 33071,
MIRRORED_REPEAT: 33648
});
cc.Texture2D.Filter = cc.Enum({
LINEAR: 9729,
NEAREST: 9728
});
var r = cc.Texture2D.prototype;
r.loaded = !0;
r.update = function(t) {
var e = !1, i = !1;
if (t) {
if (void 0 !== t.minFilter) {
this._minFilter = t.minFilter;
e = !0;
}
if (void 0 !== t.magFilter) {
this._magFilter = t.magFilter;
e = !0;
}
if (void 0 !== t.wrapS) {
this._wrapS = t.wrapS;
e = !0;
}
if (void 0 !== t.wrapT) {
this._wrapT = t.wrapT;
e = !0;
}
void 0 !== t.mipmap && (i = this._hasMipmap = t.mipmap);
}
e && this.setTexParameters(t);
i && this.generateMipmap();
};
r.isLoaded = function() {
return !0;
};
r.getPixelWidth = r.getPixelsWide;
r.getPixelHeight = r.getPixelsHigh;
r.description = r.getDescription;
cc.js.get(r, "pixelWidth", r.getPixelWidth);
cc.js.get(r, "pixelHeight", r.getPixelHeight);
cc.js.get(r, "_glID", r.getName);
cc.Class._fastDefine("cc.SpriteFrame", cc.SpriteFrame, []);
cc.js.value(cc.SpriteFrame, "$super", cc.Asset);
(r = cc.SpriteFrame.prototype)._setTexture = r.setTexture;
r._initWithTexture = r.initWithTexture;
cc.js.mixin(r, cc.EventTarget.prototype);
r._ctor = function(t, e, i, n, o) {
this._name = "";
this.insetTop = 0;
this.insetBottom = 0;
this.insetLeft = 0;
this.insetRight = 0;
void 0 !== t && this.initWithTexture(t, e, i, n, o);
};
r.textureLoaded = function() {
return null !== this.getTexture();
};
r.setTexture = function(t, e, i, n, o) {
e && this.setRect(e);
n && this.setOffset(n);
o && this.setOriginalSize(o);
this.setRotated(i || !1);
var r = t;
if (cc.js.isString(t)) {
this._textureFilename = t;
this._loadTexture();
} else r instanceof cc.Texture2D && this._refreshTexture(r);
return !0;
};
r.initWithTexture = r.setTexture;
r._loadTexture = function() {
if (this._textureFilename) {
var t = cc.textureCache.addImage(this._textureFilename);
this._refreshTexture(t);
}
};
r.ensureLoadTexture = function() {
this._texture || this._loadTexture();
};
r.clearTexture = function() {
this._setTexture(null);
};
r._refreshTexture = function(t) {
if (this.getTexture() !== t) {
var e = t.width, i = t.height, n = this.getRect();
0 === n.width || 0 === n.height ? n = cc.rect(0, 0, e, i) : this._checkRect(t);
var o = this.getOriginalSize();
0 !== o.width && 0 !== o.height || (o = cc.size(e, i));
var r = this.getOffset(), s = this.isRotated();
this._initWithTexture(t, n, s, r, o);
this.emit("load");
}
};
r._deserialize = function(t, e) {
var i = t.rect;
i && this.setRect(new cc.Rect(i[0], i[1], i[2], i[3]));
t.offset && this.setOffset(new cc.Vec2(t.offset[0], t.offset[1]));
t.originalSize && this.setOriginalSize(new cc.Size(t.originalSize[0], t.originalSize[1]));
this.setRotated(1 === t.rotated);
this._name = t.name;
var n = t.capInsets;
if (n) {
this.insetLeft = n[0];
this.insetTop = n[1];
this.insetRight = n[2];
this.insetBottom = n[3];
}
var o = t.texture;
if (o) {
var r = e.customEnv && e.customEnv.deferredLoadRaw ? "_textureFilename" : "_textureFilenameSetter";
e.result.push(this, r, o);
}
};
r._checkRect = function(t) {
var e = this.getRect(), i = e.x, n = e.y;
if (this.isRotated()) {
i += e.height;
n += e.width;
} else {
i += e.width;
n += e.height;
}
i > t.getPixelWidth() && cc.errorID(3300, t.url);
n > t.getPixelHeight() && cc.errorID(3400, t.url);
};
r._getTexture = r.getTexture;
r.getTexture = function() {
var t = this._getTexture();
this._texture = t;
return t;
};
r._clone = r.clone;
r.clone = function() {
var t = this._clone();
t._name = this._name;
t.insetTop = this.insetTop;
t.insetBottom = this.insetBottom;
t.insetLeft = this.insetLeft;
t.insetRight = this.insetRight;
return t;
};
cc.js.set(r, "_textureFilenameSetter", (function(t) {
this._textureFilename = t;
t && this._loadTexture();
}));
cc.js.getset(r, "name", (function() {
return this._name;
}), (function(t) {
this._name = t;
}));
}), {
"../cocos2d/core/assets/CCAsset": 18,
"../cocos2d/core/platform/CCClass": 127
} ],
201: [ (function(t, e, i) {
"use strict";
if (!cc.runtime) {
var n = cc.TMXObject.prototype;
cc.defineGetterSetter(n, "type", n.getType, null);
cc.defineGetterSetter(n, "name", n.getObjectName, n.setObjectName);
cc.defineGetterSetter(n, "id", n.getId, null);
cc.defineGetterSetter(n, "gid", n.getGid, null);
cc.defineGetterSetter(n, "offset", n.getOffset, null);
cc.defineGetterSetter(n, "objectSize", n.getObjectSize, null);
cc.defineGetterSetter(n, "objectVisible", n.getObjectVisible, null);
cc.defineGetterSetter(n, "objectRotation", n.getObjectRotation, null);
cc.defineGetterSetter(n, "sgNode", n.getNode, null);
}
}), {} ],
202: [ (function(t, e, i) {
cc.VideoPlayer = ccui.VideoPlayer;
cc.sys.os !== cc.sys.OS_OSX && cc.sys.os !== cc.sys.OS_WINDOWS || (cc.VideoPlayer = {});
cc.VideoPlayer.EventType = {
PLAYING: 0,
PAUSED: 1,
STOPPED: 2,
COMPLETED: 3,
META_LOADED: 4,
CLICKED: 5,
READY_TO_PLAY: 6
};
}), {} ],
203: [ (function(t, e, i) {
cc.WebView = ccui.WebView;
cc.sys.os !== cc.sys.OS_OSX && cc.sys.os !== cc.sys.OS_WINDOWS || (cc.WebView = {});
cc.WebView.EventType = {
LOADING: 0,
LOADED: 1,
ERROR: 2,
JS_EVALUATED: 3
};
}), {} ],
204: [ (function(i, n, o) {
Math.sign || (Math.sign = function(t) {
return 0 === (t = +t) || isNaN(t) ? t : t > 0 ? 1 : -1;
});
Number.isInteger || (Number.isInteger = function(i) {
return "number" === ("object" == (e = typeof i) ? t(i) : e) && (0 | i) === i;
});
var r = window.performance || Date, s = Object.create(null);
console.time = function(t) {
s[t] = r.now();
};
console.timeEnd = function(t) {
var e = s[t], i = r.now() - e;
console.log(t + ": " + i + "ms");
};
}), {} ],
205: [ (function(i, n, o) {
String.prototype.startsWith || (String.prototype.startsWith = function(t, e) {
e = e || 0;
return this.lastIndexOf(t, e) === e;
});
String.prototype.endsWith || (String.prototype.endsWith = function(i, n) {
("undefined" === ("object" == (e = typeof n) ? t(n) : e) || n > this.length) && (n = this.length);
n -= i.length;
var o = this.indexOf(i, n);
return -1 !== o && o === n;
});
}), {} ],
206: [ (function(i, n, o) {
var r = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
};
window.__extends = function(t, e) {
function i() {
this.constructor = t;
}
r(t, e);
t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i());
};
window.__assign = Object.assign || function(t) {
for (var e, i = 1, n = arguments.length; i < n; i++) {
e = arguments[i];
for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
}
return t;
};
window.__rest = function(i, n) {
var o = {};
for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && n.indexOf(r) < 0 && (o[r] = i[r]);
if (null != i && "function" === ("object" == (e = typeof Object.getOwnPropertySymbols) ? t(Object.getOwnPropertySymbols) : e)) {
var s = 0;
for (r = Object.getOwnPropertySymbols(i); s < r.length; s++) n.indexOf(r[s]) < 0 && (o[r[s]] = i[r[s]]);
}
return o;
};
window.__decorate = function(i, n, o, r) {
var s, c = arguments.length, a = c < 3 ? n : null === r ? r = Object.getOwnPropertyDescriptor(n, o) : r;
if ("object" === ("object" == (e = typeof Reflect) ? t(Reflect) : e) && "function" === ("object" == (e = typeof Reflect.decorate) ? t(Reflect.decorate) : e)) a = Reflect.decorate(i, n, o, r); else for (var l = i.length - 1; l >= 0; l--) (s = i[l]) && (a = (c < 3 ? s(a) : c > 3 ? s(n, o, a) : s(n, o)) || a);
return c > 3 && a && Object.defineProperty(n, o, a), a;
};
window.__param = function(t, e) {
return function(i, n) {
e(i, n, t);
};
};
window.__metadata = function(i, n) {
if ("object" === ("object" == (e = typeof Reflect) ? t(Reflect) : e) && "function" === ("object" == (e = typeof Reflect.metadata) ? t(Reflect.metadata) : e)) return Reflect.metadata(i, n);
};
window.__awaiter = function(t, e, i, n) {
return new (i || (i = Promise))(function(o, r) {
function s(t) {
try {
a(n.next(t));
} catch (t) {
r(t);
}
}
function c(t) {
try {
a(n.throw(t));
} catch (t) {
r(t);
}
}
function a(t) {
t.done ? o(t.value) : new i(function(e) {
e(t.value);
}).then(s, c);
}
a((n = n.apply(t, e || [])).next());
});
};
window.__generator = function(i, n) {
function o(t) {
return function(e) {
return (function(t) {
if (r) throw new TypeError("Generator is already executing.");
for (;l; ) try {
if (r = 1, s && (c = s[2 & t[0] ? "return" : t[0] ? "throw" : "next"]) && !(c = c.call(s, t[1])).done) return c;
(s = 0, c) && (t = [ 0, c.value ]);
switch (t[0]) {
case 0:
case 1:
c = t;
break;

case 4:
l.label++;
return {
value: t[1],
done: !1
};

case 5:
l.label++;
s = t[1];
t = [ 0 ];
continue;

case 7:
t = l.ops.pop();
l.trys.pop();
continue;

default:
if (!(c = l.trys, c = c.length > 0 && c[c.length - 1]) && (6 === t[0] || 2 === t[0])) {
l = 0;
continue;
}
if (3 === t[0] && (!c || t[1] > c[0] && t[1] < c[3])) {
l.label = t[1];
break;
}
if (6 === t[0] && l.label < c[1]) {
l.label = c[1];
c = t;
break;
}
if (c && l.label < c[2]) {
l.label = c[2];
l.ops.push(t);
break;
}
c[2] && l.ops.pop();
l.trys.pop();
continue;
}
t = n.call(i, l);
} catch (e) {
t = [ 6, e ];
s = 0;
} finally {
r = c = 0;
}
if (5 & t[0]) throw t[1];
return {
value: t[0] ? t[1] : void 0,
done: !0
};
})([ t, e ]);
};
}
var r, s, c, a, l = {
label: 0,
sent: function() {
if (1 & c[0]) throw c[1];
return c[1];
},
trys: [],
ops: []
};
return a = {
next: o(0),
throw: o(1),
return: o(2)
}, "function" === ("object" == (e = typeof Symbol) ? t(Symbol) : e) && (a[Symbol.iterator] = function() {
return this;
}), a;
};
window.__exportStar = function(t, e) {
for (var i in t) e.hasOwnProperty(i) || (e[i] = t[i]);
};
window.__values = function(i) {
var n = "function" === ("object" == (e = typeof Symbol) ? t(Symbol) : e) && i[Symbol.iterator], o = 0;
return n ? n.call(i) : {
next: function() {
i && o >= i.length && (i = void 0);
return {
value: i && i[o++],
done: !i
};
}
};
};
window.__read = function(i, n) {
var o = "function" === ("object" == (e = typeof Symbol) ? t(Symbol) : e) && i[Symbol.iterator];
if (!o) return i;
var r, s, c = o.call(i), a = [];
try {
for (;(void 0 === n || n-- > 0) && !(r = c.next()).done; ) a.push(r.value);
} catch (t) {
s = {
error: t
};
} finally {
try {
r && !r.done && (o = c.return) && o.call(c);
} finally {
if (s) throw s.error;
}
}
return a;
};
window.__spread = function() {
for (var t = [], e = 0; e < arguments.length; e++) t = t.concat(__read(arguments[e]));
return t;
};
window.__await = function(t) {
return this instanceof __await ? (this.v = t, this) : new __await(t);
};
window.__asyncGenerator = function(t, e, i) {
function n(t) {
l[t] && (a[t] = function(e) {
return new Promise(function(i, n) {
h.push([ t, e, i, n ]) > 1 || o(t, e);
});
});
}
function o(t, e) {
try {
(function(t) {
t.value instanceof __await ? Promise.resolve(t.value.v).then(r, s) : c(h[0][2], t);
})(l[t](e));
} catch (t) {
c(h[0][3], t);
}
}
function r(t) {
o("next", t);
}
function s(t) {
o("throw", t);
}
function c(t, e) {
(t(e), h.shift(), h.length) && o(h[0][0], h[0][1]);
}
if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
var a, l = i.apply(t, e || []), h = [];
return a = {}, n("next"), n("throw"), n("return"), a[Symbol.asyncIterator] = function() {
return this;
}, a;
};
window.__asyncDelegator = function(t) {
function e(e, o) {
t[e] && (i[e] = function(i) {
return (n = !n) ? {
value: __await(t[e](i)),
done: "return" === e
} : o ? o(i) : i;
});
}
var i, n;
return i = {}, e("next"), e("throw", (function(t) {
throw t;
})), e("return"), i[Symbol.iterator] = function() {
return this;
}, i;
};
window.__asyncValues = function(i) {
if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
var n = i[Symbol.asyncIterator];
return n ? n.call(i) : "function" === ("object" == (e = typeof __values) ? t(__values) : e) ? __values(i) : i[Symbol.iterator]();
};
}), {} ]
}, {}, [ 184 ]);
var e = "";
})();
