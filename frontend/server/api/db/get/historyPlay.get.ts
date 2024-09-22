import { prisma } from "../../prisma";

export default defineEventHandler(async (event) => {
  return await prisma.historyPlay.findMany({
    select: {
      username: true,
      level: true,
      questions: true,
      attempts: true,
      points: true,
      results: true,
    },
  });
});
