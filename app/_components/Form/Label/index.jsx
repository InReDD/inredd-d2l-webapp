import classNames from "classnames";
import "./style.scss";

export default function Label({
  text,
  htmlFor,
  children,
  className,
  required,
}) {
  return (
    <label htmlFor={htmlFor} className={classNames("form-label", className)}>
      <>
        {text || children} {(required && " (optional)") || ""}
      </>
    </label>
  );
}
