import { v4 as uuidv4 } from "uuid";

export function generateUniqueHash() {
  // Combine current timestamp with a random value

  return uuidv4();
}

export function nl2br(str) {
  return str.replace(/(?:\r\n|\r|\n)/g, "<br>");
}
export function splitStringByNewLine(str) {
  return str.split(/\r?\n/);
}
