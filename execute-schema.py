#!/usr/bin/env python3
import psycopg2
import sys

try:
    print('🔌 连接数据库...')
    conn = psycopg2.connect(
        host='db.mmemlpipjhanjeyuapvb.supabase.co',
        port=5432,
        database='postgres',
        user='postgres',
        password='1IHnCQGEbxURZK8D',
        sslmode='require'
    )
    print('✅ 连接成功')
    
    cursor = conn.cursor()
    
    print('📄 读取 SQL Schema 文件...')
    with open('/home/admin/.openclaw/workspace/adopt-app/supabase-schema.sql', 'r') as f:
        sql = f.read()
    print(f'✅ 读取成功，SQL 长度：{len(sql)} 字符')
    
    print('⚙️  执行 SQL...')
    cursor.execute(sql)
    conn.commit()
    print('✅ SQL 执行成功！')
    
    print('\n📊 验证表创建...')
    cursor.execute("""
        SELECT table_name FROM information_schema.tables 
        WHERE table_schema = 'public' 
        ORDER BY table_name;
    """)
    
    print('\n✅ 已创建的表：')
    for row in cursor.fetchall():
        print(f'  - {row[0]}')
    
    cursor.close()
    conn.close()
    
    print('\n🎉 数据库配置完成！')
    
except Exception as e:
    print(f'❌ 错误：{e}')
    sys.exit(1)
