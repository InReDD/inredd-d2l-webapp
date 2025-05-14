const masks = {
  cep: {
    name: "cep",
    unmaskValue: (value) => value.replace("-", ""),
    config: {
      mask: "00000-000",
    },
  },
  cpf: {
    name: "cpf",
    unmaskValue: (value) => value.replaceAll("-", "").replaceAll(".", ""),
    config: {
      mask: "000.000.000-00",
    },
  },
  phone: {
    name: "phone",
    unmaskValue: (value) => value.replace(/[+() -]/g, ""),
    config: (value) => {
      return {
        mask:
          value?.replace(/\D/g, "")?.length < 11
            ? "(00) 0000-00000000"
            : "(00) 00000-0000",
      };
    },
  },
  percent: {
    name: "percent",
    unmaskValue: (value) => value.replace("%", "") || 0,
    pattern: "^([0-9]{1,3})",
    config: {
      mask: "num%",
      lazy: false,
      blocks: {
        num: {
          min: 0,
          max: 100,
          mask: Number,
          expose: true,
        },
      },
    },
  },
};

export default masks;
