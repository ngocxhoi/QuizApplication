import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "../../prisma";
import { uploadQuiz } from "../upload/question.post";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { topic, level } = body;

  const genAi = new GoogleGenerativeAI(process.env.API_KEY as string);
  const modal = genAi.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const prompt = `Tạo cho tôi một string json là một mảng chứa 10 câu quiz với mỗi câu là một object có một trường question: câu hỏi, trường options: là mảng chứa 4 đáp án để người chơi lựa chọn, trường answer: là vị trí của đáp án đúng trong trường options ứng với 0 1 2 và 3. Các câu quiz sẽ được tạo về chủ đề ${topic} phù hợp với người chơi mức độ ${level}. Yêu cầu nội dung trong trường question và options là tiếng việt, không trả về gì thêm ngoài nội dung được yêu cầu`;

  const result = await modal.generateContent(prompt);

  const data = result.response.candidates?.[0].content.parts?.[0];
  const formatData = data?.text
    ?.trim()
    .replace(/^```json\s*/, "")
    .replace(/\s*```$/, "");

  return await uploadQuiz(formatData);
});
