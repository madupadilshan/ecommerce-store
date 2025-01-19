import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useCart } from "./CartContext";
import "../styles.css";

function ProductList() {
  const [products, setProducts] = useState([]); // All products from Firestore
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products for display
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [category, setCategory] = useState("All"); // Category state
  const [categories, setCategories] = useState([]); // List of unique categories
  const { addToCart } = useCart(); // Get addToCart from CartContext

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const fetchedProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);

        // Extract unique categories
        const uniqueCategories = [
          "All",
          ...new Set(fetchedProducts.map((product) => product.category || "Uncategorized")),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Update filtered products whenever the search term or category changes
  useEffect(() => {
    const results = products.filter((product) => {
      const matchesCategory =
        category === "All" || product.category === category || (!product.category && category === "Uncategorized");
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredProducts(results);
  }, [searchTerm, category, products]);

  return (
    <div className="product-list">
      <h2>Products</h2>

      {/* Filter by Category */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="category-select"
      >
        {categories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.photoURL || "https://via.placeholder.com/150"}
                alt={product.name}
                className="product-image"
              />
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
              <button
                className="add-to-cart-button"
                onClick={() => addToCart(product)} // Add product to cart
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default ProductList;
