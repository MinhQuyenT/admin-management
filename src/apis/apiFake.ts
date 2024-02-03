const getRoutes = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            const routes = [
                {
                    path: "/dashboard",
                    name: "dashboard",
                    component: "views/dashboard/index.vue",
                    children: [],
                },
                {
                    path: "/about",
                    name: "about",
                    component: "views/about/index.vue",
                    children: [],
                },
                {
                    path: "/account-management",
                    name: "accountManagement",
                    component: "views/accountManagement/index.vue",
                    children: [],
                },
                {
                    path: "/key-management",
                    name: "keyManagement",
                    component: "views/keyManagement/index.vue",
                    children: [],
                },
                {
                    path: "/customer-management",
                    name: "customerManagement",
                    component: "views/customerManagement/index.vue",
                    children: [],
                },
            ]
            resolve({
                code: 0,
                data: routes,
                msg: null,
            })
        }, 800)
    })
}

export const getRouteServer = async (): Promise<Res> => {
    return (await getRoutes()) as Res
}
