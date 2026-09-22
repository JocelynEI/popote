/**
 * Construit l'aperçu web de Popote pour GitHub Pages (dossier dist/).
 *
 *   EXPO_BASE_URL=/popote node scripts/build-pages.mjs
 *
 * - export web d'Expo ;
 * - ajoute coi-serviceworker (GitHub Pages ne permet pas d'envoyer les en-têtes COOP/COEP
 *   dont la base locale SQLite a besoin dans le navigateur) ;
 * - .nojekyll (sinon GitHub ignore le dossier « _expo ») et 404.html (navigation directe vers une page) ;
 * - allonge le délai des appels synchrones de SQLite web (le premier accès peut être lent).
 * N'a AUCUN effet sur l'appli iOS / Android.
 */
import { execSync } from 'node:child_process';
import { copyFileSync, existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const base = (process.env.EXPO_BASE_URL || '').replace(/\/$/, '');
const out = 'dist';
if (existsSync(out)) rmSync(out, { recursive: true });

console.log(`▶ Export web (baseUrl = "${base || '/'}")…`);
execSync(`npx expo export --platform web --output-dir ${out}`, { stdio: 'inherit', env: { ...process.env, CI: '1' } });

// 1. service worker d'isolation cross-origin
copyFileSync('scripts/coi-serviceworker.min.js', join(out, 'coi-serviceworker.min.js'));
const indexPath = join(out, 'index.html');
let html = readFileSync(indexPath, 'utf8');
html = html.replace('<head>', `<head><script src="${base}/coi-serviceworker.min.js"></script>`);
// écran de secours (jamais de page blanche) + numéro de version affiché
const build = new Date().toISOString().slice(0, 16).replace('T', ' ');
const secours = readFileSync('scripts/secours.html', 'utf8').replace('__BUILD__', build);
html = html.replace('</body>', `${secours}</body>`);
writeFileSync(indexPath, html);
writeFileSync(join(out, '404.html'), html);
writeFileSync(join(out, '.nojekyll'), '');

// 2. délai des appels synchrones SQLite (web uniquement)
const jsDir = join(out, '_expo/static/js/web');
for (const f of readdirSync(jsDir).filter((f) => f.endsWith('.js'))) {
  const p = join(jsDir, f);
  const src = readFileSync(p, 'utf8');
  let patched = src.replace(/if\(([A-Za-z_$][\w$]*)>1e6\)throw new Error\((["'])Sync operation timeout\2\)/g, 'if($1>1e10)throw new Error("Sync operation timeout")');
  // 3. bug expo-sqlite (web) : la longueur de la réponse était écrite sur 1 seul octet
  //    (Uint8Array.set(new Uint32Array([n]))) → toute valeur > 255 octets revenait tronquée
  //    et les réglages (dont Premium) étaient perdus au rechargement. On l'écrit sur 4 octets.
  patched = patched.replace(/([A-Za-z_$][\w$]*)\.set\(new Uint32Array\(\[([A-Za-z_$][\w$]*)\]\),0\)/g, 'new Uint32Array($1.buffer,0,1)[0]=$2');
  if (patched !== src) {
    writeFileSync(p, patched);
    console.log(`✔ SQLite web : correctifs appliqués dans ${f}`);
  }
}
console.log(`✔ Aperçu prêt dans ${out}/`);
