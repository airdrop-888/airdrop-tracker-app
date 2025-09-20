import React from 'react';
import styled from 'styled-components';

const AuthPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background-color: var(--bg-primary);
  padding: 1rem;
`;

const FormCard = styled.div`
  width: 100%;
  max-width: 420px;
  padding: 3rem;
  background-color: var(--bg-secondary);
  border-radius: 16px;
  box-shadow: 0 10px 40px var(--shadow-color);
`;

const AuthLayout = ({ children }) => {
  return (
    <AuthPageWrapper>
      <FormCard>{children}</FormCard>
    </AuthPageWrapper>
  );
};

export default AuthLayout;