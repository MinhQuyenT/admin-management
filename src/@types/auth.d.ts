interface AuthReq {
    username: string
    password: string
}

interface RefreshTokenReq {
    refreshToken: string
}

interface AuthRes extends Res {
    data: {
        accessToken: string
        refreshToken: string
    }
}

interface RefreshTokenRes extends Res {
    data: {
        accessToken: string
        refreshToken: string
    }
}
