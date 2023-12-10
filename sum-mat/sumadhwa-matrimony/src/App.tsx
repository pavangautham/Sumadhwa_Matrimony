import React from 'react'
import { Container } from 'react-bootstrap';
import './App.css'
import Form from './Form/form';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfilesList from './Profiles/profilesList';

const App: React.FC = () => {
  console.log("name",import.meta.env.VITE_AWS_ACCESS_KEY)
  return (
    <Container className="mt-4">
      <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/profiles" element={<ProfilesList />} />
      </Routes>
    </Router>
    </Container>
  );
}

export default App
