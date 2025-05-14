export const inputProps = [
  {
    name: "id",
    type: "string",
    default: 'random()',
    required: false,
    description:
      "Insere um identificador no input",
  },
  {
    name: "name",
    type: "string",
    default: 'N/A',
    required: false,
    description:
      "Define o name do input",
  },
  {
    name: "className",
    type: "string",
    default: 'N/A',
    required: false,
    description:
      "Insere uma classe ao campo",
  },
  {
    name: "value",
    type: "state",
    default: '""',
    required: false,
    description:
      "Controla o valor do input através de estado",
  },
  {
    name: "placeholder",
    type: "string",
    default: 'N/A',
    required: false,
    options: 'Algum texto',
    description:
      "Recebe o texto do placeholder",
  },
  {
    name: "label",
    type: "string",
    default: 'N/A',
    required: false,
    options: 'Algum texto',
    description:
      "Recebe o texto do label",
  },
  {
    name: "onChange",
    type: "function",
    default: 'N/A',
    required: false,
    description:
      "Repassa qualquer mudança que aconteça no input para o formulário",
  },
  {
    name: "onBlur",
    type: "function",
    default: 'N/A',
    required: false,
    description:
      "Repassa qualquer mudança que aconteça no input ao perder o foco para o formulário",
  },
  {
    name: "onChangeDebounce",
    type: "function",
    default: 'N/A',
    required: false,
    description:
      "Repassa qualquer mudança que aconteça no input para o formulário após certo tempo deginido em 'debounceTime'",
  },
  {
    name: "debounceTime",
    type: "number",
    default: '700',
    required: false,
    description:
      "Define tempo para executar 'onChangeDebounce' após alteração do campo",
  },
  {
    name: "enableDebounce",
    type: "boolean",
    default: 'false',
    required: false,
    description:
      "Habilita a funcionalidade debounce",
  },
  {
    name: "required",
    type: "boolean",
    default: 'false',
    required: false,
    description:
      "Define se o campo será obrigatório",
  },
  {
    name: "autoComplete",
    type: "boolean",
    default: 'false',
    required: false,
    description:
      "Habilita complemento automático do campo pelo navegador",
  },
  {
    name: "min",
    type: "number",
    default: 'N/A',
    required: false,
    description:
      "Define valor mínimo para campo do tipo 'number'",
  },
  {
    name: "max",
    type: "number",
    default: 'N/A',
    required: false,
    description:
      "Define valor máximo para campo do tipo 'number'",
  },
  {
    name: "pattern",
    type: "string",
    default: 'N/A',
    required: false,
    description:
      "Define um padrão de valor a ser seguido",
  },
  {
    name: "readOnly",
    type: "boolean",
    default: 'false',
    required: false,
    description:
      "Define se o campo é somente leitura",
  },
  {
    name: "mask",
    type: "function",
    default: 'N/A',
    required: false,
    description:
      "Define máscara para o campo",
  },
  {
    name: "maxLength",
    type: "number",
    default: '255',
    required: false,
    description:
      "Define tamanho máximo de caracteres para o campo",
  },
  {
    name: "type",
    type: "string",
    default: 'text',
    required: false,
    options: 'text, number',
    description:
      "Recebe a vairação do tipo de input",
  },
  {
    name: "errorMessage",
    type: "string",
    default: 'Preencha o campo corretamente',
    required: false,
    description:
      "Recebe a mensagem de erro que será exibida no input",
  },
];

export const formProps = [
  {
    name: "children",
    type: "jsx",
    default: 'N/A',
    required: false,
    description:
      "Renderiza campos dentro do formulário",
  },
  {
    name: "className",
    type: "string",
    default: 'N/A',
    required: false,
    description:
      "Insere uma classe ao campo",
  },
  {
    name: "setIsValid",
    type: "function",
    default: 'N/A',
    required: false,
    description:
      "Altera o estado do formulário para inválido",
  },
  {
    name: "onSubmit",
    type: "function",
    default: 'N/A',
    required: false,
    description:
      "Execução após submissão e validações do formulário",
  },
  {
    name: "controlUnsavedChanges",
    type: "boolean",
    default: 'true',
    required: false,
    description:
      "Controla o aviso de alterações não salvas do formulário",
  },
];

