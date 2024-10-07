import { initializeApp } from "firebase/app";
// realtime database 임포트
import { getDatabase } from "firebase/database";

// .env 파일 생성 후
/** realtime Database는 API Key이외 databaseURL이 하나 더 필요하다.
콘솔상단에서 확인 할 수 있다. */
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  databaseURL:
    "https://reactapp202408-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// App을 초기화하고, Realtime을 사용할 준비를 한다.
const app = initializeApp(firebaseConfig);
const realtime = getDatabase(app);

export { realtime };
