import Item from "../item";
import { Button } from '@/components';
import { buttonProps } from './utilProps'

export default function ButtonDoc() {
  const code = () => `import { Button } from "@/components";

const onClick = () => {
  console.log('Ola mundo');
};

return (
  <Button onClick={onClick}>
    Ola mundo
  </Button>
);
  `;  

  const onClick = () => {
    console.log('Ola mundo');
  };

  return (
    <Item
      name={"Botão"}
      description={"Elemento de botão"}
      code={code()}
      props={buttonProps}
    >
      <Button onClick={onClick}>
        Ola mundo
      </Button>
    </Item>
  );
}