import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  Children,
} from "react";
import * as S from "./Carousel.style";

interface CarouselProps {
  children: React.ReactElement[];
  auto?: boolean;
}

/** Carousel 자동 넘기기 시간 */
const AUTO_PLAY_DURATION = 5000;

function Carousel({ children, auto = true }: CarouselProps) {
  const [order, setOrder] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const childrenArray = Children.toArray(children);
  const itemsCount = Children.count(children);

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
    if (order >= itemsCount + 1) {
      disableTransition();
      setOrder(1);
    } else if (order <= 0) {
      disableTransition();
      setOrder(itemsCount);
    }
  };

  const handlePrevButtonClick = goToImage((prev) => prev - 1);
  const handleNextButtonClick = goToImage((prev) => prev + 1);

  useEffect(() => {
    const autoPlay = () => {
      if (auto && document.visibilityState === "visible") {
        goToImage((prev) => prev + 1)();
      }
    };
    const intervalId = setInterval(autoPlay, AUTO_PLAY_DURATION);
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
          style={{ transform: `translate3d(${100 * -order}%,0,0)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {childrenArray[itemsCount - 1]}
          {children}
          {childrenArray[0]}
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
