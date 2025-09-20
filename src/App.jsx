import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import Global Styles yang akan diterapkan ke seluruh aplikasi
import GlobalStyles from './styles/GlobalStyles';

// Import semua komponen halaman yang akan menjadi tujuan routing
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword'; // Import halaman baru
import UpdatePassword from './pages/UpdatePassword'; // Import halaman baru

function App() {
  // Komponen App sekarang berfungsi sebagai pusat kontrol routing
  return (
    <>
      {/* 1. Menerapkan style global ke seluruh komponen di bawahnya */}
      <GlobalStyles />

      {/* 2. Membungkus seluruh aplikasi dengan BrowserRouter untuk mengaktifkan routing */}
      <BrowserRouter>
        {/* 3. Container untuk semua definisi rute */}
        <Routes>
          {/* Rute untuk halaman utama ('/'). 
              Kita menggunakan <Navigate> untuk secara otomatis mengalihkan pengguna 
              dari halaman root ke halaman dasbor. */}
          <Route path="/" element={<Navigate to="/dashboard" />} />

          {/* Rute untuk halaman dasbor utama aplikasi */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Rute untuk halaman login */}
          <Route path="/login" element={<Login />} />

          {/* Rute untuk halaman registrasi */}
          <Route path="/register" element={<Register />} />

          {/* Rute baru untuk halaman Lupa Password */}
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Rute baru untuk halaman Update Password (diakses dari link email) */}
          <Route path="/update-password" element={<UpdatePassword />} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;