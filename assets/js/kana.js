const DAN = ["あ段", "い段", "う段", "え段", "お段"];

const SEION = [
  ["あ行", ["あ","ア","a","あめ"], ["い","イ","i","いぬ"], ["う","ウ","u","うみ"], ["え","エ","e","えき"], ["お","オ","o","おと"]],
  ["か行", ["か","カ","ka","かさ"], ["き","キ","ki","きく"], ["く","ク","ku","くるま"], ["け","ケ","ke","けん"], ["こ","コ","ko","こども"]],
  ["さ行", ["さ","サ","sa","さかな"], ["し","シ","shi","しろ"], ["す","ス","su","すし"], ["せ","セ","se","せんせい"], ["そ","ソ","so","そら"]],
  ["た行", ["た","タ","ta","たこ"], ["ち","チ","chi","ちず"], ["つ","ツ","tsu","つき"], ["て","テ","te","てがみ"], ["と","ト","to","とり"]],
  ["な行", ["な","ナ","na","なつ"], ["に","ニ","ni","にほん"], ["ぬ","ヌ","nu","ぬの"], ["ね","ネ","ne","ねこ"], ["の","ノ","no","のり"]],
  ["は行", ["は","ハ","ha","はな"], ["ひ","ヒ","hi","ひる"], ["ふ","フ","fu","ふね"], ["へ","ヘ","he","へや"], ["ほ","ホ","ho","ほん"]],
  ["ま行", ["ま","マ","ma","まど"], ["み","ミ","mi","みず"], ["む","ム","mu","むし"], ["め","メ","me","めがね"], ["も","モ","mo","もも"]],
  ["や行", ["や","ヤ","ya","やま"], null, ["ゆ","ユ","yu","ゆき"], null, ["よ","ヨ","yo","よる"]],
  ["ら行", ["ら","ラ","ra","らいねん"], ["り","リ","ri","りんご"], ["る","ル","ru","るす"], ["れ","レ","re","れきし"], ["ろ","ロ","ro","ろく"]],
  ["わ行", ["わ","ワ","wa","わたし"], null, null, null, ["を","ヲ","o/wo","を（助词）"]],
  ["ん", ["ん","ン","n","にほん"], null, null, null, null]
];

const DAKUON = [
  ["が行", ["が","ガ","ga"], ["ぎ","ギ","gi"], ["ぐ","グ","gu"], ["げ","ゲ","ge"], ["ご","ゴ","go"]],
  ["ざ行", ["ざ","ザ","za"], ["じ","ジ","ji"], ["ず","ズ","zu"], ["ぜ","ゼ","ze"], ["ぞ","ゾ","zo"]],
  ["だ行", ["だ","ダ","da"], ["ぢ","ヂ","ji"], ["づ","ヅ","zu"], ["で","デ","de"], ["ど","ド","do"]],
  ["ば行", ["ば","バ","ba"], ["び","ビ","bi"], ["ぶ","ブ","bu"], ["べ","ベ","be"], ["ぼ","ボ","bo"]]
];

const HANDAKUON = [
  ["ぱ行", ["ぱ","パ","pa"], ["ぴ","ピ","pi"], ["ぷ","プ","pu"], ["ぺ","ペ","pe"], ["ぽ","ポ","po"]]
];

const YOUON = [
  ["き", ["きゃ","キャ","kya"], ["きゅ","キュ","kyu"], ["きょ","キョ","kyo"]],
  ["し", ["しゃ","シャ","sha"], ["しゅ","シュ","shu"], ["しょ","ショ","sho"]],
  ["ち", ["ちゃ","チャ","cha"], ["ちゅ","チュ","chu"], ["ちょ","チョ","cho"]],
  ["に", ["にゃ","ニャ","nya"], ["にゅ","ニュ","nyu"], ["にょ","ニョ","nyo"]],
  ["ひ", ["ひゃ","ヒャ","hya"], ["ひゅ","ヒュ","hyu"], ["ひょ","ヒョ","hyo"]],
  ["み", ["みゃ","ミャ","mya"], ["みゅ","ミュ","myu"], ["みょ","ミョ","myo"]],
  ["り", ["りゃ","リャ","rya"], ["りゅ","リュ","ryu"], ["りょ","リョ","ryo"]],
  ["ぎ", ["ぎゃ","ギャ","gya"], ["ぎゅ","ギュ","gyu"], ["ぎょ","ギョ","gyo"]],
  ["じ", ["じゃ","ジャ","ja"], ["じゅ","ジュ","ju"], ["じょ","ジョ","jo"]],
  ["び", ["びゃ","ビャ","bya"], ["びゅ","ビュ","byu"], ["びょ","ビョ","byo"]],
  ["ぴ", ["ぴゃ","ピャ","pya"], ["ぴゅ","ピュ","pyu"], ["ぴょ","ピョ","pyo"]]
];

