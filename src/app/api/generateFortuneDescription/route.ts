// import { NextRequest, NextResponse } from "next/server";
// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function POST(req: NextRequest) {
//   const { fortune, wish, work, lost, love, money, health } = await req.json();

//   const prompt = `
// 運勢‥ ${fortune}
// 願事‥ ${wish}
// 仕事‥ ${work}
// 失物‥ ${lost}
// 恋愛‥ ${love}
// 金銭‥ ${money}
// 健康‥ ${health}

// 上記のように、「運勢 ・・」、「健康 ‥」、「金銭 ‥」、「恋愛 ‥」、「失物 ‥」、「仕事 ‥」、「願事 ‥」のあとに各項目の説明をされたら、その分を基に3行の古風な感じの抽象的な句を作ってください。1行の文章は、必ず日本語で文字数は8文字以内にしてください。
// 作成した3行以外の文字を出力に絶対に入れないでください。

// 例：
// 時を待てば叶い
// 歩みを揃え進め
// 月とともに眠れ
// `;

//   try {
//     const completion = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [{ role: "user", content: prompt }],
//       max_tokens: 100,
//     });

//     const generatedText = completion.choices[0].message.content?.trim() ?? "生成されたテキストがありません。";
//     return NextResponse.json({ generatedText });
//   } catch (error) {
//     const err = error as Error;
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }
