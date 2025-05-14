"use client";
import "./style.scss";
import { Error, Label } from "@/components/Form";
import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import classNames from "classnames";

const TextArea = forwardRef(function TextArea(
  {
    id,
    name,
    className,
    value,
    placeholder,
    label,
    onChange,
    onBlur,
    onKeyDown,
    onChangeDebounce,
    required,
    autoComplete,
    min,
    max,
    pattern,
    readOnly,
    rows,
    button,
    classNameError,
    disabled = false,
    maxLength = 255,
    enableDebounce = false,
    debounceTime = 700,
    errorMessage = "Preencha o campo corretamente",
    disableValidation = false,
  },
  ref,
) {
  const _inputId = useId();
  const inputId = id || _inputId;
  const firstUpdate = useRef(true); // previne disparar o evento quando a página é carregada
  const notPropsStateForValue = useRef(
    (value === undefined || value === "") &&
      onChange === undefined &&
      onKeyDown === undefined,
  );

  const [valueForNotPropsState, setValueForNotPropsState] = useState("");

  const executeOnChangeDebounce = useCallback(() => {
    if (enableDebounce && !!onChangeDebounce) {
      onChangeDebounce(
        !notPropsStateForValue.current ? value : valueForNotPropsState,
      );
    }
  }, [enableDebounce, onChangeDebounce, value, valueForNotPropsState]);

  const handleOnChange = (e) => {
    if (!notPropsStateForValue.current) {
      onChange(e);
    } else {
      setValueForNotPropsState(e.target?.value || "");
    }
  };

  const handleOnKeyDown = (e) => {
    if (onKeyDown) {
      if (!notPropsStateForValue.current) {
        onKeyDown(e);
      } else {
        setValueForNotPropsState(e.target?.value || "");
      }
    }
  };

  const handleOnBlur = (e) => {
    onBlur && onBlur(e);
  };

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    const timeout = setTimeout(() => executeOnChangeDebounce(), debounceTime);
    return () => clearTimeout(timeout);
  }, [value, valueForNotPropsState]);

  const sharedProps = {
    ref,
    name,
    placeholder,
    required,
    autoComplete,
    min,
    max,
    pattern,
    readOnly,
    maxLength,
    rows,
    disabled,
    id: inputId,
    className: classNames("form-control", className),
  };

  if (!notPropsStateForValue.current || enableDebounce) {
    sharedProps.onBlur = handleOnBlur;
    sharedProps.onChange = handleOnChange;
    sharedProps.value = !notPropsStateForValue.current
      ? value
      : valueForNotPropsState;
    if (onKeyDown) {
      sharedProps.onKeyDown = handleOnKeyDown;
    }
  }

  return (
    <>
      <div className="form-item input-item">
        {label && (
          <Label
            htmlFor={inputId}
            text={label + ((!required && " (optional)") || "")}
          />
        )}
        <textarea {...sharedProps} />
        {button}
        {!disableValidation && (
          <Error className={classNameError} msg={errorMessage} />
        )}
      </div>
    </>
  );
});

export default TextArea;
