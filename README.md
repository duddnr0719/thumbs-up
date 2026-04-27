# 👨‍💻 Developer Profile Quiz

> **당신의 개발 성향을 AI가 진단해줍니다**  
> 간단한 질문에 답하면 3가지 개발 유형 중 당신의 성향을 과학적으로 분석합니다

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Django](https://img.shields.io/badge/Django-6.0-092E20?logo=django)](https://www.djangoproject.com)
[![Lighthouse](https://img.shields.io/badge/Lighthouse-83.5%2F100-00C853)](https://developers.google.com/web/tools/lighthouse)

---

## 📋 프로젝트 정보

| 항목           | 내용                               |
| -------------- | ---------------------------------- |
| **프로젝트명** | Developer Profile Quiz             |
| **개발 기간**  | 2026-04-09 ~ 2026-04-28 **(20일)** |
| **상태**       | ✅ Phase 1 완료                    |
| **버전**       | v0.1.0                             |

### 👥 참여자

| 이름 | GitHub 링크                                     | 담당 영역        |
| ---- | ----------------------------------------------- | ---------------- |
| -    | [@github_username](https://github.com/username) | 전체 조율        |
| -    | [@github_username](https://github.com/username) | React/TypeScript |
| -    | [@github_username](https://github.com/username) | Django/AI 연동   |

> 💡 **참고**: 위 표의 이름과 GitHub 링크를 각 참여자 정보로 채워주세요.

---

## 📸 프로젝트 스크린샷

### 메인 화면

### 퀴즈 진행 화면

### 결과 분석 화면

---

## 🎯 프로젝트 개요

개발자마다 다른 업무 방식, 의사결정 패턴, 코드 철학을 가지고 있습니다.  
**Developer Profile Quiz**는 **AI 기반 성향 분석**으로 개발자들이 자신의 스타일을 이해하고, 팀 문화에 맞는 개발자를 찾을 수 있게 도와줍니다.

### 💡 주요 가치

- 🔍 **깔끔한 분석**: 12개의 정교한 질문으로 성향 파악
- ⚡ **빠른 진단**: 5분 내 결과 수신 (평균 2분)
- 🤖 **AI 기반**: OpenAI를 활용한 개인화된 조언
- 📊 **시각화**: 당신의 개발 스타일을 한눈에 이해

---

## ✨ 주요 성능 지표

| 항목              | 지표                   | 개선효과             |
| ----------------- | ---------------------- | -------------------- |
| **성능 점수**     | Lighthouse 83.5/100 ✅ | 고속 로딩 보장       |
| **메모리 최적화** | 페이지네이션 적용      | **-90% 메모리 감소** |
| **아키텍처**      | 6개 컴포넌트 분리      | 유지보수성 ↑         |
| **배포 전략**     | 3개 논리적 커밋        | 깔끔한 히스토리      |

> 🎓 자세한 성능 분석은 [frontend/docs/03-성능-보고서.md](frontend/docs/03-성능-보고서.md)에서 확인할 수 있습니다.

---

## 🚀 빠른 시작

### 사전 요구사항

- Python 3.9+
- Node.js 18+
- OpenAI API Key (또는 호환 LLM)

### 1️⃣ 백엔드 설정

```bash
cd backend

# 가상환경 생성 및 활성화 (Windows Git Bash/WSL)
python -m venv venv
source venv/Scripts/activate

# 의존성 설치
pip install -r requirements.txt

# 환경 변수 설정
echo "AI_KEY=your_api_key" > .env
echo "AI_BASE_URL=https://api.openai.com/v1" >> .env

# 서버 실행
python manage.py runserver 0.0.0.0:8000
```

### 2️⃣ 프론트엔드 설정

```bash
cd frontend

# 의존성 설치
npm install

# 개발 서버 실행 (Hot Reload)
npm run dev

# 프로덕션 빌드
npm run build
```

✅ 브라우저에서 `http://localhost:5173` 접속

---

## 📁 프로젝트 구조

```
thumbs-up/
├── backend/                      # Django REST API
│   ├── main/
│   │   ├── models.py            # 데이터 모델
│   │   ├── views.py             # 퀴즈 엔드포인트, AI 연동
│   │   └── migrations/
│   ├── mysite/
│   │   └── settings.py          # Django 설정 (CORS, etc)
│   ├── requirements.txt          # Python 의존성
│   ├── manage.py
│   └── db.sqlite3              # 임시 DB
│
├── frontend/                     # React 타입스크립트
│   ├── src/
│   │   ├── App.tsx             # 메인 애플리케이션
│   │   ├── components/         # 재사용 가능한 UI 컴포넌트
│   │   │   ├── QuizHeader.tsx
│   │   │   ├── QuestionCard.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── ResultCard.tsx
│   │   │   ├── TraitsVisualization.tsx
│   │   │   └── LoadingState.tsx
│   │   ├── App.css
│   │   └── main.tsx
│   ├── docs/                   # 성능 분석 문서
│   │   ├── INDEX.md
│   │   ├── 01-성능-기준점.md
│   │   ├── 02-측정-도구-가이드.md
│   │   ├── 03-성능-보고서.md
│   │   └── 04-UI-개선-로드맵.md
│   ├── vite.config.ts          # Vite 빌드 설정
│   ├── tsconfig.json           # TypeScript 설정
│   └── package.json
│
└── README.md                    # 이 파일
```

---

## 🛠 기술 스택 선정 이유

### 📱 프론트엔드

| 기술           | 버전 | 선택 이유                                        |
| -------------- | ---- | ------------------------------------------------ |
| **React**      | 19   | 최신 Server Components, 성능 최적화              |
| **TypeScript** | 6.0  | 타입 안정성, 개발 효율성                         |
| **Vite**       | 8    | 초고속 HMR, 경량 번들 (React CRA 대비 10배 빠름) |
| **Babel**      | 7.29 | React Compiler와 호환, 최적화된 변환             |

### 🔧 백엔드

| 기술                    | 버전 | 선택 이유                               |
| ----------------------- | ---- | --------------------------------------- |
| **Django**              | 6.0  | 프로덕션급 안정성, ORM, Admin 패널 제공 |
| **django-cors-headers** | 4.9  | 프론트엔드 크로스 도메인 통신           |
| **OpenAI API**          | -    | 최첨단 LLM으로 정확한 성향 분석         |
| **python-dotenv**       | -    | 환경 변수 관리 (보안)                   |

---

## 🧪 주요 기능

### 📝 지능형 퀴즈 엔진

- 12개의 정교한 성향 진단 질문
- 페이지네이션으로 한 번에 1-2개 질문씩 표시
- 진행 상황 시각화 (Progress Bar)

### 🤖 AI 기반 분석

- OpenAI API와 연동
- 사용자 응답 기반 개인화된 조언 생성
- 개발 유형별 맞춤 피드백

### 📊 결과 시각화

- 3가지 개발 유형 비율 표시
- 강점 및 약점 분석
- 같은 유형의 유명 개발자들과 비교

### ⚡ 성능 최적화

- Lighthouse 83.5/100 (성능 우수)
- 페이지네이션으로 메모리 사용량 90% 감소
- 컴포넌트 분리로 재렌더링 최소화

---

## 📚 문서

- **[성능 분석 보고서](frontend/docs/03-성능-보고서.md)** - Lighthouse 상세 분석
- **[UI 개선 로드맵](frontend/docs/04-UI-개선-로드맵.md)** - Phase 2-7 계획
- **[성능 측정 가이드](frontend/docs/02-측정-도구-가이드.md)** - 성능 도구 사용법

---

## 🔮 향후 계획 (Phase 2-7)

| Phase       | 목표                     | 상태        |
| ----------- | ------------------------ | ----------- |
| **Phase 1** | 기본 기능 + 성능 최적화  | ✅ **완료** |
| **Phase 2** | 사용자 계정 시스템       | 📅 계획 중  |
| **Phase 3** | 결과 공유 및 소셜 기능   | 📅 계획 중  |
| **Phase 4** | 모바일 앱 (React Native) | 🎯 목표     |
| **Phase 5** | 팀 분석 대시보드         | 🎯 목표     |
| **Phase 6** | 직무별 맞춤 분석         | 🎯 목표     |
| **Phase 7** | 성과 추적 시스템         | 🎯 목표     |

자세한 계획은 [04-UI-개선-로드맵.md](frontend/docs/04-UI-개선-로드맵.md)에서 확인하세요.

---

## 🤝 개발 기여 가이드

```bash
# 1. 새 브랜치 생성
git checkout -b feature/new-feature

# 2. 변경사항 커밋 (한글 권장)
git commit -m "feat: 새로운 기능 추가"

# 3. 푸시
git push origin feature/new-feature

# 4. Pull Request 생성
```

### 커밋 컨벤션

- `feat:` - 새 기능
- `fix:` - 버그 수정
- `docs:` - 문서 변경
- `perf:` - 성능 개선
- `refactor:` - 코드 리팩토링

---

## 📋 주요 성과

✅ **Lighthouse 성능 점수 83.5/100** - 빠른 로딩과 안정성 보장  
✅ **메모리 최적화 -90%** - 페이지네이션 기반 효율적 렌더링  
✅ **컴포넌트 분리 아키텍처** - 6개 재사용 가능한 UI 컴포넌트  
✅ **논리적 커밋 히스토리** - 3개의 명확한 개발 단계

---

## 📞 문의 및 피드백

프로젝트에 대한 질문이나 제안이 있으신가요?  
Issues 탭에서 새로운 이슈를 등록해주세요.

---

**📅 마지막 업데이트:** 2026-04-28  
**📌 버전:** v0.1.0 (Phase 1 완료)  
**⏱️ 개발 기간:** 2026-04-09 ~ 2026-04-28 (20일)

```
Made with ❤️ by Team.thumbs-up
```
