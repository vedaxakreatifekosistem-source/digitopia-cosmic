
import React from "react";

export default function TermsOfUse() {
  return (
    <div className="bg-black min-h-screen w-full pt-[100px] pb-20 px-6 md:px-10 flex flex-col items-center">
      <div className="max-w-[1000px] w-full">
        {/* Title */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">SYARAT DAN KETENTUAN LAYANAN</h1>
          <p className="text-[#d032e5] font-semibold text-lg tracking-widest">(TERMS OF SERVICE)</p>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-8 text-gray-300 leading-relaxed text-sm md:text-base text-justify">
          
          {/* PEMBUKAAN */}
          <section>
            <h2 className="text-white text-xl font-bold mb-4 border-b border-white/20 pb-2">PEMBUKAAN</h2>
            <p className="mb-4">
              Syarat dan Ketentuan Layanan (“Perjanjian” atau “Terms of Service”) ini merupakan perjanjian yang mengikat secara hukum antara PT SINERGI DIGITAL TECHNOLOGY (“Perusahaan”, “Kami”, atau “Cosmic”) dengan setiap individu atau badan hukum yang mengakses, menggunakan, atau terdaftar sebagai pengguna layanan (“Pengguna”, “Anda”).
            </p>
            <p className="mb-4">
              Dengan mengakses atau menggunakan platform Cosmic, Anda menyatakan bahwa Anda telah membaca, memahami, dan menyetujui seluruh ketentuan dalam dokumen ini tanpa paksaan dari pihak mana pun. Apabila Anda tidak menyetujui sebagian atau seluruh ketentuan, Anda tidak diperkenankan menggunakan layanan Cosmic.
            </p>
            <p>
              Dokumen ini berlaku efektif sejak 7 Juli 2025 dan tunduk pada hukum yang berlaku di Republik Indonesia.
            </p>
          </section>

          {/* PASAL 1 */}
          <section>
            <h2 className="text-white text-xl font-bold mb-4 border-b border-white/20 pb-2">PASAL 1 — DEFINISI</h2>
            <p className="mb-4">Dalam dokumen ini, kecuali dinyatakan lain:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Platform Cosmic</strong> adalah sistem daring yang dioperasikan oleh PT Sinergi Digital Technology untuk menyediakan layanan jual beli konten digital, layanan streaming, interaksi antar pengguna, dan langganan keanggotaan.</li>
              <li><strong>Kreator</strong> adalah pengguna terverifikasi yang membuat, mengunggah, atau menjual konten digital di dalam platform Cosmic.</li>
              <li><strong>Suporter</strong> adalah pengguna yang membeli, memberikan dukungan finansial (tipping), atau berlangganan layanan dari Kreator.</li>
              <li><strong>Layanan</strong> mencakup seluruh fitur, sistem, aplikasi, dan fungsi yang disediakan oleh Cosmic.</li>
              <li><strong>Transaksi</strong> adalah kegiatan pertukaran nilai antara Kreator dan Suporter melalui sistem pembayaran yang disediakan Cosmic.</li>
              <li><strong>Konten</strong> berarti segala bentuk materi digital yang diunggah oleh pengguna, termasuk tetapi tidak terbatas pada gambar, video, teks, audio, dan layanan interaktif.</li>
              <li><strong>Data Pribadi</strong> berarti setiap informasi yang dapat mengidentifikasi seseorang secara langsung atau tidak langsung, sesuai ketentuan Undang-Undang Nomor 27 Tahun 2022 tentang Perlindungan Data Pribadi.</li>
              <li><strong>Komisi</strong> adalah biaya layanan yang dikenakan oleh Cosmic dari setiap transaksi yang dilakukan di dalam platform.</li>
            </ul>
          </section>

          {/* PASAL 2 */}
          <section>
            <h2 className="text-white text-xl font-bold mb-4 border-b border-white/20 pb-2">PASAL 2 — KETENTUAN UMUM</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Pengguna setidaknya berusia 18 (delapan belas) tahun dan memiliki kapasitas hukum penuh untuk menandatangani perjanjian ini.</li>
              <li>Apabila pengguna berusia di bawah 18 (delapan belas) tahun, maka orang tua atau wali pengguna telah meninjau dan menyetujui Ketentuan ini dan atas nama penggua, dan telah menyetujui pengguna untuk menggunakan Layanan kami.</li>
              <li>Setiap pengguna wajib melakukan verifikasi identitas sebagaimana ditetapkan oleh Cosmic untuk mencegah penyalahgunaan dan menjamin keamanan transaksi.</li>
              <li>Cosmic berhak menolak, membatasi, atau menangguhkan akses terhadap layanan apabila pengguna melanggar ketentuan dalam dokumen ini.</li>
              <li>Segala aktivitas pengguna di platform merupakan tanggung jawab pribadi pengguna tersebut.</li>
              <li>Cosmic tidak bertanggung jawab atas kerugian yang timbul akibat pelanggaran atau kelalaian pengguna.</li>
            </ul>
          </section>

          {/* PASAL 3 */}
          <section>
            <h2 className="text-white text-xl font-bold mb-4 border-b border-white/20 pb-2">PASAL 3 — PENDAFTARAN DAN AKUN PENGGUNA</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Pengguna wajib memberikan informasi yang benar, lengkap, dan akurat saat melakukan pendaftaran akun.</li>
              <li>Dilarang menggunakan identitas palsu, akun duplikat, atau informasi fiktif.</li>
              <li>Setiap akun hanya boleh digunakan oleh satu individu; penggunaan bersama, peminjaman, atau jual beli akun dilarang.</li>
              <li>Pengguna bertanggung jawab penuh atas keamanan akun dan kata sandinya.</li>
              <li>Cosmic tidak bertanggung jawab atas akses tidak sah yang terjadi akibat kelalaian pengguna menjaga kerahasiaan akun.</li>
            </ul>
          </section>

          {/* PASAL 4 */}
          <section>
            <h2 className="text-white text-xl font-bold mb-4 border-b border-white/20 pb-2">PASAL 4 — HAK DAN KEWAJIBAN PENGGUNA</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Pengguna berhak mengakses dan menggunakan layanan sesuai ketentuan yang berlaku.</li>
              <li>Pengguna wajib menjaga etika, sopan santun, dan tidak melakukan tindakan yang bertentangan dengan hukum, norma, atau kebijakan platform.</li>
              <li>Pengguna dilarang:
                <ul className="list-[circle] pl-6 mt-2 space-y-1 text-gray-400">
                  <li>Mengunggah konten yang mengandung SARA, pornografi, kekerasan, atau ujaran kebencian.</li>
                  <li>Melakukan penipuan, spam, atau eksploitasi terhadap pengguna lain.</li>
                  <li>Menyebarluaskan informasi pribadi pihak lain tanpa izin.</li>
                  <li>Melanggar hak cipta atau hak kekayaan intelektual pihak mana pun.</li>
                </ul>
              </li>
              <li>Setiap pelanggaran atas ketentuan ini akan mengakibatkan penangguhan atau penghapusan akun secara permanen tanpa pengembalian dana.</li>
            </ul>
          </section>

          {/* PASAL 5 */}
          <section>
            <h2 className="text-white text-xl font-bold mb-4 border-b border-white/20 pb-2">PASAL 5 — KEWAJIBAN KREATOR</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Kreator wajib memastikan bahwa seluruh konten yang diunggah merupakan karya asli atau memiliki izin penggunaan sah.</li>
              <li>Kreator dilarang mengunggah, menjual, atau menyalin karya milik pihak ketiga tanpa izin tertulis.</li>
              <li>Kreator bertanggung jawab penuh atas segala klaim hukum yang timbul dari konten yang diunggah.</li>
              <li>Cosmic berhak menurunkan, menonaktifkan, atau menghapus konten yang melanggar hukum atau ketentuan platform.</li>
              <li>Kreator wajib mematuhi sistem komisi dan pembagian hasil sebagaimana diatur dalam Pasal 7.</li>
            </ul>
          </section>

          {/* PASAL 6 */}
          <section>
            <h2 className="text-white text-xl font-bold mb-4 border-b border-white/20 pb-2">PASAL 6 — HAK CIPTA DAN KEKAYAAN INTELEKTUAL</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Hak cipta atas konten tetap menjadi milik Kreator sebagai pemilik sah.</li>
              <li>Dengan mengunggah konten, Kreator memberikan lisensi non-eksklusif, global, dan bebas royalti kepada Cosmic untuk menampilkan, mempromosikan, dan mendistribusikan konten di dalam platform.</li>
              <li>Pengguna dilarang menyalin, memodifikasi, mendistribusikan, atau menggunakan konten pihak lain tanpa izin tertulis.</li>
              <li>Segala pelanggaran terhadap hak cipta akan diproses sesuai Undang-Undang Nomor 28 Tahun 2014 tentang Hak Cipta.</li>
            </ul>
          </section>

          {/* PASAL 7 */}
          <section>
            <h2 className="text-white text-xl font-bold mb-4 border-b border-white/20 pb-2">PASAL 7 — TRANSAKSI DAN PEMBAYARAN</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Seluruh transaksi di Cosmic dilakukan menggunakan sistem pembayaran resmi yang disediakan, yaitu QRIS.</li>
              <li>
                Setiap transaksi akan dikenakan komisi berdasarkan jenis transaksinya,
                <ol className="list-decimal pl-6 mt-2 space-y-1">
                  <li>Transaksi Pembelian Produk, Setiap transaksi akan dikenakan komisi 5% (lima persen) baik bagi Suporter maupun bagi Kreator.</li>
                  <li>Transaksi Tipping & Wishlist, Setiap transaksi akan dikenakan komisi 5% (lima persen) bagi Suporter dan 2,5% (dua koma lima persen) bagi Kreator.</li>
                  <li>Transaksi Streaming Donate, Setiap transaksi akan dikenakan komisi 5% (lima persen) bagi Suporter dan 0% (nol persen) bagi Kreator.</li>
                </ol>
              </li>
              <li>Cosmic tidak menyediakan kebijakan refund atas transaksi yang telah diselesaikan.</li>
              <li>Pengguna wajib memastikan keabsahan data pembayaran yang digunakan.</li>
              <li>Setiap indikasi penipuan, pencucian uang, atau transaksi ilegal akan dilaporkan kepada pihak berwenang.</li>
            </ul>
          </section>

          {/* PASAL 8 */}
          <section>
            <h2 className="text-white text-xl font-bold mb-4 border-b border-white/20 pb-2">PASAL 8 — TANGGUNG JAWAB DAN PEMBATASAN</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cosmic bertanggung jawab sebatas penyediaan platform digital, bukan sebagai pihak dalam hubungan hukum antara Kreator dan Suporter.</li>
              <li>Cosmic tidak bertanggung jawab atas konten, interaksi, atau transaksi yang dilakukan antar pengguna.</li>
              <li>Cosmic tidak menjamin ketersediaan sistem tanpa gangguan, namun akan berupaya menjaga stabilitas layanan.</li>
              <li>Segala kerugian tidak langsung, kehilangan data, atau kerusakan sistem bukan tanggung jawab Cosmic.</li>
            </ul>
          </section>

          {/* PASAL 9 */}
          <section>
            <h2 className="text-white text-xl font-bold mb-4 border-b border-white/20 pb-2">PASAL 9 — LARANGAN DAN PENEGAKAN</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Pengguna dilarang menggunakan platform untuk kegiatan melanggar hukum, termasuk namun tidak terbatas pada perjudian, pencucian uang, atau eksploitasi anak.</li>
              <li>Cosmic berhak melakukan pemblokiran, penangguhan, atau pelaporan kepada aparat hukum tanpa pemberitahuan sebelumnya apabila ditemukan pelanggaran.</li>
              <li>Keputusan tim Cosmic bersifat final dan tidak dapat diganggu gugat.</li>
            </ul>
          </section>

          {/* PASAL 10 */}
          <section>
            <h2 className="text-white text-xl font-bold mb-4 border-b border-white/20 pb-2">PASAL 10 — PENANGGUHAN DAN PENGHAPUSAN AKUN</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cosmic berhak menonaktifkan akun pengguna apabila ditemukan pelanggaran terhadap ketentuan.</li>
              <li>Akun dapat dihapus berdasarkan permintaan pengguna setelah seluruh kewajiban transaksi diselesaikan.</li>
              <li>Cosmic berhak menyimpan data transaksi selama diperlukan untuk kepentingan audit dan hukum.</li>
            </ul>
          </section>

          {/* PASAL 11 */}
          <section>
            <h2 className="text-white text-xl font-bold mb-4 border-b border-white/20 pb-2">PASAL 11 — KERAHASIAAN DAN DATA PRIBADI</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cosmic mengumpulkan data pribadi pengguna seperti nama, email, nomor telepon, dan data pembayaran.</li>
              <li>Data digunakan untuk keperluan verifikasi, statistik, dan personalisasi layanan.</li>
              <li>Data dapat dibagikan kepada mitra pembayaran untuk penyelesaian transaksi.</li>
              <li>Cosmic tidak akan menjual atau mempublikasikan data pribadi tanpa izin tertulis.</li>
              <li>Pengguna dapat mengajukan penghapusan data dengan menghubungi tim dukungan Cosmic.</li>
            </ul>
          </section>

          {/* PASAL 12 */}
          <section>
            <h2 className="text-white text-xl font-bold mb-4 border-b border-white/20 pb-2">PASAL 12 — PENYELESAIAN SENGKETA</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Segala perselisihan akan diselesaikan terlebih dahulu melalui musyawarah kekeluargaan antara pengguna dan Cosmic.</li>
              <li>Apabila tidak tercapai kesepakatan dalam 30 hari, maka sengketa akan diselesaikan melalui mediasi atau arbitrase di Indonesia.</li>
              <li>Hukum yang berlaku adalah hukum Republik Indonesia.</li>
            </ul>
          </section>

          {/* PASAL 13 */}
          <section>
            <h2 className="text-white text-xl font-bold mb-4 border-b border-white/20 pb-2">PASAL 13 — PERUBAHAN KETENTUAN</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cosmic berhak mengubah, menambah, atau memperbarui isi ketentuan ini sewaktu-waktu.</li>
              <li>Perubahan akan diumumkan melalui situs resmi atau kanal komunikasi resmi Cosmic.</li>
              <li>Pengguna dianggap menyetujui perubahan apabila tetap menggunakan layanan setelah pembaruan diumumkan.</li>
            </ul>
          </section>

          {/* PASAL 14 */}
          <section>
            <h2 className="text-white text-xl font-bold mb-4 border-b border-white/20 pb-2">PASAL 14 — PEMBERITAHUAN DAN KOMUNIKASI</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Semua komunikasi resmi dilakukan melalui email support@digimates.id.</li>
              <li>Cosmic tidak bertanggung jawab atas kehilangan informasi akibat pengguna tidak memperbarui kontaknya.</li>
              <li>Notifikasi elektronik yang dikirim Cosmic dianggap sah dan mengikat.</li>
            </ul>
          </section>

          {/* PASAL 15 */}
          <section>
            <h2 className="text-white text-xl font-bold mb-4 border-b border-white/20 pb-2">PASAL 15 — PENUTUP</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Dengan menggunakan layanan Cosmic, pengguna dianggap telah memahami dan menyetujui seluruh isi perjanjian ini.</li>
              <li>Dokumen ini berlaku secara sah sejak tanggal ditetapkan.</li>
              <li>Ketentuan ini merupakan satu-satunya acuan hukum yang mengatur hubungan antara pengguna dan PT Sinergi Digital Technology.</li>
            </ul>
          </section>

          {/* Footer Signature */}
          <div className="mt-10 pt-10 border-t border-white/10 text-center">
            <p className="font-bold text-white">Ditetapkan di Surabaya, 7 Juli 2025</p>
            <p className="font-bold text-[#d032e5] text-lg">PT SINERGI DIGITAL TECHNOLOGY</p>
            <p className="text-xs text-gray-500 mt-4">
              Dokumen ini merupakan properti PT Sinergi Digital Technology dan dilindungi oleh Undang-Undang Nomor 28 Tahun 2014 tentang Hak Cipta.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
