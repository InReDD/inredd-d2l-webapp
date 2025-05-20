"use client";
import { Paragraph1 } from "@/app/_components/Typography";
import "./style.scss";
import { useState } from "react";
import { Button } from "@/app/_components";
import { CheckBox, Form, Input } from "@/app/_components/Form";
import permissions from "@/helpers/permissions";

const permissionsGroups = [
  {
    name: "Members",
    permissions: [
      permissions.LIST_MEMBERS,
      permissions.INVITE_MEMBERS,
      permissions.DELETE_MEMBERS,
      permissions.EDIT_MEMBERS,
    ],
  },
  {
    name: "Library",
    permissions: [permissions.MODERATE_PAPERS, permissions.UPLOAD_PAPERS],
  },
  {
    name: "Settings",
    permissions: [
      permissions.EDIT_ACCEPT_TERMS,
      permissions.EDIT_PRIVACY_POLICY,
    ],
  },
  {
    name: "Groups",
    permissions: [
      permissions.LIST_GROUPS,
      permissions.CREATE_GROUPS,
      permissions.DELETE_GROUPS,
      permissions.EDIT_GROUPS,
    ],
  },
  {
    name: "Solutions",
    permissions: [
      permissions.VIEW_OPEN_DATA_DASHBOARD,
      permissions.VIEW_D2L_DASHBOARD,
      permissions.MODERATE_ACCESS_REQUESTS,
      permissions.LIST_USERS,
      permissions.DELETE_USERS,
    ],
  },
];

export default function GroupDetails({ data, isNew }) {
  const [formData, setFormData] = useState(data);

  const updateFormData = (value) => {
    setFormData((state) => ({ ...state, ...value }));
  };

  return (
    <>
      <Form>
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <Button type="submit" size={"small"}>
              Confirm
            </Button>
          </div>
        </div>
        <div className="row mt-24">
          <div className="col-12 col-lg-6">
            <Input
              name="name"
              label="Group name"
              type="text"
              placeholder="Type group name"
              required
            />
          </div>
          {!isNew && (
            <div className="col-12 col-lg-6">
              <p>
                <strong>Members of group</strong>
              </p>
              <p>{10}</p>
            </div>
          )}
        </div>
        <div className="row mt-32 mb-20">
          <div className="col-12">
            <Paragraph1>Group permissions</Paragraph1>
            <hr />
          </div>
        </div>
        <div className="row">
          {permissionsGroups.map((group, index) => (
            <div className="col-12 col-lg-4 mb-24" key={index}>
              <Paragraph1 className={"fw-bold mb-12"}>{group.name}</Paragraph1>
              {group.permissions.map((permission, index) => (
                <CheckBox
                  key={index}
                  name="permissions"
                  value={permission.value}
                  className={"mb-12"}
                >
                  {permission.label}
                </CheckBox>
              ))}
            </div>
          ))}
        </div>
      </Form>
    </>
  );
}
