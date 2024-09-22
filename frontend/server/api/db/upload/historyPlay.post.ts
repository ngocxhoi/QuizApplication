import { prisma } from "../../prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const data = await prisma.historyPlay.create({
    data: body,
  });

  return data;
});
