import { ICategory } from "@/types";
import SearchComponent from "./SearchComponent";

interface CategoryComponentProps {
  categories: ICategory[];
  onCategorySelect: (slug: string) => void;
}

const CategoryComponent = ({
  categories,
  onCategorySelect,
}: CategoryComponentProps) => {
  return (
    <div className="mt-4">
      <SearchComponent  />
      <div className="p-4 border rounded-lg shadow-xl mt-6">
        <h2 className="text-lg font-bold mb-4 ">Danh mục sản phẩm</h2>
        <ul>
          <li className="mb-2">
            <button
              onClick={() => onCategorySelect("")}
              className="font-semibold"
            >
              Tất cả sản phẩm
            </button>
          </li>
          {categories.map((category) => (
            <li key={category._id} className="mb-2">
              <button onClick={() => onCategorySelect(category.slug || "")}>
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryComponent;
