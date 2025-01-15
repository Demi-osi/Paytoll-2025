import TransactionHistory from "@/components/account/transaction history";
import { Section, Container, Main } from "@/components/craft";


export default function AccountPage () {
  return (
    <Main className="p-8 bg-gray-100 min-h-screen">
        <Section>
            <Container>
            <TransactionHistory />
            </Container>
        </Section>
    </Main>
 
  );
};


