import Item from "../item";
import { Button } from '@/components';
import { loading } from './utilProps'
import { useUtilContext } from "@/app/context/UtilContext";

export default function LoadingDoc() {
  const code = () => `import { Button } from "@/components";
import { useUtilContext } from "@/app/context/UtilContext";

const { setLoading } = useUtilContext();

const onClick = () => {
  setLoading({ show: true });

  setTimeout(() => {
    setLoading({ show: false });
  }, 1000);
};

return (
  <Button onClick={onClick}>
    Iniciar carregamento por 1000ms
  </Button>
);
  `;

  const { setLoading } = useUtilContext();

  const onClick = () => {
    setLoading({ show: true });

    setTimeout(() => {
      setLoading({ show: false });
    }, 1000);
  };

  return (
    <Item
      name={"Carregamento"}
      description={"Carregamento para requisições assíncronas"}
      code={code()}
      props={loading}
    >
      <Button onClick={onClick}>
        Iniciar carregamento por 1000ms
      </Button>
    </Item>
  );
}