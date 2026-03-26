#!/bin/bash

# 🚀 认养 App 一键部署脚本
# 使用方法：./deploy.sh

set -e

echo "🐉 认养 App 部署脚本"
echo "===================="
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查 Git 配置
echo "📋 检查 Git 配置..."
if ! git config user.name > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  未配置 Git 用户名${NC}"
    read -p "请输入 Git 用户名：" git_name
    git config --global user.name "$git_name"
fi

if ! git config user.email > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  未配置 Git 邮箱${NC}"
    read -p "请输入 Git 邮箱：" git_email
    git config --global user.email "$git_email"
fi

echo -e "${GREEN}✓ Git 配置完成${NC}"
echo ""

# 检查 GitHub CLI
if command -v gh &> /dev/null; then
    echo "📦 检测到 GitHub CLI"
    
    # 检查是否已登录
    if gh auth status &> /dev/null; then
        echo -e "${GREEN}✓ GitHub 已登录${NC}"
    else
        echo -e "${YELLOW}⚠️  GitHub 未登录${NC}"
        echo "正在引导登录..."
        gh auth login
    fi
    
    # 创建仓库
    echo ""
    echo "🏗️  创建 GitHub 仓库..."
    read -p "请输入仓库名称 (默认: adopt-app): " repo_name
    repo_name=${repo_name:-adopt-app}
    
    read -p "仓库可见性？(public/private, 默认: private): " visibility
    visibility=${visibility:-private}
    
    # 检查仓库是否已存在
    if gh repo view "$repo_name" &> /dev/null; then
        echo -e "${YELLOW}⚠️  仓库已存在，跳过创建${NC}"
    else
        gh repo create "$repo_name" --$visibility --source=. --remote=origin --push
        echo -e "${GREEN}✓ 仓库创建成功${NC}"
    fi
    
else
    echo -e "${YELLOW}⚠️  未检测到 GitHub CLI，使用手动方式${NC}"
    echo ""
    echo "请按照以下步骤操作："
    echo "1. 访问 https://github.com/new"
    echo "2. 创建新仓库，名称：adopt-app"
    echo "3. 选择 $visibility 可见性"
    echo "4. 不要初始化 README/.gitignore/license"
    echo "5. 创建完成后，复制仓库 URL"
    echo ""
    read -p "请输入仓库 URL (例如：https://github.com/username/adopt-app.git): " repo_url
    
    if [ -n "$repo_url" ]; then
        git remote add origin "$repo_url"
        echo -e "${GREEN}✓ 远程仓库已添加${NC}"
    fi
fi

echo ""
echo "📤 推送代码到 GitHub..."
git add -A
git commit -m "feat: 认养 App 初始版本 - 8 个页面完成" || echo "没有新更改"
git push -u origin master

echo ""
echo -e "${GREEN}✅ GitHub 推送完成！${NC}"
echo ""

# Vercel 部署
echo "🚀 部署到 Vercel..."
read -p "是否使用 Vercel CLI 部署？(y/n, 默认: n): " use_vercel
use_vercel=${use_vercel:-n}

if [ "$use_vercel" = "y" ]; then
    if command -v vercel &> /dev/null; then
        echo -e "${GREEN}✓ Vercel CLI 已安装${NC}"
        vercel --prod
    else
        echo -e "${YELLOW}⚠️  Vercel CLI 未安装${NC}"
        echo "正在安装..."
        npm i -g vercel
        
        echo "登录 Vercel..."
        vercel login
        
        echo "部署中..."
        vercel --prod
    fi
else
    echo ""
    echo "📋 手动部署到 Vercel："
    echo "1. 访问 https://vercel.com/new"
    echo "2. 点击 'Import Git Repository'"
    echo "3. 选择刚才创建的 adopt-app 仓库"
    echo "4. 配置环境变量（见下方）"
    echo "5. 点击 'Deploy'"
fi

echo ""
echo "🔐 环境变量配置："
echo "================"
echo "在 Vercel 项目设置中添加以下环境变量："
echo ""
echo "NEXT_PUBLIC_SUPABASE_URL       = https://your-project.supabase.co"
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY  = eyJhbG..."
echo "GOOGLE_AI_API_KEY              = AIzaSy..."
echo ""
echo "获取方式："
echo "- Supabase: https://supabase.com → 项目 → Settings → API"
echo "- Gemini: https://aistudio.google.com/app/apikey"
echo ""

echo -e "${GREEN}🎉 部署完成！${NC}"
echo ""
echo "📚 详细文档：DEPLOY.md"
echo "🐛 问题反馈：查看 DEPLOY.md 常见问题部分"
echo ""
