#!/usr/bin/env python3
"""Generate improved Japanese study PDFs (A4, print-friendly)."""
from pathlib import Path
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor, white, Color
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, PageBreak, KeepTogether
)

FONT = "/System/Library/Fonts/Supplemental/Arial Unicode.ttf"
pdfmetrics.registerFont(TTFont("CJK", FONT))

NAVY = HexColor("#1e3a5f")
NAVY2 = HexColor("#2c5282")
PAPER = HexColor("#f7f3ea")
LINE = HexColor("#d9d0bf")
INK = HexColor("#1c2330")
MUTED = HexColor("#4a5568")
GOLD = HexColor("#b0894a")
GREEN = HexColor("#276749")
BLUE = HexColor("#2b6cb0")
ORANGE = HexColor("#c05621")
PURPLE = HexColor("#6b46c1")
WARN = HexColor("#7a2d26")

OUT = Path(__file__).resolve().parents[1] / "pdf"
OUT.mkdir(exist_ok=True)
DESKTOP = Path("/Users/bitech/Desktop")


def styles():
    return {
        "h1": ParagraphStyle("h1", fontName="CJK", fontSize=16, textColor=white, leading=20, alignment=TA_LEFT),
        "sub": ParagraphStyle("sub", fontName="CJK", fontSize=9, textColor=HexColor("#dce7f5"), leading=12),
        "h2": ParagraphStyle("h2", fontName="CJK", fontSize=12, textColor=NAVY, leading=16, spaceBefore=6, spaceAfter=4),
        "body": ParagraphStyle("body", fontName="CJK", fontSize=8.2, textColor=INK, leading=12),
        "small": ParagraphStyle("small", fontName="CJK", fontSize=7.4, textColor=MUTED, leading=10.5),
        "cell": ParagraphStyle("cell", fontName="CJK", fontSize=8, textColor=INK, leading=11, alignment=TA_CENTER),
        "cellh": ParagraphStyle("cellh", fontName="CJK", fontSize=11, textColor=NAVY, leading=13, alignment=TA_CENTER),
        "th": ParagraphStyle("th", fontName="CJK", fontSize=8, textColor=white, leading=11, alignment=TA_CENTER),
        "td": ParagraphStyle("td", fontName="CJK", fontSize=8, textColor=INK, leading=11),
        "tdc": ParagraphStyle("tdc", fontName="CJK", fontSize=8, textColor=INK, leading=11, alignment=TA_CENTER),
        "foot": ParagraphStyle("foot", fontName="CJK", fontSize=7, textColor=MUTED, leading=9, alignment=TA_CENTER),
    }


def header_table(S, title, subtitle, page):
    data = [[
        Paragraph(title, S["h1"]),
        Paragraph(subtitle, S["sub"]),
        Paragraph(page, S["sub"]),
    ]]
    t = Table(data, colWidths=[95*mm, 70*mm, 18*mm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), NAVY),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ("ALIGN", (-1, 0), (-1, 0), "RIGHT"),
    ]))
    return t


def footer(S, text):
    return Paragraph(text, S["foot"])


def kana_cell(S, h, k, r):
    return Paragraph(f"<font size='12'><b>{h}</b></font><br/>{k}<br/><font color='#4a5568' size='7'>{r}</font>", S["cell"])


def empty_cell(S):
    return Paragraph("　", S["cell"])


def styled_table(data, col_widths, header=True, alt=True, header_color=NAVY):
    t = Table(data, colWidths=col_widths, repeatRows=1 if header else 0)
    cmds = [
        ("FONTNAME", (0, 0), (-1, -1), "CJK"),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("GRID", (0, 0), (-1, -1), 0.3, LINE),
        ("LEFTPADDING", (0, 0), (-1, -1), 4),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4),
        ("TOPPADDING", (0, 0), (-1, -1), 3),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
        ("BACKGROUND", (0, 0), (-1, -1), white),
    ]
    if header:
        cmds += [
            ("BACKGROUND", (0, 0), (-1, 0), header_color),
            ("TEXTCOLOR", (0, 0), (-1, 0), white),
            ("ALIGN", (0, 0), (-1, 0), "CENTER"),
        ]
    if alt:
        for i in range(1, len(data)):
            if i % 2 == 0:
                cmds.append(("BACKGROUND", (0, i), (-1, i), PAPER))
    t.setStyle(TableStyle(cmds))
    return t


