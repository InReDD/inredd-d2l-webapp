import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { flatten } from "flat";

// https://nextjs.org/docs/app/building-your-application/optimizing/metadata#dynamic-metadata
export const generateMetadata = ({
  title,
  description,
  path = "",
  images = [],
}) => {
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL),
    title: `${title} | InReDD`,
    description,
    icons: [
      // {
      //   media: "(prefers-color-scheme: light)",
      //   url: "/img/logo.svg",
      //   href: "/img/logo.svg",
      // },
      // {
      //   media: "(prefers-color-scheme: dark)",
      //   url: "/img/logo.svg",
      //   href: "/img/logo.svg",
      // },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon/favicon-16x16.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        url: "/favicon/apple-touch-icon.png",
      },
    ],
    openGraph: {
      title,
      description,
      images: [...images, `${process.env.NEXT_PUBLIC_APP_URL}`],
      url: `${process.env.NEXT_PUBLIC_APP_URL}${path}`,
      type: "website",
      locale: "pt_BR",
      siteName: "Next",
    },
  };
};

export const getUser = () => {
  const cookie = Cookies.get("jwt-edos");
  if (cookie) {
    const decoded = jwt_decode(cookie, { header: false });
    return decoded;
  }
};

export const deepClone = (obj) => (obj ? JSON.parse(JSON.stringify(obj)) : obj);

export const compareValues = (obj, obj2) => {
  try {
    const objStr = typeof obj === "object" ? JSON.stringify(obj) : obj;
    const objStr2 = typeof obj2 === "object" ? JSON.stringify(obj2) : obj2;

    if (objStr === objStr2) {
      return true;
    }
  } catch (err) {}

  return obj === obj2;
};

export const objToFormData = (obj) => {
  const formData = new FormData();
  const objJson = {};

  const flatData = flatten(obj);

  for (const key in flatData) {
    if (flatData[key] instanceof File) {
      formData.append(key, flatData[key]);
      continue;
    }

    objJson[key] = flatData[key];
  }

  formData.append("_json", JSON.stringify(objJson));

  return formData;
};

export const hasAnyFile = (data) => {
  const flatData = flatten(data);

  for (const property in flatData) {
    if (flatData[property] instanceof File) {
      return true;
    }
  }

  return false;
};

export const clearObj = (obj) => {
  if (!obj) return;
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
};

export const onUpdateField = (state, e) => {
  if (!e?.target) return state;

  let value = e.target?.valueWithoutMask ?? e.target?.value ?? "";

  if (e.target.type === "file") {
    value = e.target.files[0];
  }

  if (e.target.type === "checkbox") {
    value = e.target.checked;
  }

  if (e.target.type === "radio") {
    if (e.target.value === "true") {
      value = true;
    } else if (e.target.value === "false") {
      value = false;
    } else {
      value = e.target.value;
    }
  }

  const nextState = {
    ...state,
    [e.target.name]: value,
  };

  return nextState;
};

export const formSubmit = async (
  { showErrorAlert },
  { onSubmit, e, setLoading, setBusy }, // opcionais
) => {
  if (setLoading) setLoading({ show: true });

  try {
    await onSubmit(e);
  } catch (e) {
    showErrorAlert({ message: e.message });
  } finally {
    if (setBusy) setBusy(false);
    if (setLoading) setLoading({ show: false });
  }
};

export const scrollSmothToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export const formatPrice = (price) =>
  price?.toLocaleString("pt-br", { style: "currency", currency: "BRL" }) ||
  "R$ 00,00";

export const formatCellphone = (phone) => {
  const newPhone = phone.replace(/\D/g, "");

  if (newPhone.length === 11) {
    return newPhone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  } else if (newPhone.length === 10) {
    return newPhone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  } else {
    return newPhone;
  }
};

export const onlyNumbers = (s) => {
  return `${s}`.replace(/\D/g, "");
};

export const formatPhoneNumber = (phone) => {
  let cleanPhone = phone.replace(/[^\d]/g, "");

  if (cleanPhone.startsWith("55")) {
    cleanPhone = cleanPhone.slice(2);
  }

  return cleanPhone;
};

export const formatCpf = (v) => {
  const maskedString = v
    .slice(0, 14)
    .replace(/[^\d*]/g, "")
    .replace(/([\d*]{3})([\d*])/, "$1.$2")
    .replace(/([\d*]{3})([\d*])/, "$1.$2")
    .replace(/([\d*]{3})([\d*]{1,2})$/, "$1-$2");
  return maskedString;
};

export const formatCep = (v) => {
  const maskedString = v
    .slice(0, 9)
    .replace(/[^\d*]+/g, "")
    .replace(/^([\d*]{5})([\d*])/, "$1-$2");
  return maskedString;
};
