import React from 'react';
import styled from 'styled-components';
import { FiEdit, FiTrash2, FiExternalLink } from 'react-icons/fi';

const CardWrapper = styled.div`
  background-color: var(--bg-card);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  padding: 1.5rem;
  box-shadow: 0 4px 15px var(--shadow-color);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px var(--shadow-color);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
`;

const ProjectNameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const PriorityIndicator = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
  background-color: ${({ priority }) => {
    if (priority === 'Tinggi') return '#dc3545'; // Merah
    if (priority === 'Rendah') return '#28a745'; // Hijau
    return '#ffc107'; // Kuning untuk Sedang atau default
  }};
`;

const ProjectName = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  word-break: break-word;
`;

const StatusBadge = styled.span`
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #fff;
  flex-shrink: 0;
  background-color: ${({ status }) => {
    switch (status) {
      case 'Aktif': return 'var(--status-active)';
      case 'Terklaim': return 'var(--status-claimed)';
      case 'Selesai': return 'var(--status-ended)';
      default: return 'var(--status-potential)';
    }
  }};
`;

const Description = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
  flex-grow: 1;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.span`
  background-color: var(--bg-primary);
  color: var(--text-secondary);
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid var(--border-color);
`;


const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background-color: var(--border-color);
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressBarFill = styled.div`
  height: 100%;
  width: ${({ progress }) => progress}%;
  background-color: var(--status-claimed);
  border-radius: 4px;
  transition: width 0.3s ease-in-out;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  margin-top: auto;
  border-top: 1px solid var(--border-color);
`;

const TaskProgressText = styled.span`
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-secondary);
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 1.1rem;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;

  &:hover {
    color: var(--accent-primary);
  }
`;

// -- STYLED COMPONENT BARU UNTUK LINK EKSTERNAL (MENGGUNAKAN tag <a>) --
const ExternalLinkButton = styled.a`
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 1.1rem;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
  line-height: 0; /* Menyelaraskan ikon dengan tombol lain */

  &:hover {
    color: var(--accent-primary);
  }
`;

const AirdropCard = ({ airdrop, onEdit, onDelete }) => {
  const tasks = airdrop.tasks || [];
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const tags = airdrop.tags || [];

  return (
    <CardWrapper>
      <CardHeader>
        <ProjectNameWrapper>
          <PriorityIndicator priority={airdrop.priority} title={`Prioritas: ${airdrop.priority}`} />
          <ProjectName>{airdrop.project_name}</ProjectName>
        </ProjectNameWrapper>
        <StatusBadge status={airdrop.status}>{airdrop.status}</StatusBadge>
      </CardHeader>

      <Description>{airdrop.description || 'Tidak ada deskripsi yang ditambahkan.'}</Description>
      
      {tags.length > 0 && (
        <TagsContainer>
          {tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </TagsContainer>
      )}

      {totalTasks > 0 && (
        <div>
          <ProgressBarContainer>
            <ProgressBarFill progress={progress} />
          </ProgressBarContainer>
        </div>
      )}

      <CardFooter>
        <TaskProgressText>
          {completedTasks} / {totalTasks} Tasks
        </TaskProgressText>
        <ActionButtons>
          {/* Menampilkan tombol link HANYA JIKA project_url ada */}
          {airdrop.project_url && (
            <ExternalLinkButton 
              href={airdrop.project_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              title="Buka Link Proyek"
            >
              <FiExternalLink />
            </ExternalLinkButton>
          )}

          <ActionButton onClick={() => onEdit(airdrop)} title="Edit Airdrop">
            <FiEdit />
          </ActionButton>
          <ActionButton onClick={() => onDelete(airdrop.id)} title="Hapus Airdrop">
            <FiTrash2 />
          </ActionButton>
        </ActionButtons>
      </CardFooter>
    </CardWrapper>
  );
};

export default AirdropCard;