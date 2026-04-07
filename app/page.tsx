'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Calculator, FileText, BookOpen, Sparkles, Menu, X, ChevronRight, Info, Download, FileJson, Printer } from 'lucide-react'

// Mock AI responses based on tax regulations
const mockAIResponses: Record<string, string> = {
  'default': `Halo! 👋 Saya **AI Advisory Pajak Universitas Terbuka**.

Saya dapat membantu Anda dengan:

• **Perhitungan PPh 21** untuk honor penelitian
• **PPh 23** untuk jasa konsultan  
• **PPh Final** untuk pembayaran DP
• **PPN** untuk kegiatan akademik
• **Generate dokumen** bukti potong

Silakan ajukan pertanyaan terkait perpajakan kegiatan penelitian atau Pengmas Anda.`,

  'pph 21': `**PPh 21 atas Honor Penelitian** 📊

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

  'pph 23': `**PPh 23 atas Jasa Penelitian/Konsultan** 📋

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

  'ppn': `**PPN untuk Kegiatan Penelitian** 🏛️

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

  'bukti potong': `**Generate Bukti Pemotongan Pajak** 📄

Saya dapat membantu generate dokumen:

1️⃣ **Bukti Pemotongan PPh 21 Final**
   - Format standar DJP (Form A1)
   - Masa pajak, NPWP, nilai honor
   
2️⃣ **Bukti Pemotongan PPh 23**
   - Format standar DJP (Form Bukti Potong)
   - Detail jasa, nilai bruto, tarif, PPh dipotong

3️⃣ **Surat Setoran Pajak (SSP)**
   - Kode MAP dan KJS
   - Jumlah setoran

**Untuk generate, saya perlu data:**
- Nama penerima penghasilan
- NPWP (jika ada)
- Jumlah bruto honor/jasa
- Masa pajak (bulan/tahun)
- Nomor SPK/kontrak (jika ada)

Silakan isi form yang tersedia di menu "Generate Dokumen" atau berikan datanya di sini.`,

  'kalkulator': `**Kalkulator Pajak** 🧮

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

  'help': `**Panduan Penggunaan AI Advisory** 📖

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

// Markdown renderer for AI responses
function renderMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
    .replace(/• /g, '<span class="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 align-middle"></span>')
    .replace(/✓ /g, '<span class="text-green-500 mr-1">✓</span>')
    .replace(/✗ /g, '<span class="text-red-500 mr-1">✗</span>')
    .replace(/\n/g, '<br>')
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
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

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
    
    return `Terima kasih atas pertanyaan Anda tentang "${userMessage}". 🤔

Saya AI Advisory Pajak UT yang dirancang untuk membantu konsultasi perpajakan kegiatan akademik. Berdasarkan peraturan yang berlaku, saya dapat membantu dengan:

• **PPh 21 Final** untuk honor penelitian (PMK 83/2021)
• **PPh 23** untuk jasa konsultan (PP 94/2010)
• **PPN** fasilitas untuk kegiatan R&D (PP 49/2022)
• **Generate dokumen** bukti pemotongan pajak

Bisakah Anda memberikan detail lebih spesifik tentang:
1. Jenis kegiatan (penelitian/Pengmas/kerjasama)?
2. Jenis transaksi (honor/jasa/pembelian)?
3. Nilai estimasi transaksi?

Atau ketik **"help"** untuk melihat panduan lengkap.`
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
    }, 1200)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const quickQuestions = [
    { icon: '💰', text: 'PPh 21 honor Rp 10 juta?' },
    { icon: '🏛️', text: 'PPN untuk kegiatan penelitian' },
    { icon: '📄', text: 'Generate bukti potong' },
    { icon: '📊', text: 'PPh 23 jasa konsultan' },
  ]

  const handleQuickQuestion = (text: string) => {
    setInput(text)
    inputRef.current?.focus()
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all"
      >
        {sidebarOpen ? <X size={22} className="text-gray-700" /> : <Menu size={22} className="text-gray-700" />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-out shadow-xl lg:shadow-none
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo Header */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-gray-900 leading-tight">AI Advisory</h1>
              <p className="text-xs text-gray-500">Pajak - Universitas Terbuka</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          <NavButton
            active={activeTab === 'chat'}
            onClick={() => { setActiveTab('chat'); setSidebarOpen(false) }}
            icon={<Bot size={20} />}
            label="Chat AI"
          />
          <NavButton
            active={activeTab === 'calculator'}
            onClick={() => { setActiveTab('calculator'); setSidebarOpen(false) }}
            icon={<Calculator size={20} />}
            label="Kalkulator Pajak"
          />
          <NavButton
            active={activeTab === 'documents'}
            onClick={() => { setActiveTab('documents'); setSidebarOpen(false) }}
            icon={<FileText size={20} />}
            label="Generate Dokumen"
          />
          <NavButton
            active={activeTab === 'knowledge'}
            onClick={() => { setActiveTab('knowledge'); setSidebarOpen(false) }}
            icon={<BookOpen size={20} />}
            label="Basis Pengetahuan"
          />
        </nav>

        {/* Footer Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <Info size={14} className="text-blue-500" />
            <span className="font-medium">Prototype v0.1</span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            AI Advisory untuk kegiatan penelitian dan Pengmas UT
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {activeTab === 'chat' && (
          <>
            {/* Chat Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/80 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
              <div className="flex items-center gap-3 lg:ml-0 ml-12">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center shadow-md">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">AI Advisor Pajak</h2>
                  <p className="text-xs text-green-600 flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    Online - Siap membantu
                  </p>
                </div>
              </div>
            </header>

            {/* Quick Questions Pills */}
            <div className="bg-white/50 border-b border-gray-100 px-4 py-3">
              <div className="max-w-4xl mx-auto">
                <p className="text-xs text-gray-500 mb-2 font-medium">Pertanyaan Umum:</p>
                <div className="flex gap-2 flex-wrap">
                  {quickQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickQuestion(q.text)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 rounded-full text-xs text-gray-700 hover:text-blue-700 transition-all shadow-sm hover:shadow"
                    >
                      <span>{q.icon}</span>
                      <span className="font-medium">{q.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
              <div className="max-w-4xl mx-auto space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''} animate-fadeIn`}
                  >
                    {/* Avatar */}
                    <div className={`
                      w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 shadow-md
                      ${message.role === 'user' 
                        ? 'bg-gradient-to-br from-blue-600 to-blue-700' 
                        : 'bg-gradient-to-br from-gray-100 to-gray-200'}
                    `}>
                      {message.role === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-gray-600" />
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div className={`
                      max-w-[85%] md:max-w-[75%] px-5 py-3.5 rounded-2xl shadow-sm
                      ${message.role === 'user' 
                        ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-br-md' 
                        : 'bg-white border border-gray-100 text-gray-800 rounded-bl-md'
                      }
                    `}>
                      {message.role === 'assistant' ? (
                        <div 
                          className="text-sm leading-relaxed space-y-2"
                          dangerouslySetInnerHTML={{ __html: renderMarkdown(message.content) }}
                        />
                      ) : (
                        <div className="text-sm leading-relaxed font-medium">
                          {message.content}
                        </div>
                      )}
                      <div className={`
                        text-[11px] mt-2 font-medium
                        ${message.role === 'user' ? 'text-blue-200' : 'text-gray-400'}
                      `}>
                        {message.timestamp.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex gap-3 animate-fadeIn">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-md">
                      <Bot className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-md px-5 py-4 shadow-sm">
                      <div className="flex gap-1.5">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-white border-t border-gray-200/80 px-4 py-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex gap-3 items-end bg-gray-50 border border-gray-200 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-400 transition-all shadow-sm">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Tanyakan tentang pajak penelitian... (contoh: Berapa PPh 21 honor 5 juta?)"
                    className="flex-1 px-3 py-2.5 bg-transparent outline-none text-gray-700 placeholder:text-gray-400 text-sm"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-300 disabled:to-gray-300 text-white rounded-xl font-medium transition-all flex items-center gap-2 shadow-md hover:shadow-lg disabled:shadow-none transform hover:scale-105 active:scale-95 disabled:transform-none"
                  >
                    <Send size={16} />
                    <span className="hidden sm:inline text-sm">Kirim</span>
                  </button>
                </div>
                <p className="text-[11px] text-gray-400 text-center mt-2">
                  Tekan <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-600 font-mono text-[10px]">Enter</kbd> untuk mengirim • AI berbasis regulasi PMK 83/2021, PMK 90/2020, dan PP 94/2010
                </p>
              </div>
            </div>
          </>
        )}

        {activeTab === 'calculator' && <TaxCalculator />}
        {activeTab === 'documents' && <DocumentGenerator />}
        {activeTab === 'knowledge' && <KnowledgeBase />}
      </main>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

