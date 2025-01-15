import { Section, Container } from "../craft";

const Solutions = () => {
  return (
    <Section className="bg-[#E8F5E9] py-16 px-8 text-center rounded-3xl">
      <Container>
        <h2 className="text-3xl font-bold">Our Solutions</h2>
        <p className="text-lg mt-4">Providing a seamless toll payment experience.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="p-6 border rounded-3xl bg-white shadow-lg hover:shadow-xl transition duration-300">
            <h3 className="font-semibold text-xl">Easy Payments</h3>
            <p className="mt-2 text-gray-600">Pay tolls quickly and effortlessly.</p>
          </div>
          <div className="p-6 border rounded-3xl bg-white shadow-lg hover:shadow-xl transition duration-300">
            <h3 className="font-semibold text-xl">Secure Transactions</h3>
            <p className="mt-2 text-gray-600">Your transactions are safe with us.</p>
          </div>
          <div className="p-6 border rounded-3xl bg-white shadow-lg hover:shadow-xl transition duration-300">
            <h3 className="font-semibold text-xl">Real-Time Updates</h3>
            <p className="mt-2 text-gray-600">Stay updated with real-time toll info.</p>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Solutions;
