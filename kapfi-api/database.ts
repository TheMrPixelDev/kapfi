import { Database, SQLite3Connector } from 'https://deno.land/x/denodb/mod.ts';

const connector = new SQLite3Connector({
  filepath: './database.sqlite',
});

const db = new Database(connector);