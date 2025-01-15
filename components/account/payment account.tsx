"use client";

import { useState } from "react";
import { FaCreditCard } from "react-icons/fa"; 
import { Main, Section, Container } from "@/components/craft";
import { createCards } from "@/app/lib/action";

export default function ConnectPaymentAccount() {
  const [selectedOption, setSelectedOption] = useState<"card" | "wallet" | "redeem">("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [isHidden, setIsHidden] = useState(false);
  const [placeholder, setPlaceholder] = useState("123");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
  
    // Format the card number with spaces every 4 digits
    if (value.length <= 19) {
      value = value.replace(/(\d{4})(?=\d)/g, "$1 "); // Add a space after every 4 digits
      setCardNumber(value); // Update the card number state
    }
  };
  

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); 
    if (value.length <= 3) setCvv(value);

    if (value.length > 0) {
      setIsHidden(false);
      setTimeout(() => setIsHidden(true), 2000);
    }
  };
  
  const handleExpiryChange = (month: string, year: string) => {
    if (month?.length === 2 && year?.length === 2) {
      const parsedMonth = parseInt(month, 10);
      const parsedYear = parseInt(year, 10) + 2000; // Convert YY to YYYY
      
      // Validate the month
      if (parsedMonth < 1 || parsedMonth > 12) {
        setExpiryDate(null);
        alert("Invalid month. Please enter a value between 01 and 12.");
        return;
      }
      
      // Validate the year
      const currentYear = new Date().getFullYear();
      if (parsedYear < currentYear || (parsedYear === currentYear && parsedMonth < new Date().getMonth() + 1)) {
        setExpiryDate(null);
        alert("Invalid expiry date. The date cannot be in the past.");
        return;
      }
      
      const date = new Date(parsedYear, parsedMonth - 1, 1); // Month is zero-based in JS Dates

      // Format date to YYYY-MM-DD
      //const formattedDate = date.toISOString().split("T")[0];
      setExpiryDate(date);
    }
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
  
    // Remove temporary fields
    //console.log(expiryDate)
    formData.delete('expiryMonth');
    formData.delete('expiryYear');
  
    // Ensure expiryDate is valid before appending
    if (expiryDate) {
      const formattedDate = `${expiryDate.getFullYear()}-${String(expiryDate.getMonth() + 1).padStart(2, "0")}-${String(expiryDate.getDate()).padStart(2, "0")}`;
      formData.append('expiryDate', formattedDate);
    } else {
      alert("Please enter a valid expiry date.");
      return;
    }
    //console.log(formData.get('expiryDate'))
  
    await createCards(formData);
  
    // Reset form state
    setCvv("");
    setExpiryMonth("");
    setExpiryYear("");
    setExpiryDate(null);
    setPlaceholder("123");
    setCardNumber("");
  };

  return (
    <Main>
      <Container>
        <Section className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6">Choose Payment Method</h1>

          {/* Payment Type Tabs */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setSelectedOption("card")}
              className={`px-4 py-2 mx-2 font-semibold ${selectedOption === "card" ? "text-teal-600 border-b-2 border-teal-600" : "text-gray-700"}`}
            >
              Bank Card
            </button>
            <button
              onClick={() => setSelectedOption("wallet")}
              className={`px-4 py-2 mx-2 font-semibold ${selectedOption === "wallet" ? "text-teal-600 border-b-2 border-teal-600" : "text-gray-700"}`}
            >
              Mobile Wallet
            </button>
            <button
              onClick={() => setSelectedOption("redeem")}
              className={`px-4 py-2 mx-2 font-semibold ${selectedOption === "redeem" ? "text-teal-600 border-b-2 border-teal-600" : "text-gray-700"}`}
            >
              Redeem Code
            </button>
          </div>

          <div className="space-y-6">
            {selectedOption === "card" && (
              <>
                {/* Card Number */}
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="cardNumber" className="block text-gray-700 font-semibold mb-2">Card Number</label>
                    <div className="relative">
                      {/* Card Icon */}
                      <span className="absolute left-3 top-2.5 text-gray-500">
                        <FaCreditCard />
                      </span>
                      
                      {/* Card Number Input */}
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="Enter card number"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        maxLength={19} // Max length for 16 digits with spaces
                        className="w-full mb-3 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500 bg-white text-gray-800"
                        required
                      />
                    </div>
                  </div>

                  {/* Expiration Date */}
                  <div>
                    <label htmlFor="expiryDate" className="block text-gray-700 font-semibold mb-2">
                      Expiration Date
                    </label>
                    <div className="flex items-center space-x-2 mb-3">
                      <input
                        type="text"
                        name="expiryMonth"
                        placeholder="MM"
                        maxLength={2}
                        className="w-16 px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500 bg-white text-gray-800 text-center"
                        required
                        value={expiryMonth}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, ""); // Allow only digits
                          setExpiryMonth(value);
                          handleExpiryChange(value, expiryYear);
                        }}
                      />
                      <span className="text-gray-700 font-semibold">/</span>
                      <input
                        type="text"
                        name="expiryYear"
                        placeholder="YY"
                        maxLength={2}
                        className="w-16 px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500 bg-white text-gray-800 text-center"
                        required
                        value={expiryYear}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, ""); // Allow only digits
                          setExpiryYear(value);
                          handleExpiryChange(expiryMonth, value);
                        }}
                      />
                    </div>
                  </div>

                  {/* CVV */}
                  <div>
                    <label htmlFor="cvv" className="block text-gray-700 font-semibold mb-2">
                      CVV
                    </label>
                    <input
                      type={isHidden ? "password" : "text"}
                      id="cvv"
                      name="cvv"
                      value={cvv}
                      onChange={handleCvvChange}
                      placeholder={placeholder}
                      onFocus={() => setPlaceholder("")}
                      onBlur={() => !cvv && setPlaceholder("123")}
                      className="w-16 mb-6 px-2 py-2 border rounded-lg focus:outline-none focus:border-teal-500 bg-white text-gray-800 text-center"
                      required
                    />
                  </div>

                  <div >
                    <button
                      type="submit"
                      className="w-full py-3 px-4 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"              
                    >
                      Add Card
                    </button>
                  </div>                    
                
                </form>
              </>
            )}

            {selectedOption === "wallet" && (
              <>
                {/* Mobile Wallet Provider */}
                <div>
                  <label htmlFor="walletProvider" className="block text-gray-700 font-semibold mb-2">Wallet Provider</label>
                  <select
                    id="walletProvider"
                    name="walletProvider"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500 bg-white text-gray-800"
                    required
                  >
                    <option value="">Select your wallet provider</option>
                    <option value="paypal">PayPal</option>
                    <option value="venmo">Venmo</option>
                    <option value="cashapp">CashApp</option>
                  </select>
                </div>

                {/* Mobile Wallet Number */}
                <div>
                  <label htmlFor="walletNumber" className="block text-gray-700 font-semibold mb-2">Wallet Number</label>
                  <input
                    type="text"
                    id="walletNumber"
                    name="walletNumber"
                    placeholder="Enter wallet number"
                    className="mb-4 w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500 bg-white text-gray-800"
                    required
                  />
                </div>

                <div>
                  <button
                    onClick={() => alert("Functionality coming soon!")}
                    className="w-full py-3 px-4 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
                  >
                    Add Wallet
                  </button>
                </div>  
              </>
            )}

            {selectedOption === "redeem" && (
              <>
                {/* Redeem Code */}
                <div>
                  <label htmlFor="redeemCode" className="block text-gray-700 font-semibold mb-2">Redeem Code</label>
                  <input
                    type="text"
                    id="redeemCode"
                    name="redeemCode"
                    placeholder="Enter redeem code"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500 bg-white text-gray-800"
                    required
                  />
                </div>

                <div>
                  <button
                    onClick={() => alert("Functionality coming soon!")}
                    className="w-full py-3 px-4 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
                  >
                    Redeem code
                  </button>
                </div>  
              </>
            )}
          </div>
        </Section>
      </Container>
    </Main>
  );
}
