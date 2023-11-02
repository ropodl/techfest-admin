export const useWorkshop = defineStore("workshop", {
    state: () => ({
        workshops: reactive([]),
        pagination: reactive({
            totalPage: 1,
            totalItems: 0,
            itemsPerPage: 10,
            currentPage: 1,
        }),
        headers: reactive([
            {
                title: "Workshop Image",
                key: "image",
                align: "start",
                sortable: false,
            },
            {
                title: "Title",
                align: "start",
                sortable: false,
                key: "title",
            },
            {
                title: "Actions",
                align: "center",
                sortable: false,
                width: 200,
                key: "actions",
            },
        ]),
    }),
    actions: {
        async create(formData) {
            const runtimeConfig = useRuntimeConfig()
            const snackbar = useSnackbar();
            const token = localStorage.getItem("admin_auth_token");
            const { data, error } = await useFetch(runtimeConfig.public.api_url + "/workshop/create", {
                method: "post",
                body: formData,
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            if (error.value) {
                return snackbar.showSnackbar(error.value.data?.error[0].msg || error.value.message, "error");
            }
            if (data.value.success) {
                snackbar.showSnackbar("Workshop added Successfully", "success");
                navigateTo("/admin/workshop/" + data.value.id);
            }
            return data.value;
        },
        async getAllWorkshops(page, itemsPerPage) {
            const runtimeConfig = useRuntimeConfig()
            const snackbar = useSnackbar()
            const { data, error } = await useFetch(runtimeConfig.public.api_url + '/workshop', {
                params: {
                    page, per_page: itemsPerPage
                }
            })
            if (error.value)
                return snackbar.showSnackbar(error.value.data?.error || error.value.message, "error");
            this.workshops = data.value.workshops;
            this.pagination = data.value.pagination;
            return data.value;
        },
        async remove(id) {
            const runtimeConfig = useRuntimeConfig();
            const snackbar = useSnackbar();
            const token = localStorage.getItem("admin_auth_token");
            const { data, error } = await useFetch(runtimeConfig.public.api_url + "/workshop/" + id, {
                method: "delete",
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            if (error.value)
                return snackbar.showSnackbar(error.value.data?.error || error.value.message, "error");
            console.log(data)
            snackbar.showSnackbar(data.value.message, "success")
            this.getAllWorkshops(1, 10)
        },
        async removeBulk(ids) {
            const runtimeConfig = useRuntimeConfig();
            const snackbar = useSnackbar();
            const token = localStorage.getItem("admin_auth_token");

            const { data, error } = await useFetch(runtimeConfig.public.api_url + "/workshop/delete-bulk", {
                method: "delete",
                body: { ids },
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });

            if (error.value)
                return snackbar.showSnackbar(error.value.data?.error || error.value.message, "error");

            snackbar.showSnackbar(data.value.message, "success");
            this.getAllWorkshops(1, 10);
        },
        async getWorkshop(id) {
            const runtimeConfig = useRuntimeConfig();
            const snackbar = useSnackbar();
            const { data, error } = await useFetch(runtimeConfig.public.api_url + "/workshop/" + id);
            if (error.value) return snackbar.showSnackbar(error.value.data?.error || error.value.message, "error");
            console.log(data.value);

            return data.value;
        },
        async updateWorkshop(formData, id) {
            const runtimeConfig = useRuntimeConfig();
            const snackbar = useSnackbar();
            const token = localStorage.getItem("admin_auth_token");
            const { data, error } = await useFetch(runtimeConfig.public.api_url + "/workshop/" + id, {
                method: "patch",
                body: formData,
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            if (error.value) return snackbar.showSnackbar(error.value.data?.error || error.value.message, "error")
            snackbar.showSnackbar(data.value.message, "success");
            return data.value
        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useWorkshop, import.meta.hot));
}
