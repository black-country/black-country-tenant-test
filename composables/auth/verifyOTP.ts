import { auth_api } from "@/api_factory/modules/auth";

export const use_auth_verify_otp = () => {
  const Router = useRouter();
  const route = useRoute(); // Get access to the current route to check where the user came from
  const credential = {
    email: ref(""),
    otpCode: ref(""),
  };

  const loading = ref(false);
  const errorMessage = ref(""); // Ref to store error messages

  const verify_OTP = async () => {
    loading.value = true;
    errorMessage.value = ""; // Reset error message before the call

    try {
      const otp = String(credential?.otpCode?.value?.join(""));
      const res = (await auth_api.$_confirm_otp({
        email: credential.email.value,
        otpCode: otp,
      })) as any;

      loading.value = false;

      // Check if the user is coming from the signup page (using query param or route state)
      const referrer = route.query.referrer || route.meta.referrer; // Adjust depending on how the referrer is passed
      console.log(referrer, "here");

      if (res.type !== "ERROR") {
        useNuxtApp().$toast.success(res?.data?.message, {
          autoClose: 5000,
          dangerouslyHTMLString: true,
        });

        if (referrer === "signup") {
          // If the user came from the signup page, redirect to the login page
          Router.push("/login");
        } else {
          // Otherwise, redirect to the reset password page
          Router.push(`/reset-password?otpId=${res?.data?.otpId}`);
        }

        return { success: true, data: res?.data };
      } else {
        errorMessage.value = res?.data?.error || "An error occurred.";
        useNuxtApp().$toast.error(errorMessage.value, {
          autoClose: 5000,
          dangerouslyHTMLString: true,
        });
        return { success: false, error: errorMessage.value };
      }
    } catch (error) {
      loading.value = false;
      errorMessage.value = error?.message || "An unexpected error occurred.";
      return { success: false, error: errorMessage.value };
    }
  };

  const setPayload = (data: any) => {
    credential.email.value = data.email;
    credential.otpCode.value = data.otpCode;
  };

  return { credential, verify_OTP, setPayload, loading, errorMessage };
};
