import React, { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const exists = state.items.find(item => item.id === action.product.id);
      if (exists) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.product, quantity: 1 }]
      };
    }
    case "REMOVE_FROM_CART": {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.id)
      };
    }
    case "UPDATE_QUANTITY": {
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.id ? { ...item, quantity: action.quantity } : item
        )
      };
    }
    case "CLEAR_CART": {
      return { ...state, items: [] };
    }
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  return (
    <CartContext.Provider value={{ cart: state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
