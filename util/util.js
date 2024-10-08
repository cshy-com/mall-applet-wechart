/*
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-05-08 17:00:41
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-08-21 15:04:25
 * @FilePath: \mall-applet\util\util.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatDate = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()


    return [year, month, day].map(formatNumber).join('-')
}
const formatNumber = n => {
        n = n.toString()
        return n[1] ? n : '0' + n
    }
    /**

     * 生成uuid

     */

const wxuuid = function() {
    var s = [];
    var hexDigits = "0123456789abcdef";

    for (var i = 0; i < 36; i++) {

        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);

    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010

    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01

    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("").replace("-", "");
    return uuid
}

const regular = () => {
        return {
            mobile: /^(13[0-9]|14[4579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[1589])\d{8}$/, //手机号
            idCard: /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/, //身份证
            email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, //只允许英文字母、数字、下划线、英文句号、以及中划线组成
        }
    }
    //获取列表一共多少页 totalCount：总条数，pageSize：一页多少条
const getTotalPage = (totalCount, pageSize) => {
    return Math.ceil(totalCount / pageSize)
        // return (totalCount + pageSize - 1) / pageSize
}

const getUrlParams = (url) => {
    let o = {}
    if (url.indexOf('?') != -1) {
        let str = url.substr(url.indexOf('?') + 1).replace(/[#/|/#/]/g, '')
            // console.log(str);
        let strs = str.split('&')
            // console.log(strs);
        for (let i = 0; i < strs.length; i++) {
            o[strs[i].split('=')[0]] = decodeURIComponent(strs[i].split('=')[1])
        }
    }
    return o
}
const handleHtmlImage = (html = '', resetClass) => {
    var newHtml = html.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/ig, function(match, src) {
        let result = match
            //返回每个匹配的字符串
        if (resetClass) result = result.replace(/class=\"(.*)editor--/gi, 'class="');
        result = result.replace(/\<img/gi, '<img style="max-width:100%;height:auto"');
        return result;
    });
    return newHtml;
}
const formatRichText = (html) => {
    let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
        match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
        match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
        match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
        return match;
    });
    newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
        match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
        return match;
    });
    newContent = newContent.replace(/<br[^>]*\/>/gi, '');
    newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;margin-top:0;margin-bottom:0;"');
    return newContent;
}

module.exports = {
    wxuuid,
    formatTime: formatTime,
    formatDate: formatDate,
    regular,
    getTotalPage,
    getUrlParams,
    handleHtmlImage,
    formatRichText
}