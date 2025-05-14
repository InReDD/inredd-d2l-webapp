import Item from "../item";
import { Anchor } from '@/components';
import { anchorProps } from './utilProps'

export default function AnchorDoc() {
  const code = () => `import { Anchor } from "@/components";

return (
  <Anchor href={'/'} target={'_blank'}>
    Ola mundo
  </Anchor>
);
  `;

  return (
    <Item
      name={"Anchor"}
      description={"Elemento de link"}
      code={code()}
      props={anchorProps}
    >
      <Anchor href={'/'} target={'_blank'}>
        Ola mundo
      </Anchor>
    </Item>
  );
}
