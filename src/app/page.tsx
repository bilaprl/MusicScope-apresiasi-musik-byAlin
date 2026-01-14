"use client";

import React, { useState, useRef } from "react";

// --- Types ---
type AppStep =
  | "SPLASH"
  | "MENU"
  | "INTRO"
  | "IDENTIFY"
  | "EXPLORE"
  | "ANALYZE"
  | "DISCUSSION"
  | "REFLECTION"
  | "QUIZ"
  | "GALLERY"
  | "REPORT";

export default function MusicScopeApp() {
  const [currentStep, setCurrentStep] = useState<AppStep>("SPLASH");
  const [showProfile, setShowProfile] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [showAnalyzeToast, setShowAnalyzeToast] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]); // Menyimpan input teks refleksi siswa

  // --- DATA DI LUAR KOMPONEN UTAMA ---

  const videoDataList = [
    {
      id: "v1",
      title: "Gamelan Jawa: Kebo Giro",
      region: "Jawa Tengah",
      genre: "Tradisional",
      url: "https://www.youtube.com/embed/vNhPgGRJdzk?si",
      thumbnail:
        "https://i.ytimg.com/vi/vNhPgGRJdzk/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCvl9dnU3DLuAghx0MyVjJ31jMgUA",
    },
    {
      id: "v2",
      title: "Sape Kalimantan: Spirit",
      region: "Kalimantan",
      genre: "World Music",
      url: "https://www.youtube.com/embed/HkJXJk_fK3s?si",
      thumbnail:
        "https://i.ytimg.com/vi/HkJXJk_fK3s/hq720.jpg?sqp=-oaymwFBCNAFEJQDSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AH-CYAC0AWKAgwIABABGDIgZSglMA8=&rs=AOn4CLD_3WOQd-A-12z0OUT47VqlrIev5Q",
    },
    {
      id: "v3",
      title: "Angklung Udjo",
      region: "Jawa Barat",
      genre: "Bambu Ensemble",
      url: "https://www.youtube.com/embed/2hhzmcHC2HY?si",
      thumbnail:
        "https://i.ytimg.com/vi/2hhzmcHC2HY/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLD9PBSxoarPBBn7pBQRDaiUqCsxKA",
    },
  ];

  const traitOptions = [
    "Ritme Dinamis",
    "Melodi Pentatonis",
    "Harmoni Kompleks",
    "Tempo Cepat",
    "Instrumen Akustik",
    "Vokal Dominan",
    "Tempo Lambat",
    "Pola Repetitif",
  ];

  // Ganti semua activeVideo yang ada jadi baris ini saja:
  const [activeVideo, setActiveVideo] = useState<any>(videoDataList[0]);

  const videoSectionRef = useRef<HTMLDivElement>(null);

  const [selectedInstrument, setSelectedInstrument] = useState<any>(null);

  const handleVideoSelect = (videoInput: any) => {
    // Jika inputnya cuma link (string), kita bungkus jadi objek biar seragam
    if (typeof videoInput === "string") {
      setActiveVideo({ url: videoInput });
    } else {
      setActiveVideo(videoInput);
    }

    // Scroll tetap jalan
    setTimeout(() => {
      videoSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };
  const navigate = (step: AppStep) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentStep(step);
  };

  // Di dalam export default function MusicScopeApp() { ...

  const [note, setNote] = useState(""); // Menyimpan isi tulisan siswa
  const [isSaved, setIsSaved] = useState(false); // Mengatur munculnya pesan "Tersimpan"
  const [isSaving, setIsSaving] = useState(false); // Mengatur status loading tombol

  const handleSaveNote = () => {
    if (!note.trim()) return; // Jangan jalankan jika teks kosong

    setIsSaving(true);

    // Simulasi proses menyimpan data (1.5 detik)
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);

      // Sembunyikan notifikasi sukses setelah 3 detik
      setTimeout(() => {
        setIsSaved(false);
      }, 3000);
    }, 1500);
  };

  // Di bagian atas fungsi MusicScopeApp
  const exploreDetailRef = useRef<HTMLDivElement>(null);

  // Fungsi khusus untuk handle klik kartu
  const handleInstrumentSelect = (inst: any) => {
    setSelectedInstrument(inst);

    // Berikan sedikit delay agar elemen detail sempat merender sebelum di-scroll
    setTimeout(() => {
      exploreDetailRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  // DEFINE INI SEKALI SAJA DI LUAR KOMPONEN UTAMA
  const colorMap = {
    amber: {
      header: "from-amber-500 to-amber-600",
      iconBg: "bg-amber-100",
      iconText: "text-amber-600",
      dot: "bg-amber-500",
      cardBorder: "border-amber-500",
      cardBg: "bg-amber-50/50",
    },
    emerald: {
      header: "from-emerald-500 to-emerald-600",
      iconBg: "bg-emerald-100",
      iconText: "text-emerald-600",
      dot: "bg-emerald-500",
      cardBorder: "border-emerald-500",
      cardBg: "bg-emerald-50/50",
    },
    orange: {
      header: "from-orange-500 to-orange-600",
      iconBg: "bg-orange-100",
      iconText: "text-orange-600",
      dot: "bg-orange-500",
      cardBorder: "border-orange-500",
      cardBg: "bg-orange-50/50",
    },
    indigo: {
      header: "from-indigo-500 to-indigo-600",
      iconBg: "bg-indigo-100",
      iconText: "text-indigo-600",
      dot: "bg-indigo-500",
      cardBorder: "border-indigo-500",
      cardBg: "bg-indigo-50/50",
    },
    rose: {
      header: "from-rose-500 to-rose-600",
      iconBg: "bg-rose-100",
      iconText: "text-rose-600",
      dot: "bg-rose-500",
      cardBorder: "border-rose-500",
      cardBg: "bg-rose-50/50",
    },
    slate: {
      header: "from-slate-500 to-slate-600",
      iconBg: "bg-slate-100",
      iconText: "text-slate-600",
      dot: "bg-slate-500",
      cardBorder: "border-slate-500",
      cardBg: "bg-slate-50/50",
    },
  };
  const instrumentsData = [
    {
      id: 1,
      name: "Gamelan",
      type: "Tradisional",
      icon: "library_music",
      color: "amber",
      img: "https://i.pinimg.com/736x/4e/59/9c/4e599ceb8b3c3a40b7bc42d3b308fd31.jpg",
      ritme:
        "Menggunakan sistem siklus kolotomik di mana instrumen besar seperti Gong menandai akhir siklus panjang, sementara instrumen kecil seperti Kendhang mengatur tempo dan dinamika permainan yang fluktuatif (Irama).",
      melodi:
        "Dibangun berdasarkan tangga nada laras Slendro (5 nada) dan Pelog (7 nada). Melodi utama dibawakan oleh Balungan (Saron/Demung) yang kemudian dikembangkan secara variatif oleh instrumen Bonang dan Rebab.",
      timbre:
        "Memiliki karakter suara metalik yang resonan karena dominasi bahan perunggu dan tembaga. Suaranya kaya akan 'beating' atau getaran halus yang tercipta dari pasangan pencon yang disetel sedikit berbeda.",
      fungsi:
        "Berfungsi sebagai sarana upacara ritual keagamaan, pengiring pertunjukan wayang, hingga tari keraton. Gamelan juga menjadi medium meditasi bagi para pemainnya melalui keselarasan suara.",
      konteks:
        "Representasi filosofi gotong-royong dan harmoni masyarakat Jawa. Gamelan tidak dimainkan secara solo, melainkan kolektif, mencerminkan pentingnya kebersamaan di atas ego individu.",
    },
    {
      id: 2,
      name: "Angklung",
      type: "Tradisional",
      icon: "nature",
      color: "emerald",
      img: "https://i.pinimg.com/736x/ce/52/4c/ce524c886aa3a2a408875ac15ac43c4e.jpg",
      ritme:
        "Dihasilkan melalui teknik getaran (curulung) atau sentakan (centok). Pola ritmenya seringkali berbentuk ostinato atau pengulangan terus menerus yang membentuk jalinan suara interlocking (saling mengisi).",
      melodi:
        "Satu unit angklung hanya menghasilkan satu nada. Melodi tercipta melalui teknik 'Hocketing' di mana setiap pemain bertanggung jawab atas satu nada dan harus membunyikannya tepat pada urutan melodi tertentu.",
      timbre:
        "Memiliki warna suara kayu yang berongga (hollow), ringan, dan jernih. Frekuensi resonansi bambu memberikan kesan alami yang hangat namun tetap tajam saat dimainkan dalam kelompok besar.",
      fungsi:
        "Dahulu digunakan sebagai penggugah semangat dalam kegiatan pertanian (penghormatan Dewi Sri). Kini berkembang menjadi media pendidikan musik masif dan diplomasi kebudayaan internasional.",
      konteks:
        "Berasal dari tanah Sunda, Angklung mencerminkan identitas masyarakat agraris yang menghargai alam. Angklung diakui UNESCO sebagai warisan budaya karena nilai kerja sama tim yang mutlak diperlukan.",
    },
    {
      id: 3,
      name: "Sape",
      type: "Tradisional",
      icon: "park",
      color: "orange",
      img: "https://i.pinimg.com/736x/6e/32/7d/6e327d3e65df63d56866dfb3282fb34a.jpg",
      ritme:
        "Ritme Sape cenderung stabil dan repetitif, mengandalkan pola petikan jari yang konstan untuk menciptakan suasana meditatif. Sering menggunakan teknik drone (nada rendah tetap) sebagai alas ritmik.",
      melodi:
        "Melodinya bersifat pentatonis namun sangat ekspresif dengan teknik 'slurring' atau menggeser jari pada senar. Melodi biasanya meniru suara-suara alam seperti kicauan burung atau aliran sungai.",
      timbre:
        "Karakter suaranya sangat khas; petikan senar baja di atas kayu Adau menghasilkan suara yang denting, jernih, dan memiliki sustain (dengung) yang panjang layaknya musik spiritual.",
      fungsi:
        "Digunakan dalam upacara penyembuhan (belian) oleh suku Dayak dan hiburan rakyat. Suaranya dipercaya dapat membawa ketenangan dan menghubungkan manusia dengan arwah nenek moyang.",
      konteks:
        "Alat musik ini adalah jiwa dari suku Dayak Kalimantan. Ornamen ukiran pada badan Sape bukan sekadar hiasan, melainkan simbol sejarah, status sosial, dan filosofi hubungan manusia dengan hutan.",
    },
    {
      id: 4,
      name: "Synthesizer",
      type: "Modern",
      icon: "graphic_eq",
      color: "indigo",
      img: "https://i.pinimg.com/736x/1a/d5/12/1ad51254ef1e462935da646ebc6b699f.jpg",
      ritme:
        "Ritme dapat diprogram secara presisi menggunakan sequencer atau arpeggiator. Mampu menghasilkan pola ritmik yang mustahil dimainkan tangan manusia dengan akurasi matematis yang sempurna.",
      melodi:
        "Mampu menjelajahi rentang nada yang sangat luas, dari frekuensi infrasonik hingga ultrasonik. Melodi dapat dimodifikasi secara real-time menggunakan pitch bend, modulasi, dan filter suara.",
      timbre:
        "Warna suaranya tidak terbatas. Bisa meniru suara alami atau menciptakan suara 'alien' yang sepenuhnya baru melalui manipulasi gelombang (Sine, Sawtooth, Square) dan pemrosesan sinyal digital.",
      fungsi:
        "Instrumen utama dalam produksi musik modern, EDM, scoring film, dan eksperimen bunyi. Berperan besar dalam menciptakan atmosfer futuristik dan modernitas dalam sebuah karya musik.",
      konteks:
        "Representasi dari revolusi industri musik dan globalisasi teknologi. Synthesizer mencerminkan bagaimana manusia menggunakan mesin untuk mengekspresikan emosi seni di era digital.",
    },
    {
      id: 5,
      name: "Electric Guitar",
      type: "Modern",
      icon: "headphones",
      color: "rose",
      img: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=300",
      ritme:
        "Mengandalkan teknik 'strumming' atau 'palm muting' untuk menciptakan ritme yang perkusi. Dalam musik rock, ritme gitar (riff) seringkali menjadi identitas utama dari sebuah lagu.",
      melodi:
        "Dikenal sangat fleksibel dalam membawakan melodi solo melalui teknik bending, vibrato, dan tapping. Penggunaan skala blues, pentatonis, hingga modal sangat umum dalam instrumen ini.",
      timbre:
        "Sangat tergantung pada efek pedal dan amplifier. Bisa terdengar bersih (clean), pecah (overdrive), hingga sangat kasar (distortion). Pick-up magnetik memberikan sustain yang sangat lama.",
      fungsi:
        "Menjadi ikon utama musik populer seperti Rock, Blues, Jazz, dan Pop. Berfungsi baik sebagai pengisi harmoni maupun sebagai bintang utama (lead instrument) dalam sebuah band.",
      konteks:
        "Muncul dari kebutuhan akan volume yang lebih keras di era Big Band. Gitar elektrik menjadi simbol pemberontakan masa muda, kebebasan berekspresi, dan perkembangan budaya pop Barat.",
    },
    {
      id: 6,
      name: "Drum Kit",
      type: "Modern",
      icon: "audiotrack",
      color: "slate",
      img: "https://images.unsplash.com/photo-1543443258-92b04ad5ec6b?w=300",
      ritme:
        "Merupakan jantung dari musik modern. Pola ritme dibentuk melalui koordinasi empat anggota tubuh (tangan dan kaki) untuk memainkan snare, kick, hi-hat, dan simbal dalam satu alur (groove).",
      melodi:
        "Walaupun dikategorikan sebagai instrumen tak bernada (unpitched), variasi ukuran drum (tom-tom) memungkinkan pemain menciptakan kontur nada rendah ke tinggi yang membentuk pola melodik.",
      timbre:
        "Sangat kompleks; mulai dari dentuman rendah (thump) dari kick drum, suara tajam (crack) dari snare, hingga suara desis (sizzle) yang kaya frekuensi tinggi dari simbal.",
      fungsi:
        "Berfungsi sebagai penjaga tempo (timekeeper) dan pengatur dinamika dalam ansambel musik modern. Memberikan pondasi energi dan 'nyawa' ritmik bagi instrumen lainnya.",
      konteks:
        "Evolusi dari berbagai perkusi militer dan etnis yang digabungkan menjadi satu set praktis. Mencerminkan efisiensi era modern di mana satu orang bisa memainkan peran banyak pemain perkusi.",
    },
  ];

  const [userAnalysis, setUserAnalysis] = useState("");
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);

  const handleTraitToggle = (val: string) => {
    setSelectedTraits((prev) =>
      prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val]
    );
  };

  const [selectedMood, setSelectedMood] = useState("");
  const [reflectionText, setReflectionText] = useState("");
  const [hasAudio, setHasAudio] = useState(false); // Untuk cek apakah ada rekaman
  const [reflectionSaved, setReflectionSaved] = useState(false);

  // Kalimat interaktif berdasarkan mood
  const moodFeedback: { [key: string]: string } = {
    happy:
      "Wah, senang mendengarnya! Musik memang punya kekuatan untuk menceriakan hari.",
    inspired:
      "Luar biasa! Semoga inspirasi musikal ini membawamu ke karya yang hebat.",
    neutral:
      "Terima kasih sudah berbagi. Apakah ada bagian musik tertentu yang membuatmu penasaran?",
    confused:
      "Tidak apa-apa, belajar seni memang butuh proses. Bagian mana yang paling sulit?",
  };

  // State untuk Audio Fungsional
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  // Fungsi Mulai Rekam
  const startRecording = async () => {
    audioChunksRef.current = [];
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) audioChunksRef.current.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
    };

    mediaRecorder.start();
    mediaRecorderRef.current = mediaRecorder;
    setIsRecording(true);
  };

  // Fungsi Berhenti Rekam
  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  // Fungsi Putar/Pause
  const togglePlay = () => {
    if (audioPlayerRef.current) {
      if (isPlaying) {
        audioPlayerRef.current.pause();
      } else {
        audioPlayerRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Fungsi Hapus
  const deleteAudio = () => {
    setAudioUrl(null);
    setIsPlaying(false);
  };

  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [quizOver, setQuizOver] = useState(false);

  const handleResetQuiz = () => {
    setCurrentQ(0);
    setSelectedOpt(null);
    setIsCorrect(null);
    setScore(0);
    setQuizOver(false);
  };

  const quizData = [
    {
      q: "Manakah instrumen musik tradisional Nusantara yang dimainkan dengan cara digesek?",
      options: ["Angklung", "Rebab", "Suling", "Kendang"],
      ans: 1, // Rebab
    },
    {
      q: "Musik Gamelan mengutamakan harmoni dan kerja sama, hal ini mencerminkan nilai budaya...",
      options: ["Individualisme", "Persaingan", "Gotong Royong", "Kecepatan"],
      ans: 2, // Gotong Royong
    },
    {
      q: "Alat musik Sasando berasal dari daerah NTT (Nusa Tenggara Timur). Benar atau Salah?",
      options: ["Benar", "Salah"],
      ans: 0, // Benar
    },
    {
      q: "Instrumen perkusi yang terbuat dari bambu dan dibunyikan dengan cara digoyangkan adalah...",
      options: ["Kolintang", "Calung", "Angklung", "Tifa"],
      ans: 2, // Angklung
    },
    {
      q: "Lagu 'Lir Ilir' dari Jawa Tengah menggunakan tangga nada pentatonis. Benar atau Salah?",
      options: ["Benar", "Salah"],
      ans: 0, // Benar
    },
    {
      q: "Teknik bernyanyi dengan suara tinggi yang dilakukan oleh penyanyi wanita pada musik Gamelan disebut...",
      options: ["Nyinden", "Mamaca", "Macapat", "Sindenan"],
      ans: 0, // Nyinden
    },
    {
      q: "Alat musik Tifa yang berasal dari Papua dan Maluku dimainkan dengan cara...",
      options: ["Dipetik", "Ditiup", "Digesek", "Dipukul"],
      ans: 3, // Dipukul
    },
    {
      q: "Musik Keroncong merupakan akulturasi budaya antara Indonesia dengan bangsa...",
      options: ["Belanda", "Inggris", "Portugis", "Spanyol"],
      ans: 2, // Portugis
    },
    {
      q: "Tangga nada yang hanya terdiri dari lima nada pokok disebut tangga nada Diatonis. Benar atau Salah?",
      options: ["Benar", "Salah"],
      ans: 1, // Salah (Seharusnya Pentatonis)
    },
    {
      q: "Salah satu fungsi musik tradisional dalam masyarakat adalah sebagai sarana upacara adat. Benar atau Salah?",
      options: ["Benar", "Salah"],
      ans: 0, // Benar
    },
  ];

  const [filterWilayah, setFilterWilayah] = useState("Semua");
  const [filterGenre, setFilterGenre] = useState("Semua");

  const listGaleri = [
    {
      id: "4KvcglSOVAY",
      title: "Sasando NTT",
      wilayah: "Nusantara",
      genre: "Tradisional",
      thumb: "https://img.youtube.com/vi/4KvcglSOVAY/mqdefault.jpg",
    },
    {
      id: "D7_gjCwwLOA",
      title: "Gamelan Bali",
      wilayah: "Nusantara",
      genre: "Tradisional",
      thumb: "https://img.youtube.com/vi/D7_gjCwwLOA/mqdefault.jpg",
    },
    {
      id: "TWHVD-DSMpc",
      title: "Angklung Orchestra",
      wilayah: "Nusantara",
      genre: "Orkestra",
      thumb: "https://img.youtube.com/vi/TWHVD-DSMpc/mqdefault.jpg",
    },
    {
      id: "qEERrx3-9Es",
      title: "Kolintang Sulut",
      wilayah: "Nusantara",
      genre: "Tradisional",
      thumb: "https://img.youtube.com/vi/qEERrx3-9Es/mqdefault.jpg",
    },
    {
      id: "i_D48jBf_b4",
      title: "Keroncong Asli",
      wilayah: "Nusantara",
      genre: "Folk",
      thumb: "https://img.youtube.com/vi/i_D48jBf_b4/mqdefault.jpg",
    },
    // Tambahan 10 Musik Tradisional & World Music Indonesia
    {
      id: "D8FLI4btgvI?si",
      title: "Sape Kalimantan",
      wilayah: "Nusantara",
      genre: "Tradisional",
      thumb:
        "https://i.ytimg.com/vi/D8FLI4btgvI/hqdefault.jpg?sqp=-oaymwEnCOADEI4CSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBFCGbxbWT2N8OqHWklqMGJ6sk4Ww",
    },
    {
      id: "gQuCsHvLdbQ?si",
      title: "Saluang Minang",
      wilayah: "Nusantara",
      genre: "Tradisional",
      thumb:
        "https://i.ytimg.com/vi/gQuCsHvLdbQ/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLD8K0mlWBqF9b11pvMNj5kLzQJhpg",
    },
    {
      id: "Ogs3S7ZdRxs?si",
      title: "Gandrung Banyuwangi",
      wilayah: "Nusantara",
      genre: "Tradisional",
      thumb:
        "https://i.ytimg.com/vi/Ogs3S7ZdRxs/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDBBHW1eZxxmB0tC5j_ONJORPXMCg",
    },
    {
      id: "3xLA-_ln1Gg?si",
      title: "Saman Aceh",
      wilayah: "Nusantara",
      genre: "Tradisional",
      thumb:
        "https://i.ytimg.com/vi/3xLA-_ln1Gg/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCUrdbkEpe-udrzLr9q65lAY6Ey1A",
    },

    {
      id: "T1tDorodPbM?si",
      title: "Alffy Rev - Nusantara",
      wilayah: "Nusantara",
      genre: "Orkestra",
      thumb:
        "https://i.ytimg.com/vi/T1tDorodPbM/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDnOS8xfngHW2mprs8thTds0Fyjyg",
    },
    {
      id: "I6YTInWoqpQ?si",
      title: "Karinding Sunda",
      wilayah: "Nusantara",
      genre: "Tradisional",
      thumb:
        "https://i.ytimg.com/vi/I6YTInWoqpQ/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBH0gsW4XfxlCI6X4KKbOOz0aB8Vg",
    },

    {
      id: "wq1boyNFVqk?si",
      title: "Orkestra Jawa",
      wilayah: "Nusantara",
      genre: "Orkestra",
      thumb:
        "https://i.ytimg.com/vi/wq1boyNFVqk/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLChD2qag6t5mo264601-NoSK5uY_w",
    },
  ];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Sertifikat MusicScope",
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback jika browser tidak support (PC lama/Browser tertentu)

      alert("Link berhasil disalin ke clipboard!");
    }
  };

  const galeriFiltered = listGaleri.filter((item) => {
    return filterGenre === "Semua" || item.genre === filterGenre;
  });

  return (
    <main className="min-h-screen flex flex-col bg-slate-50/50 pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]">
      {/* 1. SPLASH SCREEN */}
      {currentStep === "SPLASH" && (
        <section className="relative min-h-screen md:h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#FFF5F7] via-[#F0F7FF] to-[#F5F3FF] overflow-hidden pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
          {/* Background Decorations - Dibuat lebih kecil di mobile agar tidak menumpuk */}
          <div className="absolute top-[-5%] left-[-10%] w-48 h-48 md:w-72 md:h-72 bg-rose-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-[-5%] right-[-10%] w-64 h-64 md:w-96 md:h-96 bg-soft-blue/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

          <div className="relative z-10 flex flex-col items-center p-6 text-center max-w-lg w-full">
            {/* Container Logo - Responsif iPhone/Android */}
            <div className="relative mb-6 md:mb-10 group">
              <div className="absolute inset-0 bg-rose-pink/20 rounded-full blur-2xl group-hover:bg-rose-pink/40 transition duration-700"></div>
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full border-4 md:border-8 border-white shadow-2xl overflow-hidden transition-transform duration-500 hover:scale-105">
                <img
                  src="https://i.pinimg.com/1200x/dd/41/b2/dd41b23f0982f76136dd083a3c927b67.jpg"
                  alt="Music Scope Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 bg-white w-10 h-10 md:w-14 md:h-14 rounded-full shadow-xl flex items-center justify-center border-2 md:border-4 border-slate-50 animate-bounce">
                <span className="material-icons text-rose-pink text-lg md:text-2xl">
                  headphones
                </span>
              </div>
            </div>

            {/* Typography - Ukuran teks dinamis */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-3 tracking-tighter text-slate-800">
              Music<span className="text-rose-pink">Scope</span>
            </h1>
            <p className="text-slate-500 text-sm sm:text-base md:text-lg mb-8 md:mb-12 font-medium leading-relaxed max-w-[280px] sm:max-w-xs md:max-w-md">
              Eksplorasi harmoni musik nusantara dan dunia dalam satu aplikasi
              interaktif.
            </p>

            {/* Action Buttons - Diperlebar untuk jempol pengguna mobile */}
            <div className="flex flex-col gap-3 md:gap-4 w-full max-w-sm px-4 md:px-0">
              <button
                onClick={() => navigate("MENU")}
                className="bg-rose-pink hover:bg-pink-600 text-white py-4 md:py-5 px-10 rounded-2xl font-bold shadow-xl shadow-rose-200 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 text-base md:text-lg"
              >
                Mulai Belajar{" "}
                <span className="material-icons">play_circle_filled</span>
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  className="flex items-center justify-center gap-2 bg-white/70 backdrop-blur-md border border-slate-200 text-slate-600 py-3 md:py-4 rounded-2xl text-xs md:text-sm font-bold hover:bg-white hover:text-rose-pink transition-all shadow-sm active:scale-95"
                  onClick={() => setShowProfile(true)}
                >
                  <span className="material-icons text-sm">person</span> Profil
                </button>
                <button
                  className="flex items-center justify-center gap-2 bg-white/70 backdrop-blur-md border border-slate-200 text-slate-600 py-3 md:py-4 rounded-2xl text-xs md:text-sm font-bold hover:bg-white hover:text-soft-blue transition-all shadow-sm active:scale-95"
                  onClick={() => setShowGuide(true)}
                >
                  <span className="material-icons text-sm">menu_book</span>{" "}
                  Panduan
                </button>
              </div>
            </div>

            {/* Label Footer - Diberi margin bottom agar tidak terpotong Home Bar iPhone */}
            <div className="mt-12 md:mt-16 opacity-40 mb-4 md:mb-0">
              <p className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-black text-slate-500">
                Digital Deep Learning
              </p>
            </div>
          </div>
        </section>
      )}

      {/* --- MODAL PROFIL --- */}
      {showProfile && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden relative">
            <button
              onClick={() => setShowProfile(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-800"
            >
              <span className="material-icons">close</span>
            </button>
            <div className="bg-gradient-to-r from-rose-pink to-pink-400 h-32 w-full"></div>
            <div className="px-8 pb-10">
              <div className="relative -mt-16 mb-4">
                <div className="w-28 h-28 rounded-3xl border-4 border-white shadow-lg bg-slate-200 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200"
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-black text-slate-800">
                Siswa Kelas X
              </h3>
              <p className="text-rose-pink font-bold text-sm mb-6 uppercase tracking-widest">
                Apresiator Pemula
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                  <span className="material-icons text-soft-blue">stars</span>
                  <div className="text-left">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">
                      Pencapaian
                    </p>
                    <p className="text-sm font-bold">3 Modul Selesai</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                  <span className="material-icons text-amber-400">
                    emoji_events
                  </span>
                  <div className="text-left">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">
                      Skor Kuis Terbaik
                    </p>
                    <p className="text-sm font-bold">95 Poin</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL PANDUAN --- */}
      {showGuide && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl p-8 relative overflow-y-auto max-h-[80vh]">
            <button
              onClick={() => setShowGuide(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-800"
            >
              <span className="material-icons">close</span>
            </button>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-soft-blue/10 rounded-2xl flex items-center justify-center text-soft-blue">
                <span className="material-icons">auto_stories</span>
              </div>
              <h3 className="text-2xl font-black">Panduan Belajar</h3>
            </div>

            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Pilih Modul",
                  desc: "Masuk ke menu utama dan pilih salah satu dari 8 langkah apresiasi.",
                },
                {
                  step: "2",
                  title: "Amati & Analisis",
                  desc: "Tonton video pertunjukan musik dan isi lembar analisis yang tersedia.",
                },
                {
                  step: "3",
                  title: "Diskusi & Refleksi",
                  desc: "Bagikan pendapatmu di forum diskusi dan catat perasaanmu di jurnal.",
                },
                {
                  step: "4",
                  title: "Kuis & Sertifikat",
                  desc: "Uji pemahamanmu dengan kuis interaktif dan dapatkan sertifikat kelulusan.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-rose-pink text-white flex items-center justify-center font-bold text-sm">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{item.title}</h4>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowGuide(false)}
              className="w-full mt-10 bg-slate-800 text-white py-4 rounded-2xl font-bold"
            >
              Saya Mengerti
            </button>
          </div>
        </div>
      )}

      {/* 2. MENU UTAMA */}
      {currentStep === "MENU" && (
        <section className="min-h-screen animate-fadeIn max-w-7xl mx-auto relative flex flex-col">
          {/* Header Section dengan Extra Top Padding untuk iPhone Notch */}
          <header className="pt-10 pb-6 px-6 md:pt-16 md:pb-10 md:px-12 relative z-10">
            <div className="flex items-center gap-4">
              {/* Foto Profil Minimalis */}
              <div
                className="relative group cursor-pointer"
                onClick={() => setCurrentStep("SPLASH")}
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-tr from-rose-pink to-orange-400 p-[2px] shadow-lg transform group-hover:scale-110 transition-all duration-300">
                  <div className="w-full h-full rounded-[14px] bg-white overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200"
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
              </div>

              {/* Branding Area */}
              <div
                className="cursor-pointer group"
                onClick={() => setCurrentStep("SPLASH")}
              >
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tighter group-hover:text-rose-pink transition-colors">
                    Music
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-pink to-indigo-600">
                      Scope
                    </span>
                  </h2>
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-none mt-1">
                  Apresiasi Musik
                </p>
              </div>
            </div>
          </header>

          {/* Body Konten: Grid Card */}
          <div className="px-6 md:px-12 pb-24">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 relative z-10">
              {[
                {
                  id: "INTRO",
                  title: "Intro",
                  icon: "auto_stories",
                  color: "from-pink-100 to-rose-200 text-rose-950",
                  pattern:
                    "bg-[radial-gradient(circle_at_1px_1px,#e11d4822_1px,transparent_0)] [background-size:12px_12px]",
                  desc: "Awal perjalanan",
                },
                {
                  id: "IDENTIFY",
                  title: "Identifikasi",
                  icon: "search",
                  color: "from-blue-100 to-indigo-200 text-indigo-950",
                  pattern:
                    "bg-[linear-gradient(45deg,#4f46e522_25%,transparent_25%,transparent_50%,#4f46e522_50%,#4f46e522_75%,transparent_75%,transparent)] [background-size:20px_20px]",
                  desc: "Kenali genre",
                },
                {
                  id: "EXPLORE",
                  title: "Eksplorasi",
                  icon: "explore",
                  color: "from-orange-100 to-amber-200 text-amber-950",
                  pattern:
                    "bg-[repeating-linear-gradient(-45deg,#d9770622_0,#d9770622_1px,transparent_0,transparent_50%)] [background-size:10px_10px]",
                  desc: "Bedah instrumen",
                },
                {
                  id: "ANALYZE",
                  title: "Analisis",
                  icon: "analytics",
                  color: "from-emerald-100 to-teal-200 text-teal-950",
                  pattern:
                    "bg-[radial-gradient(#0d948822_1.5px,transparent_0)] [background-size:15px_15px]",
                  desc: "Observasi video",
                },
                {
                  id: "DISCUSSION",
                  title: "Diskusi",
                  icon: "chat_bubble",
                  color: "from-violet-100 to-purple-200 text-purple-950",
                  pattern:
                    "bg-[linear-gradient(to_right,#7c3aed22_1px,transparent_1px),linear-gradient(to_bottom,#7c3aed22_1px,transparent_1px)] [background-size:16px_16px]",
                  desc: "Tukar pikiran",
                },
                {
                  id: "REFLECTION",
                  title: "Refleksi",
                  icon: "favorite",
                  color: "from-red-100 to-rose-200 text-red-950",
                  pattern:
                    "bg-[radial-gradient(circle_at_center,#e11d4822_2px,transparent_0)] [background-size:12px_12px]",
                  desc: "Resapi makna",
                },
                {
                  id: "QUIZ",
                  title: "Kuis",
                  icon: "psychology",
                  color: "from-orange-100 to-red-200 text-orange-950",
                  pattern:
                    "bg-[linear-gradient(135deg,#dc262622_25%,transparent_25%)] [background-size:15px_15px]",
                  desc: "Uji wawasan",
                },
                {
                  id: "GALLERY",
                  title: "Galeri",
                  icon: "photo_library",
                  color: "from-cyan-100 to-blue-200 text-blue-950",
                  pattern:
                    "bg-[repeating-radial-gradient(circle_at_0_0,#2563eb22_0,#2563eb22_10px,transparent_10px,transparent_20px)]",
                  desc: "Koleksi karya",
                },
              ].map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id as AppStep)}
                  className="group relative h-48 md:h-56 rounded-[30px] transition-all duration-500 hover:-translate-y-2 active:scale-95 shadow-sm"
                >
                  <div
                    className={`absolute inset-x-4 bottom-2 h-1/2 bg-gradient-to-br ${item.color} opacity-30 blur-2xl group-hover:opacity-60 transition-opacity`}
                  ></div>
                  <div
                    className={`relative h-full w-full rounded-[30px] overflow-hidden border-t border-white/50 shadow-inner bg-gradient-to-br ${item.color}`}
                  >
                    <div
                      className={`absolute inset-0 ${item.pattern} opacity-30 mix-blend-overlay`}
                    ></div>
                    <div className="relative h-full p-5 md:p-6 flex flex-col justify-between z-10">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-xl border border-white/40 rounded-[20px] flex items-center justify-center shadow-lg group-hover:bg-slate-900 group-hover:text-white transition-all text-slate-800">
                        <span className="material-icons text-2xl md:text-3xl">
                          {item.icon}
                        </span>
                      </div>
                      <div className="text-left">
                        <span className="text-[9px] font-black text-slate-900/40 uppercase tracking-widest block mb-1">
                          Modul 0{idx + 1}
                        </span>
                        <h3 className="text-lg md:text-xl font-black text-slate-900 leading-tight mb-1">
                          {item.title}
                        </h3>
                        <p className="text-[10px] md:text-[11px] font-bold text-slate-800/70 line-clamp-2">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Footer CTA */}
            <div className="mt-8 group">
              <button
                onClick={() => navigate("REPORT")}
                className="w-full p-5 bg-slate-900 rounded-[24px] flex items-center justify-between overflow-hidden relative shadow-xl active:scale-[0.98] transition-all"
              >
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_0)] [background-size:10px_10px] opacity-30"></div>
                <div className="flex items-center gap-4 relative z-10 text-left">
                  <div className="w-11 h-11 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
                    <span className="material-icons text-white text-xl">
                      workspace_premium
                    </span>
                  </div>
                  <div>
                    <h4 className="font-black text-md text-white leading-none mb-1">
                      Sertifikat Akhir
                    </h4>
                    <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                      Klaim Pencapaianmu
                    </p>
                  </div>
                </div>
                <span className="material-icons text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 3. HALAMAN KONTEN DENGAN NAVBAR PREMIUM */}
      {currentStep !== "SPLASH" && currentStep !== "MENU" && (
        <div className="min-h-screen flex flex-col bg-slate-50/50">
          {/* NAVBAR PREMIUM KONSISTEN */}
          <header className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 p-4 border-b border-slate-100 flex justify-between items-center px-6 md:px-12">
            {/* Sisi Kiri: Icon Menu Sederhana */}
            <button
              onClick={() => navigate("MENU")}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-pink transition-all active:scale-90 shadow-sm"
            >
              <span className="material-icons text-2xl">menu</span>
            </button>

            {/* Judul Tengah (Ganti Progress Modul) */}
            <div className="flex flex-col items-center">
              <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-tighter leading-none">
                Music
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-pink to-indigo-600">
                  Scope
                </span>
              </h1>
            </div>

            {/* Sisi Kanan: Hanya Avatar (XP Dibuang) */}
            <div className="flex items-center gap-3">
              <div className="relative group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-pink to-orange-400 p-[2px] rotate-3 group-hover:rotate-0 transition-transform duration-300 shadow-md">
                  <div className="w-full h-full rounded-[9px] bg-white overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100"
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
              </div>
            </div>
          </header>

          <div className="flex-1 max-w-5xl mx-auto w-full p-6 animate-fadeIn pb-32">
            {/* INTRO CONTENT */}
            {currentStep === "INTRO" && (
              <div className="space-y-8 md:space-y-16 px-1 sm:px-4">
                {/* 1. Hero Section: Judul & Deskripsi */}
                <div className="text-center md:text-left space-y-4 md:space-y-6">
                  <span className="inline-block bg-rose-100 text-rose-600 text-[9px] md:text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">
                    Eksplorasi Budaya
                  </span>
                  <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                    Musik: Bahasa <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-pink via-purple-500 to-indigo-600">
                      Universal Manusia
                    </span>
                  </h2>
                  <p className="text-slate-500 text-base md:text-xl font-medium max-w-2xl leading-relaxed mx-auto md:mx-0">
                    Lebih dari sekadar nada, musik adalah cermin identitas
                    bangsa dan detak jantung kehidupan sehari-hari.
                  </p>
                </div>

                {/* 2. Video Pembuka dengan Frame Premium */}
                <div className="relative group mx-auto w-full">
                  <div className="absolute -inset-1.5 md:-inset-2 bg-gradient-to-r from-rose-pink to-indigo-500 rounded-[24px] md:rounded-[40px] blur-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
                  <div className="relative aspect-video bg-slate-900 rounded-[20px] md:rounded-[32px] overflow-hidden shadow-2xl border-2 md:border-4 border-white">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="w-14 h-14 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform active:scale-90">
                        <span className="material-icons text-rose-pink text-3xl md:text-4xl">
                          play_arrow
                        </span>
                      </button>
                    </div>
                    <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white text-left">
                      <p className="text-[8px] md:text-xs font-bold uppercase tracking-widest opacity-80">
                        Video Pengantar
                      </p>
                      <h4 className="text-sm md:text-lg font-bold">
                        Harmoni Alam & Budaya
                      </h4>
                    </div>
                  </div>
                </div>

                {/* 3. Fitur: Perbandingan Interaktif */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                  {/* Tradisional Card */}
                  <div className="group bg-white rounded-[28px] md:rounded-[35px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col">
                    <div className="p-6 md:p-8">
                      <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-amber-100 rounded-xl md:rounded-2xl flex items-center justify-center shadow-sm text-amber-600">
                          <span className="material-icons text-2xl md:text-3xl">
                            temple_hindu
                          </span>
                        </div>
                        <span className="text-amber-700 font-black uppercase tracking-widest text-xs md:text-sm">
                          Warisan Leluhur
                        </span>
                      </div>
                      <h4 className="text-xl md:text-2xl font-black text-slate-800 mb-2 md:mb-3 text-left">
                        Musik Tradisional
                      </h4>
                      <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-medium text-left">
                        Berakar pada adat istiadat, menggunakan instrumen alami
                        seperti bambu, kayu, dan perunggu.
                      </p>
                    </div>

                    {/* Galeri Alat Musik - Mobile: Scroll Horizontal / Desktop: Wrap */}
                    <div className="px-6 pb-6 md:px-8 md:pb-8">
                      <div className="flex flex-row md:flex-wrap gap-4 overflow-x-auto md:overflow-visible pb-2 md:pb-0 no-scrollbar">
                        {[
                          {
                            name: "Gamelan",
                            img: "https://i.pinimg.com/1200x/7e/0d/a9/7e0da932ed99c04c700899f6bb7f659e.jpg",
                          },
                          {
                            name: "Angklung",
                            img: "https://i.pinimg.com/736x/ce/52/4c/ce524c886aa3a2a408875ac15ac43c4e.jpg",
                          },
                          {
                            name: "Sasando",
                            img: "https://i.pinimg.com/1200x/69/2c/6a/692c6aba976f5f3f39513f3ce3c82161.jpg",
                          },
                          {
                            name: "Saluang",
                            img: "https://i.pinimg.com/736x/ed/35/4c/ed354c3892c6b4640a46fd773fb0e95c.jpg",
                          },
                        ].map((item) => (
                          <div
                            key={item.name}
                            className="flex-shrink-0 flex flex-col items-center gap-2"
                          >
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl overflow-hidden shadow-md border-2 border-amber-200">
                              <img
                                src={item.img}
                                className="w-full h-full object-cover"
                                alt={item.name}
                              />
                            </div>
                            <span className="text-[9px] font-black text-amber-800 uppercase tracking-tighter bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">
                              {item.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Modern Card */}
                  <div className="group bg-white rounded-[28px] md:rounded-[35px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col">
                    <div className="p-6 md:p-8">
                      <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-indigo-100 rounded-xl md:rounded-2xl flex items-center justify-center shadow-sm text-indigo-600">
                          <span className="material-icons text-2xl md:text-3xl">
                            podcasts
                          </span>
                        </div>
                        <span className="text-indigo-700 font-black uppercase tracking-widest text-xs md:text-sm">
                          Era Digital
                        </span>
                      </div>
                      <h4 className="text-xl md:text-2xl font-black text-slate-800 mb-2 md:mb-3 text-left">
                        Musik Modern
                      </h4>
                      <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-medium text-left">
                        Berevolusi dengan teknologi digital, synthesizer, dan
                        inovasi suara elektronik global.
                      </p>
                    </div>

                    <div className="px-6 pb-6 md:px-8 md:pb-8">
                      <div className="flex flex-row md:flex-wrap gap-4 overflow-x-auto md:overflow-visible pb-2 md:pb-0 no-scrollbar">
                        {[
                          {
                            name: "Synth",
                            img: "https://i.pinimg.com/736x/1a/d5/12/1ad51254ef1e462935da646ebc6b699f.jpg",
                          },
                          {
                            name: "DJ Pad",
                            img: "https://i.pinimg.com/1200x/f6/d4/36/f6d436986c9143d1e5ccaafbbe2d3dad.jpg",
                          },
                          {
                            name: "Gitar Elektrik",
                            img: "https://i.pinimg.com/1200x/d3/0f/2e/d30f2e650ce8bbf539478f3d5b732e62.jpg",
                          },
                          {
                            name: "Saksofon",
                            img: "https://i.pinimg.com/1200x/50/6b/83/506b83115a1837a3dd42d78da19240a5.jpg",
                          },
                        ].map((item) => (
                          <div
                            key={item.name}
                            className="flex-shrink-0 flex flex-col items-center gap-2"
                          >
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl overflow-hidden shadow-md border-2 border-indigo-200">
                              <img
                                src={item.img}
                                className="w-full h-full object-cover"
                                alt={item.name}
                              />
                            </div>
                            <span className="text-[9px] font-black text-indigo-800 uppercase tracking-tighter bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                              {item.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Quote Section */}
                <div className="py-8 md:py-14 text-center border-y border-slate-100 relative overflow-hidden">
                  <span className="material-icons absolute top-0 left-1/2 -translate-x-1/2 text-7xl md:text-9xl opacity-[0.03] -translate-y-6 md:-translate-y-10 uppercase select-none">
                    format_quote
                  </span>
                  <p className="text-xl md:text-3xl font-serif italic text-slate-700 relative z-10 px-4">
                    "Di mana kata-kata gagal, musik berbicara."
                  </p>
                  <p className="text-xs md:text-sm font-black text-rose-pink mt-4 uppercase tracking-[0.2em] md:tracking-[0.3em]">
                    — Hans Christian Andersen
                  </p>
                </div>

                {/* 5. Navigation Button */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-900 p-6 md:p-10 rounded-[30px] md:rounded-[40px] shadow-2xl overflow-hidden relative group mb-10">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#f43f5e22,transparent)]"></div>
                  <div className="relative z-10 text-center md:text-left">
                    <h4 className="text-white text-xl md:text-2xl font-black">
                      Sudah Paham?
                    </h4>
                    <p className="text-slate-400 text-xs md:text-sm font-medium">
                      Ayo mulai tantangan identifikasi genre!
                    </p>
                  </div>
                  <button
                    onClick={() => navigate("IDENTIFY")}
                    className="w-full md:w-auto relative z-10 px-8 py-4 md:px-10 md:py-5 bg-rose-pink text-white rounded-[20px] md:rounded-[24px] font-black flex items-center justify-center gap-3 hover:bg-white hover:text-slate-900 transition-all duration-300 group active:scale-95 shadow-xl text-sm md:text-base"
                  >
                    MULAI IDENTIFIKASI
                    <span className="material-icons group-hover:translate-x-2 transition-transform text-lg md:text-xl">
                      east
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* IDENTIFY CONTENT */}
            {currentStep === "IDENTIFY" && (
              <div className="space-y-6 md:space-y-10 animate-fadeIn px-1">
                {/* 1. Header Responsif */}
                <div className="text-center md:text-left space-y-2 md:space-y-3">
                  <span className="inline-block bg-indigo-100 text-indigo-600 text-[9px] md:text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">
                    Laboratorium Audio
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                    Identifikasi{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
                      Jenis Musik
                    </span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                  {/* Kolom Kiri: Daftar Pilihan - Mobile: Scroll Horizontal atau Grid 2 Kolom */}
                  <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 md:gap-4">
                    {[
                      {
                        id: "trad",
                        title: "Tradisional",
                        fullTitle: "Musik Tradisional",
                        icon: "library_music",
                        color: "amber",
                        vid: "https://www.youtube.com/embed/UEWCCSuHsuQ?si",
                      },
                      {
                        id: "pop",
                        title: "Populer",
                        fullTitle: "Musik Populer",
                        icon: "trending_up",
                        color: "rose",
                        vid: "https://www.youtube.com/embed/7SqNVv98e8Q?si",
                      },
                      {
                        id: "west",
                        title: "Barat",
                        fullTitle: "Musik Barat",
                        icon: "language",
                        color: "blue",
                        vid: "https://www.youtube.com/embed/yh6cGpbNZBg?si",
                      },
                      {
                        id: "cont",
                        title: "Kontemporer",
                        fullTitle: "Kontemporer",
                        icon: "graphic_eq",
                        color: "emerald",
                        vid: "https://www.youtube.com/embed/pvkW3PP62fM?si",
                      },
                    ].map((item) => {
                      const isActive =
                        (typeof activeVideo === "string"
                          ? activeVideo
                          : activeVideo?.url) === item.vid;
                      return (
                        <button
                          key={item.id}
                          className={`w-full p-3 md:p-5 rounded-[20px] md:rounded-[24px] border-2 transition-all duration-300 flex items-center justify-between group
                ${
                  isActive
                    ? "border-indigo-500 bg-indigo-50/50 shadow-lg shadow-indigo-100"
                    : "border-slate-100 bg-white hover:border-indigo-200"
                }`}
                          onClick={() => handleVideoSelect(item.vid)}
                        >
                          <div className="flex items-center gap-2 md:gap-4 overflow-hidden">
                            <div
                              className={`w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-${item.color}-100 flex-shrink-0 flex items-center justify-center text-${item.color}-600`}
                            >
                              <span className="material-icons text-sm md:text-base">
                                {item.icon}
                              </span>
                            </div>
                            <span
                              className={`font-black text-[10px] md:text-sm uppercase tracking-tight truncate ${
                                isActive ? "text-indigo-700" : "text-slate-600"
                              }`}
                            >
                              <span className="hidden md:inline">
                                {item.fullTitle}
                              </span>
                              <span className="md:hidden">{item.title}</span>
                            </span>
                          </div>
                          <span
                            className={`material-icons text-sm md:text-base transition-transform group-hover:rotate-12 ${
                              isActive ? "text-indigo-500" : "text-slate-300"
                            }`}
                          >
                            {isActive ? "pause_circle" : "play_circle"}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Kolom Kanan: Video Player & Notepad */}
                  <div
                    ref={videoSectionRef}
                    className="lg:col-span-2 space-y-6 md:space-y-8 scroll-mt-20"
                  >
                    {/* Video Player Frame */}
                    <div className="relative aspect-video bg-slate-900 rounded-[24px] md:rounded-[32px] overflow-hidden shadow-2xl border-2 md:border-4 border-white">
                      {activeVideo ? (
                        <iframe
                          className="w-full h-full"
                          src={`${
                            typeof activeVideo === "string"
                              ? activeVideo
                              : activeVideo?.url
                          }?autoplay=1`}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                          <div className="w-14 h-14 md:w-20 md:h-20 bg-white/10 rounded-full flex items-center justify-center mb-4 animate-bounce">
                            <span className="material-icons text-2xl md:text-4xl opacity-50">
                              smart_display
                            </span>
                          </div>
                          <p className="font-bold text-sm md:text-base opacity-50">
                            Pilih jenis musik untuk memutar video
                          </p>
                        </div>
                      )}
                    </div>

                    {/* 3. Fitur: Catat Temuan (Interactive Notepad) */}
                    <div className="bg-white rounded-[28px] md:rounded-[32px] border border-slate-100 p-6 md:p-8 shadow-sm relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-0 transition-transform -rotate-12 pointer-events-none hidden md:block">
                        <span className="material-icons text-indigo-600 text-7xl">
                          edit_note
                        </span>
                      </div>

                      <div className="relative z-10 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 md:w-10 md:h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                              <span className="material-icons text-white text-sm md:text-base">
                                history_edu
                              </span>
                            </div>
                            <h4 className="text-lg md:text-xl font-black text-slate-800 tracking-tight">
                              Catat Temuanmu
                            </h4>
                          </div>

                          {/* Notifikasi Sukses Mobile-Friendly */}
                          <div
                            className={`flex items-center self-start gap-2 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full border border-emerald-100 transition-all duration-500 ${
                              isSaved
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 -translate-y-2"
                            }`}
                          >
                            <span className="material-icons text-xs">
                              check_circle
                            </span>
                            <span className="text-[9px] font-black uppercase tracking-tighter">
                              Berhasil Disimpan!
                            </span>
                          </div>
                        </div>

                        <div className="relative">
                          <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Apa perbedaan instrumen, tempo, atau suasana musik tadi?"
                            className="w-full h-32 md:h-40 p-4 md:p-6 rounded-[20px] md:rounded-[24px] bg-slate-50 border-2 border-transparent focus:border-indigo-200 focus:bg-white focus:ring-0 transition-all font-medium text-sm md:text-base text-slate-600 placeholder:text-slate-300 italic shadow-inner resize-none"
                          ></textarea>

                          <button
                            onClick={handleSaveNote}
                            disabled={isSaving || !note.trim()}
                            className={`absolute bottom-3 right-3 md:bottom-4 md:right-4 flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest transition-all
                  ${
                    isSaving
                      ? "bg-slate-200 text-slate-400"
                      : note.trim()
                      ? "bg-indigo-600 text-white shadow-lg active:scale-95"
                      : "bg-slate-100 text-slate-300"
                  }`}
                          >
                            {isSaving ? "Proses..." : "Simpan"}
                            <span className="material-icons text-xs md:text-sm">
                              send
                            </span>
                          </button>
                        </div>

                        <div className="flex items-center gap-2 px-1">
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${
                              note.length > 0
                                ? "bg-indigo-500 animate-pulse"
                                : "bg-slate-300"
                            }`}
                          ></div>
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                            {note.length} Karakter
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Navigation Button */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-900 p-6 md:p-10 rounded-[30px] md:rounded-[40px] shadow-2xl overflow-hidden relative group">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#f43f5e22,transparent)]"></div>
                  <div className="relative z-10 text-center md:text-left">
                    <h4 className="text-white text-xl md:text-2xl font-black">
                      Langkah Berikutnya
                    </h4>
                    <p className="text-slate-400 text-xs md:text-sm font-medium">
                      Jelajahi ciri khas instrumennya.
                    </p>
                  </div>
                  <button
                    onClick={() => navigate("EXPLORE")}
                    className="w-full md:w-auto relative z-10 px-8 py-4 md:px-10 md:py-5 bg-rose-pink text-white rounded-[20px] md:rounded-[24px] font-black flex items-center justify-center gap-3 hover:bg-white hover:text-slate-900 transition-all duration-300 group shadow-xl text-sm md:text-base"
                  >
                    JELAJAHI CIRI KHAS
                    <span className="material-icons group-hover:translate-x-2 transition-transform">
                      east
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* EXPLORE SECTION */}
            {currentStep === "EXPLORE" && (
              <div className="space-y-6 md:space-y-10 animate-fadeIn pb-12 px-1">
                {/* Header Responsif */}
                <div className="text-center space-y-2 md:space-y-3">
                  <span className="inline-block bg-amber-100 text-amber-700 text-[9px] md:text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">
                    Encyclopedia & Analysis
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                    Eksplorasi{" "}
                    <span className="text-amber-500 text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
                      Ciri Musik
                    </span>
                  </h2>
                  <p className="text-slate-500 text-xs md:text-sm font-medium max-w-2xl mx-auto px-4">
                    Setiap instrumen memiliki jiwa, sejarah, dan karakteristik
                    unik.
                  </p>
                </div>

                {/* Grid Mini Cards - Mobile: 3 Kolom, Tablet: 4 Kolom, Desktop: 6 Kolom */}
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 px-2">
                  {instrumentsData.map((inst) => {
                    const colors =
                      colorMap[inst.color as keyof typeof colorMap] ||
                      colorMap.slate;
                    const isActive = selectedInstrument?.id === inst.id;
                    return (
                      <button
                        key={inst.id}
                        onClick={() => handleInstrumentSelect(inst)}
                        className={`group relative p-2 md:p-3 rounded-[24px] md:rounded-[28px] border-2 transition-all duration-500 flex flex-col items-center gap-2 md:gap-3 overflow-hidden
              ${
                isActive
                  ? `${colors.cardBorder} ${colors.cardBg} shadow-lg md:shadow-xl -translate-y-1 md:-translate-y-2`
                  : "border-slate-100 bg-white hover:border-amber-200"
              }`}
                      >
                        <div className="w-full aspect-square rounded-[18px] md:rounded-[20px] overflow-hidden relative shadow-inner">
                          <img
                            src={inst.img}
                            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                            alt={inst.name}
                          />
                        </div>
                        <span className="font-black text-[9px] md:text-[11px] text-slate-700 uppercase truncate w-full px-1">
                          {inst.name}
                        </span>
                        {isActive && (
                          <div
                            className={`absolute top-2 right-2 w-1.5 h-1.5 md:w-2 md:h-2 ${colors.dot} rounded-full animate-ping`}
                          ></div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Master Detail Panel */}
                <div
                  ref={exploreDetailRef}
                  className="min-h-[400px] md:min-h-[500px] scroll-mt-20"
                >
                  {selectedInstrument ? (
                    <div className="bg-white rounded-[32px] md:rounded-[40px] border border-slate-100 shadow-2xl overflow-hidden animate-slideUp relative">
                      {/* Header Panel Responsif */}
                      <div
                        className={`bg-gradient-to-r ${
                          colorMap[
                            selectedInstrument.color as keyof typeof colorMap
                          ]?.header || "from-slate-500 to-slate-600"
                        } p-6 md:p-8 text-white relative overflow-hidden`}
                      >
                        {/* Icon Background - Hidden on small mobile */}
                        <div className="absolute right-0 top-0 opacity-10 translate-x-10 -translate-y-10 hidden sm:block">
                          <span className="material-icons text-[150px] md:text-[200px]">
                            {selectedInstrument.icon}
                          </span>
                        </div>

                        <div className="relative z-10 flex items-center justify-between">
                          <div className="flex items-center gap-4 md:gap-6">
                            <div className="w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shrink-0">
                              <span className="material-icons text-white text-2xl md:text-4xl">
                                {selectedInstrument.icon}
                              </span>
                            </div>
                            <div>
                              <h3 className="text-2xl md:text-4xl font-black tracking-tight leading-tight">
                                {selectedInstrument.name}
                              </h3>
                              <p className="font-bold opacity-80 uppercase text-[8px] md:text-[10px] tracking-[0.2em]">
                                Master Analysis Report
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => setSelectedInstrument(null)}
                            className="w-10 h-10 md:w-12 md:h-12 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center shrink-0 transition-colors"
                          >
                            <span className="material-icons text-sm md:text-base">
                              close
                            </span>
                          </button>
                        </div>
                      </div>

                      {/* Content Grid */}
                      <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
                        {/* Kolom Karakteristik */}
                        <div className="space-y-4 md:space-y-6">
                          <div className="flex items-center gap-2 mb-2">
                            <div
                              className={`h-1 w-8 md:w-10 ${
                                colorMap[
                                  selectedInstrument.color as keyof typeof colorMap
                                ]?.dot || "bg-slate-500"
                              } rounded-full`}
                            ></div>
                            <h4 className="text-[10px] md:text-sm font-black text-slate-800 uppercase tracking-widest">
                              Karakteristik Musikologis
                            </h4>
                          </div>

                          <div className="grid gap-3 md:gap-4">
                            {[
                              {
                                label: "Ritme & Tempo",
                                icon: "graphic_eq",
                                detail: selectedInstrument.ritme,
                              },
                              {
                                label: "Melodi & Nada",
                                icon: "music_note",
                                detail: selectedInstrument.melodi,
                              },
                              {
                                label: "Timbre Suara",
                                icon: "waves",
                                detail: selectedInstrument.timbre,
                              },
                            ].map((item) => {
                              const currentColors =
                                colorMap[
                                  selectedInstrument.color as keyof typeof colorMap
                                ] || colorMap.slate;
                              return (
                                <div
                                  key={item.label}
                                  className="p-4 md:p-5 rounded-[20px] md:rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white transition-all"
                                >
                                  <div className="flex items-center gap-3 mb-2">
                                    <div
                                      className={`w-7 h-7 md:w-8 md:h-8 rounded-lg md:rounded-xl flex items-center justify-center ${currentColors.iconBg}`}
                                    >
                                      <span
                                        className={`material-icons text-[12px] md:text-sm ${currentColors.iconText}`}
                                      >
                                        {item.icon}
                                      </span>
                                    </div>
                                    <span className="font-black text-[9px] md:text-[11px] text-slate-800 uppercase">
                                      {item.label}
                                    </span>
                                  </div>
                                  <p className="text-slate-600 text-[11px] md:text-[13px] leading-relaxed font-medium md:pl-11 italic md:not-italic">
                                    {item.detail}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Kolom Fungsi */}
                        <div className="space-y-4 md:space-y-6">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-1 w-8 md:w-10 bg-indigo-500 rounded-full"></div>
                            <h4 className="text-[10px] md:text-sm font-black text-slate-800 uppercase tracking-widest">
                              Fungsi & Konteks
                            </h4>
                          </div>

                          <div className="space-y-3 md:space-y-4">
                            <div className="p-5 md:p-8 rounded-[24px] md:rounded-[32px] bg-indigo-50/50 border border-indigo-100 flex flex-col sm:flex-row gap-4 md:gap-6">
                              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white flex items-center justify-center text-indigo-600 shrink-0 shadow-sm">
                                <span className="material-icons text-sm md:text-base">
                                  theater_comedy
                                </span>
                              </div>
                              <div>
                                <h5 className="font-black text-indigo-900 text-[9px] md:text-xs uppercase mb-1 md:mb-2 tracking-wider">
                                  Peran Masyarakat
                                </h5>
                                <p className="text-indigo-800/70 text-[12px] md:text-sm leading-relaxed italic">
                                  "{selectedInstrument.fungsi}"
                                </p>
                              </div>
                            </div>

                            <div className="p-5 md:p-8 rounded-[24px] md:rounded-[32px] bg-rose-50/50 border border-rose-100 flex flex-col sm:flex-row gap-4 md:gap-6">
                              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white flex items-center justify-center text-rose-600 shrink-0 shadow-sm">
                                <span className="material-icons text-sm md:text-base">
                                  history_edu
                                </span>
                              </div>
                              <div>
                                <h5 className="font-black text-rose-900 text-[9px] md:text-xs uppercase mb-1 md:mb-2 tracking-wider">
                                  Budaya & Sejarah
                                </h5>
                                <p className="text-rose-800/70 text-[12px] md:text-sm leading-relaxed">
                                  {selectedInstrument.konteks}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-64 md:h-[500px] border-4 border-dashed border-slate-100 rounded-[32px] md:rounded-[40px] flex flex-col items-center justify-center text-slate-300 gap-3">
                      <span className="material-icons text-4xl md:text-5xl animate-bounce">
                        mouse
                      </span>
                      <p className="font-black uppercase tracking-[0.2em] text-[9px] md:text-xs text-center px-6">
                        Pilih instrumen untuk dianalisis
                      </p>
                    </div>
                  )}
                </div>

                {/* Navigation Button */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-900 p-6 md:p-10 rounded-[30px] md:rounded-[40px] shadow-2xl overflow-hidden relative group">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#f43f5e22,transparent)]"></div>
                  <div className="relative z-10 text-center md:text-left">
                    <h4 className="text-white text-xl md:text-2xl font-black">
                      Karakteristik Sudah Paham
                    </h4>
                    <p className="text-slate-400 text-xs md:text-sm font-medium">
                      Uji Telingamu Dalam Video Analisis
                    </p>
                  </div>
                  <button
                    onClick={() => navigate("ANALYZE")}
                    className="w-full md:w-auto relative z-10 px-8 py-4 md:px-10 md:py-5 bg-rose-pink text-white rounded-[20px] md:rounded-[24px] font-black flex items-center justify-center gap-3 hover:bg-white hover:text-slate-900 transition-all duration-300 group shadow-xl text-sm md:text-base"
                  >
                    ANALISIS VIDEO
                    <span className="material-icons group-hover:translate-x-2 transition-transform">
                      east
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* ANALYZE SECTION */}
            {currentStep === "ANALYZE" && (
              <div className="space-y-6 md:space-y-10 animate-fadeIn pb-16 px-2 md:px-0">
                {/* 1. Header Section - Text size adapted for mobile */}
                <div className="text-center space-y-2 md:space-y-3">
                  <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-[9px] md:text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Video Laboratory
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                    Analisis{" "}
                    <span className="text-emerald-500">Video Musik</span>
                  </h2>
                  <p className="text-slate-500 text-xs md:text-sm font-medium max-w-2xl mx-auto px-4 leading-relaxed">
                    Amati pertunjukan musik daerah, pilih kategori video, dan
                    identifikasi karakteristik bunyinya.
                  </p>
                </div>

                {/* 2. Main content: Video & Worksheet - Grid adapted for small screens */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
                  {/* Kolom Kiri: Player & Pilihan Musik */}
                  <div className="lg:col-span-7 space-y-4 md:space-y-6">
                    {/* Frame Video - Enhanced border and aspect ratio for mobile */}
                    <div className="bg-black rounded-[24px] md:rounded-[40px] overflow-hidden shadow-2xl aspect-video border-[4px] md:border-[6px] border-white relative shadow-emerald-100/50">
                      {activeVideo?.url ? (
                        <iframe
                          className="w-full h-full"
                          src={activeVideo.url}
                          title="Music Analysis"
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 font-bold bg-slate-100 p-6 text-center text-xs md:text-base">
                          <span className="material-icons text-4xl mb-2 opacity-20">
                            play_circle
                          </span>
                          Pilih video untuk memulai analisis
                        </div>
                      )}
                    </div>

                    {/* Tombol Pilihan Musik - Horizontal scroll improved for touch */}
                    <div className="space-y-3 md:space-y-4">
                      <div className="flex items-center justify-between px-2">
                        <h5 className="text-[9px] md:text-[11px] font-black text-slate-400 uppercase tracking-widest">
                          Katalog Musik Daerah
                        </h5>
                        <span className="text-[8px] md:text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                          {videoDataList.length} Video Tersedia
                        </span>
                      </div>

                      <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 px-1 scrollbar-hide snap-x">
                        {videoDataList.map((v) => (
                          <button
                            key={v.id}
                            onClick={() => setActiveVideo(v)}
                            className={`flex-shrink-0 w-40 md:w-48 text-left transition-all duration-500 snap-start ${
                              activeVideo?.id === v.id
                                ? "scale-100 opacity-100"
                                : "scale-95 opacity-60 hover:opacity-100"
                            }`}
                          >
                            <div
                              className={`rounded-[20px] md:rounded-[24px] overflow-hidden mb-2 md:mb-3 border-4 transition-all ${
                                activeVideo?.id === v.id
                                  ? "border-emerald-500 shadow-lg shadow-emerald-200"
                                  : "border-white shadow-md"
                              }`}
                            >
                              <div className="relative aspect-video">
                                <img
                                  src={v.thumbnail}
                                  alt={v.title}
                                  className="w-full h-full object-cover"
                                />
                                {activeVideo?.id === v.id && (
                                  <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center">
                                    <span className="material-icons text-white text-2xl md:text-3xl">
                                      play_circle_filled
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="px-1">
                              <p className="font-black text-[9px] md:text-[10px] uppercase text-slate-800 truncate leading-tight">
                                {v.title}
                              </p>
                              <p className="text-[8px] md:text-[9px] text-emerald-600 font-bold uppercase mt-1">
                                {v.region}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Kolom Kanan: Input Form - Full height consistency */}
                  <div className="lg:col-span-5 flex flex-col h-full">
                    <div className="bg-white rounded-[32px] md:rounded-[40px] border border-slate-100 shadow-2xl p-6 md:p-8 space-y-6 md:space-y-8 flex-grow relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-emerald-50 rounded-bl-full -z-0 opacity-50"></div>

                      <div className="relative z-10 space-y-6 md:space-y-8 h-full flex flex-col">
                        {/* Checklist Ciri Musik - Better spacing for touch targets */}
                        <div className="space-y-3 md:space-y-4">
                          <label className="text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <span className="material-icons text-xs md:text-sm">
                              tune
                            </span>
                            Karakteristik Bunyi
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {traitOptions.map((opt) => (
                              <button
                                key={opt}
                                onClick={() => handleTraitToggle(opt)}
                                className={`px-3 py-1.5 md:px-4 md:py-2 rounded-xl md:rounded-2xl text-[8px] md:text-[10px] font-black uppercase transition-all duration-300 border-2 ${
                                  selectedTraits.includes(opt)
                                    ? "bg-emerald-500 border-emerald-500 text-white shadow-md md:shadow-lg shadow-emerald-200"
                                    : "bg-white border-slate-50 text-slate-400 hover:border-emerald-200"
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Essay Input - Min-height adjusted for mobile viewing */}
                        <div className="space-y-3 md:space-y-4 flex-grow flex flex-col">
                          <label className="text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <span className="material-icons text-xs md:text-sm">
                              description
                            </span>
                            Hasil Analisis
                          </label>
                          <div className="bg-slate-50 rounded-[24px] md:rounded-[32px] p-2 border-2 border-slate-100 focus-within:border-emerald-400 focus-within:bg-white transition-all shadow-inner flex-grow min-h-[180px] md:min-h-[250px]">
                            <textarea
                              value={userAnalysis}
                              onChange={(e) => setUserAnalysis(e.target.value)}
                              placeholder="Deskripsikan kesan pertama, warna suara instrumen..."
                              className="w-full bg-transparent p-4 md:p-5 outline-none text-slate-700 text-xs md:text-sm font-medium h-full min-h-[160px] md:min-h-[230px] resize-none"
                            ></textarea>
                          </div>
                        </div>

                        {/* Simpan Area - Mobile friendly buttons */}
                        <div className="pt-2 flex flex-col items-center space-y-3">
                          <div
                            className={`flex items-center gap-2 bg-emerald-50 text-emerald-600 px-5 py-2 rounded-full border border-emerald-100 transition-all duration-500 transform ${
                              isSaved
                                ? "opacity-100 translate-y-0 scale-100"
                                : "opacity-0 translate-y-2 scale-95 pointer-events-none"
                            }`}
                          >
                            <span className="material-icons text-base">
                              check_circle
                            </span>
                            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-wider">
                              Tersimpan!
                            </span>
                          </div>

                          <button
                            onClick={() => {
                              setIsSaved(true);
                              setTimeout(() => setIsSaved(false), 3000);
                            }}
                            className="w-full bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white py-3.5 md:py-4 rounded-[20px] md:rounded-[24px] font-black text-[10px] md:text-[11px] uppercase tracking-widest transition-all duration-300 shadow-sm border border-emerald-100 flex items-center justify-center gap-2 group"
                          >
                            <span className="material-icons text-sm group-hover:rotate-12 transition-transform">
                              save
                            </span>
                            Simpan Analisis
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Navigation Button - Adapted for mobile stacking */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-900 p-6 md:p-10 rounded-[32px] md:rounded-[40px] shadow-2xl overflow-hidden relative group">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#f43f5e22,transparent)]"></div>
                  <div className="relative z-10 text-center md:text-left">
                    <h4 className="text-white text-xl md:text-2xl font-black">
                      Lanjut Ke Diskusi?
                    </h4>
                    <p className="text-slate-400 text-xs md:text-sm font-medium">
                      Uji Pemahamanmu Bersama Teman
                    </p>
                  </div>
                  <button
                    onClick={() => navigate("DISCUSSION")}
                    className="w-full md:w-auto relative z-10 px-8 py-4 md:px-10 md:py-5 bg-rose-pink text-white rounded-[20px] md:rounded-[24px] font-black flex items-center justify-center gap-3 hover:bg-white hover:text-slate-900 transition-all duration-300 group shadow-xl text-sm md:text-base"
                  >
                    KE FORUM DISKUSI
                    <span className="material-icons group-hover:translate-x-2 transition-transform">
                      east
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* DISCUSSION CONTENT */}
            {currentStep === "DISCUSSION" && (
              <div className="space-y-6 md:space-y-8 animate-fadeIn pb-20 px-2 md:px-0">
                {/* 1. Header Halaman - Responsive Alignment */}
                <div className="text-center md:text-left space-y-3 px-4">
                  <span className="bg-rose-100 text-rose-600 text-[9px] md:text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">
                    Community Hub
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                    Diskusi Kelompok{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
                      Digital
                    </span>
                  </h2>
                  <p className="text-slate-500 font-medium text-xs md:text-sm">
                    Bandingkan hasil analisismu dan berikan apresiasi kepada
                    teman sekelas.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                  {/* Kolom Kiri: Forum Chat - Height adjusted for mobile */}
                  <div className="lg:col-span-2 space-y-6 order-1">
                    <div className="bg-white rounded-[28px] md:rounded-[32px] border border-slate-100 shadow-sm overflow-hidden flex flex-col h-[450px] md:h-[550px]">
                      {/* Top Bar Chat */}
                      <div className="p-4 md:p-5 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400">
                            12 Siswa Online
                          </span>
                        </div>
                      </div>

                      {/* Chat Messages Area - Scroll improvement */}
                      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed">
                        {/* Pesan 1 (Teman) - Width adjusted for mobile */}
                        <div className="flex gap-3 md:gap-4 items-start max-w-[95%] md:max-w-[80%]">
                          <div className="w-8 h-8 md:w-10 md:h-10 bg-indigo-500 rounded-xl md:rounded-2xl flex items-center justify-center text-white text-xs md:text-base font-black shadow-lg shadow-indigo-100 shrink-0">
                            A
                          </div>
                          <div className="space-y-2">
                            <div className="bg-white p-3 md:p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm">
                              <p className="text-[9px] md:text-[10px] font-black text-indigo-500 uppercase tracking-tighter mb-1">
                                Andini • Kelompok 1
                              </p>
                              <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                                Menurut saya, tempo pada lagu Gamelan tadi
                                sangat harmonis! 🥁
                              </p>
                            </div>
                            {/* Emoji Reactions */}
                            <div className="flex gap-2">
                              <button className="px-2.5 py-1 bg-white border border-slate-100 rounded-full text-[10px] md:text-xs hover:bg-rose-50 transition-all shadow-sm">
                                🔥 2
                              </button>
                              <button className="px-2.5 py-1 bg-white border border-slate-100 rounded-full text-[10px] md:text-xs hover:bg-blue-50 transition-all shadow-sm">
                                👏 5
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Pesan 2 (Kamu) */}
                        <div className="flex gap-3 md:gap-4 items-start flex-row-reverse max-w-[95%] md:max-w-[80%] ml-auto text-right">
                          <div className="w-8 h-8 md:w-10 md:h-10 bg-rose-500 rounded-xl md:rounded-2xl flex items-center justify-center text-white text-xs md:text-base font-black shadow-lg shadow-rose-100 shrink-0">
                            U
                          </div>
                          <div className="space-y-2">
                            <div className="bg-rose-600 p-3 md:p-4 rounded-2xl rounded-tr-none shadow-xl shadow-rose-100">
                              <p className="text-[9px] md:text-[10px] font-black text-rose-200 uppercase tracking-tighter mb-1">
                                Kamu (User)
                              </p>
                              <p className="text-xs md:text-sm text-white leading-relaxed font-medium">
                                Setuju! Teknik pemain kendangnya luar biasa
                                stabil.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Input Area - Mobile friendly height */}
                      <div className="p-3 md:p-5 bg-white border-t border-slate-50 flex items-center gap-2 md:gap-4">
                        <button className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 shrink-0">
                          <span className="material-icons text-lg md:text-xl">
                            add_reaction
                          </span>
                        </button>
                        <input
                          type="text"
                          placeholder="Ketik pendapat..."
                          className="flex-1 py-2.5 md:py-3 px-4 md:px-5 bg-slate-50 border-none rounded-xl md:rounded-2xl text-xs md:text-sm font-medium focus:ring-2 focus:ring-rose-500 outline-none"
                        />
                        <button className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-lg shadow-rose-200 hover:scale-105 shrink-0">
                          <span className="material-icons text-sm md:text-base">
                            send
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Kolom Kanan: Stats & Tips - Reordered for mobile */}
                  <div className="space-y-4 md:space-y-6 order-2 lg:order-2">
                    {/* Statistik Diskusi */}
                    <div className="bg-slate-900 rounded-[28px] md:rounded-[32px] p-5 md:p-6 text-white overflow-hidden relative group">
                      <div className="absolute -top-2 -right-2 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                        <span className="material-icons text-5xl md:text-6xl text-white">
                          groups
                        </span>
                      </div>
                      <h4 className="text-base md:text-lg font-black mb-4 relative z-10">
                        Statistik
                      </h4>
                      <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 relative z-10">
                        <div className="bg-white/10 p-3 md:p-4 rounded-xl md:rounded-2xl flex flex-col md:flex-row md:items-center justify-between border border-white/5">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">
                            Komentar
                          </span>
                          <span className="text-lg md:text-xl font-black text-rose-400">
                            42
                          </span>
                        </div>
                        <div className="bg-white/10 p-3 md:p-4 rounded-xl md:rounded-2xl flex flex-col md:flex-row md:items-center justify-between border border-white/5">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">
                            Apresiasi
                          </span>
                          <span className="text-lg md:text-xl font-black text-emerald-400">
                            128
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Tip Berdiskusi */}
                    <div className="bg-orange-50 rounded-[28px] md:rounded-[32px] p-5 md:p-6 border border-orange-100">
                      <div className="flex items-center gap-3 mb-2 md:mb-3">
                        <span className="material-icons text-orange-500 text-sm md:text-base">
                          lightbulb
                        </span>
                        <span className="text-[9px] md:text-[10px] font-black text-orange-600 uppercase tracking-widest">
                          Tips Diskusi
                        </span>
                      </div>
                      <p className="text-[11px] md:text-[12px] text-orange-800 font-medium leading-relaxed italic">
                        "Hargai perbedaan interpretasi musikal temanmu."
                      </p>
                    </div>
                  </div>
                </div>

                {/* 4. Navigation Button - Fixed Padding for mobile */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-900 p-6 md:p-8 rounded-[32px] md:rounded-[40px] shadow-2xl overflow-hidden relative group">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#f43f5e22,transparent)]"></div>
                  <div className="relative z-10 text-center md:text-left">
                    <h4 className="text-white text-xl md:text-2xl font-black">
                      Hampir Selesai!
                    </h4>
                    <p className="text-slate-400 text-xs md:text-sm font-medium">
                      Isi Jurnal Refleksi Pribadimu!
                    </p>
                  </div>
                  <button
                    onClick={() => navigate("REFLECTION")}
                    className="w-full md:w-auto relative z-10 px-8 py-4 md:px-10 md:py-5 bg-rose-pink text-white rounded-[20px] md:rounded-[24px] font-black flex items-center justify-center gap-3 hover:bg-white hover:text-slate-900 transition-all duration-300 group shadow-xl text-sm md:text-base"
                  >
                    KE JURNAL REFLEKSI
                    <span className="material-icons group-hover:translate-x-2 transition-transform">
                      east
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* REFLECTION CONTENT */}
            {currentStep === "REFLECTION" && (
              <div className="space-y-8 md:space-y-10 animate-fadeIn pb-20 px-2 md:px-0">
                {/* Header Section */}
                <div className="text-center space-y-3 md:space-y-4 px-4">
                  <span className="bg-violet-100 text-violet-600 text-[9px] md:text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">
                    Self-Reflection
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                    Jurnal{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-600">
                      Refleksi Digital
                    </span>
                  </h2>
                  <p className="max-w-2xl mx-auto text-slate-500 text-xs md:text-base font-medium leading-relaxed">
                    Luangkan waktu sejenak untuk merenungkan pengalaman
                    belajarmu hari ini.
                  </p>
                </div>

                {/* MOOD PICKER - Optimized for Mobile Scrolling/Wrapping */}
                <div className="bg-white rounded-[32px] md:rounded-[40px] p-6 md:p-8 border border-slate-100 shadow-sm space-y-6 md:space-y-8">
                  <div className="flex flex-wrap md:flex-nowrap justify-center gap-4 md:gap-8">
                    {[
                      {
                        icon: "sentiment_very_satisfied",
                        label: "Senang",
                        id: "happy",
                        color: "text-emerald-500",
                        bg: "bg-emerald-50",
                      },
                      {
                        icon: "sentiment_satisfied",
                        label: "Terinspirasi",
                        id: "inspired",
                        color: "text-violet-500",
                        bg: "bg-violet-50",
                      },
                      {
                        icon: "sentiment_neutral",
                        label: "Biasa",
                        id: "neutral",
                        color: "text-slate-500",
                        bg: "bg-slate-50",
                      },
                      {
                        icon: "sentiment_dissatisfied",
                        label: "Bingung",
                        id: "confused",
                        color: "text-orange-500",
                        bg: "bg-orange-50",
                      },
                    ].map((mood) => (
                      <button
                        key={mood.id}
                        onClick={() => setSelectedMood(mood.id)}
                        className={`group flex flex-col items-center gap-2 md:gap-3 transition-all ${
                          selectedMood === mood.id
                            ? "scale-105 md:scale-110"
                            : "opacity-40 hover:opacity-100"
                        }`}
                      >
                        <div
                          className={`w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-3xl flex items-center justify-center transition-all border-2 
              ${
                selectedMood === mood.id
                  ? `${mood.bg} border-transparent shadow-lg shadow-violet-100`
                  : "bg-white border-slate-50"
              }`}
                        >
                          <span
                            className={`material-icons text-2xl md:text-4xl ${
                              selectedMood === mood.id
                                ? mood.color
                                : "text-slate-300"
                            }`}
                          >
                            {mood.icon}
                          </span>
                        </div>
                        <span
                          className={`text-[9px] md:text-[10px] font-black uppercase tracking-tighter ${
                            selectedMood === mood.id
                              ? "text-slate-900"
                              : "text-slate-400"
                          }`}
                        >
                          {mood.label}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* FEEDBACK DINAMIS - Responsive height */}
                  <div
                    className={`transition-all duration-500 overflow-hidden ${
                      selectedMood
                        ? "max-h-24 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="bg-slate-50 border-l-4 border-violet-500 p-4 rounded-xl text-center md:text-left">
                      <p className="text-xs md:text-sm font-bold text-slate-700 italic">
                        "{selectedMood && moodFeedback[selectedMood]}"
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                  {/* CATATAN TEKS */}
                  <div className="bg-white rounded-[32px] md:rounded-[40px] p-6 md:p-8 border border-slate-100 shadow-sm space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 md:w-10 md:h-10 bg-violet-100 rounded-xl flex items-center justify-center text-violet-600">
                        <span className="material-icons text-lg md:text-xl">
                          edit_note
                        </span>
                      </div>
                      <h4 className="font-black text-slate-800 uppercase tracking-tight text-xs md:text-sm">
                        Catatan Refleksi
                      </h4>
                    </div>
                    <textarea
                      value={reflectionText}
                      onChange={(e) => setReflectionText(e.target.value)}
                      placeholder="Tuliskan nilai budaya atau pesan moral..."
                      className="w-full h-36 md:h-40 p-5 md:p-6 rounded-[20px] md:rounded-[24px] bg-slate-50 border-none focus:ring-2 focus:ring-violet-500 transition-all font-medium text-slate-600 text-xs md:text-sm italic resize-none"
                    />
                    <div className="flex flex-col items-center gap-3">
                      {reflectionSaved && (
                        <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100 animate-fadeIn">
                          <span className="material-icons text-[10px]">
                            check_circle
                          </span>
                          <span className="text-[9px] font-black uppercase tracking-widest">
                            Berhasil Disimpan!
                          </span>
                        </div>
                      )}
                      <button
                        onClick={() => {
                          if (reflectionText) {
                            setReflectionSaved(true);
                            setTimeout(() => setReflectionSaved(false), 3000);
                          }
                        }}
                        className="w-full py-4 bg-slate-900 text-white rounded-[16px] md:rounded-[20px] font-black text-[10px] md:text-[11px] uppercase tracking-widest hover:bg-violet-600 transition-all active:scale-95 shadow-lg"
                      >
                        Kirim Jurnal
                      </button>
                    </div>
                  </div>

                  {/* AUDIO REFLECTION - Optimized Layout for Small Screens */}
                  <div
                    className={`rounded-[32px] md:rounded-[40px] p-6 md:p-8 text-white space-y-6 flex flex-col justify-center items-center text-center relative overflow-hidden transition-all duration-500 
        ${
          isRecording
            ? "bg-rose-600 ring-4 md:ring-8 ring-rose-100"
            : audioUrl
            ? "bg-emerald-600"
            : "bg-gradient-to-br from-violet-600 to-fuchsia-700"
        }`}
                  >
                    {audioUrl && (
                      <audio
                        ref={audioPlayerRef}
                        src={audioUrl}
                        onEnded={() => setIsPlaying(false)}
                        className="hidden"
                      />
                    )}

                    {!audioUrl && !isRecording ? (
                      <>
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 rounded-full flex items-center justify-center border border-white/30">
                          <span className="material-icons text-3xl md:text-4xl">
                            mic
                          </span>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-black uppercase tracking-widest text-xs md:text-sm">
                            Rekam Suara
                          </h4>
                          <p className="text-violet-100 text-[10px] md:text-[11px] px-2 font-medium leading-relaxed">
                            Berikan pendapatmu secara lisan untuk pengalaman
                            lebih personal.
                          </p>
                        </div>
                        <button
                          onClick={startRecording}
                          className="w-full md:w-auto px-8 py-3.5 bg-white text-violet-600 rounded-full font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] shadow-xl hover:scale-105 active:scale-95 transition-all"
                        >
                          Mulai Rekaman
                        </button>
                      </>
                    ) : isRecording ? (
                      <>
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-white text-rose-600 rounded-full flex items-center justify-center scale-105 md:scale-110 animate-pulse shadow-2xl">
                          <span className="material-icons text-4xl md:text-5xl">
                            stop
                          </span>
                        </div>
                        <h4 className="font-black uppercase tracking-widest text-xs md:text-sm">
                          Sedang Merekam...
                        </h4>
                        <div className="flex gap-1 h-6 md:h-8 items-end">
                          {[...Array(8)].map((_, i) => (
                            <div
                              key={i}
                              className="w-1 md:w-1.5 bg-white rounded-full animate-bounce"
                              style={{
                                height: `${30 + Math.random() * 70}%`,
                                animationDuration: `${0.5 + Math.random()}s`,
                              }}
                            ></div>
                          ))}
                        </div>
                        <button
                          onClick={stopRecording}
                          className="w-full md:w-auto px-8 py-3.5 bg-white text-rose-600 rounded-full font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] shadow-xl active:scale-95"
                        >
                          Selesai & Simpan
                        </button>
                      </>
                    ) : (
                      <>
                        <div
                          className={`w-16 h-16 md:w-20 md:h-20 ${
                            isPlaying
                              ? "bg-white text-emerald-600 scale-105 md:scale-110"
                              : "bg-emerald-500 text-white"
                          } rounded-full flex items-center justify-center border-4 border-white/30 shadow-xl transition-all duration-300`}
                        >
                          <span className="material-icons text-3xl md:text-4xl">
                            {isPlaying ? "graphic_eq" : "audiotrack"}
                          </span>
                        </div>
                        <h4 className="font-black uppercase tracking-widest text-[11px] md:text-sm text-emerald-100">
                          Rekaman Tersimpan
                        </h4>

                        <div className="flex gap-3 md:gap-4 w-full justify-center">
                          <button
                            onClick={togglePlay}
                            className="w-12 h-12 md:w-14 md:h-14 bg-white text-emerald-600 rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-all"
                          >
                            <span className="material-icons text-2xl md:text-3xl">
                              {isPlaying ? "pause" : "play_arrow"}
                            </span>
                          </button>
                          <button
                            onClick={startRecording}
                            className="w-12 h-12 md:w-14 md:h-14 bg-white/20 rounded-full flex items-center justify-center border border-white/20 active:scale-90 group"
                          >
                            <span className="material-icons text-xl md:text-2xl group-hover:rotate-180 transition-transform duration-500">
                              refresh
                            </span>
                          </button>
                          <button
                            onClick={deleteAudio}
                            className="w-12 h-12 md:w-14 md:h-14 bg-rose-500/80 rounded-full flex items-center justify-center border border-white/20 active:scale-90"
                          >
                            <span className="material-icons text-xl md:text-2xl">
                              delete_forever
                            </span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Navigation Button */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-900 p-6 md:p-8 rounded-[32px] md:rounded-[40px] shadow-2xl overflow-hidden relative group">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#f43f5e22,transparent)]"></div>
                  <div className="relative z-10 text-center md:text-left">
                    <h4 className="text-white text-xl md:text-2xl font-black">
                      Step Terakhir!
                    </h4>
                    <p className="text-slate-400 text-xs md:text-sm font-medium">
                      Uji Pemahamanmu Dengan Kuis Interaktif
                    </p>
                  </div>
                  <button
                    onClick={() => navigate("QUIZ")}
                    className="w-full md:w-auto relative z-10 px-8 py-4 md:px-10 md:py-5 bg-rose-pink text-white rounded-[20px] md:rounded-[24px] font-black flex items-center justify-center gap-3 hover:bg-white hover:text-slate-900 transition-all duration-300 group shadow-xl text-sm md:text-base"
                  >
                    KERJAKAN KUIS
                    <span className="material-icons group-hover:translate-x-2 transition-transform">
                      east
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* QUIZ */}
            {currentStep === "QUIZ" && (
              <div className="space-y-6 md:space-y-8 animate-fadeIn pb-20 px-2 md:px-0">
                {/* 1. Header Kuis */}
                <div className="text-center space-y-3 px-4">
                  <span className="bg-orange-100 text-orange-600 text-[9px] md:text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">
                    Knowledge Check
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                    Kuis{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600">
                      Apresiasi Musik
                    </span>
                  </h2>
                  <p className="max-w-2xl mx-auto text-slate-500 text-xs md:text-sm font-medium leading-relaxed">
                    Uji pemahamanmu tentang jenis musik, ciri-ciri, dan nilai
                    budaya yang telah dipelajari.
                  </p>
                </div>

                {!quizOver ? (
                  <div className="max-w-3xl mx-auto space-y-4 md:space-y-6">
                    {/* Progress & Score Card */}
                    <div className="flex justify-between items-end px-4">
                      <div className="space-y-1">
                        <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Progress Soal
                        </p>
                        <h4 className="text-lg md:text-xl font-black text-slate-900">
                          {currentQ + 1}{" "}
                          <span className="text-slate-300">
                            / {quizData.length}
                          </span>
                        </h4>
                      </div>
                      <div className="bg-orange-500 text-white px-4 md:px-6 py-1.5 md:py-2 rounded-xl md:rounded-2xl shadow-lg shadow-orange-200 text-center">
                        <p className="text-[8px] md:text-[9px] font-black uppercase opacity-80">
                          Skor Kamu
                        </p>
                        <p className="text-lg md:text-xl font-black">{score}</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mx-4 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-500 transition-all duration-500"
                        style={{
                          width: `${((currentQ + 1) / quizData.length) * 100}%`,
                        }}
                      ></div>
                    </div>

                    {/* Question Card */}
                    <div className="bg-white p-6 md:p-12 rounded-[32px] md:rounded-[40px] border border-slate-100 shadow-sm space-y-6 md:space-y-8 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 md:p-8 opacity-5">
                        <span className="material-icons text-6xl md:text-8xl">
                          quiz
                        </span>
                      </div>

                      <h3 className="text-lg md:text-2xl font-bold text-slate-800 leading-tight relative z-10 italic">
                        "{quizData[currentQ].q}"
                      </h3>

                      <div className="grid grid-cols-1 gap-3 relative z-10">
                        {quizData[currentQ].options.map((opt, idx) => {
                          const isSelected = selectedOpt === idx;
                          const isCorrectAns = idx === quizData[currentQ].ans;

                          let btnClass =
                            "bg-slate-50 border-slate-100 text-slate-600 hover:bg-orange-50 hover:border-orange-200";
                          if (isSelected) {
                            btnClass = isCorrectAns
                              ? "bg-emerald-500 border-emerald-600 text-white shadow-lg shadow-emerald-100"
                              : "bg-rose-500 border-rose-600 text-white shadow-lg shadow-rose-100";
                          } else if (selectedOpt !== null && isCorrectAns) {
                            btnClass =
                              "bg-emerald-100 border-emerald-200 text-emerald-700";
                          }

                          return (
                            <button
                              key={idx}
                              disabled={selectedOpt !== null}
                              onClick={() => {
                                setSelectedOpt(idx);
                                if (idx === quizData[currentQ].ans) {
                                  setScore((prev) => prev + 10);
                                  setIsCorrect(true);
                                } else {
                                  setIsCorrect(false);
                                }
                              }}
                              className={`w-full p-4 md:p-5 text-left border-2 rounded-[18px] md:rounded-[24px] font-bold text-xs md:text-sm transition-all duration-300 flex items-center justify-between group active:scale-[0.98] ${btnClass}`}
                            >
                              <span className="pr-4">{opt}</span>
                              {isSelected && (
                                <span className="material-icons text-lg md:text-xl flex-shrink-0">
                                  {isCorrectAns ? "check_circle" : "cancel"}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Next Button */}
                      {selectedOpt !== null && (
                        <button
                          onClick={() => {
                            if (currentQ < quizData.length - 1) {
                              setCurrentQ((prev) => prev + 1);
                              setSelectedOpt(null);
                              setIsCorrect(null);
                            } else {
                              setQuizOver(true);
                            }
                          }}
                          className="w-full py-4 bg-slate-900 text-white rounded-[16px] md:rounded-[20px] font-black text-[10px] md:text-[11px] uppercase tracking-[0.2em] animate-bounceIn shadow-xl active:scale-95"
                        >
                          {currentQ === quizData.length - 1
                            ? "Lihat Hasil Akhir"
                            : "Soal Selanjutnya"}
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  /* STATE: KUIS SELESAI (Optimized for Mobile Viewport) */
                  <div className="max-w-md mx-auto bg-white p-8 md:p-10 rounded-[40px] md:rounded-[50px] border border-slate-100 shadow-2xl text-center space-y-5 md:space-y-6 animate-bounceIn">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                      <span className="material-icons text-4xl md:text-5xl">
                        emoji_events
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                        Luar Biasa!
                      </h3>
                      <p className="text-slate-500 font-medium text-xs md:text-sm px-4">
                        Kamu telah menyelesaikan kuis apresiasi musik hari ini.
                      </p>
                    </div>

                    <div className="bg-slate-50 p-5 md:p-6 rounded-[28px] md:rounded-[32px] border border-slate-100">
                      <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
                        Skor Akhir Kamu
                      </p>
                      <p className="text-5xl md:text-6xl font-black text-orange-500">
                        {score}
                      </p>
                    </div>

                    <div className="space-y-3 pt-2">
                      <button
                        onClick={handleResetQuiz}
                        className="w-full py-4 md:py-5 bg-white text-orange-600 border-2 border-orange-100 rounded-[18px] md:rounded-[24px] font-black text-[10px] md:text-[11px] uppercase tracking-[0.2em] hover:bg-orange-50 transition-all flex items-center justify-center gap-2 group active:scale-95"
                      >
                        <span className="material-icons text-sm group-hover:rotate-180 transition-transform duration-500">
                          refresh
                        </span>
                        Ulangi Kuis
                      </button>

                      <button
                        onClick={() => navigate("GALLERY")}
                        className="w-full py-4 md:py-5 bg-slate-900 text-white rounded-[18px] md:rounded-[24px] font-black text-[10px] md:text-[11px] uppercase tracking-[0.2em] hover:bg-rose-pink transition-all shadow-xl active:scale-95"
                      >
                        Lihat Galeri Kebinekaan
                      </button>
                    </div>
                  </div>
                )}

                {/* Footer Info (Only if Quiz is active) */}
                {!quizOver && (
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 bg-slate-900 p-6 md:p-8 rounded-[32px] md:rounded-[40px] shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#f43f5e22,transparent)]"></div>
                    <div className="relative z-10 text-center md:text-left">
                      <h4 className="text-white text-lg md:text-2xl font-black">
                        Tetap Fokus!
                      </h4>
                      <p className="text-slate-400 text-[11px] md:text-sm font-medium">
                        Selesaikan soal untuk membuka galeri
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-white/40 relative z-10">
                      <span className="material-icons text-sm md:text-base animate-pulse">
                        timer
                      </span>
                      <span className="text-[9px] md:text-xs font-bold tracking-widest uppercase">
                        No Time Limit
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* GALLERY */}
            {currentStep === "GALLERY" && (
              <div className="space-y-8 md:space-y-10 animate-fadeIn pb-24 px-2 md:px-0">
                {/* HEADER */}
                <div className="text-center space-y-3 md:space-y-4 px-4">
                  <span className="bg-cyan-100 text-cyan-600 text-[9px] md:text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">
                    Indonesia Heritage
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                    Galeri Musik{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
                      Nusantara
                    </span>
                  </h2>
                  <p className="max-w-2xl mx-auto text-slate-500 text-xs md:text-sm font-medium leading-relaxed">
                    Pilih kartu kecil di bawah untuk mengganti playlist video
                    utama.
                  </p>
                </div>

                {/* VIDEO PLAYER UTAMA */}
                <div className="bg-white p-2 md:p-3 rounded-[32px] md:rounded-[40px] shadow-2xl border border-slate-100 animate-fadeIn">
                  <div className="aspect-video bg-black rounded-[26px] md:rounded-[32px] overflow-hidden shadow-inner relative">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-4 md:p-5 flex justify-between items-center">
                    <div>
                      <p className="text-[8px] md:text-[10px] font-black text-cyan-500 uppercase tracking-[0.2em] mb-1">
                        Sedang Diputar:
                      </p>
                      <h3 className="text-lg md:text-xl font-black text-slate-800 tracking-tight leading-tight">
                        {activeVideo.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* FILTER GENRE (Scrollable on Mobile) */}
                <div className="flex justify-center w-full overflow-hidden">
                  <div className="flex bg-slate-100 p-1 rounded-xl max-w-full overflow-x-auto no-scrollbar">
                    {["Semua", "Tradisional", "Folk", "Orkestra"].map((g) => (
                      <button
                        key={g}
                        onClick={() => setFilterGenre(g)}
                        className={`whitespace-nowrap px-5 md:px-6 py-2 rounded-lg text-[8px] md:text-[9px] font-black uppercase tracking-widest transition-all ${
                          filterGenre === g
                            ? "bg-white text-blue-600 shadow-sm"
                            : "text-slate-400 hover:text-slate-600"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* GRID CARDS - Responsive Columns */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 px-2">
                  {galeriFiltered.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setActiveVideo(item);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className={`group cursor-pointer rounded-[20px] md:rounded-[24px] overflow-hidden border-2 transition-all duration-300 active:scale-95 ${
                        activeVideo.id === item.id
                          ? "border-cyan-500 shadow-lg"
                          : "border-white hover:border-cyan-100 shadow-md"
                      }`}
                    >
                      <div className="aspect-square relative">
                        <img
                          src={item.thumb}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          alt={item.title}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />

                        <div className="absolute bottom-0 left-0 right-0 p-2.5 md:p-3">
                          <span className="bg-cyan-500 text-white text-[6px] md:text-[7px] font-black px-1.5 py-0.5 rounded uppercase mb-1 inline-block">
                            {item.genre}
                          </span>
                          <p className="text-white font-bold text-[9px] md:text-[10px] leading-tight line-clamp-2">
                            {item.title}
                          </p>
                        </div>

                        {activeVideo.id === item.id && (
                          <div className="absolute inset-0 bg-cyan-500/20 backdrop-blur-[1px] flex items-center justify-center">
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center text-cyan-500 shadow-xl">
                              <span className="material-icons text-lg md:text-xl">
                                play_arrow
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 4. Navigation Button */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-900 p-6 md:p-8 rounded-[32px] md:rounded-[40px] shadow-2xl overflow-hidden relative group mx-2">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#f43f5e22,transparent)]"></div>
                  <div className="relative z-10 text-center md:text-left">
                    <h4 className="text-white text-xl md:text-2xl font-black">
                      Eksplorasi Selesai?
                    </h4>
                    <p className="text-slate-400 text-xs md:text-sm font-medium">
                      Cek Rangkuman Pengalaman Belajarmu Di Sini
                    </p>
                  </div>
                  <button
                    onClick={() => navigate("REPORT")}
                    className="w-full md:w-auto relative z-10 px-8 py-4 md:px-10 md:py-5 bg-rose-pink text-white rounded-[18px] md:rounded-[24px] font-black text-[10px] md:text-sm flex items-center justify-center gap-3 hover:bg-white hover:text-slate-900 transition-all duration-300 group shadow-xl active:scale-95"
                  >
                    LIHAT LAPORAN AKHIR
                    <span className="material-icons group-hover:translate-x-2 transition-transform text-sm md:text-base">
                      east
                    </span>
                  </button>
                </div>
              </div>
            )}
            {/* REPORT SECTION */}
            {currentStep === "REPORT" &&
              (() => {
                const kuisScore = Math.round((score / 5) * 100);
                const totalKarakter = answers
                  ? answers.reduce((acc, curr) => acc + curr.length, 0)
                  : 0;
                const nilaiKreatif =
                  totalKarakter > 100 ? 98 : totalKarakter > 0 ? 85 : 0;
                const finalGrade = Math.round(
                  (kuisScore + nilaiKreatif + 100) / 3
                );

                return (
                  <div className="max-w-5xl mx-auto space-y-8 md:space-y-12 animate-fadeIn pb-24 px-4 md:px-0">
                    {/* 1. REKAP CAPAIAN & ASESMEN (Grid Responsive) */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                      {/* Capaian Kompetensi */}
                      <div className="bg-white p-6 md:p-10 rounded-[32px] md:rounded-[40px] shadow-2xl border border-slate-100 space-y-6">
                        <h3 className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <span className="material-icons text-rose-500 text-sm">
                            stars
                          </span>{" "}
                          Capaian Kompetensi
                        </h3>
                        <div className="space-y-5">
                          {[
                            {
                              label: "Bernalar Kritis (Kuis)",
                              val: kuisScore,
                              color: "bg-cyan-500",
                            },
                            {
                              label: "Kreatif (Refleksi)",
                              val: nilaiKreatif,
                              color: "bg-rose-500",
                            },
                            {
                              label: "Kebinekaan Global",
                              val: 100,
                              color: "bg-emerald-500",
                            },
                          ].map((item, idx) => (
                            <div key={idx} className="space-y-2">
                              <div className="flex justify-between text-[10px] md:text-[11px] font-black uppercase">
                                <span>{item.label}</span>
                                <span>{item.val}%</span>
                              </div>
                              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                  className={`${item.color} h-full transition-all duration-1000`}
                                  style={{ width: `${item.val}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Asesmen Kelompok */}
                      <div className="bg-slate-900 p-6 md:p-10 rounded-[32px] md:rounded-[40px] shadow-2xl text-white">
                        <h3 className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest mb-6">
                          Asesmen Kelompok & Observasi
                        </h3>
                        <div className="space-y-4">
                          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 italic text-[11px] md:text-xs text-slate-400">
                            <p className="font-bold text-cyan-400 not-italic mb-1 uppercase text-[9px] md:text-[10px]">
                              Catatan Observasi Digital:
                            </p>
                            "Siswa menunjukkan kemampuan apresiatif yang sangat
                            baik dalam mengidentifikasi instrumen nusantara."
                          </div>
                          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 italic text-[11px] md:text-xs text-slate-400">
                            <p className="font-bold text-emerald-400 not-italic mb-1 uppercase text-[9px] md:text-[10px]">
                              Laporan Kelompok:
                            </p>
                            "Kelompok telah menyelesaikan analisis kontekstual
                            mengenai fungsi sosial musik tradisional."
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 2. SERTIFIKAT VISUAL (Mobile Optimized) */}
                    <div className="bg-white border-[8px] md:border-[16px] border-slate-50 p-1 rounded-[40px] md:rounded-[60px] shadow-2xl relative overflow-hidden">
                      <div className="bg-white border-2 border-dashed border-slate-200 rounded-[32px] md:rounded-[45px] p-6 md:p-12 text-center space-y-6 md:space-y-8">
                        <span className="material-icons text-5xl md:text-7xl text-amber-400">
                          verified_user
                        </span>
                        <div className="space-y-2">
                          <h3 className="text-[8px] md:text-[10px] font-black text-cyan-600 uppercase tracking-[0.2em] md:tracking-[0.4em]">
                            Sertifikat Apresiasi Musik
                          </h3>
                          <h2 className="text-3xl md:text-5xl font-black text-slate-900 italic tracking-tighter">
                            MusicScope Indonesia
                          </h2>
                        </div>
                        <div className="w-16 md:w-24 h-1 bg-slate-900 mx-auto" />
                        <p className="max-w-md mx-auto text-xs md:text-sm text-slate-500 leading-relaxed font-medium px-2">
                          Diberikan kepada siswa sebagai bentuk apresiasi atas
                          dedikasi dalam mempelajari dan melestarikan budaya
                          musik Nusantara melalui pendekatan{" "}
                          <b>Deep Learning</b>.
                        </p>

                        <div className="flex flex-row justify-between items-end pt-4 md:pt-8 px-2 md:px-4 gap-2">
                          <div className="text-left">
                            <p className="text-[7px] md:text-[8px] font-black text-slate-300 uppercase mb-1 md:mb-2">
                              ID Verifikasi
                            </p>
                            <p className="text-[8px] md:text-[10px] font-mono font-bold break-all">
                              MS-
                              {Math.random()
                                .toString(36)
                                .substr(2, 6)
                                .toUpperCase()}
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-[7px] md:text-[8px] font-black text-slate-300 uppercase mb-1 md:mb-2">
                              Nilai Akhir
                            </p>
                            <p className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter">
                              {finalGrade}/100
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 3. ACTIONS (Stack on Mobile) */}
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-2">
                      <button
                        onClick={() => window.print()}
                        className="w-full sm:w-auto bg-slate-900 text-white px-8 py-4 md:py-6 rounded-[20px] md:rounded-[24px] font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95"
                      >
                        <span className="material-icons text-sm">
                          picture_as_pdf
                        </span>
                        Unduh Laporan
                      </button>

                      <button
                        onClick={handleShare}
                        className="w-full sm:w-auto bg-cyan-500 text-white px-8 py-4 md:py-6 rounded-[20px] md:rounded-[24px] font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-cyan-600 transition-all shadow-xl shadow-cyan-100 flex items-center justify-center gap-3 active:scale-95"
                      >
                        <span className="material-icons text-sm">share</span>
                        Bagikan
                      </button>

                      <button
                        onClick={() => window.location.reload()}
                        className="w-full sm:w-auto bg-white border-2 border-slate-100 text-slate-400 px-8 py-4 md:py-6 rounded-[20px] md:rounded-[24px] font-black text-[10px] md:text-xs uppercase tracking-widest hover:text-rose-500 transition-all flex items-center justify-center gap-3 active:scale-95"
                      >
                        <span className="material-icons text-sm">refresh</span>
                        Ulangi
                      </button>
                    </div>
                  </div>
                );
              })()}

            {(currentStep as string) !== "SPLASH" && (
              <footer className="mt-auto py-8 border-t border-slate-100 bg-white/50 backdrop-blur-sm relative z-10">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                  {/* Sisi Kiri: Copyright */}
                  <div className="flex flex-col items-center md:items-start">
                    <p className="text-[11px] font-black text-slate-800 uppercase tracking-widest">
                      &copy; 2026 Music
                      <span className="text-rose-pink">Scope</span>
                    </p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                      Platform Belajar Musik Masa Depan
                    </p>
                  </div>

                  {/* Sisi Tengah: Navigasi Cepat (Opsi Tambahan) */}
                  <div className="flex gap-6">
                    <button
                      onClick={() => navigate("MENU")}
                      className="text-[10px] font-black text-slate-400 hover:text-rose-pink transition-colors uppercase tracking-widest"
                    >
                      Kurikulum
                    </button>
                    <button className="text-[10px] font-black text-slate-400 hover:text-rose-pink transition-colors uppercase tracking-widest">
                      Bantuan
                    </button>
                    <button className="text-[10px] font-black text-slate-400 hover:text-rose-pink transition-colors uppercase tracking-widest">
                      Privasi
                    </button>
                  </div>

                  {/* Sisi Kanan: Status */}
                  <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-full">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-black text-emerald-700 uppercase tracking-tight">
                      System Online
                    </span>
                  </div>
                </div>
              </footer>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
