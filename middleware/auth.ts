import { useUser } from "@/composables/auth/user";
const { isLoggedIn } = useUser();
const router = useRouter();

export default defineNuxtRouteMiddleware((to, from) => {
  // If the user is not logged in and trying to access a route other than login, redirect to login
  if (!isLoggedIn.value && to.path !== "/login") {
    return router.push("/login");
  }

  // If the user is logged in and not already on the dashboard, redirect to dashboard
  if (isLoggedIn.value && to.path !== "/dashboard") {
    return router.push("/dashboard");
  }
});
