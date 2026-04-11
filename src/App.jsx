
import Home from "./pages/Home";
import { CartProvider } from "./components/CartContext";
import { UserProvider } from "./components/UserContext";


function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Home />
      </CartProvider>
    </UserProvider>
  );
}

export default App;
