"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { createContext, useEffect, useState } from "react";

const UnsavedChangesContext = createContext([undefined, () => {}]);

const UnsavedChangesProvider = ({ children }) => {
  const [changedData, setChangedData] = useState();
  const message =
    changedData === undefined
      ? changedData
      : changedData || "É possível que as alterações feitas não sejam salvas.";

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const url = [pathname, searchParams].filter((i) => i).join("?");
  useEffect(() => {
    setChangedData(undefined);
  }, [url, setChangedData]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (message === undefined) return message;

      event.preventDefault();
      event.returnValue = message;

      return message;
    };

    const script = document.getElementById("proxy-script");
    if (script) {
      script.dataset.message = message || "";
      script.dataset.href = location.href;
    }

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [message]);

  return (
    <UnsavedChangesContext.Provider value={[message, setChangedData]}>
      <Script
        strategy="afterInteractive"
        id="proxy-script"
        dangerouslySetInnerHTML={{
          __html: `(() => {
            const originalPushState = history.pushState.bind(history);
            let currentPoint = 0;
            let point = 0;
            window.history.pushState = function(state, title, url) {
                state.point = ++point;
                currentPoint = point;
                originalPushState(state, title, url);
            };
            const originalReplaceState = history.replaceState.bind(history);
            window.history.replaceState = function(state, title, url) {
                state.point = currentPoint;
                originalReplaceState(state, title, url);
            };
            window.addEventListener('popstate', function (event) {
                const { state: nextState } = event;
                const isback = currentPoint > nextState.point;

                currentPoint = nextState.point;

                const script = document.getElementById('proxy-script');
                if (!script || location.href === script.dataset.href) return;

                /*
                const message = script.dataset.message ||'';
                const confirm = message == '' ? true : window.confirm(message);
                if (!confirm) {
                    event.stopImmediatePropagation();
                    isback ? history.forward() : history.back();
                }
                */
            });
        })()`,
        }}
      ></Script>
      {children}
    </UnsavedChangesContext.Provider>
  );
};

export { UnsavedChangesContext };

export default UnsavedChangesProvider;
