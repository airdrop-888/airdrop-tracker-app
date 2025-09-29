import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import Global Styles yang akan diterapkan ke seluruh aplikasi
import GlobalStyles from './styles/GlobalStyles';

// Import semua komponen halaman yang akan menjadi tujuan routing
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';

// --- Kode Baru ---
// 1. Import komponen ProtectedRoute yang telah kita buat.
// Pastikan path ini sesuai dengan lokasi file yang Anda buat di Langkah 1.
import ProtectedRoute from './components/auth/ProtectedRoute';
// --- Akhir Kode Baru ---


function App() {
  // Komponen App sekarang berfungsi sebagai pusat kontrol routing
  return (
    <>
      {/* Menerapkan style global ke seluruh komponen di bawahnya */}
      <GlobalStyles />

      {/* Membungkus seluruh aplikasi dengan BrowserRouter untuk mengaktifkan routing */}
      <BrowserRouter>
        {/* Container untuk semua definisi rute */}
        <Routes>

          {/* === RUTE PUBLIK === */}
          {/* Rute-rute ini dapat diakses oleh siapa saja, baik yang sudah login maupun yang belum. */}

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/update-password" element={<UpdatePassword />} />


          {/* === RUTE TERPROTEKSI === */}
          {/* Rute di dalam wrapper ini hanya bisa diakses jika pengguna sudah login. */}
          {/* Komponen `ProtectedRoute` akan memeriksa status otentikasi terlebih dahulu. */}
          <Route element={<ProtectedRoute />}>
            {/* Jika pengguna sudah login, <Outlet /> di dalam ProtectedRoute akan merender rute ini. */}
            {/* Jika tidak, pengguna akan otomatis dialihkan ke halaman "/login" oleh ProtectedRoute. */}
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Anda bisa menambahkan rute terproteksi lainnya di sini di masa depan */}
            {/* Contoh: <Route path="/profil" element={<HalamanProfil />} /> */}
          </Route>
          

          {/* === RUTE UTAMA & FALLBACK === */}

          {/* Rute untuk halaman utama ('/'). */}
          {/* Ini akan selalu mengarahkan ke /dashboard. Karena /dashboard sekarang dilindungi, */}
          {/* logika pengalihan ke /login akan ditangani secara otomatis oleh ProtectedRoute. */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Rute fallback jika tidak ada rute lain yang cocok (Halaman 404) */}
          <Route path="*" element={
            <div style={{ padding: '50px', textAlign: 'center' }}>
              <h1>404 - Halaman Tidak Ditemukan</h1>
              <p>Maaf, halaman yang Anda cari tidak ada.</p>
            </div>
          } />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;