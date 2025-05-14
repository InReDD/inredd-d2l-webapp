import "./style.scss";
import { Input } from "@/components/Form";
import classNames from "classnames";

export default function InputEmail({
  required,
  name,
  onClick,
  value,
  id,
  onChange,
  size,
  type,
  mask,
  label,
  btnMessage = "Enviar",
  placeholder = "Digite seu e-mail aqui...",
}) {
  return (
    <Input
      className="input"
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      size={size}
      value={value}
      onChange={onChange}
      classNameError={"error"}
      label={label}
      mask={mask}
      button={
        <button className="button" onClick={onClick}>
          {btnMessage}
        </button>
      }
    />
  );
}
