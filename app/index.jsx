import UnsavedChangesProvider from "@/lib/unsavedChangesProvider";
import { AuthContextProvider } from "./context/AuthContext";
import { UtilContextProvider } from "./context/UtilContext";
import { ReCaptchaProvider } from "next-recaptcha-v3";

export default function AppProvider({ children }) {
  return (
    <ReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
    >
      <AuthContextProvider>
        <UtilContextProvider>
          <UnsavedChangesProvider>{children}</UnsavedChangesProvider>
        </UtilContextProvider>
      </AuthContextProvider>
    </ReCaptchaProvider>
  );
}
