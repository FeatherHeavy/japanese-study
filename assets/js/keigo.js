const KEIGO = [
  ["行く／来る／いる", "いらっしゃる／おいでになる", "参る／伺う", "go/come/be"],
  ["言う", "おっしゃる", "申す／申し上げる", "say"],
  ["する", "なさる／される", "いたす／させていただく", "do"],
  ["見る", "ご覧になる", "拝見する", "see"],
  ["食べる／飲む", "召し上がる", "いただく", "eat/drink"],
  ["知っている", "ご存じだ", "存じている／存じ上げる", "know"],
  ["もらう", "くださる", "いただく", "receive"],
  ["给（我→对方）", "—", "差し上げる／あげる", "give"],
  ["思う", "思っていらっしゃる", "存じる", "think"],
  ["会う", "お会いになる", "お目にかかる", "meet"],
  ["聞く／訪ねる", "お聞きになる", "伺う", "ask/visit"],
  ["いる（人在）", "いらっしゃる／おいでになる", "おる", "be"],
  ["ある", "—", "ござる→ございます", "exist"],
  ["死ぬ", "お亡くなりになる", "—", "pass away"],
  ["着る", "お召しになる", "—", "wear"],
  ["寝る", "お休みになる", "—", "sleep"],
  ["くれる", "くださる", "—", "give to me"]
];

const MAIL = [
  ["打招呼", "いつもお世話になっております。", "承蒙关照（商务开场）"],
  ["拜托", "お手数ですが、よろしくお願いいたします。", "麻烦您了，拜托"],
  ["道歉", "申し訳ございません。", "非常抱歉（比すみません更重）"],
  ["打扰", "恐れ入りますが……", "抱歉打扰，想拜托……"],
  ["结束", "失礼いたします。", "告辞／挂电话结束"],
  ["确认", "ご確認のほど、お願いいたします。", "请您确认"],
  ["附件", "書類を送付いたします。", "我方寄送材料"],
  ["等候", "お返事をお待ちしております。", "等候您的回复"],
  ["感谢", "ご対応いただき、ありがとうございます。", "感谢您的处理"],
  ["改期", "日程を調整していただけますでしょうか。", "能否请您调整日程"]
];

ready(() => {
  const q = document.getElementById("keigo-search");
  const body = document.getElementById("keigo-body");
  function render(filter = "") {
    const f = filter.trim().toLowerCase();
    body.innerHTML = KEIGO.filter((row) => row.join(" ").toLowerCase().includes(f)).map((row) =>
      `<tr>
        <td class="jp">${row[0]}</td>
        <td class="jp">${row[1]}</td>
        <td class="jp">${row[2]}</td>
      </tr>`
    ).join("") || `<tr><td colspan="3">没有匹配项</td></tr>`;
  }
  q.addEventListener("input", () => render(q.value));
  render();

  document.getElementById("mail-body").innerHTML = MAIL.map((r) =>
    `<tr><td>${r[0]}</td><td class="jp">${r[1]}</td><td>${r[2]}</td></tr>`
  ).join("");

  document.getElementById("keigo-body").addEventListener("click", (e) => {
    const td = e.target.closest("td");
    if (td) speak(td.textContent.replace(/[／—（）]/g, "、").split("、")[0]);
  });
});
