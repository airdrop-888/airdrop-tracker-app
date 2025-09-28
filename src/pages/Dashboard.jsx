// src/pages/Dashboard.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { supabase } from '../api/supabaseClient';

// Import Components
import Header from '../components/layout/Header';
import AirdropList from '../components/dashboard/AirdropList';
import Modal from '../components/common/Modal';
import AirdropForm from '../components/dashboard/AirdropForm';
import { FiSearch } from 'react-icons/fi';

// --- Styled Components ---

// Ini adalah container utama untuk seluruh halaman.
// Kuncinya ada di `height: 100vh;` yang memerintahkannya untuk mengisi 100% tinggi layar.
// `display: flex` dan `flex-direction: column` menata Header dan MainContent secara vertikal.
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background-color: var(--bg-primary); /* Pastikan background konsisten */
`;

// Ini adalah container untuk konten utama (di bawah Header).
// `flex: 1;` adalah perintah agar ia mengisi semua sisa ruang vertikal di dalam PageWrapper.
// `overflow-y: auto;` memastikan HANYA area ini yang akan scroll jika kontennya panjang.
const MainContent = styled.main`
  flex: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 4rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  @media (max-width: 768px) { font-size: 1.5rem; }
`;

const AddButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: var(--accent-primary);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
  &:hover { background-color: var(--accent-hover); }
  @media (max-width: 768px) { width: 100%; justify-content: center; }
`;

const ControlsWrapper = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  @media (max-width: 768px) { flex-direction: column; }
`;

const SearchInputContainer = styled.div`
  position: relative;
  flex-grow: 1;
  min-width: 250px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background-color: var(--bg-secondary);
  font-size: 1rem;
  color: var(--text-primary);
  &:focus { outline: none; border-color: var(--accent-primary); }
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  left: 0.8rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  pointer-events: none;
`;

const FilterButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const FilterButton = styled.button`
  padding: 0.75rem 1.25rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background-color: ${({ active }) => (active ? 'var(--accent-primary)' : 'var(--bg-secondary)')};
  color: ${({ active }) => (active ? '#fff' : 'var(--text-primary)')};
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s;
  white-space: nowrap;
  
  &:hover:not(:disabled) {
    border-color: ${({ active }) => (active ? 'var(--accent-hover)' : 'var(--text-secondary)')};
    background-color: ${({ active }) => (active ? 'var(--accent-hover)' : '#f8f9fa')};
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  font-size: 1.5rem;
  color: var(--text-secondary);
`;

// --- Komponen Utama Dashboard ---

const Dashboard = () => {
  const [airdrops, setAirdrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [editingAirdrop, setEditingAirdrop] = useState(null);
  const navigate = useNavigate();

  const fetchAirdrops = async (userId) => {
    const { data, error } = await supabase
      .from('airdrops')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching airdrops:', error);
      alert('Gagal memuat data airdrop.');
      setAirdrops([]);
    } else {
      setAirdrops(data || []);
    }
  };

  useEffect(() => {
    const fetchSessionAndData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
        return;
      }
      setUser(session.user);
      await fetchAirdrops(session.user.id);
      setLoading(false);
    };

    fetchSessionAndData();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/login');
      } else {
        setUser(session.user);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus airdrop ini? Aksi ini tidak dapat dibatalkan.')) {
      const { error } = await supabase.from('airdrops').delete().eq('id', id);
      if (error) {
        alert(error.message);
      } else {
        setAirdrops(airdrops.filter((a) => a.id !== id));
      }
    }
  };

  const handleEdit = (airdrop) => {
    setEditingAirdrop(airdrop);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingAirdrop(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingAirdrop(null);
  };

  const handleSuccess = async () => {
    if (user) {
      await fetchAirdrops(user.id);
    }
    closeModal();
  };
  
  const filteredAirdrops = useMemo(() => {
    if (!Array.isArray(airdrops)) return [];

    return airdrops
      .filter((a) => filterStatus === 'All' || a.status === filterStatus)
      .filter((a) =>
        a.project_name && a.project_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [airdrops, filterStatus, searchTerm]);

  return (
    <PageWrapper>
      <Header user={user} onLogout={handleLogout} />
      
      {loading ? (
        <LoadingContainer>Memuat Dasbor...</LoadingContainer>
      ) : (
        <MainContent>
          <DashboardHeader>
            <Title>My Airdrops</Title>
            <AddButton onClick={openAddModal}>+ Tambah Airdrop</AddButton>
          </DashboardHeader>

          <ControlsWrapper>
            <SearchInputContainer>
              <SearchIcon size={20} />
              <SearchInput
                placeholder="Cari berdasarkan nama proyek..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchInputContainer>
            <FilterButtonGroup>
              {['All', 'Potensial', 'Aktif', 'Terklaim', 'Selesai'].map((status) => (
                <FilterButton
                  key={status}
                  active={filterStatus === status}
                  onClick={() => setFilterStatus(status)}
                >
                  {status}
                </Button>
              ))}
            </FilterButtonGroup>
          </ControlsWrapper>

          <AirdropList
            airdrops={filteredAirdrops}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </MainContent>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <AirdropForm
          onSuccess={handleSuccess}
          onClose={closeModal}
          initialData={editingAirdrop}
        />
      </Modal>
    </PageWrapper>
  );
};

export default Dashboard;