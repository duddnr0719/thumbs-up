import json

with open('lighthouse-report.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# 주요 점수 추출
scores = data['categories']
print("=" * 60)
print("🎯 LIGHTHOUSE 성능 점수")
print("=" * 60)
for category, details in scores.items():
    score = int(details['score'] * 100)
    title = details['title']
    print(f"{category.upper():20} | {score:3d}/100  {title}")

print("\n" + "=" * 60)
print("📊 Core Web Vitals")
print("=" * 60)

audits = data['audits']
metrics = [
    'first-contentful-paint',
    'largest-contentful-paint',
    'cumulative-layout-shift',
    'speed-index',
    'total-blocking-time'
]

for metric in metrics:
    if metric in audits:
        display = audits[metric].get('displayValue', 'N/A')
        title = audits[metric].get('title', metric)
        print(f"{title:40} : {display}")

print("\n" + "=" * 60)
print("🔧 Bundle Size Metrics")
print("=" * 60)

if 'resource-summary' in audits:
    details = audits['resource-summary'].get('details', {}).get('items', [])
    for item in details[:5]:
        print(f"{item.get('resourceType', 'Unknown'):15} | Size: {item.get('size', 0) / 1024:.1f}KB | Requests: {item.get('requestCount', 0)}")
