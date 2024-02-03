import { DataTableColumns } from "naive-ui"

export const createColumns = (): DataTableColumns<Active> => {
    return [
        {
            title: "#",
            key: "no",
            width: 70,
            align: "center",
        },
        {
            title: "Computer",
            key: "computerFk",
            width: 200,
            ellipsis: {
                tooltip: true,
            },
        },
        {
            title: "key",
            key: "keyFk",
            width: 200,
            ellipsis: {
                tooltip: true,
            },
        },
    ]
}
