export const handleCategoriesTag = (categoryIds, categories) => {
  return categoryIds.map((id) => {
    const category = categories.find((category) => category._id === id);
    return category
      ? { name: category.name, hexColor: category.hexColor }
      : { name: "Eliminata", hexColor: "#dedede" };
  });
};
