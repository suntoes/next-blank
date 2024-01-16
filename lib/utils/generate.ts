import { breakpoints } from 'lib/vars'

export const getBreakpoint = (): string => {
    const { innerWidth } = window
    const breakpointKeys: string[] = Array.from(Object.keys(breakpoints) as string[])
    for (let i = 0; i < breakpointKeys.length; i++) {
        if (innerWidth >= breakpoints[breakpointKeys[i]]) return breakpointKeys[i]
    }
    return 'base'
}

export const getBreaks = (breakpoint?: string): string[] => {
    const { innerWidth } = window
    let width = innerWidth
    if (breakpoint) width = breakpoints[breakpoint] || innerWidth

    const breakpointKeys: string[] = Array.from(Object.keys(breakpoints) as string[])
    const breaks: string[] = []
    for (let i = 0; i < breakpointKeys.length; i++) {
        if (width >= breakpoints[breakpointKeys[i]]) breaks.push(breakpointKeys[i])
    }
    return breaks
}

export const getFormValues = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const values: { [key: string]: any } = {}
    const target = event?.target as HTMLFormElement
    Array.from(Object.keys(target)).forEach((x: string) => {
        const { value, name } = target[x]
        if (value && name) values[name] = value
    })
    return values
}

export const getNearestPlace = async (callback: (value: { vicinity: string } | undefined) => void) => {
    getCoordinates((val: { latitude: number; longitude: number }) => getPlaceByCoords(val, callback))
}

export const getCoordinates = async (callback: (val: { latitude: number; longitude: number }) => void) => {
    if (navigator.geolocation)
        await navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords
                callback({ latitude, longitude })
            },
            (error) => console.error('Error getting current location:', error),
        )
    else console.error('Geolocation is not supported by this browser.')
}

export const getPlaceByCoords = async (
    { latitude, longitude }: { latitude: number; longitude: number },
    callback: (val: { vicinity: string } | undefined) => void,
) => {
    try {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&rankby=distance&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`,
        )
        const data = await response.json()
        if (data.results && data.results.length > 0) callback(data.results[0])
        else return callback(undefined)
    } catch (error) {
        console.error('Error fetching nearest place:', error)
        return callback(undefined)
    }
}
