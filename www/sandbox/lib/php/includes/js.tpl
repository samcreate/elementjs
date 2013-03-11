<script type="text/javascript" charset="utf-8">
	window.debug=(function(){var i=this,b=Array.prototype.slice,d=i.console,h={},f,g,m=9,c=["error","warn","info","debug","log"],l="assert clear count dir dirxml exception group groupCollapsed groupEnd profile profileEnd table time timeEnd trace".split(" "),j=l.length,a=[];while(--j>=0){(function(n){h[n]=function(){m!==0&&d&&d[n]&&d[n].apply(d,arguments)}})(l[j])}j=c.length;while(--j>=0){(function(n,o){h[o]=function(){var q=b.call(arguments),p=[o].concat(q);a.push(p);e(p);if(!d||!k(n)){return}d.firebug?d[o].apply(i,q):d[o]?d[o](q):d.log(q)}})(j,c[j])}function e(n){if(f&&(g||!d||!d.log)){f.apply(i,n)}}h.setLevel=function(n){m=typeof n==="number"?n:9};function k(n){return m>0?m>n:c.length+m<=n}h.setCallback=function(){var o=b.call(arguments),n=a.length,p=n;f=o.shift()||null;g=typeof o[0]==="boolean"?o.shift():false;p-=typeof o[0]==="number"?o.shift():n;while(p<n){e(a[p++])}};return h})();
</script>

<script src="lib/js/Element/Basic.js" type="text/javascript" charset="utf-8"></script>
<script src="lib/js/Element/util.js" type="text/javascript" charset="utf-8"></script>
<script src="lib/js/Element/EventTarget.js" type="text/javascript" charset="utf-8"></script>
<script src="lib/js/Element/Animate.js" type="text/javascript" charset="utf-8"></script>
<script src="lib/js/Element/Filter.js" type="text/javascript" charset="utf-8"></script>
<script src="lib/js/Element/DisplayObject.js" type="text/javascript" charset="utf-8"></script>
<script src="lib/js/Element/Loop.js" type="text/javascript" charset="utf-8"></script>
<script src="lib/js/Element/Transform.js" type="text/javascript" charset="utf-8"></script>
<script src="lib/js/Element/Events.js" type="text/javascript" charset="utf-8"></script>
<script src="lib/js/Element/types/Shape.js" type="text/javascript" charset="utf-8"></script>
<script src="lib/js/Element/types/Rectangle.js" type="text/javascript" charset="utf-8"></script>
<script src="lib/js/Element/types/Bitmap.js" type="text/javascript" charset="utf-8"></script>
<script src="lib/js/Element/types/Path.js" type="text/javascript" charset="utf-8"></script>
<script src="lib/js/Element/types/Sprite.js" type="text/javascript" charset="utf-8"></script>
<script src="lib/js/Element/FrameTicker.js" type="text/javascript" charset="utf-8"></script>
<script src="lib/js/Element/Tweenie.js" type="text/javascript" charset="utf-8"></script>
<script src="lib/js/Element/canvas.js" type="text/javascript" charset="utf-8"></script>
<script src="lib/js/Element/element.js" type="text/javascript" charset="utf-8"></script>
<!-- <script src="lib/js/Element/release/Element.js" type="text/javascript" charset="utf-8"></script> -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>