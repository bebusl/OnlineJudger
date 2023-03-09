# OnlineJudger README

# 온라인 져저 : 좋은 풀이를 저장해보세요!

- [배포 링크]([uni.yoonleeverse.com](https://uni.yoonleeverse.com/))
	- 테스트 계정(관리자 계정)
		- id: test@test.com
		- pw : TEST1234
- 기술스택 : `Next.js` `TypeScript` `Axios` `Redux` `Stompjs` `Styled-Components`
- 프로젝트 목표
    1. 외부 라이브러리의 사용을 최소화하기
    2. 가독성이 좋은 코드를 짜려고 노력하기
    3. 배포 후 UI/UX에 대한 개선

## 💬 온라인 져저 소개

> 코딩 테스트 문제를 해결하고, 다른 사람의 풀이에 **좋아요**와 **댓글**을 남겨보세요. 좋아요와 댓글을 남긴 풀이는 마이페이지에서 언제든지 쉽게 열람할 수 있습니다.
> 
### 주요 기능
- **ROLE : 관리자**
  - 문제의 등록/수정/삭제
- **ROLE : 회원**
   - 문제 제출 및 채점
   - 제출 이력 확인
		- 제출 이력에 댓글달기
		- 제출 이력에 좋아요 누르기
   - 프로필 수정 / 소셜계정 연동 되어 있지 않은 계정일 경우 OAuth 연동
- **ROLE : 비회원**
        - 문제 검색
        - 회원가입(소셜계정 or 로컬계정) - 처음에 로컬계정으로 가입 후 나중에 소셜계정 연동 가능


## 🖥️  샘플

|로그인/회원가입|   
|:- |
|![회원인증](https://user-images.githubusercontent.com/49019236/223933417-930f309f-e8aa-44c2-ba9b-74c1a43d6ef2.gif)
|문제 풀이,좋아요&댓글달기|
| ---|
|![문제풀이코멘트좋아요](https://user-images.githubusercontent.com/49019236/224166982-2ba30332-ae61-4456-9b13-d57eaa0e84fd.gif)
| 문제 필터링 |
|![문제필터링](https://user-images.githubusercontent.com/49019236/223933476-30a46dc6-480d-4bf5-ab83-3a4ff7ad574e.gif)|
| 문제 등록/수정/삭제 |
|![문제등록수정삭제](https://user-images.githubusercontent.com/49019236/224166959-b35a6394-de20-4509-9b1f-b42950acda02.gif)|



## 🗞️ Docs
- [기능적 요구사항](https://github.com/bebusl/OnlineJudger/wiki/%EA%B8%B0%EB%8A%A5%EC%A0%81-%EC%9A%94%EA%B5%AC%EC%82%AC%ED%95%AD)

<img src="https://user-images.githubusercontent.com/49019236/203467456-e8daf666-bebc-41cf-b9f5-ec0680af23ea.png" width="900px"/>

- 디자인 : 피그마

![figma](https://velog.velcdn.com/images/brill_be/post/6ba02b2a-c30d-4831-99ee-841d940c1f78/image.png)
	


## 📂 프로젝트 구조

```html
.
├── api - api 호출 함수
│   └── scheme - 요청/응답 타입 선언
├── components - 컴포넌트들
│   ├── common - 공유되어 사용될 수 있는 컴포넌트
│   │   ├── Buttons
│   │   │   ├── BasicButton
│   │   │   ├── CircleButton
│   │   │   ├── IconButton
│   │   │   └── OAuthButton
│   │   ├── Dialog
│   │   ├── DropZone
│   │   ├── Icon
│   │   ├── Link
│   │   ├── Modal
│   │   ├── Notification
│   │   ├── Pagination
│   │   ├── ResizableBox
│   │   ├── Selector
│   │   ├── Table
│   │   └── Typhography
│   ├── guard - 페이지 가드에 사용되는 hoc
│   ├── layouts - 헤더, 바디, 푸터같은 레이아웃을 담당하는 컴포넌트
│   └── unit - 특정 페이지나 컴포넌트에 상속되어 사용되는 컴포넌트들
│       ├── comment
│       ├── problem
│       │   ├── problemCard
│       │   ├── problemForm
│       │   └── problemSolveView
│       ├── search
│       ├── solution
│       └── submissions
├── cypress - e2e테스트
│   ├── downloads
│   └── fixtures
├── hooks - 공통적으로 사용되는 커스텀 훅
├── pages - 페이지들
│   ├── admin
│   │   └── problem
│   ├── oauth2
│   │   └── redirect
│   ├── problem
│   ├── reset-password
│   ├── send-message
│   ├── solution
│   └── user
├── public
│   ├── images
│   │   ├── grip
│   │   ├── icon_search
│   │   └── logo
│   └── lottie
├── store - redux store, 리덕스 관련된 것은 모두 해당 디렉토리에 있음
│   ├── middleware
│   └── slice
├── styles - global style이나 styled-component 설정들
├── @types - 타입 덮어씌우기가 필요한 곳에 사용
└── utils - 범용적으로 사용되는 함수, 헬퍼, 상수들 모아놓은 디렉토리
    └── constants
```

## ⬇️ 설치 방법 / 실행 방법

```bash
git clone https://github.com/bebusl/OnlineJudger
cd OnlineJudger
npm i 
node server.js

브라우저에 https://localhost 으로 접근
```
## 🕶️ Contributors

|이진희🌴|윤정환🔥|
|----|----|
|[bebusl](https://github.com/bebusl)|[dungbik](https://github.com/dungbik)|
| 프론트엔드 전체 개발, 회의 진행 | 백엔드 전체 개발,  회의 진행 |





