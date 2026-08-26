const GODAN = {
  "う": { a: "わ", i: "い", e: "え", o: "お", te: "って", ta: "った" },
  "く": { a: "か", i: "き", e: "け", o: "こ", te: "いて", ta: "いた" },
  "ぐ": { a: "が", i: "ぎ", e: "げ", o: "ご", te: "いで", ta: "いだ" },
  "す": { a: "さ", i: "し", e: "せ", o: "そ", te: "して", ta: "した" },
  "つ": { a: "た", i: "ち", e: "て", o: "と", te: "って", ta: "った" },
  "ぬ": { a: "な", i: "に", e: "ね", o: "の", te: "んで", ta: "んだ" },
  "ぶ": { a: "ば", i: "び", e: "べ", o: "ぼ", te: "んで", ta: "んだ" },
  "む": { a: "ま", i: "み", e: "め", o: "も", te: "んで", ta: "んだ" },
  "る": { a: "ら", i: "り", e: "れ", o: "ろ", te: "って", ta: "った" }
};

const GODAN_RU = new Set("帰る 切る 知る 入る 走る 減る 要る しゃべる 限る 握る 参る 混じる 交じる 練る 照る 湿る 焦る 茂る 蹴る 滑る 詰まる 終わる 当たる 断る 取る 作る 乗る 座る 送る 売る 着る".split(" "));
GODAN_RU.delete("着る"); // 着る is ichidan

const ICHIDAN_LOOKALIKE = new Set("見る 着る 寝る いる 来る できる 食べる 起きる 教える 始める 開ける 閉める 信じる 降りる 浴びる 借りる".split(" "));

const VERBS = [
  { d: "書く", t: 1, m: "写" }, { d: "読む", t: 1, m: "读" }, { d: "飲む", t: 1, m: "喝" },
  { d: "買う", t: 1, m: "买" }, { d: "待つ", t: 1, m: "等" }, { d: "話す", t: 1, m: "说" },
  { d: "泳ぐ", t: 1, m: "游泳" }, { d: "死ぬ", t: 1, m: "死" }, { d: "遊ぶ", t: 1, m: "玩" },
  { d: "帰る", t: 1, m: "回去" }, { d: "切る", t: 1, m: "切" }, { d: "行く", t: 1, m: "去" },
  { d: "知る", t: 1, m: "知道" }, { d: "取る", t: 1, m: "拿" }, { d: "作る", t: 1, m: "做/造" },
  { d: "思う", t: 1, m: "想" }, { d: "持つ", t: 1, m: "拿着" }, { d: "聞く", t: 1, m: "听/问" },
  { d: "食べる", t: 2, m: "吃" }, { d: "見る", t: 2, m: "看" }, { d: "起きる", t: 2, m: "起床" },
  { d: "教える", t: 2, m: "教" }, { d: "寝る", t: 2, m: "睡觉" }, { d: "いる", t: 2, m: "在（人）" },
  { d: "始める", t: 2, m: "开始" }, { d: "開ける", t: 2, m: "打开" }, { d: "借りる", t: 2, m: "借" },
  { d: "する", t: 3, m: "做" }, { d: "来る", t: 3, m: "来" }, { d: "勉強する", t: 3, m: "学习" }
];

function guessType(dict) {
  if (dict === "する" || dict.endsWith("する") || dict === "来る" || dict === "くる") return 3;
  if (GODAN_RU.has(dict)) return 1;
  if (ICHIDAN_LOOKALIKE.has(dict) || /[いきぎしじちぢにひびぴみりえけげせぜてでねへべぺめれ]る$/.test(dict)) return 2;
  return 1;
}

