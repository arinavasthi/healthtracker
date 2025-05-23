import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, styled } from "styled-components";
import Navbar from "./components/Navbar";
import Authentication from "./pages/Authentication";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Tutorials from "./pages/Tutorials";
import Workouts from "./pages/Workouts";
import { lightTheme } from "./utils/Themes";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all 0.2s ease;
`;

function App() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        {currentUser ? (
          <Container>
            <Navbar currentUser={currentUser} />
            <Routes>
              <Route path="/" exact element={<Dashboard />} />
              <Route path="/workouts" exact element={<Workouts />} />
              <Route path="/tutorials" exact element={<Tutorials />} />
              <Route path="/blogs" exact element={<Blogs />} />
              <Route path="/contact" exact element={<Contact />} />
            </Routes>
          </Container>
        ) : (
          <Container>
            <Authentication />
          </Container>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
