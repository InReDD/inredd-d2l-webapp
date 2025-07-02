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
  options = [], 
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
        {/* Map over the options array to render <option> elements */}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
        {/* Still renders children for flexibility */}
        {children}
      </select>
      {!disableValidation && (
        <Error className={classNameError} msg={errorMessage} />
      )}
    </div>
  );
}