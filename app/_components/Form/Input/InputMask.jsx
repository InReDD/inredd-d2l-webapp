"use client";

import masks from "@/helpers/masks";
import "./style.scss";
import { useEffect, useRef, useState } from "react";
import { IMaskInput } from "react-imask";

export default function InputMask({
  id,
  name,
  placeholder,
  type,
  className,
  onChange,
  onBlur,
  required,
  disabled,
  min,
  max,
  pattern,
  readOnly,
  mask,
  autoComplete,
  value = "",
  maxLength = 255,
}) {
  const selectedMask = masks[mask?.name];
  const maskConfig =
    typeof selectedMask?.config === "function"
      ? selectedMask?.config(value)
      : selectedMask?.config;

  const inputRef = useRef();
  const ref = useRef();
  const [valueWithMask, setValueWithMask] = useState(`${value}`);

  const setValueChange = (e) => {
    const value = e.target.value;
    const valueWithoutMask = clearMaskValue(value);

    setValueWithMask(value);

    if (e) {
      e.target.valueWithoutMask = valueWithoutMask;
      onChange(e);
    }
  };

  const clearMaskValue = (value) => {
    if (selectedMask.unmaskValue) {
      try {
        const unmasked = selectedMask.unmaskValue(value);

        if (type === "number") {
          const t = /^-?\d+\.\d+$/.test(unmasked)
            ? parseFloat(unmasked) || 0.0
            : parseInt(unmasked) || 0;

          return t;
        }

        return unmasked;
      } catch (error) {
        return value;
      }
    }
    return null;
  };

  const sharedProps = {
    id: id || name,
    type: "text",
    onChange: (e) => setValueChange(e),
    onPaste: (e) => setTimeout(() => setValueChange(e)),
    onComplete: (e) =>
      setTimeout(() => setValueChange({ target: { value: e } })),
    autoComplete: autoComplete || `new-${type}`,
    value: valueWithMask || "",
    onBlur,
    className,
    disabled,
    min,
    max,
    required,
    readOnly,
    pattern,
    maxLength,
    name,
    placeholder,
  };

  useEffect(() => {
    const cleanedValue = clearMaskValue(value);
    setValueWithMask(`${cleanedValue}`);
  }, [value]);

  if (!maskConfig) return;

  return (
    <IMaskInput
      {...sharedProps}
      {...maskConfig}
      unmask={false}
      ref={ref}
      inputRef={inputRef}
      pattern={pattern ?? selectedMask.pattern}
    />
  );
}
