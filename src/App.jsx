// src/App.jsx

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

// Import komponen ProtectedRoute.
// Path ini harus sesuai dengan lokasi file Anda.
import ProtectedRoute from './components/auth/ProtectedRoute';


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
          {/* Rute-rute ini dapat diakses oleh siapa saja. */}
          {/* Definisi rute untuk /update-password di bawah ini sudah benar. */}
          {/* React Router akan merender komponen UpdatePassword jika URL-nya cocok, */}
          {/* SETELAH server berhasil menyajikan file index.html. */}

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/update-password" element={<UpdatePassword />} />


          {/* === RUTE TERPROTEKSI === */}
          {/* Rute di dalam wrapper ini hanya bisa diakses jika pengguna sudah login. */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Anda bisa menambahkan rute terproteksi lainnya di sini */}
          </Route>
          

          {/* === RUTE UTAMA & FALLBACK === */}

          {/* Rute untuk halaman utama ('/') akan selalu mengarahkan ke /dashboard. */}
          {/* Logika pengalihan ke /login akan ditangani oleh ProtectedRoute. */}
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