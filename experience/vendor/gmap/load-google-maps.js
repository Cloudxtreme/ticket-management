var loadGoogleMaps=function(o){var e,a=o.now();return function(l,n,g){if(e)return e;var r=o.Deferred(),t=function(){r.resolve(window.google&&google.maps?google.maps:!1)},s="loadGoogleMaps_"+a++,d=o.extend({sensor:!1},n?{key:n}:{},g?{language:g}:{});return window.google&&google.maps?t():window.google&&google.load?google.load("maps",l||3,{other_params:o.param(d),callback:t}):(d=o.extend(d,{v:l||3,callback:s}),window[s]=function(){t(),setTimeout(function(){try{delete window[s]}catch(o){}},20)},o.ajax({dataType:"script",data:d,url:"http://maps.google.com/maps/api/js"})),e=r.promise()}}(jQuery);