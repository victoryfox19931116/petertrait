/*! Fluffy.js 2.0.3
 *
 * Sebastian Prein
 * Copyright 2016, MIT License
 */
(function(){"use strict";function t(t,e){return e="undefined"!=typeof e?e:"debug",t=null===t?[]:Array.isArray(t)?t:[t],window.console&&console[e]?(console.group("Fluffy %c(%s)","font-style: italic; color: rgba(0, 0, 0, 0.25);",Fluffy.version),t.forEach(function(t){console[e](t)}),console.groupEnd(),!0):!0}function e(t){var e=[];do{var i=t.tagName.toLowerCase();t.id&&(i+="#"+t.id),t.className&&(i+="."+[].join.call(t.classList,".")),e.push(i)}while((t=t.parentNode)instanceof HTMLElement);return e.reverse().join(" > ")}function i(){var t;window.addEventListener("resize",function(){t&&clearTimeout(t),t=setTimeout(function(){g.forEach(function(t){t.updateContentSize(),t.updateContentPosition()})},100)})}window.Fluffy={},Fluffy.version="2.0.3";var s=!!document.querySelector&&!!window.addEventListener&&!!window.requestAnimationFrame,n="ontouchstart"in window,r="transform",o=["smallest","average","largest"],h=3,a={triggerSelector:null,showScrollbars:!0,smartHeight:!1,smartWidth:!1,triggerDirection:"x",mouseDamp:20,mousePadding:60},l={x:window.innerWidth,y:window.innerHeight},g=[],c=function(i){this.container=null,this.content=null,this.items=null,this.trigger=null,this.scrollbars={},this.mouse={real:{x:0,y:0},fake:{x:0,y:0},last:{x:0,y:0},observer:null},this.ratios={},this.settings={},this.sizes={},this.cleanContent=function(){for(var t=0;t<this.items.length;t++){var e=this.items[t],i=e.nextSibling,s=e.previousSibling,n=e.parentNode;null!==e&&3===e.nodeType&&n.removeChild(e),null!==s&&3===s.nodeType&&n.removeChild(s),null!==i&&3===i.nodeType&&n.removeChild(i)}},this.prepare=function(){this.cleanContent(),this.attachScrollbars(),this.mouse.observer=new d(this),this.container.style.overflow="hidden",n&&(this.container.style.webkitOverflowScrolling="touch",this.container.style.overflowX=this.settings.triggerDirection.indexOf("x")>=0?"scroll":"hidden",this.container.style.overflowY=this.settings.triggerDirection.indexOf("y")>=0?"scroll":"hidden")},this.attachScrollbars=function(){if(this.settings.showScrollbars){var t=[];this.settings.triggerDirection.indexOf("x")>=0&&t.push("horizontal"),this.settings.triggerDirection.indexOf("y")>=0&&t.push("vertical");var e=document.createElement("div");e.setAttribute("data-fluffy-scrollbars","");for(var i=0;i<t.length;i++){var s=document.createElement("span");s.classList.add("is-"+t[i]),e.appendChild(s),this.scrollbars[t[i]]=s}this.container.appendChild(e),this.container.classList.add("has-scrollbar")}},this.getContainerWidth=function(){return this.container.getBoundingClientRect().width},this.getContainerHeight=function(){return this.container.getBoundingClientRect().height},this.getTriggerWidth=function(){return this.trigger.getBoundingClientRect().width},this.getTriggerHeight=function(){return this.trigger.getBoundingClientRect().height},this.getContentWidth=function(){for(var t=0,e=0;t<this.items.length;t++)e+=this.items[t].getBoundingClientRect().width;return e},this.getContentHeight=function(){for(var t=0,e=0;t<this.items.length;t++)e+=this.items[t].getBoundingClientRect().height;return e},this.getSmartWidth=function(){for(var t={smallest:null,largest:0,average:0},e=0;e<this.items.length;e++){var i="naturalWidth"in this.items[e]?this.items[e].naturalWidth:this.items[e].getBoundingClientRect().width;t.average+=i,i>t.largest&&(t.largest=i),(null===t.smallest||i<t.smallest)&&(t.smallest=i)}return t.average/=this.items.length,t},this.getSmartHeight=function(){for(var t={smallest:null,largest:0,average:0},e=0;e<this.items.length;e++){var i="naturalHeight"in this.items[e]?this.items[e].naturalHeight:this.items[e].getBoundingClientRect().height;t.average+=i,i>t.largest&&(t.largest=i),(null===t.smallest||i<t.smallest)&&(t.smallest=i)}return t.average/=this.items.length,t},this.getScrollableHeight=function(){return this.getContentHeight()-this.getContainerHeight()},this.getScrollableWidth=function(){return this.getContentWidth()-this.getContainerWidth()},this.getMousePosition=function(t){t=t||window.event;var e=this.trigger.currentStyle||window.getComputedStyle(this.trigger,null),i=this.trigger.getBoundingClientRect(),s={left:0|e.borderLeftWidth,right:0|e.borderRightWidth,top:0|e.borderTopWidth,bottom:0|e.borderBottomWidth},n={left:i.left+s.left,right:s.left+s.right,bottom:s.top+s.bottom,top:i.top+s.top};return{x:Math.min(Math.max(0,t.clientX-n.left),i.width-n.right),y:Math.min(Math.max(0,t.clientY-n.top),i.height-n.bottom)}},this.getFakeMousePosition=function(){return{x:Math.min(Math.max(0,this.mouse.real.x-this.settings.mousePadding),this.sizes.moveArea.width)*this.ratios.moveAreaToContent.width,y:Math.min(Math.max(0,this.mouse.real.y-this.settings.mousePadding),this.sizes.moveArea.height)*this.ratios.moveAreaToContent.height}},this.cacheSizes=function(){this.sizes={container:{width:this.getContainerWidth(),height:this.getContainerHeight()},content:{width:this.getContentWidth(),height:this.getContentHeight()},scrollable:{width:this.getScrollableWidth(),height:this.getScrollableHeight()},trigger:{width:this.getTriggerWidth(),height:this.getTriggerHeight()},moveArea:{width:this.getTriggerWidth()-2*this.settings.mousePadding,height:this.getTriggerHeight()-2*this.settings.mousePadding},scrollbars:{horizontal:this.settings.showScrollbars&&this.scrollbars.horizontal?this.scrollbars.horizontal.getBoundingClientRect():null,vertical:this.settings.showScrollbars&&this.scrollbars.vertical?this.scrollbars.vertical.getBoundingClientRect():null}}},this.updateContentSize=function(){this.settings.smartWidth&&o.indexOf(this.settings.smartWidth)>=0&&(this.content.style.width=this.getSmartWidth()[this.settings.smartWidth]+"px"),this.settings.smartHeight&&o.indexOf(this.settings.smartHeight)>=0&&(this.content.style.height=this.getSmartHeight()[this.settings.smartHeight]+"px"),this.cacheSizes(),this.defineRatios(),this.settings.triggerDirection.indexOf("x")>=0&&(this.content.style.width=(100*this.ratios.containerToContent.width+.001).toFixed(h)+"%"),this.settings.triggerDirection.indexOf("y")>=0&&(this.content.style.height=(100*this.ratios.containerToContent.height+.001).toFixed(h)+"%"),(l.x!==window.innerWidth||l.y!==window.innerHeight)&&(this.mouse.real={x:this.mouse.real.x*(window.innerWidth/l.x),y:this.mouse.real.y*(window.innerHeight/l.y)},l={x:window.innerWidth,y:window.innerHeight},this.mouse.fake=this.getFakeMousePosition())},this.updateContentPosition=function(){var t=0,e=0;this.settings.triggerDirection.indexOf("x")>=0&&(t=(this.mouse.last.x/this.sizes.scrollable.width*this.ratios.contentToScrollableArea.width*100).toFixed(h)),this.settings.triggerDirection.indexOf("y")>=0&&(e=(this.mouse.last.y/this.sizes.scrollable.height*this.ratios.contentToScrollableArea.height*100).toFixed(h)),this.content.style[r]="translate(-"+t+"%, -"+e+"%)"},this.updateScrollbarPosition=function(){this.settings.showScrollbars&&(this.settings.triggerDirection.indexOf("x")>=0&&(this.scrollbars.horizontal.style.left=(this.mouse.last.x/this.sizes.scrollable.width*this.ratios.containerToScrollbarArea.width*100).toFixed(h)+"%"),this.settings.triggerDirection.indexOf("y")>=0&&(this.scrollbars.vertical.style.top=(this.mouse.last.y/this.sizes.scrollable.height*this.ratios.containerToScrollbarArea.height*100).toFixed(h)+"%"))},this.defineRatios=function(){this.ratios.moveAreaToContent={width:this.sizes.scrollable.width/this.sizes.moveArea.width,height:this.sizes.scrollable.height/this.sizes.moveArea.height},this.ratios.contentToScrollableArea={width:this.sizes.scrollable.width/this.sizes.content.width,height:this.sizes.scrollable.height/this.sizes.content.height},this.ratios.containerToContent={width:this.sizes.content.width/this.sizes.container.width,height:this.sizes.content.height/this.sizes.container.height},this.ratios.containerToScrollbarArea={width:this.sizes.scrollbars.horizontal?(this.sizes.container.width-this.sizes.scrollbars.horizontal.width)/this.sizes.container.width:0,height:this.sizes.scrollbars.vertical?(this.sizes.container.height-this.sizes.scrollbars.vertical.height)/this.sizes.container.height:0}},this.registerEventListeners=function(){window.addEventListener("load",function(){this.container&&this.container.classList.add("is-ready"),this.updateContentSize(),n||this.trigger.addEventListener("mousemove",function(t){this.mouse.observer.status()===!1&&this.mouse.observer.start(),this.mouse.real=this.getMousePosition(t),this.mouse.fake=this.getFakeMousePosition()}.bind(this))}.bind(this))},function(){var s,n=i.querySelector("[data-fluffy-content]");if(null===n)throw Error("'"+e(i)+"' has no content and therefore will be ignored.");var r={};if(i.hasAttribute("data-fluffy-options")){try{var o=JSON.parse(i.getAttribute("data-fluffy-options"));"object"!=typeof o?t(["Skipping provided options for the following container as they're not of type Object. Using defaults instead.",i],"warn"):r=o}catch(h){t(["Trying to parse options for the following container has failed. Using defaults instead.",i],"warn")}"mousePadding"in r&&r.mousePadding<0&&(r.mousePadding=a.mousePadding),"mouseDamp"in r&&r.mouseDamp<=0&&(r.mouseDamp=a.mouseDamp)}for(var l in a)l in r||(r[l]=a[l]);this.container=i,this.content=n,this.items=n.childNodes,this.trigger=r.triggerSelector&&null!==(s=document.querySelector(r.triggerSelector))?s:i,this.settings=r,this.prepare(),this.registerEventListeners()}.call(this)},d=function(t){function e(t,e){function i(){n.value=window.requestAnimationFrame(i);var r=Date.now(),o=r-s;o>=e&&(t.call(),s=Date.now())}var s=Date.now(),n={};return n.value=window.requestAnimationFrame(i),n}function i(t){window.cancelAnimationFrame(t.value)}if(t instanceof c==!1)throw Error("MouseObserver expects first parameter to be an instance of FluffyObject. Instead "+t.constructor.name+" was given.");this.start=function(){t.container.classList.add("is-moving"),this.id=e(function(){var e={x:(t.mouse.fake.x-t.mouse.last.x)/t.settings.mouseDamp,y:(t.mouse.fake.y-t.mouse.last.y)/t.settings.mouseDamp};Math.abs(e.x)<.001&&Math.abs(e.y)<.001&&(this.stop(),t.container.classList.remove("is-moving")),t.mouse.last.x+=e.x,t.mouse.last.y+=e.y,t.updateContentPosition(),t.updateScrollbarPosition()}.bind(this),10)},this.stop=function(){this.id=i(this.id)},this.status=function(){return"object"==typeof this.id}};document.addEventListener("DOMContentLoaded",function(){try{if(!s)throw Error("Browser is lacking support for several requirements like: 'querySelector', 'addEventListener' or 'requestAnimationFrame'.");r=function(t){for(var e=document.createElement("div"),i=0;i<t.length;i++)if(t[i]in e.style)return t[i];throw Error("Browser doesn't support CSS3 transforms.")}(["transform","msTransform","MozTransform","WebkitTransform","OTransform"]),n&&document.documentElement.classList.add("is-touch");var e=document.querySelectorAll("[data-fluffy-container]");if(0===e.length)return;for(var o=0;o<e.length;o++)try{g.push(new c(e[o]))}catch(h){t(h.message,"warn")}}catch(h){return t(h.message,"error")}i()})}).call(this);
