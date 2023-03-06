import React, { useState, useEffect, useRef, useCallback } from "react";
import * as S from "./Carousel.style";

interface CarouselProps {
  children: React.ReactElement;
  auto?: boolean;
}

function Carousel({ children, auto = true }: CarouselProps) {
  const [order, setOrder] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const enableTransition = useCallback(() => {
    if (containerRef.current)
      containerRef.current.style.transitionDuration = "400ms";
  }, [containerRef.current]);

  const disableTransition = useCallback(() => {
    if (containerRef.current)
      containerRef.current.style.transitionDuration = "0ms";
  }, [containerRef.current]);

  const activateButton = () => setIsAnimating(false);

  const goToImage = (callback: (prev: number) => number) => () => {
    enableTransition();
    setOrder(callback);
    setIsAnimating(true);
  };

  const handleTransitionEnd = () => {
    activateButton();
    if (order === 4) {
      disableTransition();
      setOrder(1);
    } else if (order === 0) {
      disableTransition();
      setOrder(3);
    }
  };

  const handlePrevButtonClick = goToImage((prev) => prev - 1);
  const handleNextButtonClick = goToImage((prev) => prev + 1);

  useEffect(() => {
    const autoPlay = () => {
      if (auto) {
        goToImage((prev) => prev + 1)();
      } else clearInterval(intervalId);
    };
    const intervalId = setInterval(autoPlay, 10000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <S.Container>
      <S.Button
        className="arrow-left"
        onClick={!isAnimating ? handlePrevButtonClick : undefined}
      >
        {"<"}
      </S.Button>
      <S.Window>
        <S.ItemWrapper
          ref={containerRef}
          style={{ transform: `translateX(${-1200 * order}px)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {children}
        </S.ItemWrapper>
      </S.Window>
      <S.Button
        className="arrow-right"
        onClick={!isAnimating ? handleNextButtonClick : undefined}
      >
        {">"}
      </S.Button>
    </S.Container>
  );
}

export default Carousel;
