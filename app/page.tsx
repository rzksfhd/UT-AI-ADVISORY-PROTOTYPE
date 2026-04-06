'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Calculator, FileText, BookOpen, Sparkles, Menu, X, ChevronRight, Info, Download, FileJson, Printer } from 'lucide-react'

// Mock AI responses based on tax regulations
const mockAIResponses: Record<string, string> = {
  'default': `Halo! Saya AI Advisory Pajak Universitas Terbuka. Saya dapat membantu Anda dengan:

• Perhitungan PPh 21 untuk honor penelitian
• PPh 23 untuk jasa konsultan
• PPh Final untuk pembayaran DP
• PPN untuk kegiatan akademik
• Generate dokumen bukti potong

Silakan ajukan pertanyaan terkait perpajakan kegiatan penelitian atau Pengmas Anda.`,

  'pph 21': `**PPh 21 atas Honor Penelitian**

Berdasarkan **PMK 83/PMK.03/2021**:

• **Tarif PPh 21 Final**: 5% dari bruto honor
• **Ketentuan**: Dikenakan pada honor penelitian yang diterima dosen/peneliti

**Contoh Perhitungan:**
Jika honor penelitian Rp 10.000.000:
- PPh 21 Final = 5% × 10.000.000 = **Rp 500.000**
- Netto diterima = 10.000.000 - 500.000 = **Rp 9.500.000**

**Dokumen yang perlu dibuat:**
✓ Bukti Pemotongan PPh 21 Final (format standar DJP)
✓ Surat Setoran Pajak (SSP) jika diperlukan

Apakah Anda ingin saya generate bukti potongnya?`,

  'pph 23': `**PPh 23 atas Jasa Penelitian/Konsultan**

Berdasarkan **PP No. 94 Tahun 2010**:

• **Tarif PPh 23**: 2% dari jumlah bruto nilai jasa
• **Dasar Hukum**: Jasa penelitian termasuk jasa teknik

**Contoh Perhitungan:**
Jika jasa konsultan penelitian Rp 15.000.000:
- PPh 23 = 2% × 15.000.000 = **Rp 300.000**
- Jasa netto = 15.000.000 - 300.000 = **Rp 14.700.000**

**Keterangan:**
- PPh 23 dipotong oleh Universitas sebagai pemotong
- Pemotong wajib menerbitkan Bukti Pemotongan PPh 23
- Wajib disetor ke Kas Negara paling lambat tanggal 10 bulan berikutnya

Apakah ada yang ingin ditanyakan lebih lanjut?`,

  'ppn': `**PPN untuk Kegiatan Penelitian**

Berdasarkan **PP No. 49 Tahun 2022**:

Kegiatan penelitian dan pengembangan mendapatkan **fasilitas PPN**:

• **Fasilitas**: PPN ditanggung pemerintah (DTP)
• **Cakupan**: Pembelian barang/jasa untuk kegiatan penelitian
• **Persyaratan**: Harus memiliki Nomer Pokok Wajib Pajak (NPWP)

**Yang termasuk fasilitas:**
✓ Pembelian peralatan penelitian
✓ Jasa laboratorium
✓ Jasa konsultan R&D

**Yang TIDAK termasuk:**
✗ Honorarium dosen/peneliti (kena PPh 21)
✗ Perjalanan dinas

**Catatan:** Fasilitas ini berlaku untuk penelitian yang dilakukan oleh perguruan tinggi dan lembaga riset.

Apakah Anda ingin tahu lebih detail tentang tata cara pengajuan fasilitas?`,

  'bukti potong': `**Generate Bukti Pemotongan Pajak**

Saya dapat membantu generate dokumen:

1. **Bukti Pemotongan PPh 21 Final**
   - Format standar DJP (Form A1)
   - Masa pajak, NPWP, nilai honor
   
2. **Bukti Pemotongan PPh 23**
   - Format standar DJP (Form Bukti Potong)
   - Detail jasa, nilai bruto, tarif, PPh dipotong

3. **Surat Setoran Pajak (SSP)**
   - Kode MAP dan KJS
   - Jumlah setoran

**Untuk generate, saya perlu data:**
- Nama penerima penghasilan
- NPWP (jika ada)
- Jumlah bruto honor/jasa
- Masa pajak (bulan/tahun)
- Nomor SPK/kontrak (jika ada)

Silakan isi form yang tersedia di menu "Generate Dokumen" atau berikan datanya di sini.`,

  'kalkulator': `**Kalkulator Pajak**

Silakan pilih jenis perhitungan:

1️⃣ **PPh 21 Final (Honor Penelitian)**
   Input: Nilai honor bruto
   Output: PPh 21 Final (5%), Netto

2️⃣ **PPh 23 (Jasa Penelitian)**
   Input: Nilai jasa bruto
   Output: PPh 23 (2%), Netto

3️⃣ **PPh 4(2) Final (DP/Angsuran)**
   Input: Nilai angsuran
   Output: PPh Final sesuai jenis usaha

4️⃣ **Biaya Operasional Setelah Pajak**
   Input: Total anggaran kegiatan
   Output: Estimasi biaya bersih setelah pajak

Klik ikon **Kalkulator** di menu untuk menggunakan tools perhitungan.`,

  'help': `**Panduan Penggunaan AI Advisory**

📝 **Cara Bertanya:**
- Ketik pertanyaan langsung di chatbox
- Gunakan bahasa Indonesia natural
- Sebutkan konteks (contoh: "Saya dosen, mau tanya...")

🧮 **Fitur Kalkulator:**
- Klik menu Kalkulator di sidebar
- Pilih jenis pajak
- Masukkan nilai, otomatis dihitung

📄 **Generate Dokumen:**
- Menu "Dokumen" di sidebar
- Isi form dengan data yang diperlukan
- Download hasil dalam format siap pakai

📚 **Referensi:**
- Semua jawaban berdasarkan regulasi terkini
- PMK 83/2021, PMK 90/2020, PP 94/2010, dll

⚠️ **Disclaimer:**
AI ini adalah advisory assistant. Untuk kasus kompleks, konsultasikan dengan ahli pajak resmi UT atau DJP.

Ada yang bisa saya bantu?`,
}

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: mockAIResponses['default'],
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [activeTab, setActiveTab] = useState('chat')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateAIResponse = (userMessage: string): string => {
    const lowerMsg = userMessage.toLowerCase()
    
    if (lowerMsg.includes('pph 21') || lowerMsg.includes('honor')) {
      return mockAIResponses['pph 21']
    }
    if (lowerMsg.includes('pph 23') || lowerMsg.includes('jasa')) {
      return mockAIResponses['pph 23']
    }
    if (lowerMsg.includes('ppn') || lowerMsg.includes('fasilitas')) {
      return mockAIResponses['ppn']
    }
    if (lowerMsg.includes('bukti') || lowerMsg.includes('dokumen') || lowerMsg.includes('generate')) {
      return mockAIResponses['bukti potong']
    }
    if (lowerMsg.includes('kalkulator') || lowerMsg.includes('hitung')) {
      return mockAIResponses['kalkulator']
    }
    if (lowerMsg.includes('bantu') || lowerMsg.includes('help') || lowerMsg.includes('panduan')) {
      return mockAIResponses['help']
    }
    
    return `Terima kasih atas pertanyaan Anda tentang "${userMessage}".

Saya AI Advisory Pajak UT yang dirancang untuk membantu konsultasi perpajakan kegiatan akademik. Berdasarkan peraturan yang berlaku, saya dapat membantu dengan:

• **PPh 21 Final** untuk honor penelitian (PMK 83/2021)
• **PPh 23** untuk jasa konsultan (PP 94/2010)
• **PPN** fasilitas untuk kegiatan R&D (PP 49/2022)
• **Generate dokumen** bukti pemotongan pajak

Bisakah Anda memberikan detail lebih spesifik tentang:
1. Jenis kegiatan (penelitian/Pengmas/kerjasama)?
2. Jenis transaksi (honor/jasa/pembelian)?
3. Nilai estimasi transaksi?

Atau ketik "help" untuk melihat panduan lengkap.`
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI typing delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(userMessage.content),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const quickQuestions = [
    'Berapa PPh 21 honor Rp 10 juta?',
    'PPN untuk kegiatan penelitian',
    'Generate bukti potong',
    'PPh 23 jasa konsultan'
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-gray-900">AI Advisory</h1>
              <p className="text-xs text-gray-500">Pajak - Universitas Terbuka</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          <button
            onClick={() => { setActiveTab('chat'); setSidebarOpen(false) }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'chat' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50 text-gray-700'
            }`}
          >
            <Bot size={20} />
            <span className="font-medium">Chat AI</span>
          </button>
          
          <button
            onClick={() => { setActiveTab('calculator'); setSidebarOpen(false) }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'calculator' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50 text-gray-700'
            }`}
          >
            <Calculator size={20} />
            <span className="font-medium">Kalkulator Pajak</span>
          </button>
          
          <button
            onClick={() => { setActiveTab('documents'); setSidebarOpen(false) }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'documents' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50 text-gray-700'
            }`}
          >
            <FileText size={20} />
            <span className="font-medium">Generate Dokumen</span>
          </button>
          
          <button
            onClick={() => { setActiveTab('knowledge'); setSidebarOpen(false) }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'knowledge' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50 text-gray-700'
            }`}
          >
            <BookOpen size={20} />
            <span className="font-medium">Basis Pengetahuan</span>
          </button>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <Info size={14} />
            <span>Prototype v0.1 - GitHub Demo</span>
          </div>
          <p className="text-xs text-gray-400">
            AI Advisory untuk kegiatan penelitian dan Pengmas UT
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {activeTab === 'chat' && (
          <>
            {/* Chat Header */}
            <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bot className="w-6 h-6 text-blue-600" />
                <div>
                  <h2 className="font-semibold text-gray-900">AI Advisor Pajak</h2>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Online - Siap membantu
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInput(q)}
                    className="hidden md:block text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors"
                  >
                    {q.length > 25 ? q.substring(0, 25) + '...' : q}
                  </button>
                ))}
              </div>
            </header>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                    ${message.role === 'user' ? 'bg-blue-600' : 'bg-gray-200'}
                  `}>
                    {message.role === 'user' ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                  <div className={`
                    max-w-[80%] px-4 py-3 rounded-2xl
                    ${message.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-md' 
                      : 'bg-white border border-gray-200 text-gray-800 rounded-bl-md shadow-sm'
                    }
                  `}>
                    <div className="text-sm whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </div>
                    <div className={`
                      text-xs mt-1
                      ${message.role === 'user' ? 'text-blue-200' : 'text-gray-400'}
                    `}>
                      {message.timestamp.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="max-w-4xl mx-auto flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Tanyakan tentang pajak penelitian... (contoh: Berapa PPh 21 honor 5 juta?)"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <Send size={18} />
                  Kirim
                </button>
              </div>
              <p className="text-xs text-gray-400 text-center mt-2">
                Tekan Enter untuk mengirim. AI Advisory berbasis regulasi PMK 83/2021, PMK 90/2020, dan PP 94/2010.
              </p>
            </div>
          </>
        )}

        {activeTab === 'calculator' && <TaxCalculator />}
        {activeTab === 'documents' && <DocumentGenerator />}
        {activeTab === 'knowledge' && <KnowledgeBase />}
      </main>
    </div>
  )
}

// Tax Calculator Component
function TaxCalculator() {
  const [activeCalc, setActiveCalc] = useState('pph21')
  const [amount, setAmount] = useState('')
  const [result, setResult] = useState<{gross: number, tax: number, netto: number} | null>(null)

  const calculate = () => {
    const gross = parseFloat(amount.replace(/[^0-9]/g, ''))
    if (!gross) return

    let tax = 0
    if (activeCalc === 'pph21') {
      tax = gross * 0.05
    } else if (activeCalc === 'pph23') {
      tax = gross * 0.02
    } else if (activeCalc === 'pphfinal') {
      tax = gross * 0.025
    }

    setResult({
      gross,
      tax,
      netto: gross - tax
    })
  }

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(num)
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Calculator className="w-8 h-8 text-blue-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Kalkulator Pajak</h2>
            <p className="text-gray-600">Perhitungan otomatis berdasarkan regulasi terkini</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {[
            { id: 'pph21', label: 'PPh 21 Final', desc: 'Honor penelitian (5%)', color: 'blue' },
            { id: 'pph23', label: 'PPh 23', desc: 'Jasa konsultan (2%)', color: 'green' },
            { id: 'pphfinal', label: 'PPh 4(2)', desc: 'DP/Angsuran (2.5%)', color: 'purple' },
          ].map((calc) => (
            <button
              key={calc.id}
              onClick={() => { setActiveCalc(calc.id); setResult(null); setAmount('') }}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                activeCalc === calc.id 
                  ? `border-${calc.color}-500 bg-${calc.color}-50` 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <h3 className={`font-bold text-${calc.color}-700`}>{calc.label}</h3>
              <p className="text-sm text-gray-600">{calc.desc}</p>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nilai Bruto (Rp)
            </label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Contoh: 10000000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            onClick={calculate}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Hitung Pajak
          </button>

          {result && (
            <div className="mt-6 space-y-3">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Nilai Bruto</span>
                <span className="font-bold text-lg">{formatRupiah(result.gross)}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                <span className="text-red-700">Pajak Dipotong</span>
                <span className="font-bold text-lg text-red-700">-{formatRupiah(result.tax)}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border-2 border-green-200">
                <span className="text-green-700 font-medium">Netto Diterima</span>
                <span className="font-bold text-xl text-green-700">{formatRupiah(result.netto)}</span>
              </div>
            </div>
          )}

          <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-blue-700">
            <p className="font-medium mb-1">Dasar Hukum:</p>
            {activeCalc === 'pph21' && <p>PMK 83/PMK.03/2021 - PPh 21 Final atas penghargaan penelitian (5%)</p>}
            {activeCalc === 'pph23' && <p>PP No. 94 Tahun 2010 - PPh 23 atas jasa penelitian (2%)</p>}
            {activeCalc === 'pphfinal' && <p>PP No. 55 Tahun 2022 - PPh Final atas DP/angsuran (2.5%)</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

// Export functions for DJP Online
function exportToCSV(formData: any, docType: string) {
  const npwpPemotong = "001234567890123" // NPWP Universitas Terbuka (placeholder)
  const namaPemotong = "UNIVERSITAS TERBUKA"
  const kodeObjek = docType === 'pph21' ? "21-100-01" : "23-100-01"
  const tarif = docType === 'pph21' ? 5 : 2
  const jumlahBruto = parseInt(formData.jumlah) || 0
  const pphDipotong = Math.round(jumlahBruto * (tarif / 100))
  const [bulan, tahun] = (formData.masa || "01/2026").split("/")
  
  const csvContent = [
    "NPWP_Pemotong,Nama_Pemotong,NPWP_Penerima,Nama_Penerima,Kode_Objek_Pajak,Jumlah_Bruto,Tarif,PPh_Dipotong,Masa_Pajak,Tahun_Pajak,Nomor_Bukti_Potong,Tanggal_Bukti_Potong",
    `${npwpPemotong},${namaPemotong},${formData.npwp || "009876543210987"},${formData.nama || "NAMA PENERIMA"},${kodeObjek},${jumlahBruto},${tarif},${pphDipotong},${bulan || "01"},${tahun || "2026"},${formData.nomor || "001/${docType === 'pph21' ? 'PPH21' : 'PPH23'}/${bulan || '01'}/${tahun || '2026'}},${new Date().toISOString().split('T')[0]}`
  ].join("\n")
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)
  link.setAttribute("href", url)
  link.setAttribute("download", `ebupot_${docType}_${formData.nama || 'export'}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function exportToJSON(formData: any, docType: string) {
  const tarif = docType === 'pph21' ? 5 : 2
  const jumlahBruto = parseInt(formData.jumlah) || 0
  const pphDipotong = Math.round(jumlahBruto * (tarif / 100))
  const [bulan, tahun] = (formData.masa || "01/2026").split("/")
  
  const jsonData = {
    buktiPotong: {
      jenisPajak: docType === 'pph21' ? "PPH21_FINAL" : "PPH23",
      pemotong: {
        npwp: "001234567890123",
        nama: "UNIVERSITAS TERBUKA"
      },
      penerima: {
        npwp: formData.npwp || "009876543210987",
        nama: formData.nama || "NAMA PENERIMA"
      },
      detail: {
        kodeObjekPajak: docType === 'pph21' ? "21-100-01" : "23-100-01",
        jumlahBruto: jumlahBruto,
        tarif: tarif,
        pphDipotong: pphDipotong
      },
      periode: {
        masa: bulan || "01",
        tahun: tahun || "2026"
      },
      metadata: {
        nomorBukti: formData.nomor || `001/${docType === 'pph21' ? 'PPH21' : 'PPH23'}/${bulan || '01'}/${tahun || '2026'}`,
        tanggal: new Date().toISOString().split('T')[0],
        exportedAt: new Date().toISOString()
      }
    }
  }
  
  const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)
  link.setAttribute("href", url)
  link.setAttribute("download", `ebupot_${docType}_${formData.nama || 'export'}.json`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Document Generator Component
function DocumentGenerator() {
  const [docType, setDocType] = useState('pph21')
  const [formData, setFormData] = useState({
    nama: '',
    npwp: '',
    jumlah: '',
    masa: '',
    nomor: ''
  })
  const [generated, setGenerated] = useState(false)

  const generateDoc = () => {
    setGenerated(true)
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="w-8 h-8 text-blue-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Generate Dokumen</h2>
            <p className="text-gray-600">Buat bukti pemotongan pajak format standar DJP</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => setDocType('pph21')}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                docType === 'pph21' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
            >
              <h3 className="font-bold text-blue-700">Bukti Potong PPh 21 Final</h3>
              <p className="text-sm text-gray-600">Form A1 - Honor penelitian</p>
            </button>
            <button
              onClick={() => setDocType('pph23')}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                docType === 'pph23' ? 'border-green-500 bg-green-50' : 'border-gray-200'
              }`}
            >
              <h3 className="font-bold text-green-700">Bukti Potong PPh 23</h3>
              <p className="text-sm text-gray-600">Jasa konsultan/penelitian</p>
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Penerima</label>
                <input
                  type="text"
                  value={formData.nama}
                  onChange={(e) => setFormData({...formData, nama: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Nama lengkap"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">NPWP (opsional)</label>
                <input
                  type="text"
                  value={formData.npwp}
                  onChange={(e) => setFormData({...formData, npwp: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="00.000.000.0-000.000"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Bruto (Rp)</label>
                <input
                  type="text"
                  value={formData.jumlah}
                  onChange={(e) => setFormData({...formData, jumlah: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="10000000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Masa Pajak (Bulan/Tahun)</label>
                <input
                  type="text"
                  value={formData.masa}
                  onChange={(e) => setFormData({...formData, masa: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="01/2026"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">No. SPK/Kontrak (opsional)</label>
              <input
                type="text"
                value={formData.nomor}
                onChange={(e) => setFormData({...formData, nomor: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Nomor dokumen pendukung"
              />
            </div>

            <button
              onClick={generateDoc}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Generate Dokumen
            </button>
          </div>

          {generated && (
            <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-center gap-2 text-green-700 mb-4">
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold">Dokumen berhasil digenerate!</span>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                <h4 className="font-bold text-center text-gray-900 mb-4">
                  BUKTI PEMOTONGAN {docType === 'pph21' ? 'PPh 21 Final' : 'PPh 23'}
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between border-b pb-1">
                    <span className="text-gray-600">Nama</span>
                    <span className="font-medium">{formData.nama || '[Nama Penerima]'}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span className="text-gray-600">NPWP</span>
                    <span className="font-medium">{formData.npwp || '-'}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span className="text-gray-600">Jumlah Bruto</span>
                    <span className="font-medium">
                      Rp {parseInt(formData.jumlah || '0').toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span className="text-gray-600">Tarif</span>
                    <span className="font-medium">{docType === 'pph21' ? '5%' : '2%'}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span className="text-gray-600">PPh Dipotong</span>
                    <span className="font-medium text-red-600">
                      Rp {Math.round(parseInt(formData.jumlah || '0') * (docType === 'pph21' ? 0.05 : 0.02)).toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-gray-900 font-medium">Jumlah Netto</span>
                    <span className="font-bold text-green-600">
                      Rp {Math.round(parseInt(formData.jumlah || '0') * (docType === 'pph21' ? 0.95 : 0.98)).toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                <button 
                  onClick={() => exportToCSV(formData, docType)}
                  className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-1"
                >
                  <Download size={14} />
                  Export CSV (DJP)
                </button>
                <button 
                  onClick={() => exportToJSON(formData, docType)}
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors"
                >
                  <FileJson size={14} className="inline mr-1"/>
                  JSON
                </button>
                <button 
                  onClick={() => window.print()}
                  className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium text-sm transition-colors"
                >
                  <Printer size={14} className="inline mr-1"/>
                  Print
                </button>
              </div>
              
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-xs text-yellow-800">
                  <strong>⚠️ Penting:</strong> File CSV ini siap di-import ke DJP Online (e-Bupot). 
                  Login ke <a href="https://djponline.pajak.go.id" target="_blank" className="underline">djponline.pajak.go.id</a> → e-Bupot → Import CSV.
                  Bukti potong resmi hanya dapat diterbitkan oleh DJP.
                </p>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                * Dokumen ini adalah preview. Untuk dokumen resmi, silakan hubungi bagian keuangan UT.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Knowledge Base Component
function KnowledgeBase() {
  const regulations = [
    {
      title: 'PMK 83/PMK.03/2021',
      desc: 'PPh 21 atas penghargaan/imbalan penelitian',
      category: 'PPh 21 Final',
      year: '2021'
    },
    {
      title: 'PMK 90/PMK.03/2020',
      desc: 'PPh 21 pegawai negeri sipil',
      category: 'PPh 21',
      year: '2020'
    },
    {
      title: 'PP No. 94 Tahun 2010',
      desc: 'Penghasilan yang dipotong PPh 23',
      category: 'PPh 23',
      year: '2010'
    },
    {
      title: 'PP No. 49 Tahun 2022',
      desc: 'Fasilitas PPN untuk R&D',
      category: 'PPN',
      year: '2022'
    },
    {
      title: 'PP No. 55 Tahun 2022',
      desc: 'PPh Final atas DP/Angsuran',
      category: 'PPh Final',
      year: '2022'
    },
    {
      title: 'PMK 32/PMK.03/2024',
      desc: 'Biaya perjalanan dinas dalam negeri',
      category: 'Perjalanan Dinas',
      year: '2024'
    },
  ]

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-8 h-8 text-blue-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Basis Pengetahuan</h2>
            <p className="text-gray-600">Regulasi perpajakan untuk kegiatan akademik</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {regulations.map((reg, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                  {reg.category}
                </span>
                <span className="text-xs text-gray-400">{reg.year}</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{reg.title}</h3>
              <p className="text-sm text-gray-600">{reg.desc}</p>
              <button className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                Baca selengkapnya <ChevronRight size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
          <h3 className="font-bold text-yellow-800 mb-2">⚠️ Disclaimer Penting</h3>
          <p className="text-sm text-yellow-700 leading-relaxed">
            AI Advisory ini menyediakan informasi berdasarkan regulasi perpajakan yang berlaku. 
            Namun, untuk keputusan penting atau kasus kompleks, selalu konsultasikan dengan:
          </p>
          <ul className="mt-2 text-sm text-yellow-700 list-disc list-inside">
            <li>Bagian Keuangan Universitas Terbuka</li>
            <li>Konsultan Pajak resmi</li>
            <li>KPP (Kantor Pelayanan Pajak) terdekat</li>
            <li>Direktorat Jenderal Pajak (DJP)</li>
          </ul>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Update terakhir: Januari 2026 | Sumber: DJP, Kemenkeu
          </p>
        </div>
      </div>
    </div>
  )
}
