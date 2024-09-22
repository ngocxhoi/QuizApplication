import { prisma } from "../../prisma";

export default defineEventHandler(async (event) => {
  const user = await prisma.user.findMany();
  return user.map((item) => item.username);
});
