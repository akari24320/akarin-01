import { omikujiSentences1, omikujiSentences2, omikujiSentences3 } from "./EntireDiscription";

export function getEntireDiscription(): string[] {
    const random1 = omikujiSentences1[Math.floor(Math.random() * omikujiSentences1.length)];
    const random2 = omikujiSentences2[Math.floor(Math.random() * omikujiSentences2.length)];
    const random3 = omikujiSentences3[Math.floor(Math.random() * omikujiSentences3.length)];

    return [random1, random2, random3];
}
