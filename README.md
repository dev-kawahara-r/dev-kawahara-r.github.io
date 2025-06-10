# Claude Code Actions Blog

![Deploy Status](https://github.com/dev-kawahara-r/dev-kawahara-r.github.io/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)

Claude Code Actionsに関する情報を発信するブログメディアサイトです。

## 🌐 サイトURL

https://dev-kawahara-r.github.io

## 📝 概要

このサイトでは、Claude Code Actionsの活用方法、カスタムアクションの開発手法、ベストプラクティスなどを詳しく解説しています。

### 主なコンテンツ

- **基本的な使い方**: Claude Code Actionsの概要と基本操作
- **カスタムアクション開発**: 独自アクションの作成方法
- **ベストプラクティス**: 効率的な活用法とトラブルシューティング

## 🚀 技術スタック

- **HTML5**: セマンティックなマークアップ
- **CSS3**: レスポンシブデザイン、モダンなスタイリング
- **GitHub Pages**: 静的サイトホスティング
- **GitHub Actions**: 自動デプロイメント

## 📁 プロジェクト構造

```
dev-kawahara-r.github.io/
├── index.html              # メインページ
├── styles.css             # メインスタイルシート
├── post.css              # 記事ページ用スタイル
├── posts/                # ブログ記事
│   ├── introduction-to-claude-code-actions.html
│   ├── custom-actions-development.html
│   └── actions-best-practices.html
├── .github/workflows/    # GitHub Actions設定
│   └── deploy.yml
└── README.md
```

## 🔧 開発・デプロイ

### ローカル開発

1. リポジトリのクローン
```bash
git clone https://github.com/dev-kawahara-r/dev-kawahara-r.github.io.git
cd dev-kawahara-r.github.io
```

2. ローカルサーバーの起動（例：Python）
```bash
python -m http.server 8080
```

3. ブラウザで http://localhost:8080 にアクセス

### 自動デプロイ

- `master`ブランチへのプッシュで自動的にGitHub Pagesにデプロイされます
- GitHub Actionsがビルドとデプロイを自動実行
- デプロイ状況はActionsタブで確認可能

## 📋 今後の予定

- [x] 基本的なブログ構造の実装
- [x] GitHub Pages対応
- [x] レスポンシブデザイン
- [ ] SEO最適化（meta tags, structured data）
- [ ] RSSフィード対応
- [ ] サイトマップ生成
- [ ] 検索機能の追加
- [ ] コメント機能の実装
- [ ] 記事のタグ・カテゴリ機能
- [ ] 記事の公開日時管理
- [ ] アクセス解析の導入

## 🤝 コントリビューション

記事の執筆や改善提案は、以下の方法で受け付けています：

1. **Issues**: バグ報告や機能要望
2. **Pull Requests**: コードの改善や新記事の追加

### 記事執筆ガイドライン

1. `posts/`ディレクトリに新しいHTMLファイルを作成
2. 既存記事のテンプレートに従った構造で作成
3. `index.html`の記事一覧に追加
4. 適切なメタ情報（公開日、概要）を設定

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 📞 お問い合わせ

- GitHub Issues: [Issues](https://github.com/dev-kawahara-r/dev-kawahara-r.github.io/issues)
- Repository: [dev-kawahara-r/dev-kawahara-r.github.io](https://github.com/dev-kawahara-r/dev-kawahara-r.github.io)

---

© 2025 Claude Code Actions Blog. All rights reserved.