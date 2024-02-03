type Customer = {
    customerId?: string
    name: string
    email: string
    mobil: string
    address: string
    description: string
    status: number
    createBy?: string
    createTime?: string
}
type filterCustomer = {
    email: string
    name: string
    description: string
    address: string
    mobil?: string
    status?: number
    start: number
    rows: number
}

interface CustomerForKey extends Customer {
    label?: string
    value?: string
}
