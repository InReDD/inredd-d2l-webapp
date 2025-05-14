import { clearObj, hasAnyFile, objToFormData } from "./index";

const defaulterrorMsg = "Houve um erro inesperado, tente novamente mais tarde!";

export const API = {
  post: ({ path, data, searchParams }) => {
    return post({ path, data, searchParams });
  },
  get: ({ path, searchParams, enableCache }) => {
    return get({ path, searchParams, enableCache });
  },
  put: ({ path, data, searchParams }) => {
    return put({ path, data, searchParams });
  },
  delete: ({ path, searchParams }) => {
    return remove({ path, searchParams });
  },
};

const post = async ({ path, data, searchParams }, prefix = "") => {
  let response = null;
  searchParams = searchParams
    ? `?${new URLSearchParams(clearObj(searchParams))}`
    : "";

  try {
    const headers = {};
    setSeverSideCookies(headers);

    let body = null;

    if (hasAnyFile(data)) {
      body = objToFormData(data);
    } else {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(data);
    }

    response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${prefix}${path}${searchParams}`,
      {
        method: "POST",
        credentials: "include",
        headers,
        body,
      },
    );
  } catch (e) {
    // throw new Error(defaulterrorMsg);
    return 0;
  }

  await errorHandler({ response });
  return response && response.json();
};

const put = async ({ path, data, searchParams }, prefix = "") => {
  let response = null;
  searchParams = new URLSearchParams(clearObj(searchParams));

  try {
    const headers = {};
    setSeverSideCookies(headers);

    let body = null;

    if (hasAnyFile(data)) {
      body = objToFormData(data);
    } else {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(data);
    }

    response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${prefix}${path}?${searchParams}`,
      {
        method: "PUT",
        credentials: "include",
        headers,
        body,
      },
    );
  } catch (e) {
    throw new Error(defaulterrorMsg);
  }

  await errorHandler({ response });
  return response && response.json();
};

const get = async ({ path, searchParams, tags, enableCache }, prefix = "") => {
  let response = null;
  searchParams = new URLSearchParams(clearObj(searchParams));

  try {
    const headers = {};
    setSeverSideCookies(headers);

    response = await fetch(
      `${prefix}${path}?${searchParams}`,
      {
        method: "GET",
        credentials: "include",
        next: {
          tags,
          revalidate: enableCache ? 7200 : undefined, // 2 hours
        },
        cache: enableCache ? undefined : "no-store",
        headers,
      },
    );
  } catch (e) {
    console.log(e);
    throw new Error(defaulterrorMsg);
  }

  await errorHandler({ response });
  return response && response.json();
};

const remove = async ({ path, searchParams }, prefix = "") => {
  let response = null;
  const request = {
    req: `${process.env.NEXT_PUBLIC_API_URL}${prefix}${path}`,
  };

  if (searchParams) {
    searchParams = new URLSearchParams(clearObj(searchParams));
    request.req = `${process.env.NEXT_PUBLIC_API_URL}${prefix}${path}?${searchParams}`;
  }

  try {
    const headers = {};
    setSeverSideCookies(headers);

    response = await fetch(`${request.req}`, {
      method: "DELETE",
      credentials: "include",
      headers,
    });
  } catch (e) {
    console.log(e);
    throw new Error(defaulterrorMsg);
  }
  await errorHandler({ response });
  return response && response.json();
};

const errorHandler = async ({ response }) => {
  if (!response.ok) {
    if (response.status === 401) {
      return logout();
    }

    if (
      response.status === 413 &&
      response.statusText === "Payload Too Large"
    ) {
      const msgErroTamanhoDeArquivo =
        "O arquivo enviado é muito grande, por favor envie arquivos de até 25 Mb";
      console.error("#Erro:", msgErroTamanhoDeArquivo);
      throw new Error(msgErroTamanhoDeArquivo);
    }

    let responseJson = null;
    let errorMsg = defaulterrorMsg;

    try {
      responseJson = await response.json();
    } catch (e) {}

    if (response.status === 422) {
      const errors = responseJson?.errors;

      throw errors;
    }

    errorMsg = responseJson?.message || errorMsg;

    if (typeof errorMsg === "object") {
      errorMsg = Object.values(errorMsg)?.flat()?.join("\n");
    }

    console.error("#Erro:", errorMsg);
    throw new Error(errorMsg);
  }
};

const logout = async () => {
  const isServerSide = typeof window === "undefined";

  await API.get({ path: "/auth/logoff" });

  if (!isServerSide) {
    window.location.href = "/";
  }
};

const setSeverSideCookies = (headers) => {
  const isServerSide = typeof window === "undefined";

  if (isServerSide) {
    const { cookies } = require("next/headers");
    const cookieStore = cookies().getAll();
    headers.Cookie = cookieStore
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");
  }
};
