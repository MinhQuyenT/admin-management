interface KeyTypeData {
    no?: number
    createTime?: string
    expDate: string | null | number
    licenseKeyTypeId?: string
    name: string | null
    status?: number | null | string
}

interface paramSearch {
    name?: string | null
    createTime?: string | null
    expDate?: string | null
    status?: number | null | string
    rows?: string | number
    start?: string | number
}

interface KeyTypeDataForKey extends KeyTypeData {
    label?: string
    value?: string
}
