import styled from "styled-components";
import { useRef, useEffect } from "react";
import { useRouter } from "next/router";

export default function BoardControll({ pageNumbers, page }: any) {
  const firstPRef: any = useRef();
  const pRef2: any = useRef();
  const pRef3: any = useRef();
  const pRef4: any = useRef();
  const pRef5: any = useRef();
  const pRef6: any = useRef();
  const pRef7: any = useRef();
  const pRef8: any = useRef();
  const pRef9: any = useRef();
  const lastPRef: any = useRef();
  const refArr: any = [
    firstPRef,
    pRef2,
    pRef3,
    pRef4,
    pRef5,
    pRef6,
    pRef7,
    pRef8,
    pRef9,
    lastPRef,
  ];

  const router = useRouter();
  const ctg = router.query.ctg;
  const searchType = router.query.searchType;
  const searchText = router.query.searchText;
  const orderType = router.query.orderType;

  const handleRouter = (page: Number) => {
    let pathname;
    if (ctg === "자유게시판") {
      pathname = "/community/freelist";
    } else if (ctg === "공지사항") {
      pathname = "/news/noticelist";
    }
    router.push({
      pathname: pathname,
      query: {
        ctg: ctg
          ? ctg
          : router.pathname === "/community/freelist"
          ? "자유게시판"
          : "공지사항",
        page: Number(page),
        searchText: searchText ? searchText : "",
        searchType: searchType ? searchType : "",
        orderType: orderType === "최신순" || !orderType ? "최신순" : "좋아요순",
      },
    });
  };

  const handleList = (e: any) => {
    handleRouter(Number(e.target.innerText));
  };

  const handleLeftArrowList = () => {
    if (pageNumbers[0] === 1) {
      return;
    }

    handleRouter(Number(pageNumbers[0] - 1));
  };

  const handleRightArrowList = () => {
    if (pageNumbers.length < 10) {
      return;
    }

    handleRouter(Number(pageNumbers[pageNumbers.length - 1] + 1));
  };

  const numbers = pageNumbers.map((i: any, index: number) => {
    return (
      <p key={i} ref={refArr[index]} onClick={handleList}>
        {i}
      </p>
    );
  });

  useEffect(() => {
    // page에 따른 컨트롤 active 주기
    if (page) {
      if (
        pageNumbers.length !== 0 &&
        pageNumbers.indexOf(Number(page)) !== -1
      ) {
        let index = pageNumbers.indexOf(Number(page));

        for (let i = 0; i < pageNumbers.length; i++) {
          refArr[i].current.classList.remove("active");
        }

        refArr[index].current.classList.add("active");
      }
    } else {
      if (pageNumbers.length !== 0 && pageNumbers.indexOf(1) !== -1) {
        let index = pageNumbers.indexOf(1);

        for (let i = 0; i < pageNumbers.length; i++) {
          refArr[i].current.classList.remove("active");
        }

        refArr[index].current.classList.add("active");
      }
    }
  }, [pageNumbers]);

  return (
    <Controll lengs={pageNumbers.length}>
      <LeftI
        num={pageNumbers[0]}
        aria-hidden
        className="far fa-caret-square-left"
        onClick={handleLeftArrowList}
      ></LeftI>
      <div>{numbers}</div>
      <RightI
        num={pageNumbers.length}
        aria-hidden
        className="far fa-caret-square-right"
        onClick={handleRightArrowList}
      ></RightI>
    </Controll>
  );
}

const Controll = styled.div<{ lengs: number }>`
  width: ${({ lengs }) => {
    return `${lengs * 40 + 120}px `;
  }};
  margin: 60px auto 80px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  i {
    width: 40px;
    height: 40px;

    line-height: 40px;
    color: lightgray;
    font-size: 30px;
    transition: all 0.2s;
  }
  div {
    display: flex;
    align-items: center;

    p {
      width: 40px;
      height: 40px;
      line-height: 40px;
      color: lightgray;
      font-size: 18px;
      cursor: pointer;
      :hover {
        color: #fff;
        background-color: lightgray;
      }
    }
    .active {
      color: #fff;
      background-color: #333;
      :hover {
        color: #fff;
        background-color: #333;
      }
    }
  }
`;

const LeftI = styled.i<{ num: number }>`
  :hover {
    ${({ num }) => {
      return num === 1 ? undefined : "color:black;  cursor: pointer";
    }};
  }
`;

const RightI = styled.i<{ num: number }>`
  :hover {
    ${({ num }) => {
      return num === 10 ? "color:black;  cursor:pointer" : undefined;
    }};
  }
`;
