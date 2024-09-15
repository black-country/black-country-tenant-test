import { useUser } from "@/composables/auth/user";

export default defineNuxtRouteMiddleware((to, from) => {
  const { isEmailVerified, isLoggedIn } = useUser();

  // Ensure these are reactive before accessing them
  if (isLoggedIn.value) {
    if (!isEmailVerified.value) {
      return navigateTo("/login");
    } else {
      return navigateTo("/dashboard");
    }
  }
});
