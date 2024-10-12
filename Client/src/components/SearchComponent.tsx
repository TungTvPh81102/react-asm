import { useState, useContext } from "react";
import { ProductContext, ProductContextType } from "@/contexts/ProductContext";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const SearchComponent = () => {
  const nav = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { searchProducts } = useContext(ProductContext) as ProductContextType;

  const handleSearch = async () => {
    await searchProducts(searchTerm);
    nav(`/shop?search=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className="flex ">
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
      />
      <Button className="ml-2 bg-[#3333] text-white" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};

export default SearchComponent;
