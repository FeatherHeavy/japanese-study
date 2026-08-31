/* 面试问答 + 从对话抽出的单词。回答按公开简历。 */
const PAIRS = [
  {
    q: {
      ja: "本日はお越しいただき、ありがとうございます。まず自己紹介をお願いします。",
      kana: "ほんじつは おこしいただき、ありがとうございます。まず じこしょうかいを おねがいします。",
      roma: "honjitsu wa okoshi itadaki, arigatou gozaimasu. mazu jiko shoukai o onegai shimasu.",
      zh: "今天谢谢你过来。请先做自我介绍。"
    },
    a: {
      ja: "XYJと申します。Featherという名前も使っています。中国出身、東京在住、三十九歳です。在留資格は技術・人文知識・国際業務です。二千十六年からゲームと三次元のクライアントとサーバーを作ってきました。Cプラスプラス、シーシャープ、Go、アンリアル、ユニティが使えます。来日後は現物取引のバックエンドも担当していますが、志望はゲーム開発です。よろしくお願いいたします。",
      kana: "エックスワイジェイと もうします。フェザーという なまえも つかっています。ちゅうごく しゅっしん、とうきょう ざいじゅう、さんじゅうきゅうさいです。ざいりゅうしかくは ぎじゅつ・じんぶんちしき・こくさいぎょうむです。にせんじゅうろくねんから ゲームと さんじげんの クライアントと サーバーを つくってきました。シープラスプラス、シーシャープ、ゴー、アンリアル、ユニティが つかえます。らいにちごは げんぶつとりひきの バックエンドも たんとうしていますが、しぼうは ゲームかいはつです。よろしく おねがいいたします。",
      roma: "XYJ to moushimasu. Feather to iu namae mo tsukatte imasu. chuugoku shusshin, toukyou zaijuu, sanjuu kyuu sai desu. zairyuu shikaku wa gijutsu jinbun chishiki kokusai gyoumu desu. nisen juuroku nen kara geemu to sanjigen no kuraianto to saabaa o tsukutte kimashita. C++, C#, Go, Unreal, Unity ga tsukaemasu. rainichi go wa genbutsu torihiki no bakkuendo mo tantou shite imasu ga, shibou wa geemu kaihatsu desu. yoroshiku onegai itashimasu.",
      zh: "我是XYJ，也用Feather。中国出身，住东京，39岁。签证技人国。2016年起做游戏和三维的客户端、服务器。会C++、C#、Go、Unreal、Unity。来日后也做现货后端，但想做游戏开发。请多关照。"
    }
  },
  {
    q: {
      ja: "日本語と英語、どちらで進めましょうか。",
      kana: "にほんごと えいご、どちらで すすめましょうか。",
      roma: "nihongo to eigo, dochira de susumemashou ka.",
      zh: "日语和英语，用哪个进行？"
    },
    a: {
      ja: "日本語で挑戦します。読み書きは日本語能力試験のN1です。話すスピードはまだ練習中なので、難しいところは英語か中国語でも説明できます。",
      kana: "にほんごで ちょうせんします。よみかきは にほんごのうりょくしけんの エヌいちです。はなす スピードは まだ れんしゅうちゅうなので、むずかしい ところは えいごか ちゅうごくごでも せつめいできます。",
      roma: "nihongo de chousen shimasu. yomikaki wa nihongo nouryoku shiken no N1 desu. hanasu supiido wa mada renshuu chuu nanode, muzukashii tokoro wa eigo ka chuugokugo demo setsumei dekimasu.",
      zh: "我想用日语试。读写是N1。口语速度还在练，难的地方可以用英语或中文补充。"
    }
  },
  {
    q: {
      ja: "なぜ日本で働きたいのですか。",
      kana: "なぜ にほんで はたらきたいのですか。",
      roma: "naze nihon de hatarakitai no desu ka.",
      zh: "为什么想在日本工作？"
    },
    a: {
      ja: "ゲームとエンジンの現場が強く、長く技術を積みたいからです。いま東京に住んでいて、技人国の在留資格もあります。",
      kana: "ゲームと エンジンの げんばが つよく、ながく ぎじゅつを つみたいからです。いま とうきょうに すんでいて、ぎじんこくの ざいりゅうしかくも あります。",
      roma: "geemu to enjin no genba ga tsuyoku, nagaku gijutsu o tsumitai kara desu. ima toukyou ni sunde ite, gijin-koku no zairyuu shikaku mo arimasu.",
      zh: "日本游戏和引擎现场强，想长期做技术。人在东京，也有技人国签证。"
    }
  },
  {
    q: {
      ja: "いまの仕事を変えたい理由を教えてください。",
      kana: "いまの しごとを かえたい りゆうを おしえてください。",
      roma: "ima no shigoto o kaetai riyuu o oshiete kudasai.",
      zh: "请告诉我你想换工作的理由。"
    },
    a: {
      ja: "来日後の着地として、現物取引システムのバックエンドを担当しています。私の主線はゲームです。クライアントとサーバーの両方で、商用リリースの経験があります。",
      kana: "らいにちごの ちゃくちとして、げんぶつとりひきシステムの バックエンドを たんとうしています。わたしの しゅせんは ゲームです。クライアントと サーバーの りょうほうで、しょうようリリースの けいけんが あります。",
      roma: "rainichi go no chakuchi to shite, genbutsu torihiki shisutemu no bakkuendo o tantou shite imasu. watashi no shusen wa geemu desu. kuraianto to saabaa no ryouhou de, shouyou ririisu no keiken ga arimasu.",
      zh: "现货后端是来日后的落脚。我的主线是游戏。客户端和服务器两边都有商业上线经验。"
    }
  },
  {
    q: {
      ja: "希望する職種は何ですか。",
      kana: "きぼうする しょくしゅは なんですか。",
      roma: "kibou suru shokushu wa nan desu ka.",
      zh: "希望做什么岗位？"
    },
    a: {
      ja: "東京で、サーバーバックエンド、またはユニティやユーイーファイブのゲームクライアント、ゲームサーバーです。希望年収は応相談です。",
      kana: "とうきょうで、サーバーバックエンド、または ユニティや ユーイーファイブの ゲームクライアント、ゲームサーバーです。きぼうねんしゅうは おうそうだんです。",
      roma: "toukyou de, saabaa bakkuendo, matawa Yuniti ya UE faibu no geemu kuraianto, geemu saabaa desu. kibou nenshuu wa ousoudan desu.",
      zh: "在东京做服务器后端，或 Unity / UE5 游戏客户端、游戏服务器。年收面议。"
    }
  },
  {
    q: {
      ja: "いちばん得意なプロジェクトを、担当範囲つきで説明してください。",
      kana: "いちばん とくいな プロジェクトを、たんとうはんいつきで せつめいしてください。",
      roma: "ichiban tokui na purojekuto o, tantou han'i tsuki de setsumei shite kudasai.",
      zh: "请结合你负责的范围，说明你最拿手的项目。"
    },
    a: {
      ja: "敦煌VRです。二人以上のマルチプレイで、ユーイー五・三と専用サーバーを使いました。サーバーでは座標、アニメ、エフェクト、ボイスの同期を実装しました。クライアントではVR操作とリッチテキストを担当して、往復を閉じました。出荷済みです。",
      kana: "とんこうブイアールです。ふたりいじょうの マルチプレイで、ユーイーごてんさんと せんようサーバーを つかいました。サーバーでは ざひょう、アニメ、エフェクト、ボイスの どうきを じっそうしました。クライアントでは ブイアールそうさと リッチテキストを たんとうして、おうふくを とじました。しゅっかずみです。",
      roma: "Tonkou VR desu. futari ijou no maruchi purei de, UE go ten san to senyou saabaa o tsukaimashita. saabaa de wa zahyou, anime, efektu, boisu no douki o jissou shimashita. kuraianto de wa VR sousa to ricchi tekisuto o tantou shite, oufuku o tojimashita. shukka zumi desu.",
      zh: "敦煌VR。两人以上联机，UE5.3和Dedicated Server。服务端做位置、动画、特效、语音同步。客户端做VR操作和富文本，把联机闭环。已上线。"
    }
  },
  {
    q: {
      ja: "デジタルツインでは、何をゼロから作りましたか。",
      kana: "デジタルツインでは、なにを ゼロから つくりましたか。",
      roma: "dejitaru tsuin de wa, nani o zero kara tsukurimashita ka.",
      zh: "数字孪生里，你从零做了什么？"
    },
    a: {
      ja: "Vueの操作画面に、アンリアルのウェブ三次元を埋め込みました。ユーザー管理はGo、シーン同期はCプラスプラス、クライアント論理はゲームプレイです。機密なので公開スクショはありません。面接でデモできます。",
      kana: "ヴューの そうさがんめんに、アンリアルの ウェブさんじげんを うめこみました。ユーザーかんりは ゴー、シーンどうきは シープラスプラス、クライアントろんりは ゲームプレイです。きみつなので こうかいスクショは ありません。めんせつで デモできます。",
      roma: "Vue no sousa gamen ni, Anriaru no webu sanjigen o umekomimashita. yuuzaa kanri wa Go, shiin douki wa C++, kuraianto ronri wa geemupurei desu. kimitsu nanode koukai sukusho wa arimasen. mensetsu de demo dekimasu.",
      zh: "Vue操作页里嵌入UE的网页3D。用户管理用Go，场景同步用C++，客户端逻辑用Gameplay。涉密没有公开截图，面试可以演示。"
    }
  },
  {
    q: {
      ja: "現物取引で、あなたが実装した範囲はどこまでですか。",
      kana: "げんぶつとりひきで、あなたが じっそうした はんいは どこまでですか。",
      roma: "genbutsu torihiki de, anata ga jissou shita han'i wa doko made desu ka.",
      zh: "现货交易里，你实现到哪一层？"
    },
    a: {
      ja: "全社のサービス骨格は担当外です。現物ドメインの受付、マッチング、口座、当日損益、履歴を実装しました。マッチングはメモリのオーダブックで、Cプラスプラスの独立プロセスです。Goで認証、公開エーピーアイ、リアルタイム配信を書きました。",
      kana: "ぜんしゃの サービスこっかくは たんとうがいです。げんぶつドメインの うけつけ、マッチング、こうざ、とうじつそんえき、りれきを じっそうしました。マッチングは メモリの オーダブックで、シープラスプラスの どくりつプロセスです。ゴーで にんしょう、こうかいエーピーアイ、リアルタイムはいしんを かきました。",
      roma: "zensha no saabisu kokkaku wa tantou-gai desu. genbutsu domein no uketsuke, matchingu, kouza, toujitsu son'eki, rireki o jissou shimashita. matchingu wa memori no oodabukku de, C++ no dokuritsu purosesu desu. Go de ninshou, koukai API, riarutaimu haishin o kakimashita.",
      zh: "全公司服务骨架不是我做的。现货域的接入、撮合、账户、当日盈亏、历史是我做的。撮合是内存订单簿，独立C++进程。Go写鉴权、开放接口、实时推送。"
    }
  },
  {
    q: {
      ja: "内装アプリのクライアントとサーバーは、どちらも担当しましたか。",
      kana: "ないそうアプリの クライアントと サーバーは、どちらも たんとうしましたか。",
      roma: "naisou apuri no kuraianto to saabaa wa, dochira mo tantou shimashita ka.",
      zh: "装修App的客户端和服务器，两边你都负责了吗？"
    },
    a: {
      ja: "はい。ユーイーフォーのクライアントと、ウィンドウズのアイオーシーピーサーバーを、どちらもゼロから作りました。部屋、材質、照明、VR、チャット同期です。小米、オッポ、メイズに公開しました。",
      kana: "はい。ユーイーフォーの クライアントと、ウィンドウズの アイオーシーピーサーバーを、どちらも ゼロから つくりました。へや、ざいしつ、しょうめい、ブイアール、チャットどうきです。シャオミ、オッポ、メイズに こうかいしました。",
      roma: "hai. UE foo no kuraianto to, Windowzu no IOCP saabaa o, dochira mo zero kara tsukurimashita. heya, zaishitsu, shoumei, VR, chatto douki desu. Xiaomi, OPPO, Meizu ni koukai shimashita.",
      zh: "是。UE4客户端和Windows IOCP服务端都从零做。选房、材质、灯光、VR、聊天同步。上架了小米、OPPO、魅族。"
    }
  },
  {
    q: {
      ja: "ご自身の強みは何ですか。",
      kana: "ごじしんの つよみは なんですか。",
      roma: "gojishin no tsuyomi wa nan desu ka.",
      zh: "你自己的优势是什么？"
    },
    a: {
      ja: "クライアントとサーバーを、同じ人が出荷まで閉じられることです。Cプラスプラスの低レイヤ、アイオーシーピーやメモリの板と、Goの業務エーピーアイを分けて実装できます。",
      kana: "クライアントと サーバーを、おなじ ひとが しゅっかまで とじられることです。シープラスプラスの ていレイヤ、アイオーシーピーや メモリの いたと、ゴーの ぎょうむエーピーアイを わけて じっそうできます。",
      roma: "kuraianto to saabaa o, onaji hito ga shukka made tojirareru koto desu. C++ no tei reiya, IOCP ya memori no ita to, Go no gyoumu API o wakete jissou dekimasu.",
      zh: "同一人能把客户端和服务器做到上线闭环。C++底层（IOCP、内存订单簿）和Go业务接口可以分开实现。"
    }
  },
  {
    q: {
      ja: "弱みや課題はありますか。",
      kana: "よわみや かだいは ありますか。",
      roma: "yowami ya kadai wa arimasu ka.",
      zh: "有弱点或课题吗？"
    },
    a: {
      ja: "日本語の会話スピードです。読み書きと専門用語は準備しています。今日も日本語で答えますが、正確さが必要なところは英語で補います。",
      kana: "にほんごの かいわスピードです。よみかきと せんもんようごは じゅんびしています。きょうも にほんごで こたえますが、せいかくさが ひつような ところは えいごで おぎないます。",
      roma: "nihongo no kaiwa supiido desu. yomikaki to senmon yougo wa junbi shite imasu. kyou mo nihongo de kotaemasu ga, seikakusa ga hitsuyou na tokoro wa eigo de oginaimasu.",
      zh: "日语口语速度。读写和术语有准备。今天用日语答，需要精确的地方用英语补。"
    }
  },
  {
    q: {
      ja: "いつから入れますか。希望年収は。",
      kana: "いつから はいれますか。きぼうねんしゅうは。",
      roma: "itsu kara hairemasu ka. kibou nenshuu wa.",
      zh: "什么时候能入职？期望年收呢？"
    },
    a: {
      ja: "選考が決まり次第、会社と調整します。年収は応相談です。",
      kana: "せんこうが きまりしだい、かいしゃと ちょうせいします。ねんしゅうは おうそうだんです。",
      roma: "senkou ga kimari shidai, kaisha to chousei shimasu. nenshuu wa ousoudan desu.",
      zh: "选拔定了以后和现在公司协调。年收面议。"
    }
  },
  {
    q: {
      ja: "最後に、何か質問はありますか。",
      kana: "さいごに、なにか しつもんは ありますか。",
      roma: "saigo ni, nanika shitsumon wa arimasu ka.",
      zh: "最后，你有什么问题吗？"
    },
    a: {
      ja: "はい。チームではクライアントとサーバー、どちらを最初に担当することが多いですか。オンボーディングで既存コードを読む期間はどれくらいですか。",
      kana: "はい。チームでは クライアントと サーバー、どちらを さいしょに たんとうすることが おおいですか。オンボーディングで きぞんコードを よむ きかんは どれくらいですか。",
      roma: "hai. chiimu de wa kuraianto to saabaa, dochira o saisho ni tantou suru koto ga ooi desu ka. onboodingu de kison koodo o yomu kikan wa dore kurai desu ka.",
      zh: "有。组里一般先让人做客户端还是服务器？入职看现有代码大概多久？"
    }
  },
  {
    q: {
      ja: "本日はありがとうございました。",
      kana: "ほんじつは ありがとうございました。",
      roma: "honjitsu wa arigatou gozaimashita.",
      zh: "今天谢谢你。"
    },
    a: {
      ja: "こちらこそ、ありがとうございました。選考の結果を楽しみにしております。",
      kana: "こちらこそ、ありがとうございました。せんこうの けっかを たのしみにして おります。",
      roma: "kochira koso, arigatou gozaimashita. senkou no kekka o tanoshimi ni shite orimasu.",
      zh: "也谢谢你们。我期待选拔结果。"
    }
  }
];

