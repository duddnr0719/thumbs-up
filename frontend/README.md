# 🎯 Developer Profile Quiz - Frontend

> **AI 기반 개발자 성향 테스트 플랫폼의 프론트엔드**  
> React 19 + TypeScript + Vite로 구현된 고성능 퀴즈 애플리케이션

## 🚀 빠른 시작

### 1️⃣ 백엔드 실행

```bash
cd backend
source venv/Scripts/activate  # Windows Git Bash / WSL
pip install -r requirements.txt
python manage.py runserver 0.0.0.0:8000
```

**필수:** `backend/.env` 파일에 `AI_KEY`, `AI_BASE_URL` 설정

### 2️⃣ 프론트엔드 실행

```bash
cd frontend
npm install
npm run dev
```

✅ `http://localhost:5175` 에서 실행 확인

---

## 📊 Phase 1 완료

| 항목         | 성과                            |
| ------------ | ------------------------------- |
| **성능**     | Lighthouse 83.5/100 ✅          |
| **아키텍처** | 6개 컴포넌트로 분리 (가독성↑)   |
| **기능**     | 페이지네이션 구현 (메모리 -90%) |
| **배포**     | 3개 논리적 커밋 완료            |

---

## 📚 상세 문서

구체적인 내용은 `docs/` 폴더에서 확인하세요.

- **docs/README.md** - 프로젝트 개요
- **docs/01-성능-기준점.md** - 성능 측정 결과
- **docs/02-측정-도구-가이드.md** - 성능 도구 사용법
- **docs/03-성능-보고서.md** - 최종 성능 보고서
- **docs/04-UI-개선-로드맵.md** - Phase 2-7 계획

---

**📅 마지막 업데이트:** 2026-04-25
