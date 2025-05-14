import "./style.scss";
import { Paragraph1, Paragraph2 } from "@/app/_components/Typography";
import Link from "next/link";
import Image from "next/image";
import { useId } from "react";
import { ProfilePicture } from "@/app/_components";

export default function MemberResult({ data }) {
  const id = useId();

  return (
    <div className="member-result col-12 d-flex flex-column flex-md-row align-items-center align-items-md-start text-center text-md-start">
      <ProfilePicture
        src={data.profilePicture}
        name={data.name}
        size={"medium-large"}
        className={"mb-10 mb-lg-0"}
      />
      <div className="ms-0 ms-md-3 w-100">
        <Paragraph1 className="paper-title">
          <Link href={"/"} target="_blank">
            {data.title} {data.title}
          </Link>
        </Paragraph1>
        <Paragraph2 className="mb-24">{data.institution}</Paragraph2>
        <Paragraph2 className="mb-8">{data.resume}</Paragraph2>
        <div className="d-flex justify-content-between flex-column-reverse flex-lg-row">
          <button
            className="btn"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#abstract-${id}`}
            aria-expanded="false"
            aria-controls={`abstract-${id}`}
          >
            Show more
            <Image
              src="/icons/arrow-down.png"
              alt="Arrow Down"
              width={16}
              height={18}
              className="ml-10"
            />
          </button>
        </div>
        <div className="collapse" id={`abstract-${id}`}>
          <div className="card card-body">{data.showMore}</div>
        </div>
      </div>
    </div>
  );
}
