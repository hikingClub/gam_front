import React from "react";
// 이거 근데 글시체가 너무 이쁨. 이걸로 ㄱㄱ

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <header className="flex justify-between w-full p-4 border-b">
        <div className="flex space-x-4">
          <a href="#" className="variant-outline">
            디지털집현전이 처음이에요
          </a>
          <a href="#" className="variant-outline">
            디지털집현전 소개
          </a>
          <a href="#" className="variant-outline">
            공지사항
          </a>
        </div>
        <a href="#" className="variant-outline">
          로그인
        </a>
      </header>
      <main className="flex flex-col items-center justify-center flex-1 space-y-8">
        <div className="flex flex-col items-center space-y-2">
          <img src="/placeholder.svg" alt="Logo" className="h-24" />
          <h1 className="text-3xl font-bold">디지털집현전</h1>
          <p className="text-lg">전 국민 지식 플랫폼</p>
        </div>
        <div className="flex items-center w-full max-w-2xl p-2 space-x-2 bg-gray-100 rounded-full">
          <input
            type="text"
            placeholder="궁금한 것을 검색해주세요."
            className="flex-1 bg-transparent border-none focus:ring-0"
          />
          <MicIcon className="w-6 h-6 text-gray-500" />
          <button className="px-4 py-2 text-white bg-blue-500 rounded-full">
            추천검색
          </button>
        </div>
        <div className="flex flex-wrap justify-center space-x-2">
          <a href="#">1</a>
          <a href="#">2</a>
          <a href="#">3</a>
          <a href="#">4</a>
          <a href="#">5</a>
        </div>
      </main>
      <footer className="w-full p-4 text-center border-t">
        <div className="flex flex-wrap justify-center space-x-2 text-sm text-gray-500">
          <a href="#" prefetch="false">
            이용안내
          </a>
          <a href="#" prefetch="false">
            개인정보처리방침
          </a>
          <a href="#" prefetch="false">
            자주 묻는 질문
          </a>
          <a href="#" prefetch="false">
            사이트맵
          </a>
          <a href="#" prefetch="false">
            의견수렴
          </a>
          <a href="#" prefetch="false">
            OPEN API
          </a>
          <a href="#" prefetch="false">
            데이터 개방 신청
          </a>
        </div>
        <p className="mt-2 text-xs text-gray-400">
          Copyright © Ministry of Science and ICT. All Rights Reserved. | 주소
          : (30109) 세종특별자치시 갈매로 477, 정부세종청사 4동 3층~6층 |
          고유번호: 138-83-02932
        </p>
        <img
          src="/placeholder.svg"
          alt="Certification"
          className="mx-auto mt-2"
        />
      </footer>
    </div>
  );
}

function MicIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export default Home;
