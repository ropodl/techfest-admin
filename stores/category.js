export const useCategory = defineStore("category", {
    state: () => ({
        categories: reactive([]),
        pagination: reactive({
            totalPage: 1,
            totalItems: 0,
            itemsPerPage: 10,
            currentPage: 1,
        }),
        headers: reactive([
            {
                title: "Title",
                align: "start",
                sortable: false,
                key: "title",
            },
            { title: "Slug", align: "end", sortable: false, key: "slug" },
            { title: "Description", align: "end", sortable: false, key: "description" },
            { title: "Actions", align: "center", sortable: false, width: 200, key: "actions" },
        ])
    }),
    actions: {
        async create(formData) {
            const runtimeConfig = useRuntimeConfig()
            const snackbar = useSnackbar();
            const token = localStorage.getItem("admin_auth_token");
            const { data, error } = await useFetch(runtimeConfig.public.api_url + "/category/create", {
                method: "post",
                body: formData,
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            if (error.value)
                snackbar.showSnackbar(error.value.data?.error[0].msg || error.value.message, "error");
            if (data.value.success) {
                snackbar.showSnackbar("Category added successfully", "success");
                // navigateTo("/admin/category", { external: true });
            }
            return data.value || error.value;
        },
        async getAllCategories(page, itemsPerPage) {
            const runtimeConfig = useRuntimeConfig();
            const snackbar = useSnackbar();
            const { data, error } = await useFetch(runtimeConfig.public.api_url + '/category', {
                params: {
                    page, per_page: itemsPerPage
                }
            })
            if (error.value)
                return snackbar.showSnackbar(error.value.data?.error || error.value.message, "error");
            this.categories = data.value.categories;
            this.pagination = data.value.pagination;
            return data.value;
        },
        async remove(id) {
            const runtimeConfig = useRuntimeConfig()
            const snackbar = useSnackbar();
            const token = localStorage.getItem("admin_auth_token");
            const { data, error } = await useFetch(runtimeConfig.public.api_url + "/category/" + id, {
                method: "delete",
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            if (error.value) {
                snackbar.showSnackbar(error.value.data?.error || error.value.message, "error");
                return error.value;
            }
            if (data.value.success) {
                snackbar.showSnackbar(data.value.message, "success")
                this.getAllCategories(1, 10)
            }
            return data.value;
        },
        async removeBulk(ids) {
            const runtimeConfig = useRuntimeConfig();
            const snackbar = useSnackbar();
            const token = localStorage.getItem("admin_auth_token");

            const { data, error } = await useFetch(runtimeConfig.public.api_url + "/category/delete-bulk", {
                method: "delete",
                body: { ids },
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });

            if (error.value) {
                snackbar.showSnackbar(error.value.data?.error || error.value.message, "error")
                return error.value;
            }

            if (data.value.success) {
                snackbar.showSnackbar(data.value.message, "success");
                this.getAllCategories(1, 10);
            }

            return data.value;
        },
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCategory, import.meta.hot));
}
