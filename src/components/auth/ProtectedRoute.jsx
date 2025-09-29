import React, { useState, useEffect } from 'react';
import { supabase } from '../../api/supabaseClient'; // Pastikan path ini benar menuju file supabaseClient Anda
import { Navigate, Outlet } from 'react-router-dom';
import styled from 'styled-components';

// Ini adalah komponen sederhana untuk menampilkan pesan loading di tengah layar
// agar pengalaman pengguna lebih baik saat otentikasi diperiksa.
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
  color: var(--text-secondary);
  background-color: var(--bg-primary);
`;

const ProtectedRoute = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Fungsi untuk memeriksa sesi yang aktif saat komponen pertama kali dimuat.
    const fetchSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
      } catch (error) {
        console.error("Gagal mengambil sesi:", error);
      } finally {
        // Setelah selesai memeriksa, set loading menjadi false
        setLoading(false);
      }
    };

    fetchSession();

    // 2. Membuat listener untuk memantau perubahan status otentikasi (misalnya saat pengguna login atau logout).
    // Ini memastikan status sesi selalu up-to-date.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // 3. Membersihkan listener saat komponen tidak lagi digunakan untuk mencegah memory leak.
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Selama proses pengecekan sesi, tampilkan layar loading.
  // Ini mencegah layar dasbor "berkedip" sesaat sebelum dialihkan ke halaman login.
  if (loading) {
    return <LoadingContainer>Memeriksa otentikasi...</LoadingContainer>;
  }

  // Jika ada sesi (artinya pengguna sudah login), render komponen anak dari rute ini.
  // <Outlet /> adalah placeholder dari react-router-dom yang akan digantikan oleh
  // komponen yang sesuai (misalnya, <Dashboard />).
  if (session) {
    return <Outlet />;
  }
  
  // Jika tidak ada sesi (pengguna belum login), alihkan (redirect) mereka ke halaman login.
  // Properti 'replace' mencegah pengguna kembali ke halaman yang dilindungi dengan tombol "back" di browser.
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;