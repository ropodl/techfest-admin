export const useSponsorLevel = defineStore("sponsor", {
  state: () => ({
    levels: reactive({}),
  }),
  actions: {
    async create(formData) {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar();
      const token = localStorage.getItem("admin_auth_token");
      const { data, error } = await useFetch(
        runtimeConfig.public.api_url + "/speaker/create",
        {
          key: String(Math.random()),
          method: "POST",
          body: formData,
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (error.value)
        return snackbar.showSnackbar(
          error.value.data?.error[0].msg || error.value.message,
          "error"
        );
      snackbar.showSnackbar("Speaker added successfully", "success");
      navigateTo("/admin/speaker/" + data.value.speaker.id);
    },
    async getAllSpeakers(page, itemsPerPage) {
      const runtimeConfig = useRuntimeConfig();
      const { data, error } = await useFetch(
        runtimeConfig.public.api_url +
          `/speaker?page=${page}&per_page=${itemsPerPage}`
      );
      if (error.value)
        return snackbar.showSnackbar(
          error.value.data?.error || error.value.message,
          "error"
        );
      this.speakers = data.value;
      return data.value;
    },
    async getSpeaker(id) {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar();
      const { data, error } = await useFetch(
        runtimeConfig.public.api_url + "/speaker/" + id
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
        runtimeConfig.public.api_url + "/speaker/" + id,
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
      this.getAllSpeakers(1, 10);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSpeaker, import.meta.hot));
}
