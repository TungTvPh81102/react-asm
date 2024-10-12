import { useState, useContext } from "react";
import { ProductContext, ProductContextType } from "@/contexts/ProductContext";
import { useNavigate } from "react-router-dom";

const FilterComponent = () => {
  const nav = useNavigate();
  const [sortOption, setSortOption] = useState("default");
  const { sortProducts } = useContext(ProductContext) as ProductContextType;

  const handleSortChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    setSortOption(selectedOption);
    await sortProducts(selectedOption);
    nav(`/shop?sort=${selectedOption}`);
  };

  return (
    <div className="">
      <div className="mb-4">
        <select
          id="sort"
          value={sortOption}
          onChange={handleSortChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="default">Mặc định</option>
          <option value="nameAsc">Từ A-Z</option>
          <option value="nameDesc">Từ Z-A</option>
          <option value="priceAsc">Giá: Từ thấp đến cao</option>
          <option value="priceDesc">Giá: Từ cao đến thấp</option>
        </select>
      </div>
    </div>
  );
};

export default FilterComponent;
