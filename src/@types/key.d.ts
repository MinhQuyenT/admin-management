interface KeyDataType {
    no?: number
    customerFk?: string | null
    keyId?: string
    keyTypeFk?: string | null
    productFk?: string | null
    quatity?: number | null
}

interface ParamSearchKey {
    customerFk?: string | null
    keyTypeFk?: string | null
    productFk?: string | null
    quatity?: number | null
    rows?: number
    start?: number
}
