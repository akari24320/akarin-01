const fortunes = [
    { name: "大吉", probability: 0.1, descriptions: {
        wish: ["不思議なくらい叶う", "努力は実を結ぶだろう"],
        work: ["つよつよ絶好調", "絶好調な日が続く"],
        lost: ["思わぬところから出てくる", "きっと身近から出る"],
        love: ["尽くせば返してくれる", "素敵な出会いがあるかも", "自分磨きのチャンス ！"],
        money: ["思わぬ収入があるかも", "金運絶好調 ！"],
        health: ["たくさん運動してもいいね", "もずくがおすすめ", "トマトジュースがおすすめ"]
    }},
    { name: "中吉", probability: 0.15, descriptions: {
        wish: ["願いは順調に進む", "諦めなければ叶う"],
        work: ["順調に進むが油断は禁物", "少し努力すれば成果が出る"],
        lost: ["探せばすぐ見つかる", "周囲に聞いてみよう"],
        love: ["お出かけに誘ってみよう", "慎重に進めると吉"],
        money: ["無駄遣いに気をつけよう", "堅実な運用が吉"],
        health: ["温泉行こう ！", "疲れを溜めないようにしよう"]
    }},
    { name: "吉", probability: 0.15, descriptions: {
        wish: ["時間はかかるが叶う", "小さな努力が実を結ぶ"],
        work: ["謙虚な姿勢でいるといい", "努力が実を結ぶ時"],
        lost: ["見つかるが時間がかかる", "落ち着いて探せば出てくる"],
        love: ["相手を大切にすると良い", "焦らずじっくり進めよう"],
        money: ["貯金を意識しよう", "少しの投資が吉"],
        health: ["適度な運動が大事", "ストレスを溜め込まないで ！"]
    }},
    { name: "小吉", probability: 0.15, descriptions: {
        wish: ["叶う可能性はあるが焦らずに", "信念をもっていこう"],
        work: ["慎重に進めれば良い結果に", "周囲の助けを得ると良い"],
        lost: ["大変な思いをして見つかる", "思い出せば手がかりがある"],
        love: ["相手との距離を大切に", "自然な流れに任せよう"],
        money: ["節約を心がけよう", "大きな出費に注意"],
        health: ["適度な休息を取ろう", "健康管理に気をつけて"]
    }},
    { name: "末吉", probability: 0.15, descriptions: {
        wish: ["努力すれば叶うが時間が必要", "一歩ずつ進めば道は開ける"],
        work: ["停滞気味なので焦らずに", "慎重に行動すると良い"],
        lost: ["予想外の場所にあるかも", "誰かの手を借りると見つかる"],
        love: ["無理をせず自然体で", "焦ると空回り"],
        money: ["計画的な支出が必要", "ついつい浪費してない ？"],
        health: ["体調管理を意識しよう", "睡眠をしっかりとると良い"]
    }},
    { name: "凶", probability: 0.1, descriptions: {
        wish: ["叶えるには努力が必要", "慎重に進めば可能性はある"],
        work: ["注意が必要な時期", "周囲と協力すると良い"],
        lost: ["なかなか見つからないかも", "思い切って諦めるのも手"],
        love: ["無理な行動は避けよう", "冷静な判断が重要"],
        money: ["節約が重要", "不要な出費は避けるべき"],
        health: ["無理をせず体を休めよう", "ドカ起きには注意"]
    }},
    { name: "狂", probability: 0.1, descriptions: {
        wish: ["よもやまで叶えよう", "執行部に頼めばいけるかも"],
        work: ["24に行けばタスクが捗る", "大量タスクで覚醒しちゃう"],
        lost: ["多分24に忘れてる", "セカストにあるかも", "学生課に行こう"],
        love: ["そこに愛はあるんか", "ぬいぐるみを抱きしめよう", "実行委員長に相談しよう"],
        money: ["24の自販機を確認しよう", "財務局員と仲良くなろう"],
        health: ["カフェインを摂取しよう", "山岡家に行くのがおすすめ"]
    }},
    { name: "大凶", probability: 0.1, descriptions: {
        wish: ["叶えるのは難しいかも", "報われないときもあるさ"],
        work: ["慎重に行動を", "無理は禁物","休憩が必要やね"],
        lost: ["見つからない ！", "増えちゃう ！"],
        love: ["ここは一旦慎重にいこう", "今は動かない方がいいかも"],
        money: ["節約が最優先", "大きな出費は避けるべき"],
        health: ["ぎっくり腰がやばい", "お風呂中に天井は見ないこと"]
    }}
];


export const getRandomFortune = () => {
    const random = Math.random();
    let sum = 0;
    for (const fortune of fortunes) {
        sum += fortune.probability;
        if (random < sum) {
            return fortune;
        }
    }
    return fortunes[0];
};

export const getRandomDescription = (descriptions: string[]) => {
    return descriptions[Math.floor(Math.random() * descriptions.length)];
};