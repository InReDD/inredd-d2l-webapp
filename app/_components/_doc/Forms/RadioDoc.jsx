import Item from "../item";
import { Radio, RadioGroup } from '@/components/Form'
import { radioProps } from './utilProps'

export default function RadioDoc() {
  const code = () => `import { Radio, RadioGroup } from "@/components/Form";

return (
  <RadioGroup required>
    <Radio name="teste" label={'Campo de radio'} />
  </RadioGroup>
);
  `;

  return (
    <Item
      name={"Radio"}
      description={"Elemento Radio"}
      code={code()}
      props={radioProps}
    >
      <main className={"d-flex justify-content-center align-items-center"}>
        <div className="m-12">
          <RadioGroup required>
            <Radio name="teste" label={'Campo de radio'} />
          </RadioGroup>
        </div>
      </main>
    </Item>
  );
}
