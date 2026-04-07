# 🚀 PANDUAN DEPLOY LENGKAP

## ⚡ OPSI 1: Deploy Otomatis (Rekomendasi)

### Step 1: Dapatkan GitHub Token

1. Buka https://github.com/settings/tokens
2. Klik **"Generate new token (classic)"**
3. Beri nama: `Deploy AI Advisory`
4. Centang scope:
   - ✅ `repo` (Full control)
   - ✅ `workflow` (Update GitHub Action workflows)
5. Klik **Generate token**
6. **COPY TOKEN** (hanya muncul sekali!)

### Step 2: Jalankan Deploy Script

```bash
# Masuk ke folder project
cd /home/ubuntu/UT-AI-ADVISORY-PROTOTYPE

# Jalankan script dengan token Anda
./deploy-to-github.sh rzksfhd ghp_xxxxxxxxxxxx
```

**Ganti:**
- `rzksfhd` → Username GitHub Anda
- `ghp_xxxxxxxxxxxx` → Token yang baru dibuat

### Step 3: Tunggu Deploy
- Script akan:
  1. ✅ Buat repository GitHub
  2. ✅ Push semua file
  3. ✅ Enable GitHub Pages
  4. ✅ Trigger GitHub Actions

- Tunggu **2-3 menit**
- Cek status di: `https://github.com/rzksfhd/UT-AI-ADVISORY-PROTOTYPE/actions`

### Step 4: Akses Live Demo

```
🌐 https://rzksfhd.github.io/UT-AI-ADVISORY-PROTOTYPE/
```

---

## 🔧 OPSI 2: Deploy Manual via Browser

Jika tidak ingin menggunakan token, ikuti langkah manual:

### Step 1: Buat Repository di GitHub

1. Buka https://github.com/new
2. **Repository name:** `UT-AI-ADVISORY-PROTOTYPE`
3. **Description:** `AI Advisory Pajak untuk Universitas Terbuka`
4. **Visibility:** Public ✅
5. **Add README:** ❌ Jangan centang (sudah ada)
6. Klik **Create repository**

### Step 2: Push dari Local

```bash
cd /home/ubuntu/UT-AI-ADVISORY-PROTOTYPE

# Add remote
git remote add origin https://github.com/rzksfhd/UT-AI-ADVISORY-PROTOTYPE.git

# Push
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Buka repository di browser
2. Klik **Settings** (tab di atas)
3. Di sidebar kiri, klik **Pages**
4. **Source:** Pilih **"GitHub Actions"**
5. Klik **Save**

### Step 4: Tunggu Build

1. Klik tab **Actions** di repository
2. Lihat workflow **"Deploy to GitHub Pages"**
3. Tunggu status ✅ hijau (2-3 menit)
4. Demo live di: `https://rzksfhd.github.io/UT-AI-ADVISORY-PROTOTYPE/`

---

## 📦 OPSI 3: Upload ZIP Manual

### Step 1: Download File ZIP

File sudah tersedia di:
```
/home/ubuntu/UT-AI-ADVISORY-PROTOTYPE-FINAL.zip
```

Atau download dari R2:
```
https://tahutek.web.id/advisory/UT-AI-ADVISORY-PROTOTYPE-FINAL.zip
```

### Step 2: Extract & Upload

1. Extract ZIP di komputer Anda
2. Buka https://github.com/new
3. Buat repository baru (lihat Opsi 2 Step 1)
4. Klik **"Uploading an existing file"**
5. Drag & drop semua file dari folder hasil extract
6. Klik **Commit changes**

### Step 3: Enable Pages & Actions

Ikuti Step 3-4 dari **Opsi 2**

---

## ✅ VERIFIKASI DEPLOYMENT

Setelah deploy berhasil, cek:

### 1. Repository Structure
```
UT-AI-ADVISORY-PROTOTYPE/
├── app/
├── .github/workflows/
├── next.config.js
├── package.json
└── ...
```

### 2. GitHub Actions Status
- Buka tab **Actions**
- Workflow "Deploy to GitHub Pages" harus ✅ hijau

### 3. Live Website
- Buka `https://rzksfhd.github.io/UT-AI-ADVISORY-PROTOTYPE/`
- Harus muncul halaman AI Advisory Pajak

---

## 🚨 TROUBLESHOOTING

### Error: "Failed to create repository"
```bash
# Cek apakah repo sudah ada
curl -H "Authorization: token YOUR_TOKEN" \
  https://api.github.com/users/rzksfhd/repos | grep UT-AI-ADVISORY

# Jika sudah ada, hapus dulu atau ganti nama
```

### Error: "Permission denied"
- Token tidak punya scope `repo`
- Buat ulang token dengan scope lengkap

### Website 404 Not Found
- Belum selesai build (tunggu 2-3 menit)
- Cek tab Actions untuk error
- Pastikan workflow file ada di `.github/workflows/deploy.yml`

### Styling/CSS tidak berfungsi
- Cek browser console (F12)
- Pastikan `basePath` di `next.config.js` sesuai nama repo
- Clear cache: `Ctrl+Shift+R`

---

## 📋 CHECKLIST PRE-DEPLOY

- [ ] GitHub account aktif
- [ ] Repository name: `UT-AI-ADVISORY-PROTOTYPE`
- [ ] Token dengan scope `repo` dan `workflow` (jika pakai script)
- [ ] Atau siap untuk manual upload
- [ ] 2-3 menit waktu untuk build

---

## 🎉 POST-DEPLOY

Setelah berhasil deploy:

1. **Test semua fitur:**
   - 💬 Chat AI (ketik: "Berapa PPh 21 honor 10 juta?")
   - 🧮 Kalkulator (hitung PPh 21, 23, Final)
   - 📄 Generate dokumen (isi form)
   - 📚 Basis pengetahuan (cek regulasi)

2. **Screenshot** untuk dokumentasi LPPM

3. **Share URL:**
   ```
   https://rzksfhd.github.io/UT-AI-ADVISORY-PROTOTYPE/
   ```

---

## 📞 BUTUH BANTUAN?

Jika ada kendala:
1. Cek GitHub Actions log (tab Actions → workflow run)
2. Pastikan semua file ter-upload dengan benar
3. Coba deploy ulang dengan run script lagi

**Status deploy bisa di-cek di:**
```
https://github.com/rzksfhd/UT-AI-ADVISORY-PROTOTYPE/actions
```

---

**🚀 SIAP DEPLOY! PILIH SALAH SATU OPSI DI ATAS**
