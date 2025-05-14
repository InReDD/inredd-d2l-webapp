"use client";
import { useCallback, useEffect, useState } from "react";

export default function HtmlContent({ data, className }) {
  const [isClient, setIsClient] = useState(false);
  const [isShowing, setIsShowing] = useState(false);
  const offset = 50;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const content = useCallback((element) => {
    const verifyIfCSSLoaded = (link) => {
      const doc = element.contentDocument;
      let sheet, cssRules;

      if ("sheet" in link) {
        sheet = "sheet";
        cssRules = "cssRules";
      } else {
        sheet = "styleSheet";
        cssRules = "rules";
      }

      let interval_id = setInterval(function () {
          try {
            if (link[sheet] && link[sheet][cssRules].length) {
              clearInterval(interval_id);
              clearTimeout(timeout_id);

              doc.fonts.ready.then(() => {
                resize();
                setIsShowing(true);
              });
            } else {
              setIsShowing(false);
            }
          } catch (e) {
          } finally {
          }
        }, 10),
        timeout_id = setTimeout(function () {
          clearInterval(interval_id);
          clearTimeout(timeout_id);
        }, 15000);
    };

    const addStyle = () => {
      const doc = element.contentDocument;
      const styleElement = doc.createElement("link");
      styleElement.href = `/tinymce-style.css`;
      styleElement.type = `text/css`;
      styleElement.rel = `stylesheet`;

      verifyIfCSSLoaded(styleElement);
      doc.head.appendChild(styleElement);
    };

    const resize = () => {
      if (element) {
        element.style.height =
          element.contentDocument.body.scrollHeight + offset + "px";
      }
    };

    window.addEventListener("resize", resize);
    element.addEventListener("load", addStyle);
    element.addEventListener("load", resize);

    return () => {
      window.removeEventListener("resize", resize);
      element.removeEventListener("load", addStyle);
      element.removeEventListener("load", resize);
    };
  }, []);

  return isClient ? (
    <>
      {/* <div dangerouslySetInnerHTML={{__html: content}}></div> */}
      <iframe
        dangerouslySetInnerHTML={{ __html: content }}
        className={className}
        id={"iframe"}
        ref={content}
        srcDoc={data}
        height={"100%"}
        width={"100%"}
        style={{
          position: "relative",
          zIndex: 1,
          visibility: isShowing ? "visible" : "hidden",
        }}
      ></iframe>
    </>
  ) : (
    <></>
  );
}

