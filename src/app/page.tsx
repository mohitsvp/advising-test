import { HeroAnimation } from "@/components/sections/HeroAnimation";
import { ServicesOverview } from "@/components/sections/ServiceOverview";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10 px-5">
        {/* Left Side */}
        <div className="text-center lg:text-start space-y-6">
          <main className="text-5xl md:text-6xl font-bold">
            <h1 className="inline">
              <span className="inline bg-gradient-to-r from-[#F596D3] to-[#D247BF] text-transparent bg-clip-text">
                AdvisInt
              </span>{" "}
              Your Partner in
            </h1>{" "}
            <h2 className="inline">
              <span className="inline bg-gradient-to-r from-[#61ADFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
                GenAI
              </span>{" "}
              Innovation
            </h2>
          </main>

          <p className="text-xl text-muted-foreground md:2-10/12 mx-auto lg:mx-0">
          We build custom AI solutions that drive growth, efficiency, and a competitive edge for your business</p>

          <div className="space-y-4 md:space-y-0 md:space-x-4">
            <Link href="/contact" rel="noopener noreferrer">
              <Button className="w-full md:w-1/3">Request a Call Back</Button>
            </Link>
            <Link href="/services" className={`w-full md:w-1/3 ${buttonVariants({variant: "outline"})}`}>
              Our Services
            </Link>
          </div>
        </div>

        {/* Right side */}
        <div className="w-full h-96 lg:h-[450px]">
          <HeroAnimation/>
        </div>
      </section>

      <ServicesOverview/>

      <WhyChooseUs/>
    </>
  );
}
