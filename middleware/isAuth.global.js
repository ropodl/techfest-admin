export default defineNuxtRouteMiddleware((to) => {
  if (process.client) {
    const token = localStorage.getItem("user_auth_token");

    if (!token && to.fullPath.includes("/admin")) {
      return navigateTo("/", { external: true, replace: true });
    }
    // Enable is only admin dashboard is used
    if (token && to.fullPath === "/sign-in") {
      return navigateTo("/admin/", { replace: true });
    }
  }
});
