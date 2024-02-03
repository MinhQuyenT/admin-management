interface Active {
    no?: number
    computerFk?: string | null
    keyFk?: string | null
    licenseActiveId?: string
}

interface ParamSearchActive {
    computerFk?: string | null
    keyFk?: string | null
    rows?: number
    start?: number
}
