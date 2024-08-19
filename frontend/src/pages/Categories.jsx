import React from "react";

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
      <div className="min-w-full p-8">
        <div className="border border-zinc-800 rounded-md max-h-96 overflow-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
          {categories.map((category) => (
            <div
              onClick={() => {
                setShowModal(true);
                setModalContent(4);
                setCategoryIdToUpdate(category._id);
              }}
              className="w-full py-0.5 border-b last:border-none border-gray-200 rounded-sm flex items-center hover:bg-gray-100 text-sm"
              key={category._id}
            >
              <div className="w-36 mx-4 text-zinc-800">{category.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
