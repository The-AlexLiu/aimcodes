import fs from 'node:fs/promises';

const host = 'aimcodes.com';
const origin = `https://${host}`;
const keyFiles = (await fs.readdir('public'))
  .filter((name) => /^[a-f0-9]{32}\.txt$/i.test(name));

if (keyFiles.length !== 1) {
  throw new Error(`Expected exactly one IndexNow key file, found ${keyFiles.length}`);
}

const keyFile = keyFiles[0];
const key = (await fs.readFile(`public/${keyFile}`, 'utf8')).trim();
if (!/^[a-f0-9]{32}$/i.test(key) || `${key}.txt`.toLowerCase() !== keyFile.toLowerCase()) {
  throw new Error('IndexNow key file name and content do not match');
}

const input = process.env.INDEXNOW_URLS?.split(/\s+/).filter(Boolean) ?? [];
const urls = [...new Set([
  `${origin}/`,
  `${origin}/sitemap.xml`,
  ...input.filter((url) => url.startsWith(`${origin}/`)),
])].slice(0, 10_000);

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host,
    key,
    keyLocation: `${origin}/${keyFile}`,
    urlList: urls,
  }),
});

if (!response.ok) {
  throw new Error(`IndexNow rejected submission with HTTP ${response.status}`);
}

console.log(`IndexNow accepted ${urls.length} URL notifications (HTTP ${response.status})`);
