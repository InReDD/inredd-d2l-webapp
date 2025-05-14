"use client";
import { Paragraph1, Title } from "@/app/_components/Typography";
import "./style.scss";
import { Error, Form, Input, Select, TextArea } from "@/app/_components/Form";
import { Button, ProfilePicture, SearchInput } from "@/app/_components";
import { useState } from "react";
import { DateTime } from "luxon";

export default function PersonalData() {
  const [isMember, setIsMember] = useState(true);

  return (
    <main id="personal-data">
      <div className="row mb-20">
        <div className="col-12">
          <Title>Personal data</Title>
        </div>
      </div>
      <Form>
        <div className="row">
          <div className="col-12 col-lg-8 order-2 order-lg-1">
            <div className="row mb-20 mt-32 mt-lg-0">
              <div className="col-6">
                <Input
                  name="firstName"
                  label="First name"
                  type="text"
                  placeholder="Your first name"
                  required
                />
              </div>
              <div className="col-6">
                <Input
                  name="lastName"
                  label="Last name"
                  type="text"
                  placeholder="Your last name"
                  required
                />
              </div>
            </div>
            <div className="row mb-20">
              <div className="col-6">
                <Input
                  name="email"
                  label="E-mail"
                  type="text"
                  placeholder="example@example.com"
                  required
                />
              </div>
              <div className="col-6">
                <Input
                  name="contact"
                  label="Contact"
                  type="text"
                  placeholder="Your contact"
                  required
                />
              </div>
            </div>
            <div className="row mb-20">
              <div className="col-6 col-lg-4">
                <Select
                  name="country"
                  label="Country"
                  placeholder="Select"
                  isValueDefault={false}
                  required
                >
                  <option value="Brazil">Brazil</option>
                </Select>
              </div>
            </div>
            <div className="row mb-20">
              <div className="col-6">
                <Input
                  name="state"
                  label="State"
                  type="text"
                  placeholder="Your state"
                  required
                />
              </div>
              <div className="col-6">
                <Input
                  name="city"
                  label="City"
                  type="text"
                  placeholder="Your city"
                  required
                />
              </div>
            </div>
            <div className="row mb-20">
              <div className="col-6">
                <Input
                  name="address"
                  label="Address"
                  type="text"
                  placeholder="Your address"
                  required
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4 order-1 order-lg-2">
            <div className="row">
              <div className="col-12 d-flex flex-column align-items-center align-items-lg-end">
                <label className="form-label align-self-start">
                  Public picture
                </label>
                <ProfilePicture src={null} name={"Camila Tirapeli"} canEdit />
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-32 mb-20">
          <div className="col-12">
            <Paragraph1>Academic</Paragraph1>
            <hr />
          </div>
        </div>
        <div className="row mb-20">
          <div className="col-12 col-lg-6">
            <Input
              name="title"
              label="Title"
              type="text"
              placeholder="Your Instituition title"
              required
            />
          </div>
          <div className="col-12 col-lg-6 mt-20 mt-lg-0">
            <Input
              name="institution"
              label="Search for your Instituition"
              type="text"
              placeholder="Your Instituition"
              required
            />
          </div>
        </div>
        <div className="row mb-32">
          <div className="col-12 col-lg-6">
            <label className="form-label">Curriculum Lattes ID</label>
            <SearchInput placeholder="Search" disableOptions />
          </div>
          <div className="col-6">
            <Error>Curriculum Lattes Not Found.</Error>
          </div>
        </div>
        <div className="row mb-32">
          <div className="col-12">
            <TextArea name="resume" placeholder="Your Resume here" rows={5} />
          </div>
        </div>
        {isMember && (
          <>
            <div className="row mt-32 mb-20">
              <div className="col-12">
                <Paragraph1>InReDD member</Paragraph1>
                <hr />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <p>
                  You are a InReDD member as{" "}
                  <strong>Coordinating Professors</strong> since{" "}
                  {DateTime.fromJSDate(new Date()).toFormat("dd/MM/yyyy")}.
                </p>
              </div>
            </div>
          </>
        )}
        <div className="row mt-32">
          <div className="col-12 d-flex justify-content-between">
            <Button className={"mr-16"} size={"small"} variant={"error"}>
              Delete my profile
            </Button>
            <Button type={"submit"} size={"small"}>
              Save changes
            </Button>
          </div>
        </div>
      </Form>
    </main>
  );
}
