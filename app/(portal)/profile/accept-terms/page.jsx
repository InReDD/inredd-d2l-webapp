"use client";

import { Title } from "@/app/_components/Typography";
import "./style.scss";
import { Button, Editor } from "@/app/_components";
import { useRef, useState } from "react";

export default function AcceptTerms() {
  const initialValue = "Accept terms!";
  const editorRef = useRef();

  const [text, setText] = useState(initialValue ?? "");

  const onClick = () => {
    console.log(editorRef.current.getContent(), text);
  };

  return (
    <main id="accept-terms">
      <div className="row mb-20">
        <div className="col-12">
          <Title>Accept Terms</Title>
        </div>
      </div>
      <div className="row mb-24">
        <div className="col-12 d-flex justify-content-end">
          <Button size={"small"} onClick={onClick}>
            Confirm
          </Button>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Editor
            id={"accept-terms-editor"}
            ref={editorRef}
            value={text}
            initialValue={initialValue}
            onEditorChange={(newValue) => setText(newValue)}
            onInit={(evt, editor) => (editorRef.current = editor)}
          />
        </div>
      </div>
    </main>
  );
}
