import React from "react";

const Home = () => {
  return (
    <div className="bg-gray-100">
      <main className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <img
            src="https://via.placeholder.com/150"
            alt="Logo"
            className="mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold mb-2">디지털집현전</h1>
          <p className="text-gray-600 mb-6">전 국민 지식 플랫폼</p>
          <div className="relative w-full max-w-md mx-auto">
            <input
              type="text"
              placeholder="궁금한 것을 검색해보세요."
              className="w-full border rounded-full py-2 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <button className="text-gray-500 hover:text-blue-500 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 4v16m8-16v16M4 8h16m-16 8h16"
                  />
                </svg>
              </button>
              <button className="bg-blue-500 text-white rounded-full px-4 py-2">
                추천검색
              </button>
            </div>
          </div>
          <div className="flex flex-wrap justify-center mt-4 space-x-2">
            <span className="bg-gray-200 text-gray-700 rounded-full px-4 py-1">
              문화재
            </span>
            <span className="bg-gray-200 text-gray-700 rounded-full px-4 py-1">
              인물/기관
            </span>
            <span className="bg-gray-200 text-gray-700 rounded-full px-4 py-1">
              스포츠
            </span>
            <span className="bg-gray-200 text-gray-700 rounded-full px-4 py-1">
              과학기술
            </span>
            <span className="bg-gray-200 text-gray-700 rounded-full px-4 py-1">
              국립디지털도서관
            </span>
          </div>
        </div>
      </main>

      <footer className="bg-gray-200 py-4">
        <div className="container mx-auto text-center text-gray-600 text-sm">
          <div className="flex justify-center space-x-4 mb-2">
            <a href="#" className="hover:text-blue-500">
              이용약관
            </a>
            <a href="#" className="hover:text-blue-500">
              개인정보처리방침
            </a>
            <a href="#" className="hover:text-blue-500">
              저작권 정책
            </a>
            <a href="#" className="hover:text-blue-500">
              사이트맵
            </a>
            <a href="#" className="hover:text-blue-500">
              오픈 API
            </a>
            <a href="#" className="hover:text-blue-500">
              모바일 앱 설치
            </a>
          </div>
          <p>
            Copyright &copy; Ministry of Science and ICT. All Rights Reserved.
          </p>
          <p>
            주소: [2018] 세종특별자치시 갈매로 477, 정부세종청사 4동 3층-4층 |
            고유번호: 138-83-00242
          </p>
        </div>
      </footer>

      <aside className="fixed right-0 top-1/2 transform -translate-y-1/2 space-y-4">
        <button className="bg-white shadow p-2 rounded-full hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 4v16m8-16v16M4 8h16m-16 8h16"
            />
          </svg>
        </button>
        <button className="bg-white shadow p-2 rounded-full hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 4v16m8-16v16M4 8h16m-16 8h16"
            />
          </svg>
        </button>
        <button className="bg-white shadow p-2 rounded-full hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 4v16m8-16v16M4 8h16m-16 8h16"
            />
          </svg>
        </button>
        <button className="bg-white shadow p-2 rounded-full hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 4v16m8-16v16M4 8h16m-16 8h16"
            />
          </svg>
        </button>
        <button className="bg-white shadow p-2 rounded-full hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 4v16m8-16v16M4 8h16m-16 8h16"
            />
          </svg>
        </button>
      </aside>
    </div>
  );
};

export default Home;
