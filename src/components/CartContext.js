import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchCartFromFirestore(user.uid);
      } else {
        setUserId(null);
        setCart([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchCartFromFirestore = async (uid) => {
    if (!uid) return;
    try {
      const cartRef = collection(db, "users", uid, "cart");
      const querySnapshot = await getDocs(cartRef);
      const cartItems = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCart(cartItems);
    } catch (error) {
      console.error("Error fetching cart from Firestore:", error);
    }
  };

  const saveCartItemToFirestore = async (uid, item) => {
    if (!uid) return;
    try {
      const cartItemRef = doc(db, "users", uid, "cart", item.id);
      await setDoc(cartItemRef, item);
    } catch (error) {
      console.error("Error saving cart item to Firestore:", error);
    }
  };

  const removeCartItemFromFirestore = async (uid, itemId) => {
    if (!uid) return;
    try {
      const cartItemRef = doc(db, "users", uid, "cart", itemId);
      await deleteDoc(cartItemRef);
    } catch (error) {
      console.error("Error removing cart item from Firestore:", error);
    }
  };

  const addToCart = (product) => {
    if (!userId) {
      console.error("User not logged in. Cannot add to cart.");
      return;
    }

    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
      updateCartItemInFirestore(userId, product.id, {
        quantity: existingItem.quantity + 1,
      });
    } else {
      const newItem = { ...product, quantity: 1 };
      setCart((prevCart) => [...prevCart, newItem]);
      saveCartItemToFirestore(userId, newItem);
    }
  };

  const removeFromCart = (itemId) => {
    if (!userId) {
      console.error("User not logged in. Cannot remove from cart.");
      return;
    }
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    removeCartItemFromFirestore(userId, itemId);
  };

  const increaseQuantity = (itemId) => {
    if (!userId) return;

    const updatedCart = cart.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);

    const item = cart.find((item) => item.id === itemId);
    if (item) {
      updateCartItemInFirestore(userId, itemId, {
        quantity: item.quantity + 1,
      });
    }
  };

  const decreaseQuantity = (itemId) => {
    if (!userId) return;

    const updatedCart = cart
      .map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);

    const item = cart.find((item) => item.id === itemId);
    if (item) {
      if (item.quantity > 1) {
        updateCartItemInFirestore(userId, itemId, {
          quantity: item.quantity - 1,
        });
      } else {
        removeCartItemFromFirestore(userId, itemId);
      }
    }
  };

  const clearCart = async () => {
    if (!userId) {
      console.error("User not logged in. Cannot clear cart.");
      return;
    }

    try {
      const cartRef = collection(db, "users", userId, "cart");
      const querySnapshot = await getDocs(cartRef);
      querySnapshot.forEach(async (docSnapshot) => {
        await deleteDoc(doc(db, "users", userId, "cart", docSnapshot.id));
      });

      setCart([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const updateCartItemInFirestore = async (uid, itemId, updatedFields) => {
    if (!uid) return;
    try {
      const cartItemRef = doc(db, "users", uid, "cart", itemId);
      await updateDoc(cartItemRef, updatedFields);
    } catch (error) {
      console.error("Error updating cart item in Firestore:", error);
    }
  };

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        calculateTotal,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
