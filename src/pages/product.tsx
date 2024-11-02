import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import Rating from "@/components/ui/rating";
import Reviews from "@/components/ui/reviews";
import { Separator } from "@/components/ui/separator";
import { addToCart } from "@/features/cartSlice";
import { convertToRupee, formatPercentage, formatPrice } from "@/lib/utils";
import { Product } from "@/types";
import { ChevronDown, ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from 'react-hot-toast'; 


export function loader({ params }: LoaderFunctionArgs<{ productId: string }>) {
  const { productId } = params;

  return fetch(`https://dummyjson.com/products/${productId}`)
    .then((res) => res.json())
    .then((product) => ({ ...product, price: convertToRupee(product.price) }));
}

function getInitials(name: string) {
  const [firstName, lastName] = name.split(" ");
  return firstName.charAt(0) + lastName.charAt(0);
}


export default function ProductInfo() {
  const product = useLoaderData() as Product;

  const {
    images,
    title,
    description,
    price,
    brand,
    warrantyInformation,
    reviews,
    dimensions,
    shippingInformation,
    discountPercentage,
    returnPolicy,
    rating,
  } = product;

  const dispatch = useDispatch();

  function addProductToCart() {
    dispatch(addToCart({ product, quantity: 1 }));
    toast.success('Product added to cart successfully !', {
      duration: 2000,
      position: 'bottom-right',
    });
  }
  const navigate = useNavigate();
  function proceedToPayment() {
    navigate("/payment");
  }

  return (
    <article className="p-4">
      <Card className="bg-white shadow-md">
        <Toaster />
        <CardContent className="mt-6 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4">
          <Card className="bg-gray-100">
            <CardContent>
              <img className="aspect-square object-cover w-full h-auto" src={images[0]} alt={title} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{title}</CardTitle>
              <CardDescription className="text-gray-500">{description}</CardDescription>

              <HoverCard>
                <HoverCardTrigger asChild>
                  <section className="flex items-center gap-2 cursor-pointer">
                    <span>{rating}</span>
                    <Rating rating={rating} />
                    <ChevronDown />
                    <Separator className="h-6 w-[.125rem] fill-green-700" orientation="vertical" />
                    {reviews.length} reviews
                  </section>
                </HoverCardTrigger>
                <HoverCardContent align="start">
                  <Reviews reviews={reviews} />
                </HoverCardContent>
              </HoverCard>
            </CardHeader>
            <Separator className="my-4" />
            <CardContent className="space-y-10">
              <article className="flex items-center gap-2">
                <p className="relative">
                  <span className="text-xl font-semibold top-1/2 -translate-y-1/2 text-gray-600">₹</span>
                  <span className="ml-2 text-xl font-bold text-gray-900">{formatPrice(price)}</span>
                </p>
                {discountPercentage > 1 ? (
                  <Badge className="text-green-400 text-lg" variant="outline">
                    {formatPercentage(discountPercentage)}% off
                  </Badge>
                ) : null}
              </article>
              <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <article className="flex flex-col gap-2">
                  <h1 className="text-lg font-bold text-gray-900">Brand - {brand}</h1>
                  <h2 className="text-lg font-semibold text-gray-900">Dimensions</h2>
                  <p className="text-sm font-medium text-gray-700">
                    {dimensions.height} x {dimensions.width} x {dimensions.depth}
                  </p>
                </article>
                <article className="flex flex-col gap-2 font-semibold text-gray-900">
                  <h1>{warrantyInformation}</h1>
                  <h2>{shippingInformation}</h2>
                  <h2>{returnPolicy}</h2>
                </article>
                <Button onClick={addProductToCart} className="col-span-2 w-full flex items-center gap-2 bg-blue-500 text-white hover:bg-blue-600">
                  <ShoppingCart className="size-6 " />
                  Add to cart
                </Button>
                <Button onClick={proceedToPayment} className="col-span-2 w-full flex items-center gap-2 bg-blue-500 text-white hover:bg-blue-600">
                  <ShoppingCart className="size-6 " />
                  BUY NOW
                </Button>
              </section>
            </CardContent>
          </Card>
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle className="text-center font-bold">Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              {reviews.length > 0 ? (
                <article className="flex flex-col gap-4">
                  {reviews.map(({ reviewerName, reviewerEmail, comment, date, rating }, index) => (
                    <>
                      <article className="flex flex-col gap-4 md:flex-col md:items-start px-1" key={reviewerEmail}>
                        <header className="flex flex-col md:flex-row md:items-center gap-2">
                          <Avatar>
                            <AvatarFallback>{getInitials(reviewerName)}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col md:flex-row md:items-center gap-1">
                            <h1 className="text-lg font-semibold text-gray-900">{reviewerName}</h1>
                            <Separator className="h-6 w-[.125rem]" orientation="vertical" />
                            <p className="text-gray-500 text-sm md:text-base">{reviewerEmail}</p>
                            <Separator className="h-6 w-[.125rem]" orientation="vertical" />
                            <p className="text-gray-500 text-sm md:text-base">{new Date(date).toDateString()}</p>
                          </div>
                        </header>
                        <section className="flex flex-col md:flex-row gap-2 items-start md:items-center">
                          <Rating rating={rating} />
                          <p className="md:ml-2 text-base md:text-base">{comment}</p>
                        </section>
                        <hr />
                      </article>
                    </>
                  ))}
                </article>
              ) : (
                <h2>No reviews available</h2>
              )}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </article>
  );
}