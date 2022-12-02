## 1. 프로젝트 설명

- 알고리즘 문제를 등록하고, 풀어볼 수 있는 플랫폼입니다.
- 사용 스택 : Next.js, typescript, styled-components, redux, typescript, stompjs, axios
- 프로젝트 목표
    1. 외부 라이브러리의 사용을 최소화하기
    2. 최대한 관심사를 분리해 가독성이 좋은 코드를 짜려고 노력하기
    3. 통신 시 효율적으로 에러 처리하는 방법을 탐구해보기
- 배포 링크 : https://brillbe.kro.kr:3443/

## 2. 역할
|이진희🌴|윤정환🔥|
|----|----|
|bebusl|dungbik|
| 프론트엔드 전체 개발, 회의 진행 | 백엔드 전체 개발,  회의 진행 |

## 3. 기능 설명

- **ROLE : 관리자**
    - 문제의 등록/수정/삭제
- **ROLE : 회원**
    - 문제 제출 및 채점 가능
    - 제출 이력 확인 가능
    - 비회원이 사용 가능한 모든 기능 사용 가능
    - 프로필 수정 / 소셜계정 연동 되어 있지 않은 계정일 경우 OAuth 연동
- **ROLE : 비회원**
    - 문제 검색
    - 회원가입(소셜계정 or 로컬계정) - 처음에 로컬계정으로 가입 후 나중에 소셜계정 연동 가능

## 4. 고민한 사항

1. Material UI와 같이 범용성 있는 공용 컴포넌트 구현(Modal, Notification, Button, ... )
2. http 통신할 떄 error handling ⇒ request handler, axios interceptor…
3. 관심사의 분리. 클린 코드
4. 사용자 정보 관리(토큰, …) ⇒ 왜 refresh token을 사용했는지. jwt token이 뭐고 session id가 뭐고,,, xss crfs등을 고려하여 이렇게 로그인 로직을 짠 이유를 설명할 것.
5. 타입스크립트/넥스트 사용하면서 어려웠던 점.
6. oauth 도입기(client-side 위주로!)
7. STOMP를 도입한 이유!
8. 고민했던 점
    1. 어떤 훅을 만드는 게 좋은가! 폴더 구성은 어떻게 하는 것이 좋을까.
    2. refresh token (b와 연계)
    3. SSR에서 guard를 쓰는 것이 맞는가?에 대한 고찰
    4. reflow가 덜 일어나게 하기!(position absolute, fixed는 reflow비용을 줄일 수 있다.)
        1. 레이아웃 변경이 일어나는 것을 최대한 줄여야 한다!(그래서 이미지도 load되기 전에 미리 사이즈 맞춰서 박스만들어 두면 좋음. 그 자리에 이미지를 넣기만 하면 되니까 레이아웃 변경은 일어나지 않음)
    5. lighthouse를 통해 점검해봄 ⇒ Header부분에서 reflow가 많이 일어나서 시간을 많이 잡아먹는다! 얘를 좀 고정적인 너비를 가지도록 수정해보자!
    6. 여러 페이지 이동해도 채점 결과를 알리고 싶다. ⇒ 웹 워커/서비스 워커에 웹소켓을 연결해서 사용해보자
    7. 브라우저는 멀티 쓰레드, 자바스크립트는 싱글 쓰레드.. 웹 워커/서비스 워커를 통해 우리는 독립적인 스크립트를 백그라운드에서 실행할 수 있다. 브라우저가 어떤식으로 구성되어 있는지 심층 탐구해보자!
    8. 링크 연동할 때 연동하는 api 2번가도 문제 없도록 수정할것!

## 5. 실행 방법

```
git clone https://github.com/bebusl/OnlineJudger
cd OnlineJudger
npm i 
node server.js
브라우저에 https://localhost:3443 으로 접근
```

## 6. Docs

### [기능 명세]

**회원**

