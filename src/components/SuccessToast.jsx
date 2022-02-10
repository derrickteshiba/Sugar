import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

export default function SuccessToast({ isOpen, onClose, children }) {
  return (
    <ToastContainer position="top-center">
      <Toast
        onClose={onClose}
        show={isOpen}
        variant="Light"
        delay={3000}
        autohide
      >
        <Toast.Header>
          <span className="mx-auto">{children}</span>
        </Toast.Header>
      </Toast>
    </ToastContainer>
  );
}
