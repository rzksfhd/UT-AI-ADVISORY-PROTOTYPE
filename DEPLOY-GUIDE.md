# 🚀 Panduan Deploy ke GitHub Pages

## Overview
Prototype AI Advisory Pajak UT sudah siap deploy ke GitHub Pages secara GRATIS!

## 📦 Struktur Project

```
UT-AI-ADVISORY-PROTOTYPE/
├── 📁 app/                     # Next.js App Router
│   ├── page.tsx               # Main application (AI Chat + Features)
│   ├── layout.tsx             # Root layout
│   └── globals.css            # Tailwind styles
├── 📁 .github/workflows/       # CI/CD GitHub Actions
│   └── deploy.yml             # Auto-deploy ke GitHub Pages
├── next.config.js             # Config static export
├── tailwind.config.js         # Tailwind setup
├── tsconfig.json              # TypeScript config
├── package.json               # Dependencies
├── README.md                  # Dokumentasi lengkap
└── LICENSE                    # MIT License
```

## 🚀 Langkah Deploy (5 Menit)

### 1. Buat Repository GitHub

```bash
# Login ke GitHub dan buat repo baru:
# https://github.com/new

# Nama repo: UT-AI-ADVISORY-PROTOTYPE
# Visibility: Public ✓
# Add README: No (sudah ada)
```

### 2. Clone dan Upload Files

```bash
# Clone repo GitHub (kosong)
git clone https://github.com/rzksfhd/UT-AI-ADVISORY-PROTOTYPE.git
cd UT-AI-ADVISORY-PROTOTYPE

# Copy semua file dari zip yang sudah di-download
# Atau unzip file: UT-AI-ADVISORY-PROTOTYPE.zip

# Push ke GitHub
git add .
git commit -m "Initial commit: AI Advisory Prototype"
git push origin main
```

### 3. Enable GitHub Pages

1. **Buka repository di GitHub**
   - https://github.com/rzksfhd/UT-AI-ADVISORY-PROTOTYPE

2. **Settings → Pages**
   - Source: **GitHub Actions**
   - Klik "Save"

3. **Tunggu 2-3 menit**
   - GitHub Actions akan otomatis build dan deploy
   - Cek tab "Actions" untuk status

### 4. Akses Live Demo

```
https://rzksfhd.github.io/UT-AI-ADVISORY-PROTOTYPE/
```

---

## ✨ Fitur yang Sudah Berfungsi

### 💬 AI Chat Assistant
- Tanya jawab interaktif
- Mock AI responses (simulasi)
- Natural language Bahasa Indonesia
- Quick questions button
- Typing animation

### 🧮 Kalkulator Pajak
- PPh 21 Final (Honor penelitian) - 5%
- PPh 23 (Jasa konsultan) - 2%
- PPh 4(2) Final (DP/Angsuran) - 2.5%
- Perhitungan otomatis real-time

### 📄 Generate Dokumen
- Form input data
- Preview bukti pemotongan
- Format standar DJP
- Download/Print ready

### 📚 Basis Pengetahuan
- 6 regulasi terkini
- Kategori pajak
- Deskripsi singkat
- Link ke dokumen lengkap

---

## 🎯 Demo Questions yang Bisa Dicoba

Ketik di chat:
- `"Berapa PPh 21 honor Rp 10 juta?"`
- `"PPh 23 untuk jasa konsultan"`
- `"PPN untuk kegiatan penelitian"`
- `"Generate bukti potong"`
- `"help"` untuk panduan

---

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Development server (localhost:3000)
npm run dev

# Build for production
npm run build

# Export static files
npm run export
```

---

## 📁 File Download

**Prototype ZIP:** [Download dari R2](https://pub-5eb7e3c34157b7d9330be03c225d173a.r2.dev/advisory/UT-AI-ADVISORY-PROTOTYPE.zip)

Atau download dari folder lokal:
```
/home/ubuntu/UT-AI-ADVISORY-PROTOTYPE.zip
```

---

## 🎨 Tech Stack

| Komponen | Teknologi | Keterangan |
|----------|-----------|------------|
| Framework | Next.js 14 | React framework |
| Language | TypeScript | Type-safe code |
| Styling | Tailwind CSS | Utility-first CSS |
| Icons | Lucide React | Modern icon set |
| Deploy | GitHub Pages | Free hosting |
| CI/CD | GitHub Actions | Auto-deploy |

---

## 📊 Performance

- ✅ **Static Export** - No server required
- ✅ **Lightweight** - < 50 KB bundle
- ✅ **Fast Loading** - CDN via GitHub Pages
- ✅ **Mobile Responsive** - Works on all devices
- ✅ **SEO Ready** - Meta tags configured

---

## 🔮 Next Steps (Phase 2)

Setelah prototype ini live:

1. **Integrasi AI Real** - Connect ke OpenAI/Claude API
2. **Backend FastAPI** - Python API untuk RAG
3. **Database** - PostgreSQL untuk log/history
4. **Auth System** - Login SSO Universitas
5. **Production Deploy** - Vercel/Railway/Render

---

## 🐛 Troubleshooting

### Build Failed?
```bash
rm -rf node_modules dist .next
npm install
npm run build
```

### Pages Not Found?
- Cek Settings → Pages → Source: GitHub Actions
- Tunggu 2-3 menit setelah push
- Cek tab Actions untuk error log

### Styling Broken?
- Pastikan `basePath` di `next.config.js` sesuai nama repo
- Clear browser cache (Ctrl+Shift+R)

---

## 📞 Support

Jika ada kendala deploy, hubungi:
- Ketua Peneliti: Rizki Shafaruddin Ahmad
- GitHub: @rzksfhd

---

**🎉 Selamat! Prototype siap di-demo ke LPPM UT!**
