"use client";

import classNames from "classnames";
import { useState, useContext, forwardRef } from "react";
import { formSubmit } from "@/helpers";
import { useUtilContext } from "@/app/context/UtilContext";
import { UnsavedChangesContext } from "@/lib/unsavedChangesProvider";
import "./styles.scss";

const Form = forwardRef(function Form(
  { children, className, setIsValid, onSubmit, controlUnsavedChanges = true },
  ref,
) {
  const [, setDirtyForm] = useContext(UnsavedChangesContext);
  const { showErrorAlert, setLoading } = useUtilContext();
  const [wasValidated, setWasValidated] = useState(false);
  const [busy, setBusy] = useState(false);

  const scrollToErrorInput = () => {
    setTimeout(() => {
      const errorInput = document.querySelector(".was-validated :invalid");

      if (errorInput) {
        setTimeout(() => {
          errorInput.scrollIntoView();
          errorInput.focus();
        }, 0);
      }
    }, 200);
  };

  return (
    <form
      noValidate
      ref={ref}
      className={classNames(
        "needs-validation",
        { "was-validated": wasValidated },
        className,
      )}
      onChange={() => {
        if (controlUnsavedChanges) setDirtyForm("");
      }}
      onSubmit={async (e) => {
        e.preventDefault();

        if (setIsValid) setIsValid(false);

        setWasValidated(true);

        if (!e.target.checkValidity()) {
          e.stopPropagation();
          scrollToErrorInput();
          return;
        } else {
          if (setIsValid) setIsValid({});
        }

        if (busy) return;

        setBusy(true);

        if (onSubmit) {
          await formSubmit(
            { showErrorAlert },
            { onSubmit, e, setLoading, setBusy },
          );
        }
      }}
      onReset={(e) => {
        if (setIsValid) setIsValid(true);

        setWasValidated(false);
      }}
      method="POST"
    >
      {children}
    </form>
  );
});

export default Form;
