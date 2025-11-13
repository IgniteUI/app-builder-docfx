---
title: ステップバイステップの例 
_description: App Builder を使用すると、ユーザーはローカル変数とグローバル変数を使用して、さまざまなデータを保存してアプリの状態を管理できるようになります。
_keywords: App builder, インフラジスティックス, データ バインディング
_language: ja
---

# ステップバイステップのアプリ作成例

以下に 2 つのシナリオの実際の使用例を示します。これらのシナリオでは、[状態とコンテキストの管理機能セットのメイン トピック](master-detail.md)で説明した内容がすべてカバーされます。

> [!NOTE]
> 以下のチュートリアルでは、[Northwind WebAPI](https://data-northwind.indigo.design/swagger/index.html) を使用します。

## 例 1

あるビューから設定されたグローバル変数と、ビュー コンテナを介した別のビューからのグリッド リクエストの更新

<a href="https://my.appbuilder.dev/app/bea0uqmjezxn/preview" target="_blank">ライブ デモ</a>


1. コンボ選択変更イベント時に設定されるグローバル変数を追加します。コンボは Customer エンドポイントにバインドされています。
2. コンボから CustomerID を選択します。
3. 他のビューに移動します。そこでは、グリッドが CustomerID に基づいて注文を取得する API リクエストにバインドされています。
4. グリッドは、(コンボから) 選択した CustomerID で更新する必要があります。

<img src="../images/state-and-context/18.png" srcset="../images/state-and-context/18.png 2x" />
<p style="text-align:center;">選択変更のイベント</p>

<img src="../images/state-and-context/20.png" srcset="../images/state-and-context/20.png 2x" />
<p style="text-align:center;">CustomerID 変数</p>

1. Orders グリッドから Order をクリックすると、OrderDetails を含む別のグリッドを読み込みます。

2. 結果

   <img src="../images/state-and-context/21.png" srcset="../images/state-and-context/21.png 2x" />
   <p style="text-align:center;">結果</p>

## 例 2

グリッドとチャートのデータを読み込む階層データ ソースにバインドされたツリー

<a href="https://my.appbuilder.dev/app/jj15bv7rgkw8/preview" target="_blank">ライブ デモ</a>

1. Tree コンポーネントを追加し、その親を階層データ ソース (繰り返しデータ コンテキスト) にバインドします。
2. 親ツリー ノードのクリック時イベントを、CustomerID - 文字列変数を格納する変数設定アクションにバインドします。

   <img src="../images/state-and-context/22.png" srcset="../images/state-and-context/22.png 2x" />
   <p style="text-align:center;">ツリー ノードのバインド</p>

3. ツリー子ノードを追加し、親データ コンテキストに繰り返します。子ツリー ノードのクリック時イベントを、OrderID - Number 変数を格納する変数の設定アクションにバインドします。

   <img src="../images/state-and-context/23.png" srcset="../images/state-and-context/23.png 2x" />
   <p style="text-align:center;">子ノードのバインド</p>

4. ルート ツリー要素に Customer が表示され、子ツリー ノードに Orders が表示されていることを確認します。

5. OrderID 変数に基づいてクエリ パラメーターとして Orders を取得するエンドポイントに Grid をバインドします。

   <img src="../images/state-and-context/24.png" srcset="../images/state-and-context/24.png 2x" />
   <p style="text-align:center;">グリッドを Orders データにバインドする</p>

6. CustomerID 変数に基づいて Customer Orders History をクエリ パラメーターとして取得するエンドポイントにチャートをバインドします。

   <img src="../images/state-and-context/25.png" srcset="../images/state-and-context/25.png 2x" />
   <p style="text-align:center;">チャートを Customer Orders History テーブルにバインドする</p>

7. 結果

   <img src="../images/state-and-context/26.png" srcset="../images/state-and-context/26.png 2x" />
   <p style="text-align:center;">ツリー + グリッド + チャートの結果</p>
