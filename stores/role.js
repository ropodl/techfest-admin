export const useRole = defineStore("role", {
  state: () => ({
    roles: reactive([]),
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
      {
        title: "Level",
        align: "start",
        sortable: false,
        key: "level",
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
      console.log(formData);
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar();
      const token = localStorage.getItem("admin_auth_token");
      const { data, error } = await useFetch(
        runtimeConfig.public.api_url + "/role/create",
        {
          method: "POST",
          body: formData,
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (error.value) {
        snackbar.showSnackbar(
          error.value.data?.error[0].msg || error.value.message,
          "error"
        );
        return { success: error.value ? false : true };
      }
      if (data.value.success) {
        snackbar.showSnackbar(data.value.message, "success");
      }
      return { success: data.value.success ? true : false };
    },
    async getAllRoles(page, itemsPerPage) {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar();
      const { data, error } = await useFetch(
        runtimeConfig.public.api_url + "/role",
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
      console.log(data.value);
      this.roles = data.value.roles;
      this.pagination = data.value.pagination;
      return data.value;
    },
    async update(id, formData) {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar();
      const token = localStorage.getItem("admin_auth_token");
      const { data, error } = await useFetch(
        runtimeConfig.public.api_url + "/role/" + id,
        {
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
      this.getAllRoles(1, -1);
      return data.value;
    },
    async getRole(id) {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar();
      const { data, error } = await useFetch(
        runtimeConfig.public.api_url + "/role/" + id
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
        runtimeConfig.public.api_url + "/role/" + id,
        {
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
      this.getAllRoles(1, 10);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRole, import.meta.hot));
}
