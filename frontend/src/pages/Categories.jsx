import React from "react";
import { FolderPlus } from "lucide-react";

const Categories = ({
  categories,
  setShowModal,
  setModalContent,
  setCategoryIdToUpdate,
}) => {
  return (
    <div>
      <div className="w-full border-b border-zinc-200 py-8 px-8 font-semibold text-2xl flex justify-between items-center gap-2">
        <div className="me-auto">Categorie</div>
        <div
          onClick={() => {
            setShowModal(true);
            setModalContent(3);
          }}
          className="text-sm cursor-pointer text-center bg-zinc-800 text-white rounded-md py-[5.2px] px-4"
        >
          Crea nuova
        </div>
      </div>
      <div className="min-w-full p-5 lg:p-8">
        <div className="border border-zinc-400 lg:border-zinc-800 rounded-md overflow-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
          {categories.length > 0 ? (
            categories.map((category) => (
              <div
                onClick={() => {
                  setShowModal(true);
                  setModalContent(4);
                  setCategoryIdToUpdate(category._id);
                }}
                className="w-full py-2 px-4 lg:py-0.5 border-b last:border-none border-gray-200 rounded-sm flex items-center justify-between hover:bg-gray-100 text-sm"
                key={category._id}
              >
                <div className="w-36 text-zinc-800">
                  {category.name} : {category._id}
                </div>
                <div
                  style={{ backgroundColor: category.hexColor }}
                  className="h-5 w-5 rounded-md"
                ></div>
              </div>
            ))
          ) : (
            <div
              onClick={() => {
                setShowModal(true);
                setModalContent(3);
              }}
              className="flex flex-col items-center justify-center my-10 gap-5 cursor-pointer"
            >
              <p className="font-semibold">Nessuna categoria</p>
              <FolderPlus size={30} className="animate-bounce" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
