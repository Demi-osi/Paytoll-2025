import { Section, Container, Main } from "@/components/craft";
import VehiclesPage from "@/app/vehicles/vehicles";


export default function AccountPage () {
  return (
    <Main className="p-8 bg-gray-100 min-h-screen">
        <Section>
            <Container>
            <VehiclesPage />
            </Container>
        </Section>
    </Main>
 
  );
};


