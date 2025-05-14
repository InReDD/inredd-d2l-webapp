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
import InputMask from "./InputMask";
import masks from "@/helpers/masks";

const Input = forwardRef(function Input(
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
    mask,
    button,
    classNameError,
    disabled = false,
    maxLength = 255,
    enableDebounce = false,
    debounceTime = 700,
    type = "text",
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
    type,
    placeholder,
    required,
    autoComplete,
    min,
    max,
    pattern,
    readOnly,
    maxLength,
    mask,
    disabled,
    id: inputId,
    className: classNames("form-control", className),
  };

  if (!notPropsStateForValue.current || enableDebounce || mask) {
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
            text={label}
          />
        )}
        {mask && masks?.[mask?.name] ? (
          <InputMask {...sharedProps} />
        ) : (
          <input {...sharedProps} />
        )}
        {button}
        {!disableValidation && (
          <Error className={classNameError} msg={errorMessage} />
        )}
      </div>
    </>
  );
});

export default Input;
