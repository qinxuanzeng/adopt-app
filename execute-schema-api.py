#!/usr/bin/env python3
import requests
import sys

SUPABASE_URL = "https://mmemlpipjhanjeyuapvb.supabase.co"
SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tZW1scGlwamhhbmpleXVhcHZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDUxNDQ4NywiZXhwIjoyMDkwMDkwNDg3fQ.Xc7CX-b4OqfjNHRlIP0XpYXChTSl4c-3Rra7DJ2iBr0"

headers = {
    "apikey": SERVICE_ROLE_KEY,
    "Authorization": f"Bearer {SERVICE_ROLE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=representation"
}

try:
    print('📄 读取 SQL Schema 文件...')
    with open('/home/admin/.openclaw/workspace/adopt-app/supabase-schema.sql', 'r') as f:
        sql = f.read()
    print(f'✅ 读取成功，SQL 长度：{len(sql)} 字符')
    
    print('🔌 连接 Supabase...')
    
    # 使用 REST API 执行 SQL
    # 分割 SQL 语句，逐条执行
    statements = [stmt.strip() for stmt in sql.split(';') if stmt.strip() and not stmt.strip().startswith('--')]
    
    print(f'⚙️  执行 {len(statements)} 条 SQL 语句...')
    
    for i, stmt in enumerate(statements, 1):
        if len(stmt) < 10:  # 跳过太短的语句
            continue
            
        print(f'  [{i}/{len(statements)}] 执行中...')
        
        response = requests.post(
            f"{SUPABASE_URL}/rest/v1/",
            headers=headers,
            json={"query": stmt}
        )
        
        if response.status_code not in [200, 201, 204]:
            print(f'  ⚠️  警告：{response.status_code} - {response.text[:100]}')
    
    print('✅ SQL 执行完成！')
    
    # 验证表创建
    print('\n📊 验证表创建...')
    response = requests.get(
        f"{SUPABASE_URL}/rest/v1/information_schema.tables?select=table_name&table_schema=eq.public",
        headers=headers
    )
    
    if response.status_code == 200:
        tables = response.json()
        print('\n✅ 已创建的表：')
        for table in sorted(set([t['table_name'] for t in tables])):
            if not table.startswith('pg_') and table != 'information_schema':
                print(f'  - {table}')
    else:
        print(f'⚠️  验证失败：{response.status_code}')
    
    print('\n🎉 数据库配置完成！')
    
except Exception as e:
    print(f'❌ 错误：{e}')
    sys.exit(1)
