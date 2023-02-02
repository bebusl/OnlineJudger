import styled from "styled-components";

interface ChartProps {
  guage: number;
  fill?: string;
}

const SemiDonutChart = styled.div<ChartProps>`
  width: 200px;
  height: 100px;
  position: relative;
  overflow: hidden;
  font-size: ${({ theme }) => theme.fontSizes[3]};
  font-weight: 600;
  color: ${({ fill, theme }) => fill || theme.colors.primary};
  display: flex;
  align-items: flex-end;
  justify-content: center;

  &::after {
    content: "";
    width: 200px;
    height: 200px;
    border: 50px solid;
    border-color: ${({ fill, theme }) => {
      const color = fill || theme.colors.primary;
      return `rgba(0, 0, 0, 0.15) rgba(0, 0, 0, 0.15)  ${color}  ${color}`;
    }};
    position: absolute;
    border-radius: 50%;
    left: 0;
    top: 0;
    box-sizing: border-box;
    transform: ${({ guage }) => `rotate(${-45 + guage * 1.8}deg)`};
    transition: transform 1s ease-in-out;
  }
`;
export default SemiDonutChart;
