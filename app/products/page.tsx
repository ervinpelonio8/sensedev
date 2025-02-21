"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCard } from "@/components/ProductCard";

interface Product {
  _id: string;
  name: string;
  price: string;
  description: string;
  images: string[];
}

const ProductSkeleton = () => (
  <Card className="overflow-hidden">
    <Skeleton className="h-48 w-full" />
    <CardContent className="p-4">
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-5 w-1/4" />
    </CardContent>
  </Card>
);

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const initialLoad = useRef(true);

  const { ref, inView } = useInView({
    threshold: 1,
    rootMargin: "100px",
  });

  const fetchProducts = useCallback(
    async (pageNum: number, searchTerm: string) => {
      try {
        const params = new URLSearchParams({
          page: pageNum.toString(),
          limit: "9",
          ...(searchTerm && { search: searchTerm }),
        });

        const response = await fetch(`/api/products?${params}`);
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();

        return {
          products: data.products as Product[],
          hasMore: data.hasMore as boolean,
        };
      } catch (error) {
        console.error("Error:", error);
        return { products: [], hasMore: false };
      }
    },
    []
  );

  // Initial load and search handling
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      const { products: newProducts, hasMore: more } = await fetchProducts(
        1,
        searchQuery
      );
      setProducts(newProducts);
      setHasMore(more);
      setPage(1);
      setIsLoading(false);
      initialLoad.current = false;
    };

    if (initialLoad.current || searchQuery !== "") {
      loadProducts();
    }
  }, [searchQuery, fetchProducts]);

  const loadMore = useCallback(async () => {
    if (inView && !isLoading && hasMore) {
      setIsLoading(true);
      const nextPage = page + 1;
      const { products: newProducts, hasMore: more } = await fetchProducts(
        nextPage,
        searchQuery
      );
      setProducts((prev) => [...prev, ...newProducts]);
      setHasMore(more);
      setPage(nextPage);
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  useEffect(() => {
    loadMore();
  }, [loadMore]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(search);
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="relative max-w-3xl mx-auto">
            <form onSubmit={handleSearch}>
              <div className="flex gap-2">
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="placeholder:text-muted"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button
                  type="submit"
                  className="bg-primary hover:bg-secondary transition-colors"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>

        {products.length === 0 && !isLoading ? (
          <div className="text-center py-10">
            <p className="text-lg text-muted-foreground">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading && !products.length
              ? // Initial loading state
                Array(3)
                  .fill(null)
                  .map((_, index) => <ProductSkeleton key={index} />)
              : // Products list
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
          </div>
        )}

        {/* Load more indicator */}
        <div ref={ref} className="py-8 text-center">
          {isLoading && products.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(3)
                .fill(null)
                .map((_, index) => (
                  <ProductSkeleton key={`load-more-${index}`} />
                ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
