import re
import os

os.makedirs("/app/applet/public", exist_ok=True)

with open("/app/applet/tmp/reference.html", "r", encoding="utf-8", errors="ignore") as f:
    html = f.read()

# Find texts
texts = re.findall(r'(<div[^>]*id=["\']text-\d+["\'][^>]*>[\s\S]*?</div>)', html)
print(f"--- Found {len(texts)} text elements ---")
for t in texts:
    print(t[:200].replace('\n', ' '))

# Find all scripts with ID or bare
scripts = re.findall(r'<script([^>]*)>([\s\S]*?)</script>', html)
print(f"\n--- Found {len(scripts)} scripts ---")
for i, (attrs, code) in enumerate(scripts):
    print(f"Script {i} (attrs: {attrs.strip()}): len={len(code)}")

# Check audio element
audios = re.findall(r'<audio[\s\S]*?</audio>', html)
print(f"\n--- Audio elements: {len(audios)} ---")
for a in audios:
    clean = re.sub(r'data:audio/[^"\']+', 'data:audio/...[TRUNCATED]', a)
    print(clean)

# Extract audio data URI to public/soundtrack.mp3
m = re.search(r'id=["\']tinySoundtrack["\'][^>]*src=["\']([^"\']+)["\']', html)
if m:
    src = m.group(1)
    print("tinySoundtrack src starts with:", src[:60])
    if src.startswith("data:"):
        import base64
        header, data = src.split(",", 1)
        with open("/app/applet/public/soundtrack.mp3", "wb") as af:
            af.write(base64.b64decode(data))
        print("Extracted to /app/applet/public/soundtrack.mp3! File size:", os.path.getsize("/app/applet/public/soundtrack.mp3"))
