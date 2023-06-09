import React, { createContext, useReducer } from 'react';

const initialState = {
  items: [],
};

export const cartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItemToCart = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  return (
    <cartContext.Provider value={{ cart: state, addItemToCart }}>
      {children}
    </cartContext.Provider>
  )
}

export default cartContext
