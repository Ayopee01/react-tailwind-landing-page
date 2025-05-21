import React, { useState, useEffect } from 'react'

//Import Images product Shoe
import nikie_shoe_white from '../assets/CTA/Shoe/NIKE_REVOLUTION_White.avif'
import nikie_shoe_black from '../assets/CTA/Shoe/NIKE_REVOLUTION_Black.avif'
import nikie_shoe_gray from '../assets/CTA/Shoe/NIKE_REVOLUTION_Gray.avif'

//Import Images product Shirt
import adidas_shirt_white from '../assets/CTA/Shirt/Adidas_shirt_White.avif'
import adidas_shirt_black from '../assets/CTA/Shirt/Adidas_shirt_Black.avif'
import adidas_shirt_gray from '../assets/CTA/Shirt/Adidas_shirt_Gray.avif'

//Import Images product Short
import HM_Shorts_white from '../assets/CTA/Shorts/H&M_shorts_White.jpg'
import HM_Shorts_black from '../assets/CTA/Shorts/H&M_shorts_Black.jpg'
import HM_Shorts_gray from '../assets/CTA/Shorts/H&M_shorts_Gray.jpg'

//Import Images Sale-Tag
import Sale_Tag from '../assets/CTA/icon/sale-tag.png'

const CTA = () => {
  // State for Shoe 
  const [productImg, setProductImg] = useState(nikie_shoe_white);
  const [productName, setProductName] = useState('Nike Revolution White');
  const [isShoeOnSale, setIsShoeOnSale] = useState(false);

  // State for Shirt 
  const [productShirtImg, setProductShirtImg] = useState(adidas_shirt_white);
  const [productShirtName, setProductShirtName] = useState('Adidas Shirt White');
  const [isShirtOnSale, setIsShirtOnSale] = useState(false);

  // State for Short
  const [productShortsImg, setProductShortsImg] = useState(HM_Shorts_white);
  const [productShortsName, setProductShortsName] = useState('H&M Shorts White');
  const [isShortsOnSale, setIsShortsOnSale] = useState(false);
  
  // State for Cart
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(parsedCart);
      calculateTotal(parsedCart);
    }
  }, []);

  // Calculate total price
  const calculateTotal = (currentCart) => {
    const total = currentCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotalPrice(total);
  };

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    calculateTotal(cart);
  }, [cart]);

  // Function Change Color Shoe
  const handleWhiteColorClick = () => {
    setProductImg(nikie_shoe_white);
    setProductName('Nike Revolution White');
    setIsShoeOnSale(false);
  };

  const handleGrayColorClick = () => {
    setProductImg(nikie_shoe_gray);
    setProductName('Nike Revolution Gray');
    setIsShoeOnSale(true);
  };

  const handleBlackColorClick = () => {
    setProductImg(nikie_shoe_black);
    setProductName('Nike Revolution Black');
    setIsShoeOnSale(false);
  };

  // Function Change Color Shirt
  const handleShirtWhiteColorClick = () => {
    setProductShirtImg(adidas_shirt_white);
    setProductShirtName('Adidas Shirt White');
    setIsShirtOnSale(false);
  };

  const handleShirtGrayColorClick = () => {
    setProductShirtImg(adidas_shirt_gray);
    setProductShirtName('Adidas Shirt Gray');
    setIsShirtOnSale(true);
  };

  const handleShirtBlackColorClick = () => {
    setProductShirtImg(adidas_shirt_black);
    setProductShirtName('Adidas Shirt Black');
    setIsShirtOnSale(false);
  };

  // Function Change Color Shorts
  const handleShortsWhiteColorClick = () => {
    setProductShortsImg(HM_Shorts_white);
    setProductShortsName('H&M Shorts White');
    setIsShortsOnSale(false);
  };

  const handleShortsGrayColorClick = () => {
    setProductShortsImg(HM_Shorts_gray);
    setProductShortsName('H&M Shorts Gray');
    setIsShortsOnSale(true);
  };

  const handleShortsBlackColorClick = () => {
    setProductShortsImg(HM_Shorts_black);
    setProductShortsName('H&M Shorts Black');
    setIsShortsOnSale(false);
  };

  // Function Add to Cart
  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex(item => 
      item.name === product.name && item.price === product.price
    );

    if (existingProductIndex >= 0) {
      // Product exists, update quantity
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // New product, add with quantity 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Function to increase quantity
  const increaseQuantity = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    setCart(updatedCart);
  };

  // Function to decrease quantity
  const decreaseQuantity = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCart(updatedCart);
    } else {
      // Remove item if quantity becomes 0
      removeFromCart(index);
    }
  };

  // Function to remove from cart
  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  // Function to clear cart
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  // Function to toggle cart visibility
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Function to confirm order
  const confirmOrder = () => {
    alert(`Your order has been confirmed! Total amount: $${totalPrice.toFixed(2)}`);
    // Here you could also send the order to a backend system
    clearCart();
  };

  const CartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );

  return (
    <section id='product' className='bg-gray-800 py-20 text-white flex flex-col justify-center items-center relative'>
      {/* Cart Icon Button */}
      <button 
        onClick={toggleCart} 
        className="fixed bottom-20 right-5 z-20 items-center justify-center rounded-full border border-gray-500 text-white cursor-pointer p-3 rounded-full shadow-md bg-gray-800 hover:bg-gray-700 dark:text-gray-900 dark:bg-gray-100 dark:hover:bg-gray-200 scale-105 transition-all duration-300 transform "
      >
      {/* Cart Icon total amount */}
        <CartIcon />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
            {cart.reduce((total, item) => total + item.quantity, 0)}
          </span>
        )}
      </button>

      {/* Cart Drawer */}
      {isCartOpen && (
//max-h-96 w-80 bottom-25 right-18
        <div className="fixed bottom-36 right-5 bg-white text-black p-4 shadow-lg rounded-md z-50 max-h-96 w-68 overflow-y-auto 
            sm:bottom-24 sm:right-18 sm:max-h-96 sm:w-80">
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <h3 className="font-bold text-xl">Cart</h3>
            <button onClick={toggleCart} className="cursor-pointer text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          {cart.length === 0 ? (
            <p className="text-center py-4">The cart is empty.</p>
          ) : (
            <>
              <ul className="divide-y">
                {cart.map((item, index) => (
                  <li key={index} className="py-2 flex items-center">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover mr-2" />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">${item.price}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button 
                        onClick={() => decreaseQuantity(index)}
                        className="cursor-pointer bg-gray-200 text-gray-700 px-2 rounded"
                      >
                        -
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button 
                        onClick={() => increaseQuantity(index)}
                        className="cursor-pointer bg-gray-200 text-gray-700 px-2 rounded"
                      >
                        +
                      </button>
                      <button 
                        onClick={() => removeFromCart(index)}
                        className="cursor-pointer ml-2 text-red-500"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="border-t mt-4 pt-2">
                <div className="flex justify-between font-bold text-lg mb-4">
                  <span>Total amount:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={clearCart}
                    className="cursor-pointer bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                  >
                    Clear
                  </button>
                  <button 
                    onClick={confirmOrder}
                    className="cursor-pointer bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      <div className='container mx-auto text-center'>
        <h2 className='text-4xl font-bold'>Product</h2>
        <p className='mt-4 text-lg'>Product Display Card Example.</p>

        <div className='flex flex-wrap justify-center mt-8 gap-8'>
          {/* Shoe Product Card */}
          <div className='flex flex-col items-center mt-4 h-100 w-80 bg-gray-900 rounded-lg relative'>
            {/* Sale Tag for Shoe */}
            {isShoeOnSale && (
              <div className='absolute top-0 left-0 z-10'>
                <img src={Sale_Tag} alt="Sale" className="w-16 h-16" />

                <span className="absolute top-70 left-63 transform text-gray-900 font-bold text-xl">-30%</span>
              </div>
            )}
            
            {/* Add to Cart Button - Top Right */}
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart({
                  name: productName,
                  price: isShoeOnSale ? 56 : 80,
                  image: productImg
                });
              }}
              className="cursor-pointer absolute top-2 right-2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
            
            <div className='overflow-hidden rounded-t-lg'>
              <img className='h-80 w-80 rounded-t-lg duration-300 hover:scale-105' src={productImg} alt={productName} />
            </div>
            
            <div className='flex items-center justify-center mt-4 mb-4 gap-x-4'>
              <div className='flex flex-col'>
                <p className='font-medium text-gray-100'>{productName}</p>
                <div className='flex items-center gap-2'>
                  {isShoeOnSale ? (
                    <>
                      <p className='text-sm font-medium text-gray-400 line-through'>$80</p>
                      <p className='text-sm font-medium text-red-500'>$56</p>
                    </>
                  ) : (
                    <p className='text-sm font-medium text-gray-100'>$80</p>
                  )}
                </div>
              </div>
              
              <fieldset>
                <legend className='sr-only'>Choose a color</legend>
                <div className='grid grid-flow-col items-center gap-2 forced-color-adjust-none'>
                  <label onClick={handleWhiteColorClick} className='flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-0 focus:outline-none has-checked:ring-1 has-checked:ring-gray-900 has-checked:ring-offset-1'>
                    <input className="sr-only" type="radio" name="shoe-color-choice" value="White" />
                    <span className="sr-only">White</span>
                    <span className="size-6 rounded-full border border-black/10 bg-white dark:border-white/10"></span>
                  </label>
                  <label onClick={handleGrayColorClick} className='flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-0 focus:outline-none has-checked:ring-1 has-checked:ring-gray-400 has-checked:ring-offset-1'>
                    <input className="sr-only" type="radio" name="shoe-color-choice" value="Gray" />
                    <span className="sr-only">Gray</span>
                    <span className="size-6 rounded-full border border-black/10 bg-gray-500 dark:border-white/10"></span>
                  </label>
                  <label onClick={handleBlackColorClick} className='flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-0 focus:outline-none has-checked:ring-1 has-checked:ring-gray-900 has-checked:ring-offset-1'>
                    <input className="sr-only" type="radio" name="shoe-color-choice" value="Black" />
                    <span className="sr-only">Black</span>
                    <span className="size-6 rounded-full border border-black/10 bg-gray-800 dark:border-white/10"></span>
                  </label>
                </div>
              </fieldset>
            </div>
          </div>

          {/* Shirt Product Card */}
          <div className='flex flex-col items-center mt-4 h-100 w-80 bg-gray-900 rounded-lg relative'>
            {/* Sale Tag for Shirt */}
            {isShirtOnSale && (
              <div className='absolute top-0 left-0 z-10'>
                <img src={Sale_Tag} alt="Sale" className="w-16 h-16" />
                <span className="absolute top-70 left-63 transform text-gray-900 font-bold text-xl">-30%</span>
              </div>
            )}
            
            {/* Add to Cart Button - Top Right */}
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart({
                  name: productShirtName,
                  price: isShirtOnSale ? 14 : 20,
                  image: productShirtImg
                });
              }}
              className="cursor-pointer absolute top-2 right-2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
            
            <div className='overflow-hidden rounded-t-lg'>
              <img className='h-80 w-80 rounded-t-lg duration-300 hover:scale-105' src={productShirtImg} alt={productShirtName} />
            </div>
            
            <div className='flex items-center justify-center mt-4 mb-4 gap-x-4'>
              <div className='flex flex-col'>
                <p className='font-medium text-gray-100'>{productShirtName}</p>
                <div className='flex items-center gap-2'>
                  {isShirtOnSale ? (
                    <>
                      <p className='text-sm font-medium text-gray-400 line-through'>$20</p>
                      <p className='text-sm font-medium text-red-500'>$14</p>
                    </>
                  ) : (
                    <p className='text-sm font-medium text-gray-100'>$20</p>
                  )}
                </div>
              </div>
              
              <fieldset>
                <legend className='sr-only'>Choose a color</legend>
                <div className='grid grid-flow-col items-center gap-2 forced-color-adjust-none'>
                  <label onClick={handleShirtWhiteColorClick} className='flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-0 focus:outline-none has-checked:ring-1 has-checked:ring-gray-900 has-checked:ring-offset-1'>
                    <input className="sr-only" type="radio" name="shirt-color-choice" value="White" />
                    <span className="sr-only">White</span>
                    <span className="size-6 rounded-full border border-black/10 bg-white dark:border-white/10"></span>
                  </label>
                  <label onClick={handleShirtGrayColorClick} className='flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-0 focus:outline-none has-checked:ring-1 has-checked:ring-gray-400 has-checked:ring-offset-1'>
                    <input className="sr-only" type="radio" name="shirt-color-choice" value="Gray" />
                    <span className="sr-only">Gray</span>
                    <span className="size-6 rounded-full border border-black/10 bg-gray-500 dark:border-white/10"></span>
                  </label>
                  <label onClick={handleShirtBlackColorClick} className='flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-0 focus:outline-none has-checked:ring-1 has-checked:ring-gray-900 has-checked:ring-offset-1'>
                    <input className="sr-only" type="radio" name="shirt-color-choice" value="Black" />
                    <span className="sr-only">Black</span>
                    <span className="size-6 rounded-full border border-black/10 bg-gray-800 dark:border-white/10"></span>
                  </label>
                </div>
              </fieldset>
            </div>
          </div>

          {/* Shorts Product Card */}
          <div className='flex flex-col items-center mt-4 h-100 w-80 bg-gray-900 rounded-lg relative'>
            {/* Sale Tag for Shorts */}
            {isShortsOnSale && (
              <div className='absolute top-0 left-0 z-10'>
                <img src={Sale_Tag} alt="Sale" className="w-16 h-16" />
                <span className="absolute top-70 left-63 transform text-gray-900 font-bold text-xl">-30%</span>
              </div>
            )}
            
            {/* Add to Cart Button - Top Right */}
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart({
                  name: productShortsName,
                  price: isShortsOnSale ? 28 : 40,
                  image: productShortsImg
                });
              }}
              className="cursor-pointer absolute top-2 right-2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
            
            <div className='overflow-hidden rounded-t-lg'>
              <img className='h-80 w-80 rounded-t-lg duration-300 hover:scale-105' src={productShortsImg} alt={productShortsName} />
            </div>
            
            <div className='flex items-center justify-center mt-4 mb-4 gap-x-4'>
              <div className='flex flex-col'>
                <p className='font-medium text-gray-100'>{productShortsName}</p>
                <div className='flex items-center gap-2'>
                  {isShortsOnSale ? (
                    <>
                      <p className='text-sm font-medium text-gray-400 line-through'>$40</p>
                      <p className='text-sm font-medium text-red-500'>$28</p>
                    </>
                  ) : (
                    <p className='text-sm font-medium text-gray-100'>$40</p>
                  )}
                </div>
              </div>
              
              <fieldset>
                <legend className='sr-only'>Choose a color</legend>
                <div className='grid grid-flow-col items-center gap-2 forced-color-adjust-none'>
                  <label onClick={handleShortsWhiteColorClick} className='flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-0 focus:outline-none has-checked:ring-1 has-checked:ring-gray-900 has-checked:ring-offset-1'>
                    <input className="sr-only" type="radio" name="shorts-color-choice" value="White" />
                    <span className="sr-only">White</span>
                    <span className="size-6 rounded-full border border-black/10 bg-white dark:border-white/10"></span>
                  </label>
                  <label onClick={handleShortsGrayColorClick} className='flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-0 focus:outline-none has-checked:ring-1 has-checked:ring-gray-400 has-checked:ring-offset-1'>
                    <input className="sr-only" type="radio" name="shorts-color-choice" value="Gray" />
                    <span className="sr-only">Gray</span>
                    <span className="size-6 rounded-full border border-black/10 bg-gray-500 dark:border-white/10"></span>
                  </label>
                  <label onClick={handleShortsBlackColorClick} className='flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-0 focus:outline-none has-checked:ring-1 has-checked:ring-gray-900 has-checked:ring-offset-1'>
                    <input className="sr-only" type="radio" name="shorts-color-choice" value="Black" />
                    <span className="sr-only">Black</span>
                    <span className="size-6 rounded-full border border-black/10 bg-gray-800 dark:border-white/10"></span>
                  </label>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA