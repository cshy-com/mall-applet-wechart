// 




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




export function handleNum(num) {
    if (!num) {
        return 0
    }
    if (num < 1000) {
        return num
    }
    if (num < 10000 && num >= 1000) {
        let numArr = (num / 1000 + '').split('.')
        if (numArr.length > 1) {
            if (numArr[1][0] === '0') {
                return numArr[0] + '000+'
            } else {
                return numArr[0] + numArr[1][0] + '00+'
            }
        } else {
            return numArr[0] + '000+'
        }
    } else if (num >= 10000) {
        let numArr = (num / 10000 + '').split('.')
        if (numArr.length > 1) {
            if (numArr[1][0] === '0') {
                return numArr[0] + '万+'
            } else {
                return numArr[0] + '.' + numArr[1][0] + '万+'
            }
        } else {
            return numArr[0] + '万+'
        }
    }
}



export default { parsePrice, toPrice, toRate, handleNum }