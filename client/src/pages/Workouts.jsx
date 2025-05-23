import { FilterList, FitnessCenter, LocalFireDepartment } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getWorkouts } from "../api";
import WorkoutCard from "../components/cards/WorkoutCard";

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
  max-width: 1600px;
  display: flex;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 0.3;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CalendarCard = styled.div`
  height: fit-content;
  padding: 18px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
`;

const FilterCard = styled.div`
  height: fit-content;
  padding: 18px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
`;

const StatsCard = styled.div`
  height: fit-content;
  padding: 18px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Right = styled.div`
  flex: 1;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px;
  margin-bottom: 100px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const FilterItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: ${({ theme }) => theme.text_primary + 10};
  }
  ${({ active, theme }) =>
    active && `background: ${theme.text_primary + 10};`}
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.text_primary + 10};
  &:last-child {
    border-bottom: none;
  }
`;

const StatValue = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
`;

const categories = ["All", "Legs", "Chest", "Back", "Arms", "Shoulders", "Core", "Cardio"];

const Workouts = () => {
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalCalories: 0,
    avgDuration: 0
  });

  const getTodaysWorkout = async () => {
    setLoading(true);
    await getWorkouts(date)
      .then((res) => {
        const workouts = res?.data?.todaysWorkouts || [];
        setTodaysWorkouts(workouts);
        
        // Calculate stats
        const totalCals = workouts.reduce((sum, w) => sum + w.caloriesBurned, 0);
        const avgDur = workouts.length 
          ? workouts.reduce((sum, w) => sum + w.duration, 0) / workouts.length 
          : 0;
        
        setStats({
          totalWorkouts: workouts.length,
          totalCalories: totalCals,
          avgDuration: Math.round(avgDur)
        });
        
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const filteredWorkouts = todaysWorkouts.filter(workout => 
    selectedCategory === "All" || workout.category === selectedCategory
  );

  useEffect(() => {
    getTodaysWorkout();
  }, [date]);

  return (
    <Container>
      <Wrapper>
        <Left>
          <CalendarCard>
            <Title>Select Date</Title>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                onChange={(e) => setDate(`${e.$M + 1}/${e.$D}/${e.$y}`)}
              />
            </LocalizationProvider>
          </CalendarCard>

          <FilterCard>
            <Title>
              <FilterList />
              Filter by Category
            </Title>
            {categories.map((category) => (
              <FilterItem
                key={category}
                active={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              >
                <FitnessCenter sx={{ fontSize: "18px" }} />
                {category}
              </FilterItem>
            ))}
          </FilterCard>

          <StatsCard>
            <Title>
              <LocalFireDepartment />
              Today's Stats
            </Title>
            <StatItem>
              <div>
                <StatValue>{stats.totalWorkouts}</StatValue>
                <StatLabel>Total Workouts</StatLabel>
              </div>
            </StatItem>
            <StatItem>
              <div>
                <StatValue>{stats.totalCalories}</StatValue>
                <StatLabel>Calories Burned</StatLabel>
              </div>
            </StatItem>
            <StatItem>
              <div>
                <StatValue>{stats.avgDuration} min</StatValue>
                <StatLabel>Avg. Duration</StatLabel>
              </div>
            </StatItem>
          </StatsCard>
        </Left>

        <Right>
          {loading ? (
            <CircularProgress />
          ) : (
            <CardWrapper>
              {filteredWorkouts.map((workout, index) => (
                <WorkoutCard key={index} workout={workout} />
              ))}
              {filteredWorkouts.length === 0 && (
                <div style={{ 
                  width: '100%', 
                  textAlign: 'center', 
                  color: 'gray',
                  marginTop: '40px' 
                }}>
                  No workouts found for the selected filters
                </div>
              )}
            </CardWrapper>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Workouts;
