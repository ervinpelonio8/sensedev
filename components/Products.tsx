import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

const productFeatures = [
  "Process Controllers & Recorders",
  "Industrial Sensors & Measuring Instruments",
  "Automation Systems & PLCs",
  "Control Panels & Motor Drives",
  "Valves & Piping Systems",
];

const productSlides = [
  {
    image: "/product1.png",
    name: "SDPT300 Pressure Transmitter",
    description:
      "The SDPT300 pressure transmitter converts sensor signals into standard outputs for easy integration and features remote transmission with high durability.",
  },
  {
    image: "/product2.png",
    name: "SDPT600 Pressure Transmitter",
    description:
      "The SDPT600 transmitter ensures high accuracy and stability, measuring liquids and gases with 4-20mA output and Modbus/HART support.",
  },
  {
    image: "/product3.png",
    name: "SDPS300 Pressure Switch",
    description:
      "The SDPS200 pressure switch triggers a switch signal when pressure changes, using a piston and precision spring mechanism.",
  },
  {
    image: "/product4.png",
    name: "SDPG300 Digital Pressure Gauge",
    description:
      "The SDPG300 digital pressure gauge offers high accuracy, real-time display, and long-term stability with a large LCD, backlight, and easy operation.",
  },
];

const Products = () => {
  return (
    <section className="bg-primary py-16 px-8" id="products">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Column - Carousel for md+ screens, Text for mobile */}
        <div className="md:order-1 order-2">
          <Carousel className="w-full max-w-[85%] mx-auto">
            <CarouselContent>
              {productSlides.map((product, index) => (
                <CarouselItem key={index}>
                  <Card className="border-none">
                    <CardContent className="flex flex-col items-center p-6">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={400}
                        height={300}
                        className="rounded-lg shadow-lg object-contain mb-4 aspect-square w-full h-full"
                      />
                      <h3 className="font-heading text-xl font-bold text-primary mt-4">
                        {product.name}
                      </h3>
                      <p className="text-primary text-center mt-2">
                        {product.description}
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-primary hover:bg-secondary/90" />
            <CarouselNext className="text-primary hover:bg-secondary/90" />
          </Carousel>
        </div>

        {/* Right Column - Text for md+ screens, Carousel for mobile */}
        <div className="md:order-2 order-1">
          <h2 className="font-heading text-3xl font-bold text-primary-foreground">
            ⚙️ Reliable Industrial Solutions for Every Process
          </h2>
          <p className="mt-4 text-lg text-primary-foreground">
            From <strong>process controllers</strong> to{" "}
            <strong>industrial sensors</strong>, we provide high-quality
            equipment that ensures precision, efficiency, and automation in
            various industries.
          </p>

          <div className="mt-6 space-y-4">
            {productFeatures.map((feature, index) => (
              <p
                key={index}
                className="flex items-center text-primary-foreground"
              >
                ✅ <span className="ml-2">{feature}</span>
              </p>
            ))}
          </div>

          <Link href="/products">
            <button className="mt-6 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-heading font-semibold hover:bg-secondary/90 transition-colors">
              View Full Product Catalog →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Products;
