import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  :root {
    --bg-primary: #F7F7F8;
    --bg-secondary: #FFFFFF;
    --bg-card: #FFFFFF;
    --text-primary: #1C1C1E;
    --text-secondary: #8A8A8E;
    --accent-primary: #007BFF;
    --accent-hover: #0056b3;
    --border-color: #EAEAEA;
    --shadow-color: rgba(0, 0, 0, 0.08);

    /* Warna Status untuk Badge & Progress Bar */
    --status-claimed: #28a745; /* Hijau */
    --status-active: #007BFF;   /* Biru */
    --status-potential: #6f42c1;/* Ungu */
    --status-ended: #6c757d;    /* Abu-abu */
  }
  
  *, *::before, *::after { 
    box-sizing: border-box; 
    margin: 0; 
    padding: 0; 
  }

  /* --- PERUBAHAN PENTING UNTUK MENGATASI MASALAH SCROLL --- */
  html, body, #root {
    height: 100%; /* Memastikan semua elemen pembungkus utama mengisi tinggi layar */
  }
  /* -------------------------------------------------------- */

  body {
    background-color: var(--bg-primary);
    color: var(--text-primary);
    font-family: 'Inter', sans-serif;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* --- PERUBAHAN PENTING UNTUK LAYOUT UTAMA --- */
  #root {
    display: flex;
    flex-direction: column; /* Mengatur layout vertikal (Header di atas, Konten di bawah) */
  }
  /* ------------------------------------------- */
  
  a { 
    color: var(--accent-primary); 
    text-decoration: none; 
    transition: color 0.2s ease-in-out;
  }

  a:hover {
    text-decoration: underline;
    color: var(--accent-hover);
  }

  button {
    font-family: 'Inter', sans-serif; /* Memastikan font di tombol konsisten */
  }
`;

export default GlobalStyles;