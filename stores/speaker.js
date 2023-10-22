export const useSpeaker = defineStore("speaker", {
  state: () => ({
    speakers: reactive({})
  }),
  actions: {
    async create(formData) {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar();
      const token = localStorage.getItem("admin_auth_token");
      const { error } = await useFetch(runtimeConfig.public.api_url + "/speaker/create", {
        method: "post",
        body: formData,
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      if (error.value) return snackbar.showSnackbar(error.value.data?.error[0].msg || error.value.message, "error");
      snackbar.showSnackbar("Speaker added successfully", "success");
      navigateTo("/admin/speaker");
    },
    async getAllSpeakers(page, itemsPerPage) {
      const runtimeConfig = useRuntimeConfig()
      const { data, error } = await useFetch(runtimeConfig.public.api_url + `/speaker?page=${page}&per_page=${itemsPerPage}`)
      if (error.value)
        return snackbar.showSnackbar(error.value.data?.error || error.value.message, "error");
      this.speakers = data.value;
      console.log(data.value)
      return data.value;
    }
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSpeaker, import.meta.hot));
}