def on_page(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(HexColor("#f4efe4"))
    canvas.rect(0, 0, A4[0], A4[1], fill=1, stroke=0)
    canvas.restoreState()


def build(path, story):
    doc = SimpleDocTemplate(
        str(path), pagesize=A4,
        leftMargin=12*mm, rightMargin=12*mm,
        topMargin=10*mm, bottomMargin=12*mm,
        title=path.stem,
        author="japanese-study",
    )
    doc.build(story, onFirstPage=on_page, onLaterPages=on_page)


def kana_pdf():
    S = styles()
    story = []

    def seion_table():
        rows_src = [
            ("あ行", [("あ","ア","a"),("い","イ","i"),("う","ウ","u"),("え","エ","e"),("お","オ","o")]),
            ("か行", [("か","カ","ka"),("き","キ","ki"),("く","ク","ku"),("け","ケ","ke"),("こ","コ","ko")]),
            ("さ行", [("さ","サ","sa"),("し","シ","shi"),("す","ス","su"),("せ","セ","se"),("そ","ソ","so")]),
            ("た行", [("た","タ","ta"),("ち","チ","chi"),("つ","ツ","tsu"),("て","テ","te"),("と","ト","to")]),
            ("な行", [("な","ナ","na"),("に","ニ","ni"),("ぬ","ヌ","nu"),("ね","ネ","ne"),("の","ノ","no")]),
            ("は行", [("は","ハ","ha"),("ひ","ヒ","hi"),("ふ","フ","fu"),("へ","ヘ","he"),("ほ","ホ","ho")]),
            ("ま行", [("ま","マ","ma"),("み","ミ","mi"),("む","ム","mu"),("め","メ","me"),("も","モ","mo")]),
            ("や行", [("や","ヤ","ya"), None, ("ゆ","ユ","yu"), None, ("よ","ヨ","yo")]),
            ("ら行", [("ら","ラ","ra"),("り","リ","ri"),("る","ル","ru"),("れ","レ","re"),("ろ","ロ","ro")]),
            ("わ行", [("わ","ワ","wa"), None, None, None, ("を","ヲ","o/wo")]),
            ("ん", [("ん","ン","n"), None, None, None, None]),
        ]
        head = [Paragraph(x, S["th"]) for x in ["", "あ段", "い段", "う段", "え段", "お段"]]
        data = [head]
        for label, cells in rows_src:
            row = [Paragraph(label, S["tdc"])]
            for c in cells:
                row.append(kana_cell(S, *c) if c else empty_cell(S))
            data.append(row)
        t = Table(data, colWidths=[16*mm, 34*mm, 34*mm, 34*mm, 34*mm, 34*mm])
        cmds = [
            ("BACKGROUND", (0, 0), (-1, 0), NAVY),
            ("BACKGROUND", (0, 1), (0, -1), HexColor("#e8eef6")),
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ("ALIGN", (0, 0), (-1, -1), "CENTER"),
            ("GRID", (0, 0), (-1, -1), 0.4, LINE),
            ("TOPPADDING", (0, 0), (-1, -1), 4),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ]
        for r, (_label, cells) in enumerate(rows_src, start=1):
            for c, cell in enumerate(cells, start=1):
                cmds.append(("BACKGROUND", (c, r), (c, r), PAPER if not cell else white))
        t.setStyle(TableStyle(cmds))
        return t

    story += [
        header_table(S, "日语五十音图 · 完整版", "平假名｜片假名｜读音（赫本式罗马音）", "1/3"),
        Spacer(1, 6*mm),
        Paragraph("① 清音（基本五十音）", S["h2"]),
        seion_table(),
        Spacer(1, 3*mm),
        Paragraph("说明：每个格子自上而下为「平假名 / 片假名 / 读音」。灰色空格表示该位置无假名。を 作助词时通常读 o。", S["small"]),
        Paragraph("助词变读（必记）：は → wa（わたしは）、へ → e（がっこうへ）、を → o（みずをのむ）。", S["small"]),
        Spacer(1, 4*mm),
        footer(S, "打印学习用 · 五十音图完善版 · 平假名　片假名　读音"),
        PageBreak(),
        header_table(S, "日语五十音图 · 浊音 / 半浊音 / 易混假名", "平假名｜片假名｜读音", "2/3"),
        Spacer(1, 5*mm),
        Paragraph("② 浊音（゛）　か→が　さ→ざ　た→だ　は→ば", S["h2"]),
    ]

    daku = [
        ("が行", [("が","ガ","ga"),("ぎ","ギ","gi"),("ぐ","グ","gu"),("げ","ゲ","ge"),("ご","ゴ","go")]),
        ("ざ行", [("ざ","ザ","za"),("じ","ジ","ji"),("ず","ズ","zu"),("ぜ","ゼ","ze"),("ぞ","ゾ","zo")]),
        ("だ行", [("だ","ダ","da"),("ぢ","ヂ","ji"),("づ","ヅ","zu"),("で","デ","de"),("ど","ド","do")]),
        ("ば行", [("ば","バ","ba"),("び","ビ","bi"),("ぶ","ブ","bu"),("べ","ベ","be"),("ぼ","ボ","bo")]),
    ]
    head = [Paragraph(x, S["th"]) for x in ["", "あ段", "い段", "う段", "え段", "お段"]]
    data = [head]
    for label, cells in daku:
        data.append([Paragraph(label, S["tdc"])] + [kana_cell(S, *c) for c in cells])
    t = Table(data, colWidths=[16*mm, 34*mm, 34*mm, 34*mm, 34*mm, 34*mm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), NAVY2),
        ("BACKGROUND", (0, 1), (0, -1), HexColor("#e8eef6")),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("GRID", (0, 0), (-1, -1), 0.4, LINE),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("BACKGROUND", (1, 1), (-1, -1), white),
    ]))
    story += [t, Spacer(1, 2*mm),
              Paragraph("じ 和 ぢ、ず 和 づ 现代音几乎相同。常用 じ／ず；ぢ／づ 多出现在连浊，如 ちかぢか、はなぢ、つづく。", S["small"]),
              Spacer(1, 4*mm),
              Paragraph("③ 半浊音（゜）　は→ぱ", S["h2"])]
    pa = [[Paragraph(x, S["th"]) for x in ["", "あ段", "い段", "う段", "え段", "お段"]],
          [Paragraph("ぱ行", S["tdc"]), kana_cell(S,"ぱ","パ","pa"), kana_cell(S,"ぴ","ピ","pi"),
           kana_cell(S,"ぷ","プ","pu"), kana_cell(S,"ぺ","ペ","pe"), kana_cell(S,"ぽ","ポ","po")]]
    t2 = Table(pa, colWidths=[16*mm, 34*mm, 34*mm, 34*mm, 34*mm, 34*mm])
    t2.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), ORANGE),
        ("BACKGROUND", (0, 1), (0, 1), HexColor("#f7edd8")),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("GRID", (0, 0), (-1, -1), 0.4, LINE),
        ("BACKGROUND", (1, 1), (-1, 1), white),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]))
    story += [t2, Spacer(1, 4*mm), Paragraph("④ 特殊假名", S["h2"])]
    special = [
        [Paragraph(x, S["th"]) for x in ["假名", "名称", "用法"]],
        [Paragraph("っ　ッ", S["tdc"]), Paragraph("促音", S["td"]), Paragraph("双写后面辅音：かった = katta，がっこう = gakkou", S["td"])],
        [Paragraph("ー", S["tdc"]), Paragraph("长音", S["td"]), Paragraph("片假名拉长元音：コーヒー = koohii。平假名加元音：おかあさん", S["td"])],
        [Paragraph("ぁぃぅぇぉ　ァィゥェォ", S["tdc"]), Paragraph("小写元音", S["td"]), Paragraph("外来语：ファ = fa，フィ = fi，ウェ = we", S["td"])],
        [Paragraph("ゃゅょ　ャュョ", S["tdc"]), Paragraph("小写拗音", S["td"]), Paragraph("与い段假名组成一拍：きゃ = kya，不是 ki+ya 两拍", S["td"])],
        [Paragraph("ゎ　ヮ", S["tdc"]), Paragraph("小写わ", S["td"]), Paragraph("较少使用", S["td"])],
    ]
    mix = [
        [Paragraph(x, S["th"]) for x in ["容易混", "怎么记"]],
        [Paragraph("ね / れ / わ", S["td"]), Paragraph("ね 有一弯钩；れ 是竖折；わ 开口更大", S["td"])],
        [Paragraph("ぬ / め", S["td"]), Paragraph("ぬ 线穿过有圈；め 更像眼睛", S["td"])],
        [Paragraph("シ / ツ　ソ / ン", S["td"]), Paragraph("シ 点向右下、ツ 点向下；ソ 一撇较短，ン 更平", S["td"])],
        [Paragraph("ア / マ", S["td"]), Paragraph("ア 像尖帽子；マ 有横折", S["td"])],
    ]
    story += [styled_table(special, [48*mm, 28*mm, 110*mm]), Spacer(1, 3*mm),
              Paragraph("⑦ 易混假名", S["h2"]),
              styled_table(mix, [50*mm, 136*mm]),
              Spacer(1, 3*mm),
              footer(S, "打印学习用 · 五十音图完善版 · 平假名　片假名　读音"),
              PageBreak(),
              header_table(S, "日语五十音图 · 拗音 / 外来语扩展", "平假名｜片假名｜读音", "3/3"),
              Spacer(1, 5*mm), Paragraph("⑤ 拗音（ゃ　ゅ　ょ）各算一拍", S["h2"])]

    youon = [
        ("き", [("きゃ","キャ","kya"),("きゅ","キュ","kyu"),("きょ","キョ","kyo")]),
        ("し", [("しゃ","シャ","sha"),("しゅ","シュ","shu"),("しょ","ショ","sho")]),
        ("ち", [("ちゃ","チャ","cha"),("ちゅ","チュ","chu"),("ちょ","チョ","cho")]),
        ("に", [("にゃ","ニャ","nya"),("にゅ","ニュ","nyu"),("にょ","ニョ","nyo")]),
        ("ひ", [("ひゃ","ヒャ","hya"),("ひゅ","ヒュ","hyu"),("ひょ","ヒョ","hyo")]),
        ("み", [("みゃ","ミャ","mya"),("みゅ","ミュ","myu"),("みょ","ミョ","myo")]),
        ("り", [("りゃ","リャ","rya"),("りゅ","リュ","ryu"),("りょ","リョ","ryo")]),
        ("ぎ", [("ぎゃ","ギャ","gya"),("ぎゅ","ギュ","gyu"),("ぎょ","ギョ","gyo")]),
        ("じ", [("じゃ","ジャ","ja"),("じゅ","ジュ","ju"),("じょ","ジョ","jo")]),
        ("び", [("びゃ","ビャ","bya"),("びゅ","ビュ","byu"),("びょ","ビョ","byo")]),
        ("ぴ", [("ぴゃ","ピャ","pya"),("ぴゅ","ピュ","pyu"),("ぴょ","ピョ","pyo")]),
    ]
    yhead = [Paragraph(x, S["th"]) for x in ["", "ゃ / ャ", "ゅ / ュ", "ょ / ョ"]]
    ydata = [yhead]
    for lab, cells in youon:
        ydata.append([Paragraph(lab, S["tdc"])] + [kana_cell(S, *c) for c in cells])
    yt = Table(ydata, colWidths=[16*mm, 56*mm, 56*mm, 56*mm])
    yt.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), GREEN),
        ("BACKGROUND", (0, 1), (0, -1), HexColor("#e8f5ee")),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("GRID", (0, 0), (-1, -1), 0.35, LINE),
        ("BACKGROUND", (1, 1), (-1, -1), white),
        ("TOPPADDING", (0, 0), (-1, -1), 2.5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2.5),
    ]))
    story += [yt, Spacer(1, 4*mm), Paragraph("⑥ 外来语常见扩展（片假名）", S["h2"])]
    loans = [("ファ","fa"),("フィ","fi"),("フェ","fe"),("フォ","fo"),
             ("ティ","ti"),("ディ","di"),("トゥ","tu"),("ドゥ","du"),
             ("ウィ","wi"),("ウェ","we"),("ウォ","wo"),("イェ","ye"),
             ("ヴァ","va"),("ヴィ","vi"),("ヴェ","ve"),("ヴォ","vo"),
             ("シェ","she"),("ジェ","je"),("チェ","che"),("ツァ","tsa"),
             ("ツィ","tsi"),("ツェ","tse"),("ツォ","tso"),("ヴ","vu")]
    ldata = []
    row = []
    for i, (k, r) in enumerate(loans, 1):
        row.append(Paragraph(f"<b>{k}</b><br/>{r}", S["cell"]))
        if i % 4 == 0:
            ldata.append(row); row = []
    lt = Table(ldata, colWidths=[46.5*mm]*4)
    lt.setStyle(TableStyle([
        ("GRID", (0, 0), (-1, -1), 0.35, LINE),
        ("BACKGROUND", (0, 0), (-1, -1), white),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]))
    story += [lt, Spacer(1, 3*mm),
              Paragraph("记忆提示：平假名用于日语本身与语法；片假名用于外来语、拟声词、强调。背诵顺序：清音 → 浊音/半浊音 → 拗音 → 外来语。读音：し=shi、つ=tsu、ふ=fu、ち=chi。", S["small"])]
    build(OUT / "kana.pdf", story)