export const selectProps = [
  {
    name: "id",
    type: "string",
    default: 'random()',
    required: false,
    description:
      "Insere um identificador",
  },
  {
    name: "name",
    type: "string",
    default: 'N/A',
    required: false,
    description:
      "Define o name",
  },
  {
    name: "className",
    type: "string",
    default: 'N/A',
    required: false,
    description:
      "Insere uma classe ao campo",
  },
  {
    name: "value",
    type: "state",
    default: 'N/A',
    required: false,
    description:
      "Controla o valor do select através de estado",
  },
  {
    name: "placeholder",
    type: "string",
    default: 'N/A',
    required: false,
    description:
      "Recebe o texto do placeholder e opção padrão",
  },
  {
    name: "label",
    type: "string",
    default: 'N/A',
    required: false,
    options: 'Algum texto',
    description:
      "Recebe o texto do label",
  },
  {
    name: "onChange",
    type: "function",
    default: 'N/A',
    required: false,
    description:
      "Repassa qualquer mudança que aconteça no select para o formulário",
  },
  {
    name: "children",
    type: "jsx",
    default: 'N/A',
    required: false,
    description:
      "Renderiza as opções do select",
  },
  {
    name: "isValueDefault",
    type: "boolean",
    default: 'true',
    required: false,
    description:
      "Define se o placeholder será aceito como valor ou não",
  },
];

export const checkBoxProps = [
  {
    name: "id",
    type: "string",
    default: 'random()',
    required: false,
    description:
      "Insere um identificador no input",
  },
  {
    name: "name",
    type: "string",
    default: 'N/A',
    required: false,
    description:
      "Insere um nome",
  },
  {
    name: "checked",
    type: "boolean",
    default: 'false',
    required: false,
    description:
      "Informa se está verificado ou não",
  },
  {
    name: "value",
    type: "string",
    default: 'N/A',
    required: false,
    description:
      "Informa o valor",
  },
  {
    name: "label",
    type: "string",
    default: 'N/A',
    required: false,
    description:
      "Adiciona uma label",
  },
  {
    name: "onChange",
    type: "function",
    default: 'N/A',
    required: false,
    description:
      "Execução após alteração",
  },
  {
    name: "disabled",
    type: "boolean",
    default: 'false',
    required: false,
    description:
      "Informa se está habilitado",
  },
  {
    name: "required",
    type: "boolean",
    default: 'false',
    required: false,
    description:
      "Informa se o campo é obrigatório",
  },
  {
    name: "errorMessage",
    type: "string",
    default: 'Preencha corretamente o campo',
    required: false,
    description:
      "Informa mensagem de erro quando incorreto",
  },
];

export const radioProps = [
  {
    name: "id",
    type: "string",
    default: 'random()',
    required: false,
    description:
      "Insere um identificador no input",
  },
  {
    name: "name",
    type: "string",
    default: 'N/A',
    required: false,
    description:
      "Insere um nome",
  },
  {
    name: "checked",
    type: "boolean",
    default: 'false',
    required: false,
    description:
      "Informa se está verificado ou não",
  },
  {
    name: "value",
    type: "string",
    default: 'N/A',
    required: false,
    description:
      "Informa o valor",
  },
  {
    name: "label",
    type: "string",
    default: 'N/A',
    required: false,
    description:
      "Adiciona uma label",
  },
  {
    name: "onChange",
    type: "function",
    default: 'N/A',
    required: false,
    description:
      "Execução após alteração",
  },
  {
    name: "disabled",
    type: "boolean",
    default: 'false',
    required: false,
    description:
      "Informa se está habilitado",
  },
  {
    name: "required",
    type: "boolean",
    default: 'false',
    required: false,
    description:
      "Informa se o campo é obrigatório",
  },
  {
    name: "errorMessage",
    type: "string",
    default: 'Preencha corretamente o campo',
    required: false,
    description:
      "Informa mensagem de erro quando incorreto",
  },
];

export const inputDocs = [
  {
    name: "id",
    type: "string",
    default: 'random()',
    required: false,
    description:
      "Insere um identificador no input",
  },
  {
    name: "type",
    type: "string",
    default: 'N/A',
    required: false,    
    description:
      "Recebe a vairação do tipo de input",
  },
  {
    name: "value",
    type: "state",
    default: '""',
    required: false,
    description:
      "Controla o valor do input através de estado",
  },
  {
    name: "onChange",
    type: "function",
    default: 'N/A',
    required: false,
    description:
      "Repassa qualquer mudança que aconteça no input para o formulário",
  },
  {
    name: "placeholder",
    type: "string",
    default: 'N/A',
    required: false,
    options: 'Algum texto',
    description:
      "Recebe o texto do placeholder",
  },
  {
    name: "required",
    type: "boolean",
    default: 'false',
    required: false,
    description:
      "Define se o campo será obrigatório",
  },
]