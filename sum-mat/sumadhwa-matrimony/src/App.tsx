import React from 'react'
import { Container } from 'react-bootstrap';
import './App.css'
import Form from './Form/form';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfilesList from './Profiles/profilesList';
// import TelegramButton from './Form/telegramButton';
// import YourFormComponent from './Form/formTest';

const App: React.FC = () => {
  return (
    <Container className="mt-4">
      <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        {/* <Route path="/" element={<TelegramButton />} /> */}
        <Route path="/profiles" element={<ProfilesList />} />
      </Routes>
    </Router>
    </Container>
  );
}

export default App
