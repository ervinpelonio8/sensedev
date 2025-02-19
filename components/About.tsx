import Image from "next/image";

const coreValues = [
  {
    icon: "🎯",
    title: "Safety",
    description: "We prioritize the well-being of our team and clients.",
  },
  {
    icon: "🔗",
    title: "Integrity",
    description: "We uphold transparency and ethical business practices.",
  },
  {
    icon: "🤝",
    title: "Respect",
    description: "We value diversity and treat every individual with dignity.",
  },
  {
    icon: "🏆",
    title: "Excellence",
    description: "We strive for continuous improvement and innovation.",
  },
];

const About = () => {
  return (
    <section
      className="bg-destructive-foreground py-16 px-4 md:px-8 w-full"
      id="about"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Column - Text */}
        <div>
          <h2 className="font-heading text-3xl font-bold text-primary">
            Empowering Industries with Innovation & Precision
          </h2>
          <p className="mt-4 text-lg text-foreground">
            SenseDev OPC is a trusted provider of industrial automation and
            process control solutions, delivering high-quality, safe, and
            reliable products that enhance productivity and sustainability.
          </p>

          <div className="mt-6 space-y-4">
            {[
              "System Design & Electronics Manufacturing",
              "Process Control & Automation",
              "Maintenance & Calibration Services",
              "Consulting & Integration",
            ].map((item, index) => (
              <p key={index} className="flex items-center">
                ✅ <span className="ml-2">{item}</span>
              </p>
            ))}
          </div>

          <div className="mt-8 p-4 bg-primary text-primary-foreground rounded-lg">
            <p className="text-lg font-semibold text-center">
              &quot;We innovate and deliver products that improve productivity,
              safety, and profitability—creating outstanding impact in the
              industry.&quot;
            </p>
          </div>

          <a href="#contact">
            <button className="mt-6 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/90 transition-colors">
              Get in Touch
            </button>
          </a>
        </div>

        {/* Right Column - Image */}
        <div className="flex justify-center">
          <Image
            src="/automation1.jpg"
            alt="Industrial Automation"
            width={500}
            height={400}
            className="rounded-lg shadow-lg object-cover"
          />
        </div>
      </div>

      {/* Core Values */}
      <div className="mt-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        {coreValues.map((value, index) => (
          <div key={index} className="p-6 bg-card shadow-lg rounded-lg">
            <h3 className="text-xl font-bold text-primary font-heading">
              {value.icon} {value.title}
            </h3>
            <p className="mt-2 text-card-foreground">{value.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
