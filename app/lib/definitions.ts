export type Vehicle = {
    id?: string; // Will be created on the database
    licensePlate: string; //More details will be added later when pulling from a database
    tollIncurred: number; 
    tolls: { [key: number]: string };
    make: string;
    model:string;
    year: number;
  };

  export type Card = {
    id?: string; // Will be created on the database
    licensePlate: string; //More details will be added later when pulling from a database
    tollIncurred: number; 
    make: string;
    model:string;
    year: number;
  };

  export type Transaction = {
    id: string;
    vehicle_id: string;
    amount: string;  // or `Decimal` depending on how you handle it in your front end
    location: string;
    toll_name: string | null;  // It's nullable in your schema
    license_plate: string | null;  // It's nullable in your schema
    toll_incurred_at: string;  // You can parse this into a `Date` later
    date_paid: string;  // Similarly, you can parse this into a `Date` later
  };