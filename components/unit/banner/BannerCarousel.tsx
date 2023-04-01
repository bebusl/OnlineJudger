import Carousel from "../../common/Carousel";
import Banner from "../../common/Banner";

const items = [
  {
    id: 1,
    tag: "응원해요",
    headline: "할 수 있다! 하면된다!",
    desc: "yoonleeverse가 응원합니다",
    src: "https://brillbeimages.s3.ap-northeast-2.amazonaws.com/fist.png",
    background: "red",
  },
  {
    id: 2,
    tag: "응원해요",
    headline: "어라라 점점 잘풀린다",
    desc: "꾸준히 하다보면 쑥!쑥! 늘거에요 꾸준하게 한 번 해보자고오",
    src: "https://brillbeimages.s3.ap-northeast-2.amazonaws.com/celebration.png",
    background: "green",
  },
  {
    id: 3,
    tag: "응원해요",
    headline: "좌절금지! 모두 함께해요",
    desc: "너무 어려울 땐 다른 유저의 풀이를 한 번 참고해보세요",
    src: "https://brillbeimages.s3.ap-northeast-2.amazonaws.com/depression.png",
    background: "linear-gradient(to bottom right, #c5863f, #573b03)",
  },
];

function BannerCarousel() {
  return (
    <Carousel>
      {items.map((item) => (
        <Banner key={item.id} {...item} />
      ))}
    </Carousel>
  );
}

export default BannerCarousel;
