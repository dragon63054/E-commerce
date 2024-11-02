import { CartItemsType } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { Button } from "./button";
import { Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "@/features/cartSlice";
import Reviews from "./reviews";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import Rating from "@/components/ui/rating";
import { Separator } from "@/components/ui/separator"; // Ensure to import Separator

export default function CartItem({ item }: { item: CartItemsType }) {
  const {
    product: { title, price, description, images, rating, reviews }, // Assuming these properties exist
    quantity,
  } = item;

  const dispatch = useDispatch();

  function addItemToCart() {
    dispatch(addToCart({ product: item.product, quantity: 1 }));
  }

  function removeItemFromCart() {
    dispatch(removeFromCart(item.product.id));
  }

  return (
    <Card className="grid grid-cols-[minmax(0,200px)_1fr] gap-2">
      <img className="size-full object-contain aspect-square" src={images[0]} alt={title} />
      <section>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
          <HoverCard>
            <HoverCardTrigger asChild>
              <section className="flex items-center gap-2 cursor-pointer">
                <span>{rating}</span>
                <Rating rating={rating} />
                <Separator className="h-6 w-[.125rem] fill-green-700" orientation="vertical" />
                {reviews.length} reviews
              </section>
            </HoverCardTrigger>
            <HoverCardContent align="start">
              <Reviews reviews={reviews} />
            </HoverCardContent>
          </HoverCard>
        </CardHeader>
        <CardContent>
          <p className="font-bold">Price: ₹{formatPrice(price)}</p>
        </CardContent>
        <CardFooter className="flex gap-2 items-center">
          {quantity > 1 ? (
            <Button variant={"outline"} onClick={removeItemFromCart}>
              -
            </Button>
          ) : (
            <Button variant={"outline"} onClick={removeItemFromCart}>
              <Trash2 className="size-4" />
            </Button>
          )}

          <p>{quantity}</p>
          <Button variant={"outline"} onClick={addItemToCart}>
            +
          </Button>
        </CardFooter>
      </section>
    </Card>
  );
}