-- CreateEnum
CREATE TYPE "Template" AS ENUM ('CLASSIC', 'MODERN', 'PASTEL', 'NEON', 'YELLOW', 'GREEN', 'BLUE');

-- CreateEnum
CREATE TYPE "Interactions" AS ENUM ('THUMBS_UP', 'DOLLAR', 'BULB', 'HEART', 'SMILE');

-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('WAITING', 'LIVE', 'COMPLETED', 'PAUSED');

-- CreateEnum
CREATE TYPE "ParticipantScreen" AS ENUM ('LOBBY', 'COUNTDOWN', 'QUESTION_MOTIVATION', 'QUESTION_READING', 'QUESTION_ACTIVE', 'QUESTION_RESULTS');

-- CreateEnum
CREATE TYPE "SpectatorScreen" AS ENUM ('LOBBY', 'QUESTION_MOTIVATION', 'QUESTION_READING', 'QUESTION_ACTIVE', 'QUESTION_RESULTS');

-- CreateEnum
CREATE TYPE "HostScreen" AS ENUM ('LOBBY', 'QUESTION_PREVIEW', 'QUESTION_READING', 'QUESTION_ACTIVE', 'QUESTION_RESULTS');

-- CreateEnum
CREATE TYPE "QuizPhase" AS ENUM ('QUESTION_READING', 'QUESTION_ACTIVE', 'SHOW_RESULTS', 'WAITING_NEXT');

-- CreateEnum
CREATE TYPE "ReactorType" AS ENUM ('HOST', 'SPECTATOR');

-- CreateEnum
CREATE TYPE "ImagePosition" AS ENUM ('RIGHT', 'LEFT');

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "options" TEXT[],
    "correctAnswer" INTEGER NOT NULL,
    "explanation" TEXT,
    "hint" TEXT,
    "difficulty" INTEGER NOT NULL DEFAULT 1,
    "readingTime" INTEGER NOT NULL DEFAULT 7,
    "basePoints" INTEGER NOT NULL DEFAULT 100,
    "timeLimit" INTEGER NOT NULL DEFAULT 30,
    "imagePosition" "ImagePosition" NOT NULL DEFAULT 'RIGHT',
    "orderIndex" INTEGER NOT NULL,
    "imageUrl" TEXT,
    "isAsked" BOOLEAN NOT NULL DEFAULT false,
    "quizId" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "responses" (
    "id" TEXT NOT NULL,
    "selectedAnswer" INTEGER NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "timeToAnswer" INTEGER NOT NULL,
    "pointsEarned" INTEGER NOT NULL,
    "timeBonus" INTEGER NOT NULL DEFAULT 0,
    "streakBonus" INTEGER NOT NULL DEFAULT 0,
    "answeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "participantId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "gameSessionId" TEXT NOT NULL,

    CONSTRAINT "responses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game_sessions" (
    "id" TEXT NOT NULL,
    "currentQuestionIndex" INTEGER NOT NULL DEFAULT 0,
    "currentQuestionId" TEXT,
    "status" "SessionStatus" NOT NULL DEFAULT 'WAITING',
    "hostScreen" "HostScreen" NOT NULL DEFAULT 'LOBBY',
    "participantScreen" "ParticipantScreen" NOT NULL DEFAULT 'LOBBY',
    "spectatorScreen" "SpectatorScreen" NOT NULL DEFAULT 'LOBBY',
    "questionStartedAt" TIMESTAMP(3),
    "questionEndsAt" TIMESTAMP(3),
    "lastEliminationAt" INTEGER,
    "nextEliminationAt" INTEGER,
    "totalParticipants" INTEGER NOT NULL DEFAULT 0,
    "activeParticipants" INTEGER NOT NULL DEFAULT 0,
    "totalSpectators" INTEGER NOT NULL DEFAULT 0,
    "avgResponseTime" INTEGER NOT NULL DEFAULT 0,
    "correctAnswerRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "currentPhase" "QuizPhase",
    "phaseStartTime" TIMESTAMP(3),
    "phaseEndTime" TIMESTAMP(3),
    "quizId" TEXT NOT NULL,

    CONSTRAINT "game_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "participants" (
    "id" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "avatar" TEXT,
    "ipAddress" TEXT,
    "isNameChanged" BOOLEAN NOT NULL DEFAULT false,
    "warningCount" INTEGER NOT NULL DEFAULT 0,
    "isEliminated" BOOLEAN NOT NULL DEFAULT false,
    "eliminatedAt" TIMESTAMP(3),
    "eliminatedAtQuestion" TEXT,
    "finalRank" INTEGER,
    "totalScore" INTEGER NOT NULL DEFAULT 0,
    "correctAnswers" INTEGER NOT NULL DEFAULT 0,
    "longestStreak" INTEGER NOT NULL DEFAULT 0,
    "walletAddress" TEXT,
    "quizId" TEXT NOT NULL,

    CONSTRAINT "participants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "responses_participantId_questionId_key" ON "responses"("participantId", "questionId");

-- CreateIndex
CREATE UNIQUE INDEX "game_sessions_quizId_key" ON "game_sessions"("quizId");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "quizzes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "responses" ADD CONSTRAINT "responses_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "participants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "responses" ADD CONSTRAINT "responses_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "responses" ADD CONSTRAINT "responses_gameSessionId_fkey" FOREIGN KEY ("gameSessionId") REFERENCES "game_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_sessions" ADD CONSTRAINT "game_sessions_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "quizzes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participants" ADD CONSTRAINT "participants_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "quizzes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
