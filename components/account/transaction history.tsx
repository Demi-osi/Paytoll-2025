"use client";

import { jsPDF } from "jspdf";
import { Main, Section } from "@/components/craft";
import { useEffect, useState } from "react";
import { Transaction } from "@/app/lib/definitions";


export default function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  useEffect(() => {
      
          const fetchTransaction = async () => {
            try {
              const response = await fetch("/api/transactions");
              if (response.ok) {
                const data = await response.json();
                const trans: Transaction[] = data.map((item: any) => ({
                          id: item.id,
                          license_plate: item.license_plate,
                          amount: isNaN(Number(item.amount)) ? 0 : Number(item.amount),
                          location: item.location,
                          toll_name: item.toll_name,
                          toll_incurred_at: item.toll_incurred_at,
                          date_paid: item.date_paid,
                        }));
                
                //console.log(data);
                setTransactions(trans);
                //console.log(transactions);
              } else {
                console.error("Failed to fetch vehicles, status:", response.status);
              }
            } catch (error) {
              console.error("Error fetching vehicles:", error);
            }
          };
  
      fetchTransaction();
    }, [])

    useEffect(() => {
      //console.log("Updated vehicles:", transactions); 
    }, [transactions]);
  
  
  //const [transactions, setTransactions] = useState<Vehicle[]>([]);

  const exportToPDF = () => {
    const doc = new jsPDF();
  
    // Title
    doc.setFontSize(18);
    doc.text("Transaction History", 14, 20);
  
    // Table headers
    doc.setFontSize(12);
    doc.text("Date Paid", 14, 30);
    doc.text("Amount (R)", 60, 30);
    doc.text("Toll Name", 100, 30);
    doc.text("License Plate", 160, 30);
  
    // Table rows
    const rowHeight = 12; // Adjust row height for better spacing
    transactions.forEach((transaction, index) => {
      const yPosition = 40 + index * rowHeight; // Adjust y-position by row height
  
      // Format the date and amount
      const datePaid = new Date(transaction.date_paid).toLocaleDateString(); // Format date
      const amount = parseFloat(transaction.amount).toFixed(2); // Format amount with two decimal places
  
      // Add the row data
      doc.text(datePaid, 14, yPosition);
      doc.text(amount, 60, yPosition);  // Ensure amount is properly formatted
      doc.text(transaction.toll_name || "N/A", 100, yPosition);  // Handle null/undefined toll_name
      doc.text(transaction.license_plate || "N/A", 160, yPosition); // Handle missing license plate
    });
  
    // Save the PDF
    doc.save("transaction_history.pdf");
  };
    
  
  




  return (
      <Main className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
          <Section>
            <h1 className="text-3xl font-bold text-center mb-6">Transaction History</h1>

            {/* Button to Export to PDF */}
            <div className="text-center mb-6">
                <button
                onClick={exportToPDF}
                className="px-6 py-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition duration-300"
                >
                    Export to PDF
                </button>
            </div>

            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="py-2 px-4 border">Date Paid</th>
                  <th className="py-2 px-4 border">Amount (Rands)</th>
                  <th className="py-2 px-4 border">Location</th>
                  <th className="py-2 px-4 border">Toll Name</th>
                  <th className="py-2 px-4 border">License Plate</th>
                  <th className="py-2 px-4 border">Toll Incurred At</th>
                </tr>
              </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="text-center border-t hover:bg-gray-100">
                <td className="py-2 px-4">{new Date(transaction.date_paid).toLocaleDateString()}</td>
                <td className="py-2 px-4">{parseFloat(transaction.amount).toFixed(2)}</td>
                <td className="py-2 px-4">{transaction.location}</td>
                <td className="py-2 px-4">{transaction.toll_name || "N/A"}</td>
                <td className="py-2 px-4">{transaction.license_plate || "N/A"}</td> 
                <td className="py-2 px-4">{new Date(transaction.toll_incurred_at).toLocaleDateString()}</td> {/* Format date */}
              </tr>
            ))}
          </tbody>
            </table>

          </Section>
      </Main>
  );
}
