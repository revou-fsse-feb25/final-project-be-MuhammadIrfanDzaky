/*
  Warnings:

  - The values [PENDING,CONFIRMED,CANCELLED,COMPLETED] on the enum `BookingStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [PENDING,PAID,REFUNDED] on the enum `PaymentStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [SUPER_ADMIN,FIELD_OWNER,REGULAR_USER] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."BookingStatus_new" AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');
ALTER TABLE "public"."bookings" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."bookings" ALTER COLUMN "status" TYPE "public"."BookingStatus_new" USING ("status"::text::"public"."BookingStatus_new");
ALTER TYPE "public"."BookingStatus" RENAME TO "BookingStatus_old";
ALTER TYPE "public"."BookingStatus_new" RENAME TO "BookingStatus";
DROP TYPE "public"."BookingStatus_old";
ALTER TABLE "public"."bookings" ALTER COLUMN "status" SET DEFAULT 'pending';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."PaymentStatus_new" AS ENUM ('pending', 'paid', 'refunded');
ALTER TABLE "public"."bookings" ALTER COLUMN "paymentStatus" DROP DEFAULT;
ALTER TABLE "public"."bookings" ALTER COLUMN "paymentStatus" TYPE "public"."PaymentStatus_new" USING ("paymentStatus"::text::"public"."PaymentStatus_new");
ALTER TYPE "public"."PaymentStatus" RENAME TO "PaymentStatus_old";
ALTER TYPE "public"."PaymentStatus_new" RENAME TO "PaymentStatus";
DROP TYPE "public"."PaymentStatus_old";
ALTER TABLE "public"."bookings" ALTER COLUMN "paymentStatus" SET DEFAULT 'pending';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."UserRole_new" AS ENUM ('super_admin', 'field_owner', 'regular_user');
ALTER TABLE "public"."users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "public"."users" ALTER COLUMN "role" TYPE "public"."UserRole_new" USING ("role"::text::"public"."UserRole_new");
ALTER TYPE "public"."UserRole" RENAME TO "UserRole_old";
ALTER TYPE "public"."UserRole_new" RENAME TO "UserRole";
DROP TYPE "public"."UserRole_old";
ALTER TABLE "public"."users" ALTER COLUMN "role" SET DEFAULT 'regular_user';
COMMIT;

-- AlterTable
ALTER TABLE "public"."bookings" ALTER COLUMN "status" SET DEFAULT 'pending',
ALTER COLUMN "paymentStatus" SET DEFAULT 'pending';

-- AlterTable
ALTER TABLE "public"."users" ALTER COLUMN "role" SET DEFAULT 'regular_user';
