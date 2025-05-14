export const buttonProps = [
  {
    name: "variant",
    type: "string",
    default: 'primary',
    required: false,
    options: 'primary, secondary, tertiary, link',
    description:
      "Recebe o tipo de variação do botão",
  },
  {
    name: "size",
    type: "string",
    default: 'large',
    required: false,
    options: 'large, small',
    description:
      "Recebe o tamanho do botão",
  },
  {
    name: "onClick",
    type: "function",
    default: 'N/A',
    required: false,
    options: 'fn()',
    description:
      "Recebe uma função que será executada pelo botão",
  },
  {
    name: "type",
    type: "string",
    default: 'submit',
    required: false,
    options: 'Todas as opções disponíveis para botão',
    description:
      "Recebe o tipo do botão",
  },
  {
    name: "icon",
    type: "string",
    default: 'N/A',
    required: false,
    options: 'Nome do ícone',
    description:
      "Recebe o nome do ícone e se tiver ele renderiza",
  },
  {
    name: "widthIcon",
    type: "number",
    default: '20px',
    required: false,
    options: 'Qualquer tamanho em px',
    description:
      "Recebe o tamanho do ícone",
  },
  {
    name: "heightIcon",
    type: "number",
    default: '20px',
    required: false,
    options: 'Qualquer largura em px',
    description:
      "Recebe a largura do ícone",
  },
  {
    name: "disabled",
    type: "boolean",
    default: 'false',
    required: false,
    options: 'true, false',
    description:
      "Opção de deixar o botão habilitado ou não",
  },
  {
    name: "children",
    type: "string",
    default: 'N/A',
    required: true,
    options: 'Qualquer texto passado como children',
    description:
      "Renderiza o texto passado como children",
  },
];

export const modalProps = [
  {
    name: "id",
    type: "string",
    default: 'N/A',
    required: true,
    description:
      "Identificador único da modal",
  },
  {
    name: "title",
    type: "string",
    default: 'N/A',
    required: true,
    description:
      "Adiciona um título à modal",
  },
  {
    name: "modal",
    type: "state",
    default: 'N/A',
    required: true,
    description:
      "Estado para acessar a modal programaticamente",
  },
  {
    name: "setModal",
    type: "function",
    default: 'N/A',
    required: true,
    description:
      "Adicionar a modal ao estado 'modal'",
  },
  {
    name: "footer",
    type: "jsx",
    default: 'N/A',
    required: false,
    description:
      "Renderiza os elementos no rodapé da modal",
  },
  {
    name: "children",
    type: "jsx",
    default: 'N/A',
    required: false,
    description:
      "Renderiza o corpo da modal",
  },
  {
    name: "onHideModal",
    type: "function",
    default: 'N/A',
    required: false,
    description:
      "Executa após a modal fechar",
  },
  {
    name: "onShowModal",
    type: "function",
    default: 'N/A',
    required: false,
    description:
      "Executa após a modal abrir",
  },
  {
    name: "shadow",
    type: "boolean",
    default: 'false',
    required: false,
    description:
      "Adiciona sombra à modal. Utilizar quando dentro de outras modais",
  },
  {
    name: "scrollContent",
    type: "boolean",
    default: 'true',
    required: false,
    description:
      "Permitir scroll do corpo da modal",
  },
  {
    name: "closeButton",
    type: "boolean",
    default: 'true',
    required: false,
    description:
      "Renderizar botão de fechar a modal",
  },
];

export const alert = [
  {
    name: "title",
    type: "string",
    default: 'N/A',
    required: false,
    description:
      "Título a ser apresentado",
  },
  {
    name: "message",
    type: "string",
    default: 'N/A',
    required: false,
    description:
      "Mensagem a ser apresentada",
  },
  {
    name: "closeButton",
    type: "string",
    default: 'Fechar',
    required: false,
    description:
      "Mensagem a ser apresentada no botão de fechar",
  },
  {
    name: "confirmButton",
    type: "string",
    default: 'não renderizar',
    required: false,
    description:
      "Renderizar botão de confirmar com texto inserido",
  },
  {
    name: "shadow",
    type: "boolean",
    default: 'false',
    required: false,
    description:
      "Adiciona sombra à modal. Utilizar quando dentro de outras modais",
  },
  {
    name: "onClose",
    type: "function",
    default: 'N/A',
    required: false,
    description:
      "Executar após fechamento do alerta através do botão",
  },
  {
    name: "onConfirm",
    type: "function",
    default: 'N/A',
    required: false,
    description:
      "Executar após confirmação do alerta. Necessário inserir a prop 'confirmButton'",
  },
  {
    name: "onExitButton",
    type: "function",
    default: 'N/A',
    required: false,
    description:
      "Executar após o fechamento do alerta",
  },
  {
    name: "size",
    type: "string",
    default: 'large',
    required: false,
    options: 'large, small',
    description:
      "Recebe o tamanho do botão",
  },
];

export const errorAlert = [
  {
    name: "message",
    type: "string",
    default: 'Ocorreu um erro inexperado.\nTente novamente mais tarde.',
    required: false,
    description:
      "Mensagem de erro a ser apresentada",
  },
  {
    name: "shadow",
    type: "boolean",
    default: 'false',
    required: false,
    description:
      "Adiciona sombra à modal. Utilizar quando dentro de outras modais",
  },
];

