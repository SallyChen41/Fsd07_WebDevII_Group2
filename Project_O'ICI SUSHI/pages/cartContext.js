import React, { createContext, useReducer, useEffect, useState } from 'react';

const initialState = {
  items: [],
};

export const cartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ITEMS':
      return {
        ...state,
        items: action.payload,
      };
    case 'ADD_ITEM':
      const addedItems = [...state.items, action.payload];
      localStorage.setItem('cartItems', JSON.stringify(addedItems));
      return {
        ...state,
        items: addedItems,
      };
    case 'UPDATE_QUANTITY':
      const updatedItems = state.items.map(item => {
        if (item.id === action.payload.id) {
          return { ...item, quantity: action.payload.quantity };
        }
        return item;
      });
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return {
        ...state,
        items: updatedItems,
      };
    case 'REMOVE_ITEM':
      const removedItems = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(removedItems));
      return {
        ...state,
        items: removedItems,
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedItems = localStorage.getItem(`cartItems_${userId}`);
    if (storedItems) {
      dispatch({ type: 'SET_ITEMS', payload: JSON.parse(storedItems) });
    }
  }, [userId]);

  const addItemToCart = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const updateItemQuantity = (itemId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity } });
  };

  const removeItemFromCart = (itemId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  };

  const logout = () => {
    localStorage.removeItem(`cartItems_${userId}`);
    setUserId(null);
    window.location.href = '/';
  };

  const setUser = (id) => {
    setUserId(id);
  };

  return (
    <cartContext.Provider 
      value={{ 
        cart: state, 
        addItemToCart,
        updateItemQuantity,
        removeItemFromCart,
        setUser,
        logout,
      }}
    >
      {children}
    </cartContext.Provider>
  )
}

export default cartContext
