import { testsPrompt } from "./tests-prompt.js";

export async function handlePrompt(type: string) {
  if (type === 'api') {
    console.log('api');
    // await apiPrompt();
  } else if (type === 'test') {
    await testsPrompt();
  }
}