export const loading = [
  {
    name: "show",
    type: "boolean",
    default: 'false',
    required: true,
    description:
      "Demonstra se o carregamento será renderizado ou não",
  },
  {
    name: "shadow",
    type: "boolean",
    default: 'false',
    required: false,
    description:
      "Adiciona sombra. Utilizar quando dentro de outras modais",
  },
];

export const anchorProps = [
  {
    name: "href",
    type: "string",
    default: '/',
    required: false,
    description:
      "Insere o link de redirecionamento",
  },
  {
    name: "target",
    type: "string",
    default: '_self',
    options: '_blank _self _parent _top',
    required: false,
    description:
      "Insere o tipo de redirecionamento",
  },
  {
    name: "className",
    type: "string",
    default: 'N/A',
    required: false,
    description:
      "Insere uma classe",
  },
];

export const searchProps = [
  {
    name: "id",
    type: "string",
    default: 'N/A',
    required: false,
    description:
      "Insere um identificador",
  },
  {
    name: "placeholder",
    type: "string",
    default: 'N/A',
    required: false,
    description:
      "Insere um placeholder",
  },
  {
    name: "onChange",
    type: "function",
    default: 'N/A',
    required: false,
    description:
      "Execução após um certo tempo definido por 'debounceTime'",
  },
  {
    name: "debounceTime",
    type: "number",
    default: '700',
    required: false,
    description:
      "Segundos após alteração para executar 'onChange'",
  },
  {
    name: "className",
    type: "string",
    default: 'N/A',
    required: false,
    description:
      "Insere uma classe",
  },
];

export const dropdown = [
  {
    name: "label",
    type: "string",
    default: 'N/A',
    required: false,
    description:
      "Insere o nome do Dropdown",
  },
  {
    name: "children",
    type: "JSX",
    default: 'N/A',
    required: true,
    description:
      "Insere o elemento que será renderizado pelo Dropdown",
  },
  {
    name: "showIcon",
    type: "boolena",
    default: 'true',
    required: true,
    description:
      "Habilita a exibição do ícone no Dropdown",
  },
  {
    name: "float",
    type: "boolena",
    default: 'true',
    required: true,
    description:
      "Habilita a flutuação do Dropdown",
  },
  {
    name: "large",
    type: "prop",
    default: 'N/A',
    required: false,
    description:
      "Altera o tamanho do dropdown",
  },
]

export const selectDropdown = [
  {
    name: "label",
    type: "string",
    default: 'N/A',
    required: false,
    description:
      "Insere o nome do Dropdown",
  },
  {
    name: "options",
    type: "Array []",
    default: '',
    required: true,
    description:
      "Disponibiliza os elementos que o SelectDropdown deve exibir",
  },
  {
    name: "alignRight",
    type: "prop",
    default: 'true',
    required: true,
    description:
      "Se passada alinha a label a direita do SelectDropdown",
  },
  {
    name: "float",
    type: "boolena",
    default: 'true',
    required: true,
    description:
      "Habilita a flutuação do Dropdown",
  },
  {
    name: "className",
    type: "prop",
    default: 'N/A',
    required: false,
    description:
      "Permite alterações no estilo do SelectDropdown",
  },
  {
    name: "onChange",
    type: "fn()",
    default: 'N/A',
    required: false,
    description:
      "POssibilita passar alguma função para o SelectDropdown",
  },
]

export const accordion = [
  {
    name: "summary",
    type: "string",
    default: 'N/A',
    required: false,
    description:
      "Exibe o título do accordion",
  },
  {
    name: "children",
    type: "JSX",
    default: '',
    options: "Aceita JSX ou elementos HTML",
    required: true,
    description:
      "Renderiza o conteúdo no componente",
  },
];

export const paginationProps = [
  {
    name: "meta",
    type: "object",
    default: 'N/A',
    options: "{ page, lastPage }",
    required: true,
    description:
      "Configurações de paginação vindas da API",
  },
  {
    name: "params",
    type: "state",
    default: 'N/A',
    required: false,
    description:
      "Estado para gerir número de página",
  },
  {
    name: "onChange",
    type: "function",
    default: 'N/A',
    required: false,
    description:
      "Execução após troca de página alterando o estado 'params'",
  },
];

export const dropdownProps = [
  {
    name: "label",
    type: "string | JSX",
    default: 'N/A',
    required: false,
    description:
      "Elemento ou texto a ser renderizado para ativar as opções",
  },
  {
    name: "children",
    type: "JSX",
    default: 'N/A',
    required: false,
    description:
      "Elementos para renderizar nas opções",
  },
  {
    name: "large",
    type: "boolean",
    default: 'false',
    required: false,
    description:
      "Opção de opções do modo large",
  },
  {
    name: "showIcon",
    type: "boolean",
    default: 'true',
    required: false,
    description:
      "Apresentar ícone de seta",
  },
  {
    name: "float",
    type: "boolean",
    default: 'true',
    required: false,
    description:
      "Opção de flutuar ou não as opções",
  },
];

export const simpleCardInformationProps = [
  {
    name: "link",
    type: "string",
    default: '/',
    required: false,
    options: 'N/A',
    description:
      "Recebe um link válido e faz o roteamento",
  },
  {
    name: "icon",
    type: "string",
    default: 'N/A',
    required: false,
    options: 'N/A',
    description:
      "Recebe o nome do ícone que deve ser renderizado",
  },
  {
    name: "children",
    type: "string",
    default: 'N/A',
    required: false,
    options: 'N/A',
    description:
      "Recebe o texto que será renderizado pelo card",
  },
]