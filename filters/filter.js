// 

export function parseDiscount(discountRule) {
    if (discountRule == 0) {
        return '满额减';
    } else if (discountRule == 1) {
        return '满件减';
    } else if (discountRule == 2) {
        return '满额折';
    } else if (discountRule == 3) {
        return '满件折';
    } else {
        return '';
    }
}

export function parseDiscountMsg(discountRule, needAmount, discount) {
    if (discountRule == 0) {
        return '购满' + needAmount + '元减' + discount + '元';
    } else if (discountRule == 1) {
        return '购满' + needAmount + '件减' + discount + '元';
    } else if (discountRule == 2) {
        return '购满' + needAmount + '元打' + discount + '折';
    } else if (discountRule == 3) {
        return '购满' + needAmount + '件打' + discount + '折';
    } else {
        return '';
    }
}

export function toPrice(val) {
    if (!val) {
        val = 0;
    }

    return val.toFixed(2);
}
export function toRate(val) {
    let res
    if (!val) {
        val = 0;
    }
    if (String(val).length) {
        res = val.toFixed(1)
    }
    return res;
}

export function parsePrice(val) {
    if (!val) {
        val = 0;
    }

    return val.toFixed(2).split(".");
}

export function array_contain(array, obj) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == obj) //如果要求数据类型也一致，这里可使用恒等号===
            return true;
    }

    return false;
} //判断当前的规格值 是否可以选，即其他


export function props_contain(allProperties, selectedPropObj, key, item, propKeys) {
    var properties = "";
    selectedPropObj[key] = item;

    for (var j = 0; j < propKeys.length; j++) {
        properties += propKeys[j] + ":" + selectedPropObj[propKeys[j]] + ";";
    }

    properties = properties.substring(0, properties.length - 1);
    var find = false;

    for (var i = 0; i < allProperties.length; i++) {
        if (properties == allProperties[i]) {
            find = true;
            break;
        }
    }

    return find;
}


export function number_format(number, decimals = 3, dec_point = ':', thousands_sep = ',') {
    /*
     * 参数说明：
     * number：要格式化的数字
     * decimals：保留几位小数
     * dec_point：小数点符号
     * thousands_sep：千分位符号
     * */
    number = (number + '').replace(/[^0-9+-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function(n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.ceil(n * k) / k;
        };

    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    var re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
        s[0] = s[0].replace(re, "$1" + sep + "$2");
    }

    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}





export default { parsePrice, parseDiscount, parseDiscountMsg, toPrice, props_contain, array_contain, toRate }