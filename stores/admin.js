export const useAdmin = defineStore("admin", {
  state: () => ({
    admin: reactive({}),
    admins: reactive([]),
    pagination: reactive({
      totalPage: 1,
      totalItems: 0,
      itemsPerPage: 10,
      currentPage: 1,
    }),
    headers: reactive([
      {
        title: "Name/Email",
        key: "name",
        align: "start",
        sortable: false,
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
    async login({ email, password }) {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar();

      const { data, error } = await useFetch(
        runtimeConfig.public.api_url + "/login",
        {
          method: "POST",
          body: { email, password },
        }
      );
      if (error.value)
        return snackbar.showSnackbar(
          error.value.data?.error || error.value.message,
          "error"
        );

      snackbar.showSnackbar("Log In Successfull", "success");
      localStorage.setItem("admin_auth_token", data.value.token);
      this.admin = data.value.user;
      navigateTo("/admin/", { replace: true });
    },
    async checkAuth(token) {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar();

      const { data, error } = await useFetch(
        runtimeConfig.public.api_url + "/login/is-auth",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (error.value) {
        if (error.value.data.message === "Token Expired") {
          snackbar.showSnackbar(
            error.value.data.message + " ,please login again",
            "error"
          );
          localStorage.removeItem("admin_auth_token");
          this.admin = [];
          navigateTo("/", { replace: true });
          return this.logout();
        }
        return snackbar.showSnackbar(
          error.value?.error || error.value.message,
          "error"
        );
      }
      this.admin = data.value?.user;
    },
    logout() {
      localStorage.removeItem("admin_auth_token");
      this.admin = [];
      navigateTo("/", { replace: true });
    },
    async getAllAdmins(page, itemsPerPage) {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar();
      const token = localStorage.getItem("admin_auth_token");
      const { data, error } = await useFetch(
        runtimeConfig.public.api_url + "/login/",
        {
          params: {
            page,
            per_page: itemsPerPage,
          },
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
      this.admins = data.value.admins;
      this.pagination = data.value.pagination;
      return data.value;
    },
    async remove(id) {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar();
      const token = localStorage.getItem("admin_auth_token");
      const { data, error } = await useFetch(
        runtimeConfig.public.api_url + "/login/" + id,
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
      this.getAllAdmins(1, 10);
    },
  },
  persist: true,
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAdmin, import.meta.hot));
}
