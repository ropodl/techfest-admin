export const useEvent = defineStore("event", {
  state: () => ({
    events: reactive([]),
    pagination: reactive({
      totalPage: 1,
      totalItems: 0,
      itemsPerPage: 10,
      currentPage: 1,
    }),
    headers: reactive([
      {
        title: "Event Image",
        key: "image",
        align: "start",
        sortable: false,
        width: 0,
      },
      {
        title: "Title",
        align: "start",
        sortable: false,
        key: "title",
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
    async create(formData) {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar();
      const token = localStorage.getItem("admin_auth_token");
      const { data, error } = await useFetch(
        runtimeConfig.public.api_url + "/event/create",
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
        return snackbar.showSnackbar(
          error.value.data?.error[0].msg || error.value.message,
          "error"
        );
      }
      if (data.value.success) {
        snackbar.showSnackbar("Event added Successfully", "success");
        navigateTo("/admin/event/" + data.value.id);
      }
      return data.value;
    },
    async getAllEvents(page, itemsPerPage) {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar();
      const { data, error } = await useFetch(
        runtimeConfig.public.api_url + "/event",
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
      this.events = data.value.events;
      this.pagination = data.value.pagination;
      return data.value;
    },
    async getEvent(id) {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar();
      const { data, error } = await useFetch(
        runtimeConfig.public.api_url + "/event/" + id
      );
      if (error.value)
        return snackbar.showSnackbar(
          error.value.data?.error || error.value.message,
          "error"
        );
      return data.value;
    },
    async updateEvent(formData, id) {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar();
      const token = localStorage.getItem("admin_auth_token");
      const { data, error } = await useFetch(
        runtimeConfig.public.api_url + "/event/" + id,
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
    async remove(id) {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar();
      const token = localStorage.getItem("admin_auth_token");
      const { data, error } = await useFetch(
        runtimeConfig.public.api_url + "/event/" + id,
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
      snackbar.showSnackbar(data.value.message, "success");
      this.getAllEvents(1, 10);
    },
    async removeBulk(ids) {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar();
      const token = localStorage.getItem("admin_auth_token");

      const { data, error } = await useFetch(
        runtimeConfig.public.api_url + "/event/delete-bulk",
        {
          key: String(Math.random()),
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
      this.getAllEvents(1, 10);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEvent, import.meta.hot));
}
