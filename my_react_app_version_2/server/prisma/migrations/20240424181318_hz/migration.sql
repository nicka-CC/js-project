-- CreateTable
CREATE TABLE "User" (
    "_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT DEFAULT '',
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "number" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
