"use client";

import Image from "next/image";
import "./style.scss";
import { useState } from "react";
import { Label, Error } from "..";

export default function InputPassword({
  id,
  name,
  label,
  value,
  onBlur,
  pattern,
  onChange,
  required,
  maxLength,
  minLength,
  placeholder,
  errorMessage = "Preencha o campo corretamente",
}) {
  const [viewPassword, setViewPassword] = useState(false);

  const pathIcon = "/icons/";
  const icon = viewPassword
    ? `${pathIcon}eye.png`
    : `${pathIcon}removed-eye.png`;

  const handleOnBlur = (e) => {
    onBlur && onBlur(e);
  };

  return (
    <>
      {label && <Label htmlFor={id} text={label} />}
      <div className="input-password-container">
        <Image
          className="icon-eye"
          src={icon}
          alt={"Mostrar e esconder a senha"}
          width={24}
          height={24}
          onClick={() => setViewPassword((state) => !state)}
          title="Mostrar e esconder a senha"
        />

        <input
          className="input"
          id={id}
          name={name}
          type={viewPassword ? "text" : "password"}
          placeholder={placeholder}
          required={required}
          pattern={
            pattern ? `${pattern}`.replace(/[#-.]|[[-^]|[?|{}]/g, "\\$&") : null
          }
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          minLength={minLength}
          onBlur={handleOnBlur}
        />
        <Error msg={errorMessage} />
      </div>
    </>
  );
}
