"use client";
import "./styles.scss";
import { useEffect, useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import { ButtonLink } from "@/app/_components";
import { SubTitle } from "@/app/_components/Typography";

export default function Modal({
  id,
  size,
  title,
  subTitle,
  footer,
  children,
  onHideModal,
  onShowModal,
  modal,
  setModal,
  shadow = true,
  scrollContent = true,
  closeButton = true,
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (setModal) {
      const bootstrap = require("bootstrap/dist/js/bootstrap.bundle.min.js");
      setModal(new bootstrap.Modal(`#${id}`));
    }
  }, [setModal]);

  useEffect(() => {
    if (modal) {
      const onHide = () => {
        setShow(false);
        onHideModal && onHideModal();
      };
      const onShow = () => {
        setShow(true);
        onShowModal && onShowModal();
      };

      modal._element.addEventListener("hidden.bs.modal", onHide);
      modal._element.addEventListener("show.bs.modal", onShow);

      return () => {
        modal?.hide();
        modal._element.removeEventListener("hidden.bs.modal", onHide);
        modal._element.removeEventListener("show.bs.modal", onShow);
      };
    }
  }, [modal, onShowModal, onHideModal]);

  useEffect(() => {
    if (modal) {
      modal._element.querySelector(".modal-body").scrollTop = 0;
    }
  }, [show, modal]);

  return (
    <div id={id} className="modal-static" tabIndex="-1">
      <div
        className={`modal-dialog modal-dialog-centered${
          scrollContent ? " modal-dialog-scrollable" : ""
        } ${size ? size : ""}`}
      >
        <div
          className="modal-content"
          style={{
            boxShadow: shadow ? "4px 4px 10px 0px rgba(0, 0, 0, 0.25)" : null,
          }}
        >

          <div className={classNames("modal-header", "justify-content-center", { "no-pb": !children })}>
            {title && (
              <SubTitle className="mt-28 mb-24 w-100 text-neutral-1 text-center fw-semibold">
                {title}
            </SubTitle>
            )}
            <div className="d-flex justify-content-center w-100">
              <div className="hline mt-0 mb-0"></div>
            </div>
            {closeButton && (
              <div className="position-absolute top-0 end-0">
                <button
                  type="button"
                  className="cuttom-close-button"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <Image
                    className="png"
                    src={"/icons/fechar.png"}
                    width={13}
                    height={15}
                    alt="Close modal"
                  />
                </button>
              </div>
            )}
            <p className="mt-40 mb-80 modal-subTitle w-100 text-center text-neutral-1">
              {subTitle}
            </p>
          </div>

          <div className="modal-body d-flex flex-column">{show && children}
          <div className="hline mt-0 mb-0 "></div>
          <div className="mb-32 mt-24 d-flex justify-content-center justify-content-md-end">
              <ButtonLink href="/" className="btn-orange" size={"medium"}>
                Close
              </ButtonLink>
            </div>
          </div>
          {footer && (
            <div className="modal-footer d-flex justify-content-center align-items-center">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
