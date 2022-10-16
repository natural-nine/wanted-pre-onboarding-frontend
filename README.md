# Wanted Pre Onboarding FrontEnd - 선발과제

# 프로젝트 실행 방법

```bash
    git clone https://github.com/natural-nine/wanted-pre-onboarding-frontend.git

    npm install

    npm start
```

# 기술 스택

<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/react-444444?style=for-the-badge&logo=react"> <img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white"> <img src="https://img.shields.io/badge/axios-FFCA28?style=for-the-badge&logo=axios&logoColor=white"> <img src="https://img.shields.io/badge/react_router_dom-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white">

# 배포 링크

# 주요기능

| 페이지 | API 연결 및 기능 |
| ---- | ---- |
| `/` 회원가입 및 로그인 | ✅ 회원가입 Api <br> ✅ 로그인 Api <br> ✅ 이메일 및 패스워드 유효성 검사 및 버튼 활성화 <br> ✅ 로그인 시 JWT 토큰 로컬스토리지에 저장 <br> ✅ 토큰 있을 시 "/todo" 리다이렉트 <br> |
| `/todo` 투두 리스트 CRUD | ✅ Todo 생성 <br> ✅ Todo 완료 <br> ✅ Todo 수정 <br> ✅ Todo 삭제 <br> ✅ 로그아웃시 토큰 삭제 "/" 페이지이동 토큰 없을 시 "/" 리다이렉트 <br> |

# 상세설명
    1. 회원가입 및 로그인 페이지 `/`
        - `/` 접속 시 회원가입 컴포넌트를 렌더링 합니다.
        - `로그인` 및 `회원가입` 클릭 시 Boolean 값으로 맞는 컴포넌트를 렌더링 합니다. 
        -  `onChange` 를 이용하여 이메일 및 비밀번호 유효성을 확인 합니다. 조건이 만족 될 때 버튼이 활성화 됩니다.
        - 회원가입 및 로그인 컴포넌트에서 버튼 클릭 후 에러메세지를 렌더링 합니다. ex) "동일한 이메일 존재", "비밀번호가 맞지 않음"
        - 회원가입이 완료되면 로그인 컴포넌트를 렌더링 합니다.
        - 로그인 성공 시 localStorage 에 JWT Token 을 저장하고 `/todo` 이동 합니다.
        - `/` 페이지에서 localStorage 에 JWT Token 이 있을 시 `/todo` 로 리다이렉트 합니다.

    2. Todo List 페이지 `/todo`