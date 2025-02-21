"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ClientButton() {
  const router = useRouter();

  return (
    <Button
      size="lg"
      className="w-full md:w-auto bg-secondary text-white hover:bg-secondary/80"
      type="button"
      onClick={() => router.push("/#contact")}
    >
      Inquire Now
    </Button>
  );
}
