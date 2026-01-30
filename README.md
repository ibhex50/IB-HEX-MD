<h1 align="center">IB-HEX-MD</h1>

<p align="center">
    <img alt="IB-HEX-MD" src="https://i.ibb.co/39mD5w6t/file-00000000a01071f8a1dc0220979539a9.png">
</p>

<p align="center">
    🤖 Bot WhatsApp Multi-Device nouvelle génération.  
    N'oubliez pas de laisser une ⭐ pour soutenir le projet.
</p>

<p align="center">
    <a href="https://opensource.org/licenses/MIT">
        <img src="https://img.shields.io/badge/License-MIT-green.svg?style=flat-square" alt="MIT License" />
    </a>
    <a href="https://github.com/WhiskeySockets/Baileys">
        <img src="https://img.shields.io/badge/Baileys-Web%20API-orange?style=flat-square" alt="Baileys Web API" />
    </a>
    <a href="https://github.com/ibhex50/IB-HEX-MD/stargazers">
        <img src="https://img.shields.io/github/stars/ibhex50/IB-HEX-MD?style=flat-square" alt="Stars" />
    </a>
    <a href="https://github.com/ibhex50/IB-HEX-MD/network/members">
        <img src="https://img.shields.io/github/forks/ibhex50/IB-HEX-MD?style=flat-square" alt="Forks" />
    </a>
</p>

---

<details>
  <summary>🚀 Déploiement de IB-HEX-MD</summary>

### 🧬 Étape 1 : Fork du dépôt GitHub  
[![Fork GitHub](https://img.shields.io/badge/Fork%20le%20Repo-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ibhex50/IB-HEX-MD/fork)

---

### 🔐 Étape 2 : Générer une SESSION ID

📌 **Conserve ta SESSION_ID en lieu sûr.**

[![Obtenir SESSION-ID](https://img.shields.io/badge/Obtenir%20SESSION--ID-0A0A0A?style=for-the-badge&logo=key&logoColor=white)](https://ovl-web.koyeb.app/)

---

### 🚀 Étape 3 : Méthodes de déploiement

#### ⚫ Render
- Créer un compte :  
  https://dashboard.render.com/register
- Créer un nouveau service **Web Service**
- Ajouter les variables d’environnement
- Démarrer le bot

#### ⚪ Koyeb
https://app.koyeb.com/deploy?type=git&name=ib-hex-md&repository=https://github.com/ibhex50/IB-HEX-MD&branch=main

#### 🖥️ Panel
- Créer un serveur Node.js
- Ajouter `index.js` ou `main.js`
- Installer les dépendances
- Lancer le bot

</details>

---

<details>
  <summary>📝 index.js / main.js (déploiement panel)</summary>

```js
const { spawnSync, spawn } = require('child_process');
const { existsSync, writeFileSync } = require('fs');

const env_file = ``;

if (!env_file.trim()) {
  console.error("❌ Variables d'environnement manquantes.");
  process.exit(1);
}

function setup() {
  if (!existsSync('ibhex')) {
    spawnSync('git', ['clone', 'https://github.com/ibhex50/IB-HEX-MD', 'ibhex'], { stdio: 'inherit' });
  }

  if (!existsSync('ibhex/.env')) {
    writeFileSync('ibhex/.env', env_file);
  }

  spawnSync('npm', ['install'], { cwd: 'ibhex', stdio: 'inherit' });
}

function start() {
  spawn('node', ['index.js'], { cwd: 'ibhex', stdio: 'inherit' });
}

setup();
start();
