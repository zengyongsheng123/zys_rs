(function() {
  // 保存原生方法
  const originalPush = Array.prototype.push;
  // Hook push 方法
  Array.prototype.push = function(...args) {
      try{
          if(args[0].length!==3){return originalPush.apply(this, args);}
      }catch(e){}
    console.warn("[push]::::","this::::",this,"args::::",args);
    // 调用原始方法并返回结果
    return originalPush.apply(this, args);
  };
})();

function b(f) {
            if (a['passValidate'])
                return;
            a['isDraging'] = !![];
            var g = f || event;
            if (document['all']) {
                window['event']['returnValue'] = ![];
                window['event']['cancelBubble'] = !![];
            } else {
                g['preventDefault']();
                g['stopPropagation']();
                g['returnValue'] = ![];
            }
            ;if (g['touches'])
                g = g['touches'][0x0];
            a['disX'] = g['clientX'];
            a['slideGreenBar']['style']['display'] = 'block';
            a['mousePos'] = [];
            a['mousePos']['push']([a['getLeft'](a['slideBtn'])['toFixed'](0x0), a['getTop'](a['slideBtn'])['toFixed'](0x0), new Date()['getTime']()]);
            a['mousePos']['push']([g['clientX']['toFixed'](0x0), g['clientY']['toFixed'](0x0), new Date()['getTime']()]);
            document['onmousemove'] = h;
            document['ontouchmove'] = h;
            document['onmouseup'] = j;
            document['ontouchend'] = j;
            function h(k) {
                var l = k || event;
                if (document['all']) {
                    window['event']['returnValue'] = ![];
                    window['event']['cancelBubble'] = !![];
                } else {
                    l['preventDefault']();
                    l['stopPropagation']();
                    l['returnValue'] = ![];
                }
                ;if (l['touches'])
                    l = l['touches'][0x0];
                var m = l['clientX'] - a['disX'] + 0x28;
                var n = l['clientX'] - a['disX'];
                var o = l['clientX'] - a['disX'];
                if (o < 0x0) {
                    o = 0x0;
                } else if (o > a['width'] - 0x32 / a['imgRatio']) {
                    o = a['width'] - 0x32 / a['imgRatio'];
                }
                if (n < 0x0) {
                    n = 0x0;
                } else if (n > a['width'] - 0x28) {
                    n = a['width'] - 0x28;
                }
                if (m < 0x2c) {
                    m = 0x2c;
                } else if (m > a['width']) {
                    m = a['width'];
                }
                a['mousePos']['push']([l['clientX']['toFixed'](0x0), l['clientY']['toFixed'](0x0), new Date()['getTime']()]);
                a['slideBtn']['style']['left'] = n + 'px';
                a['slideSmallImg']['style']['left'] = o + 'px';
                a['slideGreenBar']['style']['width'] = m + 'px';
                return ![];
            }
            ;function j(k) {
                var l = k || event;
                if (l['changedTouches'])
                    l = l['changedTouches'][0x0];
                a['isDraging'] = ![];
                a['mousePos']['push']([l['clientX']['toFixed'](0x0), l['clientY']['toFixed'](0x0), new Date()['getTime']()]);
                document['onmousemove'] = null;
                document['ontouchmove'] = null;
                document['onmouseup'] = null;
                document['ontouchend'] = null;
                if (a['mousePos']['length'] <= 0x3) {
                    a['slideGreenBar']['style']['display'] = 'none';
                    a['slideText']['setAttribute']('class', 'JDJRV-slide-inner\x20JDJRV-slide-text');
                    a['slideText']['setAttribute']('className', 'JDJRV-slide-inner\x20JDJRV-slide-text');
                    return;
                }
                a['submit']();
            }
        }



function getLeft(a) {
        var b = a;
        var c = 0x0;
        var d = 0x0;
        if (document['getElementById'] || document['all']) {
            do {
                d += a['offsetLeft'] - a['scrollLeft'];
                c += a['offsetTop'] - a['scrollTop'];
                a = a['offsetParent'];
                b = b['parentNode'];
                while (b != a) {
                    d -= b['scrollLeft'];
                    c -= b['scrollTop'];
                    b = b['parentNode'];
                }
            } while (a['offsetParent']);
        } else if (document['layers']) {
            c += a['y'];
            d += a['x'];
        }
        if (document['compatMode'] == 'BackCompat') {
            var g = document['body']['scrollLeft'];
        } else {
            var g = document['documentElement']['scrollLeft'];
        }
        return d - g;
    }