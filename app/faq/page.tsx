import { Section, Container, Main } from "@/components/craft";
import FAQPage from "@/components/faq/faq";


export default function AccountPage () {
  return (
    <Main className="p-8 bg-gray-100 min-h-screen">
        <Section>
            <Container>
            <FAQPage />
            </Container>
        </Section>
    </Main>
 
  );
};


