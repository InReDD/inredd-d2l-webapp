import { Item } from "..";
import { SelectDropdown } from "@/components";
import { selectDropdown } from "./utilProps";

export default function SelectDropdownDoc() {

const code = () => `import { SelectDropdown } from "@/components";
 const items = [
    { value: 'item1', label: 'Item 1' },
    { value: 'item2', label: 'Item 2' },
    { value: 'item3', label: 'Item 3' },
    { value: 'item4', label: 'Item 4' },
    { value: 'item5', label: 'Item 5' },
    { value: 'item6', label: 'Item 6' },
    { value: 'item7', label: 'Item 7' },
    { value: 'item8', label: 'Item 8' },
    { value: 'item9', label: 'Item 9' },
    { value: 'item10', label: 'Item 10' }
  ];

  return (
      <SelectDropdown
        label={"Filtro de Itens"}
        options={items}
        alignRight
        float={false}
        onChange={() => {}}
        className
      />
  )
`

  const items = [
    { value: 'item1', label: 'Item 1' },
    { value: 'item2', label: 'Item 2' },
    { value: 'item3', label: 'Item 3' },
    { value: 'item4', label: 'Item 4' },
    { value: 'item5', label: 'Item 5' },
    { value: 'item6', label: 'Item 6' },
    { value: 'item7', label: 'Item 7' },
    { value: 'item8', label: 'Item 8' },
    { value: 'item9', label: 'Item 9' },
    { value: 'item10', label: 'Item 10' }
  ];

  return (
    <Item
      name={"SelectDropdown"}
      description={"Dropdown Filtro"}
      code={code()}
      props={selectDropdown}
    >
      <div className="w-75">
        <SelectDropdown
          label={"Filtro de Itens"}
          options={items}
          float={false}
          onChange={() => {}}
          className
        />
      </div>
    </Item>
  )
}
