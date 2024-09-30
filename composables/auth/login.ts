import { useUser } from "@/composables/auth/user";
import { auth_api } from "@/api_factory/modules/auth";

const credential = {
  email: ref(""),
  password: ref(""),
};

export const use_auth_login = () => {
  const router = useRouter();
  const loading = ref(false);

  const isFormDisabled = computed(() => {
    return (
      loading.value || !credential.email.value || !credential.password.value
    );
  });

  const login = async () => {
    loading.value = true;
    const res = (await auth_api.$_login({
      email: credential.email.value,
      password: credential.password.value,
      app: 'tenant-app'
    })) as any;
    loading.value = false;
    if (res.type !== "ERROR") {
      console.log(res, "response gere");
      useUser().createUser(res.data);
      router.push("/dashboard");
      // window.location.href = '/dashboard'
    }
  };
  return { credential, login, loading, isFormDisabled };
};
