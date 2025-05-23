import { AccessTime, ArrowForward, PersonOutline } from "@mui/icons-material";
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

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
`;

const BlogCard = styled.div`
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const BlogImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const BlogContent = styled.div`
  padding: 16px;
`;

const BlogTitle = styled.h3`
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 8px;
`;

const BlogExcerpt = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 16px;
  line-height: 1.5;
`;

const BlogMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
`;

const ReadMoreButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  background: ${({ theme }) => theme.primary + 20};
  color: ${({ theme }) => theme.primary};
  border-radius: 8px;
  font-weight: 500;
  margin-top: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: ${({ theme }) => theme.primary + 40};
    transform: translateX(5px);
  }
`;

const blogs = [
  {
    title: "The Importance of Proper Form in Weight Training",
    excerpt: "Learn why maintaining proper form during weight training is crucial for maximizing results and preventing injuries. Discover the science behind proper form and expert tips.",
    author: "John Smith",
    date: "Apr 15, 2024",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&auto=format",
    articleUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6950543/"
  },
  {
    title: "Nutrition Tips for Muscle Building",
    excerpt: "Discover the essential nutrients and meal timing strategies to support muscle growth and recovery. Learn about protein requirements, carb cycling, and supplement recommendations.",
    author: "Sarah Johnson",
    date: "Apr 14, 2024",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format",
    articleUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7561707/"
  },
  {
    title: "Benefits of Morning Workouts",
    excerpt: "Explore the science-backed advantages of exercising in the morning and how it can improve your daily routine. Learn about circadian rhythms and hormonal benefits.",
    author: "Mike Wilson",
    date: "Apr 13, 2024",
    image: "https://images.unsplash.com/photo-1540539234-c14a20fb7c7b?w=500&auto=format",
    articleUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7492403/"
  },
  {
    title: "Guide to Recovery and Rest Days",
    excerpt: "Understanding the importance of rest days and how to optimize your recovery for better fitness results. Learn about sleep, nutrition, and active recovery strategies.",
    author: "Emily Brown",
    date: "Apr 12, 2024",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&auto=format",
    articleUrl: "https://www.acefitness.org/resources/everyone/blog/6466/8-tips-for-recovery-after-a-tough-workout/"
  }
];

const Blogs = () => {
  const handleReadMore = (url) => {
    window.open(url, '_blank');
  };

  return (
    <Container>
      <Wrapper>
        <Title>Fitness Blogs</Title>
        <BlogGrid>
          {blogs.map((blog, index) => (
            <BlogCard key={index}>
              <BlogImage src={blog.image} alt={blog.title} />
              <BlogContent>
                <BlogTitle>{blog.title}</BlogTitle>
                <BlogExcerpt>{blog.excerpt}</BlogExcerpt>
                <BlogMeta>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <PersonOutline sx={{ fontSize: "18px" }} />
                    {blog.author}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <AccessTime sx={{ fontSize: "18px" }} />
                    {blog.date}
                  </div>
                </BlogMeta>
                <ReadMoreButton onClick={() => handleReadMore(blog.articleUrl)}>
                  Read Full Article
                  <ArrowForward sx={{ fontSize: "18px" }} />
                </ReadMoreButton>
              </BlogContent>
            </BlogCard>
          ))}
        </BlogGrid>
      </Wrapper>
    </Container>
  );
};

export default Blogs; 