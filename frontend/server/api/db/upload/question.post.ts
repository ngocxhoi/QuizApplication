import { prisma } from "../../prisma";

export const uploadQuiz = async (formatData: any) => {
  const data = await prisma.quiz.create({
    data: {
      question: formatData ?? "[]",
    },
  });

  return data;
};
