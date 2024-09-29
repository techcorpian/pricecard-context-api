import React from 'react';
import { useCart } from './context/CartContext'; // Adjust path as necessary

const CartPage = () => {
    const { cart, increaseQuantity, decreaseQuantity } = useCart();
    const delivery = 50;

    // Calculate the subtotal (without delivery)
    const calculateSubTotal = () => {
        return cart.products.reduce((total, product) => total + (product.price * product.quantity), 0);
    };

    // Calculate the total (including delivery)
    const calculateTotal = () => {
        const subTotal = calculateSubTotal();
        return subTotal + (subTotal > 0 ? delivery : 0); // Add delivery only if there are items in the cart
    };

    return (
        <>
            <h2 className='px-5 pt-2'>Cart ({cart.products.length})</h2>
            <div className="d-flex justify-content-between">
                <div className="d-flex flex-column gap-4 w-100"> 
                    {cart.products.length === 0 ? (
                        <p className="text-center">Your cart is empty.</p>
                    ) : (
                        <ul>
                            {cart.products.map((product) => (
                                <div className='d-flex justify-content-between border px-4 rounded my-3 border-top py-4 bg-white' key={product.id}>
                                    <div className='d-flex gap-4'>
                                        <div>
                                            <img src={product.image} alt={product.title} width='200px' className='' />
                                        </div>
                                        <div className='' style={{ width: '40%' }}>
                                            <h2>{product.title}</h2>
                                            <p className='word-wrap'>{product.description}</p>
                                        </div>
                                    </div>
                                    <div className='d-flex flex-column align-items-end'>
                                        <p className='fs-4 fw-bold text-secondary'>₹{product.price}</p>
                                        <div className='d-flex align-items-center'>
                                            <button onClick={() => decreaseQuantity(product.id)} className='px-2 border-0 rounded bg-success text-white'>-</button>
                                            <span className='px-3'>{product.quantity}</span>
                                            <button onClick={() => increaseQuantity(product.id)} className='px-2 border-0 rounded bg-success text-white'>+</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </ul>
                    )}
                </div>
                {cart.products.length > 0 && (
                    <div className='p-4 bg-white rounded m-3 border w-25'>
                        <div className='d-flex justify-content-between fs-5 align-items-center'> 
                            Delivery Charges: <span className='fs-6'>₹{delivery.toFixed(2)}</span> 
                        </div>
                        <div className='d-flex justify-content-between fs-5 align-items-center'>
                            Sub-Total: <span className='fs-6'>₹{calculateSubTotal().toFixed(2)}</span> 
                        </div>
                        <hr/>
                        <div className='d-flex justify-content-between fs-5 align-items-center'> 
                            Total: <span className='fs-6'>₹{calculateTotal().toFixed(2)}</span> 
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartPage;
