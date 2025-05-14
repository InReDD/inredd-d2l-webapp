"use client";
import { CopyBlock, dracula } from "react-code-blocks";
import { Props } from "@/app/_components/_doc";

export default function Item({
  name,
  description,
  children,
  code,
  state,
  props,
}) {
  function style() {
    if (code)
      return "w-50 border border-primary p-xxs me-xxs d-flex justify-content-center align-items-center";
    return "w-100 border border-primary p-xxs me-xxs d-flex justify-content-center align-items-center";
  }

  return (
    <div className={"mt-xxs mb-xl"}>
      <p className={"mb-xxxs"}>{name}</p>
      <p className={"mb-xxxs"}>{description}</p>

      <div className={"d-flex justify-content-between"}>
        <div className={`${style()}`}>{children}</div>
        {state ? (
          <div className={"w-25 border border-primary p-xxs"}>
            <pre>{JSON.stringify(state, null, 2)}</pre>
          </div>
        ) : (
          ""
        )}
        {code && (
          <div className={"w-50 ms-xxs"}>
            <CopyBlock
              text={code}
              showLineNumbers
              theme={dracula}
              wrapLines={false}
              language={"jsx"}
              $codeBlock={false}
            />
          </div>
        )}
      </div>
      {props && <Props items={props} />}
    </div>
  );
}