def verbs_pdf():
    S = styles()
    story = [
        header_table(S, "日语动词「十三种」活用总表", "日语没有英语十二时态；十三种是动词活用形（变形）", "1/4"),
        Spacer(1, 5*mm),
        Paragraph("先分清三类动词（变形规则不同）", S["h2"]),
    ]
    types = [[
        Paragraph("<b>一类　五段动词</b><br/>词尾在う段<br/>書く・飲む・買う・待つ<br/>例外る：帰る・切る・知る", S["td"]),
        Paragraph("<b>二类　一段动词</b><br/>词尾る，前为い/え段<br/>食べる・見る・起きる<br/>教える・寝る・いる", S["td"]),
        Paragraph("<b>三类　不规则</b><br/>仅两个家族<br/>する（勉強する等）<br/>来る（くる）", S["td"]),
    ]]
    tt = Table(types, colWidths=[62*mm, 62*mm, 62*mm])
    tt.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (0, 0), HexColor("#e8f5ee")),
        ("BACKGROUND", (1, 0), (1, 0), HexColor("#e8eef6")),
        ("BACKGROUND", (2, 0), (2, 0), HexColor("#f3e8fb")),
        ("BOX", (0, 0), (0, 0), 1.2, GREEN),
        ("BOX", (1, 0), (1, 0), 1.2, BLUE),
        ("BOX", (2, 0), (2, 0), 1.2, PURPLE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    story += [tt, Spacer(1, 2*mm),
              Paragraph("同音陷阱：着る（穿，二类：着ます）vs 切る（切，一类：切ります）。看汉字，不能只看かな。", S["small"]),
              Spacer(1, 4*mm),
              Paragraph("十三种活用一览（書く / 食べる / する / 来る）", S["h2"])]
    rows = [
        ["#", "名称", "用法要点", "一类 書く", "二类 食べる", "する", "来る"],
        ["1", "辞书形", "基本形/字典形", "書く", "食べる", "する", "来る"],
        ["2", "ます形", "礼貌现在/将来", "書きます", "食べます", "します", "来ます"],
        ["3", "て形", "连接・进行・请求", "書いて", "食べて", "して", "来て"],
        ["4", "た形", "过去・完成", "書いた", "食べた", "した", "来た"],
        ["5", "ない形", "普通否定", "書かない", "食べない", "しない", "来ない"],
        ["6", "可能形", "能够做", "書ける", "食べられる", "できる", "来られる"],
        ["7", "被动形", "被……", "書かれる", "食べられる", "される", "来られる"],
        ["8", "使役形", "让/叫别人做", "書かせる", "食べさせる", "させる", "来させる"],
        ["9", "使役被动", "被迫做", "書かされる", "食べさせられる", "させられる", "来させられる"],
        ["10", "意向形", "打算・一起吧", "書こう", "食べよう", "しよう", "来よう"],
        ["11", "命令形", "命令", "書け", "食べろ", "しろ", "来い"],
        ["12", "ば形", "如果……就", "書けば", "食べれば", "すれば", "来れば"],
        ["13", "禁止形", "不许做", "書くな", "食べるな", "するな", "来るな"],
    ]
    data = [[Paragraph(c, S["th"] if i == 0 else (S["tdc"] if j != 2 else S["td"])) for j, c in enumerate(row)] for i, row in enumerate(rows)]
    story += [styled_table(data, [10*mm, 22*mm, 32*mm, 30*mm, 32*mm, 28*mm, 28*mm]),
              Spacer(1, 3*mm),
              Paragraph("补充：教材有时把「なかった形 / たら形 / たい形」也算进去，总数会变成 12～15 种，核心仍是上表。时态感主要靠：辞书/ます（非过去）＋た/ました（过去）＋ている（进行/状态）。", S["small"]),
              Paragraph("二类「被动」与「可能」同形（食べられる），口语可能常用 食べれる。一类使役被动常缩成 書かされる。三类する的可能是できる，不是すられる。", S["small"]),
              Spacer(1, 3*mm), footer(S, "打印学习用 · 日语动词活用（十三种）完善版"),
              PageBreak(),
              header_table(S, "活用规则详解（1～5）", "辞书形・ます形・て形・た形・ない形", "2/4"),
              Spacer(1, 5*mm)]

    def block(title, rows, widths=None):
        story.append(Paragraph(title, S["h2"]))
        data = [[Paragraph(c, S["th"] if i == 0 else S["td"]) for c in row] for i, row in enumerate(rows)]
        story.append(styled_table(data, widths or [28*mm, 48*mm, 110*mm]))
        story.append(Spacer(1, 3*mm))

    block("1. 辞书形（基本形）　字典原形，普通体现/将来，也可作定语", [
        ["类型", "规则", "例子"],
        ["一类", "词尾保持う段", "飲む・書く・帰る"],
        ["二类", "～る", "食べる・見る"],
        ["三类", "する / 来る", "勉強する・来る"],
    ])
    block("2. ます形（礼貌形）　敬体现/将来。去ます得「ます词干」", [
        ["类型", "规则", "例子"],
        ["一类", "う段→い段 + ます", "書く→書きます　飲む→飲みます"],
        ["二类", "去る + ます", "食べる→食べます"],
        ["三类", "します / 来ます", "する→します　来る→来ます"],
    ])
    block("3. て形　连接动作、请求（～てください）、进行（～ている）。一类有音便", [
        ["词尾", "て / た", "例子"],
        ["う・つ・る", "って / った", "買う→買って　待つ→待って　帰る→帰って"],
        ["く", "いて / いた", "書く→書いて　例外：行く→行って／行った"],
        ["ぐ", "いで / いだ", "泳ぐ→泳いで　急ぐ→急いだ"],
        ["ぬ・ぶ・む", "んで / んだ", "死ぬ→死んで　遊ぶ→遊んで　飲む→飲んで"],
        ["す", "して / した", "話す→話して"],
        ["二类／三类", "て / して / 来て", "食べて・して・来て"],
    ], [36*mm, 36*mm, 114*mm])
    story += [Paragraph("口诀：うつつるって、くいて、ぐいで、ぬぶむんで、すして。行く永远单独记。", S["small"]), Spacer(1, 2*mm)]
    block("4. た形（过去・完成）　变法与て形相同，て→た、で→だ。礼貌过去：ました", [
        ["类型", "规则", "例子"],
        ["一类", "按て形对应", "書いた・飲んだ・買った・行った"],
        ["二类", "去る + た", "食べた・見た"],
        ["三类", "した / 来た", "する→した　来る→来た"],
    ])
    block("5. ない形（否定）　过去否定：なかった。礼貌否定：ません / ませんでした", [
        ["类型", "规则", "例子"],
        ["一类", "う段→あ段 + ない（う→わ）", "書く→書かない　買う→買わない"],
        ["二类", "去る + ない", "食べない・見ない"],
        ["三类", "しない / 来ない", "する→しない　来る→来ない"],
    ])
    story += [footer(S, "打印学习用 · 日语动词活用（十三种）完善版"), PageBreak(),
              header_table(S, "活用规则详解（6～10）", "可能・被动・使役・使役被动・意向", "3/4"), Spacer(1, 5*mm)]
    block("6. 可能形（能……）　一类变成一段动词后再活用", [
        ["类型", "规则", "例子"],
        ["一类", "う段→え段 + る", "書く→書ける　飲む→飲める"],
        ["二类", "去る + られる（口语れる）", "食べる→食べられる／食べれる"],
        ["三类", "できる / 来られる", "する→できる　来る→来られる"],
    ])
    block("7. 被动形（受身：被……）　二类与可能同形，靠上下文区分", [
        ["类型", "规则", "例子"],
        ["一类", "う段→あ段 + れる（う→わ）", "書く→書かれる　言う→言われる"],
        ["二类", "去る + られる", "食べる→食べられる"],
        ["三类", "される / 来られる", "する→される　来る→来られる"],
    ])
    block("8. 使役形（让/叫别人做）", [
        ["类型", "规则", "例子"],
        ["一类", "う段→あ段 + せる（う→わ）", "書く→書かせる　買う→買わせる"],
        ["二类", "去る + させる", "食べさせる・見させる"],
        ["三类", "させる / 来させる", "する→させる　来る→来させる"],
    ])
    block("9. 使役被动形（被迫做）　一类口语常缩短：せられる→される", [
        ["类型", "规则", "例子"],
        ["一类", "あ段 + せられる／される", "書かせられる→書かされる"],
        ["二类", "去る + させられる", "食べさせられる"],
        ["三类", "させられる / 来させられる", "する→させられる"],
    ])
    block("10. 意向形（意志形）　礼貌说法：～ましょう", [
        ["类型", "规则", "例子"],
        ["一类", "う段→お段 + う", "書く→書こう　飲む→飲もう"],
        ["二类", "去る + よう", "食べよう・見よう"],
        ["三类", "しよう / 来よう", "する→しよう　来る→来よう"],
    ])
    story += [Paragraph("易混：二类可能形 ≈ 被动形（食べられる）。三类する的可能是できる，不是すられる。一类使役被动：書かせられる（完整）／書かされる（口语）都很常见。", S["small"]),
              Spacer(1, 4*mm), footer(S, "打印学习用 · 日语动词活用（十三种）完善版"),
              PageBreak(),
              header_table(S, "活用规则详解（11～13）＋时态对照", "命令・ば形・禁止，以及和「时态」的关系", "4/4"),
              Spacer(1, 5*mm)]
    block("11. 命令形　语气强；更礼貌用～てください", [
        ["类型", "规则", "例子"],
        ["一类", "う段→え段", "書く→書け　飲む→飲め"],
        ["二类", "去る + ろ（或よ）", "食べる→食べろ／食べよ"],
        ["三类", "しろ／せよ　／　来い", "する→しろ　来る→来い"],
    ])
    block("12. ば形（假定・条件）　另有 たら・なら・と", [
        ["类型", "规则", "例子"],
        ["一类", "う段→え段 + ば", "書く→書けば　飲む→飲めば"],
        ["二类", "去る + れば", "食べる→食べれば"],
        ["三类", "すれば / 来れば", "する→すれば　来る→来れば"],
    ])
    block("13. 禁止形　礼貌禁止：～ないでください", [
        ["类型", "规则", "例子"],
        ["一类／二类／三类", "辞书形 + な", "書くな　食べるな　するな／来るな"],
    ])
    extra = [
        ["名称", "构成", "例子", "意义"],
        ["なかった形", "ない形过去", "書かなかった／食べなかった", "普通体过去否定"],
        ["たら形", "た形 + ら", "書いたら／食べたら", "一……就／如果"],
        ["たい形", "ます词干 + たい", "書きたい／食べたい", "想做……"],
        ["ている形", "て形 + いる", "書いている／食べている", "进行中／结果状态"],
        ["ます过去", "ました", "書きました／食べました", "礼貌过去"],
    ]
    story.append(Paragraph("常被一并记忆的相关形（有的教材会算进「十五种」）", S["h2"]))
    story.append(styled_table([[Paragraph(c, S["th"] if i == 0 else S["td"]) for c in row] for i, row in enumerate(extra)],
                              [32*mm, 40*mm, 62*mm, 52*mm]))
    tense = [
        ["中文时间意义", "日语例子", "主要用的形"],
        ["现在／将来（普通）", "食べる／行く", "辞书形"],
        ["现在／将来（礼貌）", "食べます／行きます", "ます形"],
        ["过去（普通）", "食べた／行った", "た形"],
        ["过去（礼貌）", "食べました", "ました"],
        ["进行／状态", "食べている", "て形 + いる"],
        ["否定现在", "食べない／食べません", "ない／ません"],
        ["否定过去", "食べなかった／食べませんでした", "なかった／ませんでした"],
    ]
    story += [Spacer(1, 3*mm), Paragraph("和英语「时态」怎么对应（快速理解）", S["h2"]),
              styled_table([[Paragraph(c, S["th"] if i == 0 else S["td"]) for c in row] for i, row in enumerate(tense)],
                           [52*mm, 72*mm, 62*mm]),
              Spacer(1, 4*mm), footer(S, "打印学习用 · 日语动词活用（十三种）完善版")]
    build(OUT / "verbs.pdf", story)


def keigo_pdf():
    S = styles()
    story = [
        header_table(S, "日语敬语高频速查", "尊敬语抬对方 · 谦让语压自己 · 丁宁语整体礼貌", "1/4"),
        Spacer(1, 5*mm), Paragraph("① 先分清三类（最重要）", S["h2"]),
    ]
    types = [[
        Paragraph("<b>尊敬语　尊敬語</b><br/>抬高对方／话题人物的行为<br/>いらっしゃる　おっしゃる　召し上がる", S["td"]),
        Paragraph("<b>谦让语　謙譲語</b><br/>压低自己／己方的行为<br/>参る／伺う　申す　拝見する", S["td"]),
        Paragraph("<b>丁宁语　丁寧語</b><br/>对听者表示礼貌<br/>です／ます　ございます　でしょうか", S["td"]),
    ]]
    tt = Table(types, colWidths=[62*mm]*3)
    tt.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (0, 0), HexColor("#e8eef6")),
        ("BACKGROUND", (1, 0), (1, 0), HexColor("#e8f5ee")),
        ("BACKGROUND", (2, 0), (2, 0), HexColor("#f7edd8")),
        ("BOX", (0, 0), (0, 0), 1.2, BLUE),
        ("BOX", (1, 0), (1, 0), 1.2, GREEN),
        ("BOX", (2, 0), (2, 0), 1.2, ORANGE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
    ]))
    story += [tt, Spacer(1, 2*mm),
              Paragraph("另有美化语：お金、お茶、ご飯。不管谁做动作，只是把词说得更体面。", S["small"]),
              Spacer(1, 3*mm), Paragraph("② 判断口诀（避免用反）", S["h2"])]
    tips = [
        ["情况", "用哪一类", "例子"],
        ["对方做的事", "尊敬语", "先生がおっしゃいました"],
        ["自己做的事", "谦让语", "私が申します／伺います"],
        ["只是说得客气", "丁宁语就够", "行きます／わかりました"],
        ["对方给我／我领受", "くださる／いただく", "教えてください／いただきます"],
        ["我给对方", "差し上げる", "資料を差し上げます"],
    ]
    story.append(styled_table([[Paragraph(c, S["th"] if i == 0 else S["td"]) for c in r] for i, r in enumerate(tips)],
                              [48*mm, 48*mm, 90*mm]))
    story += [Spacer(1, 3*mm), Paragraph("③ 最常用「普通 → 尊敬 → 谦让」对照（必背）", S["h2"])]
    keigo = [
        ["普通语", "尊敬语（对方）", "谦让语（自己）"],
        ["行く／来る／いる", "いらっしゃる／おいでになる", "参る／伺う"],
        ["言う", "おっしゃる", "申す／申し上げる"],
        ["する", "なさる／される", "いたす／させていただく"],
        ["見る", "ご覧になる", "拝見する"],
        ["食べる／飲む", "召し上がる", "いただく"],
        ["知っている", "ご存じだ", "存じている／存じ上げる"],
        ["もらう／くれる", "くださる", "いただく"],
        ["给（我→对方）", "—", "差し上げる／あげる"],
        ["思う", "思っていらっしゃる", "存じる"],
        ["会う", "お会いになる", "お目にかかる"],
        ["聞く／訪ねる", "お聞きになる", "伺う"],
        ["いる（人在）", "いらっしゃる", "おる"],
        ["ある", "—", "ございます"],
    ]
    story += [styled_table([[Paragraph(c, S["th"] if i == 0 else S["tdc"]) for c in r] for i, r in enumerate(keigo)],
                           [62*mm, 62*mm, 62*mm], header_color=NAVY),
              Spacer(1, 3*mm),
              Paragraph("记忆提示：いらっしゃる 可对应 行く／来る／いる。くださる＝对方给我；いただく＝我从对方领受。不要和「我给对方」搞混。日常先把 です／ます 说稳，再替换上表高频词。", S["small"]),
              Spacer(1, 3*mm), footer(S, "打印学习用 · 日语敬语高频速查完善版"),
              PageBreak(),
              header_table(S, "敬语的构成方式", "お／ご型・特殊动词・れる／られる型", "2/4"),
              Spacer(1, 5*mm), Paragraph("① 三种常见「做尊敬」的方法", S["h2"])]
    son = [
        ["方式", "说明", "例子"],
        ["A. 特殊动词", "直接换成敬语动词", "言う→おっしゃる　する→なさる"],
        ["B. お＋ます词干＋になる", "一类／二类动词常用", "書く→お書きになる　待つ→お待ちになる"],
        ["C. れる／られる", "有被动味道，商务也见", "行く→行かれる　食べる→食べられる"],
    ]
    ken = [
        ["方式", "说明", "例子"],
        ["A. 特殊动词", "换成谦让动词", "行く→参る／伺う　言う→申す"],
        ["B. お／ご＋ます词干＋する", "为对方做某事", "持つ→お持ちする　案内→ご案内する"],
        ["C. お／ご＋ます词干＋いたす", "比する更谦恭", "待つ→お待ちいたします"],
    ]
    og = [
        ["接头", "倾向", "例子"],
        ["お", "训读词、和语为主", "お金、お茶、お名前、お時間、お手紙"],
        ["ご", "音读词、汉语词为主", "ご住所、ご意見、ご家族、ご都合、ご確認"],
    ]
    teinei = [
        ["普通丁宁", "更客气", "用法"],
        ["です", "でございます", "更丁宁的判断／断定"],
        ["～ます", "～ております", "说明自己正在做的状态"],
        ["～です／ますか", "～でしょうか", "更委婉的提问"],
        ["ある", "ございます", "有／在（物）"],
        ["いい／よろしい", "よろしいでしょうか", "可以吗（征求许可）"],
    ]
    wrong = [
        ["避免", "更好／说明", "原因"],
        ["× 先生が参りました", "○ 先生がいらっしゃいました", "对方来 → 尊敬，不是谦让"],
        ["× 私がおっしゃいます", "○ 私が申します", "自己说 → 谦让，不是尊敬"],
        ["× 社長にこれを差し上げてください", "○ 社長にお渡しください", "请对方转交，不要让对方「差し上げる」"],
        ["× させていただきます连发", "适度使用", "过度用会显得油滑"],
    ]
    def add(title, rows, color=NAVY, w=None):
        story.append(Paragraph(title, S["h2"]))
        story.append(styled_table([[Paragraph(c, S["th"] if i == 0 else S["td"]) for c in r] for i, r in enumerate(rows)],
                                  w or [48*mm, 52*mm, 86*mm], header_color=color))
        story.append(Spacer(1, 2.5*mm))
    add("① 三种常见「做尊敬」的方法", son, BLUE)
    add("② 三种常见「做谦让」的方法", ken, GREEN)
    add("③ お／ご 怎么选？", og, PURPLE)
    story.append(Paragraph("例外要记：ご飯、ご年始；お返事（习惯用法）。拿不准时查词典。不是所有动词都能随便套「お～する」。为自己做的事乱加お／ご，可能失礼。", S["small"]))
    story.append(Spacer(1, 2*mm))
    add("④ 丁宁语升级（比です／ます更客气）", teinei, ORANGE)
    add("⑤ 易错对照（千万别用反）", wrong, HexColor("#9b2c2c"))
    story += [footer(S, "打印学习用 · 日语敬语高频速查完善版"), PageBreak(),
              header_table(S, "授受敬语 ＋ 请求／许可常用句", "あげる／くれる／もらう 的敬语版", "3/4"),
              Spacer(1, 5*mm), Paragraph("① 授受三方向（先懂方向，再套敬语）", S["h2"])]
    dirr = [[
        Paragraph("<b>我 → 对方</b><br/>あげる → 差し上げる<br/>我给别人", S["tdc"]),
        Paragraph("<b>对方 → 我</b><br/>くれる → くださる<br/>别人给我", S["tdc"]),
        Paragraph("<b>我 ← 从对方</b><br/>もらう → いただく<br/>我领受", S["tdc"]),
    ]]
    dtt = Table(dirr, colWidths=[62*mm]*3)
    dtt.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), white),
        ("BOX", (0, 0), (0, 0), 1, GOLD),
        ("BOX", (1, 0), (1, 0), 1, BLUE),
        ("BOX", (2, 0), (2, 0), 1, GREEN),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ]))
    story += [dtt, Spacer(1, 3*mm), Paragraph("② ～てくださる／～ていただく／～て差し上げる", S["h2"])]
    req = [
        ["句型", "含义", "例子"],
        ["～てください", "请你做……", "見てください"],
        ["～てくださいますか", "您能帮我……吗（更敬）", "教えてくださいますか"],
        ["～ていただけますか", "能否请您……（很常用）", "確認していただけますか"],
        ["～ていただけませんか", "更委婉请求", "少々お待ちいただけませんか"],
        ["～てさしあげます", "我为您做……（较郑重）", "案内してさしあげます"],
        ["～させていただきます", "请允许我做……", "説明させていただきます"],
    ]
    story.append(styled_table([[Paragraph(c, S["th"] if i == 0 else S["td"]) for c in r] for i, r in enumerate(req)],
                              [52*mm, 62*mm, 72*mm]))
    story += [Spacer(1, 2*mm), Paragraph("请求强度（由强到柔）：てください → てくださいますか → ていただけますか → ていただけませんか → よろしいでしょうか", S["small"]),
              Spacer(1, 3*mm), Paragraph("③ 电话／邮件高频套话（商务入门）", S["h2"])]
    mail = [
        ["场景", "日语", "中文"],
        ["打招呼", "いつもお世話になっております。", "承蒙关照（商务开场）"],
        ["拜托", "お手数ですが、よろしくお願いいたします。", "麻烦您了，拜托"],
        ["道歉", "申し訳ございません。", "非常抱歉（比すみません更重）"],
        ["打扰", "恐れ入りますが……", "抱歉打扰，想拜托……"],
        ["结束", "失礼いたします。", "告辞／挂电话结束"],
        ["确认", "ご確認のほど、お願いいたします。", "请您确认"],
        ["附件", "書類を送付いたします。", "我方寄送材料"],
        ["等候", "お返事をお待ちしております。", "等候您的回复"],
        ["感谢", "ご対応いただき、ありがとうございます。", "感谢您的处理"],
    ]
    story += [styled_table([[Paragraph(c, S["th"] if i == 0 else S["td"]) for c in r] for i, r in enumerate(mail)],
                           [28*mm, 92*mm, 66*mm]),
              Spacer(1, 4*mm), footer(S, "打印学习用 · 日语敬语高频速查完善版"),
              PageBreak(),
              header_table(S, "学习顺序 ＋ 场景对照例句", "分层学，不要一次吞完整张敬语表", "4/4"),
              Spacer(1, 5*mm), Paragraph("① 建议学习顺序", S["h2"])]
    order = [
        ["阶段", "学什么"],
        ["入门", "です／ます、すみません、お願いします、～てください"],
        ["常用", "いらっしゃる、おっしゃる、くださる、いただく、申す、参る"],
        ["进阶", "お～になる、お～する、ご覧になる、拝見する、存じる"],
        ["商务", "おります、いたします、でございます、邮件套话"],
    ]
    story.append(styled_table([[Paragraph(c, S["th"] if i == 0 else S["td"]) for c in r] for i, r in enumerate(order)],
                              [28*mm, 158*mm]))
    story += [Spacer(1, 3*mm), Paragraph("② 同一件事：普通 → 礼貌 → 敬语", S["h2"])]
    scene = [
        ["场景", "随便说", "丁宁语", "敬语"],
        ["老师在吗？", "先生、いる？", "先生はいますか。", "先生はいらっしゃいますか。"],
        ["我去贵公司。", "会社へ行く。", "会社へ行きます。", "御社へ伺います。"],
        ["老师说了。", "先生が言った。", "先生が言いました。", "先生がおっしゃいました。"],
        ["请看这个。", "これ見て。", "これを見てください。", "これをご覧ください。"],
        ["我看了资料。", "資料を見た。", "資料を見ました。", "資料を拝見しました。"],
        ["能告诉我吗？", "教えて。", "教えてください。", "教えていただけますか。"],
    ]
    story.append(styled_table([[Paragraph(c, S["th"] if i == 0 else S["td"]) for c in r] for i, r in enumerate(scene)],
                              [32*mm, 38*mm, 52*mm, 64*mm]))
    when = [
        ["场合", "怎么说"],
        ["必须偏高", "公司客户、上司、老师、初次见面的长辈、正式邮件／电话"],
        ["礼貌即可", "便利店、餐厅点餐、问路、同学同事日常（です／ます 足够）"],
        ["可以普通体", "家人、亲密朋友、日记、对内很熟的同事（注意关系）"],
    ]
    story += [Spacer(1, 3*mm), Paragraph("③ 什么时候必须用敬语？", S["h2"]),
              styled_table([[Paragraph(c, S["th"] if i == 0 else S["td"]) for c in r] for i, r in enumerate(when)],
                           [36*mm, 150*mm]),
              Spacer(1, 3*mm),
              Paragraph("和五十音／动词活用怎么配合：假名熟了 → ます／て／た／ない 变形稳 → 能造简单礼貌句 → 替换 10 个核心敬语动词 → 再学お～になる／お～する → 工作／留学再专攻商务套话。原则：先正确，再恭敬；用错敬语，有时比只用です／ます更尴尬。", S["small"]),
              Spacer(1, 4*mm), footer(S, "打印学习用 · 日语敬语高频速查完善版")]
    build(OUT / "keigo.pdf", story)


def main():
    kana_pdf()
    verbs_pdf()
    keigo_pdf()
    mapping = {
        "kana.pdf": "日语五十音图.pdf",
        "verbs.pdf": "日语动词十三种活用.pdf",
        "keigo.pdf": "日语敬语高频速查.pdf",
    }
    for src, name in mapping.items():
        data = (OUT / src).read_bytes()
        (DESKTOP / name).write_bytes(data)
        print("wrote", OUT / src, "and", DESKTOP / name, "bytes", len(data))


if __name__ == "__main__":
    main()
