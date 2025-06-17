import { OpenAI } from "openai";
import { LLM_API_KEY } from "./constants";

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/featherless-ai/v1",
  apiKey: LLM_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default client;
