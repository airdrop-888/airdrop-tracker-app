import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { supabase } from '../../api/supabaseClient';
import { FiPlus, FiTrash2, FiX } from 'react-icons/fi';

// Styled Components
const FormWrapper = styled.div`
  max-height: 80vh;
  overflow-y: auto;
  padding: 0.5rem 1rem 0.5rem 0.5rem;
  margin-right: -1rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 0.9rem;
  color: var(--text-primary);
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background-color: var(--bg-primary);
  font-size: 1rem;
  color: var(--text-primary);
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: var(--accent-primary);
  }

  ${({ completed }) =>
    completed &&
    css`
      text-decoration: line-through;
      color: var(--text-secondary);
    `}
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background-color: var(--bg-primary);
  font-size: 1rem;
  color: var(--text-primary);
  resize: vertical;
  min-height: 80px;
  font-family: 'Inter', sans-serif;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: var(--accent-primary);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background-color: var(--bg-primary);
  font-size: 1rem;
  color: var(--text-primary);

  &:focus {
    outline: none;
    border-color: var(--accent-primary);
  }
`;

const TaskItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const TaskCheckbox = styled.input`
  width: 18px;
  height: 18px;
  accent-color: var(--accent-primary);
  flex-shrink: 0;
`;

const RemoveTaskButton = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  border-radius: 50%;
  transition: color 0.2s, background-color 0.2s;

  &:hover {
    color: #d93025;
    background-color: #fce8e6;
  }
`;

const AddTaskButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: transparent;
  color: var(--accent-primary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s;
  align-self: flex-start;

  &:hover {
    background-color: var(--accent-primary);
    color: #fff;
    border-color: var(--accent-primary);
  }
`;

const SubmitButton = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: var(--accent-primary);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  margin-top: 1rem;
  transition: background-color 0.2s;

  &:hover { background-color: var(--accent-hover); }
  &:disabled { background-color: #ccc; cursor: not-allowed; }
`;

const ErrorMessage = styled.p`
  color: #d93025;
  font-size: 0.9rem;
  text-align: center;
`;

const TagsInputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background-color: #fff;
  &:focus-within {
    border-color: var(--accent-primary);
  }
`;

const TagBadge = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--accent-primary);
  color: #fff;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.8rem;
`;

const RemoveTagButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;
  opacity: 0.7;
  &:hover { opacity: 1; }
`;

const TagInputField = styled.input`
  border: none;
  background: none;
  outline: none;
  flex-grow: 1;
  font-size: 1rem;
  color: var(--text-primary);
  min-width: 120px;
`;

// [BARU] Styling untuk grup checkbox prioritas agar konsisten
const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border: 1px solid transparent; /* Menjaga layout */
`;

// [BARU] Label untuk checkbox
const CheckboxLabel = styled.label`
  font-weight: 500;
  font-size: 0.9rem;
  color: var(--text-primary);
  cursor: pointer;
  user-select: none;
`;

// [BARU] Input untuk checkbox
const CheckboxInput = styled.input`
  width: 18px;
  height: 18px;
  accent-color: var(--accent-primary);
  flex-shrink: 0;
  cursor: pointer;
