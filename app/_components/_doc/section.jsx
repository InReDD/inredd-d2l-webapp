import { useId } from "react";

export default function Section({ title, children }) {

  const elementId = useId();

  return (
    <div className="w-100 accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${elementId}`}
          aria-expanded="false"
          aria-controls="collapseTwo"
        >
          {title}
        </button>
      </h2>
      <div
        id={elementId}
        className="accordion-collapse collapse"
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body">{children}</div>
      </div>
    </div>
  );
}
