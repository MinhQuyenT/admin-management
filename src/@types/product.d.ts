type Product = {
    name: string
    version: string
    description: string
    status: number
    licenseProductId?: string
    createTime?: string
}

type filterProduct = {
    name?: string
    version?: string
    description?: string
    status?: number
    start: number
    rows: number
}

interface ProductForKey extends Product {
    label?: string
    value?: string
}
