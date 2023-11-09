export default defineNuxtRouteMiddleware((to, from) => {
  const { session } = useAuth();
  const { data } = useUser();
  if (process.client) {
    const token = localStorage.getItem("user_token");
    console.log(token);
    if (token !== null && to.fullPath === "/login") return navigateTo("/user");
    if (token == null && to.fullPath.includes("/user"))
      return navigateTo("/login");
    // if (token !== null) {
    //   console.log("has token");
    //   if (!!data.id) {
    //     console.log("has data");
    //     if (to.fullPath === "/login") {
    //       return navigateTo("/user", { replace: true });
    //     }
    //   }
    // } else {
    //   return navigateTo("/login");
    //   if (!!data.id) {
    //     console.log("no data");
    //     console.log("a", data?.id);
    //   }
    // }
  }
});
