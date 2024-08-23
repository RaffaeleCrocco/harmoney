import { create } from "zustand";

const useContentStore = create((set) => ({
  //page of the dashboard
  content: 1,
  setContent: (content) => set({ content: content }),
  //modal content
  modalContent: 0,
  setModalContent: (content) => set({ modalContent: content }),
  //modal show
  showModal: false,
  setShowModal: () =>
    set((state) => ({
      showModal: !state.showModal,
    })),
}));

export default useContentStore;
