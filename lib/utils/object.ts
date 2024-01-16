export function reverseObj(obj: { [key: string]: any }) {
    const tmp: { [key: string]: any } = {}
    Array.from(Object.keys(obj))
        .reverse()
        .forEach((key: string) => (tmp[key] = obj[key]))
    return tmp
}

export function hasUndefinedValue(obj?: { [key: string]: any }) {
    if (!obj) return true
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                // If the current property is an object, recursively check its values
                if (hasUndefinedValue(obj[key])) return true
            } else if (obj[key] === undefined || obj[key] === '') return true
        }
    }
    // If no undefined value is found, return false
    return false
}

export function crawlKey(data: { [key: string]: any }, keyParam: string) {
    const result: { [key: string]: any } = {}

    function crawl(obj: { [key: string]: any }) {
        if (typeof obj === 'object' && obj !== null) {
            if (keyParam in obj && typeof obj[keyParam] === 'string' && obj[keyParam].trim() !== '') {
                result[obj[keyParam]] = obj
                // Continue crawling if there are more nested structures
                for (const key in obj) {
                    crawl(obj[key])
                }
            } else {
                // If there is no key, continue crawling nested structures
                for (const key in obj) {
                    crawl(obj[key])
                }
            }
        }
    }

    let hasNewKeys = true
    while (hasNewKeys) {
        hasNewKeys = false
        for (const key in result) {
            crawl(result[key])
            hasNewKeys = hasNewKeys || Object.keys(result).length > 0
        }
    }

    crawl(data)

    return result
}
