export const useUser = defineStore("user", {
    state: () => ({
        user: reactive([]),
    }),
    actions: {
        async create(formData) {
            const runtimeConfig = useRuntimeConfig()
            const snackbar = useSnackbar();
            const { data, error } = await useFetch(runtimeConfig.public.api_url + "/frontend/user/find-or-create", {
                method: "POST",
                body: formData
            })
            if (error.value) return snackbar.showSnackbar("Some error occured, please try again", "error");

            if (data.value.success) {
                snackbar.showSnackbar("Blog added Successfully", "success");
                // navigateTo("/admin/blog/" + data.value.blog.slug);
                localStorage.setItem("user_token", data.value.token);
            }
            return data.value;
        },
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUser, import.meta.hot));
}
