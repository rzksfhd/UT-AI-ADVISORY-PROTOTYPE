# 📘 Panduan Import CSV ke DJP Online (e-Bupot)

## 🎯 Overview

AI Advisory Pajak UT menghasilkan file CSV yang dapat di-import langsung ke sistem DJP Online (e-Bupot). Dokumen ini menjelaskan langkah-langkah lengkap dari export hingga bukti potong resmi.

**⚠️ Penting:** Bukti pemotongan pajak yang sahih hanya dapat diterbitkan oleh DJP Online/Coretax. File CSV dari AI Advisory adalah "draft" yang siap di-import.

---

## 📋 Alur Kerja (Workflow)

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   AI Advisory   │────▶│  Export CSV/JSON │────▶│   DJP Online    │
│      (UT)       │     │   (Download)     │     │  (e-Bupot)      │
└─────────────────┘     └──────────────────┘     └─────────────────┘
                              │                           │
                              ▼                           ▼
                    ┌──────────────────┐      ┌─────────────────┐
                    │  Validasi Data   │      │ Import & Review │
                    │  (Auto-check)    │      │ Submit          │
                    └──────────────────┘      └─────────────────┘
                                                       │
                                                       ▼
                                              ┌─────────────────┐
                                              │ Bukti Potong    │
                                              │ RESMI dari DJP  │
                                              └─────────────────┘
```

---

## 🚀 Langkah demi Langkah

### STEP 1: Generate Data di AI Advisory

1. **Buka AI Advisory Pajak UT**
   - Website: `https://rzksfhd.github.io/UT-AI-ADVISORY-PROTOTYPE/`

2. **Klik Menu "Generate Dokumen"** (sidebar kiri)

3. **Pilih Jenis Pajak**
   - **PPh 21 Final** - Untuk honor penelitian/pengmas
   - **PPh 23** - Untuk jasa konsultan

4. **Isi Form Data:**

   | Field | Keterangan | Contoh |
   |-------|------------|--------|
   | Nama | Nama lengkap penerima | Dr. John Doe |
   | NPWP | 15 digit NPWP (opsional) | 09.876.543.2-098.000 |
   | Jumlah Bruto | Nilai sebelum pajak | 10000000 |
   | Masa Pajak | Bulan/tahun | 01/2026 |
   | No. SPK/Kontrak | Nomor dokumen (opsional) | 001/SPK/01/2026 |

5. **Klik "Generate Dokumen"**
   - Preview akan muncul di bawah form
   - Review perhitungan PPh

---

### STEP 2: Export CSV

1. **Klik Tombol "Export CSV (DJP)"**
   - Warna hijau, ada icon download
   - File akan otomatis ter-download

2. **Cek File Download**
   - Format nama: `ebupot_pph21_[nama].csv`
   - Lokasi: Folder Downloads (default)

3. **Preview CSV (Opsional)**
   Buka dengan Excel/Notepad untuk memastikan:
   ```csv
   NPWP_Pemotong,Nama_Pemotong,NPWP_Penerima,Nama_Penerima,Kode_Objek_Pajak,Jumlah_Bruto,Tarif,PPh_Dipotong,Masa_Pajak,Tahun_Pajak,Nomor_Bukti_Potong,Tanggal_Bukti_Potong
   001234567890123,UNIVERSITAS TERBUKA,098765432109800,Dr. John Doe,21-100-01,10000000,5,500000,01,2026,001/PPH21/01/2026,2026-01-15
   ```

---

### STEP 3: Login ke DJP Online

1. **Buka Browser** (Chrome/Firefox/Edge)

2. **Akses DJP Online:**
   ```
   https://djponline.pajak.go.id
   ```

3. **Login dengan:**
   - NPWP Universitas Terbuka (sebagai pemotong)
   - Password
   - Kode keamanan (captcha)

4. **Pastikan Role:** Admin/Pemotong Pajak

---

### STEP 4: Import CSV ke e-Bupot

#### 4.1 Navigasi ke e-Bupot

1. Setelah login, klik menu **"e-Bupot"**
2. Pilih **"PPh Pasal 21"** atau **"PPh Pasal 23"** (sesuai jenis)

#### 4.2 Import File

1. Klik tombol **"Import"** atau **"Upload CSV"**
   - Biasanya di pojok kanan atas

2. Pilih file CSV yang sudah di-download dari AI Advisory
   - Klik **"Browse"** atau drag-drop file

3. **Mapping Kolom** (jika diminta):
   - System akan otomatis mapping jika format sesuai
   - Pastikan kolom-kolom ini ter-mapping dengan benar:
     - NPWP_Pemotong ← NPWP UT
     - NPWP_Penerima ← NPWP penerima penghasilan
     - Jumlah_Bruto ← Nilai bruto
     - PPh_Dipotong ← PPh yang dihitung

4. **Klik "Preview" atau "Validate"**
   - System akan cek validitas data
   - Error (jika ada) akan ditampilkan

5. **Perbaiki Error (jika ada):**
   - NPWP tidak valid → Cek digit dan format
   - Tanggal salah → Format harus YYYY-MM-DD
   - Jumlah negatif → Bruto harus positif

---

### STEP 5: Review & Submit

#### 5.1 Review Data

1. **Cek daftar e-Bupot** yang akan dibuat
2. **Periksa masing-masing record:**
   - ✅ Nama penerima benar
   - ✅ NPWP valid (15 digit)
   - ✅ Jumlah bruto sesuai SPK
   - ✅ PPh terhitung dengan benar
   - ✅ Masa pajak sesuai

