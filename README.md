# Hot Leads CRM V3 — Vercel + Neon

## Käyttöönotto (kertaluonteinen, ~10 min)

### 1. Luo Neon-tietokanta (ilmainen)
1. Mene osoitteeseen https://neon.tech ja kirjaudu sisään
2. Klikkaa **New Project** → anna nimi esim. `hot-leads-crm`
3. Valitse sijainti **EU Central (Frankfurt)**
4. Projekti luotu! Mene kohtaan **Connection Details**
5. Vaihda ylävalikosta **Prisma**
6. Kopioi `DATABASE_URL` ja `DIRECT_URL` talteen

### 2. Vie koodi GitHubiin
```bash
git init
git add .
git commit -m "Hot Leads CRM v3"
# Luo uusi repo GitHubissa ja seuraa ohjeita
git remote add origin https://github.com/SINUN-KÄYTTÄJÄNIMI/hot-leads-crm.git
git push -u origin main
```

### 3. Deployaa Verceliin
1. Mene osoitteeseen https://vercel.com ja kirjaudu sisään
2. Klikkaa **Add New → Project**
3. Valitse juuri luomasi GitHub-repo
4. Avaa **Environment Variables** ja lisää:
   - `DATABASE_URL` → Neonista kopioimasi DATABASE_URL
   - `DIRECT_URL` → Neonista kopioimasi DIRECT_URL
5. Klikkaa **Deploy** → odota ~1 minuutti
6. Vercel antaa sinulle linkin, esim. `https://hot-leads-crm.vercel.app`

### 4. Alusta tietokanta
Avaa Vercelin projekti → **Settings → Functions** TAI käytä Vercel CLI:
```bash
npx vercel env pull .env.local   # hakee env-muuttujat
npm run db:push                   # luo taulut Neoniin
npm run seed                      # lisää esimerkkidatan
```

Tai aja suoraan paikallisesti kun .env.local on täytetty:
```bash
npm install
npx prisma generate
npm run db:push
npm run seed
npm run dev   # testaa osoitteessa http://localhost:3000
```

## Päivittäminen
Jokainen `git push` deployaa automaattisesti Verceliin.

## Kustannukset
- **Vercel**: ilmainen (Hobby-plan riittää)
- **Neon**: ilmainen (0.5 GB, riittää tähän käyttöön)
