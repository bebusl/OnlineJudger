import { useEffect, useState } from "react";

function useNullImg() {
  const [nullImg, setNullImg] = useState<Element | null>(null);
  useEffect(() => {
    // 마운트가 돼야 DOM에 접근 o
    const img = new Image();
    img.src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    setNullImg(img);
  }, []);
  return nullImg;
}

export default useNullImg;
