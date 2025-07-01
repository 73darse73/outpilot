/*
  Warnings:

  - You are about to drop the `_ArticleToTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SlideToTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `articles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ArticleToTag" DROP CONSTRAINT "_ArticleToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArticleToTag" DROP CONSTRAINT "_ArticleToTag_B_fkey";

-- DropForeignKey
ALTER TABLE "_SlideToTag" DROP CONSTRAINT "_SlideToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_SlideToTag" DROP CONSTRAINT "_SlideToTag_B_fkey";

-- DropForeignKey
ALTER TABLE "articles" DROP CONSTRAINT "articles_threadId_fkey";

-- DropTable
DROP TABLE "_ArticleToTag";

-- DropTable
DROP TABLE "_SlideToTag";

-- DropTable
DROP TABLE "articles";

-- DropTable
DROP TABLE "tags";
