export const queryParamsV1 = (
    object: Record<string, string | number>,
    raw: string[]
) => {
    const result = {} as NonNullable<unknown>
    const data = Object.keys(object).filter(
        key => object[key] != null && object[key] !== ""
    )
    data.map(e => {
        const obj = {} as Record<string, string | number>
        if (e.indexOf("$") === -1) {
            if (raw.includes(e)) {
                obj[e] = object[e]
            } else {
                obj[e] = "%" + object[e] + "%"
            }
            Object.assign(result, obj)
        }
    })
    return result
}
