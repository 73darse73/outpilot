#!/bin/bash

# 技術タグ付きコミットスクリプト
# 使用方法: ./scripts/commit-with-tech.sh "コミットメッセージ"

# 色付きの出力
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# メッセージを引数から取得
COMMIT_MESSAGE="$1"

if [ -z "$COMMIT_MESSAGE" ]; then
    echo -e "${RED}エラー: コミットメッセージを指定してください${NC}"
    echo "使用方法: $0 \"コミットメッセージ\""
    echo "例: $0 \"feat: 新機能追加\""
    exit 1
fi

echo -e "${BLUE}🔍 技術タグを自動検出中...${NC}"

# 技術検出スクリプトを実行
TECH_TAGS=$(node scripts/auto-tech-detector.js)

if [ $? -eq 0 ] && [ ! -z "$TECH_TAGS" ]; then
    echo -e "${GREEN}✅ 検出された技術: $TECH_TAGS${NC}"
    
    # ユーザーに確認
    echo -e "${YELLOW}この技術タグでコミットしますか？ (y/n)${NC}"
    read -r response
    
    if [[ "$response" =~ ^[Yy]$ ]]; then
        # 技術タグ付きでコミット
        FINAL_MESSAGE="$COMMIT_MESSAGE

$TECH_TAGS"
        git commit -m "$FINAL_MESSAGE"
        echo -e "${GREEN}✅ コミット完了: $FINAL_MESSAGE${NC}"
    else
        echo -e "${YELLOW}手動で技術タグを追加してください${NC}"
        echo "例: git commit -m \"$COMMIT_MESSAGE [react] [typescript]\""
    fi
else
    echo -e "${YELLOW}⚠️  技術タグは検出されませんでした${NC}"
    echo -e "${BLUE}手動で技術タグを追加する場合は:${NC}"
    echo "git commit -m \"$COMMIT_MESSAGE [技術名]\""
fi 