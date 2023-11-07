export default defineNuxtRouteMiddleware((to) => {
  if (process.client) {
    console.log("this is isUser");
    const token = localStorage.getItem("user_token");

    if (!token || token === "") {
      if (to.fullPath.includes("/user")) {
        console.log("this is user page");
        return navigateTo("/", { external: true, replace: true });
      }
    } else if (token && to.fullPath === "/login") {
      return navigateTo("/user/", { replace: true });
    }
  }
});
