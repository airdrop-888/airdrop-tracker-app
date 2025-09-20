import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 4rem;
  background-color: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
  }
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  margin: 0;
  color: var(--text-primary);
  font-weight: 700;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

// -- STYLED COMPONENT BARU UNTUK PESAN SELAMAT DATANG --
const WelcomeMessage = styled.span`
  color: var(--text-secondary);
  font-weight: 500;
  
  @media (max-width: 768px) {
    display: none; // Sembunyikan pesan di layar mobile agar tidak terlalu ramai
  }
`;

const LogoutButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: var(--accent-primary);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--accent-hover);
  }
`;

const Header = ({ user, onLogout }) => {
  // Logika untuk mengambil username dari metadata pengguna.
  // Jika tidak ada username, gunakan email sebagai cadangan.
  const displayName = user?.user_metadata?.username || user?.email;

  return (
    <HeaderWrapper>
      <Logo>Airdrop Tracker</Logo>
      {user && (
        <UserInfo>
          <WelcomeMessage>
            Welcome back, {displayName}
          </WelcomeMessage>
          <LogoutButton onClick={onLogout}>Logout</LogoutButton>
        </UserInfo>
      )}
    </HeaderWrapper>
  );
};

export default Header;