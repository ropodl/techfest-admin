export default defineNuxtRouteMiddleware((to) => {
  if (process.client) {
    const token = localStorage.getItem("admin_auth_token");

    if (!token || token === "") {
      if (to.fullPath.includes("/admin")) {
        return navigateTo("/", { external: true, replace: true });
      }
    } else if (token && to.fullPath === "/sign-in") {
      return navigateTo("/admin/", { replace: true });
    }
  }
});