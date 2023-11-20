# Order2Post
![Order2Post](https://github.com/rira100000000/csv_converter/assets/99132547/ba62bc38-3196-42e4-bab7-7ce7165e5c7d)

## 概要
[Order2Post](https://order2post.fun/)は、ハンドメイドマーケットサイトminne、Creemaユーザー向けの、発送作業支援サービスです。<br>

ユーザーは各ハンドメイドマーケットサイトでダウンロードできる受注データのCSVファイルをクリックポストのまとめ申込用CSVファイルに変換することができます。<br>
入力した受注データは一覧として表示され、印刷することもできます。<br>

クリックポストのまとめ申込用CSV作成の手間を簡略化したい、注文情報を簡単に印刷したいといった用途に適います。<br>

## 機能
### 注文情報の一覧表示
そのままでは扱いづらいCSVの受注データを表形式で出力します。
![image](https://github.com/rira100000000/csv_converter/assets/99132547/9dbe2f27-8320-480a-aace-1bb238f4f62f)

### クリックポストのまとめ申込用ファイルへ変換
簡単な操作でクリックポストのまとめ申込ファイルを作成、ダウンロードできます。
![image](https://github.com/rira100000000/csv_converter/assets/99132547/8fbdd092-ea5f-49af-904b-abef6f012286)

## 仕様技術
### バックエンド
* [Ruby 3.1.4](https://www.ruby-lang.org/ja/)<br>
* [Ruby on Rails 7.0.8](https://rubyonrails.org/)<br>
### フロントエンド
* [React 18.2.0](https://react.dev/)<br>
* [TypeScript 5.2.2](https://www.typescriptlang.org/)<br>
* [Tailwind CSS 3.5.5](https://tailwindcss.com/)<br>
* [vite 4.5.0](https://ja.vitejs.dev/)<br>

### データベース
* [PostgreSQL](https://www.postgresql.org/)

### デプロイ
* [Fly.io](https://fly.io/)<br>

### CI
* [GitHub Actions](https://github.co.jp/features/actions)<br>

### テスト
* [RSpec](https://rspec.info/)

## 利用方法
### 環境変数
| 環境変数名 | 説明 |
| ---- | ---- |
| MAILGUN_API | MailgunのAPIキー |

### インストールと実行
```
$ git clone https://github.com/rira100000000/csv_converter.git
$ cd csv_converter
$ bin/setup
$ npm install
$ foreman start -f Procfile.dev
```

### Test/Formatter & Lint
```
$ bundle exec rspec
$ bin/lint
```
