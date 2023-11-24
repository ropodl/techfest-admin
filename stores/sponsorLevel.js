export const useLevel = defineStore("sponsorLevel", {
  state: () => ({
    levels: reactive([]),
    pagination: reactive({
      totalPage: 1,
      totalItems: 0,
      itemsPerPage: 10,
      currentPage: 1,
    }),
    headers: reactive([
      {
        title: "Title",
        key: "title",
        align: "start",
        sortable: false,
      },
      {
        title: "Priority",
        key: "priority",
        align: "center",
        sortable: false,
      },
      {
        title: "Actions",
        key: "actions",
        width: 200,
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
        runtimeConfig.public.api_url + "/sponsor-level/create",
        {
          key: String(Math.random()),
          method: "POST",
          body: formData,
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (error.value) {
        console.log(error.value.data.error);
        return snackbar.showSnackbar(
          error.value.data?.error[0].msg || error.value.data.error,
          "error"
        );
      }
      if (data.value.success) {
        snackbar.showSnackbar("Sponsor Level added Successfully", "success");
        this.getAllLevels(1, -1);
        // navigateTo("/admin/sponsor/" + data.value.blog.slug);
      }
      return data.value;
    },
    async getAllLevels(page, itemsPerPage) {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar();
      const { data, error } = await useFetch(
        runtimeConfig.public.api_url + "/sponsor-level",
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

      this.levels = data.value.levels;
      this.pagination = data.value.pagination;
      return data.value;
    },
    async remove(id) {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar();
      const token = localStorage.getItem("admin_auth_token");
      const { data, error } = await useFetch(
        runtimeConfig.public.api_url + "/sponsor-level/" + id,
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
      this.getAllLevels(1, 10);
    },
    async removeBulk(ids) {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar();
      const token = localStorage.getItem("admin_auth_token");

      const { data, error } = await useFetch(
        runtimeConfig.public.api_url + "/sponsor-level/delete-bulk",
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
      this.getAllLevels(1, 10);
    },
    async getSponsor(slug) {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar();
      const { data, error } = await useFetch(
        runtimeConfig.public.api_url + "/sponsor-level/" + slug
      );
      if (error.value)
        return snackbar.showSnackbar(
          error.value.data?.error || error.value.message,
          "error"
        );
      return data.value;
    },
    async updateLevel(id, formData) {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar();
      const token = localStorage.getItem("admin_auth_token");
      const { data, error } = await useFetch(
        runtimeConfig.public.api_url + "/sponsor-level/" + id,
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
      this.getAllLevels(1, -1);
      return data.value;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLevel, import.meta.hot));
}
