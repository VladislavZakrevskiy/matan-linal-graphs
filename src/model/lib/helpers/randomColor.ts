export function getRandomBrightColor(): string {
    const getBrightValue = () => Math.floor(Math.random() * 128) + 128
    const red = getBrightValue()
    const green = getBrightValue()
    const blue = getBrightValue()

    return `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue
        .toString(16)
        .padStart(2, '0')}`
}
