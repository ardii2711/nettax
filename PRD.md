# Product Requirements Document (PRD)

# Nettax — Kalkulator Pajak

**Versi:** 1.0  
**Status:** Draft  
**Platform:** Web Application  
**Target pengguna:** Pengguna umum, staf administrasi, keuangan, dan pelaku usaha.

---

## 1. Ringkasan Produk

### 1.1 Nama Produk

**Nettax**

Tagline: _Hitung Pajak, Lebih Mudah._

### 1.2 Deskripsi

Nettax adalah aplikasi kalkulator pajak berbasis web yang membantu pengguna menghitung PPN, PPh, total pajak, dan nilai bersih transaksi secara cepat dan transparan.

Aplikasi menyediakan dua metode perhitungan utama:

1. **Hitung dari nilai bruto** — pengguna memasukkan nilai transaksi sebelum dikurangi pajak.
2. **Hitung dari nilai bersih** — pengguna memasukkan target nilai yang ingin diterima setelah pajak, kemudian Nettax menghitung nilai bruto yang diperlukan.

### 1.3 Tujuan Produk

- Menyederhanakan perhitungan pajak dalam transaksi.
- Mengurangi kesalahan perhitungan manual.
- Menampilkan rincian pajak secara transparan.
- Memungkinkan pengguna menghitung nilai bruto berdasarkan target nilai bersih.
- Menyediakan kalkulator yang ringan, responsif, dan dapat diakses publik tanpa akun.

---

## 2. Permasalahan yang Ingin Diselesaikan

Pengguna sering kali perlu menghitung nilai PPN dan PPh secara manual, terutama ketika ingin mengetahui berapa nilai yang diterima setelah potongan pajak.

Permasalahan utama:

- Perhitungan pajak membutuhkan beberapa langkah matematis.
- Perhitungan manual rentan terhadap kesalahan.
- Pengguna kesulitan menentukan nilai bruto untuk mencapai target nilai bersih tertentu.
- Kalkulator biasa tidak selalu menampilkan rincian pajak secara terpisah.

Nettax menyelesaikan masalah tersebut melalui satu antarmuka yang sederhana dengan hasil perhitungan langsung.

---

## 3. Target Pengguna

### 3.1 Pengguna Utama

- Staf keuangan dan administrasi.
- Staf pengadaan dan pengelola transaksi.
- Pelaku usaha dan penyedia jasa.
- Pengguna umum yang membutuhkan estimasi perhitungan pajak.

### 3.2 Kebutuhan Pengguna

Pengguna membutuhkan aplikasi yang:

- Mudah digunakan tanpa proses registrasi.
- Bisa menghitung pajak dari nilai bruto maupun nilai bersih.
- Menampilkan rincian perhitungan secara jelas.
- Menggunakan format mata uang Rupiah.
- Dapat digunakan melalui desktop maupun perangkat mobile.

---

## 4. Ruang Lingkup Produk

### 4.1 Fitur MVP (Minimum Viable Product)

| ID   | Fitur                                                            | Prioritas   |
| ---- | ---------------------------------------------------------------- | ----------- |
| F-01 | Kalkulasi dari nilai bruto                                       | Must Have   |
| F-02 | Kalkulasi dari nilai bersih                                      | Must Have   |
| F-03 | Perhitungan PPN                                                  | Must Have   |
| F-04 | Perhitungan PPh 21, PPh 22, dan PPh 23                          | Must Have   |
| F-05 | Ringkasan total pajak dan nilai akhir                            | Must Have   |
| F-06 | Pengaturan tarif pajak                                           | Must Have   |
| F-07 | Format Rupiah tanpa angka desimal                                | Must Have   |
| F-08 | Salin hasil perhitungan                                          | Should Have |
| F-09 | Reset formulir                                                   | Should Have |
| F-10 | Tampilan responsif                                               | Must Have   |
| F-11 | Logo dan identitas visual Nettax                                 | Should Have |
| F-12 | Pemilihan skenario pajak (PPN, PPh 21, PPh 22, PPh 23, dan kombinasi PPN + PPh) | Must Have   |
| F-13 | Kategori tarif PPh 21 untuk honorarium (PNS Gol. III/IV, PPPK, Non ASN)       | Must Have   |

