import { useState, useEffect, useRef } from 'react'

export function useResizeObserver<T extends HTMLElement>(): [
    React.MutableRefObject<T | null>,
    { width: number; height: number }
] {
    const elementRef = useRef<T | null>(null) // ссылка на отслеживаемый элемент
    const [size, setSize] = useState({ width: 0, height: 0 }) // состояние для размеров

    useEffect(() => {
        const element = elementRef.current
        if (!element) return

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect
                setSize({ width, height })
            }
        })

        resizeObserver.observe(element)

        return () => {
            resizeObserver.disconnect()
        }
    }, [])

    return [elementRef, size]
}
