import { CheckBox } from "@/app/_components/Form";
import "./style.scss";
import { Paragraph1, Paragraph2 } from "@/app/_components/Typography";
import Link from "next/link";
import Image from "next/image";
import { useId } from "react";

export default function PaperResult({ data }) {
  const id = useId();

  return (
    <div className="paper-result mb-20 d-flex">
      <CheckBox />
      <div className="content">
        <Paragraph1 className={"paper-title mb-8"}>
          <Link href={"/"} target="_blank">
            {data.title}
          </Link>
        </Paragraph1>
        <Paragraph2>{data.authors}</Paragraph2>
        <div className="d-flex justify-content-between mt-28 flex-column-reverse flex-lg-row">
          <button
            className="btn mt-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#abstract-${id}`}
            aria-expanded="false"
            aria-controls={`abstract-${id}`}
          >
            Abstract
            <Image
              src="/icons/arrow-down.png"
              alt="Arrow Down"
              width={16}
              height={18}
              className="ml-10"
            />
          </button>
          <Paragraph2 className={"mt-2"}>
            <span className="fw-bold">Keywords: </span>
            {data.keywords}
          </Paragraph2>
        </div>
        <div className="collapse" id={`abstract-${id}`}>
          <div className="card card-body">{data.crossref?.abstract}</div>
        </div>
      </div>
    </div>
  );
}
