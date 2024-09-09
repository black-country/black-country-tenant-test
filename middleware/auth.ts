import { useUser } from "@/composables/auth/user";
const { isEmailVerified, isLoggedIn } = useUser();
const router = useRouter()
export default defineNuxtRouteMiddleware((to, from) => {
    if(isLoggedIn.value && !isEmailVerified.value){
        router.push("/login");
    }

    if(isLoggedIn.value && isEmailVerified.value){
        router.push("/dashboard");
    }
});
