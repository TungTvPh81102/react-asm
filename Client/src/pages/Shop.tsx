import CategoryComponent from "@/components/CategoryComponent ";
import ProductList from "@/components/ProductList";
import {
  CategoryContext,
  CategoryContextType,
} from "@/contexts/CategoryContext";
import { ProductContext, ProductContextType } from "@/contexts/ProductContext";
import { useContext, useEffect, useState } from "react";

const Shop = () => {
  const { state: categories } = useContext(
    CategoryContext
  ) as CategoryContextType;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { fetchProductsByCategory } = useContext(
    ProductContext
  ) as ProductContextType;

  useEffect(() => {
    fetchProductsByCategory(selectedCategory);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  return (
    <div className="p-4 mx-auto lg:max-w-7xl mt-[150px]">
      <div className="grid grid-cols-[300px,minmax(0,1fr)]">
        <div >
          <CategoryComponent
            categories={categories.categories}
            onCategorySelect={(slug) => setSelectedCategory(slug)}
          />
        </div>
        <div> 
          <ProductList isHome />
        </div>
      </div>
    </div>
  );
};

export default Shop;
