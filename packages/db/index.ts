import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma: ReturnType<typeof prismaClientSingleton> =
  globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

export type {
  Prisma,
  // Model types --------------------------->
  User,
  Quiz,
  Question,
  Participant,
  GameSession,
  Response,
} from "@prisma/client";

// Enum types ----------------------------->
export {
  QuizStatus,
  SessionStatus,
  ParticipantScreen,
  HostScreen,
  SpectatorScreen,
} from "@prisma/client";
