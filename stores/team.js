export const useTeams = defineStore("team", {
    state: () => ({
        teams: reactive([]),
        pagination: reactive({
            totalPage: 1,
            totalItems: 0,
            itemsPerPage: 10,
            currentPage: 1,
        }),
        headers: reactive([{
            title: "Image",
            align: "start",
            sortable: false,
            key: "memberImage"
        }, {
            title: "Name/Info",
            align: "start",
            sortable: false,
            key: "name"
        }, {
            title: "Actions",
            width: 200,
            align: "center",
            sortable: false,
            key: "actions"
        }])
    }),
    actions: {
        async create(formData) {
            const runtimeConfig = useRuntimeConfig();
            const snackbar = useSnackbar();
            const token = localStorage.getItem("admin_auth_token");
            const { data, error } = await useFetch(runtimeConfig.public.api_url + "/team/create", {
                method: "post",
                body: formData,
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            if (error.value) return snackbar.showSnackbar(error.value.data?.error[0].msg || error.value.message, "error");

            if (data.value.success) {
                snackbar.showSnackbar("Team added successfully", "success");
                navigateTo("/admin/team/" + data.value.member.id);
            }
            return data.value
        },
        async getAllTeams(page, itemsPerPage) {
            const runtimeConfig = useRuntimeConfig()
            const snackbar = useSnackbar()
            const { data, error } = await useFetch(runtimeConfig.public.api_url + '/team', {
                params: {
                    page, per_page: itemsPerPage
                }
            })
            if (error.value)
                return snackbar.showSnackbar(error.value.data?.error || error.value.message, "error");
            this.teams = data.value.teams;
            this.pagination = data.value.pagination;
            return data.value;
        },
        async update(formData) {
            const runtimeConfig = useRuntimeConfig();
            const snackbar = useSnackbar();
            const token = localStorage.getItem("admin_auth_token");
            const { data, error } = await useFetch(runtimeConfig.public.api_url + "/team",
                {
                    method: "patch",
                    body: formData,
                    headers: {
                        authorization: `Bearer ${token}`,
                    }
                })
            if (error.value) return snackbar.showSnackbar(error.value.data?.error || error.value.message, "error")
            snackbar.showSnackbar(data.value.message, "success");
            return data.value;
        },
        async getTeam(id) {
            const runtimeConfig = useRuntimeConfig();
            const snackbar = useSnackbar();
            const { data, error } = await useFetch(runtimeConfig.public.api_url + "/team/" + id);
            if (error.value) return snackbar.showSnackbar(error.value.data?.error || error.value.message, "error")
            return data.value;
        },
        async remove(id) {
            const runtimeConfig = useRuntimeConfig();
            const snackbar = useSnackbar();
            const token = localStorage.getItem("admin_auth_token");
            const { data, error } = await useFetch(runtimeConfig.public.api_url + "/team/" + id, {
                method: "delete",
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            if (error.value)
                return snackbar.showSnackbar(error.value.data?.error || error.value.message, "error");
            console.log(data)
            snackbar.showSnackbar(data.value.message, "success")
            this.getAllTeams(1, 10)
        },
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTeams, import.meta.hot));
}