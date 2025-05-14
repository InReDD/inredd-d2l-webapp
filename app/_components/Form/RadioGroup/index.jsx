import "./style.scss";
import classNames from "classnames";
import { Error } from "@/components/Form";
import React from "react";

export default function RadioGroup({
  id,
  className,
  children,
  required,
  inline,
}) {
  if (!children) return <></>;

  const elements = Array.isArray(children) ? children : [children];
  const isRequired = !elements.some((x) => x.props.checked);

  return (
    <div id={id} className={classNames(className)}>
      {elements?.map((child, key) =>
        React.cloneElement(child, {
          ...child.props,
          key,
          inline,
          multiple: true,
        }),
      )}
      <input
        className="form-check-input d-none"
        type="text"
        required={required ? isRequired : false}
      />
      <Error msg={"Preencha corretamente o campo"} />
    </div>
  );
}
