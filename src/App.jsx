import { useEffect, useState } from "react"
import { Footer } from "./components/footer"
import { Guitarras } from "./components/guitarras"
import Header from "./components/header"
import { db } from "./data/db"



function App() {

// Estado inicial del cart
function InitialCart() {
  const localStorageCart = localStorage.getItem('cart');
  return localStorageCart ? JSON.parse(localStorageCart) : []
}

  const [data] = useState(db);
  const [cart, setCart] = useState(InitialCart)
  const Max_Qantity = 5;
  const Min_Qantity = 1;

  // LocalStorage

  useEffect(() => {
    localStorage.setItem('cart',JSON.stringify(cart))
  }, [cart])
  

  //agregar al acrrito
  function addToCart(item) {
    const itemExist = cart.findIndex(guitar => guitar.id === item.id)
    if (itemExist >= 0) {
      // validar que no pase de Max_Qantity
      if(cart[itemExist].quantity >= Max_Qantity) return;
      const copyCart = [...cart];
      copyCart[itemExist].quantity++;
      setCart(copyCart);
    } else {
      item.quantity = 1;
      setCart([...cart, item])
    }
  }
  // Incrementar Cantidades
  function incrementGuitar(id) {
    const increment = cart.map(item =>{
      if (item.id === id && item.quantity < Max_Qantity) {
        return{
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item;
    })
    setCart(increment)
  }

   // decrementar Cantidades
   function decrementGuitar(id) {
    const decrement = cart.map(item =>{
      if (item.id === id && item.quantity > Min_Qantity ) {
        return{
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item;
    })
    setCart(decrement)
  }


  // Remover Guitarras
  function removeGuitar(id) {

    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id));
  }


  // Vaciar Carrito
  function clearCart() {
    setCart([]);
  }


  return (
    <>
      <Header cart={cart} removeGuitar={removeGuitar}  incrementGuitar={incrementGuitar} decrementGuitar={decrementGuitar} clearCart={clearCart}/>
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (

            <Guitarras key={guitar.id} guitar={guitar} addToCart={addToCart} />
          ))}
        </div>
      </main>

      <Footer />
    </>
  )
}

export default App
