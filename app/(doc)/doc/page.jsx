"use client";
import { h1 } from "@/app/_components/Typography";
import { Components, Forms } from "@/app/_components/_doc";

export default function Doc() {
  return (
    <main className={"container mt-32 mb-80"}>
      <div className="col-15">
        <div className={"mb-20"}>
          <h1 className={"text-neutral-1"}>
            Exemplos de usos de componentes
          </h1>
        </div>
        <div className="accordion" id="accordionExample">
          <Components />
          <Forms />
        </div>
      </div>
    </main>
  );
}
