import { FitnessCenterRounded, PlayCircleOutlined } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";

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

const TutorialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const TutorialCard = styled.div`
  padding: 16px;
  background: ${({ theme }) => theme.bg};
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const TutorialTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 8px;
`;

const TutorialDesc = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 12px;
`;

const TutorialInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
`;

const WatchButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  background: ${({ theme }) => theme.primary + 20};
  color: ${({ theme }) => theme.primary};
  border-radius: 8px;
  font-weight: 500;
  margin-top: 12px;
  transition: all 0.3s ease;
  &:hover {
    background: ${({ theme }) => theme.primary + 40};
  }
`;

const tutorials = [
  {
    title: "Perfect Squat Form",
    description: "Learn proper squat technique for maximum effectiveness and safety",
    duration: "10 mins",
    category: "Legs",
    youtubeUrl: "https://www.youtube.com/watch?v=ubdIGnX2Hfs"
  },
  {
    title: "Bench Press Mastery",
    description: "Master the bench press with proper form and breathing techniques",
    duration: "12 mins",
    category: "Chest",
    youtubeUrl: "https://www.youtube.com/watch?v=vcBig73ojpE"
  },
  {
    title: "Deadlift Basics",
    description: "Essential tips for performing deadlifts safely and effectively",
    duration: "15 mins",
    category: "Back",
    youtubeUrl: "https://www.youtube.com/watch?v=r4MzxtBKyNE"
  },
  {
    title: "Shoulder Press Guide",
    description: "Complete guide to shoulder press variations and form",
    duration: "8 mins",
    category: "Shoulders",
    youtubeUrl: "https://www.youtube.com/watch?v=QAQ64hK4Xxs"
  },
  {
    title: "Core Workout Basics",
    description: "Foundation exercises for a strong core and better stability",
    duration: "10 mins",
    category: "Core",
    youtubeUrl: "https://www.youtube.com/watch?v=Ehy8G39d_PM"
  },
  {
    title: "HIIT Training Guide",
    description: "High-Intensity Interval Training for maximum fat burn",
    duration: "12 mins",
    category: "Cardio",
    youtubeUrl: "https://www.youtube.com/watch?v=ml6cT4AZdqI"
  }
];

const Tutorials = () => {
  const handleTutorialClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <Container>
      <Wrapper>
        <Title>Workout Tutorials</Title>
        <TutorialGrid>
          {tutorials.map((tutorial, index) => (
            <TutorialCard key={index}>
              <TutorialTitle>{tutorial.title}</TutorialTitle>
              <TutorialDesc>{tutorial.description}</TutorialDesc>
              <TutorialInfo>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <PlayCircleOutlined sx={{ fontSize: "20px" }} />
                  {tutorial.duration}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <FitnessCenterRounded sx={{ fontSize: "20px" }} />
                  {tutorial.category}
                </div>
              </TutorialInfo>
              <WatchButton onClick={() => handleTutorialClick(tutorial.youtubeUrl)}>
                <PlayCircleOutlined />
                Watch Tutorial
              </WatchButton>
            </TutorialCard>
          ))}
        </TutorialGrid>
      </Wrapper>
    </Container>
  );
};

export default Tutorials; 