/*
  Warnings:

  - Added the required column `updatedAt` to the `ScanResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."ScanResult" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."Video" ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "fileSize" INTEGER,
ADD COLUMN     "format" TEXT,
ADD COLUMN     "originalFilename" TEXT;

-- CreateIndex
CREATE INDEX "ScanResult_videoId_idx" ON "public"."ScanResult"("videoId");

-- CreateIndex
CREATE INDEX "Video_userId_idx" ON "public"."Video"("userId");
