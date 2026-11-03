# Nettax — Kalkulator PPN & PPh

Aplikasi web sederhana untuk menghitung PPN, PPh 22, PPh 23, total pajak, dan
nilai bersih transaksi. Tersedia lima skenario pajak, dan setiap skenario dapat
dihitung dari nilai bruto maupun dari target nilai bersih (reverse
calculation). Seluruh perhitungan berjalan di browser — tanpa backend, tanpa
database, dan tanpa akun.

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build produksi ke folder dist/
npm run preview  # pratinjau hasil build
```

## Skenario Pajak

| Skenario     | Komponen aktif | Tarif awal   |
| ------------ | -------------- | ------------ |
| PPN          | PPN            | 11%          |
| PPh 22       | PPh 22         | 1,5%         |
| PPh 23       | PPh 23         | 2%           |
| PPN + PPh 22 | PPN, PPh 22    | 11% dan 1,5% |
| PPN + PPh 23 | PPN, PPh 23    | 11% dan 2%   |

Skenario awal adalah **PPN**. Semua tarif dapat diubah dan nilainya diingat
terpisah untuk PPh 22 dan PPh 23.

## Metode Perhitungan

Variabel: `G` nilai bruto, `P` tarif PPN (%), `Q` tarif PPh 22 atau PPh 23 (%),
`V` nilai PPN, `H` dasar pengenaan PPh, `T` total pajak, `N` nilai bersih.
Komponen yang tidak termasuk skenario dianggap `0`.

**Mode A — dari nilai bruto**

```
V   = G × P / (100 + P)
H   = G − V
PPh = H × Q / 100
T   = V + PPh
N   = G − T
```

**Mode B — dari target nilai bersih**

```
G = N / ((100 / (100 + P)) × (1 − Q / 100))
```

Rumus di atas juga berlaku untuk skenario yang hanya memakai salah satu
komponen (isi `P = 0` atau `Q = 0`). Setelah `G` diperoleh, rincian dihitung
ulang memakai rumus Mode A sehingga hasil kedua mode konsisten.

Contoh: bruto Rp10.000.000, PPN 11%, PPh 22 1,5%

| Komponen     | Nilai          |
| ------------ | -------------- |
| PPN          | Rp990.990,99   |
| Dasar PPh    | Rp9.009.009,01 |
| PPh 22       | Rp135.135,14   |
| Total pajak  | Rp1.126.126,13 |
| Nilai bersih | Rp8.873.873,87 |

## Asumsi

- Tarif awal 11% (PPN), 1,5% (PPh 22), dan 2% (PPh 23) hanyalah konfigurasi awal
  yang dapat diubah pengguna, bukan klaim tarif yang berlaku untuk semua
  transaksi.
- PPN dihitung sebagai bagian dari nilai bruto (`G × P / (100 + P)`).
- PPh 22 maupun PPh 23 dihitung dari nilai bruto setelah dikurangi PPN (DPP).
- Pada skenario tanpa PPN, DPP sama dengan nilai bruto.
- Presisi penuh dipakai selama perhitungan; pembulatan hanya dilakukan saat
  menampilkan hasil (Rupiah tanpa desimal, pembulatan setengah ke atas).
- Pada mode bersih, tarif PPh harus di bawah 100% agar nilai bruto terdefinisi.
- Hasil bukan penetapan pajak resmi. Pengguna bertanggung jawab memastikan
  kesesuaian tarif dan metode dengan ketentuan pajak yang berlaku.

## Privasi

Tidak ada data transaksi yang dikirim ke server dan tidak ada riwayat
perhitungan yang disimpan. Satu-satunya data yang disimpan di perangkat adalah
preferensi tema (`light`/`dark`) melalui `localStorage`; tidak ada cookie dan
tidak ada data pribadi yang dikumpulkan.

## Tema

Nettax mendukung mode terang dan gelap. Tombol tema di header mengganti tampilan
seketika dan pilihan tersebut diingat di perangkat melalui `localStorage`
(kunci `nettax-theme`).

## Teknologi

React 19 · Vite 8 · TypeScript · Tailwind CSS 4 · `Intl.NumberFormat`

## Deployment

Aplikasi adalah situs statis. Untuk Vercel atau Cloudflare Pages:

- Build command: `npm run build`
- Output directory: `dist`
- Tidak ada environment variable yang dibutuhkan.
