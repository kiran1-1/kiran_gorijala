import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import {withPrefix } from "gatsby";


const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Namaste! My name is</h1>;
  const two = <h2 className="big-heading">Kiran Gorijala</h2>;
  const three = <h3 className="medium-heading">MPS in Data Science | Certified Data Engineer</h3>;
  const four = (
    <>
      <p>
        <b>Glad to e-meet you!</b>
      </p>

      <p>
  Hi, I’m Kiran Gorijala! 👋 A recent 2024 graduate in Data Science with a passion for Data Engineering and Machine Learning.  
  Currently, I’m working as a Data Engineer at {' '}
  <a href="https://www.capitalone.com/">Capital One</a> {' '} since August 2023, where I focus on building scalable data pipelines and optimizing data workflows to drive actionable insights.
</p>
<p>
  When I’m not coding, I’m exploring Machine Learning to solve real-world problems or building projects to fuel my curiosity. 
  Let’s connect and shape the future with data and ML! 🚀
</p>

    </>
  );
  // const five = (
  //   <Link
  //     className="email-link"
  //     to={process.env.NODE_ENV === "production" ? withPrefix("/archive") : "/archive"}
  //   >
  //     Check out my products!
  //   </Link>
  // );
  const five = (
    <a
      className="email-link"
      href={withPrefix("/archive")}
      target="_blank"
      rel="noreferrer">
      Check out my products!
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
