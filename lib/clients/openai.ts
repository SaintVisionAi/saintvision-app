import OpenAI from "openai";
import { CONFIG } from "../env";

export const openai = new OpenAI({
  apiKey: CONFIG.openaiKey,
  organization: CONFIG.openaiOrg,
  // project routing is supported by the SDK; omit if not using Projects
  project: CONFIG.openaiProject,
});
