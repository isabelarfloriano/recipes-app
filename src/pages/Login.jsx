import React, { useState, useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { setMealsToken, setCocktailsToken, setUserLogin } from '../services/login';
import loginImage from '../images/loginPage.jpg';

const Login = () => {
  const history = useHistory();
  const [isDisabled, setIsDisabled] = useState(true);
  const [user, setUser] = useState({ email: '', password: '' });

  const validate = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const MIN_PASSWORD_LENGTH = 6;
    const validation = user.password.length > MIN_PASSWORD_LENGTH
      && regex.test(user.email);

    setIsDisabled(!validation);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  useEffect(() => {
    validate();
  }, [user]);

  const handleClick = (e) => {
    e.preventDefault();
    setUserLogin({ email: user.email });
    setMealsToken(1);
    setCocktailsToken(1);
    history.push('/foods');
  };

  return (
    <section
      className="d-flex align-items-center justify-content-center
     min-vh-100 bg-light"
      style={ { backgroundImage: `url(${loginImage})`, backgroundSize: 'cover' } }
    >
      <Container
        className="border mx-4 shadow p-3 mb-5 bg-white rounded"
      >
        <Form>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label className="text-muted">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              data-testid="email-input"
              onChange={ handleChange }
              name="email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label className="text-muted">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              data-testid="password-input"
              onChange={ handleChange }
              name="password"
            />
          </Form.Group>
          <section className="d-flex justify-content-center mt-4">
            <Button
              className="w-75"
              variant={ `${isDisabled ? 'outline-danger' : 'danger'}` }
              type="submit"
              disabled={ isDisabled }
              onClick={ handleClick }
              data-testid="login-submit-btn"
            >
              Enter
            </Button>
          </section>
        </Form>
      </Container>
    </section>
  );
};

export default Login;
