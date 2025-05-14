"use client";

import { useRouter as useRouterRaw } from "next/navigation";
import { useContext } from "react";
import { UnsavedChangesContext } from "./index";

export function useRouter() {
  const [changedData] = useContext(UnsavedChangesContext);
  const router = useRouterRaw();

  return new Proxy(router, {
    get: function (target, propKey) {
      const confirm = changedData === undefined ? true : window.confirm(changedData);
      return confirm ? target[propKey] : () => {};
    },
  });
}
