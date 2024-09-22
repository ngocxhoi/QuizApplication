import { prisma } from "../../prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username } = body;

  const data = await prisma.user.create({
    data: {
      username,
    },
  });

  return data.username;
});
