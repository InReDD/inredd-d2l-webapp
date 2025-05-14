import Item from "../item";
import { Button } from '@/components';
import { alert } from './utilProps'
import { useUtilContext } from "@/app/context/UtilContext";

export default function AlertDoc() {
  const code = () => `import { Button } from "@/components";
import { useUtilContext } from "@/app/context/UtilContext";

const { showAlert } = useUtilContext();

const onClick = () => {
  showAlert({
    title: 'Mensagem de alerta',
    message: 'Alerta gerado',
    confirmButton: 'Confirmar',
  });
};

return (
  <Button onClick={onClick}>
    Gerar alerta
  </Button>
);
  `;  

  const { showAlert } = useUtilContext();

  const onClick = () => {
    showAlert({
      title: 'Mensagem de alerta',
      message: 'Alerta gerado',
      confirmButton: 'Confirmar',
    });
  };

  return (
    <Item
      name={"Alerta"}
      description={"Elemento de alerta"}
      code={code()}
      props={alert}
    >
      <Button onClick={onClick}>
        Gerar alerta
      </Button>
    </Item>
  );
}