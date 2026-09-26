import { Client } from 'pg';

async function testPooler() {
  const connectionStrings = [
    'postgresql://postgres.lpnfwludlkygysxtohkw:TanushMarketplace@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?sslmode=require',
    'postgresql://postgres.lpnfwludlkygysxtohkw:TanushMarketplace@aws-0-ap-south-1.pooler.supabase.com:5432/postgres?sslmode=require',
    'postgresql://postgres.lpnfwludlkygysxtohkw:TanushMarketplace@aws-0-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require',
    'postgresql://postgres.lpnfwludlkygysxtohkw:TanushMarketplace@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require',
  ];

  for (const str of connectionStrings) {
    console.log('Trying:', str.split('@')[1]);
    const client = new Client({ connectionString: str, ssl: { rejectUnauthorized: false } });
    try {
      await client.connect();
      console.log('✅ Connected successfully to pooler!');
      
      const res = await client.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
          AND table_type = 'BASE TABLE';
      `);
      console.log(`Found ${res.rows.length} tables:`, res.rows.map(r => r.table_name));

      console.log('Enabling RLS on all tables...');
      for (const row of res.rows) {
        await client.query(`ALTER TABLE public."${row.table_name}" ENABLE ROW LEVEL SECURITY;`);
        await client.query(`DROP POLICY IF EXISTS "Allow service role full access" ON public."${row.table_name}";`);
        await client.query(`
          CREATE POLICY "Allow service role full access" 
          ON public."${row.table_name}" 
          FOR ALL 
          TO service_role 
          USING (true) 
          WITH CHECK (true);
        `);
        console.log(`✅ RLS enabled for ${row.table_name}`);
      }
      await client.end();
      return;
    } catch (e: any) {
      console.log('❌ Failed:', e.message);
      await client.end().catch(() => {});
    }
  }
}

testPooler();
