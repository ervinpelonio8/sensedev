import React from "react";
import Image from "next/image";
import Header from "@/components/Header";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ClientButton from "./ClientButton";
import { headers } from "next/headers";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const id = (await params).id;
  const headersList = headers();
  const protocol = (await headersList).get("x-forwarded-proto") || "http";
  const host = (await headersList).get("host");

  const response = await fetch(`${protocol}://${host}/api/products/${id}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    // You might want to handle different error cases differently
    if (response.status === 404) {
      return (
        <>
          <Header />
          <div className="container mx-auto px-4 py-8 text-center bg-primary text-white">
            <h1 className="text-2xl font-bold">Product not found</h1>
            <p className="mt-2">The requested product does not exist.</p>
          </div>
        </>
      );
    }

    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-8 text-center bg-primary text-white">
          <h1 className="text-2xl font-bold">Error</h1>
          <p className="mt-2">
            Failed to load product. Please try again later.
          </p>
        </div>
      </>
    );
  }

  const product = await response.json();

  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-75px)] bg-primary">
        <main className="container mx-auto px-4 py-8 text-white">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative">
              <Carousel className="w-full max-w-[85%] mx-auto">
                <CarouselContent>
                  {product.images.map((image: string, index: number) => (
                    <CarouselItem key={index}>
                      <div className="relative h-[500px] flex items-center justify-center">
                        <Image
                          src={image}
                          alt={`${product.name} - Image ${index + 1}`}
                          fill
                          className="object-contain rounded-lg"
                          sizes="(max-width: 768px) 100vw, 768px"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="text-primary hover:bg-secondary/90" />
                <CarouselNext className="text-primary hover:bg-secondary/90" />
              </Carousel>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl font-heading font-bold">
                {product.name}
              </h1>
              <p className="text-2xl font-semibold">₱{product.price}</p>
              <div>
                <h2 className="font-semibold mb-2">Product Description</h2>
                <div
                  className="prose prose-sm sm:prose-base lg:prose-lg max-w-none prose-invert"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
              <ClientButton />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
