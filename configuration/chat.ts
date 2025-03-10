import { OWNER_NAME, AI_NAME } from "./identity";

export const INITIAL_MESSAGE: string = `Salutations, I'm ${AI_NAME}, ${OWNER_NAME}'s narrative assistant within the Warhammer 40K Universe.`;
export const DEFAULT_RESPONSE_MESSAGE: string = `Cogitation error detected. Please resubmit query.`;
export const WORD_CUTOFF: number = 8000; // Number of words until bot says it needs a break
export const WORD_BREAK_MESSAGE: string = `Hold fast - must compute further at this time.`;
export const HISTORY_CONTEXT_LENGTH: number = 7; // Number of messages to use for context when generating a response