const WORDS = [
  ["本日","ほんじつ","honjitsu","今天"],
  ["お越しいただく","おこしいただく","okoshi itadaku","劳驾您过来（敬语）"],
  ["ありがとうございます","ありがとうございます","arigatou gozaimasu","谢谢（礼貌）"],
  ["まず","まず","mazu","首先"],
  ["自己紹介","じこしょうかい","jiko shoukai","自我介绍"],
  ["お願いする","おねがいする","onegai suru","拜托、请您…"],
  ["申す","もうす","mousu","说/名叫（谦让，等于言う）"],
  ["名前","なまえ","namae","名字"],
  ["使う","つかう","tsukau","使用"],
  ["中国","ちゅうごく","chuugoku","中国"],
  ["出身","しゅっしん","shusshin","出身地"],
  ["東京","とうきょう","toukyou","东京"],
  ["在住","ざいじゅう","zaijuu","居住"],
  ["歳","さい","sai","岁"],
  ["在留資格","ざいりゅうしかく","zairyuu shikaku","在留资格"],
  ["技術・人文知識・国際業務","ぎじゅつじんぶんちしきこくさいぎょうむ","gijutsu jinbun chishiki kokusai gyoumu","技人国签证"],
  ["年から","ねんから","nen kara","从…年起"],
  ["ゲーム","ゲーム","geemu","游戏"],
  ["三次元","さんじげん","sanjigen","三维"],
  ["クライアント","クライアント","kuraianto","客户端"],
  ["サーバー","サーバー","saabaa","服务器"],
  ["作る","つくる","tsukuru","做、开发"],
  ["使える","つかえる","tsukaeru","会用、能用"],
  ["来日後","らいにちご","rainichi go","来日本之后"],
  ["現物取引","げんぶつとりひき","genbutsu torihiki","现货交易（公开说法）"],
  ["バックエンド","バックエンド","bakkuendo","后端"],
  ["担当する","たんとうする","tantou suru","负责"],
  ["志望","しぼう","shibou","志愿、想做的方向"],
  ["開発","かいはつ","kaihatsu","开发"],
  ["よろしくお願いいたします","よろしくおねがいいたします","yoroshiku onegai itashimasu","请多关照"],
  ["日本語","にほんご","nihongo","日语"],
  ["英語","えいご","eigo","英语"],
  ["どちら","どちら","dochira","哪一个"],
  ["進める","すすめる","susumeru","进行"],
  ["挑戦する","ちょうせんする","chousen suru","挑战、试着做"],
  ["読み書き","よみかき","yomikaki","读和写"],
  ["日本語能力試験","にほんごのうりょくしけん","nihongo nouryoku shiken","JLPT"],
  ["N1","エヌいち","N1","N1级"],
  ["話す","はなす","hanasu","说"],
  ["スピード","スピード","supiido","速度"],
  ["まだ","まだ","mada","还、尚未"],
  ["練習中","れんしゅうちゅう","renshuu chuu","练习中"],
  ["難しい","むずかしい","muzukashii","难"],
  ["ところ","ところ","tokoro","地方、之处"],
  ["中国語","ちゅうごくご","chuugokugo","中文"],
  ["説明する","せつめいする","setsumei suru","说明"],
  ["できる","できる","dekiru","能、会"],
  ["なぜ","なぜ","naze","为什么"],
  ["日本","にほん","nihon","日本"],
  ["働く","はたらく","hataraku","工作"],
  ["エンジン","エンジン","enjin","引擎（游戏引擎）"],
  ["現場","げんば","genba","现场、一线"],
  ["強い","つよい","tsuyoi","强"],
  ["長く","ながく","nagaku","长期地"],
  ["技術","ぎじゅつ","gijutsu","技术"],
  ["積む","つむ","tsumu","积累"],
  ["住む","すむ","sumu","住"],
  ["技人国","ぎじんこく","gijin-koku","技人国（简称）"],
  ["ある","ある","aru","有"],
  ["いま","いま","ima","现在"],
  ["仕事","しごと","shigoto","工作"],
  ["変える","かえる","kaeru","换、改变"],
  ["理由","りゆう","riyuu","理由"],
  ["教える","おしえる","oshieru","告诉、教"],
  ["着地","ちゃくち","chakuchi","落地、落脚"],
  ["として","として","to shite","作为"],
  ["システム","システム","shisutemu","系统"],
  ["私","わたし","watashi","我"],
  ["主線","しゅせん","shusen","主线"],
  ["両方","りょうほう","ryouhou","两边、双方"],
  ["商用","しょうよう","shouyou","商业用"],
  ["リリース","リリース","ririisu","上线发布"],
  ["経験","けいけん","keiken","经验"],
  ["希望する","きぼうする","kibou suru","希望"],
  ["職種","しょくしゅ","shokushu","岗位工种"],
  ["何","なん／なに","nan / nani","什么"],
  ["または","または","matawa","或者"],
  ["ユニティ","ユニティ","Yuniti","Unity"],
  ["ユーイーファイブ","ユーイーファイブ","UE faibu","UE5"],
  ["希望年収","きぼうねんしゅう","kibou nenshuu","期望年收"],
  ["応相談","おうそうだん","ousoudan","面议"],
  ["いちばん","いちばん","ichiban","最"],
  ["得意","とくい","tokui","拿手"],
  ["プロジェクト","プロジェクト","purojekuto","项目"],
  ["担当範囲","たんとうはんい","tantou han'i","负责范围"],
  ["つき","つき","tsuki","带上、附上"],
  ["敦煌","とんこう","Tonkou","敦煌"],
  ["VR","ブイアール","VR","虚拟现实"],
  ["二人以上","ふたりいじょう","futari ijou","两人以上"],
  ["マルチプレイ","マルチプレイ","maruchi purei","联机多人"],
  ["専用サーバー","せんようサーバー","senyou saabaa","Dedicated Server"],
  ["座標","ざひょう","zahyou","坐标"],
  ["アニメ","アニメ","anime","动画"],
  ["エフェクト","エフェクト","efektu","特效"],
  ["ボイス","ボイス","boisu","语音"],
  ["同期","どうき","douki","同步"],
  ["実装する","じっそうする","jissou suru","实现（写成代码）"],
  ["操作","そうさ","sousa","操作"],
  ["リッチテキスト","リッチテキスト","ricchi tekisuto","富文本"],
  ["往復","おうふく","oufuku","来回、往返"],
  ["閉じる","とじる","tojiru","闭合、闭环"],
  ["出荷済み","しゅっかずみ","shukka zumi","已经上线交付"],
  ["デジタルツイン","デジタルツイン","dejitaru tsuin","数字孪生"],
  ["ゼロから","ゼロから","zero kara","从零开始"],
  ["画面","がんめん","gamen","画面"],
  ["埋め込む","うめこむ","umekomu","嵌入"],
  ["ウェブ","ウェブ","webu","网页"],
  ["ユーザー","ユーザー","yuuzaa","用户"],
  ["管理","かんり","kanri","管理"],
  ["シーン","シーン","shiin","场景"],
  ["論理","ろんり","ronri","逻辑"],
  ["ゲームプレイ","ゲームプレイ","geemupurei","Gameplay"],
  ["機密","きみつ","kimitsu","涉密、机密"],
  ["公開","こうかい","koukai","公开"],
  ["スクショ","スクショ","sukusho","截图"],
  ["ない","ない","nai","没有"],
  ["面接","めんせつ","mensetsu","面试"],
  ["デモ","デモ","demo","演示"],
  ["あなた","あなた","anata","你"],
  ["範囲","はんい","han'i","范围"],
  ["どこまで","どこまで","doko made","到哪一步"],
  ["全社","ぜんしゃ","zensha","全公司"],
  ["サービス","サービス","saabisu","服务"],
  ["骨格","こっかく","kokkaku","骨架、框架"],
  ["担当外","たんとうがい","tantou-gai","不在职责内"],
  ["ドメイン","ドメイン","domein","业务域"],
  ["受付","うけつけ","uketsuke","接入、受理"],
  ["マッチング","マッチング","matchingu","撮合"],
  ["口座","こうざ","kouza","账户"],
  ["当日","とうじつ","toujitsu","当天"],
  ["損益","そんえき","son'eki","盈亏"],
  ["履歴","りれき","rireki","历史记录"],
  ["メモリ","メモリ","memori","内存"],
  ["オーダブック","オーダブック","oodabukku","订单簿"],
  ["独立","どくりつ","dokuritsu","独立"],
  ["プロセス","プロセス","purosesu","进程"],
  ["認証","にんしょう","ninshou","鉴权、认证"],
  ["公開API","こうかいエーピーアイ","koukai API","开放接口"],
  ["リアルタイム","リアルタイム","riarutaimu","实时"],
  ["配信","はいしん","haishin","推送、分发"],
  ["書く","かく","kaku","写（代码）"],
  ["内装","ないそう","naisou","室内装修"],
  ["アプリ","アプリ","apuri","应用"],
  ["どちらも","どちらも","dochira mo","两边都"],
  ["はい","はい","hai","是"],
  ["ウィンドウズ","ウィンドウズ","Windowzu","Windows"],
  ["IOCP","アイオーシーピー","IOCP","完成端口（高并发网络）"],
  ["部屋","へや","heya","房间"],
  ["材質","ざいしつ","zaishitsu","材质"],
  ["照明","しょうめい","shoumei","照明"],
  ["チャット","チャット","chatto","聊天"],
  ["自身","じしん","jishin","自己"],
  ["強み","つよみ","tsuyomi","优势"],
  ["同じ","おなじ","onaji","相同"],
  ["人","ひと","hito","人"],
  ["出荷","しゅっか","shukka","交付上线"],
  ["低レイヤ","ていレイヤ","tei reiya","底层"],
  ["板","いた","ita","盘口/订单簿"],
  ["業務","ぎょうむ","gyoumu","业务"],
  ["分ける","わける","wakeru","分开"],
  ["弱み","よわみ","yowami","弱点"],
  ["課題","かだい","kadai","课题、待改进"],
  ["会話","かいわ","kaiwa","会话、口语"],
  ["専門用語","せんもんようご","senmon yougo","专业术语"],
  ["準備する","じゅんびする","junbi suru","准备"],
  ["今日","きょう","kyou","今天"],
  ["答える","こたえる","kotaeru","回答"],
  ["正確さ","せいかくさ","seikakusa","准确性"],
  ["必要","ひつよう","hitsuyou","必要"],
  ["補う","おぎなう","oginau","补充"],
  ["いつから","いつから","itsu kara","从什么时候"],
  ["入れる","はいる／はいれる","hairu / haireru","进入；能入职"],
  ["選考","せんこう","senkou","选拔、招聘流程"],
  ["決まり次第","きまりしだい","kimari shidai","一旦定下来"],
  ["会社","かいしゃ","kaisha","公司"],
  ["調整する","ちょうせいする","chousei suru","协调、调整"],
  ["年収","ねんしゅう","nenshuu","年收入"],
  ["最後に","さいごに","saigo ni","最后"],
  ["何か","なにか","nanika","什么（不定）"],
  ["質問","しつもん","shitsumon","问题"],
  ["チーム","チーム","chiimu","团队"],
  ["最初に","さいしょに","saisho ni","最先"],
  ["多い","おおい","ooi","多"],
  ["オンボーディング","オンボーディング","onboodingu","入职适应"],
  ["既存","きぞん","kison","已有的"],
  ["コード","コード","koodo","代码"],
  ["読む","よむ","yomu","读"],
  ["期間","きかん","kikan","期间"],
  ["どれくらい","どれくらい","dore kurai","多久、多少"],
  ["こちらこそ","こちらこそ","kochira koso","我才要（回礼）"],
  ["結果","けっか","kekka","结果"],
  ["楽しみにする","たのしみにする","tanoshimi ni suru","期待"],
  ["おります","おります","orimasu","在（谦让，等于います）"],
  ["もう一度","もういちど","mou ichido","再一次"],
  ["おっしゃる","おっしゃる","ossharu","说（尊敬，等于言う）"],
  ["いただけますか","いただけますか","itadakemasu ka","能请您…吗"],
  ["少々","しょうしょう","shoushou","稍稍"],
  ["待つ","まつ","matsu","等"],
  ["整理する","せいりする","seiri suru","整理"],
  ["土木工学","どぼくこうがく","doboku kougaku","土木工程"],
  ["学士","がくし","gakushi","学士"],
  ["ネットワーク","ネットワーク","nettowaaku","网络"],
  ["高負荷","こうふか","koufuka","高负载"]
].map(([ja,kana,roma,zh]) => ({ja,kana,roma,zh}));
