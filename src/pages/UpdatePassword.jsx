import React, { useState } from 'react';
import { supabase } from '../api/supabaseClient';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AuthLayout from '../components/layout/AuthLayout';

const Title = styled.h2` text-align: center; margin-bottom: 2rem; font-size: 1.75rem; font-weight: 700; color: var(--text-primary); `;
const StyledForm = styled.form` display: flex; flex-direction: column; gap: 1.25rem; `;
const Input = styled.input` width: 100%; padding: 0.8rem 1rem; border-radius: 8px; border: 1px solid var(--border-color); background-color: #fff; color: var(--text-primary); font-size: 1rem; transition: border-color 0.2s, box-shadow 0.2s; &::placeholder { color: var(--text-secondary); } &:focus { outline: none; border-color: var(--accent-primary); box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25); } `;
const Button = styled.button` width: 100%; padding: 0.8rem 1.5rem; background-color: var(--accent-primary); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 1rem; transition: background-color 0.2s; &:hover { background-color: var(--accent-hover); } &:disabled { background-color: #aaa; cursor: not-allowed; } `;
const Message = styled.p` text-align: center; font-size: 0.9rem; margin-top: 1rem; color: ${({ error }) => error ? '#d93025' : 'var(--status-claimed)'}; `;

const UpdatePassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Password baru dan konfirmasi tidak cocok.');
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');

        const { error } = await supabase.auth.updateUser({ password: password });

        if (error) {
            setError(error.message);
        } else {
            setMessage('Password berhasil diperbarui! Anda akan diarahkan ke halaman login.');
            setTimeout(() => navigate('/login'), 3000);
        }
        setLoading(false);
    };

    return (
        <AuthLayout>
            <Title>Perbarui Password</Title>
            <StyledForm onSubmit={handleUpdatePassword}>
                <Input
                    type="password"
                    placeholder="Masukkan password baru"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="Konfirmasi password baru"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <Button type="submit" disabled={loading}>
                    {loading ? 'Menyimpan...' : 'Simpan Password Baru'}
                </Button>
            </StyledForm>
            {error && <Message error>{error}</Message>}
            {message && <Message>{message}</Message>}
        </AuthLayout>
    );
};

export default UpdatePassword;