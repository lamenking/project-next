import Router, { useRouter } from "next/router";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

import BoardControll from "./BoardControll";
import BoardInfo from "./BoardInfo";
import { InfoType } from "./BoardInfo";
import BoardSearch from "./BoardSearch";

interface propsType {
  isSelect: boolean;
  setIsSelect: (isSelect: boolean) => void;
  list: [];
  pageNumbers: Number[];
}

export default function BoardList({
  isSelect,
  setIsSelect,
  list,
  pageNumbers,
}: propsType) {
  const { isLogin } = useSelector((state: any) => {
    return state.authReducer;
  });

  const router = useRouter();
  const ctg = router.query.ctg;
  const searchText = router.query.searchText;
  const searchType: any = router.query.searchType;
  const page: any = Number(router.query.page);
  const orderType = router.query.orderType;

  const [select, setSelect] = useState("최신순");

  useEffect(() => {
    if (orderType) {
      setSelect(String(orderType));
    } else {
      setSelect("최신순");
    }
  }, [orderType]);

  const handleWrite = () => {
    if (isLogin) {
      Router.push({
        pathname: "/community/freewrite",
        query: { ctg: ctg },
      });
    } else {
      const yesLogin = confirm("로그인이 필요합니다.");
      if (yesLogin) {
        Router.push("/user/login");
      } else {
        return;
      }
    }
  };

  const lists = [...list].map((item: InfoType, index) => {
    const date = moment(item.date).format("YYYY.MM.DD");
    return (
      <BoardInfo
        key={item.id}
        id={item.id}
        title={item.title}
        content={item.content}
        nickname={item.nickname}
        date={date}
        heart={item.heart}
        view={item.view}
        reply={item.reply}
      ></BoardInfo>
    );
  });

  return (
    <>
      <BoardSearch isSelect={isSelect} setIsSelect={setIsSelect}></BoardSearch>
      <ListTop>
        <div>
          {select === "최신순" ? <span>✓</span> : <span>●</span>}
          <p
            className="active"
            onClick={() => {
              router.push({
                pathname: "/community/freelist",
                query: {
                  ctg: ctg,
                  page: 1,
                  searchText: searchText,
                  searchType: searchType,
                  orderType: "최신순",
                },
              });
              setSelect("최신순");
            }}
          >
            최신순
          </p>
        </div>
        <div>
          {select === "좋아요순" ? <span>✓</span> : <span>●</span>}
          <p
            onClick={() => {
              router.push({
                pathname: "/community/freelist",
                query: {
                  ctg: ctg,
                  page: 1,
                  searchText: searchText,
                  searchType: searchType,
                  orderType: "좋아요순",
                },
              });
              setSelect("좋아요순");
            }}
          >
            좋아요순
          </p>
        </div>
      </ListTop>
      <ListNews>
        <li>
          <div>
            <p>공지</p>
            <p>
              <span>알려진 이슈를 안내해드립니다.</span>
            </p>
            <p>2022.02.24</p>
          </div>
        </li>
        <li>
          <div>
            <p>공지</p>
            <p>
              <span>로스트아크 DirectX 11 지원에 대한 안내</span>
            </p>
            <p>2022.02.23</p>
          </div>
        </li>
        <li>
          <div>
            <p>공지</p>
            <p>
              <span>모험가 여러분의 계정 보호를 위한 안내</span>
            </p>
            <p>2022.02.22</p>
          </div>
        </li>
      </ListNews>
      <ListMain>{lists}</ListMain>
      {ctg === "공지사항" ? undefined : (
        <ButtonWrap>
          <WriteButton type="button" onClick={handleWrite}>
            글쓰기
          </WriteButton>
        </ButtonWrap>
      )}
      <BoardControll pageNumbers={pageNumbers} page={page} />
    </>
  );
}

const ListTop = styled.div`
  display: flex;
  padding-top: 30px;
  border-top: 3px solid black;
  padding-bottom: 20px;
  border-bottom: 1px solid lightgray;
  font-weight: bold;
  cursor: pointer;
  div {
    display: flex;
    align-items: center;
    margin-right: 30px;
    color: black;
    span {
      color: black;
      margin-right: 5px;
    }
  }
  i {
    font-size: 1px;
    margin-right: 5px;
  }
  .active {
    color: black;
  }
`;

const ListNews = styled.ul`
  li {
    width: 100%;
    height: 60px;
    background-color: #f5f5f5;
    border-bottom: 1px solid lightgray;
    cursor: pointer;
    :hover {
      span {
        border-bottom: 1px solid black;
      }
    }
    div {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      p {
        :nth-of-type(1) {
          width: 80px;
          padding: 6px;
          margin-left: 10px;
          text-align: center;
          border: 1px solid lightgray;
          border-radius: 20px;
          background-color: #fff;
        }
        :nth-of-type(2) {
          width: 1000px;
        }
        :nth-of-type(3) {
          width: 100px;
          margin-right: 10px;
          text-align: center;
        }
      }
    }
  }
`;

const ListMain = styled.ul`
  height: 600px;
`;

const ButtonWrap = styled.div`
  position: relative;
  height: 50px;
`;

const WriteButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  height: 50px;
  margin: 30px 0;
  font-size: 16px;
  color: #fff;
  background-color: #333;
  cursor: pointer;
`;
