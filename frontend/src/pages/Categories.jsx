import React, { useEffect, useState } from "react";
import { FolderPlus } from "lucide-react";
import useDataStore from "../store/useDataStore";
import useContentStore from "../store/useContentStore";

const Categories = () => {
  const { categories, setCategoryIdToUpdate, user } = useDataStore();
  const { setShowModal, setModalContent } = useContentStore();

  //component state
  const [isSimpleModeOn, setIsSimpleModeOn] = useState(false);

  useEffect(() => {
    setIsSimpleModeOn(user?.settings.isSimpleModeOn);
  }, [user]);

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
      <div className="p-5 lg:p-8">
        <div className="w-full border border-zinc-400 lg:border-zinc-800 rounded-md">
          {categories.length > 0 ? (
            categories.map((category) => (
              <div
                onClick={() => {
                  setShowModal(true);
                  setModalContent(4);
                  setCategoryIdToUpdate(category._id);
                }}
                className="w-full cursor-pointer py-2 lg:py-0.5 px-2 border-b last:border-none border-gray-200 rounded-sm flex items-center hover:bg-gray-100 text-sm"
                key={category._id}
              >
                <div className="w-36 text-zinc-800">{category.name}</div>
                {isSimpleModeOn ? (
                  ""
                ) : (
                  <div className="w-3/5 px-2 text-zinc-400 overflow-hidden truncate text-xs">
                    {category.description}
                  </div>
                )}
                <div
                  style={{ backgroundColor: category.hexColor }}
                  className="h-5 w-5 rounded-md ms-auto"
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
