
import React from "react";
import { ArrowLeft } from "lucide-react";

export default function CreatorTerms({ onNavigate, onAccept }: { onNavigate?: (view: string) => void; onAccept?: () => void }) {
  return (
    <div className="bg-black min-h-screen w-full pt-[100px] pb-20 px-6 md:px-10 flex flex-col items-center">
      <div className="max-w-[1000px] w-full">
        
        {/* Navigation Back */}
        <button 
            onClick={() => onNavigate?.('become-creator')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
        >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Kembali ke Pendaftaran</span>
        </button>

        {/* Title */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Syarat & Ketentuan Kreator COSMIC</h1>
          <p className="text-[#d032e5] font-semibold text-lg tracking-widest">(CREATOR TERMS)</p>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-8 text-gray-300 leading-relaxed text-sm md:text-base text-justify bg-[#121212] p-8 rounded-[24px] border border-[#27272a]">
            
            <p>
                Selamat datang di komunitas Kreator COSMIC! Dokumen ini merupakan perjanjian hukum antara Anda (selanjutnya disebut sebagai "Kreator") dan COSMIC. Dengan mendaftarkan diri sebagai Kreator, Anda menyatakan bahwa Anda telah membaca, memahami, dan menyetujui seluruh poin di bawah ini.
            </p>

            <section>
                <h3 className="text-white font-bold text-lg mb-2">1. Persyaratan Kelayakan</h3>
                <p className="mb-2">Untuk menjadi Kreator di COSMIC, Anda harus:</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Berusia setidaknya 18 tahun atau telah dianggap dewasa menurut hukum yang berlaku di wilayah Anda.</li>
                    <li>Memiliki akun aktif yang terverifikasi di platform COSMIC.</li>
                    <li>Menyelesaikan proses pendaftaran dan profil secara lengkap sesuai panduan komunitas.</li>
                </ul>
            </section>

            <section>
                <h3 className="text-white font-bold text-lg mb-2">2. Akun dan Keamanan</h3>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Anda bertanggung jawab penuh atas kerahasiaan kata sandi dan seluruh aktivitas yang terjadi di bawah akun Kreator Anda.</li>
                    <li>Anda setuju untuk memberikan informasi yang akurat, lengkap, dan terbaru saat proses pendaftaran dan pemutakhiran data profil.</li>
                </ul>
            </section>

            <section>
                <h3 className="text-white font-bold text-lg mb-2">3. Skema Komisi dan Pembagian Hasil</h3>
                <p className="mb-2">COSMIC menerapkan kebijakan biaya layanan yang transparan untuk mendukung pertumbuhan ekosistem platform. Biaya layanan ini terdiri dari Komisi Suporter (biaya administrasi tambahan saat transaksi) dan Komisi Kreator (potongan dari nilai bruto pendapatan).</p>
                <p className="mb-2">Rincian pembagian hasil berdasarkan tipe transaksi adalah sebagai berikut:</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li><strong className="text-white">Transaksi Pembelian Produk:</strong> Untuk setiap produk digital atau fisik yang terjual melalui platform, Suporter akan dikenakan biaya layanan sebesar 5% (lima persen) dari harga produk. Dari sisi Kreator, pendapatan akan dikenakan potongan komisi sebesar 5% (lima persen).</li>
                    <li><strong className="text-white">Transaksi Tipping & Wishlist:</strong> Untuk setiap pemberian dukungan berupa Tip atau pemenuhan Wishlist, Suporter akan dikenakan biaya layanan sebesar 5% (lima persen). Sementara itu, Kreator akan dikenakan potongan komisi sebesar 2,5% (dua koma lima persen) dari nilai dukungan yang diterima.</li>
                    <li><strong className="text-white">Transaksi Streaming Donate:</strong> Sebagai bentuk dukungan terhadap interaksi langsung, setiap donasi yang dilakukan selama sesi Streaming akan dikenakan biaya layanan sebesar 5% (lima persen) bagi Suporter, namun Kreator akan menerima pendapatan secara penuh atau dikenakan komisi sebesar 0% (nol persen).</li>
                    <li><strong className="text-white">Mekanisme Perhitungan:</strong> Komisi Suporter ditambahkan ke dalam total pembayaran yang harus dibayar fans, sedangkan Komisi Kreator dipotong langsung dari nilai transaksi sebelum masuk ke saldo akun Anda.
                        <ul className="list-[circle] pl-5 mt-1 text-gray-400 italic">
                            <li>Contoh: Jika seorang Suporter memberikan Tip sebesar Rp100.000, Suporter membayar Rp105.000. Kreator akan menerima bersih Rp97.500 ke dalam saldo akun (setelah potongan 2,5%).</li>
                        </ul>
                    </li>
                </ul>
            </section>

            <section>
                <h3 className="text-white font-bold text-lg mb-2">4. Kebijakan Konten dan Moderasi</h3>
                <p className="mb-2">COSMIC berkomitmen untuk menjaga lingkungan platform yang positif, aman, dan profesional.</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li><strong className="text-white">Larangan Konten:</strong> Kreator dilarang keras mengunggah, membagikan, atau mempromosikan konten yang mengandung unsur:
                        <ul className="list-[circle] pl-5 mt-1">
                            <li>Pornografi: Segala bentuk materi seksual eksplisit, ketelanjangan, atau tindakan asusila.</li>
                            <li>SARA: Konten yang mengandung ujaran kebencian, diskriminasi, atau penghinaan terhadap Suku, Agama, Ras, dan Antargolongan.</li>
                            <li>Kekerasan & Ilegal: Konten yang mempromosikan kekerasan, aktivitas ilegal, perjudian, atau penggunaan zat terlarang.</li>
                        </ul>
                    </li>
                    <li><strong className="text-white">Persetujuan Verifikasi Manual:</strong> Sebagai syarat utama, Kreator setuju bahwa setiap konten yang diunggah ke platform COSMIC akan melalui proses verifikasi manual oleh tim moderasi kami. COSMIC berhak menolak, menghapus, atau menyembunyikan konten yang dianggap tidak sesuai dengan standar komunitas tanpa pemberitahuan sebelumnya.</li>
                    <li><strong className="text-white">Sanksi:</strong> Pelanggaran terhadap kebijakan konten ini akan berakibat pada penangguhan akun secara permanen dan pembekuan seluruh saldo pendapatan untuk tujuan investigasi lebih lanjut.</li>
                </ul>
            </section>

            <section>
                <h3 className="text-white font-bold text-lg mb-2">5. Hak Kekayaan Intelektual</h3>
                <ul className="list-disc pl-5 space-y-1">
                    <li><strong className="text-white">Kepemilikan:</strong> Anda tetap merupakan pemilik sah atas hak cipta dari seluruh konten yang Anda unggah ke COSMIC.</li>
                    <li><strong className="text-white">Lisensi Platform:</strong> Anda memberikan hak kepada COSMIC untuk menyimpan, menampilkan, dan mempromosikan konten tersebut di dalam ekosistem platform demi kepentingan operasional dan promosi profil Anda.</li>
                    <li><strong className="text-white">Jaminan Originalitas:</strong> Anda menjamin bahwa konten yang diunggah adalah karya asli atau Anda memiliki izin tertulis untuk mendistribusikannya secara komersial.</li>
                </ul>
            </section>

            <section>
                <h3 className="text-white font-bold text-lg mb-2">6. Ketentuan Penarikan Pendapatan (Payout)</h3>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Saldo pendapatan dapat ditarik setelah mencapai ambang batas minimum sebesar Rp 100.000.</li>
                    <li>Proses verifikasi penarikan saldo memerlukan waktu Maksimal 2 hari kerja demi keamanan transaksi dan pencegahan penipuan.</li>
                    <li>Segala biaya administrasi bank atau biaya transfer yang timbul saat proses penarikan menjadi tanggung jawab Kreator.</li>
                </ul>
            </section>

            <section>
                <h3 className="text-white font-bold text-lg mb-2">7. Tanggung Jawab Pajak</h3>
                <p>Kreator bertanggung jawab penuh atas pelaporan dan pembayaran pajak atas pendapatan yang diperoleh melalui COSMIC sesuai dengan peraturan perpajakan yang berlaku di wilayah domisili masing-masing.</p>
            </section>

            <section>
                <h3 className="text-white font-bold text-lg mb-2">8. Perubahan Ketentuan</h3>
                <p>COSMIC berhak mengubah atau memperbarui Syarat & Ketentuan ini sewaktu-waktu. Perubahan signifikan akan diinformasikan melalui dashboard Kreator atau email terdaftar. Penggunaan platform secara berkelanjutan setelah perubahan dianggap sebagai bentuk persetujuan Anda terhadap ketentuan baru tersebut.</p>
            </section>

            <div className="pt-4 border-t border-white/10 text-gray-400 italic text-center">
                Dengan mengklik tombol "Daftar Menjadi Kreator" pada formulir pendaftaran, Anda secara sadar setuju untuk terikat dalam perjanjian ini dan siap membangun komunitas yang hebat di COSMIC.
            </div>
            
            <button 
                onClick={() => {
                    onAccept?.();
                    onNavigate?.('become-creator');
                }}
                className="w-full py-4 bg-gradient-to-r from-[#8700a2] to-[#d032e5] hover:opacity-90 active:scale-[0.98] text-white font-bold rounded-full transition-all shadow-[0_4px_20px_rgba(135,0,162,0.3)] mt-4 text-lg cursor-pointer"
            >
                I Understand & Continue Registration
            </button>

        </div>
      </div>
    </div>
  );
}