### 4.2 Fitur di Luar MVP

Fitur berikut tidak termasuk versi awal:

- Login dan registrasi pengguna.
- Database dan penyimpanan riwayat transaksi.
- Backend API.
- Manajemen pengguna dan hak akses.
- Pembuatan laporan PDF atau Excel.
- Integrasi dengan sistem perpajakan eksternal.
- Dashboard analitik.
- Sinkronisasi data antardevice.

Fitur tersebut dapat dipertimbangkan jika kebutuhan produk berkembang.

---

## 5. Spesifikasi Perhitungan

### 5.1 Tarif Default

Tarif awal mengikuti metode yang digunakan dalam kebutuhan awal produk:

- PPN: 11%.
- PPh 21: 5%.
- PPh 22: 1,5%.
- PPh 23: 2%.

Untuk PPh 21, tarif awal mengikuti kategori yang dipilih:

| Kategori     | Tarif awal |
| ------------ | ---------- |
| PNS Gol. III | 5%         |
| PNS Gol. IV  | 15%        |
| PPPK         | 5%         |
| Non ASN      | 5%         |

Tarif tersebut merupakan konfigurasi awal kalkulator, bukan klaim bahwa tarif tersebut berlaku untuk semua jenis transaksi. Pengguna harus dapat mengubah tarif sesuai kebutuhan.

### 5.1a Skenario Pajak

Aplikasi menyediakan enam skenario yang dapat dipilih pengguna:

| Skenario     | Komponen aktif |
| ------------ | -------------- |
| PPN          | PPN            |
| PPh 21       | PPh 21         |
| PPh 22       | PPh 22         |
| PPh 23       | PPh 23         |
| PPN + PPh 22 | PPN dan PPh 22 |
| PPN + PPh 23 | PPN dan PPh 23 |

Setiap skenario dapat dihitung dari nilai bruto maupun dari target nilai bersih. Skenario awal adalah PPN.

PPh 21 digunakan untuk honorarium narasumber/pembahas, moderator, pembawa acara, dan panitia. Skenario PPh 21 berdiri sendiri (tanpa PPN) dan dihitung dari penghasilan bruto. Memilih kategori PPh 21 akan mengisi tarif secara otomatis, dan tarif tetap dapat diubah manual.

### 5.2 Mode A — Hitung dari Nilai Bruto

Pengguna memasukkan nilai bruto, yaitu nilai transaksi sebelum dikurangi pajak.

Definisi variabel:

- `G` = nilai bruto.
- `P` = tarif PPN dalam persen.
- `Q` = tarif PPh 21, PPh 22, atau PPh 23 dalam persen.
- `V` = nilai PPN.
- `H` = nilai dasar pengenaan PPh sesuai metode kalkulator.
- `T` = total pajak.
- `N` = nilai bersih setelah pajak.

Komponen yang tidak termasuk skenario yang dipilih dianggap bernilai `0`.

Rumus:

**PPN**

`V = G × P / (100 + P)`

**Dasar perhitungan PPh**

`H = G − V`

Pada skenario PPh 21, `V = 0` sehingga `H = G` (penghasilan bruto tanpa PPN).

**PPh**

`PPh = H × Q / 100`

**Total pajak**

`T = V + PPh`

**Nilai bersih**

`N = G − T`

Aplikasi harus menggunakan nilai numerik presisi penuh untuk perhitungan internal. Pembulatan dilakukan pada tahap penyajian hasil.

### 5.3 Mode B — Hitung dari Nilai Bersih

Pengguna memasukkan target nilai bersih yang ingin diterima setelah dikurangi pajak.

Rumus nilai bruto:

`G = N / ((100 / (100 + P)) × (1 − Q / 100))`

Setelah nilai bruto diperoleh, aplikasi menghitung ulang PPN, PPh, total pajak, dan nilai bersih menggunakan rumus pada Mode A.

Hasil perhitungan harus konsisten dengan mode bruto, dengan toleransi pembulatan yang telah ditentukan.

### 5.4 Contoh Perhitungan

Input:

