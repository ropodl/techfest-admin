export const useTerms = defineStore("terms", {
  state: () => ({
    terms: reactive({})
  }),
  actions: {
    async create(formData) {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar();
      const token = localStorage.getItem("user_auth_token");
      const { data, error } = await useFetch(runtimeConfig.public.api_url + "/terms/create", {
        method: "post",
        body: formData,
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      if (error.value) return snackbar.showSnackbar(error.value.data?.error[0].msg || error.value.message, "error");
      snackbar.showSnackbar("Speaker added successfully", "success");
      this.terms = data.value;
    },
    async getTerms() {
      const runtimeConfig = useRuntimeConfig()
      const { data, error } = await useFetch(runtimeConfig.public.api_url + `/terms`)
      if (error.value)
        return this.terms = { message: "Terms and Conditions not found", status: 404 };
      this.terms = data.value;
      return data.value;
    },
    async updateTerms(formData) {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar();
      const token = localStorage.getItem("user_auth_token");
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