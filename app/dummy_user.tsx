type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    balance: number;
    address: string; 
    role: string; // roles: "admin", "user"
  };
  
  const userData: User = {
    id: "b35e9add-6f68-4b46-a57e-ac61a7f6d278",
    firstName: "Demi",
    lastName: "Osi",
    email: "demiosi@example.com",
    balance: 500,
    address: "",       //"123 Main St, Johannesburg, South Africa, 2000", 
    role: "user"
  };
  
  export default userData;
  