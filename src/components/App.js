import React, { useReducer, createContext, useContext } from 'react';
import './../styles/App.css';

const initialCart = [
  {
    id: 1,
    title: 'Samsung Galaxy S7',
    price: 599.99,
    img: 'https://res.cloudinary.com/diqqf3eq2/image/upload/v1583368215/phone-2_ohtt5s.png',
    amount: 1
  },
  {
    id: 2,
    title: 'google pixel ',
    price: 499.99,
    img: 'https://res.cloudinary.com/diqqf3eq2/image/upload/v1583371867/phone-1_gvesln.png',
    amount: 1
  },
  {
    id: 3,
    title: 'Xiaomi Redmi Note 2',
    price: 699.99,
    img: 'https://res.cloudinary.com/diqqf3eq2/image/upload/v1583368224/phone-3_h2s6fo.png',
    amount: 1
  }
];

const AppContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'REMOVE':
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload)
      };
    case 'INCREASE':
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload ? { ...item, amount: item.amount + 1 } : item
        )
      };
    case 'DECREASE':
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === action.payload ? { ...item, amount: item.amount - 1 } : item
          )
          .filter((item) => item.amount > 0)
      };
    default:
      return state;
  }
};

const Navbar = () => {
  const { cart } = useContext(AppContext);
  const totalItemCount = cart.reduce((total, item) => total + item.amount, 0);

  return (
    <nav style={{ backgroundColor: '#2680c0', color: '#fff', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 'bold' }}>useReducer</h2>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="35" height="35" fill="currentColor">
          <path d="M16 6v2h2l2 12H0L2 8h2V6a6 6 0 1 1 12 0zm-2 0a4 4 0 1 0-8 0v2h8V6zM4 10v2h2v-2H4zm10 0v2h2v-2h-2z" />
        </svg>
        <span
          id="nav-cart-item-count"
          style={{
            position: 'absolute',
            top: '-8px',
            right: '-10px',
            backgroundColor: '#85d5f8',
            color: '#003b63',
            borderRadius: '50%',
            padding: '2px 8px',
            fontSize: '0.9rem',
            fontWeight: 'bold'
          }}
        >
          {totalItemCount}
        </span>
      </div>
    </nav>
  );
};

const CartItem = ({ item }) => {
  const { dispatch } = useContext(AppContext);

  return (
    <div
      className="cart-item"
      style={{
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        margin: '15px 0',
        padding: '10px 0',
        borderBottom: '1px solid #ddd'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <img src={item.img} alt={item.title} style={{ width: '70px', height: '70px', objectFit: 'contain' }} />
        <div>
          <h4 style={{ margin: '0 0 5px 0', textTransform: 'capitalize' }}>{item.title}</h4>
          <p id={`cart-item-price-${item.id}`} style={{ margin: '0 0 5px 0', color: '#617d98', fontWeight: 'bold' }}>
            ${item.price}
          </p>
          <button
            className="remove-btn"
            onClick={() => dispatch({ type: 'REMOVE', payload: item.id })}
            style={{ backgroundColor: 'transparent', border: 'none', color: '#2680c0', cursor: 'pointer', padding: 0 }}
          >
            remove
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <button
          id={`increment-btn-${item.id}`}
          onClick={() => dispatch({ type: 'INCREASE', payload: item.id })}
          style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#2680c0' }}
        >
          ▲
        </button>
        <span id={`cart-amount-${item.id}`} style={{ fontWeight: 'bold', margin: '3px 0' }}>
          {item.amount}
        </span>
        <button
          id={`decrement-btn-${item.id}`}
          onClick={() => dispatch({ type: 'DECREASE', payload: item.id })}
          style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#2680c0' }}
        >
          ▼
        </button>
      </div>
    </div>
  );
};

const CartContainer = () => {
  const { cart, dispatch } = useContext(AppContext);

  const totalAmount = cart
    .reduce((total, item) => total + item.price * item.amount, 0)
    .toFixed(2);

  if (cart.length === 0) {
    return (
      <section style={{ textAlign: 'center', padding: '50px 20px' }}>
        <h2 style={{ textTransform: 'uppercase', letterSpacing: '2px', color: '#102a42' }}>YOUR BAG</h2>
        <h4 style={{ color: '#617d98', marginTop: '20px' }}>is currently empty</h4>
        <p className="empty-cart-message" style={{ color: '#617d98' }}>Cart is currently empty</p>
      </section>
    );
  }

  return (
    <section style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
      <h2 style={{ textAlign: 'center', textTransform: 'uppercase', letterSpacing: '2px', color: '#102a42', marginBottom: '30px' }}>
        YOUR BAG
      </h2>

      <div id="cart-items-list">
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <footer style={{ marginTop: '40px', borderTop: '2px solid #617d98', paddingTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h4 style={{ margin: 0, textTransform: 'capitalize', letterSpacing: '1px' }}>Total</h4>
          <h4 id="cart-total-amount" style={{ margin: 0, color: '#102a42', fontWeight: 'bold' }}>
            ${totalAmount}
          </h4>
        </div>
        <div style={{ textAlign: 'center' }}>
          <button
            id="clear-all-cart"
            onClick={() => dispatch({ type: 'CLEAR_CART' })}
            style={{
              backgroundColor: '#f8a5a5',
              color: '#a80000',
              border: '1px solid #a80000',
              padding: '8px 24px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}
          >
            Clear Cart
          </button>
        </div>
      </footer>
    </section>
  );
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, { cart: initialCart });

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      <div id="main">
        <Navbar />
        <CartContainer />
      </div>
    </AppContext.Provider>
  );
};

export default App;
