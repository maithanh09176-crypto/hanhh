import re

with open("/tmp/reference.html", "r", encoding="utf-8", errors="ignore") as f:
    html = f.read()

print("HTML Total length:", len(html))

# Check for base64 or large blobs
audios = re.findall(r'data:audio/[a-zA-Z0-9+;=,/-]+', html)
print(f"Audios count: {len(audios)}")
for i, a in enumerate(audios):
    print(f"  Audio {i}: length {len(a)}, starts with {a[:60]}")

images = re.findall(r'data:image/[a-zA-Z0-9+;=,/-]+', html)
print(f"Images count: {len(images)}")
for i, im in enumerate(images):
    print(f"  Image {i}: length {len(im)}, starts with {im[:60]}")

# Look at main IDs and sections in body
ids = re.findall(r'id=["\']([^"\']+)["\']', html)
print("Unique IDs count:", len(set(ids)))
print("IDs sample:", list(set(ids))[:30])

# Look for story texts or dialogs
texts = re.findall(r'>([^<]{10,})<', html)
clean_texts = [t.strip() for t in texts if t.strip() and not t.strip().startswith('/*') and not t.strip().startswith('{') and len(t.strip()) > 15]
print("\nSample prominent texts:")
for t in clean_texts[:25]:
    print(" -", t[:100])