// Navigation Button Component
function NavButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
        active 
          ? 'bg-gradient-to-r from-blue-50 to-blue-100/50 text-blue-700 shadow-sm border border-blue-100' 
          : 'hover:bg-gray-50 text-gray-600 hover:text-gray-900'
      }`}
    >
      <span className={`transition-transform duration-200 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
        {icon}
      </span>
      <span className="font-medium text-sm">{label}</span>
      {active && <ChevronRight size={16} className="ml-auto text-blue-400" />}
    </button>
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

  const calcOptions = [
    { id: 'pph21', label: 'PPh 21 Final', desc: 'Honor penelitian', color: 'blue', rate: '5%', icon: '👨‍🏫' },
    { id: 'pph23', label: 'PPh 23', desc: 'Jasa konsultan', color: 'green', rate: '2%', icon: '📋' },
    { id: 'pphfinal', label: 'PPh 4(2)', desc: 'DP/Angsuran', color: 'purple', rate: '2.5%', icon: '💰' },
  ]

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Kalkulator Pajak</h2>
            <p className="text-gray-500">Perhitungan otomatis berdasarkan regulasi terkini</p>
          </div>
        </div>

        {/* Calculator Options */}
        <div className="grid md:grid-cols-3 gap-3 mb-6">
          {calcOptions.map((calc) => (
            <button
              key={calc.id}
              onClick={() => { setActiveCalc(calc.id); setResult(null); setAmount('') }}
              className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                activeCalc === calc.id 
                  ? `border-${calc.color}-500 bg-${calc.color}-50 shadow-md` 
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm bg-white'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{calc.icon}</span>
                <h3 className={`font-bold text-${calc.color}-700`}>{calc.label}</h3>
              </div>
              <p className="text-sm text-gray-600">{calc.desc}</p>
              <span className="inline-block mt-2 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-semibold rounded">
                Tarif: {calc.rate}
              </span>
            </button>
          ))}
        </div>

        {/* Calculator Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nilai Bruto (Rp)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">Rp</span>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && calculate()}
                placeholder="Contoh: 10000000"
                className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-lg font-medium"
              />
            </div>
          </div>

          <button
            onClick={calculate}
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Hitung Pajak
          </button>

          {/* Results */}
          {result && (
            <div className="mt-6 space-y-3 animate-fadeIn">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-gray-600 font-medium">Nilai Bruto</span>
                <span className="font-bold text-lg text-gray-900">{formatRupiah(result.gross)}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-red-50 rounded-xl border border-red-100">
                <span className="text-red-700 font-medium">Pajak Dipotong ({activeCalc === 'pph21' ? '5%' : activeCalc === 'pph23' ? '2%' : '2.5%'})</span>
                <span className="font-bold text-lg text-red-600">-{formatRupiah(result.tax)}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                <span className="text-green-800 font-bold">Netto Diterima</span>
                <span className="font-bold text-xl text-green-700">{formatRupiah(result.netto)}</span>
              </div>
            </div>
          )}

          {/* Legal Reference */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p className="font-semibold text-blue-800 mb-1 text-sm">📚 Dasar Hukum:</p>
            {activeCalc === 'pph21' && <p className="text-sm text-blue-700">PMK 83/PMK.03/2021 - PPh 21 Final atas penghargaan penelitian (5%)</p>}
            {activeCalc === 'pph23' && <p className="text-sm text-blue-700">PP No. 94 Tahun 2010 - PPh 23 atas jasa penelitian (2%)</p>}
            {activeCalc === 'pphfinal' && <p className="text-sm text-blue-700">PP No. 55 Tahun 2022 - PPh Final atas DP/angsuran (2.5%)</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

// Export functions for DJP Online
function exportToCSV(formData: any, docType: string) {
  const npwpPemotong = "001234567890123"
  const namaPemotong = "UNIVERSITAS TERBUKA"
  const kodeObjek = docType === 'pph21' ? "21-100-01" : "23-100-01"
  const tarif = docType === 'pph21' ? 5 : 2
  const jumlahBruto = parseInt(formData.jumlah) || 0
  const pphDipotong = Math.round(jumlahBruto * (tarif / 100))
  const [bulan, tahun] = (formData.masa || "01/2026").split("/")
  
  const jenisPajak = docType === 'pph21' ? 'PPH21' : 'PPH23'
  const bln = bulan || "01"
  const thn = tahun || "2026"
  const defaultNomor = `001/${jenisPajak}/${bln}/${thn}`
  const nomorBukti = formData.nomor || defaultNomor
  const tanggalBukti = new Date().toISOString().split('T')[0]
  
  const csvContent = [
    "NPWP_Pemotong,Nama_Pemotong,NPWP_Penerima,Nama_Penerima,Kode_Objek_Pajak,Jumlah_Bruto,Tarif,PPh_Dipotong,Masa_Pajak,Tahun_Pajak,Nomor_Bukti_Potong,Tanggal_Bukti_Potong",
    `${npwpPemotong},${namaPemotong},${formData.npwp || "009876543210987"},${formData.nama || "NAMA PENERIMA"},${kodeObjek},${jumlahBruto},${tarif},${pphDipotong},${bln},${thn},${nomorBukti},${tanggalBukti}`
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
    <div className="flex-1 overflow-y-auto p-4 md:p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Generate Dokumen</h2>
            <p className="text-gray-500">Buat bukti pemotongan pajak format standar DJP</p>
          </div>
        </div>

        {/* Document Type Selection */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => { setDocType('pph21'); setGenerated(false) }}
              className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                docType === 'pph21' 
                  ? 'border-blue-500 bg-blue-50 shadow-md' 
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <h3 className={`font-bold ${docType === 'pph21' ? 'text-blue-700' : 'text-gray-700'}`}>
                Bukti Potong PPh 21 Final
              </h3>
              <p className="text-sm text-gray-600 mt-1">Form A1 - Honor penelitian (5%)</p>
            </button>
            <button
              onClick={() => { setDocType('pph23'); setGenerated(false) }}
              className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                docType === 'pph23' 
                  ? 'border-green-500 bg-green-50 shadow-md' 
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <h3 className={`font-bold ${docType === 'pph23' ? 'text-green-700' : 'text-gray-700'}`}>
                Bukti Potong PPh 23
              </h3>
              <p className="text-sm text-gray-600 mt-1">Jasa konsultan/penelitian (2%)</p>
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nama Penerima *</label>
                <input
                  type="text"
                  value={formData.nama}
                  onChange={(e) => setFormData({...formData, nama: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Nama lengkap penerima"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">NPWP (opsional)</label>
                <input
                  type="text"
                  value={formData.npwp}
                  onChange={(e) => setFormData({...formData, npwp: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="00.000.000.0-000.000"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Jumlah Bruto (Rp) *</label>
                <input
                  type="text"
                  value={formData.jumlah}
                  onChange={(e) => setFormData({...formData, jumlah: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="10000000"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Masa Pajak (Bulan/Tahun)</label>
                <input
                  type="text"
                  value={formData.masa}
                  onChange={(e) => setFormData({...formData, masa: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="01/2026"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">No. SPK/Kontrak (opsional)</label>
              <input
                type="text"
                value={formData.nomor}
                onChange={(e) => setFormData({...formData, nomor: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Nomor dokumen pendukung"
              />
            </div>

            <button
              onClick={generateDoc}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Sparkles size={18} />
              Generate Dokumen
            </button>
          </div>

          {/* Generated Document Preview */}
          {generated && (
            <div className="mt-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl animate-fadeIn">
              <div className="flex items-center gap-2 text-green-700 mb-4">
                <Sparkles className="w-5 h-5" />
                <span className="font-bold">Dokumen berhasil digenerate!</span>
              </div>
              
              {/* Preview Card */}
              <div className="bg-white p-5 rounded-xl border border-gray-200 mb-4 shadow-sm">
                <div className="border-b-2 border-gray-800 pb-3 mb-4">
                  <h4 className="font-bold text-center text-gray-900 text-lg">
                    BUKTI PEMOTONGAN {docType === 'pph21' ? 'PPh 21 Final' : 'PPh 23'}
                  </h4>
                  <p className="text-center text-xs text-gray-500 mt-1">UNIVERSITAS TERBUKA</p>
                </div>
                
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-600">Nama Penerima</span>
                    <span className="font-semibold text-gray-900">{formData.nama || '[Nama Penerima]'}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-600">NPWP</span>
                    <span className="font-medium font-mono">{formData.npwp || '-'}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-600">Jumlah Bruto</span>
                    <span className="font-semibold">
                      Rp {parseInt(formData.jumlah || '0').toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-600">Tarif Pajak</span>
                    <span className="font-semibold">{docType === 'pph21' ? '5%' : '2%'}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-600">PPh Dipotong</span>
                    <span className="font-bold text-red-600">
                      Rp {Math.round(parseInt(formData.jumlah || '0') * (docType === 'pph21' ? 0.05 : 0.02)).toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-gray-900 font-bold">Jumlah Netto</span>
                    <span className="font-bold text-lg text-green-600">
                      Rp {Math.round(parseInt(formData.jumlah || '0') * (docType === 'pph21' ? 0.95 : 0.98)).toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Export Buttons */}
              <div className="flex gap-2 flex-wrap">
                <button 
                  onClick={() => exportToCSV(formData, docType)}
                  className="flex-1 min-w-[120px] py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg"
                >
                  <Download size={16} />
                  Export CSV (DJP)
                </button>
                <button 
                  onClick={() => exportToJSON(formData, docType)}
                  className="flex-1 min-w-[120px] py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg"
                >
                  <FileJson size={16} />
                  Export JSON
                </button>
                <button 
                  onClick={() => window.print()}
                  className="flex-1 min-w-[120px] py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-1.5"
                >
                  <Printer size={16} />
                  Print
                </button>
              </div>
              
              {/* Important Notice */}
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-xs text-yellow-800 leading-relaxed">
                  <strong>⚠️ Penting:</strong> File CSV ini siap di-import ke DJP Online (e-Bupot). 
                  Login ke <a href="https://djponline.pajak.go.id" target="_blank" rel="noopener noreferrer" className="underline font-semibold text-yellow-900">djponline.pajak.go.id</a> → e-Bupot → Import CSV.
                  Bukti potong resmi hanya dapat diterbitkan oleh DJP.
                </p>
              </div>

              <p className="text-xs text-gray-500 mt-3 text-center">
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
      desc: 'PPh 21 atas penghargaan/imbalan penelitian - Tarif final 5%',
      category: 'PPh 21 Final',
      year: '2021',
      icon: '👨‍🏫'
    },
    {
      title: 'PMK 90/PMK.03/2020',
      desc: 'PPh 21 pegawai negeri sipil dan anggota TNI/Polri',
      category: 'PPh 21',
      year: '2020',
      icon: '👔'
    },
    {
      title: 'PP No. 94 Tahun 2010',
      desc: 'Penghasilan yang dipotong PPh 23 - Jasa penelitian 2%',
      category: 'PPh 23',
      year: '2010',
      icon: '📋'
    },
    {
      title: 'PP No. 49 Tahun 2022',
      desc: 'Fasilitas PPN untuk R&D - PPN DTP (Ditanggung Pemerintah)',
      category: 'PPN',
      year: '2022',
      icon: '🏛️'
    },
    {
      title: 'PP No. 55 Tahun 2022',
      desc: 'PPh Final atas DP/Angsuran - Tarif 2.5%',
      category: 'PPh Final',
      year: '2022',
      icon: '💰'
    },
    {
      title: 'PMK 32/PMK.03/2024',
      desc: 'Biaya perjalanan dinas dalam negeri - SPPD',
      category: 'Perjalanan Dinas',
      year: '2024',
      icon: '✈️'
    },
  ]

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Basis Pengetahuan</h2>
            <p className="text-gray-500">Regulasi perpajakan untuk kegiatan akademik</p>
          </div>
        </div>

        {/* Regulations Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {regulations.map((reg, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 hover:shadow-lg hover:border-blue-200 transition-all duration-200 group">
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{reg.icon}</span>
                <span className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-lg">
                  {reg.year}
                </span>
              </div>
              <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-md mb-2">
                {reg.category}
              </span>
              <h3 className="font-bold text-gray-900 mb-1 text-lg">{reg.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{reg.desc}</p>
              <button className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                Baca selengkapnya <ChevronRight size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl">
          <h3 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
            <Info size={18} />
            Disclaimer Penting
          </h3>
          <p className="text-sm text-yellow-700 leading-relaxed">
            AI Advisory ini menyediakan informasi berdasarkan regulasi perpajakan yang berlaku. 
            Namun, untuk keputusan penting atau kasus kompleks, selalu konsultasikan dengan:
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-yellow-700">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full"></span>
              Bagian Keuangan Universitas Terbuka
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full"></span>
              Konsultan Pajak resmi
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full"></span>
              KPP (Kantor Pelayanan Pajak) terdekat
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full"></span>
              Direktorat Jenderal Pajak (DJP)
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Update terakhir: Januari 2026 | Sumber: DJP, Kemenkeu
          </p>
        </div>
      </div>
    </div>
  )
}
