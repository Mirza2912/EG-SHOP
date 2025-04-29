// Helper for localStorage
const loadCartFromLocalStorage = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};
const saveCartToLocalStorage = (cart) => {
  // console.log(cart);

  localStorage.setItem("cart", JSON.stringify(cart));
};

export { loadCartFromLocalStorage, saveCartToLocalStorage };
