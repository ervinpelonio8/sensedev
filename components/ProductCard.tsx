import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface Product {
  _id: string;
  name: string;
  price: string;
  images: string[];
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product._id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-48">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <CardContent className="p-4">
          <h2 className="font-heading font-semibold text-xl mb-2">
            {product.name}
          </h2>
          <p className="text-lg font-semibold">₱{product.price}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