- Nilai bruto: Rp10.000.000
- PPN: 11%
- PPh 22: 1,5%

Hasil matematis sebelum pembulatan tampilan:

- PPN: Rp990.990,99
- Dasar perhitungan PPh: Rp9.009.009,01
- PPh 22: Rp135.135,14
- Total pajak: Rp1.126.126,13
- Nilai bersih: Rp8.873.873,87

Tampilan Rupiah tanpa desimal akan membulatkan nilai-nilai tersebut ke bilangan Rupiah terdekat.

Contoh PPh 21 dengan kategori PNS Gol. IV:

Input:

- Nilai bruto: Rp10.000.000
- PPh 21: 15%
- PPN: tidak termasuk skenario

Hasil:

- Dasar perhitungan PPh: Rp10.000.000
- PPh 21: Rp1.500.000
- Total pajak: Rp1.500.000
- Nilai bersih: Rp8.500.000

**Catatan:** Rumus di atas mengikuti metode yang didefinisikan untuk Nettax. Implementasi untuk transaksi nyata perlu disesuaikan dengan ketentuan pajak yang berlaku dan jenis transaksi terkait.

---

## 6. Persyaratan Fungsional

### F-01 — Pemilihan Mode Perhitungan

Pengguna dapat berpindah antara:

- Hitung dari bruto.
- Hitung dari bersih.

Perubahan mode mengubah label dan fungsi input utama tanpa perlu memuat ulang halaman.

### F-02 — Input Nilai Transaksi

- Menerima input angka positif.
- Mendukung input nominal besar.
- Menampilkan nominal dengan format Rupiah yang mudah dibaca.
- Mencegah nilai negatif atau input yang tidak valid.
- Menampilkan pesan validasi yang jelas.

### F-03 — Pengaturan Tarif Pajak

- Tarif PPN, PPh 21, PPh 22, dan PPh 23 dapat diedit.
- Nilai default tersedia ketika aplikasi pertama kali dibuka.
- Memilih kategori PPh 21 mengisi tarif kategori tersebut, tetapi tarif tetap dapat diubah manual.
- Hanya tarif yang termasuk skenario aktif yang ditampilkan dan divalidasi.
- Perubahan tarif langsung memperbarui hasil.
- Tarif harus divalidasi sebelum digunakan.
- Tarif PPh sebesar 100% atau lebih tidak diperbolehkan untuk kalkulasi balik dengan target nilai bersih positif.

### F-12 — Pemilihan Skenario Pajak

- Pengguna dapat memilih salah satu dari enam skenario: PPN, PPh 21, PPh 22, PPh 23, PPN + PPh 22, atau PPN + PPh 23.
- Perubahan skenario memperbarui input tarif, ringkasan hasil, rumus, dan teks salin tanpa memuat ulang halaman.
- Nilai tarif PPh 21, PPh 22, dan PPh 23 diingat terpisah sehingga tidak hilang saat berpindah skenario.
- Skenario awal dan hasil reset adalah PPN.

### F-13 — Kategori PPh 21

- Kategori PPh 21 ditampilkan hanya ketika skenario PPh 21 aktif.
- Kategori yang tersedia: PNS Gol. III (5%), PNS Gol. IV (15%), PPPK (5%), dan Non ASN (5%).
- Memilih kategori mengisi tarif PPh 21 secara otomatis.
- Tarif hasil pengisian otomatis tetap dapat diedit manual.
- PPh 21 dihitung dari penghasilan bruto tanpa PPN.
- PPh 21 tidak digabung dengan PPN dalam satu skenario.

### F-04 — Hasil Perhitungan

Setiap hasil harus menampilkan:

1. Nilai bruto.
2. Nilai PPN (jika skenario memuat PPN).
3. Dasar perhitungan PPh (jika skenario memuat PPh).
4. Nilai PPh 21, PPh 22, atau PPh 23 sesuai skenario.
5. Total pajak.
6. Nilai bersih setelah pajak.

Semua hasil harus diperbarui secara langsung ketika input berubah.

### F-05 — Salin Hasil

Pengguna dapat menyalin ringkasan perhitungan ke clipboard untuk digunakan pada dokumen atau aplikasi lain. Hanya komponen yang termasuk skenario aktif yang disalin.

