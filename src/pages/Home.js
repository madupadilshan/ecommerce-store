import ProductList from "../components/ProductList";
import "../styles.css";

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to the E-Commerce Store</h1>
      <p className="home-subtitle">Find exclusive deals and trending products!</p>
      
      <div className="featured-products">
        <h2>Featured Products</h2>
        <ProductList />
      </div>
    </div>
  );
}

export default Home;
