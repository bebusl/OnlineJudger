import Carousel from "../../common/Carousel";
import Banner from "../../common/Banner";

const items = [
  {
    id: 1,
    tag: "태그가 있어요~",
    headline: "안녕하슈두줄짜리두돼유? 안된다구요?",
    desc: "gkdlgkdlgkdlgdkgldkl",
    src: "https://asset.programmers.co.kr/image/origin/production/banner/164891/f5ff806e-7814-4159-ad64-777227edd745.png",
    backgroundColor: "red",
  },
  {
    id: 2,
    tag: "태그가 있어요~",
    headline: "2",
    desc: "gkdlgkdlgkdlgdkgldkl",
    src: "https://asset.programmers.co.kr/image/origin/production/banner/164891/f5ff806e-7814-4159-ad64-777227edd745.png",
    backgroundColor: "yellow",
  },
  {
    id: 3,
    tag: "태그가 있어요~",
    headline: "3이에유~",
    desc: "gkdlgkdlgkdlgdkgldkl",
    src: "https://asset.programmers.co.kr/image/origin/production/banner/164891/f5ff806e-7814-4159-ad64-777227edd745.png",
    backgroundColor: "green",
  },
];

function BannerCarousel() {
  return (
    <Carousel>
      <>
        <Banner {...items[items.length - 1]} />
        {items.map((item) => (
          <Banner key={item.id} {...item} />
        ))}
        <Banner {...items[0]} />
      </>
    </Carousel>
  );
}

export default BannerCarousel;
