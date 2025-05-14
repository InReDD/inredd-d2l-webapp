import Item from "../item";
import { Input, Form } from '@/components/Form'
import { Button } from '@/components'
import { formProps } from './utilProps'

export default function FormDoc() {
  const code = () => `import { Input, Form } from "@/components/Form";
import { Button } from "@/components";

const onSubmit = (form) => {
  const data = new FormData(form.target);

  console.log('nome:', data.get('nome'));
};

return (
  <Form onSubmit={onSubmit}>
    <Input
      type="text"
      name="nome"
      label="Campo de texto"
      placeholder="Preencha aqui..."
      required
    />
    <Button type="submit" className={'mt-40'}>Enviar</Button>
  </Form>
);
  `;

  const onSubmit = (form) => {
    const data = new FormData(form.target);

    console.log('nome:', data.get('nome'));
  };

  return (
    <Item
      name={"Form"}
      description={"Elemento formulário"}
      code={code()}
      props={formProps}
    >
      <main className={"d-flex justify-content-center align-items-center"}>
        <div className="m-12">
          <Form onSubmit={onSubmit}>
            <Input
              type="text"
              name="nome"
              label="Campo de texto"
              placeholder="Preencha aqui..."
              required
            />
            <Button type="submit" className={'mt-40'}>Enviar</Button>
          </Form>
        </div>
      </main>
    </Item>
  );
}