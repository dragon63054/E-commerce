import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import CartItem from "@/components/ui/cart-item.";
import { formatPrice, getCartItemCount } from "@/lib/utils";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { items } = useSelector((state: RootState) => state.cart);
  const totalItems = getCartItemCount(items);
  const navigate = useNavigate();
  function getCartSubtotal() {
    const subtotal = items.reduce((prev, current) => prev + current.product.price * current.quantity, 0);
    return formatPrice(subtotal);
  }
  

  function proceedToPayment() {
    navigate("/payment");
  }
  return (
    <article className="p-4">
      <h1 className="text-xl">Shopping Cart</h1>
      <section className="grid sm:grid-cols-[2fr_1fr] gap-4 grid-cols-1 mt-4">
        {/* <section className="grid grid-flow-row gap-4">
          {items.map((item) => (
            <CartItem key={item.product.id} item={item} />
          ))}
        </section> */}
        <section className="grid grid-flow-row gap-4">
          {items.length > 0 ? (
            items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))
          ) : (
            <p>Your cart is empty</p>
          )}
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle className="underline hover:cursor-pointer">Subtotal</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2 items-center">
              {totalItems > 1 ? (
                <span className="text-sm font-semibold">({totalItems} items)</span>
              ) : (
                <span className="text-sm font-bold">({totalItems} item)</span>
              )}
              <span className="font-bold">₹{getCartSubtotal()}</span>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-sky-500 hover:bg-sky-600" onClick={proceedToPayment}>
                Buy
              </Button>
            </CardFooter>
          </Card>
        </section>
      </section>
    </article>
  );
}



