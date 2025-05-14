"use client";
import { Section } from "@/app/_components/_doc";
import InputDoc from "./InputDoc";
import FormDoc from "./FormDoc";
import SelectDoc from "./SelectDoc";
import CheckBoxDoc from "./CheckBoxDoc";
import RadioDoc from "./RadioDoc";
import InputButtonDoc from "./InputButtonDoc";

export default function Forms() {
  return (
    <div>
      <Section title={"Formulários"}>
        <FormDoc />
        <InputDoc />
        <SelectDoc />
        <InputButtonDoc />
        <CheckBoxDoc />
        <RadioDoc />
      </Section>
    </div>
  );
}
