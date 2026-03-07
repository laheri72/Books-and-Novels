import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import BooksPage from './pages/BooksPage';
import SubjectView from './pages/SubjectView';
import Reader from './features/reader/Reader';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Main Application with Sidebar and Header */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/books" replace />} />
          <Route path="books" element={<BooksPage />} />
          <Route path="darajah/:level/:subject" element={<SubjectView />} />
        </Route>

        {/* Reader is Fullscreen, so it's outside MainLayout */}
        <Route path="/read/:type/:id" element={<Reader />} />

        {/* Catch-all - redirect to books */}
        <Route path="*" element={<Navigate to="/books" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
