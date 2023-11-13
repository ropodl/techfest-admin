export const useContactRequest = defineStore("contactRequest", {
  state: () => ({
    contactRequests: reactive({}),
    headers: reactive([
      {
        title: "Name",
        align: "start",
        key: "name",
      },
      {
        title: "Phone Number",
        align: "start",
        sortable: false,
        key: "phone",
      },
      {
        title: "Email Address",
        align: "start",
        sortable: false,
        key: "email",
      },
      {
        title: "Message",
        align: "start",
        sortable: false,
        key: "message",
      },
      {
        title: "Actions",
        align: "start",
        sortable: false,
        width: 200,
        key: "actions",
      },
    ]),
  }),
  actions: {
    async create(formData, contactForm) {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar();
      const token = localStorage.getItem("admin_auth_token");
      const { data, error } = await useFetch(
        runtimeConfig.public.api_url + "/contact-request/create",
        {
          method: "post",
          body: formData,
          //   headers: {
          //     authorization: `Bearer ${token}`
          //   }
        }
      );
      if (error.value)
        return snackbar.showSnackbar(
          error.value.data?.error[0].msg || error.value.message,
          "error"
        );
      snackbar.showSnackbar(
        "Form Submitted, We'll reach back to you asap.",
        "success"
      );
      this.terms = data.value;
      contactForm.value.reset();
    },
    async getAllContactRequests(page, itemsPerPage, sortBy) {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar();
      console.log(sortBy);
      const { data, error } = await useFetch(
        runtimeConfig.public.api_url + "/contact-request",
        {
          params: {
            page,
            per_page: itemsPerPage,
            // sort: sortBy[0]?.key,
            // desc: sortBy[0]?.order === 'desc'
          },
        }
      );
      if (error.value)
        return snackbar.showSnackbar(
          error.value.data?.error || error.value.message,
          "error"
        );
      this.contactRequests = data.value;
      console.log(data.value);
      return data.value;
    },
    async remove(id) {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar();
      const token = localStorage.getItem("admin_auth_token");
      const { data, error } = await useFetch(
        runtimeConfig.public.api_url + "/contact-request/" + id,
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
      this.getAllContactRequests(1, 10);
    },
    async removeBulk(ids) {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar();
      const token = localStorage.getItem("admin_auth_token");

      const { data, error } = await useFetch(
        runtimeConfig.public.api_url + "/contact-request/delete-bulk",
        {
          method: "delete",
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
      this.getAllContactRequests(1, 10);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useContactRequest, import.meta.hot));
}
