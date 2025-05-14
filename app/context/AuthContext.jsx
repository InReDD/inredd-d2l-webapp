"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { API } from "@/helpers/api";
import { getUser } from "@/helpers";
import { useRouter } from "next/navigation";
import { useReCaptcha } from "next-recaptcha-v3";

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const firstUpdate = useRef(true);
  const router = useRouter();
  const [user, setUser] = useState(getUser());
  const { executeRecaptcha } = useReCaptcha();

  const login = async (email, password) => {
    const recaptchaToken = await executeRecaptcha("login");

    await API.post({
      path: "/auth",
      data: { email, password, recaptchaToken },
    });
    setUser(getUser());
  };

  const recoveryPassword = async (email) => {
    const recaptchaToken = await executeRecaptcha("recoveryPassword");

    await API.post({
      path: "/users/recovery-password",
      data: { email, recaptchaToken },
    });
  };

  const changePassword = async (password, token, email) => {
    const recaptchaToken = await executeRecaptcha("changePassword");

    await API.put({
      path: "/users/change-password",
      data: { password, token, email, recaptchaToken },
    });
  };

  const checkToken = async (email, token) => {
    await API.post({
      path: "/users/check-token",
      data: { token, email },
    });
  };

  const logoff = async () => {
    await API.get({ path: "/auth/logoff" });

    setUser(getUser());
    router.push("/");
  };

  const getUserData = async () => {
    const userRes = await API.get({
      path: "/auth/status",
    });
    setUser(userRes);
  };

  useEffect(() => {
    const onInit = async () => {
      if (firstUpdate.current) {
        if (user) {
          getUserData();
        }

        firstUpdate.current = false;
      }
    };

    onInit();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const interval = setInterval(async () => {
      const userRes = await API.get({
        path: "/auth/status",
      });
      if (JSON.stringify(userRes) !== JSON.stringify(user)) {
        setUser(userRes);
      }
    }, 300000);

    return () => clearInterval(interval);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        login,
        logoff,
        recoveryPassword,
        changePassword,
        checkToken,
        getUserData,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
