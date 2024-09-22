export default defineNuxtRouteMiddleware((to, from) => {
  // if (import.meta.server) return;
  // const route = useRequestURL();

  // console.log(route.pathname);
  // if (route.pathname) return;

  const { username } = useDataState();
  // console.log("Name", username.value);
  // if (username.value == "") navigateTo("/");

  if (to.path !== "/" && to.path != "/test" && username.value == "") {
    return navigateTo("/");
  }
});
