import useModal from '../../../app/frontend/src/hooks/useModal';

const mockPapaParse: {
  getRootProps: () => void;
  onUploadAccepted: () => void;
  setMinneData: (data: string[][]) => void;
} = jest.createMockFromModule('react-papaparse');

mockPapaParse.getRootProps = () => {
  console.log('getRootProps called');
  mockPapaParse.onUploadAccepted();
};

mockPapaParse.onUploadAccepted = () => {
  console.log('onIploadAccepted called');
  mockPapaParse.setMinneData(testData);
};

mockPapaParse.useCSVReader = () => {
  return (
    <input id='continueInput' name='continueInput' type='file' accept='.csv' />
  );
};

mockPapaParse.setMinneData = (data: string[][]) => {
  useModal.openModal();
  const minneData: string[][] = ReadMinne(data);
  props.setLines(minneData);
  serviceData.current = minneData;
  service.current = 'minne';
  anotherService.current = 'Creema';
};

const setCreemaData = (data: string[][]) => {
  openModal();
  const creemaData: string[][] = ReadCreema(data);
  props.setLines(creemaData);
  serviceData.current = creemaData;
  service.current = 'Creema';
  anotherService.current = 'minne';
};
const testData =
  '注文ID,注文日,注文状況,支払方法,入金確認日,発送日,作品名,配送方法,配送エリア,発送までの目安,販売価格,数量,小計,備考,注文の販売価格,注文の送料,注文の合計,注文者のユーザーID,注文者のニックネーム,注文者の氏名,注文者の電話番号,配送先の郵便番号,配送先の住所1,配送先の住所2,配送先の氏名,配送先の電話番号,作品管理番号,12345678,2023/7/1,発送完了,クレジットカード,2023/7/1,2023/7/1,カラフルギャザースカート　レコード柄,宅急便コンパクト,全国一律料金,7,7300,1,7300,,7300,600,7900,papllizu,papllizu,田中 和子,9012345678,4510053,愛知県名古屋市西区枇杷島1丁目11ー11,,田中 和子,9012345678,,12345679,2023/7/1,発送完了,auかんたん決済,2023/7/1,2023/7/5,ガーゼラグランブラウス　グレージュ,クリックポスト,全国一律,7,4000,1,4000,🧵→首まわり 小さめ で お願い致します。＊いつも 子ども服の 150か160を、着ています,4000,200,4200,genkine,genkine,山田 花子,9012345679,7391734,広島県広島市安佐北区口田1丁目22-33,,山田 花子,9012345679,,12345680,2023/7/1,発送完了,クレジットカード,2023/7/1,2023/7/4,【カラバリ3色】ガーゼスクエアネックブラウス（ブラウスカラー選択: スモーキーピンク）,クリックポスト,全国一律,7,3500,1,3500,,10500,600,11100,11111,11111,高橋 育子,9012345680,3430836,埼玉県越谷市蒲生寿町2ー11-11,マンション 南越谷Ａ-111,高橋 育子,9012345680,,12345680,2023/7/1,発送完了,クレジットカード,2023/7/1,2023/7/4,【カラバリ3色】ガーゼスクエアネックブラウス（ブラウスカラー選択: 黒）,クリックポスト,全国一律,7,3500,1,3500,,10500,600,11100,11111,11111,高橋 育子,9012345681,3430836,埼玉県越谷市蒲生寿町2ー11-11,マンション 南越谷Ａ-111,高橋 育子,9012345681,,12345680,2023/7/1,発送完了,クレジットカード,2023/7/1,2023/7/4,【カラバリ3色】ガーゼスクエアネックブラウス（ブラウスカラー選択: 白）,クリックポスト,全国一律,7,3500,1,3500,,10500,600,11100,11111,11111,高橋 育子,9012345682,3430836,埼玉県越谷市蒲生寿町2ー11-11,マンション 南越谷Ａ-111,高橋 育子,9012345682,,12345683,2023/7/2,発送完了,Amazon Pay,2023/7/2,2023/7/5,【カラバリ3色】ガーゼスクエアネックブラウス（ブラウスカラー選択: スモーキーピンク）,クリックポスト,全国一律,7,3500,1,3500,,3500,200,3700,mari,mari,鈴木 真理,9012345683,9540082,新潟県見附市柳橋町,123-45,鈴木 真理,9012345683,,12345684,2023/7/2,発送完了,後払い決済,2023/7/2,2023/7/4,ガーゼのアラジンパンツ 黒,宅急便コンパクト,全国一律料金,7,6000,1,6000,,6000,600,6600,Sunday,Sunday,柴田 聡美,9012345684,9900821,山形県山形市北町1-2-33,,柴田 聡美,9012345684,,12345685,2023/7/3,発送完了,auかんたん決済,2023/7/3,2023/7/4,カラフルガーゼスカーチョ レコード柄,宅急便コンパクト,全国一律料金,7,7300,1,7300,,7300,600,7900,ana,ana,市川 浩美,9012345685,1670051,東京都杉並区荻窪3-45-6,,市川 浩美,9012345685,,12345686,2023/7/3,発送完了,クレジットカード,2023/7/3,2023/7/4,ガーゼ ジョガーパンツ　カーキ,宅急便コンパクト,全国一律料金,7,6000,1,6000,,6000,600,6600,imako,imako,島田 英世,9012345686,2520144,神奈川県相模原市緑区東橋本1-23-45,,島田 英世,9012345686,,12345687,2023/7/3,発送完了,クレジットカード,2023/7/3,2023/7/4,カラフルスカーチョ ,宅急便コンパクト,全国一律料金,5,7300,1,7300,,7300,600,7900,misaya,misaya,鈴木 瑞穂,9012345687,6830027,鳥取県米子市陰田町1111,,鈴木 瑞穂,9012345687,,12345688,2023/7/4,発送完了,クレジットカード,2023/7/4,2023/7/5,ガーゼ ジョガーパンツ　グレージュ,宅急便コンパクト,全国一律料金,7,6000,1,6000,丈を90cm▶︎93cmでお願い致します。,6000,600,6600,oma,oma,広瀬 由美子,9012345688,4701154,愛知県豊明市新栄町5-67-8,アパート豊明新栄第1 111号,広瀬 由美子,9012345688,,12345689,2023/7/4,発送完了,クレジットカード,2023/7/4,2023/7/5,【お直し無料】サラッと楽ちん！ガーゼのアラジンパンツ（10色） （カラーバリエーション: カーキ）,宅急便コンパクト,全国一律料金,7,6000,1,6000,,6000,600,6600,kiki,kiki,牛田 喜和子,9012345689,2420017,神奈川県大和市大和東1‐2‐3,,牛田 喜和子,9012345689,,12345690,2023/7/5,発送完了,コンビニ払い,2023/7/5,2023/7/6,【お直し無料】サラッと楽ちん！ガーゼのアラジンパンツ（10色） （カラーバリエーション: デニムネイビー）,宅急便コンパクト,全国一律料金,7,6000,1,6000,,6000,600,6600,cha,cha,酒井 孝子,9012345690,9592808,新潟県胎内市東牧777-77,,酒井 孝子,9012345690,,12345691,2023/7/5,発送完了,後払い決済,2023/7/5,2023/7/7,【お直し無料】サラッと楽ちん！ガーゼのアラジンパンツ（10色） （カラーバリエーション: 辛子色）,宅急便コンパクト,全国一律料金,7,6000,1,6000,丈を85cmでお願い致します。,6000,600,6600,eiko,eiko,千葉 栄子,9012345691,3390056,埼玉県さいたま市岩槻区加倉,1-23-45-6,千葉 栄子,9012345691,,12345692,2023/7/5,発送完了,クレジットカード,2023/7/5,2023/7/6,ガーゼ ジョガーパンツ　ネイビー,宅急便コンパクト,全国一律料金,7,6000,1,6000,以前デニム風の物を買いましたが、とっても履き心地がよかったのですが、本日ハイターを垂らしてしまい、外では履けなくなってしまいました、悲しすぎます。。なのでまた色違い購入します。せっかく作っていただいたのに申し訳なく思ってます。ネイビーは汚さず履きたいです。よろしくお願いします(^^),6000,600,6600,akami2,akami2,早瀬 麻美,9012345692,6903405,島根県飯石郡飯南町上来島123,,早瀬 麻美,9012345692,,12345693,2023/7/6,発送完了,クレジットカード,2023/7/6,2023/7/7,ガーゼ ワイドパンツ  グレージュ,宅急便コンパクト,全国一律料金,7,6000,1,6000,,6000,600,6600,oyakata79,oyakata79,恩田 京子,9012345693,4700372,愛知県豊田市井上町1-123,,恩田 京子,9012345693,,12345694,2023/7/7,発送準備中,クレジットカード,2023/7/7,2023/7/8,【カラバリ3色】ガーゼスクエアネックブラウス（ブラウスカラー選択: 黒）,クリックポスト,全国一律,7,3500,1,3500,,14300,1000,15300,komomo,komomo,西島 寛美,9012345694,8140155,福岡県福岡市城南区東油山3-4-5,田中薬局,西島 寛美,9012345694,,12345694,2023/7/7,発送準備中,クレジットカード,2023/7/7,2023/7/8,【カラバリ3色】ガーゼスクエアネックブラウス（ブラウスカラー選択: 白）,クリックポスト,全国一律,7,3500,1,3500,,14300,1000,15300,komomo,komomo,西島 寛美,9012345695,8140155,福岡県福岡市城南区東油山3-4-5,田中薬局,西島 寛美,9012345695,,12345694,2023/7/7,発送準備中,クレジットカード,2023/7/7,2023/7/8,カラフルギャザースカート　黒柄,宅急便コンパクト,全国一律料金,7,7300,1,7300,はじめまして。身長が150くらいですのて、着丈を80にしていただきたいです。,14300,1000,15300,komomo,komomo,西島 寛美,9012345696,8140155,福岡県福岡市城南区東油山3-4-5,田中薬局,西島 寛美,9012345696,,12345697,2023/7/7,発送完了,クレジットカード,2023/7/7,2023/7/8,ガーゼ ワイドパンツ  グレージュ,宅急便コンパクト,全国一律料金,7,6000,1,6000,,6000,600,6600,j8,j8,山本 順子,9012345697,5210021,滋賀県米原市河南111-1,,山本 順子,9012345697,,12345698,2023/7/7,発送準備中,クレジットカード,2023/7/7,,【特集掲載】ガーゼ ギャザースカート 赤,宅急便コンパクト,全国一律料金,7,6000,1,6000,80cm丈でお願いいたします。,6000,600,6600,harbkanon,harbkanon,大島 明子,9012345698,1840014,東京都小金井市貫井南町1-2-34,マンションB-100,大島 明子,9012345698,,12345699,2023/7/8,発送準備中,後払い決済,2023/7/8,,ガーゼ ワイドパンツ 赤,宅急便コンパクト,全国一律料金,7,6000,1,6000,サイズの調整をお願いします,9500,800,10300,ayaya,ayaya,山田 文,9012345699,7818010,高知県高知市桟橋通1-2-3,マンション桟橋通二丁目1111,山田 文,9012345699,,12345699,2023/7/8,発送準備中,後払い決済,2023/7/8,,【カラバリ3色】ガーゼスクエアネックブラウス（ブラウスカラー選択: 白）,クリックポスト,全国一律,7,3500,1,3500,一緒に購入したものとまとめて発送をお願いします,9500,800,10300,ayaya,ayaya,山田 文,9012345700,7818010,高知県高知市桟橋通1-2-3,マンション桟橋通二丁目1111,山田 文,9012345700,,12345701,2023/7/8,発送完了,クレジットカード,2023/7/8,2023/7/10,ガーゼラグランブラウス　黒,クリックポスト,全国一律,7,4000,1,4000,,4000,200,4200,j8,j8,山本 順子,9012345701,5210021,滋賀県米原市河南111-1,,山本 順子,9012345701,,12345702,2023/7/9,発送完了,クレジットカード,2023/7/9,2023/7/10,【oma-tsu-ri19様専用ページ】ガーゼのアラジンパンツ黒　グレージュ　93センチ丈,宅急便コンパクト,全国一律料金,7,12000,1,12000,,12000,850,12850,oma,oma,伊達 由美子,9012345702,4701154,愛知県豊明市新栄町1-11-1,マンション豊明新栄第1 101号,伊達 由美子,9012345702,,12345703,2023/7/9,発送完了,Apple Pay,2023/7/9,2023/7/10,【お直し無料】サラッと楽ちん！ガーゼのアラジンパンツ（10色） （カラーバリエーション: デニムネイビー）,宅急便コンパクト,全国一律料金,7,6000,1,6000,,6000,600,6600,macoo,macoo,渡辺 真樹子,9012345703,2340055,神奈川県横浜市港南区,日野南1丁目1-11,渡辺 真樹子,9012345703,,12345704,2023/7/9,発送完了,d払い（ドコモ）,2023/7/9,2023/7/10,【rabbits15418様専用ページ】個性的！パンツに見える変形スカート  ,宅急便コンパクト,全国一律料金,7,8000,1,8000,お世話になっております。もし可能でしたら到着時間を19時以降にしていただけますと幸いです。購入が遅くなって申し訳ございません。よろしくお願いいたします🙇‍♀️,8000,600,8600,rabbits,rabbits,井出 理子,9012345704,5700043,大阪府守口市南寺方東通1丁目2-3,GEアパート222号室,井出 理子,9012345704,,12345705,2023/7/9,発送準備中,コンビニ払い,2023/7/10,,ガーゼ ジョガーパンツ　ネイビー,宅急便コンパクト,全国一律料金,7,6000,1,6000,,6000,600,6600,saku,saku,元田 洋子,9012345705,2770921,千葉県柏市大津ケ丘1-2/33,,元田 洋子,9012345705,,12345706,2023/7/9,発送完了,クレジットカード,2023/7/9,2023/7/10,ガーゼ ワイドパンツ  辛子色,宅急便コンパクト,全国一律料金,7,6000,1,6000,,10000,800,10800,mint,mint,北島 美樹,9012345706,6512244,兵庫県神戸市西区井吹台北町3-3-3,,北島 美樹,9012345706,,12345706,2023/7/9,発送完了,クレジットカード,2023/7/9,2023/7/10,ガーゼラグランブラウス　グレージュ,クリックポスト,全国一律,7,4000,1,4000,,10000,800,10800,mint,mint,北島 美樹,9012345707,6512244,兵庫県神戸市西区井吹台北町3-3-3,,北島 美樹,9012345707,,12345708,2023/7/9,発送完了,クレジットカード,2023/7/9,2023/7/10,【gauroi様専用ページ】カラフルスカーチョ　レコード,宅急便コンパクト,全国一律料金,7,7300,1,7300,,7300,600,7900,gaur,gaur,飯田 真弓,9012345708,6990101,島根県松江市東出雲町揖屋111-11,,飯田 真弓,9012345708,,12345709,2023/7/9,発送準備中,クレジットカード,2023/7/9,,ガーゼ ワイドパンツ  黒,宅急便コンパクト,全国一律料金,7,6000,1,6000,丈７５cmでお願いします。日時指定が可能であれば１５日㈯１７日㈪１８日㈫の１９時〜の指定でお願いしたいです😌,6000,600,6600,purinn,purinn,大西 美和,9012345709,2900034,千葉県市原市島野333-3,,大西 美和,9012345709,,12345710,2023/7/10,発送準備中,auかんたん決済,2023/7/10,,【カラバリ3色】ガーゼスクエアネックブラウス（ブラウスカラー選択: 黒）,クリックポスト,全国一律,7,3500,1,3500,,3500,200,3700,mad,mad,新田 律子,9012345710,5980057,大阪府泉佐野市本町1-1,,新田 律子,9012345710,,12345711,2023/7/10,発送準備中,クレジットカード,2023/7/10,,ガーゼ ワイドパンツ  黒,宅急便コンパクト,全国一律料金,7,6000,1,6000,着丈→80センチでお願いします。,6000,600,6600,kei-,kei-,久石 桂子,9012345711,8500051,北海道釧路市光陽町11-11,,久石 桂子,9012345711,,12345712,2023/7/11,発送準備中,クレジットカード,2023/7/11,,ガーゼのアラジンパンツ グレージュ,宅急便コンパクト,全国一律料金,7,6000,1,6000,,6000,600,6600,takefu,takefu,山上 智大,9012345712,2220026,神奈川県横浜市港北区篠原町111-11,,山上 智大,9012345712,,12345713,2023/7/12,発送準備中,クレジットカード,2023/7/12,,ハーフリネンペチパンツ　白,クリックポスト,全国一律,7,2500,1,2500,,5000,200,5200,guest-261c7f43,guest-261c7f43,藤田 嘉子,9012345713,5300055,大阪府野崎町２−２２−２２２２,,藤田 嘉子,9012345713,,12345713,2023/7/12,発送準備中,クレジットカード,2023/7/12,,コットンペチパンツ　黒,クリックポスト,全国一律,7,2500,1,2500,,5000,200,5200,guest-261c7f43,guest-261c7f43,藤田 嘉子,9012345714,5300055,大阪府野崎町２−２２−２２２２,,藤田 嘉子,9012345714,,';

module.exports = mockPapaParse;
