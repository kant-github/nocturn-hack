-- CreateTable
CREATE TABLE "hosts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT,
    "walletAddress" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLoginAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hosts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quizzes" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "description" TEXT,
    "participantCode" TEXT,
    "spectatorCode" TEXT,
    "spectatorLink" TEXT,
    "prizePool" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'SOL',
    "basePointsPerQuestion" INTEGER NOT NULL DEFAULT 100,
    "pointsMultiplier" DOUBLE PRECISION NOT NULL DEFAULT 1.2,
    "timeBonus" BOOLEAN NOT NULL DEFAULT true,
    "eliminationThreshold" DOUBLE PRECISION NOT NULL DEFAULT 0.5,
    "questionTimeLimit" INTEGER NOT NULL DEFAULT 30,
    "breakBetweenQuestions" INTEGER NOT NULL DEFAULT 5,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "scheduledAt" TIMESTAMP(3),
    "startedAt" TIMESTAMP(3),
    "endedAt" TIMESTAMP(3),
    "hostId" TEXT NOT NULL,
    "autoSave" BOOLEAN NOT NULL DEFAULT true,
    "liveChat" BOOLEAN NOT NULL DEFAULT false,
    "spectatorMode" BOOLEAN NOT NULL DEFAULT false,
    "allowNewSpectator" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "quizzes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "hosts_email_key" ON "hosts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "hosts_walletAddress_key" ON "hosts"("walletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "quizzes_participantCode_key" ON "quizzes"("participantCode");

-- CreateIndex
CREATE UNIQUE INDEX "quizzes_spectatorCode_key" ON "quizzes"("spectatorCode");

-- AddForeignKey
ALTER TABLE "quizzes" ADD CONSTRAINT "quizzes_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "hosts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
