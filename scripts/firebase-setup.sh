#!/usr/bin/env bash
# Creates a dedicated GigLink Firebase project and writes .env
set -euo pipefail

PROJECT_ID="${1:-giglink-1db7c}"
APP_NAME="${2:-giglink-web}"

echo "→ Log in to Firebase (browser will open)"
npx firebase login

echo "→ Creating project: $PROJECT_ID"
if ! npx firebase projects:create "$PROJECT_ID" --display-name "GigLink" 2>/dev/null; then
  echo "  (Project may already exist — continuing)"
fi

echo "→ Enabling web apps API / creating web app: $APP_NAME"
RAW=$(npx firebase apps:create WEB "$APP_NAME" --project "$PROJECT_ID" --json 2>/dev/null || true)
APP_ID=$(echo "$RAW" | node -e "
let d=''; process.stdin.on('data',c=>d+=c); process.stdin.on('end',()=>{
  try {
    const j=JSON.parse(d);
    console.log(j.result?.appId || j.appId || '');
  } catch { console.log(''); }
});
")

if [ -z "$APP_ID" ]; then
  echo "→ Listing existing web apps"
  APP_ID=$(npx firebase apps:list WEB --project "$PROJECT_ID" --json | node -e "
    let d=''; process.stdin.on('data',c=>d+=c); process.stdin.on('end',()=>{
      const j=JSON.parse(d);
      const apps=j.result||j||[];
      const app=apps.find(a=>a.displayName==='$APP_NAME')||apps[0];
      console.log(app?.appId||'');
    });
  ")
fi

if [ -z "$APP_ID" ]; then
  echo "Could not resolve app ID. Create a web app manually in Firebase Console."
  exit 1
fi

echo "→ Fetching SDK config for app $APP_ID"
npx firebase apps:sdkconfig WEB "$APP_ID" --project "$PROJECT_ID" --json > /tmp/giglink-sdk.json

node <<'NODE'
const fs = require('fs')
const raw = JSON.parse(fs.readFileSync('/tmp/giglink-sdk.json', 'utf8'))
const c = raw.result?.sdkConfig || raw.sdkConfig || raw
if (!c.apiKey) {
  console.error('SDK config missing. Check /tmp/giglink-sdk.json')
  process.exit(1)
}
const env = `# GigLink — dedicated Firebase project (generated)
VITE_FIREBASE_API_KEY=${c.apiKey}
VITE_FIREBASE_AUTH_DOMAIN=${c.authDomain}
VITE_FIREBASE_PROJECT_ID=${c.projectId}
VITE_FIREBASE_STORAGE_BUCKET=${c.storageBucket}
VITE_FIREBASE_MESSAGING_SENDER_ID=${c.messagingSenderId}
VITE_FIREBASE_APP_ID=${c.appId}

VITE_API_URL=/api
`
fs.writeFileSync('.env', env)
console.log('Wrote .env for project:', c.projectId)
NODE

echo ""
echo "Enable sign-in providers:"
echo "  https://console.firebase.google.com/project/$PROJECT_ID/authentication/providers"
echo "  • Google → Enable"
echo "  • GitHub → Enable (+ OAuth app at github.com/settings/developers)"
echo ""
echo "Then restart: npm run dev"
