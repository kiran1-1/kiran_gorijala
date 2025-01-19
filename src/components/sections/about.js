import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'Data Engineering', 
    'Machine Learning', 
    'AI & Computer Vision', 
    'Big Data Tools', 
    'Python', 
    'SQL', 
    'PySpark', 
    'Data Visualization', 
    'Real-Time Data'
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
          <p>
  With a core specialization in Data Engineering and Machine Learning, I have built scalable data systems and optimized ETL workflows during my professional journey at 
  <a href="https://www.ltts.com/">L&T Technology Solutions</a> and 
  <a href="https://www.accenture.com/us-en">Accenture</a>.
</p>

<p>
  At <a href="https://www.ltts.com/">L&T Technology Solutions</a>, I processed over 50 million daily records using Azure Databricks and PySpark, reducing data transformation times by 50% while delivering high-impact insights for the aviation industry.
</p>

<p>
  During my tenure at <a href="https://www.accenture.com/us-en">Accenture</a>, I streamlined real-time data pipelines using Apache Kafka and Snowflake, enabling near-instant analytics and reducing latency by 25%.
</p>

<p>
  Beyond the workplace, I thrive on solving real-world problems through innovative projects, like building a 
  <a href="https://github.com/kiran1-1/CAPSTONE">Parking Spot Finder</a> using YOLOv8 Object Detection and CNNs. Check out the complete project details 
  <a href="https://github.com/kiran1-1/CAPSTONE">here</a>, the project presentation <a href="https://docs.google.com/presentation/d/14Wy_u-xeegJeG79WpNgc19RMd62z3yqa/edit?usp=drive_link&ouid=103933310533970761272&rtpof=true&sd=true">here</a>, and the research paper <a href="https://drive.google.com/file/d/1_6J2p-VYMudYss9LusGOKD_f-_yu0nGZ/view?usp=drive_link">here</a>.
</p>

            <p>My skills are not limited to this list!</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/kiran.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
