"use client";
import { Editor as Tiny } from "@tinymce/tinymce-react";
import { forwardRef } from "react";

const Editor = forwardRef(function Editor(
  { initialValue, minHeight, ...props },
  ref,
) {
  return (
    <Tiny
      ref={ref}
      apiKey={process.env.NEXT_PUBLIC_TINY_KEY}
      init={{
        min_height: minHeight || 500,
        plugins:
          "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
        toolbar:
          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
      }}
      initialValue={initialValue}
      {...props}
    />
  );
});

export default Editor;
