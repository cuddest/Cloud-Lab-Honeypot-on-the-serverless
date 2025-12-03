# Cloud-Lab-Honeypot-on-the-serverless
Cloud Lab for Practical work class of cloud class, runs using vercel serverless functions.
Honeypot Demo on Vercel

This is a honeypot application built with Node.js + Vercel serverless functions.
It exposes fake sensitive endpoints (/api/login, /api/admin, /api/internal) and logs every request safely.

This setup does not require server.js and runs entirely in Vercel’s serverless environment.

**Features:**

Fake endpoints simulating login, admin, and internal APIs

Logs attacker hits to Vercel logs

Optional web-based dashboard for viewing logs

Runs on Vercel as serverless functions — no local server needed

**Project Structure:**

honeypot-vercel/
│
├─ api/
│   ├─ login.js      
│   ├─ admin.js     
│   ├─ internal.js   
│   └─ logs.js  
│   └─ utils.js
│
├─ dashboard/
│   └─ index.html     
│
└─ package.json


Each file in api/ is a serverless function.

utils.js contains the logging helper (writes to file if you want local testing or console logs).

**Hosting on Vercel:**

1. Create a GitHub Repository

Go to https://github.com/new

Name it honeypot-vercel

Leave it empty (no README or license)

2. Push your code
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main

3. Deploy on Vercel

Go to https://vercel.com/new

Select Import GitHub Repository → choose your repo

For Root Directory, leave as ./

Project type: Other

Click Deploy

Vercel will automatically deploy each api/*.js file as a serverless function.

**Accessing Endpoints:**

After deployment, you’ll get a URL like:

https://your-project.vercel.app


**Endpoints:**

POST /api/login → Fake login

GET /api/admin → Fake admin panel

GET /api/internal → Fake internal API

GET /api/logs → Optional dashboard to see hits

**Example:**

curl -X POST -H "Content-Type: application/json" \
     -d '{"username":"admin","password":"123"}' \
     https://your-project.vercel.app/api/login

**Logging**

Serverless functions log automatically in Vercel

Optionally, you can use _utils.js to save logs to a file or database (for persistent storage, like Supabase or Firebase)

**Concept:**

This app pretends to be a real backend with sensitive endpoints:

Attackers may attempt brute-force login

Probe admin panel

Access internal endpoints

Instead of giving access, the app logs activity safely.

**Notes**

Serverless functions cannot run a persistent local server like Express

Dashboard viewing requires fetching logs from persistent storage or just using Vercel logs

Safe for presentations, demos, and learning
