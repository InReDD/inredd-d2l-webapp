"use client";
import "./style.scss";
import { useId } from "react";
import { Error, Label } from "@/components/Form";
import classNames from "classnames";

export default function CheckBox({
  id,
  name,
  checked,
  value,
  onChange,
  multiple,
  required,
  disabled,
  inline,
  className,
  errorMessage = "Preencha corretamente o campo",
  children,
}) {
  const _inputId = useId();
  const inputId = id || _inputId;

  return (
    <div
      className={classNames("form-check", "check", className, {
        "form-check-inline": inline,
      })}
    >
      <input
        id={inputId}
        name={name}
        className={classNames("form-check-input")}
        type="checkbox"
        checked={onChange ? checked || false : undefined}
        onChange={onChange}
        value={value}
        disabled={disabled}
        required={required}
      />
      {children && (
        <Label
          className="d-flex align-items-center"
          htmlFor={inputId}
          text={children}
        />
      )}
      {!multiple && <Error msg={errorMessage} />}
    </div>
  );
}
