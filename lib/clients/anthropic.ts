import Anthropic from "@anthropic-ai/sdk";
import { CONFIG } from "../env";

export const anthropic = new Anthropic({
  apiKey: CONFIG.anthropicKey,
});
