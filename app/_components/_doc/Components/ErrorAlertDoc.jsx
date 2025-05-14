import Item from "../item";
import { Button } from '@/components';
import { errorAlert } from './utilProps'
import { useUtilContext } from "@/app/context/UtilContext";

export default function ErrorAlertDoc() {
  const code = () => `import { Button } from "@/components";
import { useUtilContext } from "@/app/context/UtilContext";

const { showErrorAlert } = useUtilContext();

const onClick = () => {
  showErrorAlert({ message: 'Alerta de erro', shadow: false });
};

return (
  <Button onClick={onClick}>
    Gerar erro ou exceção
  </Button>
);
  `;

  const { showErrorAlert } = useUtilContext();

  const onClick = () => {
    showErrorAlert({ message: 'Alerta de erro', shadow: false });
  };

  return (
    <Item
      name={"Alerta de erro"}
      description={"Elemento de alerta de erro"}
      code={code()}
      props={errorAlert}
    >
      <Button onClick={onClick}>
        Gerar erro ou exceção
      </Button>
    </Item>
  );
}