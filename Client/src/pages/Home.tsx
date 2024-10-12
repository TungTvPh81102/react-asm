import ImageSlider from "@/components/common/ImageSlider";
import LetTalk from "@/components/LetTalk";
import ProductList from "@/components/ProductList";
import Subscribe from "@/components/Subscribe";

const Home = () => {
  return (
    <div className="">
      <ImageSlider />
      <ProductList />
      <LetTalk />
      <Subscribe />
    </div>
  );
};

export default Home;
