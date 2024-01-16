import { createRegExp, stringify } from 'lib/utils'

export function searchByString(arr: any[], str: string, condition: (val: any) => string = stringify) {
    const searchRegex = new RegExp(createRegExp(str), 'i')
    return arr.filter((val: any) => searchRegex.test(condition(val)))
}

export function flatten(arr: any[]) {
    if (!arr) return []
    let tmpArr: any[] = []
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            tmpArr = tmpArr.concat(flatten(arr[i]))
        } else {
            tmpArr.push(arr[i])
        }
    }
    return tmpArr
}
