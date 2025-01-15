import Image from "next/image";
import Balancer from "react-wrap-balancer";
import { Section, Container } from "../craft";
import Placeholder from "../../public/placeholder.jpg";
import Link from "next/link";

const Hero = () => {
const HERO_TITLE = 'Welcome to PayToll';
const HERO_DESCRIPTION = 'Skip the lines and breeze through toll gates with our fast, secure payment app. Pay tolls instantly, track your trips, and manage your balance all in one place. Simplify your journey with hassle-free, cashless payments—anytime, anywhere. The easiest way to pay toll gates.';
  
  return (
    <Section>
      <Container>
        <div>
          <h1>
          <Balancer>{HERO_TITLE}</Balancer>
          </h1>
          <h3 className="text-muted-foreground">
          <Balancer>{HERO_DESCRIPTION}</Balancer>
          </h3>
          <div>
            <Link href="/signup" >
              <button className="mt-6 px-6 py-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition duration-300">
                Get Started
              </button>
            </Link>
          </div>
          <div className="not-prose my-8 h-96 w-full overflow-hidden rounded-lg border md:h-[480px] md:rounded-xl">
            <Image
              className="h-full w-full object-cover object-bottom"
              src={Placeholder}
              width={1920}
              height={1080}
              alt="hero image"
              //placeholder="blur"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Hero;
