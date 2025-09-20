import React, { useState } from 'react';
import { supabase } from '../api/supabaseClient';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AuthLayout from '../components/layout/AuthLayout';

const Title = styled.h2` text-align: center; margin-bottom: 0.5rem; font-size: 1.75rem; font-weight: 700; color: var(--text-primary); `;
const SubTitle = styled.p` text-align: center; color: var(--text-secondary); margin-bottom: 2rem; `;
const StyledForm = styled.form` display: flex; flex-direction: column; gap: 1.25rem; `;
const Input = styled.input` width: 100%; padding: 0.8rem 1rem; border-radius: 8px; border: 1px solid var(--border-color); background-color: #fff; color: var(--text-primary); font-size: 1rem; transition: border-color 0.2s, box-shadow 0.2s; &::placeholder { color: var(--text-secondary); } &:focus { outline: none; border-color: var(--accent-primary); box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25); } `;
const Button = styled.button` width: 100%; padding: 0.8rem 1.5rem; background-color: var(--accent-primary); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 1rem; transition: background-color 0.2s; &:hover { background-color: var(--accent-hover); } &:disabled { background-color: #aaa; cursor: not-allowed; } `;
const Message = styled.p` text-align: center; font-size: 0.9rem; margin-top: 1rem; color: ${({ error }) => error ? '#d93025' : 'var(--status-claimed)'}; `;
const BackToLogin = styled.p` text-align: center; margin-top: 2rem; a { color: var(--accent-primary); font-weight: 500; text-decoration: none; &:hover { text-decoration: underline; } } `;

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/update-password`,
        });

        if (error) {
            setError(error.message);
        } else {
            setMessage('Email untuk reset password telah dikirim! Silakan cek inbox Anda.');
        }
        setLoading(false);
    };

    return (
        <AuthLayout>
            <Title>Reset Password</Title>
            <SubTitle>Masukkan email Anda untuk menerima link reset password.</SubTitle>
            <StyledForm onSubmit={handlePasswordReset}>
                <Input
                    type="email"
                    placeholder="Email terdaftar"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Button type="submit" disabled={loading}>
                    {loading ? 'Mengirim...' : 'Kirim Link Reset'}
                </Button>
            </StyledForm>
            {error && <Message error>{error}</Message>}
            {message && <Message>{message}</Message>}
            <BackToLogin>
                <Link to="/login">Kembali ke Login</Link>
            </BackToLogin>
        </AuthLayout>
    );
};

export default ForgotPassword;