import { ProductContext, ProductContextType } from "@/contexts/ProductContext";
import { useContext } from "react";
import ProductItem from "./ProductItem";
import FilterComponent from "./FilterComponent ";

const ProductList = ({ isHome }: { isHome?: boolean }) => {
  const { state } = useContext(ProductContext) as ProductContextType;
  return (
    <div className="font-[sans-serif] bg-gray-100 mb-10 ml-6">
      <div className="p-4 mx-auto lg:max-w-7xl sm:max-w-full">
        <div className="flex justify-between">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-8">
            {isHome ? "Danh sách sản phẩm" : "Trending Products"}
          </h2>
          {isHome && <FilterComponent />}
        </div>
        {state.dataNotFound ? (
          <p>Không có sản phẩm cần tìm</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6">
            {state.products.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
