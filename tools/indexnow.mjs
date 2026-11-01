// Envoie à IndexNow (Bing, Yandex, Seznam, Naver) toutes les adresses du plan du site.
// À lancer quand le domaine est en ligne, puis après chaque nouvelle page : npm run build && npm run indexnow
// La clé est le fichier public/<clé>.txt, servi à la racine du site : c'est lui qui prouve qu'on en est le propriétaire.
import { readdirSync, readFileSync } from 'node:fs'

const cle = readdirSync('public').find((f) => /^[0-9a-f]{32}\.txt$/.test(f))?.slice(0, -4)
if (!cle) throw new Error('Clé IndexNow introuvable dans public/')
const plan = readFileSync('.vercel/output/static/sitemap-0.xml', 'utf8')
const adresses = [...plan.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1])
const hote = new URL(adresses[0]).host

const reponse = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: hote, key: cle, keyLocation: `https://${hote}/${cle}.txt`, urlList: adresses }),
})
// 200 ou 202 : reçu. 403 : le fichier de clé n'est pas encore en ligne sur le domaine.
console.log(`IndexNow : ${reponse.status} pour ${adresses.length} adresses de ${hote}`)
