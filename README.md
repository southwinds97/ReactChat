# ReactChat-Firebase (Vite)

## 소개

ReactChat-Firebase는 React와 Firebase를 사용하여 실시간 채팅 애플리케이션을 구축하는 예제 프로젝트입니다. 이 프로젝트는 사용자 인증, 실시간 메시징, 데이터베이스 연동 등의 기능을 포함하고 있습니다.

## 주요 기능

- **사용자 인증**: Firebase Authentication을 사용하여 이메일 및 비밀번호로 사용자 등록 및 로그인 기능을 제공합니다.
- **실시간 메시징**: Firebase Realtime Database를 사용하여 실시간으로 메시지를 주고받을 수 있습니다.
- **데이터베이스 연동**: Firebase Firestore를 사용하여 채팅 메시지와 사용자 데이터를 저장하고 관리합니다.

## 설치 및 실행

1. 리포지토리를 클론합니다:
   ```bash
   git clone https://github.com/yourusername/realtimechat-firebase.git
   ```
2. 프로젝트 디렉토리로 이동합니다:
   ```bash
   cd realtimechat-firebase
   ```
3. 필요한 패키지를 설치합니다:
   ```bash
   npm install
   ```
4. Firebase 설정 파일을 추가합니다:

   - Firebase 콘솔에서 프로젝트를 생성하고 설정 파일을 다운로드합니다.
   - `.env` 파일을 생성하고 설정 정보를 추가합니다.

5. 현재 Spring boot와 연동되어 있어 React로만 사용할 경우 package.json의 homepage 설정값 제거 및 App.jsx 수정

6. 애플리케이션을 실행합니다:
   ```bash
   npm run dev
   ```

## 사용 기술

- **React**: 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리
- **Firebase**: 백엔드 서비스로 사용자 인증, 데이터베이스, 호스팅 등을 제공

## 기여

기여를 환영합니다! 버그 리포트, 기능 제안, 풀 리퀘스트 등을 통해 프로젝트에 기여할 수 있습니다.

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.
