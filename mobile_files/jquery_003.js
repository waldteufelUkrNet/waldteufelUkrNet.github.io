!function(e,t){"use strict";"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof exports?module.exports=t(require("jquery")):t(e.jQuery)}(this,function(e){"use strict";var t=["-webkit-","-moz-","-o-",""],s=["webkit","moz","MS","o",""];function i(t,s){this._element=e(t),this._options=e.extend({speed:30,direction:"left",cycles:1,space:40,delayBetweenCycles:2e3,handleHover:!0,handleResize:!0,easing:"linear"},s),this._resizeDelay=parseInt(this._options.handleResize,10)||300,this._horizontal="left"===this._options.direction||"right"===this._options.direction,this._animationName="simplemarquee-"+Math.round(1e13*Math.random()).toString(18),this._onResize=this._onResize.bind(this),this._onCycle=this._onCycle.bind(this),this._options.handleResize&&e(window).on("resize",this._onResize),this._options.handleHover&&this._element.on({"mouseenter.simplemarquee":this._onMouseEnter.bind(this),"mouseleave.simplemarquee":this._onMouseLeave.bind(this)}),this._element.on("destroy.simplemarquee",this.destroy.bind(this)),this.update(!0)}return i.prototype.update=function(e){return this._reset(),this._setup(),this._needsAnimation?e?(this._paused=!1,this._cycles=-1,this._onCycle()):this._paused&&this._pause():(this._paused=!1,this._cycles=0),this},i.prototype.pause=function(){return this._needsAnimation&&(this._resetCycle(),this._paused||(this._pause(),this._element.triggerHandler("pause"),this._paused=!0)),this},i.prototype.resume=function(){return this._needsAnimation&&(this._resetCycle(),this._paused&&(this._resume(),this._element.triggerHandler("resume"),this._paused=!1)),this},i.prototype.toggle=function(){return this._paused?this.resume():this.pause(),this},i.prototype.destroy=function(){this._reset(),this._resizeTimeout&&clearTimeout(this._resizeTimeout),e(window).off("resize",this._onResize),this._element.off(".simplemarquee"),this._element.removeData("_simplemarquee"),this._element=null},i.prototype._reset=function(){this._element.removeClass("has-enough-space").css({"word-wrap":"","overflow-wrap":"","white-space":"",overflow:""}),this._wrappers&&(this._contents.closest(this._element).length&&this._element.append(this._contents),this._wrappers.remove(),this._element.children("style").remove()),this._contents=this._wrappers=this._size=null,this._needsAnimation=!1,this._resetCycle()},i.prototype._setup=function(){var t;this._horizontal?(this._element.css({"word-wrap":"normal","overflow-wrap":"normal","white-space":"nowrap",overflow:"hidden"}),this._needsAnimation=this._element[0].scrollWidth>Math.ceil(this._element.outerWidth())):(this._element.css({"word-wrap":"break-word","overflow-wrap":"break-word","white-space":"normal",overflow:"hidden"}),this._needsAnimation=this._element[0].scrollHeight>Math.ceil(this._element.outerHeight())),this._element.toggleClass("has-enough-space",!this._needsAnimation),this._needsAnimation&&(this._contents=this._element.contents(),(t=e('<div class="simplemarquee-wrapper"></div>')).append(this._contents),this._element.append(t),(t=e('<div class="simplemarquee-wrapper"></div>')).append(this._contents.clone()),this._element.append(t),this._wrappers=this._element.children(),this._horizontal?(this._wrappers.css("display","inline-block"),this._wrappers.eq(1).css("margin-left",this._options.space),this._size=this._wrappers.eq(0).outerWidth()+this._options.space):(this._wrappers.eq(1).css("margin-top",this._options.space),this._size=this._wrappers.eq(0).outerHeight()+this._options.space),this._setupAnimation())},i.prototype._setupAnimation=function(){var e,i,n,o;e="<style>\n",t.forEach(function(t){switch(e+="@"+t+"keyframes "+this._animationName+" {\n",this._options.direction){case"left":e+="    0%   { "+t+"transform: translate(0, 0); } \n",e+="    100% { "+t+"transform: translate(-"+this._size+"px, 0); }\n";break;case"right":e+="    0%   { "+t+"transform: translate(-"+this._size+"px, 0); }\n",e+="    100% { "+t+"transform: translate(0, 0); } \n";break;case"top":e+="    0%   { "+t+"transform: translate(0, 0); } \n",e+="    100% { "+t+"transform: translate(0, -"+this._size+"px); }\n";break;case"bottom":e+="    0%   { "+t+"transform: translate(0, -"+this._size+"px); }\n",e+="    100% { "+t+"transform: translate(0, 0); } \n";break;default:throw new Error("Invalid direction: "+this._options.direction)}e+="}\n"},this),e+="</style>\n",this._element.append(e),this._wrappers.css("animation",this._animationName+" "+this._size/this._options.speed+"s "+this._options.easing+" infinite"),i=this._wrappers.eq(0),n="AnimationIteration",o=this._onCycle,s.forEach(function(e){e||(n=n.toLowerCase()),i.on(e+n,o)})},i.prototype._pause=function(){this._wrappers.css("animation-play-state","paused")},i.prototype._resume=function(){this._wrappers.css("animation-play-state","")},i.prototype._resetCycle=function(){this._cycleTimeout&&(clearTimeout(this._cycleTimeout),this._cycleTimeout=null)},i.prototype._onCycle=function(){this._resetCycle(),this._cycles+=1,this._cycles>=this._options.cycles?(this.pause(),this._element.triggerHandler("finish")):(this._pause(),this._element.triggerHandler("cycle"),this._cycleTimeout=setTimeout(function(){this._cycleTimeout=null,this._resume()}.bind(this),this._options.delayBetweenCycles))},i.prototype._onMouseEnter=function(){this._paused?(this._cycles=0,this.resume()):this.pause()},i.prototype._onMouseLeave=function(){this.resume()},i.prototype._onResize=function(){this._resizeTimeout&&clearTimeout(this._resizeTimeout),this._resizeTimeout=setTimeout(function(){this._resizeTimeout=null,this.update()}.bind(this),this._resizeDelay)},e.fn.simplemarquee=function(t){return this.each(function(s,n){var o;if(o=(n=e(n)).data("_simplemarquee"),"string"==typeof t){if(!o)return;o[t](arguments[1])}else o?o.update(!0):(o=new i(n,t),n.data("_simplemarquee",o))}),this},e.fn.simplemarquee.Constructor=i,e});