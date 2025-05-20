"use client";
import { Paragraph1, Paragraph2 } from "@/app/_components/Typography";
import "./style.scss";
import { useState } from "react";
import { Button } from "@/app/_components";
import { Form, Input, Select, TextArea } from "@/app/_components/Form";

export default function PaperDetails({ data, isNew }) {
  const [formData, setFormData] = useState(data);

  const updateFormData = (value) => {
    setFormData((state) => ({ ...state, ...value }));
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <Paragraph2>
            You can fill paper fields or just import data from another format
          </Paragraph2>
        </div>
      </div>
      <div className="row mt-32 mb-20">
        <div className="col-12">
          <Paragraph1>Paper data</Paragraph1>
          <hr />
        </div>
      </div>
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
              name="title"
              label="Title"
              type="text"
              placeholder="Type paper title"
              required
            />
          </div>
          <div className="col-12 col-lg-6">
            <Input
              name="authors"
              label="Authors"
              type="text"
              placeholder="Type paper authors"
              required
            />
          </div>
        </div>
        <div className="row mt-20">
          <div className="col-12">
            <TextArea
              label="Abstract"
              name="abstract"
              placeholder="Type paper abstract"
              rows={5}
              required
            />
          </div>
        </div>
        <div className="row mt-20">
          <div className="col-12 col-lg-8">
            <Input
              name="keywords"
              label="Keywords"
              type="text"
              placeholder="Type paper keywords"
              required
            />
          </div>
          <div className="col-8 col-lg-4">
            <Input
              name="publishDate"
              label="Publish date"
              type="date"
              placeholder="Type paper keywords"
              required
            />
          </div>
        </div>
        <div className="row mt-20">
          <div className="col-12 col-lg-8">
            <Input
              name="publisher"
              label="Journal or Conference"
              type="text"
              placeholder="Type paper publisher"
              required
            />
          </div>
        </div>
        <div className="row mt-20">
          <div className="col-8 col-lg-6">
            <Select
              name="type"
              label="Paper type"
              placeholder="Select paper type"
              isValueDefault={false}
              required
            >
              <option>Article</option>
            </Select>
          </div>
        </div>
      </Form>
    </>
  );
}
