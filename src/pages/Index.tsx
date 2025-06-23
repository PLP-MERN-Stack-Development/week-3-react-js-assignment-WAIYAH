
import React from 'react';
import Layout from '../components/Layout';
import Home from './Home';
import { ThemeProvider } from '../context/ThemeContext';

const Index = () => {
  return (
    <ThemeProvider>
      <Layout>
        <Home />
      </Layout>
    </ThemeProvider>
  );
};

export default Index;
