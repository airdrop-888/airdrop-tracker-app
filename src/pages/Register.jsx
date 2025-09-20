import React, { useState } from 'react';
import { supabase } from '../api/supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import AuthLayout from '../components/layout/AuthLayout';

// Styled Components
const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background-color: #fff;
  color: var(--text-primary);
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;

  &::placeholder {
    color: var(--text-secondary);
  }

  &:focus {
    outline: none;
    border-color: var(--accent-primary);
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.8rem 1.5rem;
  background-color: var(--accent-primary);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: background-color 0.2s;
  margin-top: 0.5rem;

  &:hover {
    background-color: var(--accent-hover);
  }
  
  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: #d93025;
  text-align: center;
  font-size: 0.9rem;
  margin: 0;
`;

const SuccessMessage = styled.p`
  color: var(--status-claimed);
  text-align: center;
  font-size: 0.9rem;
  margin: 0;
`;

const SubText = styled.p`
  text-align: center;
  color: var(--text-secondary);
  margin-top: 1.5rem;

  a {
    color: var(--accent-primary);
    font-weight: 500;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
  }
`;

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        
        // Validasi konfirmasi password
        if (password !== confirmPassword) {
            setError('Password dan konfirmasi password tidak cocok.');
            return;
        }

        setLoading(true);
        setError(null);
        setMessage('');

        try {
            const { data, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    // Menyimpan informasi tambahan ke metadata pengguna
                    data: {
                        username: username,
                    }
                }
            });

            if (signUpError) throw signUpError;

            setMessage('Registrasi berhasil! Silakan cek email Anda untuk verifikasi.');
            // Arahkan ke login setelah beberapa detik untuk memberi waktu membaca pesan
            setTimeout(() => navigate('/login'), 3000);

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <Title>Buat Akun Baru</Title>
            <StyledForm onSubmit={handleRegister}>
                <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="Password (minimal 6 karakter)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="Konfirmasi Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                
                {error && <ErrorMessage>{error}</ErrorMessage>}
                {message && <SuccessMessage>{message}</SuccessMessage>}

                <Button type="submit" disabled={loading}>
                    {loading ? 'Mendaftar...' : 'Daftar'}
                </Button>
            </StyledForm>
            <SubText>
                Sudah punya akun? <Link to="/login">Login di sini</Link>
            </SubText>
        </AuthLayout>
    );
};

export default Register;