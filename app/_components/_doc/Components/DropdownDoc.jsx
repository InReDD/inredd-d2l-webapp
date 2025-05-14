import { Dropdown } from "@/components";
import Item from "../item";
import { dropdownProps } from "./utilProps";

export default function DropdownDoc() {
  const code = () => `import { Dropdown } from "@/components";
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
      <Dropdown
        label={"Selecione"}
      >
        {
          items.map((item, index) => {
            return (
              <li key={index}>{item.label}</li>
            )
          })
        }
      </Dropdown>
  )
`;
  const items = [
    { value: "item1", label: "Item 1" },
    { value: "item2", label: "Item 2" },
    { value: "item3", label: "Item 3" },
    { value: "item4", label: "Item 4" },
    { value: "item5", label: "Item 5" },
    { value: "item6", label: "Item 6" },
    { value: "item7", label: "Item 7" },
    { value: "item8", label: "Item 8" },
    { value: "item9", label: "Item 9" },
    { value: "item10", label: "Item 10" },
  ];
  return (
    <Item
      name={"Dropdown"}
      description={"Elemento Dropdown"}
      code={code()}
      props={dropdownProps}
    >
      <div className="w-75 d-flex justify-content-center">
        <Dropdown label={"Selecione"}>
          {items.map((item, index) => {
            return <li key={index}>{item.label}</li>;
          })}
        </Dropdown>
      </div>
    </Item>
  );
}
