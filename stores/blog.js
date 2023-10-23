export const useBlog = defineStore("blog", {
    state: () => ({
        blogs: reactive([]),
        pagination: reactive({
            totalPage: 1,
            totalItems: 0,
            itemsPerPage: 10,
            currentPage: 1,
        }),
        headers: reactive([
            {
                title: "Featured Image",
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
            { title: "Categories", align: "center", sortable: false, key: "categories" },
            {
                title: "Actions",
                align: "center",
                sortable: false,
                width: 200,
                key: "actions",
            },
        ]),
    }),
    getters: {
        getBlogs: (state) => state.blogs
    },
    actions: {
        async create(formData) {
            const runtimeConfig = useRuntimeConfig()
            const snackbar = useSnackbar();
            const token = localStorage.getItem("admin_auth_token");
            const { data, error } = await useFetch(runtimeConfig.public.api_url + "/blog/create", {
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
                snackbar.showSnackbar("Blog added Successfully", "success")
                navigateTo("/admin/blog/" + data.value.blog.slug)
                return { blogs: this.blogs, pagination: this.pagination };
            }
        },
        async getAllBlogs(page, itemsPerPage) {
            const runtimeConfig = useRuntimeConfig()
            const snackbar = useSnackbar()
            const { data, error } = await useFetch(runtimeConfig.public.api_url + '/blog', {
                params: {
                    page, per_page: itemsPerPage
                }
            })
            if (error.value)
                return snackbar.showSnackbar(error.value.data?.error || error.value.message, "error");
            this.blogs = data.value.blogs;
            this.pagination = data.value.pagination;
            return data.value;
        },
        async remove(id) {
            const runtimeConfig = useRuntimeConfig();
            const snackbar = useSnackbar();
            const token = localStorage.getItem("admin_auth_token");
            const { data, error } = await useFetch(runtimeConfig.public.api_url + "/blog/" + id, {
                method: "delete",
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            if (error.value)
                return snackbar.showSnackbar(error.value.data?.error || error.value.message, "error");
            console.log(data)
            snackbar.showSnackbar(data.value.message, "success")
            this.getAllBlogs(1, 10)
        },
        async removeBulk(ids) {
            const runtimeConfig = useRuntimeConfig();
            const snackbar = useSnackbar();
            const token = localStorage.getItem("admin_auth_token");

            const { data, error } = await useFetch(runtimeConfig.public.api_url + "/blog/delete-bulk", {
                method: "delete",
                body: { ids },
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });

            if (error.value)
                return snackbar.showSnackbar(error.value.data?.error || error.value.message, "error");

            snackbar.showSnackbar(data.value.message, "success");
            this.getAllBlogs(1, 10);
        },
        async getBlog(slug) {
            const runtimeConfig = useRuntimeConfig();
            const snackbar = useSnackbar();
            const { data, error } = await useFetch(runtimeConfig.public.api_url + "/blog/" + slug);
            if (error.value) return snackbar.showSnackbar(error.value.data?.error || error.value.message, "error")
            return data.value;
        },
        async updateBlog(formData, id) {
            const runtimeConfig = useRuntimeConfig();
            const snackbar = useSnackbar();
            const token = localStorage.getItem("admin_auth_token");
            const { data, error } = await useFetch(runtimeConfig.public.api_url + "/blog/" + id, {
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
    import.meta.hot.accept(acceptHMRUpdate(useBlog, import.meta.hot));
}
