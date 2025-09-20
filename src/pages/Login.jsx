import React, { useState } from 'react';
import { supabase } from '../api/supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import AuthLayout from '../components/layout/AuthLayout';

// Styled Components
const Title = styled.h2`
  text-align: center;
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 2rem;
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

  &::placeholder { color: var(--text-secondary); }
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
  
  &:hover { background-color: var(--accent-hover); }
  &:disabled { background-color: #aaa; cursor: not-allowed; }
`;

const ErrorMessage = styled.p`
  color: #d93025;
  text-align: center;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const SubText = styled.p`
  color: var(--text-secondary);
  margin: 0;

  a {
    color: var(--accent-primary);
    font-weight: 500;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
  }
`;

// -- STYLED COMPONENT BARU UNTUK MERAPIKAN LINK DI BAWAH --
const OptionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  font-size: 0.9rem;
`;


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
            navigate('/dashboard');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <Title>Login ke Airdrop Tracker</Title>
            <StyledForm onSubmit={handleLogin}>
                <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <Button type="submit" disabled={loading}>{loading ? 'Masuk...' : 'Login'}</Button>
            </StyledForm>
            
            {error && <ErrorMessage>{error}</ErrorMessage>}
            
            <OptionsContainer>
                <SubText>
                    Belum punya akun? <Link to="/register">Daftar</Link>
                </SubText>
                <SubText>
                    <Link to="/forgot-password">Lupa Password?</Link>
                </SubText>
            </OptionsContainer>
        </AuthLayout>
    );
};

export default Login;