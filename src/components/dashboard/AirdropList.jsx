import React from 'react';
import styled from 'styled-components';
import AirdropCard from './AirdropCard';

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
`;

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 4rem 2rem;
  border: 2px dashed var(--border-color);
  border-radius: 12px;
  color: var(--text-secondary);
  min-height: 300px;
  margin-top: 2rem;
`;

const EmptyStateTitle = styled.h3`
  font-size: 1.25rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
`;

const EmptyStateText = styled.p`
  max-width: 400px;
`;

const AirdropList = ({ airdrops, onEdit, onDelete }) => {
  if (!airdrops || airdrops.length === 0) {
    return (
      <EmptyStateContainer>
        <EmptyStateTitle>Belum Ada Airdrop</EmptyStateTitle>
        <EmptyStateText>
          Tidak ada airdrop yang cocok dengan filter Anda. Coba ubah filter atau tambahkan airdrop baru untuk memulai!
        </EmptyStateText>
      </EmptyStateContainer>
    );
  }

  return (
    <ListContainer>
      {airdrops.map((airdrop) => (
        <AirdropCard
          key={airdrop.id}
          airdrop={airdrop}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ListContainer>
  );
};

export default AirdropList;