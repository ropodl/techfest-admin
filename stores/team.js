export const useTeam = defineStore("team", {
  state: () => ({
    teams: reactive([]),
    pagination: reactive({
      totalPage: 1,
      totalItems: 0,
      itemsPerPage: 10,
      currentPage: 1,
    }),
    headers: reactive([
      {
        title: "Image",
        align: "start",
        sortable: false,
        key: "memberImage",
        width: 0,
      },
      {
        title: "Name/Info",
        align: "start",
        sortable: false,
        key: "name",
      },
      {
        title: "Actions",
        width: 200,
        align: "center",
        sortable: false,
        key: "actions",
      },
    ]),
  }),
  actions: {
    async create(formData) {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar();
      const token = localStorage.getItem("admin_auth_token");
      const { data, error } = await useFetch(
        runtimeConfig.public.api_url + "/team/create",
        {
          key: String(Math.random()),
          method: "POST",
          body: formData,
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(error.value);
      if (error.value)
        return snackbar.showSnackbar(
          error.value.data?.error || error.value.message,
          "error"
        );

      if (data.value.success) {
        snackbar.showSnackbar("Team added successfully", "success");
        navigateTo("/admin/team/" + data.value.id);
      }
      return data.value;
    },
    async getAllTeams(page, itemsPerPage) {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar();
      const { data, error } = await useFetch(
        runtimeConfig.public.api_url + "/team",
        {
          params: {
            page,
            per_page: itemsPerPage,
          },
        }
      );
      if (error.value)
        return snackbar.showSnackbar(
          error.value.data?.error || error.value.message,
          "error"
        );
      console.log(data.value.teams);
      this.teams = data.value.teams;
      this.pagination = data.value.pagination;
      return data.value;
    },
    async update(formData, id) {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar();
      const token = localStorage.getItem("admin_auth_token");
      const { data, error } = await useFetch(
        runtimeConfig.public.api_url + "/team/" + id,
        {
          key: String(Math.random()),
          method: "PATCH",
          body: formData,
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (error.value)
        return snackbar.showSnackbar(
          error.value.data?.error || error.value.message,
          "error"
        );
      snackbar.showSnackbar(data.value.message, "success");
      return data.value;
    },
    async getTeam(id) {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar();
      const { data, error } = await useFetch(
        runtimeConfig.public.api_url + "/team/" + id
      );
      if (error.value)
        return snackbar.showSnackbar(
          error.value.data?.error || error.value.message,
          "error"
        );
      return data.value;
    },
    async remove(id) {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar();
      const token = localStorage.getItem("admin_auth_token");
      const { data, error } = await useFetch(
        runtimeConfig.public.api_url + "/team/" + id,
        {
          key: String(Math.random()),
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (error.value)
        return snackbar.showSnackbar(
          error.value.data?.error || error.value.message,
          "error"
        );
      console.log(data);
      snackbar.showSnackbar(data.value.message, "success");
      this.getAllTeams(1, 10);
    },
    async removeBulk(ids) {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar();
      const token = localStorage.getItem("admin_auth_token");

      const { data, error } = await useFetch(
        runtimeConfig.public.api_url + "/team/delete-bulk",
        {
          method: "DELETE",
          body: { ids },
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (error.value)
        return snackbar.showSnackbar(
          error.value.data?.error || error.value.message,
          "error"
        );

      snackbar.showSnackbar(data.value.message, "success");
      this.getAllTeams(1, 10);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTeam, import.meta.hot));
}
