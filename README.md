# Heavy Equipment Inspection System

Sistem manajemen berbasis web untuk penjadwalan, pelaksanaan, dan pelaporan inspeksi alat berat. Dibangun menggunakan Next.js 14 (App Router), TypeScript, dan Tanstack Query.

---

## Struktur Folder Proyek

Berikut adalah penjelasan mengenai struktur folder utama dan tujuannya dalam proyek ini.

### `app/`

Direktori ini berisi semua rute (halaman) dari aplikasi, menggunakan App Router Next.js.

- **`app/(protected)/`**
  Ini adalah [Route Group](https://nextjs.org/docs/app/building-your-application/routing/route-groups) yang melindungi semua rute di dalamnya. Rute-rute ini hanya bisa diakses oleh pengguna yang sudah login.

  - **`layout.tsx`**: Layout khusus untuk grup `(protected)`. File ini berisi logika untuk memeriksa status otentikasi pengguna (kemungkinan besar dari `useUser()` atau `AuthContext`) dan akan mengarahkan (redirect) pengguna ke halaman login jika mereka belum terotentikasi.
  - **`dashboard/`**: Halaman dashboard utama setelah login.
  - **`profile/`**: Halaman untuk manajemen profil pengguna.
  - **`users/`**: Halaman untuk manajemen pengguna (CRUD) oleh admin.
  - **`verifications/`**: Halaman untuk proses verifikasi data inspeksi.
  - **`inspections/`**: Halaman untuk mengelola data inspeksi (melihat, membuat, update).
  - **`schedule/`**: Halaman untuk manajemen penjadwalan inspeksi.
  - **`reports/`**: Halaman untuk melihat dan mengunduh laporan.

- **`app/login/`**
  Halaman publik untuk login pengguna. Rute ini sengaja diletakkan di luar grup `(protected)`.

---

### `components/`

Direktori ini berisi semua komponen React yang _reusable_ (dapat digunakan kembali) di seluruh aplikasi.

- **`auth/`**: Komponen yang terkait khusus dengan otentikasi (misal: `LoginForm`, `RegisterForm`).
- **`dashboard/`**: Komponen spesifik yang hanya digunakan di halaman dashboard (misal: `StatCard`, `RecentActivity`).
- **`dialogs/`**: Kumpulan komponen modal atau dialog (misal: `ConfirmationDialog`, `AlertDialog`).
- **`form-inspections/`**: Komponen _multi-step_ atau komponen kompleks yang digunakan khusus untuk mengisi form inspeksi.
- **`table/`**: Komponen untuk menampilkan data dalam bentuk tabel (kemungkinan besar `DataTable` kustom yang terintegrasi dengan `react-table` atau sejenisnya).
- **`layouts/`**: Komponen layout utama (misal: `Sidebar`, `Navbar`, `Header`).
- **`ui/`**: Komponen UI "atomik" atau dasar, seperti `Button`, `Input`, `Card` (seringkali berisi komponen dari Shadcn/UI).
- **`backButton.tsx`**: Komponen tombol "Kembali" yang digunakan untuk navigasi.

---

### `constants/`

Berisi _file_ yang menyimpan nilai-nilai konstan yang tidak berubah.

- **`links.ts`**: Menyimpan daftar _link_ navigasi (misal: untuk `Sidebar`) beserta ikon dan _path_-nya.
- **`roles.ts`**: Mendefinisikan peran (roles) pengguna yang diizinkan dalam sistem (misal: `ADMIN`, `INSPECTOR`, `MANAGER`).

---

### `context/`

Berisi React Context Providers.

- **`AuthContext.tsx`**: Menyediakan _state_ otentikasi (seperti data pengguna, token, status login) dan fungsi (seperti `login`, `logout`) ke seluruh aplikasi.

---

### `hooks/`

Berisi _custom hooks_ React untuk logika yang _reusable_.

- **`use-mobile.ts`**: Hook untuk mendeteksi apakah _viewport_ pengguna saat ini berada di perangkat seluler.
- **`use-debounce.ts`**: Hook untuk menunda eksekusi fungsi (berguna untuk _input search_).

---

### `lib/`

Berisi fungsi utilitas dan konfigurasi _library_ pihak ketiga.

- **`api.ts`**: Konfigurasi _client_ untuk memanggil API (misal: _instance_ Axios atau _wrapper_ `fetch`).
- **`breadcrumbs.ts`**: Utilitas untuk mengelola atau menghasilkan _breadcrumbs_ secara dinamis.
- **`export-utils.ts`**: Kumpulan fungsi untuk mengekspor data (misal: ke CSV atau PDF).
- **`types.ts`**: Berisi definisi _interface_ dan _type_ TypeScript global.
- **`utils.ts`**: Fungsi utilitas umum (misal: `formatDate`, `cn` untuk _classnames_).

---

### `queryproviders/`

Berisi file konfigurasi _provider_ untuk **Tanstack Query** (React Query), yang membungkus aplikasi agar bisa menggunakan _caching_ data.

---

### `public/`

Berisi semua aset statis seperti gambar, ikon (favicon), dan _font_ yang akan di-_hosting_ apa adanya.

---

### `queries/`

Direktori ini sangat penting untuk manajemen data. Isinya adalah _custom hooks_ Tanstack Query (`useQuery`, `useMutation`) dan fungsi _service_ API yang terkait.

- **`apiService.ts`**: Berisi fungsi-fungsi murni yang memanggil _endpoint_ API (misal: `loginRequest`, `fetchInspections`).
- **`useLogin.ts`**: Contoh _hook_ `useMutation` yang membungkus `loginRequest` untuk digunakan di komponen.
- **`useGetUsers.ts`**: Contoh _hook_ `useQuery` untuk mengambil data pengguna.

---

### `schemas/`

Berisi skema validasi data menggunakan **Zod**. Skema ini digunakan untuk:

1.  Memvalidasi _form_ di sisi klien (biasanya digabungkan dengan `react-hook-form`).
2.  Memvalidasi data API yang masuk atau keluar.

---

## File Penting di Root

- **`middleware.ts`**
  Middleware Next.js yang berjalan di _edge_ (server) sebelum _request_ diselesaikan. Fungsi utamanya adalah untuk:

  1.  **Validasi Token**: Memeriksa apakah `token` (JWT) ada dan valid.
  2.  **Otorisasi Role**: Memeriksa apakah pengguna dengan _role_ tertentu diizinkan mengakses rute yang diminta.
  3.  **Proteksi Rute**: Mengarahkan pengguna yang belum login jika mereka mencoba mengakses rute terproteksi.

- **`.env` / `.env.example`**
  - `.env`: (Ignored oleh Git) Berisi semua _environment variables_ rahasia seperti `DATABASE_URL`, `JWT_SECRET`, `NEXT_PUBLIC_API_URL`.
  - `.env.example`: _Template_ dari `.env` yang aman untuk di-_commit_ ke repository.
