# Frontend Docs for thumbs-up

## 프로젝트 개요

- 이 저장소는 `frontend`와 `backend`가 함께 있는 풀스택 프로젝트입니다.
- `frontend`는 Vite + React(Typescript)로 구성되어 있고, `backend`는 Django로 AI 기반 개발자 성향 테스트 API를 제공합니다.
- 지금부터 프론트엔드는 백엔드 API를 직접 호출해 퀴즈를 보여주고 결과를 렌더링합니다.

## 현재 상태

- `frontend/src/App.tsx`는 `/api/quiz/`를 호출해 퀴즈를 불러옵니다.
- 사용자는 질문마다 하나의 선택지를 고를 수 있고, `POST /api/submissions/`로 응답을 제출합니다.
- 제출 결과는 AI가 생성한 `result`, `traits`, `meta`를 받아서 화면에 표시합니다.

## frontend 구조

- `package.json`: Vite 개발 서버, 빌드, lint 스크립트 정의
- `src/App.tsx`: 백엔드 API 호출, 질문 렌더링, 제출 및 결과 표시
- `src/App.css`: 퀴즈 UI 및 결과 카드 스타일
- `src/main.tsx`: React 진입점
- `public/`: 정적 파일 및 아이콘 리소스

## backend 구조

- `backend/main/views.py`: 퀴즈 질문 목록, AI 요청 페이로드 구성, `/api/quiz/`, `/api/submissions/` 엔드포인트 로직
- `backend/mysite/urls.py`: Django URL 설정
- `backend/mysite/settings.py`: Django 설정, CORS 허용, SQLite DB 사용
- `backend/requirements.txt`: Python 패키지 의존성
- `backend/manage.py`: Django 관리 명령어 진입점

## 주요 API

### GET /api/quiz/

- `frontend`가 퀴즈 제목과 질문 목록을 가져오는 엔드포인트입니다.
- 예시 응답 형태:
  ```json
  {
    "quiz": { "title": "...", "description": "..." },
    "questions": [ ... ]
  }
  ```

### POST /api/submissions/

- `answers` 배열을 포함한 요청 본문을 전송하면 AI가 결과를 생성합니다.
- 프론트엔드는 다음과 같은 형태로 전송합니다:
  ```json
  {
    "answers": [
      { "questionId": "q1", "choiceId": "c1" },
      { "questionId": "q2", "choiceId": "c1" },
      { "questionId": "q3", "choiceId": "c2" },
      { "questionId": "q4", "choiceId": "c1" },
      { "questionId": "q5", "choiceId": "c2" },
      { "questionId": "q6", "choiceId": "c1" },
      { "questionId": "q7", "choiceId": "c1" },
      { "questionId": "q8", "choiceId": "c2" },
      { "questionId": "q9", "choiceId": "c1" },
      { "questionId": "q10", "choiceId": "c1" }
    ]
  }
  ```
- 반환 데이터는 `result`, `traits`, `meta`를 포함합니다.

예시 응답:

```json
{
  "submissionId": "temp-submission",
  "result": {
    "typeCode": "RAPID_BUILDER",
    "title": "빠르게 치고 나가는 실행형 빌더",
    "subtitle": "생각보다 손이 먼저 움직이는 개발자",
    "summary": "아이디어가 떠오르면 즉시 코드로 옮기고, 실제 반응을 통해 방향을 잡는 실행 중심형입니다. 속도와 검증을 최우선으로 삼아 짧은 사이클로 결과를 만들어냅니다.",
    "strengths": [
      "빠른 프로토타이핑으로 아이디어를 즉시 현실로 전환하는 실행력",
      "시장 반응을 빠르게 수집해 방향을 유연하게 조정하는 적응력",
      "핵심에 집중해 불필요한 과정을 줄이는 효율적인 우선순위 감각"
    ],
    "risks": [
      "빠른 실행 속도로 인해 기술 부채가 쌓이고 유지보수 비용이 커질 수 있음",
      "구조 설계보다 결과 우선 사고가 반복되면 확장 시 병목이 발생할 수 있음"
    ],
    "shareText": "나의 개발 성향은 '빠르게 치고 나가는 실행형 빌더' 🚀 생각보다 손이 먼저 움직이는 타입!"
  },
  "traits": {
    "builder": 78,
    "planner": 22,
    "speed": 82,
    "stability": 35
  },
  "meta": {
    "provider": "mindlogic-gateway",
    "responseCount": 10
  }
}
```

## 실행 방법

### backend 실행

```bash
cd backend
# Git Bash 또는 WSL
source venv/Scripts/activate
pip install -r requirements.txt
python manage.py runserver
```

- 백엔드는 `http://127.0.0.1:8000`에서 실행됩니다.
- `backend/.env` 파일에 `AI_KEY`와 `AI_BASE_URL`을 설정해야 합니다.
- `backend/.gitignore`에 `.env`를 추가해 두었습니다.

### frontend 실행

```bash
cd frontend
npm install          # 필요 시
npm run dev
```

- 브라우저에서 `frontend`를 열면 퀴즈 UI가 나타납니다.
- 호출 대상 백엔드 URL은 개발 환경에서 `http://127.0.0.1:8000`입니다.

## 확인 포인트

- 프론트엔드가 `GET /api/quiz/`로 질문을 불러오는지 확인
- 모든 질문에 답한 뒤 `결과 생성하기` 버튼을 클릭하여 `POST /api/submissions/`가 호출되는지 확인
- AI 결과가 화면에 표시되는지 확인

## 추가 개선

- 퀴즈 제출 후 결과를 다시 제출하거나 초기화하는 기능 추가
- 로딩 상태와 에러 메시지를 더 세밀하게 처리
- 실제 서비스 UI에 맞춘 디자인 및 레이아웃 개선