Contoh format:

Nilai Bruto: Rp10.000.000  
PPN (11%): Rp990.991  
Dasar Pengenaan PPh: Rp9.009.009  
PPh 22 (1,5%): Rp135.135  
Total Pajak: Rp1.126.126  
Nilai Bersih: Rp8.873.874

### F-06 — Reset

Pengguna dapat mengembalikan formulir ke kondisi awal tanpa perlu memuat ulang halaman.

---

## 7. Persyaratan UI/UX

### 7.1 Prinsip Desain

Nettax menggunakan desain minimalis, modern, profesional, dan berorientasi pada keterbacaan angka.

Karakter visual:

- Warna utama: navy dan biru.
- Warna aksen: cyan atau teal.
- Latar belakang: putih atau abu-abu sangat terang.
- Tipografi: sans-serif modern.
- Komponen: sudut membulat, jarak antarelemen yang lega, dan kontras yang jelas.
- Logo: simbol N dengan elemen kalkulator, sesuai identitas Nettax.

### 7.2 Struktur Halaman

**Header**

- Logo Nettax.
- Nama aplikasi.
- Deskripsi singkat.

**Area Kalkulator**

- Pemilih skenario pajak.
- Pemilih mode perhitungan.
- Input nilai transaksi.
- Input tarif PPN dan/atau PPh sesuai skenario.
- Tombol reset.

**Area Hasil**

- Nilai bersih atau nilai bruto sebagai hasil utama, sesuai mode.
- Rincian komponen pajak yang aktif.
- Total pajak.
- Tombol salin hasil.

**Footer**

- Informasi bahwa hasil merupakan kalkulasi berdasarkan tarif dan metode yang dipilih.
- Catatan bahwa pengguna perlu memastikan kesesuaian dengan ketentuan pajak yang berlaku.

### 7.3 Responsivitas

- Desktop: form dan ringkasan hasil dapat ditampilkan berdampingan.
- Tablet: layout menyesuaikan lebar layar.
- Mobile: komponen disusun vertikal dan tombol mudah dijangkau.

### 7.4 Kondisi Antarmuka

Antarmuka harus menangani:

- Input kosong.
- Input tidak valid.
- Nilai nol.
- Tarif tidak valid.
- Hasil perhitungan yang sangat besar.
- Kegagalan menyalin ke clipboard.

---

## 8. Persyaratan Nonfungsional

### NFR-01 — Performa

- Perhitungan dilakukan di browser.
- Hasil diperbarui tanpa permintaan ke server.
- Tidak ada ketergantungan pada API eksternal untuk kalkulasi.

### NFR-02 — Privasi

- Tidak ada data transaksi yang dikirim ke backend.
- Tidak ada penyimpanan riwayat transaksi.
- Tidak memerlukan akun pengguna.
- Tidak menggunakan database.

### NFR-03 — Kompatibilitas

Mendukung browser modern seperti:

- Google Chrome.
- Microsoft Edge.
- Mozilla Firefox.
- Safari.

### NFR-04 — Aksesibilitas

- Input memiliki label yang jelas.
- Kontras teks dan latar belakang memadai.
- Semua kontrol dapat digunakan dengan keyboard.
- Pesan validasi dapat dipahami pengguna.

### NFR-05 — Akurasi

- Perhitungan harus mengikuti rumus yang terdokumentasi.
- Nilai internal tidak dibulatkan sebelum seluruh perhitungan selesai.
- Hasil balik bruto dan bersih harus konsisten dalam toleransi pembulatan.
- Fungsi kalkulasi harus memiliki unit test.

---

## 9. Teknologi

| Komponen          | Teknologi                    |
| ----------------- | ---------------------------- |
| UI framework      | React                        |
| Build tool        | Vite                         |
| Bahasa            | TypeScript                   |
| Styling           | Tailwind CSS                 |
| State management  | React state                  |
| Formatting Rupiah | `Intl.NumberFormat`          |
| Unit testing      | Vitest                       |
| Version control   | Git dan GitHub               |
| Deployment        | Vercel atau Cloudflare Pages |
| Backend           | Tidak ada                    |
| Database          | Tidak ada                    |

