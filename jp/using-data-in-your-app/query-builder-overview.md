# Query Builder の概要

App Builder の **Query Builder** を使用すると、コードを書かずにデータ クエリを視覚的に定義および管理できます。アプリケーションに接続されたデータのフィルター、グループ化、ソートを簡単に行う方法を提供します。

## 実行できること

Query Builder を使用すると次が可能です:

- **データ ソース**に接続し、視覚的にクエリを構築
- **フィルター処理**: 「equals」、「contains」、「greater than」 などの演算子を使ってフィールド値を条件設定
- **複数条件の組み合わせ**: AND/OR の論理グループ
- **クエリ結果のプレビュー**で結果を確認
- クエリを UI コンポーネントに**バインド**: グリッド、リスト、またはチャートなど

<img class="box-shadow" src="../images/using-data-in-your-app/Query Builder/6.png" />
<p style="text-align:center;">クエリ実行テストを表示</p>

## 重要性

App Builder の Query Builder により、手動でクエリ構文を書く必要がなくなります。データ スキーマを反映した構造化されたドラッグ アンド ドロップ UI を使うことで、開発者とデザイナーがビューに必要なデータ セットを迅速かつ正確に調整できます。

## 典型的なユース ケース

一般的なユース ケースは、カテゴリと価格帯に基づいて製品をフィルターする場面です。

例として、すべての Products から、選択された Category (すべてのカテゴリを表示する Select コンポーネントから選択) に属し、さらに 2 つの数値入力フィールドで指定された単価範囲に一致するものだけを取得するクエリを構築できます。

対応する SQL 表現は次のようになります:

```sql
SELECT * FROM products 
WHERE categoryId IN (
  SELECT categoryId
  FROM categories
  WHERE categoryId = {{SelectedCategory}} 
) 
AND productId IN (
  SELECT productId
  FROM orderDetails
  WHERE unitPrice >= {{UPFrom}}
  AND unitPrice <= {{UPTo}} 
)
```

App Builder では、SelectedCategory、UPFrom、UPTo の入力を動的フィルターとして接続することで、このロジックを視覚的に作成できます。ユーザーがこれらのコンポーネントを操作すると、Query Builder がデータ表示をリアルタイムで更新し、現在の選択条件に一致する製品のみが表示されます。


## その他のリソース

<div class="divider--half"></div>

- [Query Builder のステップ バイス テップ ガイド](query-builder-step-by-step-guide.md)
- [API プロジェクト向けの Query Builder のサポート](api-project-query-builder-support.md)
- [App Builder コンポーネント](../indigo-design-app-builder-components.md)
- [App Builder インターフェイスの概要](../interface-overview.md)
- [Form Builder](form-builder.md)
- [グリッド リモート ページング](grid-remote-paging.md)
- [CRUD 操作](crud-operations.md)
- [リモート データ操作](remote-data-operations.md)
