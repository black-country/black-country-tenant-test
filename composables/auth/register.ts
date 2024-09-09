import { useUser } from "@/composables/auth/user";
import { auth_api } from "@/api_factory/modules/auth";
import { useRouter, useNuxtApp } from "#imports";

const credential = {
  fullName: ref(""),
  email: ref(""),
  password: ref(""),
  confirmPassword: ref(""),
  agreement: ref(false)
};

export const use_auth_register = () => {
  const loading = ref(false);
  const router = useRouter();

  const register = async () => {
    loading.value = true;
    const nameParts = credential.fullName.value.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

    try {
      const res = await auth_api.$_register({
        firstName: firstName,
        lastName: lastName || firstName,
        email: credential.email.value,
        password: credential.password.value,
      }) as any;

      loading.value = false;

      if (res.type !== "ERROR") {
        useUser().createUser(res.data);
        router.push(`/verify-email?email=${credential.email.value}&referrer=signup`);
      } else {
        useNuxtApp().$toast.error(res.data.error, {
          autoClose: 5000,
          dangerouslyHTMLString: true,
        });
      }
    } catch (error) {
      loading.value = false;
      useNuxtApp().$toast.error("Registration failed. Please try again.", {
        autoClose: 5000,
      });
    }
  };

  // Computed properties for validation
const passwordMismatch = computed(() => {
  return credential.password.value !== credential.confirmPassword.value;
});

// Disable the button if fields are empty, passwords do not match, or agreement is not checked
const isFormDisabled = computed(() => {
  return (
    loading.value ||
    !credential.agreement.value ||
    !credential.fullName.value ||
    !credential.email.value ||
    !credential.password.value ||
    !credential.confirmPassword.value ||
    passwordMismatch.value
  );
});


  return { credential, register, loading, isFormDisabled, passwordMismatch };
};