3. **Edit Manual (jika perlu):**
   - Klik icon edit pada record
   - Koreksi data yang salah
   - Save perubahan

#### 5.2 Submit ke DJP

1. **Pilih semua record** yang akan disubmit
   - Centang checkbox di kiri

2. **Klik "Submit" atau "Simpan"**

3. **Konfirmasi:**
   - Pastikan jumlah record benar
   - Klik "Ya" atau "Confirm"

4. **Tunggu Proses:**
   - Loading 10-30 detik
   - System sedang membuat bukti potong

---

### STEP 6: Download Bukti Potong Resmi

1. **Lihat daftar e-Bupot** yang sudah tersubmit

2. **Cari record yang baru dibuat:**
   - Filter by masa pajak
   - Atau cari by nama penerima

3. **Download Bukti Potong:**
   - Klik icon **"Download"** atau **"PDF"**
   - File akan terdownload: `Bukti_Potong_[Nomor].pdf`

4. **Verifikasi Bukti Potong:**
   - Buka PDF
   - Pastikan ada:
     - Logo DJP
     - QR Code
     - Nomor bukti potong resmi
     - Cap elektronik DJP

---

## ✅ Checklist Sukses

- [ ] Data di AI Advisory sudah benar
- [ ] CSV berhasil di-download
- [ ] Login DJP Online berhasil
- [ ] Import CSV tanpa error
- [ ] Data tampil di preview
- [ ] Submit berhasil
- [ ] Bukti potong resmi terdownload
- [ ] PDF valid (ada QR code DJP)

---

## 🐛 Troubleshooting

### Error: "Format CSV tidak sesuai"

**Solusi:**
1. Pastikan delimiter adalah koma (,) bukan titik koma (;)
2. Cek header row sesuai format DJP
3. Tidak ada baris kosong di tengah

### Error: "NPWP tidak valid"

**Solusi:**
1. NPWP harus 15 digit tanpa titik/tanda baca
2. Contoh benar: `098765432109800`
3. Contoh salah: `09.876.543.2-098.000`

### Error: "Jumlah PPh tidak sesuai"

**Solusi:**
1. PPh 21 Final = 5% x Bruto
2. PPh 23 = 2% x Bruto
3. Cek perhitungan di AI Advisory

### Error: "Masa pajak tidak valid"

**Solusi:**
1. Format: `MM/YYYY`
2. Bulan: 01-12
3. Tahun: 4 digit (2026, 2027)

---

## 📊 Format CSV Standar DJP

```csv
NPWP_Pemotong,Nama_Pemotong,NPWP_Penerima,Nama_Penerima,Kode_Objek_Pajak,Jumlah_Bruto,Tarif,PPh_Dipotong,Masa_Pajak,Tahun_Pajak,Nomor_Bukti_Potong,Tanggal_Bukti_Potong
001234567890123,UNIVERSITAS TERBUKA,098765432109800,DR. JOHN DOE,21-100-01,10000000,5,500000,01,2026,001/PPH21/01/2026,2026-01-15
001234567890123,UNIVERSITAS TERBUKA,098765432109801,JANE SMITH,21-100-01,5000000,5,250000,01,2026,002/PPH21/01/2026,2026-01-15
```

**Penjelasan Kolom:**

| Kolom | Format | Keterangan |
|-------|--------|------------|
| NPWP_Pemotong | 15 digit | NPWP Universitas Terbuka |
| Nama_Pemotong | String | "UNIVERSITAS TERBUKA" |
| NPWP_Penerima | 15 digit | NPWP penerima penghasilan |
| Nama_Penerima | String | Nama lengkap |
| Kode_Objek_Pajak | XX-XXX-XX | 21-100-01 (PPh 21), 23-100-01 (PPh 23) |
| Jumlah_Bruto | Number | Tanpa titik/koma |
| Tarif | Number | 5 (PPh 21), 2 (PPh 23) |
| PPh_Dipotong | Number | Hasil perhitungan |
| Masa_Pajak | 2 digit | 01-12 |
| Tahun_Pajak | 4 digit | 2026 |
| Nomor_Bukti_Potong | String | Format internal UT |
| Tanggal_Bukti_Potong | YYYY-MM-DD | Tanggal pembuatan |

---

## 🎥 Video Tutorial (Coming Soon)

Link video demo akan tersedia di:
- YouTube: [Link akan ditambahkan]
- Repository: `https://github.com/rzksfhd/UT-AI-ADVISORY-PROTOTYPE`

---

## 📞 Bantuan & Support

Jika mengalami kendala:

1. **Internal UT:**
   - Hubungi Bagian Keuangan UT
   - Email: [keuangan@ut.ac.id]
   - Telepon: [nomor telepon]

2. **DJP Online Support:**
   - Kring Pajak: 1500200
   - Email: pengaduan@pajak.go.id
   - Website: https://www.pajak.go.id

3. **Tim Peneliti:**
   - Rizki Shafaruddin Ahmad
   - GitHub: https://github.com/rzksfhd

---

## ⚠️ Disclaimer

> **AI Advisory Pajak UT adalah "helper tool" untuk memudahkan pengisian data pajak.**
> 
> **Bukti pemotongan pajak yang sahih hanya dapat diterbitkan oleh DJP Online/Coretax System.**
> 
> **Selalu verifikasi data sebelum submit ke DJP Online.**

---

**Update Terakhir:** Januari 2026  
**Versi:** 1.0  
**Cocok untuk:** DJP Online v2.0+, Coretax System
