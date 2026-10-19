import re
import os
import base64

os.makedirs("/app/applet/public/images", exist_ok=True)

with open("/app/applet/tmp/reference.html", "r", encoding="utf-8", errors="ignore") as f:
    html = f.read()

# Extract all images and see where they are used
def repl_image(match):
    mime_type = match.group(1)
    b64data = match.group(2)
    idx = repl_image.counter
    repl_image.counter += 1
    ext = "png" if "png" in mime_type else "webp" if "webp" in mime_type else "jpg"
    filename = f"asset_{idx}.{ext}"
    filepath = f"/app/applet/public/images/{filename}"
    try:
        with open(filepath, "wb") as img_file:
            img_file.write(base64.b64decode(b64data))
        print(f"Saved {filename} ({len(b64data)} b64 chars)")
    except Exception as e:
        print(f"Error saving {filename}: {e}")
    return f"/images/{filename}"

repl_image.counter = 0

# Let's inspect all script contents to understand the entire logic
scripts = re.findall(r'<script([^>]*)>([\s\S]*?)</script>', html)
for i, (attrs, code) in enumerate(scripts):
    with open(f"/app/applet/tmp/script_{i}.js", "w", encoding="utf-8") as sf:
        sf.write(code)
    print(f"Wrote tmp/script_{i}.js (size {len(code)})")

# Let's inspect the body HTML (without scripts and styles)
body_match = re.search(r'<body[^>]*>([\s\S]*?)</body>', html)
if body_match:
    body_content = body_match.group(1)
    # remove large styles and scripts
    body_clean = re.sub(r'<style[\s\S]*?</style>', '<!-- STYLE -->', body_content)
    body_clean = re.sub(r'<script[\s\S]*?</script>', '<!-- SCRIPT -->', body_clean)
    with open("/app/applet/tmp/body_clean.html", "w", encoding="utf-8") as bf:
        bf.write(body_clean)
    print("Wrote tmp/body_clean.html, length:", len(body_clean))

print("Done dump!")
