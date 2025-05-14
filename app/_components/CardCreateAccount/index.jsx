"use client";

import React, { useState } from "react";
import Input from "@/app/_components/Form/Input";
import { Button, ButtonLink } from "@/app/_components";
import { Paragraph2 } from "@/app/_components/Typography";
import CheckBox from "@/app/_components/Form/CheckBox";
import LiveSearch from "@/app/_components/Form/LiveSearch";
import Link from "next/link";
import "./style.scss";
import { useRouter } from "next/navigation";
import { useUtilContext } from "@/app/context/UtilContext";
import { API } from "@/helpers/api";
import { Form, InputPassword } from "../Form";
import routes from "@/helpers/routes";

const INITIAL_STATE = {
  password: "",
  confirmPassword: "",
};

export default function CardCreateAccount() {
  const { showErrorAlert, showAlert, setLoading } = useUtilContext();
  const router = useRouter();

  const [formData, setFormData] = useState(INITIAL_STATE);

  const updateFormData = (value) => {
    setFormData((state) => ({ ...state, ...value }));
  };

  const onSubmit = async (form) => {
    const formData = new FormData(form.target);

    try {
      setLoading({ show: true });
      const data = {
        name: formData.get("name"),
        lastName: formData.get("lastName"),
        acceptTerms: formData.get("acceptTerms"),
        email: formData.get("email"),
        institution: formData.get("institution"),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      };

      // await API.post({ path: "/user", data });

      showAlert({
        title: "Create account",
        message:
          "You have created your account with success! Sign in and request access to our solutions",
        confirmButton: "Sign in",
        hideCloseButton: true,
        onClose: () => router.push(routes.LOGIN),
        onCancel: () => router.push(routes.LOGIN),
        onExitButton: () => router.push(routes.LOGIN),
      });
    } catch (err) {
      console.log(err);
      showErrorAlert({
        title: "Create account",
        message: "Invalid form data. Try again later",
      });
    } finally {
      setLoading({ show: false });
    }
  };

  return (
    <div className="card cardcreateaccount">
      <div className="card-body">
        <Form onSubmit={onSubmit}>
          <div className="d-flex flex-column flex-md-row justify-content-between gap-md-3">
            <div className="w-100 w-md-50 mb-4 mt-24">
              <Input
                label="First name"
                name="name"
                placeholder="Placeholder"
                type="email"
                required
              />
            </div>
            <div className="w-100 w-md-50 mb-4 mt-24">
              <Input
                label="Last name"
                name="lastName"
                placeholder="Placeholder"
                required
              />
            </div>
          </div>
          <div className="Email mb-4 mt-32 ">
            <Input
              label="E-mail"
              type="email"
              name="email"
              placeholder="Placeholder"
              required
            />
          </div>
          <div className="col-12 mt-40 mb-12">
            <LiveSearch
              label="Search for your Institution"
              placeholder="Select your institution"
              name={"institution"}
              isValueDefault={false}
            >
              <option value="usp">USP</option>
            </LiveSearch>
          </div>
          <div className="d-flex flex-column flex-md-row justify-content-between gap-md-3">
            <div className="w-100 w-md-50 mb-4 mt-24">
              <InputPassword
                label="Password"
                name="password"
                placeholder="***********"
                value={formData.password}
                onChange={({ target }) =>
                  updateFormData({ password: target.value })
                }
                required
              />
            </div>
            <div className="w-100 w-md-50 mb-4 mt-24">
              <InputPassword
                label="Confirm password"
                name="confirmPassword"
                placeholder="***********"
                pattern={formData.password}
                value={formData.confirmPassword}
                onChange={({ target }) =>
                  updateFormData({ confirmPassword: target.value })
                }
                required
              />
            </div>
          </div>
          <div className="col-12 mt-32">
            <CheckBox name="acceptTerms" required>
              <Paragraph2>
                Lorem ipsum dolor sit amet, consectetur adipiscing{" "}
                <Link href={routes.ACCEPT_TERMS} target="_blank">
                  Accept Terms
                </Link>{" "}
                and{" "}
                <Link href={routes.PRIVACY_POLICY} target="_blank">
                  Privacy Policy
                </Link>
              </Paragraph2>
            </CheckBox>
          </div>
          <div className="mt-52 mb-16 d-flex justify-content-center justify-content-lg-start">
            <Link href={routes.LOGIN}>Already have an account?</Link>
          </div>
          <div className="mb-20 d-flex justify-content-center justify-content-md-end">
            <Button type="submit" className="btn-orange" size={"medium"}>
              Sign in
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
