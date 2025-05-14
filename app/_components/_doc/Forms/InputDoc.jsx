import Item from "../item";
import { Input } from '@/components/Form'
import { inputProps } from './utilProps'
import masks from "@/helpers/masks";

export default function InputDoc() {
  const code = () => `import { Input } from "@/components/Form"; 
import masks from "@/helpers/masks";


return (
  <Input
    type="text"
    name="cep"
    label="Campo de texto"
    placeholder="0000-000"
    mask={masks.cep}
    required
  />

  <Input
    type="text"
    name="texto"
    label="Campo de texto"
    placeholder="Digite algo aqui"
    required
  />
);
  `;

  return (
    <Item
      name={"Input"}
      description={"Elemento Input"}
      code={code()}
      props={inputProps}
    >
      <main className={"d-flex justify-content-center align-items-center"}>
        <div className="m-12">
          <Input
            type="text"
            name="cep"
            label="Campo de CEP"
            placeholder="0000-000"
            mask={masks.cep}
            required
          />
        </div>
        <div className="m-10">

        <Input
            type="text"
            name="texto"
            label="Campo de texto"
            placeholder="Digite algo aqui"
            required
          />
        </div>
      </main>
    </Item>
  );
}