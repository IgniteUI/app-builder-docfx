---
title: Query Builder (クエリ ビルダー)
_description: App Builder のクエリ ビルダーを使用すると、開発者はビジュアル インターフェイスを使用して動的なデータ クエリを作成し、クエリ変数を活用して効率的なサーバー側フィルタリングが可能になります。
_keywords: App Builder, Query Builder, クエリ変数, データ フィルタリング, サーバー側フィルタリング, API リクエスト, インフラジスティックス
_language: ja
---

# App Builder の Query Builder のステップバイステップ ガイド

## Query Builder 変数とコンポーネントの概要

App Builder の Query Builder コンポーネントは、次の 2 つの主要な概念に基づいて動作します:

- ツールボックス内の**クエリ変数**と**クエリ ビルダー コンポーネント**。

**クエリ変数**は、現在[プレビュー版環境](https://preview.appbuilder.dev/)の一部としてのみ利用可能であり、データ ソースと対話する特殊な変数であり、API リクエストを通じてデータを動的にフィルター処理することで大規模なデータセットを効率的に処理できるように設計されています。これらのリクエストは、高度な式をパラメーターとして駆動する**サーバー側のフィルタリング**を利用し、大量のデータを処理する際に最適なパフォーマンスを保証します。

この変数は**クエリ ビルダー コンポーネント**と統合され、動的なデータ管理と UI 駆動型のフィルタリングが可能になります。

クエリ変数の概念は、クエリ ビルダー コンポーネントが使用される 2 つの主な方法をカバーします。

- **クエリ ビルダー コンポーネント**が、App Builder に統合され、**クエリ変数**エディターとして使用される場合。
- **クエリ ビルダー コンポーネント**が UI 要素として機能し、ツールボックスからキャンバスに配置された際にエンドユーザーが直接操作できる場合。

## ステップバイステップの紹介

## 手順 1. ユーザー ストーリーを定義して実装します

次のユースケースを実現してみましょう。選択したカテゴリに属し、**orderDetails** テーブルで指定された範囲内の数量で注文されたすべての製品を、**products** テーブルから取得します。

SQL の例:

```
SELECT * 
FROM products 
WHERE categoryId = "Beverages" 
AND productId IN (
  SELECT productId
  FROM orderDetails
  WHERE quantity >= 5
  AND quantity <= 10
)
```

1. **メイン クエリ (Products テーブル)**:

   - **products** テーブルからすべての列 (`*`) を選択します。
   - **categoryId = "Beverages"** の製品をフィルタリングします (Beverages カテゴリの製品のみ)。

2. **サブクエリ (OrderDetails テーブル)**:

   - 注文された **quantity** が **5 〜 10** (両端を含む) の **orderDetails** から **productId** を取得します。
   - これらの **productId** は、メイン クエリの **IN** 句で使用され、製品をフィルター処理します。

   **最終出力:**

結果は、**5 〜 10 個**の数量で注文された**飲料製品**のリストになります。

## 手順 2. クエリ変数を作成します

クエリ変数を作成しましょう。この変数は、API リクエストを通じてデータを動的にフィルタリングすることで、大規模なデータセットを処理するために使用されます。

1. 新しい変数を作成します。
2. **データ API リクエストから初期化する**ことを選択します。
3. 新しく追加された**クエリ ビルダー エンドポイント**を選択します。[App Builder のテスト OpenAPI は、サーバー側のフィルタリングをサポートするようになりました。](https://data-northwind.appbuilder.dev/swagger/index.html)
4. 「query」 エンドポイントを検索し、**ExecuteQuery.products** を選択します。これは、複雑なクエリの例の**基本テーブル**として機能します。

   <details>

   <summary>🖼️ Query Builder エンドポイントの選択を表示</summary>

   <img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/1.png" />
   <p style="text-align:center;">エンドポイントの選択</p>

   </details>
   <br />

   **結果:**

   <img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/2.png" />

## 手順 3.クエリ変数を設定します

まず、**[クエリの編集]** パネルを開きます。

**2 つのテーブル**で機能する複雑なクエリを構築します。

- **products** – データが取得されるメイン テーブル。
- **orderDetails** – 範囲内の数量に基づいて製品をフィルタリングするためにサブクエリで使用されます。

💡 **注:** 値をハードコーディングする代わりに、**各条件を変数にバインド**し、アプリのコンポーネントを通じてユーザーが動的に更新できるようにします。

**選択したカテゴリで製品をフィルタリングします**:

- クエリ条件を設定するために **WHERE 句**の構築を開始します。
- **Select コンポーネント**で使用される、デフォルト値が **1** の**数値変数**を作成します。

<details>
<summary>🖼️ カテゴリ フィルターの設定を表示n</summary>

<img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/3.png" />
<p style="text-align:center;">カテゴリ フィルターの設定を表示</p>

</details>
<br/>

指定された範囲内の数量の注文の製品 ID を取得するための**条件を設定**します。

- デフォルト値が **10** と **15** である 2 つの**数値変数** (quantityGreaterThan、quantityLessThan) を作成します。
- これらは **Input コンポーネント**によって制御されます。

<details>
<summary>🖼️ 最小数量構成を表示</summary>

<img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/4.png" />
<p style="text-align:center;">最小数量構成を表示</p>


</details>

<br/>

<details>
<summary>🖼️ 最大数量設定を表示</summary>

<img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/5.png" />
<p style="text-align:center;">最大数量設定を表示</p>

</details>
<br />

💡 **注:** ハードコードされた値も使用できますが、このデモでは、**動的フィルタリング**に**変数**を使用します。

## 手順 4.クエリを適用して保存します

1. **[保存]** をクリックして、**複雑なクエリ変数**の設定を保存します。
2. **[SEND] ボタン**を使用してクエリの実行をテストします。

   <img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/6.png" />
   <p style="text-align:center;">クエリ実行テストを表示</p>

   <br />

   **この時点で、4 つの変数があります。**

   - **ComplexQuery** → **サーバー側のフィルタリング**を処理するクエリ変数。
   - **selectedCategory** → **カテゴリ ID** を保持します。
   - **quantityGreaterThan** → **最小数量**を定義します。
   - **quantityLessThan** → **最大数量**を定義します。

## 手順 5.インタラクティブなコンポーネントを追加します

これらの変数は、サンプル アプリ内の**コンポーネントにバインドされます**。

- カテゴリ選択の **Select コンポーネント**。
- 数量の範囲を指定するための **2 つの Input コンポーネント**。

**Select コンポーネント**と 2 つの **Input コンポーネント**を追加し、それらを手順 3 で作成した変数にバインドします。

<details>
<summary>🖼️ コンポーネントの追加を表示</summary>

<img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/7.png" />
<p style="text-align:center;">コンポーネントの追加を表示</p>

</details>
<br />

バインドします:

**Select コンポーネント**:
**Select コンポーネント**にフォーカスし、**[Select item]** をクリックします。Northwind データ ソースの **Category テーブル**を使用して、これに**データ リピーター**を適用します。
<details>
  <summary>🖼️ データ リピーターの設定を表示</summary>

<img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/8.png" />
<p style="text-align:center;">データ リピーターの設定を表示</p>

</details>
<br />

Select item 要素の Content と Value を Category -> Name と CategoryID にバインドします。

<details>
  <summary>🖼️ Select item のバインディングを表示</summary>

<img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/9.png" />
<p style="text-align:center;">Select item のバインディングを表示</p>

</details>
<br />

Select コンポーネントにフォーカスし、selectedCategory 変数にバインドします。

<details>
<summary>🖼️ Select コンポーネントのバインディングを表示</summary>

<img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/10.png" />
<p style="text-align:center;">Select コンポーネントのバインディングを表示</p>

</details>
<br />

quantityGreaterThan の **Input コンポーネント**:

<details>
<summary>🖼️ 最小数量入力バインディングを表示</summary>

<img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/11.png" />
<p style="text-align:center;">最小数量入力バインディングを表示</p>

</details>
<br />

quantityLessThan **Input コンポーネント**:

<details>
<summary>🖼️ 最大数量入力バインディングを表示</summary>

<img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/12.png" />
<p style="text-align:center;">最大数量入力バインディングを表示</p>

</details>
<br />

1. **Value** プロパティの**双方向バインディング**が有効になっていることを確認してください。
2. **Grid コンポーネント**を追加し、手順 2 で作成した**クエリ変数**にバインドします。

<details>
<summary>🖼️ Grid コンポーネントのバインディングを表示</summary>

<img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/13.png" />
<p style="text-align:center;">Grid コンポーネントのバインディングを表示</p>

</details>
<br />

**結果:**

<img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/14.png" />
<p style="text-align:center;">インタラクティブなコンポーネントの結果を表示</p>

## 手順 6.特定の数量で注文された商品を表示します

これまでのところ、クエリは、**Dairy Products** カテゴリに属し、数量が **5 から 7 の間**で注文された**すべての製品**を返します。

<details>
<summary>🖼️ 最初のクエリ結果を表示</summary>

<img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/15.png" />
<p style="text-align:center;">最初のクエリ結果を表示</p>

</details>
<br />

ただし、クエリは **products** テーブルからのみデータを取得するため、**実際の注文数量は表示されません**。**結果を検証する**には、対応する**注文数量**が表示されるように UI を変更する必要があります。

## 手順 7.グリッド行選択を使用して製品ごとの注文数量を表示

1. **グリッドの行選択変更**インタラクションを追加し、それに**変数**をバインドします。

   <details>
     <summary>🖼️ グリッドの行選択インタラクションを表示</summary>

   <img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/16.png" />
   <p style="text-align:center;">グリッドの行選択インタラクションを表示</p>

   </details>
   <br />

2. 変数が **ProductDTO** タイプであることを確認してください。

   <details>
     <summary>🖼️ 変数タイプの設定を表示</summary>

   <img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/17.png" />
   <p style="text-align:center;">変数タイプの設定を表示</p>

   </details>
   <br />

3. 関連データを表示するには、**Dialog** とその中に **Grid** を追加します。

   <details>
     <summary>🖼️ ダイアログとグリッドの設定を表示</summary>

   <img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/18.png" />
   <p style="text-align:center;">ダイアログとグリッドの設定を表示</p>

   </details>
   <br />

4. 特定のカテゴリ内の製品の **order details** を取得する別の**クエリ変数**を構成します。

   **クエリの例:**

   ```
   SELECT * 
   FROM orderDetails 
   WHERE productId IN (
       SELECT productId 
       FROM products 
       WHERE categoryId = 1
   )
   AND Quantity BETWEEN 5 AND 15;

   ```

   <br />

   **結果:**

   <img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/19.png" />
   <p style="text-align:center;">orderDetails クエリ結果を表示</p>

5. **Grid コンポーネント**を **OrdersComplexQuery 変数**にバインドします。

   <details>
     <summary>🖼️ orderDetails にグリッド バインディングを表示</summary>

   <img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/20.png" />
   <p style="text-align:center;">orderDetails にグリッド バインディングを表示</p>

   </details>
   <br />

## 手順 8.アプリをプレビューします。

- **[プレビュー]** をクリックします。
- Input コンポーネントを使用してクエリ結果を動的に調整します。
- ユース ケースの例:
  - **Confections** カテゴリーを検索します。
  - **Quantity を 4 ～ 8 の間**で設定します。
<br />

<details>
  <summary>🖼️ Confections の例でアプリのプレビューを表示</summary>

<img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/21.png" />
<p style="text-align:center;">Confections の例でアプリのプレビューを表示</p>

</details>

## 手順 9.クエリ ビルダーを使用してリアルタイムでクエリを変更します

この手順では、**クエリをリアルタイムで変更する方法**を示します。**数量範囲内**で注文をフィルタリングする代わりに、特定の**数量以上**になるように変更します。

1. **ツールボックス**から **Query Builder コンポーネント**をドラッグアンドドロップします

<details>
  <summary>🖼️ Query Builder コンポーネントの追加を表示</summary>

<img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/22.png" />
<p style="text-align:center;">Query Builder コンポーネントの追加を表示</p>

</details>
<br />

1. それを先ほど作成した**複雑なクエリ変数**にバインドします。

2. これで、**クエリ コンポーネント**は**クエリ変数**にバインドされ、データ リクエストを動的に処理するようになりました。

<details>
  <summary>🖼️ Query Builder のバインディング結果を表示</summary>

<img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/23.png" />
<p style="text-align:center;">Query Builder のバインディング結果を表示</p>

</details>
<br />

**クエリを編集する前** - クエリは数量が **5 ～ 11** のすべての **Confections** を返します。

<img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/24.png" />
<p style="text-align:center;">編集前のクエリ結果を表示</p>

<br />

**クエリを編集した後の結果**: - 2 番目の条件を削除して、**Quantity が 10 以上**の注文を返すように **WHERE 句**を変更します。

<img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/25.png" />
<p style="text-align:center;">編集後にクエリ結果を表示</p>

## FAQ

1. Query Builder はなぜ OData を使用しないのですか?
OData はサブクエリをサポートしていませんが、Query Builder は**主に条件ツリーを構築します**が、一部の式は OData 互換のフィルターにマップされる場合があります。ただし、OData の制限により、完全なサポートは保証されません。

Query Builder は、**フィルタリング ロジック**を直接制御できるようにすることで柔軟性を高め、OData がネイティブにサポートしていないサブクエリなどの複雑なシナリオをより適切にサポートできるようにします。

## 既知の問題と制限

- **コード生成なし** - クエリ変数またはクエリ ビルダーを使用してアプリケーションをコード生成しようとすると、「コンポーネントはサポートされていません」というメッセージが表示されます。
- **プレビュー版環境のクエリ コンポーネント** - 条件を完全に制御できますが、バインディングは失われ、現在の値 (5 と 10) が取得されます。変数の初期状態に戻す場合は、コンポーネントを再度追加して最初からやり直す必要があります。
- リクエストを実行する際に**特定のフィールドを設定すること**は許可されていません。他のコンポーネントにこれを知らせるメカニズムがないため、常にすべてのフィールドが取得され、不整合が発生します。
- **Query Builder の返却フィールドは無効です** - フィールドのサブセットを選択するとデータ的には機能しますが、App Builder は動的な構造をサポートしていないため、クエリ ビルダーの返却フィールドの変更を無効にする必要があります。その結果、グリッドをインスタンス化するときに、すべての列が利用可能であると想定されます。
- 問題や不一致が発生した場合は、**ページを更新してください (F5)**。

### 横断的な機能のサポート

- **リピーターのサポート:** 使用できません。
- **コピー/貼り付け:**
  - 同じビュー内: **使用できます**。
  - 異なるビュー間: リンクされたクエリ変数を取得する必要がありますか?
- **バインド可能なプロパティ:** 変数バインディングをサポートするのは **「Query」 プロパティ**のみです。

### サーバー側の大文字と小文字の区別

- 独自のデータ サーバーを実装する場合は、**大文字と小文字を区別するフィールド名**を構成しないことを検討してください。

## その他のリソース

<div class="divider--half"></div>

- [API プロジェクト向けの Query Builder のサポート](api-project-query-builder-support.md)
- [App Builder コンポーネント](../indigo-design-app-builder-components.md)
- [App Builder インターフェイスの概要](../interface-overview.md)
- [フォーム ビルダー](form-builder.md)
- [グリッド リモート ページング](grid-remote-paging.md)
- [CRUD 操作](crud-operations.md)
- [リモート データ操作](remote-data-operations.md)
- [Flex レイアウト](../flex-layouts/flex-layouts.md)
- [Desktop アプリの実行方法](../running-desktop-app.md)
