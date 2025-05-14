import Item from "../item";
import { CheckBox, CheckBoxGroup } from '@/components/Form'
import { checkBoxProps } from './utilProps'

export default function CheckBoxDoc() {
  const code = () => `import { CheckBox, CheckBoxGroup } from "@/components/Form";

return (
  <CheckBoxGroup required>
    <CheckBox name="teste" label={'Campo de checkbox'} />
  </CheckBoxGroup>
);
  `;

  return (
    <Item
      name={"CheckBox"}
      description={"Elemento CheckBox"}
      code={code()}
      props={checkBoxProps}
    >
      <main className={"d-flex justify-content-center align-items-center"}>
        <div className="m-12">
          <CheckBoxGroup required>
            <CheckBox name="teste" label={'Campo de checkbox'} />
          </CheckBoxGroup>
        </div>
      </main>
    </Item>
  );
}
