# 🔧 PANDUAN PERBAIKI GITHUB PAGES

## ❌ Masalah Teridentifikasi

GitHub Pages saat ini di-set ke mode **"Deploy from a branch"** (Jekyll), yang menyebabkan website menampilkan README daripada aplikasi Next.js.

**Tanda-tanda masalah:**
- Website menampilkan konten Jekyll/README
- Ada tulisan "Jekyll SEO tag" di HTML
- Aplikasi React/Next.js tidak berjalan

## ✅ Solusi

Ubah GitHub Pages source dari **"Deploy from a branch"** ke **"GitHub Actions"**.

---

## 📝 Langkah Perbaikan (2 menit)

### Step 1: Buka Repository Settings

1. Buka browser dan login ke GitHub
2. Akses repository: https://github.com/rzksfhd/UT-AI-ADVISORY-PROTOTYPE
3. Klik tab **"Settings"** (di sebelah kanan, ada ikon gear)

### Step 2: Navigasi ke Pages Settings

1. Di sidebar kiri, cari dan klik **"Pages"**
   - Atau langsung buka: https://github.com/rzksfhd/UT-AI-ADVISORY-PROTOTYPE/settings/pages

### Step 3: Ubah Build Source

Anda akan melihat section **"Build and deployment"**:

**Setting Saat Ini (SALAH):**
```
Source: Deploy from a branch
Branch: main
Folder: / (root)
```

**Ubah Ke (BENAR):**
```
Source: GitHub Actions
```

**Cara mengubah:**
1. Under "Source", klik dropdown yang sekarang menunjukkan "Deploy from a branch"
2. Pilih **"GitHub Actions"**
3. Klik tombol **"Save"** (warna hijau/biru)

### Step 4: Trigger Rebuild

Setelah mengubah setting:

1. Klik tab **"Actions"** di repository
2. Klik workflow **"Deploy to GitHub Pages"**
3. Klik tombol **"Run workflow"** → "Run workflow" (warna hijau)
4. Atau tunggu auto-trigger dalam 1-2 menit

### Step 5: Tunggu Deploy

1. Kembali ke tab Actions
2. Lihat workflow "Deploy to GitHub Pages" berjalan
3. Tunggu sampai ada ✅ centang hijau (2-3 menit)
4. Refresh website: https://rzksfhd.github.io/UT-AI-ADVISORY-PROTOTYPE/

---

## 🎯 Hasil yang Diharapkan

Setelah perbaikan, website akan menampilkan:

```
┌─────────────────────────────────────────┐
│  🤖 AI Advisory Pajak - UT              │
├─────────────────────────────────────────┤
│                                         │
│  [Sidebar: Chat | Kalkulator | Dokumen] │
│                                         │
│  Chat: "Halo! Saya AI Advisory..."      │
│                                         │
│  [Input: Tanyakan disini...] [Kirim]   │
│                                         │
└─────────────────────────────────────────┘
```

BUKAN lagi tampilan README/Jekyll!

---

## 📸 Screenshot Langkah

### Screenshot 1: Settings → Pages
```
GitHub Repository
├── Code
├── Issues
├── Pull requests
├── Actions
├── Projects
├── Wiki
├── Security
├── Insights
├── Settings  ← KLIK INI
│   ├── General
│   ├── Access
│   ├── Code and automation
│   ├── Security
│   └── Pages  ← LALU KLIK INI
```

### Screenshot 2: Ubah Source
```
Build and deployment
├── Source
│   ├── Deploy from a branch  ← GANTI INI
│   └── GitHub Actions        ← KE INI ✓
│
└── [Save]  ← KLIK TOMBOL INI
```

---

## 🔍 Verifikasi Perbaikan

Setelah mengubah setting dan rebuild:

1. **Cek URL:** https://rzksfhd.github.io/UT-AI-ADVISORY-PROTOTYPE/
2. **Harusnya menampilkan:** Aplikasi AI Advisory (bukan README)
3. **Test fitur:**
   - Chat: "Berapa PPh 21 honor 10 juta?"
   - Kalkulator: Hitung PPh
   - Export CSV: Generate file

4. **Inspect Element (F12):**
   - Tidak ada "Jekyll" di HTML
   - Ada div dengan id aplikasi React
   - Script Next.js ter-load

---

## 🐛 Jika Masih Bermasalah

### Masalah 1: 404 Error

**Cek:** https://github.com/rzksfhd/UT-AI-ADVISORY-PROTOTYPE/actions

Jika ada ❌ merah:
1. Klik workflow yang failed
2. Lihat error logs
3. Perbaiki sesuai error

### Masalah 2: Build Success tapi Blank Page

**Clear cache:**
```
Ctrl + Shift + R (hard refresh)
```

**Atau buka incognito:**
```
Ctrl + Shift + N (Chrome incognito)
```

### Masalah 3: CSS/JS Tidak Load

**Cek console (F12):**
- Jika ada 404 untuk file `_next/static`, maka basePath salah
- Solusi: Perbaiki `next.config.js`

---

## 📞 Butuh Bantuan?

Jika masih bermasalah setelah mengikuti panduan ini:

1. **Cek Actions Logs:** https://github.com/rzksfhd/UT-AI-ADVISORY-PROTOTYPE/actions
2. **Screenshot error** dan kirim ke tim peneliti
3. **Alternative:** Download ZIP dan deploy ke Vercel/Railway/Render

---

## ⚡ Quick Fix Alternative

Jika tidak bisa mengubah setting GitHub Pages, gunakan alternatif deploy:

### Opsi A: Deploy ke Vercel (Gratis & Mudah)

1. Buka https://vercel.com
2. Import GitHub repository
3. Framework: Next.js
4. Deploy (otomatis)

### Opsi B: Deploy ke Railway

1. Buka https://railway.app
2. New Project → Deploy from GitHub repo
3. Pilih repository
4. Deploy

### Opsi C: Local Preview

```bash
cd UT-AI-ADVISORY-PROTOTYPE
npm install
npm run dev
# Buka http://localhost:3000
```

---

## ✅ Checklist Perbaikan

- [ ] Buka https://github.com/rzksfhd/UT-AI-ADVISORY-PROTOTYPE/settings/pages
- [ ] Ubah Source ke "GitHub Actions"
- [ ] Klik Save
- [ ] Tunggu 2-3 menit
- [ ] Cek https://rzksfhd.github.io/UT-AI-ADVISORY-PROTOTYPE/
- [ ] Website menampilkan aplikasi (bukan README)
- [ ] Test fitur chat
- [ ] Test export CSV

---

**🎯 Setelah perbaikan, website akan live dan fungsional!**
