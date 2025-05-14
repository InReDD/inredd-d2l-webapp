import Item from "../item";
import { Button, Modal } from "@/components";
import { modalProps } from "./utilProps";
import { useState } from "react";
import { h1 } from "@/components/Typography";

export default function ModalDoc() {
  const code = () => `import { Button, Modal } from "@/components";
import { useState } from "react";
import { h1 } from "@/components/Typography";

const [modal, setModal] = useState();

const closeModal = () => {
  modal?.hide();
};

const showModal = () => {
  modal?.show();
};

return (
  <>
    <div className="d-flex flex-column">
      <Button
        dataBsTarget={'#modal-teste'}
        dataBsToggle={'modal'}
      >
        Abrir com BS
      </Button>
      <Button
        className={'mt-20'}
        onClick={showModal}
      >
        Abrir programaticamente
      </Button>
    </div>
    <Modal
      id={'modal-teste'}
      title={'Título do modal'}
      modal={modal}
      setModal={setModal}
      footer={(
        <Button onClick={closeModal}>Fechar</Button>
      )}
      closeButton
    >
      <h1>Ola mundo</h1>
    </Modal>
  </>
);
  `;
  const [modal, setModal] = useState();

  const closeModal = () => {
    modal?.hide();
  };

  const showModal = () => {
    modal?.show();
  };

  return (
    <Item
      name={"Modal"}
      description={"Elemento de modal"}
      code={code()}
      props={modalProps}
    >
      <div className="d-flex flex-column">
        <Button dataBsTarget={"#modal-teste"} dataBsToggle={"modal"}>
          Abrir com BS
        </Button>
        <Button className={"mt-20"} onClick={showModal}>
          Abrir programaticamente
        </Button>
      </div>
      <Modal
        id={"modal-teste"}
        title={"Título do modal"}
        modal={modal}
        setModal={setModal}
        footer={<Button onClick={closeModal}>Fechar</Button>}
        closeButton
      >
        <h1>Ola mundo</h1>
      </Modal>
    </Item>
  );
}
