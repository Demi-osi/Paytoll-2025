import { Section, Container } from "../craft";

const About = () => {
  return (
    <Section className="about bg-[#E8F5E9]-100 py-16 px-8 text-center rounded-3xl">
      <Container>
            <h2 className="text-3xl font-bold">About PayToll</h2>
            <p className="text-lg mt-4">
            PayToll is dedicated to making toll payments hassle-free. With our secure and reliable
            service, you can easily manage toll payments with just a tap.
            </p>
      </Container>
    </Section>
  );
};

export default About;
