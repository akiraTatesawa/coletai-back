-- CreateTable
CREATE TABLE "cooperatives" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cooperatives_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cooperatives_name_key" ON "cooperatives"("name");

-- CreateIndex
CREATE UNIQUE INDEX "cooperatives_email_key" ON "cooperatives"("email");
