import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { UserSignUp } from "../api";
import { loginSuccess } from "../redux/reducers/userSlice";
import Button from "./Button";
import TextInput from "./TextInput";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;
const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
`;
const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 90};
`;

const SignUp = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateInputs = () => {
    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return false;
    }
    setError("");
    return true;
  };

  const handelSignUp = async () => {
    if (!validateInputs()) return;
    
    setLoading(true);
    setButtonDisabled(true);
    setError("");

    try {
      const res = await UserSignUp({ name, email, password });
      dispatch(loginSuccess(res.data));
      // No need to show success alert as the app will redirect
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during sign up");
    } finally {
      setLoading(false);
      setButtonDisabled(false);
    }
  };

  return (
    <Container>
      <div>
        <Title>Create New Account 👋</Title>
        <Span>Please enter details to create a new account</Span>
      </div>
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexDirection: "column",
        }}
      >
        <TextInput
          label="Full name"
          placeholder="Enter your full name"
          value={name}
          handelChange={(e) => setName(e.target.value)}
          error={error}
        />
        <TextInput
          label="Email Address"
          placeholder="Enter your email address"
          value={email}
          handelChange={(e) => setEmail(e.target.value)}
          error={error}
        />
        <TextInput
          label="Password"
          placeholder="Enter your password"
          password
          value={password}
          handelChange={(e) => setPassword(e.target.value)}
          error={error}
        />
        <Button
          text="SignUp"
          onClick={handelSignUp}
          isLoading={loading}
          isDisabled={buttonDisabled}
        />
      </div>
    </Container>
  );
};

export default SignUp;
