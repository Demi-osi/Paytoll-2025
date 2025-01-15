'use client'
import { Main } from "@/components/craft";

const handleProceedToPayment = () => {
  alert("Functionality coming soon!");
};

export default function RechargePage() {
  const handlePresetClick = (amount: number) => {
    const customAmountField = document.getElementById("customAmount") as HTMLInputElement;;
    if (customAmountField) {
      customAmountField.value = amount.toString();
    }
  };

  return (
    <Main className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Recharge Your Account</h1>
        
        {/* Preset Recharge Options */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[10, 25, 50, 100, 200, 500].map((amount) => (
            <div
              key={amount}
              className="p-4 border rounded-lg bg-gray-200 text-center text-lg font-semibold text-gray-800 cursor-pointer focus:outline-none focus:ring-4 focus:ring-teal-500"
              onClick={() => handlePresetClick(amount)} // Handle preset selection
            >
              R{amount}
            </div>
          ))}
        </div>
        
        {/* Custom Recharge Amount */}
        <div className="mb-6">
          <label htmlFor="customAmount" className="block text-gray-700 font-semibold mb-2">
            Enter Custom Amount
          </label>
          <div className="flex items-center">
            <span className="px-3 py-2 bg-gray-200 border border-r-0 rounded-l-lg text-gray-800">R</span>
            <input
              type="number"
              id="customAmount"
              placeholder="Enter amount"
              className="w-full px-4 py-2 border border-l-0 rounded-r-lg bg-white text-gray-800 focus:outline-none focus:border-teal-500"
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                const value = target.value;
                const numberValue = parseFloat(value);
                if (value &&  Number.isNaN(numberValue)) {
                  target.setCustomValidity("Please enter a valid number");
                } else {
                  target.setCustomValidity("");
                }
              }}
            />
          </div>
        </div>

        {/* Auto-Recharge Option */}
        <div className="mb-6 flex items-center">
          <input type="checkbox" id="autoRecharge" className="mr-2" />
          <label htmlFor="autoRecharge" className="text-gray-700">
            Set as Monthly Auto-Recharge
          </label>
        </div>

        {/* Proceed to Payment */}
        <button 
        onClick={handleProceedToPayment}
        className="w-full py-3 bg-teal-500 text-white rounded-full text-lg font-bold hover:bg-teal-600 transition duration-300">
          Proceed to Payment
        </button>
      </div>
    </Main>
  );
}
