export function compare(
    a: NonNullable<unknown>,
    b: NonNullable<unknown>,
    c: string
) {
    if (a[c] < b[c]) {
        return -1
    }
    if (a[c] > b[c]) {
        return 1
    }
    return 0
}
