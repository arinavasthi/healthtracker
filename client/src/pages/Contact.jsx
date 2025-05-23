import { Email, LocationOn, Phone } from "@mui/icons-material";
import React, { useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: scroll;
`;

const Wrapper = styled.div`
  flex: 1;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding: 0px 16px;
`;

const Title = styled.div`
  font-size: 24px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 24px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ContactInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ContactForm = styled.div`
  flex: 2;
  padding: 24px;
  background: ${({ theme }) => theme.bg};
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const InfoCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: ${({ theme }) => theme.bg};
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const InfoText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const InfoTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const InfoDetail = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.text_primary};
  background: transparent;
  outline: none;
  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.text_primary};
  background: transparent;
  outline: none;
  resize: vertical;
  min-height: 120px;
  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission
    setTimeout(() => {
      alert("Thank you for your message! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setLoading(false);
    }, 1000);
  };

  const handleButtonClick = () => {
    // Validate form data before submission
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert("Please fill in all fields before submitting.");
      return;
    }
    // Additional validation or processing can be added here
    console.log("Form data:", formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Wrapper>
        <Title>Contact Us</Title>
        <ContentWrapper>
          <ContactInfo>
            <InfoCard>
              <LocationOn sx={{ fontSize: "24px", color: "inherit" }} />
              <InfoText>
                <InfoTitle>Location</InfoTitle>
                <InfoDetail>CTS-688, Crest Mukta, Offveera Desai Rd 2nd Floor, Plot N-18, near Balaji Telefilms, Andheri, Mumbai, Maharashtra 400053</InfoDetail>
              </InfoText>
            </InfoCard>
            <InfoCard>
              <Email sx={{ fontSize: "24px", color: "inherit" }} />
              <InfoText>
                <InfoTitle>Email</InfoTitle>
                <InfoDetail>fitfactory@fittrack.com</InfoDetail>
              </InfoText>
            </InfoCard>
            <InfoCard>
              <Phone sx={{ fontSize: "24px", color: "inherit" }} />
              <InfoText>
                <InfoTitle>Phone</InfoTitle>
                <InfoDetail>+91 9867730771</InfoDetail>
              </InfoText>
            </InfoCard>
          </ContactInfo>
          <ContactForm>
            <Form onSubmit={handleSubmit}>
              <Input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
              <TextArea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              />
              <Button
                text="Send Message"
                type="submit"
                isLoading={loading}
                isDisabled={loading}
                onClick={handleButtonClick}
              />
            </Form>
          </ContactForm>
        </ContentWrapper>
      </Wrapper>
    </Container>
  );
};

export default Contact; 