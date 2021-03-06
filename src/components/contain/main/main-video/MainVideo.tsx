import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

function MainVideo({ youtubeList }: { youtubeList: [] }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 4,
    rows: 2,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  const videoList = youtubeList?.map((video: any, index: number) => {
    return (
      <div key={index}>
        <Link href="/">
          <a>
            <img
              src={video.snippet.thumbnails.medium?.url}
              alt="추천 영상 이미지"
            ></img>
            <TextBox>
              <p>{video.snippet.title}</p>
              <p>{video.snippet.videoOwnerChannelTitle}</p>
            </TextBox>
          </a>
        </Link>
      </div>
    );
  });
  return (
    <Video>
      <h2>추천 영상</h2>
      <StyleSlider {...settings}>{videoList}</StyleSlider>
    </Video>
  );
}

const Video = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1260px;
  h2 {
    padding-left: 2.5px;
    margin-top: 40px;
  }
`;

const StyleSlider = styled(Slider)`
  .slick-list {
    padding: 0 -5px;
  }
  .slick-slide > div {
    margin: 20px 5px;
  }
  div {
    img {
      width: 100%;
      height: 180px;
    }
  }
`;

const TextBox = styled.div`
  width: 100%;
  height: 140px;
  background-color: #fff;
  padding: 20px;
  p:first-child {
    font-weight: bold;
    font-size: 16px;
    height: 85px;
  }
  p:last-child {
    font-size: 14px;
    color: blue;
    margin-top: 5px;
  }
`;

export default MainVideo;
