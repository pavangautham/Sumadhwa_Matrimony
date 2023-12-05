import React from 'react'
import { Container } from 'react-bootstrap';
import './App.css'
import Form from './Form/form';

const App: React.FC = () => {
  return (
    <Container className="mt-4">
      {/* <h1>Hello, Bootstrap in TypeScript React!</h1>
      <Button variant="primary">Primary Button</Button>
      <StyledDiv>
        This is a styled div.
      </StyledDiv> */}
      <Form />
    </Container>
  );
}

export default App