`;

const AirdropForm = ({ onSuccess, onClose, initialData }) => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [status, setStatus] = useState('Potensial');
  const [priority, setPriority] = useState('Sedang');
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [potentialValue, setPotentialValue] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isDaily, setIsDaily] = useState(false); // [BARU] State untuk checkbox prioritas harian
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setProjectName(initialData.project_name || '');
      setDescription(initialData.description || '');
      setProjectUrl(initialData.project_url || '');
      setStatus(initialData.status || 'Potensial');
      setPriority(initialData.priority || 'Sedang');
      setTags(initialData.tags || []);
      setWalletAddress(initialData.wallet_address || '');
      setPotentialValue(initialData.potential_value || '');
      setTasks(initialData.tasks || []);
      setIsDaily(initialData.is_daily || false); // [BARU] Mengisi state 'is_daily' saat edit
    } else {
      setProjectName('');
      setDescription('');
      setProjectUrl('');
      setStatus('Potensial');
      setPriority('Sedang');
      setTags([]);
      setWalletAddress('');
      setPotentialValue('');
      setTasks([]);
      setIsDaily(false); // [BARU] Mereset state 'is_daily' saat membuat baru
    }
  }, [initialData]);

  // Handler lainnya tetap sama
  const handleTagInputKeyDown = (e) => { if ((e.key === 'Enter' || e.key === ',') && currentTag.trim() !== '') { e.preventDefault(); const newTag = currentTag.trim(); if (!tags.includes(newTag)) { setTags([...tags, newTag]); } setCurrentTag(''); } };
  const removeTag = (tagToRemove) => { setTags(tags.filter(tag => tag !== tagToRemove)); };
  const handleTaskTextChange = (index, newText) => { const newTasks = [...tasks]; newTasks[index].text = newText; setTasks(newTasks); };
  const handleTaskCompletionChange = (index) => { const newTasks = [...tasks]; newTasks[index].completed = !newTasks[index].completed; setTasks(newTasks); };
  const handleAddTask = () => { setTasks([...tasks, { text: '', completed: false }]); };
  const handleRemoveTask = (index) => { setTasks(tasks.filter((_, i) => i !== index)); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!projectName) {
      setError('Nama Proyek wajib diisi.');
      return;
    }
    setLoading(true);
    setError('');

    const { data: { user } } = await supabase.auth.getUser();

    const payload = {
      project_name: projectName,
      description,
      project_url: projectUrl,
      status,
      priority,
      tags,
      wallet_address: walletAddress,
      potential_value: potentialValue || null,
      tasks,
      is_daily: isDaily, // [BARU] Menambahkan 'is_daily' ke payload yang akan disimpan
      user_id: user.id
    };

    let error;

    if (initialData) {
      const { error: updateError } = await supabase.from('airdrops').update(payload).eq('id', initialData.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase.from('airdrops').insert(payload);
      error = insertError;
    }

    if (error) {
      setError(error.message);
    } else {
      onSuccess();
    }
    setLoading(false);
  };

  return (
    <FormWrapper>
      <Title>{initialData ? 'Edit Airdrop' : 'Tambah Airdrop Baru'}</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="projectName">Nama Proyek</Label>
          <Input id="projectName" type="text" placeholder="Contoh: ZetaChain" value={projectName} onChange={(e) => setProjectName(e.target.value)} required />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="projectUrl">Link URL Proyek</Label>
          <Input id="projectUrl" type="url" placeholder="https://www.zetachain.com/" value={projectUrl} onChange={(e) => setProjectUrl(e.target.value)} />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">Deskripsi</Label>
          <Textarea id="description" placeholder="Catatan singkat (opsional)" value={description} onChange={(e) => setDescription(e.target.value)} />
        </FormGroup>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <FormGroup style={{ flex: 1, minWidth: '150px' }}>
            <Label htmlFor="status">Status</Label>
            <Select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Potensial">Potensial</option>
              <option value="Aktif">Aktif</option>
              <option value="Terklaim">Terklaim</option>
              <option value="Selesai">Selesai</option>
            </Select>
          </FormGroup>
          <FormGroup style={{ flex: 1, minWidth: '150px' }}>
            <Label htmlFor="priority">Prioritas</Label>
            <Select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="Rendah">Rendah</option>
              <option value="Sedang">Sedang</option>
              <option value="Tinggi">Tinggi</option>
            </Select>
          </FormGroup>
        </div>

        {/* [BARU] Elemen checkbox untuk menandai Prioritas Harian */}
        <CheckboxGroup>
          <CheckboxInput
            id="isDaily"
            type="checkbox"
            checked={isDaily}
            onChange={(e) => setIsDaily(e.target.checked)}
          />
          <CheckboxLabel htmlFor="isDaily">
            Tandai sebagai Prioritas Harian (Daily Task)
          </CheckboxLabel>
        </CheckboxGroup>

        <FormGroup>
          <Label htmlFor="tags">Tags (pisahkan dengan koma atau Enter)</Label>
          <TagsInputContainer>
            {tags.map((tag, index) => (
              <TagBadge key={index}>
                {tag}
                <RemoveTagButton type="button" onClick={() => removeTag(tag)}>
                  <FiX size={14} />
                </RemoveTagButton>
              </TagBadge>
            ))}
            <TagInputField
              id="tags"
              type="text"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyDown={handleTagInputKeyDown}
              placeholder="Tambah tag..."
            />
          </TagsInputContainer>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="walletAddress">Alamat Wallet</Label>
          <Input id="walletAddress" type="text" placeholder="0x... (opsional)" value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="potentialValue">Potensi Nilai ($)</Label>
          <Input id="potentialValue" type="number" min="0" placeholder="Contoh: 100 (opsional)" value={potentialValue} onChange={(e) => setPotentialValue(e.target.value)} />
        </FormGroup>

        <FormGroup>
          <Label>Tugas / Checklist</Label>
          {tasks.map((task, index) => (
            <TaskItem key={index}>
              <TaskCheckbox type="checkbox" checked={task.completed} onChange={() => handleTaskCompletionChange(index)} />
              <Input value={task.text} onChange={(e) => handleTaskTextChange(index, e.target.value)} placeholder={`Tugas #${index + 1}`} completed={task.completed} />
              <RemoveTaskButton type="button" onClick={() => handleRemoveTask(index)} title="Hapus Tugas">
                <FiTrash2 size={16} />
              </RemoveTaskButton>
            </TaskItem>
          ))}
          <AddTaskButton type="button" onClick={handleAddTask}>
            <FiPlus size={16} /> Tambah Tugas
          </AddTaskButton>
        </FormGroup>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <SubmitButton type="submit" disabled={loading}>
          {loading ? 'Menyimpan...' : (initialData ? 'Simpan Perubahan' : 'Simpan Airdrop')}
        </SubmitButton>
      </Form>
    </FormWrapper>
  );
};

export default AirdropForm;