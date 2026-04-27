import json
import os

from openai import OpenAI
from dotenv import load_dotenv
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


load_dotenv()


client = OpenAI(
    api_key=os.getenv("AI_KEY") or "Sda2J5ZieNE7N814Al1PfKDbLSSmTcok",
    base_url=os.getenv("AI_BASE_URL") or "https://factchat-cloud.mindlogic.ai/v1/gateway"
)


QUIZ_TITLE = "개발자 성향 테스트"
QUIZ_DESCRIPTION = "몇 가지 질문으로 당신의 개발 스타일을 진단합니다."
QUIZ_QUESTIONS = [
    {
        "id": "q1",
        "text": "새로운 서비스 아이디어가 떠올랐을 때 가장 먼저 하는 행동은?",
        "choices": [
            {"id": "c1", "text": "일단 빠르게 프로토타입을 만들어 본다"},
            {"id": "c2", "text": "문제 정의와 사용자 시나리오부터 정리한다"},
        ],
    },
    {
        "id": "q2",
        "text": "기능 출시 직전, 더 중요하게 보는 기준은?",
        "choices": [
            {"id": "c1", "text": "최대한 빨리 공개하고 실제 반응을 수집한다"},
            {"id": "c2", "text": "엣지 케이스와 장애 가능성을 먼저 점검한다"},
        ],
    },
    {
        "id": "q3",
        "text": "혼자 개발할 때 코드 구조를 잡는 방식은?",
        "choices": [
            {"id": "c1", "text": "작게 시작하고 필요할 때마다 구조를 바꾼다"},
            {"id": "c2", "text": "초반부터 확장 가능한 구조를 먼저 설계한다"},
        ],
    },
    {
        "id": "q4",
        "text": "일정이 촉박한 상황에서 더 가까운 선택은?",
        "choices": [
            {"id": "c1", "text": "핵심 기능부터 끝내고 세부 품질은 뒤로 미룬다"},
            {"id": "c2", "text": "범위를 줄이더라도 품질 기준은 지킨다"},
        ],
    },
    {
        "id": "q5",
        "text": "버그 리포트를 받았을 때 가장 먼저 드는 생각은?",
        "choices": [
            {"id": "c1", "text": "우선 빠르게 재현해서 바로 고친다"},
            {"id": "c2", "text": "원인과 영향 범위를 먼저 파악한다"},
        ],
    },
    {
        "id": "q6",
        "text": "새 기술이나 라이브러리를 도입할 때 더 가까운 태도는?",
        "choices": [
            {"id": "c1", "text": "직접 붙여 보며 판단한다"},
            {"id": "c2", "text": "레퍼런스와 운영 리스크를 먼저 검토한다"},
        ],
    },
    {
        "id": "q7",
        "text": "사용자 피드백이 애매하게 섞여 들어올 때 보통 어떻게 움직이나?",
        "choices": [
            {"id": "c1", "text": "빠르게 실험 가능한 안을 만들어 테스트한다"},
            {"id": "c2", "text": "패턴을 묶어서 우선순위를 다시 정리한다"},
        ],
    },
    {
        "id": "q8",
        "text": "개발 중 문서화에 대한 생각은?",
        "choices": [
            {"id": "c1", "text": "필요해질 때 최소한으로 정리하면 충분하다"},
            {"id": "c2", "text": "나중을 위해 초반부터 기준을 남겨야 한다"},
        ],
    },
    {
        "id": "q9",
        "text": "혼자 일할 때 가장 큰 만족을 느끼는 순간은?",
        "choices": [
            {"id": "c1", "text": "아이디어가 바로 작동하는 결과로 이어졌을 때"},
            {"id": "c2", "text": "구조가 깔끔하게 정리되어 오래 버틸 것 같을 때"},
        ],
    },
    {
        "id": "q10",
        "text": "프로젝트를 돌아봤을 때 스스로 더 중요하게 평가하는 것은?",
        "choices": [
            {"id": "c1", "text": "얼마나 빨리 시장에 내놓고 검증했는가"},
            {"id": "c2", "text": "얼마나 안정적으로 운영 가능한 기반을 만들었는가"},
        ],
    },
]


def _build_question_lookup():
    lookup = {}
    for question in QUIZ_QUESTIONS:
        lookup[question["id"]] = {
            "text": question["text"],
            "choices": {choice["id"]: choice["text"] for choice in question["choices"]},
        }
    return lookup


QUESTION_LOOKUP = _build_question_lookup()
AI_SYSTEM_PROMPT = """
You analyze a solo developer personality test and produce a concise, polished result.

Output rules:
- Respond with ONLY one valid JSON object.
- Do not use markdown, code fences, explanations, or extra text.
- Follow the exact top-level shape: {"result": {...}, "traits": {...}, "meta": {...}}
- All fields must be present.
- Keep the writing concise, direct, and natural Korean.
- Base the result on the provided answers and signals. Do not mention that this came from an AI model.

Required JSON schema:
{
  "result": {
    "typeCode": "UPPER_SNAKE_CASE string",
    "title": "string",
    "subtitle": "string",
    "summary": "string",
    "strengths": ["string", "string", "string"],
    "risks": ["string", "string"],
    "shareText": "string"
  },
  "traits": {
    "builder": 0,
    "planner": 0,
    "speed": 0,
    "stability": 0
  },
  "meta": {
    "provider": "mindlogic-gateway",
    "responseCount": 0
  }
}

Trait rules:
- trait values must be integers from 0 to 100.
- builder/planner and speed/stability should reflect the answer tendencies.
- typeCode must be stable and short.

Writing rules:
- title and subtitle should feel like an event result card.
- summary should be 1-2 sentences.
- strengths must contain exactly 3 items.
- risks must contain exactly 2 items.
- shareText should be short and shareable.
""".strip()


