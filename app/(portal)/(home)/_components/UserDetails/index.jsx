"use client";
import { Button, ProfilePicture } from "@/app/_components";
import "./style.scss";
import { DateTime } from "luxon";
import { useState } from "react";
import { CheckBox } from "@/app/_components/Form";
import { AiOutlineCopy } from "react-icons/ai";

function CopyButton({ dataToCopy }) {
  const onClick = () => {
    navigator.clipboard.writeText(dataToCopy);
  };

  if (!dataToCopy) {
    return null;
  }

  return (
    <button
      className="btn-copy ml-4"
      onClick={onClick}
      title="Copy to clipboard"
    >
      <AiOutlineCopy />
    </button>
  );
}

export default function UserDetails({ data, noEdit = false }) {
  const isMember = !!data.group;
  const canEdit = !noEdit && isMember && true;

  const [formData, setFormData] = useState(data);

  const updateFormData = (value) => {
    setFormData((state) => ({ ...state, ...value }));
  };

  return (
    <>
      <div className="row">
        <div className="col-12 col-lg-9">
          <div className="d-flex align-items-center">
            <ProfilePicture src={data.src} name={data.name} size={"medium"} />
            <div className="ml-16">
              <p>
                <strong>
                  {data.title} {data.name}
                </strong>
              </p>
              <p>{data.instituition}</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-3 d-flex justify-content-end">
          <Button size={"small"}>Export as PDF</Button>
        </div>
      </div>
      <div className="row mt-24">
        <div className="col-6 col-lg-4 mt-10 mt-lg-0">
          <p>
            <strong>Address</strong>
          </p>
          <p>{data.address || "-"}</p>
        </div>
        <div className="col-6 col-lg-4 mt-10 mt-lg-0">
          <p>
            <strong>E-mail</strong>
          </p>
          <p>
            {data.email || "-"} <CopyButton dataToCopy={data.email} />
          </p>
        </div>
        <div className="col-6 col-lg-4 mt-10 mt-lg-0">
          <p>
            <strong>Contact</strong>
          </p>
          <p>
            {data.contact || "-"}
            <CopyButton dataToCopy={data.contact} />
          </p>
        </div>
      </div>
      <div className="row mt-24">
        <div className="col-6 col-lg-4 mt-10 mt-lg-0">
          <p>
            <strong>Signed to InReDD on</strong>
          </p>
          <p>{DateTime.fromISO(data.createdAt).toFormat("LLLL dd, yyyy")}</p>
        </div>
        {isMember && (
          <>
            <div className="col-6 col-lg-4 mt-10 mt-lg-0">
              <p>
                <strong>InReDD member since</strong>
              </p>
              <p>
                {DateTime.fromISO(data.groupSignedAt).toFormat("LLLL dd, yyyy")}
              </p>
            </div>
            <div className="col-6 col-lg-4 mt-10 mt-lg-0">
              <p>
                <strong>Group</strong>
              </p>
              <p>{data.groupName}</p>
            </div>
          </>
        )}
      </div>
      <div className="row mt-24">
        <div className="col-6 col-lg-4 mt-10 mt-lg-0">
          <p>
            <strong>Curricullum Imported</strong>
          </p>
          <p>{data.resumeImported ? "Yes" : "No"}</p>
        </div>
        <div className="col-6 col-lg-4 mt-10 mt-lg-0">
          <p>
            <strong>Curricullum Lattes ID</strong>
          </p>
          <p>
            {data.resumeId || "-"}
            <CopyButton dataToCopy={data.resumeId} />
          </p>
        </div>
      </div>
      <div className="row mt-24">
        <div className="col-12">
          <p>
            <strong>Bio</strong>
          </p>
          <p>{data.bio || "-"}</p>
        </div>
      </div>
      <div className="row mt-24">
        <div className="col-12">
          <p>
            <strong>Access to solutions</strong>
          </p>
          <CheckBox
            className={"mt-12"}
            name="open-data"
            disabled={!canEdit}
            checked={formData.hasAccessToOpenData}
            onChange={({ target }) =>
              updateFormData({ hasAccessToOpenData: target.checked })
            }
          >
            Open data
          </CheckBox>
          <CheckBox
            className={"mt-8"}
            name="d2l"
            disabled={!canEdit}
            checked={formData.hasAccessToD2L}
            onChange={({ target }) =>
              updateFormData({ hasAccessToD2L: target.checked })
            }
          >
            Dental Second Look
          </CheckBox>
        </div>
      </div>
    </>
  );
}
