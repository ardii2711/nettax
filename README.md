# Nettax — Kalkulator PPN & PPh

Aplikasi web sederhana untuk menghitung PPN, PPh, total pajak, dan nilai bersih
transaksi. Bisa dihitung dari nilai bruto maupun dari target nilai bersih
(reverse calculation). Seluruh perhitungan berjalan di browser — tanpa backend,
tanpa database, dan tanpa akun.

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build produksi ke folder dist/
npm run preview  # pratinjau hasil build
```

## Metode Perhitungan

Variabel: `G` nilai bruto, `P` tarif PPN (%), `Q` tarif PPh (%), `V` nilai PPN,
`H` dasar pengenaan PPh, `T` total pajak, `N` nilai bersih.

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

Setelah `G` diperoleh, rincian dihitung ulang memakai rumus Mode A sehingga hasil
kedua mode konsisten.

Contoh: bruto Rp10.000.000, PPN 11%, PPh 1,5%

| Komponen | Nilai |
|---|---|
| PPN | Rp990.990,99 |
| Dasar PPh | Rp9.009.009,01 |
| PPh | Rp135.135,14 |
| Total pajak | Rp1.126.126,13 |
| Nilai bersih | Rp8.873.873,87 |

## Asumsi

- Tarif awal 11% (PPN) dan 1,5% (PPh) hanyalah konfigurasi awal yang dapat
  diubah pengguna, bukan klaim tarif yang berlaku untuk semua transaksi.
- PPN dihitung sebagai bagian dari nilai bruto (`G × P / (100 + P)`).
- PPh dihitung dari nilai bruto setelah dikurangi PPN.
- Presisi penuh dipakai selama perhitungan; pembulatan hanya dilakukan saat
  menampilkan hasil (Rupiah tanpa desimal, pembulatan setengah ke atas).
- Pada mode bersih, tarif PPh harus di bawah 100% agar nilai bruto terdefinisi.
- Hasil bukan penetapan pajak resmi. Pengguna bertanggung jawab memastikan
  kesesuaian tarif dan metode dengan ketentuan pajak yang berlaku.

## Privasi

Tidak ada data transaksi yang dikirim ke server, tidak ada riwayat yang
disimpan, dan tidak ada penggunaan `localStorage` maupun cookie.

## Teknologi

React 19 · Vite 8 · TypeScript · Tailwind CSS 4 · `Intl.NumberFormat`

## Deployment

Aplikasi adalah situs statis. Untuk Vercel atau Cloudflare Pages:

- Build command: `npm run build`
- Output directory: `dist`
- Tidak ada environment variable yang dibutuhkan.