def quiz_api(request):
    if request.method != "GET":
        return JsonResponse({"error": "Method not allowed"}, status=405)

    return JsonResponse(
        {
            "quiz": {
                "title": QUIZ_TITLE,
                "description": QUIZ_DESCRIPTION,
            },
            "questions": QUIZ_QUESTIONS,
        }
    )


def build_ai_request_payload(answers):
    normalized_answers = []
    fast_count = 0
    structured_count = 0

    for answer in answers:
        question_id = answer.get("questionId")
        choice_id = answer.get("choiceId")
        question = QUESTION_LOOKUP.get(question_id)
        if not question or choice_id not in question["choices"]:
            continue

        if choice_id == "c1":
            fast_count += 1
        elif choice_id == "c2":
            structured_count += 1

        normalized_answers.append(
            {
                "questionId": question_id,
                "questionText": question["text"],
                "choiceId": choice_id,
                "choiceText": question["choices"][choice_id],
            }
        )

    return {
        "quizTitle": QUIZ_TITLE,
        "responseCount": len(normalized_answers),
        "answers": normalized_answers,
        "signals": {
            "fastExecution": fast_count,
            "structuredThinking": structured_count,
        },
        "responseFormat": {
            "typeCode": "string",
            "title": "string",
            "subtitle": "string",
            "summary": "string",
            "strengths": ["string"],
            "risks": ["string"],
            "shareText": "string",
        },
    }


def request_ai_summary(ai_request_payload):
    response = client.chat.completions.create(
        model="claude-sonnet-4-6",
        messages=[
            {
                "role": "system",
                "content": AI_SYSTEM_PROMPT,
            },
            {
                "role": "user",
                "content": (
                    "Analyze the following quiz submission and return the result as JSON.\n"
                    f"{json.dumps(ai_request_payload, ensure_ascii=False)}"
                ),
            },
        ],
        temperature=0.7,
        response_format={
            "type": "json_schema",
            "json_schema": {
                "name": "solo_developer_personality_result",
                "strict": True,
                "schema": {
                    "type": "object",
                    "properties": {
                        "result": {
                            "type": "object",
                            "properties": {
                                "typeCode": {"type": "string"},
                                "title": {"type": "string"},
                                "subtitle": {"type": "string"},
                                "summary": {"type": "string"},
                                "strengths": {
                                    "type": "array",
                                    "items": {"type": "string"},
                                },
                                "risks": {
                                    "type": "array",
                                    "items": {"type": "string"},
                                },
                                "shareText": {"type": "string"},
                            },
                            "required": [
                                "typeCode",
                                "title",
                                "subtitle",
                                "summary",
                                "strengths",
                                "risks",
                                "shareText",
                            ],
                            "additionalProperties": False,
                        },
                        "traits": {
                            "type": "object",
                            "properties": {
                                "builder": {"type": "integer"},
                                "planner": {"type": "integer"},
                                "speed": {"type": "integer"},
                                "stability": {"type": "integer"},
                            },
                            "required": [
                                "builder",
                                "planner",
                                "speed",
                                "stability",
                            ],
                            "additionalProperties": False,
                        },
                        "meta": {
                            "type": "object",
                            "properties": {
                                "provider": {"type": "string"},
                                "responseCount": {"type": "integer"},
                            },
                            "required": ["provider", "responseCount"],
                            "additionalProperties": False,
                        },
                    },
                    "required": ["result", "traits", "meta"],
                    "additionalProperties": False,
                },
            },
        },
    )

    content = response.choices[0].message.content
    if not content:
        raise ValueError("Empty AI response content")

    parsed = json.loads(content)

    return parsed


@csrf_exempt
def submissions_api(request):
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)

    try:
        payload = json.loads(request.body or "{}")
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON body"}, status=400)

    answers = payload.get("answers", [])
    if not isinstance(answers, list) or not answers:
        return JsonResponse({"error": "answers is required"}, status=400)

    ai_request_payload = build_ai_request_payload(answers)
    if not ai_request_payload["answers"]:
        return JsonResponse({"error": "No valid answers provided"}, status=400)

    try:
        ai_response = request_ai_summary(ai_request_payload)
    except Exception as exc:
        return JsonResponse(
            {
                "error": "AI summary generation failed",
                "detail": str(exc),
            },
            status=502,
        )

    return JsonResponse(
        {
            "submissionId": "temp-submission",
            "result": ai_response["result"],
            "traits": ai_response["traits"],
            "meta": ai_response["meta"],
        }
    )
