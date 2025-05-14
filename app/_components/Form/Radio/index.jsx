import "./style.scss";

import { useId } from "react";
import { Error, Label } from "@/components/Form";
import classNames from "classnames";

export default function Radio({
  id,
  name,
  checked,
  value,
  label,
  onChange,
  disabled,
  multiple,
  required,
  inline,
  className,
  errorMessage = "Preencha corretamente o campo",
}) {
  const _inputId = useId();
  const inputId = id || _inputId;

  return (
    <div
      className={classNames("form-check", "radio", className, {
        "form-check-inline": inline,
      })}
    >
      <input
        id={inputId}
        name={name}
        className={classNames("form-check-input")}
        type="radio"
        checked={checked}
        onChange={onChange}
        value={value}
        disabled={disabled}
        required={required}
      />
      {label && <Label htmlFor={inputId}>{label}</Label>}
      {!multiple && <Error msg={errorMessage} />}
    </div>
  );
}
