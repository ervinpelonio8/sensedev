"use client";
import { useState, useRef } from "react";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Tiptap, { TiptapRef } from "@/components/Tiptap";
import ImageUpload, { ImageUploadRef } from "@/components/ImageUpload";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const imageUploadRef = useRef<ImageUploadRef>(null);
  const tiptapRef = useRef<TiptapRef>(null);
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    imageFiles: [] as File[],
  });

  const uploadImages = async (files: File[]) => {
    const uploadedUrls = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      uploadedUrls.push(data.url);
    }
    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      // First upload all images
      const uploadedImageUrls = await uploadImages(productData.imageFiles);

      // Then create the product with the image URLs
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: productData.name,
          price: productData.price,
          description: productData.description,
          images: uploadedImageUrls,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      const product = await response.json();
      console.log("Product created:", product);

      // Reset form and show success message
      setProductData({
        name: "",
        price: "",
        description: "",
        imageFiles: [],
      });

      // Reset components
      imageUploadRef.current?.reset();
      tiptapRef.current?.reset();

      toast.success("Product created successfully");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to create product");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageFilesChange = (files: File[]) => {
    setProductData((prev) => ({ ...prev, imageFiles: files }));
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      router.push("/admin");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-heading font-bold text-primary">
            Add New Product
          </h1>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Logout
          </Button>
        </div>
        <Card>
          <CardContent className="p-6">
            <h1 className="text-3xl font-heading font-bold text-primary mb-8 mx-auto text-center">
              Add New Product
            </h1>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={productData.name}
                  onChange={(e) =>
                    setProductData({ ...productData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  value={productData.price}
                  onChange={(e) =>
                    setProductData({ ...productData, price: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Product Images</Label>
                <ImageUpload
                  ref={imageUploadRef}
                  onChange={handleImageFilesChange}
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Tiptap
                  ref={tiptapRef}
                  content={productData.description}
                  onChange={(content) =>
                    setProductData({ ...productData, description: content })
                  }
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating..." : "Add Product"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
