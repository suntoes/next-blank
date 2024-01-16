import classnames from 'classnames'

export function mergeClass(className = '', toMerge = '') {
    const tmpClass = className.split(' ').map((item) => item.split('-'))
    const tmpToMerge = toMerge.split(' ').map((item) => item.split('-'))
    const newClass = tmpClass
        .filter((item) => {
            return !tmpToMerge.some((x) => {
                const testA = x[0] === item[0] && x.length === item.length
                const testB = hasDigit(x[x.length - 1]) === hasDigit(item[x.length - 1])
                return testA && testB
            })
        })
        .map((item) => item.join('-'))
        .join(' ')

    return eraseBefore(classnames(newClass, toMerge), 'clear')
}

export function cn(...classes: (string | undefined)[]) {
    let tmp = ''
    classes.forEach((className) => {
        tmp = mergeClass(tmp, className) || ''
    })
    return eraseBefore(tmp, 'clear')
}

export function eraseBefore(string: string, word: string) {
    const arr = word.split(' ')
    const index = arr.indexOf(word)
    if (index > 0) arr.slice(index).join(' ')
    else return string
}

export function createUrlParams(values: { [key: string]: any }) {
    const params = Array.from(Object.keys(values))
        .map((key) =>
            values[key]
                ? `${key}=${encodeURI(typeof values[key] === 'object' ? JSON.stringify(values[key]) : values[key])}`
                : undefined,
        )
        .filter((x) => x)
        .join('&')
    return params ? '?' + params : ''
}

export function stringify(val: string) {
    return typeof val === 'object' ? JSON.stringify(val) : String(val)
}

export function hasDigit(inputString: string = '') {
    for (let i = 0; i < inputString.length; i++) {
        if (/\d/.test(inputString[i])) {
            return true
        }
    }
    return false
}

export function createRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

export function detectApostrophedWords(inputString: string) {
    const regex = /(['"])(.*?)\1/g
    const matches = []
    let match

    while ((match = regex.exec(inputString)) !== null) {
        matches.push(match[0])
    }

    return matches
}

export function truncateString(inputStr: string, maxLength: number) {
    if (inputStr.length > maxLength) {
        const truncatedStr = inputStr.substring(0, maxLength - 3) + '...'
        return truncatedStr
    } else {
        return inputStr
    }
}