- OAuth로 회원가입/로그인 가능 (google/kakao)
    - 회원가입시 아래 정보 입력
        - 닉네임
        - 아이디(id)
        - 비밀번호
    - 닉네임과 아이디는 사용자가 입력을 마쳤다고 판단할 때 서버를 통해 체크한다.
    - 이메일 알림
        - 특정 개인 혹은 단체에게 알림을 보낼 필요가 있는지? (@이진희)
        - 그렇다면 아래 방안 중 한개 선택해야함
            - id 형식이 아닌 이메일 인증 가입으로 변경하고, github 연동 제거
            - 가입 후 이메일 인증을 해야 기능 이용 가능하게 변경
- 프로필
    - 프로필 보기
    - 이름 사용 가능 여부 확인
    - 비번 바꾸기
    - 프로필 사진 바꾸기 (로컬 파일로만)
    - 소셜 계정 연동 추가
    - 탈퇴하기
- 로그인 상태 관리
    - accessToken(1시간), refreshToken(2주)
    - accessToken 만료시 refreshToken으로 accessToken, refreshToken 재발급
    - 유저에 accessToken과 refreshToken 쌍을 저장해두고, 다른 token으로 접근시 모두 리셋
        - token 저장은 redis
    - OAuth 인증할 때 쿼리 파라미터로 newUser, linkKey가 온다.
    - newUser가 true 일 때 유저가 입력한 정보와 linkKey를 포함하여 회원가입 시도시 api를 호출하여 회원가입 처리
    - newUser가 false 일 때 linkKey를 파라미터로 로그인 api 호출하여 token 2가지를 받아 로그인 처리
- 로컬 인증
    - 유저가 입력한 정보(name, id, pw)로 api를 호출하여 회원가입 처리
    - 유저가 입력한 정보(Id, pw)로 api를 호출하여 로그인 처리

### 문제

- 문제 검색
    - Filter (tag, diff, lang)
- 문제 등록/수정/삭제
    - 제목 (2 ≤ n ≤ 30)
    - 문제등급
    - 시간 제한/ 메모리 제한
    - 문제 설명(전체적인 거)
    - 입력 설명
    - 출력 설명
    - 예제 입력/출력(테스트케이스 여러개일 수 있으므로 배열로)
    - tag(어떤 문제 유형인지)
    - 실제 입력 데이터 및 출력 데이터(테스트 케이스)
    - 채점 가능언어
    - 제출 횟수/정답 횟수/맞힌 사람/정답률
- 문제 채점 ( c/c++/python2/python3/java)
    - 실행하기 버튼 → 단순 코드 실행해서 실행 결과 보여주는거
        - Judger의 실행 결과 + 채점 결과를 응답해줌 (예제 데이터로만 채점)
    - 제출하기 → 진짜로 제출
        - Judger의 채점 결과만 응답 (실제 채점 데이터로 채점)

### 채점 현황

- 본인꺼는 항상 뜨고 타인꺼는 채점결과 페이지에서만 표기
    - STOMP subscribe 사용

### 제출 이력

- 저장 데이터
    - 제출 번호
    - 시도 수 (문제에 있음)
    - 언어
    - 제출 시간
    - 채점 결과 (메모리, 시간, 결과)
    - 코드 길이
- 모든 채점 제출 이력 저장
- 이력과 비교해서 같은 코드일 경우 채점 X

### 맞힌 사람

- 제출 이력을 소팅
    - 메모리 > 시간 > 코드 길이

### 랭킹

- 데이터
    - 맞은 문제
    - 제출
    - 정답 비율

## [디자인]

[온라인저지설계.pptxx.pptx](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/133d290d-d057-418a-9ddc-62ab889d9f5b/%EC%98%A8%EB%9D%BC%EC%9D%B8%EC%A0%80%EC%A7%80%EC%84%A4%EA%B3%84.pptxx.pptx)

## [페이지]
![image](https://user-images.githubusercontent.com/49019236/203467456-e8daf666-bebc-41cf-b9f5-ec0680af23ea.png)


test
