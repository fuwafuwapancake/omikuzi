'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

userNameInput.onkeydown = event => {
    if (event.key === 'Enter') {

        assessmentButton.onclick();
    }
};
assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0) {
        // 名前が空の時は処理を終了する
        return;
    }

    // 診断結果表示エリアの作成
    resultDivided.innerText = '';

    // headerDivided の作成

    const headerDivided = document.createElement('div');
    headerDivided.setAttribute('class', 'card-header bg-$red-400');
    headerDivided.innerText = '診断結果';
    
    // bodyDivided の作成
    const bodyDivided = document.createElement('div');
    bodyDivided.setAttribute('class', 'card-body');

    const paragraph = document.createElement('p');
    paragraph.setAttribute('class', 'card-text');
    const result = assessment(userName);
    paragraph.innerText = result;
    bodyDivided.appendChild(paragraph);

    // resultDivided に Bootstrap のスタイルを適用する
    resultDivided.setAttribute('class', 'card');
    resultDivided.setAttribute('style', 'max-width: 700px;')

    // headerDivided と bodyDivided を resultDivided に差し込む
    resultDivided.appendChild(headerDivided);
    resultDivided.appendChild(bodyDivided);
    // TODO ツイートエリアの作成
    tweetDivided.innerText = '';
    const anchor = document.createElement('a');
    const hrefValue =
        'https://twitter.com/intent/tweet?button_hashtag=' +
        encodeURIComponent('今日の運勢') +
        '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefValue);
    anchor.setAttribute('class', 'twitter-hashtag-button');
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #今日の運勢';
    tweetDivided.appendChild(anchor);

    // widgets.js の設定
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
};

const answers = [
   '{userName}の今日の運勢はなんと‼大大吉です。{userName}はもしかしたら宝くじが当たるかも。',
    '{userName}の今日の運勢は大吉です。{userName}は今日何をしてもうまくいくでしょう！。',
    '{userName}の今日の運勢は向大吉です。{userName}は今日良いことが起きるでしょう。',
    '{userName}の今日の運勢は末大吉です。{userName}はテストで７０点をとるでしょう。',
    '{userName}の今日の運勢は吉凶未分末大吉です。{userName}は自動販売機でもう一本当たるでしょう。',
    '{userName}の今日の運勢は吉です。{userName}あなたは今日１００円を拾うでしょう。',
    '{userName}の今日の運勢は中吉です。{userName}はレアは当たるがすり抜けるでしょう。',
    '{userName}の今日の運勢は小吉です。{userName}は何もない一日を過ごすでしょう。',
    '{userName}の今日の運勢は後吉です。{userName}に少々の困難があなたに降りかかるでしょう。',
    '{userName}の今日の運勢は末吉です。{userName}久しぶりにしゃべったことのないクラスメイトに合うでしょう。',
    '{userName}の今日の運勢は吉凶不分末吉です。{userName}ちょうどいいところでスマホの充電が切れるでしょう。',
    '{userName}の今日の運勢は吉凶相交末吉です。{userName}寝坊して遅刻するでしょう。',
    '{userName}の今日の運勢は吉凶相半です。{userName}テスト前日に寝落ちして何もわからないでしょう。',
    '{userName}の今日の運勢は小凶後吉です。{userName}は２択をすべて外すでしょう。',
    '{userName}の今日の運勢は凶後吉です。{userName}はこけたところを人に見られるでしょう。',
    '{userName}の今日の運勢は凶後大吉です。内側から溢れ出る負のオーラが{userName}の周りの人を遠ざけてしまうでしょう。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
    // 文字のコード番号の合計を回答の数で割って添字の数値を求める
    const index = Math.floor( Math.random() * answers.length );
    let result = answers[index];

    result = result.replaceAll('{userName}', userName);
    return result;
}

// テストコード
console.assert(
    assessment('太郎') ===
    '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);
console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);
