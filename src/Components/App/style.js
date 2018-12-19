import styled, { keyframes } from 'styled-components';

const LogoMove = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

export const LogoImage = styled.img`
	height: 75px;
	width: 75px;
	animation: ${LogoMove} 20s infinite;
`;