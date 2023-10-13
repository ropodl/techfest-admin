export default defineNuxtRouteMiddleware((to) => {
  if (process.client) {
    const token = localStorage.getItem("user_auth_token");

    if (!token && to.fullPath.includes("/admin")) {
      return navigateTo("/", { external: true });
    }

    if (token && to.fullPath === "/") {
      return navigateTo("/admin/", { replace: true });
    }
  }
});