const LOAN = [
  ["ファ","fa"], ["フィ","fi"], ["フェ","fe"], ["フォ","fo"],
  ["ティ","ti"], ["ディ","di"], ["トゥ","tu"], ["ドゥ","du"],
  ["ウィ","wi"], ["ウェ","we"], ["ウォ","wo"], ["イェ","ye"],
  ["ヴァ","va"], ["ヴィ","vi"], ["ヴェ","ve"], ["ヴォ","vo"],
  ["シェ","she"], ["ジェ","je"], ["チェ","che"], ["ツァ","tsa"],
  ["ツィ","tsi"], ["ツェ","tse"], ["ツォ","tso"], ["ヴ","vu"],
  ["クァ","kwa"], ["グァ","gwa"], ["テュ","tyu"], ["デュ","dyu"]
];

function cellHtml(cell) {
  if (!cell) return `<td class="empty-cell"></td>`;
  const [h, k, r, ex] = cell;
  const speakText = h.replace("（助词）", "");
  return `<td class="kana-cell" data-speak="${speakText}" data-roma="${r}" title="${ex || r}">
    <span class="hira jp">${h}</span>
    <span class="kata jp">${k}</span>
    <span class="roma">${r}</span>
  </td>`;
}

function renderChart(target, rows) {
  const el = document.getElementById(target);
  if (!el) return;
  el.innerHTML = `<tr><th></th>${DAN.map((d) => `<th>${d}</th>`).join("")}</tr>` +
    rows.map((row) => `<tr><th class="row-label">${row[0]}</th>${row.slice(1).map(cellHtml).join("")}</tr>`).join("");
}

function renderYouon() {
  const el = document.getElementById("youon-table");
  el.innerHTML = `<tr><th></th><th>ゃ / ャ</th><th>ゅ / ュ</th><th>ょ / ョ</th></tr>` +
    YOUON.map((row) => `<tr><th class="row-label">${row[0]}</th>${row.slice(1).map(cellHtml).join("")}</tr>`).join("");
}

function renderLoan() {
  document.getElementById("loan-grid").innerHTML = LOAN.map(([k, r]) =>
    `<button type="button" class="kana-cell" data-speak="${k}" data-roma="${r}">
      <span class="hira jp">${k}</span><span class="roma">${r}</span>
    </button>`
  ).join("");
}

function allQuizItems() {
  const items = [];
  for (const row of [...SEION, ...DAKUON, ...HANDAKUON]) {
    for (const cell of row.slice(1)) if (cell) items.push({ h: cell[0], k: cell[1], r: cell[2].split("/")[0] });
  }
  for (const row of YOUON) for (const cell of row.slice(1)) items.push({ h: cell[0], k: cell[1], r: cell[2] });
  return items;
}

let quizPool = [];
let current = null;
let score = { ok: 0, n: 0 };

function nextQuiz() {
  quizPool = allQuizItems();
  current = quizPool[Math.floor(Math.random() * quizPool.length)];
  const mode = document.querySelector("[name=quiz-mode]:checked")?.value || "roma";
  const prompt = mode === "kata" ? current.k : current.h;
  document.getElementById("quiz-char").textContent = prompt;
  const answers = new Set([current.r]);
  while (answers.size < 4) answers.add(quizPool[Math.floor(Math.random() * quizPool.length)].r);
  const list = [...answers].sort(() => Math.random() - 0.5);
  document.getElementById("choices").innerHTML = list.map((r) =>
    `<button type="button" class="choice jp" data-answer="${r}">${r}</button>`
  ).join("");
}

function bind() {
  document.body.addEventListener("click", (e) => {
    const cell = e.target.closest("[data-speak]");
    if (cell) {
      document.querySelectorAll(".kana-cell.active").forEach((n) => n.classList.remove("active"));
      cell.classList.add("active");
      speak(cell.dataset.speak);
    }
    const choice = e.target.closest(".choice");
    if (choice && current && !choice.classList.contains("done")) {
      const ok = choice.dataset.answer === current.r;
      choice.classList.add(ok ? "correct" : "wrong", "done");
      score.n += 1;
      if (ok) score.ok += 1;
      else {
        [...document.querySelectorAll(".choice")].find((b) => b.dataset.answer === current.r)?.classList.add("correct");
      }
      document.getElementById("score").textContent = `答对 ${score.ok} / ${score.n}`;
      speak(current.h);
      setTimeout(nextQuiz, 700);
    }
  });

  document.querySelectorAll("[data-hide]").forEach((box) => {
    box.addEventListener("change", () => {
      document.getElementById("kana-root").classList.toggle(`hide-${box.dataset.hide}`, !box.checked);
    });
  });

  document.getElementById("kana-search").addEventListener("input", (e) => {
    const q = e.target.value.trim().toLowerCase();
    document.querySelectorAll("#kana-root [data-speak]").forEach((cell) => {
      const hit = !q || cell.dataset.speak.includes(q) || (cell.dataset.roma || "").toLowerCase().includes(q);
      cell.style.opacity = hit ? "1" : "0.18";
    });
  });

  document.querySelectorAll("[name=quiz-mode]").forEach((r) => r.addEventListener("change", nextQuiz));
}

ready(() => {
  renderChart("seion-table", SEION);
  renderChart("dakuon-table", DAKUON);
  renderChart("handaku-table", HANDAKUON);
  renderYouon();
  renderLoan();
  bind();
  nextQuiz();
});