function conjugate(dict, type) {
  if (dict.endsWith("する") && dict !== "する") {
    const head = dict.slice(0, -2);
    const s = conjugate("する", 3);
    const out = {};
    for (const k of Object.keys(s)) out[k] = head + s[k];
    return out;
  }
  if (type === 3 && (dict === "する")) {
    return {
      dict, masu: "します", te: "して", ta: "した", nai: "しない",
      pot: "できる", pass: "される", caus: "させる", cp: "させられる",
      vol: "しよう", imp: "しろ／せよ", ba: "すれば", ng: "するな"
    };
  }
  if (type === 3 && (dict === "来る" || dict === "くる")) {
    return {
      dict: "来る", masu: "来ます", te: "来て", ta: "来た", nai: "来ない",
      pot: "来られる", pass: "来られる", caus: "来させる", cp: "来させられる",
      vol: "来よう", imp: "来い", ba: "来れば", ng: "来るな"
    };
  }
  if (type === 2) {
    const stem = dict.replace(/る$/, "");
    return {
      dict, masu: stem + "ます", te: stem + "て", ta: stem + "た", nai: stem + "ない",
      pot: stem + "られる", pass: stem + "られる", caus: stem + "させる", cp: stem + "させられる",
      vol: stem + "よう", imp: stem + "ろ／よ", ba: stem + "れば", ng: dict + "な"
    };
  }
  const end = dict.slice(-1);
  const stem = dict.slice(0, -1);
  const g = GODAN[end];
  if (!g) return null;
  const te = dict === "行く" || dict === "いく" ? "行って" : stem + g.te;
  const ta = dict === "行く" || dict === "いく" ? "行った" : stem + g.ta;
  return {
    dict, masu: stem + g.i + "ます", te, ta, nai: stem + g.a + "ない",
    pot: stem + g.e + "る", pass: stem + g.a + "れる", caus: stem + g.a + "せる",
    cp: stem + g.a + "せられる／" + stem + g.a + "される",
    vol: stem + g.o + "う", imp: stem + g.e, ba: stem + g.e + "ば", ng: dict + "な"
  };
}

const LABELS = [
  ["dict", "1 辞书形", "基本形 / 字典形"],
  ["masu", "2 ます形", "礼貌现在・将来"],
  ["te", "3 て形", "连接 / 请求 / 进行"],
  ["ta", "4 た形", "过去・完成"],
  ["nai", "5 ない形", "普通否定"],
  ["pot", "6 可能形", "能够做"],
  ["pass", "7 被动形", "被……"],
  ["caus", "8 使役形", "让 / 叫别人做"],
  ["cp", "9 使役被动", "被迫做"],
  ["vol", "10 意向形", "打算 / 一起吧"],
  ["imp", "11 命令形", "命令"],
  ["ba", "12 ば形", "如果……就"],
  ["ng", "13 禁止形", "不许做"]
];

const EXAMPLES = {
  1: conjugate("書く", 1),
  2: conjugate("食べる", 2),
  する: conjugate("する", 3),
  来る: conjugate("来る", 3)
};

function renderMaster() {
  const body = LABELS.map(([key, name, use]) => `<tr>
    <td>${name}<br><small>${use}</small></td>
    <td class="jp">${EXAMPLES[1][key]}</td>
    <td class="jp">${EXAMPLES[2][key]}</td>
    <td class="jp">${EXAMPLES["する"][key]}</td>
    <td class="jp">${EXAMPLES["来る"][key]}</td>
  </tr>`).join("");
  document.getElementById("master-body").innerHTML = body;
}

function showResult(dict, type) {
  const c = conjugate(dict, type);
  const box = document.getElementById("result-grid");
  if (!c) {
    box.innerHTML = `<div class="note warn">无法识别词尾。请输入辞书形，如 書く、食べる、する。</div>`;
    return;
  }
  box.innerHTML = LABELS.map(([key, name, use]) =>
    `<div class="result-item"><div class="label">${name} · ${use}</div><div class="value jp">${c[key]}</div></div>`
  ).join("");
}

function runConjugator() {
  const dict = document.getElementById("verb-input").value.trim();
  let type = Number(document.getElementById("verb-type").value);
  if (!dict) return;
  if (type === 0) type = guessType(dict);
  document.getElementById("guess").textContent =
    `按${["", "一类（五段）", "二类（一段）", "三类（不规则）"][type]}变形`;
  showResult(dict, type);
  speak(dict);
}

ready(() => {
  renderMaster();
  document.getElementById("chips").innerHTML = VERBS.map((v) =>
    `<button type="button" class="chip" data-d="${v.d}" data-t="${v.t}">${v.d} ${v.m}</button>`
  ).join("");
  document.getElementById("chips").addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    document.getElementById("verb-input").value = chip.dataset.d;
    document.getElementById("verb-type").value = chip.dataset.t;
    document.querySelectorAll(".chip").forEach((c) => c.classList.toggle("on", c === chip));
    runConjugator();
  });
  document.getElementById("go").addEventListener("click", runConjugator);
  document.getElementById("verb-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") runConjugator();
  });
  document.getElementById("verb-input").value = "書く";
  document.getElementById("verb-type").value = "1";
  runConjugator();
});
