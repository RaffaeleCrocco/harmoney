import React from "react";
import CreateTransaction from "../modals/CreateTransaction";
import UpdateTransaction from "../modals/UpdateTransaction";
import CreateCategory from "../modals/CreateCategory";
import UpdateCategory from "../modals/UpdateCategory";

const Modal = ({
  setShowModal,
  modalContent,
  categories,
  transactionId,
  categoryId,
}) => {
  let renderedContent;
  switch (modalContent) {
    case 1:
      renderedContent = (
        <CreateTransaction
          categories={categories}
          setShowModal={setShowModal}
        />
      );
      break;
    case 2:
      renderedContent = (
        <UpdateTransaction
          categories={categories}
          setShowModal={setShowModal}
          transactionId={transactionId}
        />
      );
      break;
    case 3:
      renderedContent = <CreateCategory setShowModal={setShowModal} />;
      break;

    case 4:
      renderedContent = (
        <UpdateCategory setShowModal={setShowModal} categoryId={categoryId} />
      );
      break;
    default:
      renderedContent = <div>Default content</div>;
  }

  return (
    <div
      className="absolute top-0 left-0 h-screen w-screen bg-opacity-20 bg-black"
      onClick={() => setShowModal(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="lg:w-96 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-80 lg:-translate-y-1/2 z-50 bg-white rounded-md p-6"
      >
        {renderedContent}
      </div>
    </div>
  );
};

export default Modal;
