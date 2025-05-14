import "./style.scss";
import classNames from "classnames";
import { useId } from "react";
import { Label, Error } from "..";

export default function Select({
  id,
  name,
  label,
  required,
  value,
  onChange,
  placeholder,
  children,
  className,
  classNameError,
  disableValidation,
  errorMessage = "Preencha corretamente",
  isValueDefault = true,
}) {
  const _inputId = useId();
  const inputId = id || _inputId;

  return (
    <div className={classNames("form-item form-item-select")}>
      {label && (
        <Label
          htmlFor={inputId}
          text={label}
        />
      )}
      <select
        id={id}
        name={name}
        className={classNames("form-select", className)}
        value={value}
        onChange={onChange}
        required={required}
      >
        {!!placeholder && (
          <option
            disabled={!isValueDefault}
            value={isValueDefault ? "default" : ""}
          >
            {placeholder}
          </option>
        )}
        {children}
      </select>
      {!disableValidation && (
        <Error className={classNameError} msg={errorMessage} />
      )}
    </div>
  );
}
