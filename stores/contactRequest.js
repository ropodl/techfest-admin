export const useContactRequest = defineStore("contactRequest", {
    state: () => ({
        contactRequests: reactive({})
    }),
    actions: {
        async create(formData, contactForm) {
            const runtimeConfig = useRuntimeConfig();
            const snackbar = useSnackbar();
            const token = localStorage.getItem("admin_auth_token");
            const { data, error } = await useFetch(runtimeConfig.public.api_url + "/contact-request/create", {
                method: "post",
                body: formData,
                //   headers: {
                //     authorization: `Bearer ${token}`
                //   }
            });
            if (error.value) return snackbar.showSnackbar(error.value.data?.error[0].msg || error.value.message, "error");
            snackbar.showSnackbar("Form Submitted, We'll reach back to you asap.", "success");
            this.terms = data.value;
            contactForm.value.reset()
        },
        async getAllContactRequests(page, itemsPerPage, sortBy) {
            const runtimeConfig = useRuntimeConfig()
            const snackbar = useSnackbar()
            console.log(sortBy)
            const { data, error } = await useFetch(runtimeConfig.public.api_url + '/contact-request', {
                params: {
                    page,
                    per_page: itemsPerPage,
                    // sort: sortBy[0]?.key,
                    // desc: sortBy[0]?.order === 'desc'
                }
            })
            if (error.value)
                return snackbar.showSnackbar(error.value.data?.error || error.value.message, "error");
            this.contactRequests = data.value;
            console.log(data.value)
            return data.value;
        },
        async removeBulk(ids) {
            const runtimeConfig = useRuntimeConfig();
            const snackbar = useSnackbar();
            const token = localStorage.getItem("admin_auth_token");

            const { data, error } = await useFetch(runtimeConfig.public.api_url + "/contact-request/delete-bulk", {
                method: "delete",
                body: { ids },
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });

            if (error.value)
                return snackbar.showSnackbar(error.value.data?.error || error.value.message, "error");

            snackbar.showSnackbar(data.value.message, "success");
            // this.getAllBlogs(1, 10);
        },
        async updateTerms(formData) {
            const runtimeConfig = useRuntimeConfig();
            const snackbar = useSnackbar();
            const token = localStorage.getItem("admin_auth_token");
            const { data, error } = await useFetch(runtimeConfig.public.api_url + "/terms",
                {
                    method: "patch",
                    body: formData,
                    headers: {
                        authorization: `Bearer ${token}`,
                    }
                })
            if (error.value) return snackbar.showSnackbar(error.value.data?.error || error.value.message, "error")
            snackbar.showSnackbar(data.value.message, "success");
            this.terms.content = data.value.terms.content
            return this.terms
        }
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTerms, import.meta.hot));
}