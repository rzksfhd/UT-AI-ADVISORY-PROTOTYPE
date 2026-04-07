# 🤖 AI Advisory Pajak - Universitas Terbuka

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-blue)](https://rzksfhd.github.io/UT-AI-ADVISORY-PROTOTYPE/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **Prototype aplikasi AI Advisory untuk konsultasi perpajakan dalam kegiatan penelitian dan pengabdian kepada masyarakat di Universitas Terbuka**

![Preview](/screenshot.png)

## 📋 Deskripsi Proyek

Aplikasi web berbasis AI yang dirancang untuk membantu dosen, peneliti, mahasiswa, dan staff keuangan Universitas Terbuka dalam memahami dan mengelola aspek perpajakan untuk kegiatan akademik.

### ✨ Fitur Utama

- 💬 **AI Chat Assistant** - Tanya jawab interaktif tentang pajak penelitian
- 🧮 **Kalkulator Pajak** - Perhitungan otomatis PPh 21, PPh 23, PPh Final
- 📄 **Generate Dokumen** - Buat bukti pemotongan pajak format standar DJP
- 📚 **Basis Pengetahuan** - Referensi regulasi perpajakan terkini
- 🌐 **Bahasa Indonesia** - Natural language processing untuk Bahasa Indonesia

### 🎯 Use Cases

1. **Dosen/Peneliti** - Konsultasi PPh 21 Final atas honor penelitian
2. **Staff Keuangan** - Generate bukti pemotongan PPh 21/23
3. **Mahasiswa** - Konsultasi pajak untuk kegiatan PKM/Penelitian
4. **Admin LPPM** - Validasi dokumen pajak kegiatan

---

## 🚀 Live Demo

**GitHub Pages:** [https://rzksfhd.github.io/UT-AI-ADVISORY-PROTOTYPE/](https://rzksfhd.github.io/UT-AI-ADVISORY-PROTOTYPE/)

Atau jalankan secara lokal:

```bash
# Clone repository
git clone https://github.com/rzksfhd/UT-AI-ADVISORY-PROTOTYPE.git

# Masuk ke folder
cd UT-AI-ADVISORY-PROTOTYPE

# Install dependencies
npm install

# Jalankan development server
npm run dev

# Buka browser di http://localhost:3000
```

---

## 🏗️ Arsitektur Sistem

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                │
│              Next.js 14 + TypeScript + Tailwind CSS            │
│                    (Static Export for GitHub Pages)             │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      AI/LLM SIMULATION                          │
│              Mock Responses based on Tax Regulations           │
│         (Ready for RAG integration with OpenAI/Claude)          │
└─────────────────────────────────────────────────────────────────┘
```

### 📁 Struktur Folder

```
UT-AI-ADVISORY-PROTOTYPE/
├── app/
│   ├── page.tsx          # Main application component
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── next.config.js        # Next.js configuration (static export)
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies
```

---

## 💻 Tech Stack

| Komponen | Teknologi |
|----------|-----------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Icons** | Lucide React |
| **Deployment** | GitHub Pages |

---

## 🧮 Fitur Kalkulator

### 1. PPh 21 Final (Honor Penelitian)
- **Tarif**: 5% dari bruto
- **Dasar**: PMK 83/PMK.03/2021

### 2. PPh 23 (Jasa Konsultan/Penelitian)
- **Tarif**: 2% dari bruto
- **Dasar**: PP No. 94 Tahun 2010

### 3. PPh 4(2) Final (DP/Angsuran)
- **Tarif**: 2.5% dari bruto
- **Dasar**: PP No. 55 Tahun 2022

---

## 📄 Dokumen yang Didukung

1. **Bukti Pemotongan PPh 21 Final**
   - Form A1 format DJP
   - Auto-calculate PPh 5%
   - Preview sebelum download

2. **Bukti Pemotongan PPh 23**
   - Jasa penelitian/konsultan
   - Tarif 2%
   - Format standar DJP

---

## 📚 Regulasi Referensi

Aplikasi ini mengacu pada regulasi perpajakan terkini:

| Regulasi | Topik |
|----------|-------|
| PMK 83/PMK.03/2021 | PPh 21 Final honor penelitian |
| PMK 90/PMK.03/2020 | PPh 21 pegawai negeri sipil |
| PP No. 94/2010 | PPh 23 jasa penelitian |
| PP No. 49/2022 | Fasilitas PPN untuk R&D |
| PP No. 55/2022 | PPh Final DP/Angsuran |
| PMK 32/PMK.03/2024 | Biaya perjalanan dinas |

---

## 🔮 Roadmap Pengembangan

### Phase 1: MVP (Current)
- ✅ Chat interface dengan mock AI
- ✅ Kalkulator pajak
- ✅ Generate dokumen preview
- ✅ Basis pengetahuan regulasi

### Phase 2: Backend Integration
- 🔜 FastAPI backend
- 🔜 OpenAI/Claude API integration
- 🔜 RAG pipeline
- 🔜 ChromaDB vector store

### Phase 3: Production
- 🔜 User authentication
- 🔜 Database PostgreSQL
- 🔜 Full document generation
- 🔜 API integration dengan sistem keuangan UT

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Fork dan clone repo
git clone https://github.com/rzksfhd/UT-AI-ADVISORY-PROTOTYPE.git

# Buat branch fitur
git checkout -b feature/nama-fitur

# Commit changes
git commit -m "Add: deskripsi fitur"

# Push ke branch
git push origin feature/nama-fitur

# Buat Pull Request
```

---

## 📝 Proposal Penelitian & RAB

Dokumen lengkap proposal penelitian tersedia di Cloudflare R2:

| Dokumen | Format | Link |
|---------|--------|------|
| Proposal Penelitian | Word (.docx) | [Download](https://tahutek.web.id/advisory/proposal-penelitian.docx) |
| Rencana Anggaran Belanja | Excel (.xlsx) | [Download](https://tahutek.web.id/advisory/rencana-anggaran-belanja.xlsx) |
| Technical Plan | Markdown | [View](https://tahutek.web.id/advisory/plan.md) |

**Total Anggaran:** Rp 89.090.000 (di bawah maksimal Rp 100.000.000)

---

## ⚠️ Disclaimer

> **PENTING:** Aplikasi ini adalah **prototype** dan AI simulation untuk tujuan demonstrasi. Untuk keputusan perpajakan yang sahih, selalu konsultasikan dengan:
> - Bagian Keuangan Universitas Terbuka
> - Konsultan Pajak resmi
> - Direktorat Jenderal Pajak (DJP)

---

## 📞 Kontak

**Ketua Peneliti:** Rizki Shafaruddin Ahmad  
**Institusi:** Universitas Terbuka  
**Email:** [your-email@example.com]  
**GitHub:** [@rzksfhd](https://github.com/rzksfhd)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Universitas Terbuka
- LPPM (Lembaga Penelitian dan Pengabdian kepada Masyarakat)
- Direktorat Jenderal Pajak (DJP) - Regulasi perpajakan
- Cloudflare R2 - Object storage

---

<p align="center">
  <strong>Built with ❤️ for Universitas Terbuka</strong>
</p>
