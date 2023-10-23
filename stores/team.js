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
            title: "Name",
            align: "start",
            sortable: false,
            key: "Name"
        }, {
            title: "Email Address",
            align: "start",
            sortable: false,
            key: "email"
        }, {
            title: "Phone Number",
            align: "start",
            sortable: false,
            key: "phone"
        }, {
            title: "Role",
            align: "start",
            sortable: false,
            key: "role"
        }, {
            title: "Leader",
            align: "start",
            sortable: false,
            key: "leader"
        },])
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
            snackbar.showSnackbar("Team added successfully", "success");
            this.terms = data.value;
        },
        async getTeams() {
            const runtimeConfig = useRuntimeConfig()
            const { data, error } = await useFetch(runtimeConfig.public.api_url + `/teams`)
            console.log(error.value.error);
            if (error.value)
                return this.terms = { message: "Terms and Conditions not found", status: 404 };
            this.terms = data.value;
            console.log(data.value);
            return data.value;
        },
        async updateTeam(formData) {
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
            this.teams.content = data.value.terms.content
            return this.teams
        }
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTeams, import.meta.hot));
}