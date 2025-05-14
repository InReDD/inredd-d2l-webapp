import { useState } from "react";
import { Search } from "../..";
import Item from "../item";

export default function SearchInputDoc() {

  const props = [
    {
      name: "icon",
      type: "string",
      default: 'pesquisa',
      required: false,
      options: 'N/A',
      description:
        "Renderiza o ícone",
    },
    {
      name: "size",
      type: "string",
      default: 'large',
      required: false,
      options: 'large, small',
      description:
        "Modifica o tamanho do input",
    },
    {
      name: "placeholder",
      type: "string",
      default: 'N/A',
      required: false,
      options: 'N/A',
      description:
        "Placeholder do input",
    },
    {
      name: "onChange",
      type: "fn()",
      default: 'N/A',
      required: false,
      options: 'N/A',
      description:
        "Recebe uma função que será executada pelo search",
    },
  ]

  const [search, setSearch] = useState("");

  function searchFn(e) {
    console.log(e);
    setSearch(e)
  }

  return (
    <>
      <Item
        name={"Search"}
        description={"Componente de pesquisa"}
        props={props}
      >
        <div className={"d-flex flex-column "}>
          <Search
            icon="pesquisa"
            placeholder="Componente de pesquisa..."
            size="large"
            onChange={(e) => searchFn(e.target.value)}
          />
          <pre className={"mt-20 ms-4"}>
            Ex: {search}
          </pre>
        </div>
      </Item>


    </>
  )
}