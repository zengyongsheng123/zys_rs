var Ooo0oQ = function(oQQ0Qo) {
    return Math.round(oQQ0Qo).toString(36);
};

var O00Ooo1 = function() {
    const oQQ0Qo = 99;
    const QQoooQ = Math.round(O00Ooo1.length / oQQ0Qo)
        , ooQOQO = [];
    for (var QOoOOO = 0, oQO0Q0 = O00Ooo1.length; QOoOOO < oQO0Q0; QOoOOO++) {
                var OoOQ0O = O00Ooo1[QOoOOO];
                if (QOoOOO % QQoooQ === 0) {
                    ooQOQO.push(OoOQ0O);
                }
            }
    let O00Ooo = ooQOQO;
        };

function hb(a) {
        return a;
    }
my_offset = function(a) {
        if (arguments.length)
            return this;
        var b, d, e = {
            top: 0,
            left: 0
        }, f = (d = this[0]) && d.ownerDocument;
        if (f) {
            b = f.documentElement;
            if (!c.contains(b, d))
                return e;
            'undefined' !== typeof d.getBoundingClientRect && (e = d.getBoundingClientRect());
            d = hb(f);
            return {
                top: e.top + (d.pageYOffset || b.scrollTop) - (b.clientTop || 0),
                left: e.left + (d.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)
            };
        }
    }
my_width = function(value, includeMargin) {
    // 如果有参数 value，则是设置操作；否则是获取操作
    var isSetting = arguments.length && (value !== true);
    var cssProperty = includeMargin || value === true ? 'margin' : 'border';

    return jQuery.access(this, function(element, prop, val) {
        // 窗口对象
        if (jQuery.isWindow(element)) {
            return element.document.documentElement['clientWidth'];
        }
        // 文档对象
        if (element.nodeType === 9) {
            var docElement = element.documentElement;
            return Math.max(
                element.body.scrollWidth,
                docElement.scrollWidth,
                element.body.offsetWidth,
                docElement.offsetWidth,
                docElement.clientWidth
            );
        }
        // 普通元素
        if (val === undefined) {
            // 获取 CSS 属性
            return jQuery.css(element, prop, cssProperty);
        } else {
            // 设置 CSS 属性
            return jQuery.style(element, prop, val, cssProperty);
        }
    }, this, isSetting ? value : undefined, isSetting);
};
const QooQQO = function (oQQ0Qo, QQoooQ) {
    var ooQOQO, QOoOOO = '', oQO0Q0 = '', OoOQ0O = 0;
    var QOo0Oo = my_offset() || {
        top: 0,
        left: 0
    };
    QOo0Oo.width = my_width();
    QOo0Oo.height = null;
    O00Ooo1();
    let QOo0Qo = new Date()["getTime"]()
    ooQOQO = Ooo0oQ(QOo0Oo.left) + ',' + Ooo0oQ(QOo0Oo.top) + ',' + Ooo0oQ(QOo0Oo.left + QOo0Oo.width) + ',' + Ooo0oQ(QOo0Oo.top + QOo0Oo.height) + ',' + Ooo0oQ(oQQ0Qo) + ',' + Ooo0oQ(QQoooQ) + ',' + '0,' + '0' + ',' + Ooo0oQ(QOo0Qo);
    for (let OOOQOQ = O00Ooo1.length - 1; OOOQOQ >= 0; OOOQOQ--) {
        const QoQQo0 = O00Ooo1[OOOQOQ];
        QOoOOO = Ooo0oQ(QoQQo0.time - QOo0Qo) + ',' + Ooo0oQ(QoQQo0.type) + ',' + Ooo0oQ(QoQQo0.op_x) + ',' + Ooo0oQ(QoQQo0.op_y) + (',' + Ooo0oQ(QoQQo0.Action)) + '|' + QOoOOO;
        OoOQ0O++
    }
    return ooQOQO + '%' + QOoOOO + '%' + oQO0Q0;
};
console.log(QooQQO(0, 0));