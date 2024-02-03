type Account = {
    accountId?: string
    firstName: string
    lastName: string
    birthDay?: string
    username: string
    password?: string
    email: string
    imageFk?: string
    provider?: string
    enable: number
    createTime?: string
    delTime?: string
    creator?: string | null
    delUser?: string | null
}

type filterAccount = {
    firstName?: string
    lastName?: string
    username?: string
    email?: string
    start: number
    rows: number
}
