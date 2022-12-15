-- CreateTable
CREATE TABLE "Hero" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "saves" INTEGER NOT NULL,
    "fans" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "AvatarImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "filename" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "image" BLOB NOT NULL,
    "heroId" INTEGER NOT NULL,
    CONSTRAINT "AvatarImage_heroId_fkey" FOREIGN KEY ("heroId") REFERENCES "Hero" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Power" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "_HeroToPower" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_HeroToPower_A_fkey" FOREIGN KEY ("A") REFERENCES "Hero" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_HeroToPower_B_fkey" FOREIGN KEY ("B") REFERENCES "Power" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "AvatarImage_heroId_key" ON "AvatarImage"("heroId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_HeroToPower_AB_unique" ON "_HeroToPower"("A", "B");

-- CreateIndex
CREATE INDEX "_HeroToPower_B_index" ON "_HeroToPower"("B");
