"use client";

import React, { useEffect } from "react";
import Input from "@/app/_components/Form/Input";
import { Button } from "@/app/_components";
import "./style.scss";
import { Form, InputPassword } from "../Form";
import Link from "next/link";
import routes from "@/helpers/routes";
import { useUtilContext } from "@/app/context/UtilContext";
import { API } from "@/helpers/api";
import { useRouter } from "next/navigation";

export default function CardLogin() {
  const { showErrorAlert, showAlert, setLoading } = useUtilContext();
  const router = useRouter();

  const onSubmit = async (form) => {
    const formData = new FormData(form.target);

    try {
      setLoading({ show: true });
      const data = {
        email: formData.get("email"),
        password: formData.get("password"),
      };

      // await API.post({ path: "/auth", data });

      showAlert({
        title: "Log in",
        message: "You have logged with success! Go to your solutions",
        confirmButton: "Go to My solutions",
        hideCloseButton: true,
        onClose: () => router.push(routes.MY_SOLUTIONS),
        onCancel: () => router.push(routes.MY_SOLUTIONS),
        onExitButton: () => router.push(routes.MY_SOLUTIONS),
      });
    } catch (err) {
      console.log(err);
      showErrorAlert({
        title: "Log in",
        message: "Invalid Login. Verify your e-mail or password",
      });
    } finally {
      setLoading({ show: false });
    }
  };

  return (
    <div className="card cardlogin">
      <div className="card-body">
        <Form onSubmit={onSubmit}>
          <div className="mb-4 mt-24">
            <Input
              label="E-mail"
              placeholder="Placeholder"
              type="email"
              name="email"
              required
            />
          </div>
          <div className="mb-12 mt-32">
            <InputPassword
              label="Password"
              name="password"
              placeholder="**********"
              required
            />
          </div>
          <Link href={routes.CREATE_ACCOUNT}>Don't you have an account?</Link>
          <div className="mt-52 d-flex justify-content-center justify-content-md-end">
            <Button type="submit" className="btn-orange" size={"medium"}>
              Sign in
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
