export const useSpeaker = defineStore("speaker", {
  state: () => ({
    speakers: reactive([]),
    pagination: reactive({
      totalPage: 1,
      totalItems: 0,
      itemsPerPage: 10,
      currentPage: 1,
    }),
    headers: reactive([
      {
        title: "Image",
        key: "image",
        align: "start",
        sortable: false,
      },
      {
        title: "Info",
        key: "info",
        align: "start",
        sortable: false,
      },{
        title: "Social Links",
        key: "social",
        align: "start",
        sortable: false,
      },
      {
        title: "Actions",
        key: "actions",
        align: "center",
        sortable: false,
      },
    ]),
  }),
  actions: {
    async create(formData) {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar();
      const token = localStorage.getItem("admin_auth_token");
      const { data, error } = await useFetch(
        runtimeConfig.public.api_url + "/speaker/create",
        {
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
      navigateTo("/admin/speaker/" + data.value.id);
    },
    async getAllSpeakers(page, itemsPerPage) {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar();
      const { data, error } = await useFetch(
        runtimeConfig.public.api_url +
          `/speaker?page=${page}&per_page=${itemsPerPage}`
      );
      if (error.value)
        return snackbar.showSnackbar(
          error.value.data?.error || error.value.message,
          "error"
        );
      console.log(data.value);
      this.speakers = data.value.speakers;
      this.pagination = data.value.pagination;
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
    async updateSpeaker(formData, id) {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar();
      const token = localStorage.getItem("admin_auth_token");
      const { data, error } = await useFetch(
        runtimeConfig.public.api_url + "/speaker/" + id,
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
      return data.value;
    },
    async remove(id) {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar();
      const token = localStorage.getItem("admin_auth_token");
      const { data, error } = await useFetch(
        runtimeConfig.public.api_url + "/speaker/" + id,
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
      navigateTo("/admin/speaker")
      this.getAllSpeakers(1, 10);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSpeaker, import.meta.hot));
}
