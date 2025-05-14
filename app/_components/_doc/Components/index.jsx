"use client";
import { Section } from "@/app/_components/_doc";
import ButtonDoc from "./ButtonDoc";
import ModalDoc from "./ModalDoc";
import ErrorAlertDoc from "./ErrorAlertDoc";
import AlertDoc from "./AlertDoc";
import LoadingDoc from "./LoadingDoc";
import AnchorDoc from "./AnchorDoc";
import DropdownDoc from "./DropdownDoc";
import SelectDropdownDoc from "./SelectDropdownDoc";
import AccordionDoc from "./AccordionDoc";
import PaginationDoc from "./PaginationDoc";

export default function Components() {
  return (
    <div>
      <Section title={"Componentes"}>
        <ButtonDoc />
        <AnchorDoc />
        <ModalDoc />
        <ErrorAlertDoc />
        <AlertDoc />
        <LoadingDoc />
        <DropdownDoc />
        <SelectDropdownDoc />
        <AccordionDoc />
        <PaginationDoc />
      </Section>
    </div>
  );
}
