interface Computer {
    no?: number
    computerIp?: string | null
    computerMac?: string | null
    computerName?: string | null
    computerSerialId?: string | null
    licenseComputerId?: string
}

interface ParamSearchComputer {
    computerIp?: string | null
    computerMac?: string | null
    computerName?: string | null
    computerSerialId?: string | null
    rows?: number
    start?: number
}
