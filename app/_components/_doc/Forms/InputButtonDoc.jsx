import { useState } from "react";
import { Item } from "..";
import { Form, InputButton } from "../../Form";
import { inputDocs } from "./utilProps";

export default function InputButtonDoc() {

  const code = () => `import { InputButton } from "../../Form";

return(
  <InputButton
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    onClick={onSubmit}
    btnMessage="OK"
    size="large"
    type={"email"}
  />
);
`
  const [value, setValue] = useState();
  const onSubmit = () => { };

  return (
    <Item
      name={"InputButton"}
      description={"Elemento formulário"}
      code={code()}
      props={inputDocs}
    >
      <main className={"d-flex justify-content-center align-items-center"}>
        <div className="m-12">
          <Form className={"btn-input"}>
            <InputButton
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onClick={onSubmit}
              btnMessage="OK"
              size="default"
              type={"email"}
            />
          </Form>
        </div>
      </main>
    </Item>
  )
}
