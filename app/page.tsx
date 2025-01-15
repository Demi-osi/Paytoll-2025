import { Section, Container, Main } from "@/components/craft";
import About from "@/components/homepage/about";
import Howto from "@/components/homepage/howto";
import Solutions from "@/components/homepage/solutions";
import Hero from "@/components/landing-page/hero";


export default function Home() {
  return (
    <Main>
    <Section>
      <Container>
        <Hero />
        <Solutions />
        <About />
        <Howto />
      </Container>
    </Section>
  </Main>
  );
}
