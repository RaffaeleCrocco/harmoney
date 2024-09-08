import React from "react";
import CreateTransaction from "../modals/CreateTransaction";
import UpdateTransaction from "../modals/UpdateTransaction";
import CreateCategory from "../modals/CreateCategory";
import UpdateCategory from "../modals/UpdateCategory";
import useContentStore from "../store/useContentStore";
import FilterModal from "../modals/FilterModal";

const Modal = () => {
  const { setShowModal, modalContent } = useContentStore();
  let renderedContent;
  switch (modalContent) {
    case 1:
      renderedContent = <CreateTransaction />;
      break;
    case 2:
      renderedContent = <UpdateTransaction />;
      break;
    case 3:
      renderedContent = <CreateCategory />;
      break;
    case 4:
      renderedContent = <UpdateCategory />;
      break;
    case 5:
      renderedContent = <FilterModal />;
      break;
    default:
      renderedContent = <div>Default content</div>;
  }

  return (
    <div
      className="fixed z-30 top-0 left-0 h-full w-full bg-black/60 overflow-hidden"
      onClick={() => setShowModal()}
    >
      <div className="w-full lg:w-96 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-72 lg:-translate-y-1/2 z-50 p-5">
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-black dark:border dark:border-gray-600 dark:text-gray-200 rounded-md p-3 lg:p-1"
        >
          {renderedContent}
        </div>
      </div>
    </div>
  );
};

export default Modal;
