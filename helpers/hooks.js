import { useUtilContext } from "@/app/context/UtilContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { API } from "./api";
import { useAuthContext } from "@/app/context/AuthContext";
import routes from "./routes";
import { debounce } from "underscore";

export function useOutsideClick(ref, callback) {
  const pathname = usePathname();

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback(event);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);

  useEffect(() => {
    callback();
  }, [pathname]);
}

export function useCalcWidth(ref, callback) {
  const [width, setWidth] = useState(1044);
  useEffect(() => {
    function handleResize(event) {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }

    if (ref.current) {
      setWidth(ref.current.offsetWidth);

      window.addEventListener("resize", handleResize);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ref, callback]);

  return width;
}

function _getWindowSize() {
  if (window) {
    const width = window.outerWidth;
    const height = window.outerHeight;

    return {
      width,
      height,
    };
  }

  return {
    width: 0,
    height: 0,
  };
}

export function useWindowResize() {
  const [isClient, setIsClient] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 1140, height: 200 });

  useEffect(() => {
    setWindowSize(_getWindowSize());
  }, [isClient]);

  useEffect(() => {
    setIsClient(true);

    const handleWindowResize = () => {
      setWindowSize(_getWindowSize());
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return windowSize;
}
