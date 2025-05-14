import classNames from "classnames";

export default function Error({ msg, className }) {
  return (
    <span className={classNames("text-start invalid-feedback mt-8", className)}>
      {msg}
    </span>
  );
}
