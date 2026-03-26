const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// 强制使用 IPv4
require('dns').setDefaultResultOrder('ipv4first');

async function executeSchema() {
  const client = new Client({
    host: 'db.mmemlpipjhanjeyuapvb.supabase.co',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: '1IHnCQGEbxURZK8D',
    ssl: { rejectUnauthorized: false },
  });

  try {
    console.log('🔌 连接数据库...');
    await client.connect();
    console.log('✅ 连接成功');

    console.log('📄 读取 SQL Schema 文件...');
    const sqlPath = path.join(__dirname, 'supabase-schema.sql');
    const sql = fs.readFileSync(sqlPath, 'utf-8');
    console.log(`✅ 读取成功，SQL 长度：${sql.length} 字符`);

    console.log('⚙️  执行 SQL...');
    await client.query(sql);
    console.log('✅ SQL 执行成功！');

    console.log('\n📊 验证表创建...');
    const result = await client.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);
    
    console.log('\n✅ 已创建的表：');
    result.rows.forEach(row => {
      console.log(`  - ${row.table_name}`);
    });

    console.log('\n🎉 数据库配置完成！');
  } catch (error) {
    console.error('❌ 错误:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

executeSchema();
