export const useUser = defineStore("user", {
  state: () => ({
    data: reactive({}),
  }),
  actions: {
    async create(formData) {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar();
      const { data, error } = await useFetch(
        runtimeConfig.public.api_url + "/frontend/user/find-or-create",
        {
          key: String(Math.random()),
          method: "POST",
          body: formData,
          // headers: {
          //   authorization: `Bearer ${token}`,
          // },
        }
      );
      if (error.value) {
        console.log(error.value);
        return snackbar.showSnackbar(
          "Some error occured, please try again",
          "error"
        );
      }

      // if (data.value.token) {
      // snackbar.showSnackbar("Blog added Successfully", "success");
      // navigateTo("/admin/blog/" + data.value.blog.slug);
      // }
      console.log(data);
      this.data = data.value.user;
      if (data.value.token) {
        localStorage.setItem("user_token", data.value.token);
      }
      return data.value;
    },
    async checkAuth(token) {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar();

      const { data, error } = await useFetch(
        runtimeConfig.public.api_url + "/frontend/user/is-user",
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
          return this.logout();
        }
        return snackbar.showSnackbar(
          error.value?.error || error.value.message,
          "error"
        );
      }
      this.data = data.value?.user;
    },
    logout() {
      localStorage.removeItem("user_token");
      this.data = {};
      navigateTo("/", { replace: true });
    },
  },
  persist: true,
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUser, import.meta.hot));
}
