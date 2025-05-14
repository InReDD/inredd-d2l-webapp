import Item from "../item";
import { Select } from '@/components/Form'
import { selectProps } from './utilProps'

export default function SelectDoc() {
  const code = () => `import { Select } from "@/components/Form";

return (
  <Select
    name="nome"
    label="Selecionar"
    placeholder="Selecione aqui"
    required
  >
    <option value={"um"}>primeira</option>
    <option value={"dois"}>segunda</option>
  </Select>
);
  `;

  return (
    <Item
      name={"Select"}
      description={"Elemento Select"}
      code={code()}
      props={selectProps}
    >
      <main className={"d-flex justify-content-center align-items-center"}>
        <div className="m-12">
          <Select
            name="nome"
            label="Selecionar"
            placeholder="Selecione aqui"
            required
          >
            <option value={"um"}>primeira</option>
            <option value={"dois"}>segunda</option>
          </Select>
        </div>
      </main>
    </Item>
  );
}
