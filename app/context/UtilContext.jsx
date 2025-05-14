"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Button } from "@/components";
import Image from "next/image";
import classNames from "classnames";

const UtilContext = createContext({});
const ALERT = {
  title: null,
  message: null,
  closeButton: null,
  confirmButton: null,
  shadow: null,
  onClose: null,
  onConfirm: null,
  onExitButton: null,
  show: false,
  size: null,
};
const LOADING = {
  show: false,
  shadow: false, // para usar dentro de modais
};

function AlertModal({
  modal,
  title,
  text,
  confirmButton,
  onConfirm,
  onClose,
  onExitButton,
  shadow = true,
  hideCloseButton = false,
  closeButton = "Close",
  size = "lg",
}) {
  return (
    <div
      id={"alert-modal"}
      className="modal fade"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      style={{ zIndex: 5000 }}
    >
      <div className={`modal-dialog modal-dialog-centered modal-${size}`}>
        <div
          className="modal-content"
          style={{
            boxShadow: shadow ? "4px 4px 10px 0px rgba(0, 0, 0, 0.25)" : null,
          }}
        >
          <div className={classNames("modal-header", { "no-pb": !text })}>
            <div>
              <button
                type="button"
                className="cuttom-close-button"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <Image
                  className="svg"
                  src={"/icons/fechar.png"}
                  width={16}
                  height={16}
                  alt={"Close modal"}
                />
              </button>
            </div>
            <p
              id="exampleModalLabel"
              className="modal-title w-100 text-center text-neutral-1"
            >
              {title}
            </p>
          </div>
          {text && (
            <div className="modal-body">
              <p className={"text-center"}>{text || ""}</p>
            </div>
          )}
          <div className="modal-footer d-flex justify-content-center align-items-center">
            {!hideCloseButton && (
              <Button
                type="button"
                variant={"black"}
                dataBsDismiss="modal"
                {...(onClose ? { onClick: onClose } : {})}
              >
                {closeButton}
              </Button>
            )}
            {confirmButton && (
              <Button
                type="button"
                dataBsDismiss="modal"
                onClick={onConfirm}
                className={"ms-xs"}
              >
                {confirmButton}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const UtilContextProvider = ({ children }) => {
  const [modalLoading, setModalLoading] = useState();
  const [modalAlert, setModalAlert] = useState();
  const [alertState, setAlertState] = useState(ALERT);
  const [loadingState, setLoadingState] = useState(LOADING);

  useEffect(() => {
    const bootstrap = require("bootstrap/dist/js/bootstrap.bundle.min.js");
    setModalLoading(new bootstrap.Modal("#loading-modal"));
    setModalAlert(new bootstrap.Modal("#alert-modal"));
  }, []);

  useEffect(() => {
    if (modalAlert && modalAlert._element) {
      if (alertState.show) {
        modalAlert?.show();
      }

      const handleClose = () => {
        alertState.onExitButton && alertState.onExitButton();
      };

      modalAlert._element.addEventListener("hide.bs.modal", handleClose);
      return () =>
        modalAlert._element.removeEventListener("hide.bs.modal", handleClose);
    }
  }, [modalAlert, alertState]);

  useEffect(() => {
    if (modalLoading && modalLoading._element) {
      if (loadingState.show) {
        modalLoading?.show();
      } else {
        setTimeout(() => {
          modalLoading?.hide();
        }, 500);
      }
    }
  }, [modalLoading, loadingState]);

  const showAlert = ({
    title,
    message,
    closeButton,
    confirmButton,
    shadow,
    onClose,
    onConfirm,
    onExitButton,
    size,
    debounce,
    hideCloseButton,
  }) => {
    const setState = () =>
      setAlertState({
        title,
        message,
        closeButton,
        confirmButton,
        shadow,
        onClose,
        onConfirm,
        onExitButton,
        hideCloseButton,
        size,
        show: true,
      });

    if (debounce) {
      // debounce modal open after some other confirm modal
      setTimeout(setState, 1000);
    } else {
      setState();
    }
  };

  const showErrorAlert = ({
    shadow,
    title = "Something went wrong!",
    message = "Ocorreu um erro inexperado.\nTente novamente mais tarde.",
  }) => {
    setAlertState({
      message,
      shadow,
      title,
      closeButton: "Close",
      show: true,
    });
  };

  const setLoading = ({ show, shadow }) => {
    setLoadingState({
      show,
      shadow,
    });
  };

  const ModalLoading = () => (
    <div
      className="modal fade"
      id="loading-modal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content bg-transparent border-0">
          <div className="modal-body d-flex flex-column justify-content-center align-items-center">
            <h2 className={"text-neutral-2"}>Carregando...</h2>
            <div className="spinner-border text-light mt-nano" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <UtilContext.Provider
      value={{
        setLoading,
        showAlert,
        showErrorAlert,
      }}
    >
      <AlertModal
        modal={modalAlert}
        title={alertState.title}
        text={alertState.message}
        closeButton={alertState.closeButton}
        confirmButton={alertState.confirmButton}
        shadow={alertState.shadow}
        onConfirm={alertState.onConfirm}
        hideCloseButton={alertState.hideCloseButton}
        {...(alertState.onExitButton
          ? { onExitButton: alertState.onExitButton }
          : {})}
        {...(alertState.onClose ? { onClose: alertState.onClose } : {})}
        size={alertState.size}
      />
      <ModalLoading />
      {children}
    </UtilContext.Provider>
  );
};

export const useUtilContext = () => useContext(UtilContext);
