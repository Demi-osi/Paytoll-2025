-- AlterTable
ALTER TABLE "cards" ALTER COLUMN "created_at" SET DEFAULT TIMEZONE('Africa/Johannesburg', NOW()),
ALTER COLUMN "updated_at" SET DEFAULT TIMEZONE('Africa/Johannesburg', NOW());

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "date_paid" SET DEFAULT TIMEZONE('Africa/Johannesburg', NOW());

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT TIMEZONE('Africa/Johannesburg', NOW());

-- AlterTable
ALTER TABLE "vehicles" ALTER COLUMN "created_at" SET DEFAULT TIMEZONE('Africa/Johannesburg', NOW()),
ALTER COLUMN "updated_at" SET DEFAULT TIMEZONE('Africa/Johannesburg', NOW());
