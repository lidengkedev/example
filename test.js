function getAnim(t, z) {
    let n_2 = z * 2
    let a = (t - n_2) / 2
    let b = z - a
    console.log('兔子的数量为：' + a)
    console.log('鸡的数量为：' + b)
}
getAnim(94, 35)





function numToCaseUpper(num) {
    let num_str_arr = num.toString().split('')
    let NUM_CASEUPPER = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
    let UNIT_CASEUPPER = ['', '拾', '佰', '千', '万', '亿'].slice(0, num_str_arr.length).reverse()
    let result = ''

    for (let i = 0; i < num_str_arr.length; i++) {
        if (Number(num_str_arr[i]) === 0) {
            result += NUM_CASEUPPER[Number(num_str_arr[i])]
            continue
        } else {
            result += NUM_CASEUPPER[Number(num_str_arr[i])] + UNIT_CASEUPPER[i]
        }
    }
    return result + '元整'
}

console.log(numToCaseUpper(111011))





