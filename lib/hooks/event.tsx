import { useEffect, useMemo, useRef, useState } from 'react'

import { getBreakpoint, getBreaks } from 'lib/utils'

export function useTwBreakpoint() {
    const [breakpoint, setBreakpoint] = useState<string>(getBreakpoint())
    const [breaks, setBreaks] = useState(getBreaks())
    const isMobile: boolean = useMemo(() => ['base', 'xs', 'sm'].includes(breakpoint), [breakpoint])
    const isTablet: boolean = useMemo(() => ['base', 'xs', 'sm', 'md'].includes(breakpoint), [breakpoint])
    const isDesktop: boolean = useMemo(() => !isMobile, [isMobile])

    useEffect(() => {
        function handleResize() {
            setBreakpoint(getBreakpoint())
            setBreaks(getBreaks())
        }
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return {
        breakpoint,
        breaks,
        isMobile,
        isTablet,
        isDesktop,
    }
}

export function useOutsideClick(ref: React.RefObject<HTMLElement>, callback: (value: boolean) => void) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event: MouseEvent) {
            callback(!!ref.current && !ref.current.contains(event.target as Node))
        }
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [ref, callback])
}

export function useSizeListener(ref: React.RefObject<HTMLElement>) {
    const [size, setSize] = useState({ width: 0, height: 0 })
    const resizeObserverRef = useRef<ResizeObserver | null>(null) // Specify the type

    useEffect(() => {
        if (!ref.current) return

        resizeObserverRef.current = new ResizeObserver((entries) => {
            const { width, height } = entries[0].contentRect
            setSize({ width, height })
        })

        resizeObserverRef.current.observe(ref.current!) // Use the non-null assertion operator

        return () => {
            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect()
            }
        }
    }, [ref])

    return size
}