### Arsitektur

Seluruh kalkulasi berjalan di sisi klien (_client-side_). Aplikasi dapat dibangun menjadi aset statis dan di-hosting melalui layanan static hosting.

---

## 10. Acceptance Criteria

Produk MVP dianggap siap jika kriteria berikut terpenuhi:

- [ ] Pengguna dapat menghitung PPN dan/atau PPh 21/PPh 22/PPh 23 dari nilai bruto.
- [ ] Pengguna dapat menghitung nilai bruto dari target nilai bersih.
- [ ] Keenam skenario pajak dapat dipilih dan hasilnya sesuai rumus.
- [ ] Kategori PPh 21 mengisi tarif otomatis dan tarif tetap dapat diubah.
- [ ] PPh 21 dihitung dari penghasilan bruto tanpa PPN.
- [ ] Tarif pajak dapat diubah.
- [ ] Semua rincian pajak tampil sesuai rumus.
- [ ] Format Rupiah tidak menampilkan angka desimal.
- [ ] Perubahan input memperbarui hasil tanpa reload.
- [ ] Input negatif dan tarif tidak valid ditangani.
- [ ] Tombol reset berfungsi.
- [ ] Tombol salin hasil berfungsi dan memiliki penanganan error.
- [ ] Tampilan dapat digunakan di desktop dan mobile.
- [ ] Unit test untuk rumus utama dan validasi lulus.
- [ ] Aplikasi dapat di-build dan di-deploy sebagai situs statis.
- [ ] Tidak ada backend, database, atau login.
- [ ] Catatan mengenai asumsi perhitungan pajak tersedia.

---

## 11. Rencana Implementasi

### Tahap 1 — Fondasi

- Inisialisasi proyek React, Vite, TypeScript, dan Tailwind CSS.
- Menyiapkan struktur direktori.
- Menentukan desain dasar dan identitas visual.

### Tahap 2 — Mesin Kalkulasi

- Membuat fungsi perhitungan bruto.
- Membuat fungsi perhitungan bersih ke bruto.
- Membuat validasi tarif dan input.
- Menambahkan unit test.

### Tahap 3 — UI Kalkulator

- Membuat komponen input.
- Membuat pemilihan mode.
- Membuat ringkasan hasil.
- Menambahkan format Rupiah, reset, dan salin hasil.

### Tahap 4 — QA dan Responsivitas

- Menguji rumus dan pembulatan.
- Menguji nilai ekstrem dan input tidak valid.
- Menguji tampilan desktop dan mobile.
- Memastikan tidak ada error TypeScript atau build.

### Tahap 5 — Deployment

- Build aplikasi untuk produksi.
- Deploy ke layanan hosting statis.
- Menguji URL publik dan perilaku aplikasi di browser.

---

## 12. Risiko dan Mitigasi

**Risiko: Perbedaan metode perpajakan**

Mitigasi: dokumentasikan metode perhitungan, tampilkan tarif yang digunakan, dan jangan menyatakan hasil sebagai penetapan pajak resmi.

**Risiko: Selisih akibat pembulatan**

Mitigasi: gunakan presisi penuh selama kalkulasi dan tentukan aturan pembulatan pada lapisan tampilan.

**Risiko: Tarif default tidak sesuai suatu transaksi**

Mitigasi: sediakan tarif yang dapat diedit dan jelaskan bahwa pengguna bertanggung jawab memastikan kesesuaian tarif dengan transaksi.

**Risiko: Pengguna menganggap data tersimpan**

Mitigasi: jelaskan bahwa aplikasi tidak menyimpan riwayat perhitungan.

---

## 13. Definisi Selesai (Definition of Done)

MVP Nettax dinyatakan selesai ketika seluruh fitur prioritas Must Have telah diimplementasikan, acceptance criteria terpenuhi, unit test lulus, build produksi berhasil, tampilan responsif, dan aplikasi dapat diakses melalui URL publik tanpa backend.

**Target akhir:** sebuah kalkulator pajak web yang cepat, sederhana, transparan, dan mudah digunakan oleh siapa pun.
