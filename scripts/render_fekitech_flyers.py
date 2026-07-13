from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageOps
import math


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "fekitech-social-flyers"
OUT.mkdir(parents=True, exist_ok=True)

W, H = 1080, 1350

FONT_REG = "/usr/share/fonts/truetype/noto/NotoSans-Regular.ttf"
FONT_BOLD = "/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf"

INK = (7, 9, 14)
MUTED = (70, 82, 104)
BLUE = (0, 145, 255)
DEEP_BLUE = (0, 91, 255)
CYAN = (0, 210, 255)
VIOLET = (161, 0, 255)
MAGENTA = (255, 0, 212)
LINE = (220, 229, 242)
SOFT = (248, 250, 252)
NAVY = (3, 7, 18)


def font(size, bold=False):
    return ImageFont.truetype(FONT_BOLD if bold else FONT_REG, size)


def rounded_mask(size, radius):
    mask = Image.new("L", size, 0)
    d = ImageDraw.Draw(mask)
    d.rounded_rectangle((0, 0, size[0], size[1]), radius=radius, fill=255)
    return mask


def paste_round(base, img, box, radius):
    x, y, w, h = box
    crop = ImageOps.fit(img.convert("RGB"), (w, h), method=Image.Resampling.LANCZOS)
    base.paste(crop, (x, y), rounded_mask((w, h), radius))


def shadow(base, box, radius=32, blur=26, opacity=42):
    x, y, w, h = box
    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.rounded_rectangle((x, y, x + w, y + h), radius=radius, fill=(5, 13, 31, opacity))
    layer = layer.filter(ImageFilter.GaussianBlur(blur))
    base.alpha_composite(layer)


def gradient_rect(size, left, right):
    img = Image.new("RGBA", size, (0, 0, 0, 0))
    pix = img.load()
    for x in range(size[0]):
        t = x / max(1, size[0] - 1)
        col = tuple(int(left[i] * (1 - t) + right[i] * t) for i in range(3)) + (255,)
        for y in range(size[1]):
            pix[x, y] = col
    return img


def draw_soft_glow(base, center, radius, color, alpha=55):
    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    x, y = center
    d.ellipse((x - radius, y - radius, x + radius, y + radius), fill=(*color, alpha))
    base.alpha_composite(layer.filter(ImageFilter.GaussianBlur(radius // 2)))


def draw_text(draw, xy, text, size, fill=INK, bold=False, max_width=None, line_gap=10):
    f = font(size, bold)
    if not max_width:
        draw.text(xy, text, font=f, fill=fill)
        return xy[1] + draw.textbbox(xy, text, font=f)[3] - xy[1]
    words = text.split()
    lines, cur = [], ""
    for word in words:
        test = (cur + " " + word).strip()
        if draw.textlength(test, font=f) <= max_width or not cur:
            cur = test
        else:
            lines.append(cur)
            cur = word
    if cur:
        lines.append(cur)
    y = xy[1]
    for line in lines:
        draw.text((xy[0], y), line, font=f, fill=fill)
        y += size + line_gap
    return y


def cover_image(path, size, crop=(0.5, 0.5)):
    img = Image.open(path).convert("RGB")
    return ImageOps.fit(img, size, method=Image.Resampling.LANCZOS, centering=crop)


def draw_photo(base, draw, path, box, crop=(0.5, 0.5)):
    x, y, w, h = box
    photo = cover_image(path, (w, h), crop)
    # Soft editorial depth, not a heavy "template" shadow.
    shadow(base, (x, y + 8, w, h), radius=34, blur=30, opacity=32)
    base.paste(photo, (x, y), rounded_mask((w, h), 38))
    draw.rounded_rectangle((x, y, x + w, y + h), radius=38, outline=(220, 229, 242), width=2)
    # Brand tint strip, kept subtle so the image remains realistic.
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    od.rectangle((0, h - 126, w, h), fill=(3, 7, 18, 70))
    base.alpha_composite(overlay, (x, y))


def draw_headline(draw, x, y, lines, accent_index=None, size=76):
    line_h = size + 8
    for i, line in enumerate(lines):
        fill = DEEP_BLUE if accent_index is not None and i in accent_index else INK
        draw.text((x, y + i * line_h), line, font=font(size, True), fill=fill)
    return y + len(lines) * line_h


def draw_brand_header(base, draw, title="Fekitech"):
    logo = Image.open(ROOT / "public" / "fekitech-logo-transparent-cropped.png").convert("RGBA")
    logo.thumbnail((56, 58), Image.Resampling.LANCZOS)
    base.alpha_composite(logo, (62, 50))
    draw.text((126, 57), title, font=font(31, True), fill=INK)
    draw.text((126, 94), "Business Transformation Company", font=font(17), fill=MUTED)


def draw_contact_footer(draw):
    y = 1228
    draw.rounded_rectangle((56, y, 1024, 1306), radius=34, fill=(255, 255, 255), outline=(219, 228, 242), width=2)
    items = [("fekitech.co.uk", 91), ("+44 7352 364942", 384), ("@fekitech", 726)]
    for label, x in items:
        draw.ellipse((x - 28, y + 27, x - 4, y + 51), fill=(235, 244, 255), outline=(190, 214, 255))
        draw.text((x + 8, y + 24), label, font=font(24, True), fill=INK)
    draw.line((340, y + 20, 340, y + 58), fill=(220, 229, 242), width=2)
    draw.line((686, y + 20, 686, y + 58), fill=(220, 229, 242), width=2)


def draw_badge(draw, text, xy):
    x, y = xy
    draw.rounded_rectangle((x, y, x + 410, y + 62), radius=31, fill=(246, 250, 255), outline=(184, 212, 255), width=2)
    draw.ellipse((x + 16, y + 13, x + 52, y + 49), fill=DEEP_BLUE)
    draw.line((x + 26, y + 32, x + 34, y + 40, x + 45, y + 24), fill=(255, 255, 255), width=4, joint="curve")
    draw.text((x + 66, y + 17), text, font=font(22, True), fill=INK)


def draw_cta(draw, text, y=1156, x=56, w=430):
    draw.rounded_rectangle((x, y, x + w, y + 68), radius=34, fill=(0, 67, 210))
    draw.text((x + 45, y + 18), text, font=font(25, True), fill=(255, 255, 255))
    ax = x + w - 60
    ay = y + 34
    draw.line((ax - 18, ay, ax + 16, ay), fill=(255, 255, 255), width=4)
    draw.line((ax + 4, ay - 12, ax + 16, ay, ax + 4, ay + 12), fill=(255, 255, 255), width=4, joint="curve")


def draw_metric_card(draw, box, title, value, note):
    x, y, w, h = box
    draw.rounded_rectangle((x, y, x + w, y + h), radius=24, fill=(255, 255, 255), outline=(222, 231, 242), width=2)
    draw.text((x + 24, y + 22), title, font=font(20, True), fill=INK)
    draw.text((x + 24, y + 54), value, font=font(38, True), fill=DEEP_BLUE)
    draw.text((x + 24, y + 102), note, font=font(16), fill=MUTED)
    lx, ly = x + w - 112, y + 38
    pts = [(lx, ly + 52), (lx + 24, ly + 35), (lx + 48, ly + 42), (lx + 72, ly + 19), (lx + 96, ly + 10)]
    draw.line(pts, fill=DEEP_BLUE, width=4, joint="curve")


def draw_proof_card(draw, box, title, value, note):
    x, y, w, h = box
    draw.rounded_rectangle((x, y, x + w, y + h), radius=24, fill=(255, 255, 255), outline=(222, 231, 242), width=2)
    draw.text((x + 22, y + 18), title, font=font(18, True), fill=INK)
    draw.text((x + 22, y + 43), value, font=font(28, True), fill=DEEP_BLUE)
    draw.text((x + 22, y + 70), note, font=font(14), fill=MUTED)


def draw_system_panel(draw, box, labels):
    x, y, w, h = box
    draw.rounded_rectangle((x, y, x + w, y + h), radius=34, fill=(5, 9, 20), outline=(31, 55, 96), width=2)
    for i in range(0, w, 42):
        draw.line((x + i, y, x + i, y + h), fill=(14, 31, 58), width=1)
    for j in range(0, h, 42):
        draw.line((x, y + j, x + w, y + j), fill=(14, 31, 58), width=1)
    nodes = [(x + 110, y + 88), (x + 302, y + 62), (x + 526, y + 108), (x + 192, y + 224), (x + 432, y + 242)]
    for a, b in zip(nodes, nodes[1:]):
        draw.line((a[0], a[1], b[0], b[1]), fill=(0, 145, 255), width=3)
    for idx, (nx, ny) in enumerate(nodes):
        col = CYAN if idx % 2 == 0 else VIOLET
        draw.rounded_rectangle((nx - 52, ny - 34, nx + 52, ny + 34), radius=17, fill=(9, 20, 42), outline=col, width=2)
        draw.text((nx - 34, ny - 13), labels[idx % len(labels)], font=font(15, True), fill=(234, 244, 255))
    draw.text((x + 32, y + h - 62), "Operating clarity dashboard", font=font(24, True), fill=(255, 255, 255))
    draw.text((x + 32, y + h - 32), "People • Process • Data • Systems", font=font(17), fill=(178, 199, 226))


def draw_device_panel(base, draw, box, headline, chips, variant=0):
    x, y, w, h = box
    shadow(base, (x, y, w, h), 36, 24, 36)
    draw.rounded_rectangle((x, y, x + w, y + h), radius=36, fill=(255, 255, 255), outline=(218, 228, 242), width=2)
    screen = (x + 32, y + 34, w - 64, h - 68)
    sx, sy, sw, sh = screen
    draw.rounded_rectangle((sx, sy, sx + sw, sy + sh), radius=26, fill=(4, 8, 18))
    draw_soft_glow(base, (sx + sw - 80, sy + 70), 130, VIOLET, 32)
    draw_soft_glow(base, (sx + 90, sy + sh - 60), 150, CYAN, 32)
    draw.text((sx + 32, sy + 28), "Fekitech", font=font(21, True), fill=(255, 255, 255))
    draw_text(draw, (sx + 32, sy + 72), headline, 33, fill=(255, 255, 255), bold=True, max_width=560, line_gap=5)
    for i, chip in enumerate(chips):
        cx = sx + 32 + i * 178
        cy = sy + sh - 70
        draw.rounded_rectangle((cx, cy, cx + 154, cy + 38), radius=19, fill=(12, 28, 61), outline=(47, 101, 202))
        draw.text((cx + 17, cy + 9), chip, font=font(15, True), fill=(218, 237, 255))
    for i, val in enumerate(["92%", "3.4x", "28h"]):
        bx = sx + sw - 230
        by = sy + 36 + i * 78
        draw.rounded_rectangle((bx, by, bx + 178, by + 54), radius=17, fill=(255, 255, 255, 238))
        draw.text((bx + 18, by + 10), val, font=font(24, True), fill=DEEP_BLUE)
        draw.text((bx + 78, by + 17), ["control", "follow-up", "saved"][i], font=font(15), fill=MUTED)


def draw_service_strip(draw, labels, y=1032):
    x = 56
    w = 968
    h = 92
    draw.rounded_rectangle((x, y, x + w, y + h), radius=28, fill=(255, 255, 255), outline=(220, 229, 242), width=2)
    col_w = w / len(labels)
    for i, label in enumerate(labels):
        cx = int(x + i * col_w)
        if i:
            draw.line((cx, y + 18, cx, y + h - 18), fill=(224, 232, 244), width=2)
        draw.text((cx + 24, y + 28), label, font=font(18, True), fill=INK)


def base_canvas():
    img = Image.new("RGBA", (W, H), (255, 255, 255, 255))
    draw_soft_glow(img, (930, 160), 230, CYAN, 26)
    draw_soft_glow(img, (90, 1090), 260, VIOLET, 18)
    d = ImageDraw.Draw(img)
    for x in range(58, 1024, 36):
        for y in range(200, 1180, 36):
            if (x + y) % 144 == 0:
                d.ellipse((x, y, x + 4, y + 4), fill=(229, 237, 248))
    return img, d


FLYERS = [
    {
        "file": "fekitech-flyer-01-business-transformation.png",
        "kicker": "BUSINESS TRANSFORMATION",
        "headline": ["Run Your Business,", "Not Paperwork."],
        "text": "Replace scattered admin with clearer systems, smoother operations, and practical business support.",
        "cta": "Book a Free Call",
        "image": "public/fekitech-transformation-systems-ai.png",
        "crop": (0.45, 0.5),
    },
    {
        "file": "fekitech-flyer-02-operational-clarity.png",
        "kicker": "OPERATIONAL CLARITY",
        "headline": ["Bring Structure To", "The Way Your Business Runs."],
        "text": "Identify gaps, fix bottlenecks, and build practical systems that improve control and accountability.",
        "cta": "Start With Clarity",
        "image": "public/outcome-save-time.webp",
        "crop": (0.42, 0.5),
    },
    {
        "file": "fekitech-flyer-03-profitability-growth.png",
        "kicker": "PROFITABILITY & GROWTH",
        "headline": ["Build A More", "Profitable Business."],
        "text": "Improve cost control, reduce waste, and create systems that support better margins and growth.",
        "cta": "Book a Free Call",
        "image": "public/outcome-higher-profitability.webp",
        "crop": (0.5, 0.5),
    },
    {
        "file": "fekitech-flyer-04-workflow-automation.png",
        "kicker": "WORKFLOW AUTOMATION",
        "headline": ["Stop Repeating", "Manual Work."],
        "text": "Design smarter workflows that save time, reduce stress, and improve day-to-day efficiency.",
        "cta": "Explore Our Approach",
        "image": "public/outcome-reduce-stress.webp",
        "crop": (0.52, 0.5),
    },
    {
        "file": "fekitech-flyer-05-business-support.png",
        "kicker": "LONG-TERM BUSINESS SUPPORT",
        "headline": ["Better Systems.", "Less Stress.", "Stronger Growth."],
        "text": "From audits to implementation, get steady support for better visibility, performance, and scale.",
        "cta": "Book a Free Call",
        "image": "public/outcome-business-success.webp",
        "crop": (0.5, 0.5),
    },
    {
        "file": "fekitech-flyer-06-website-seo-aeo-ai-visibility.png",
        "kicker": "WEBSITES • SEO • AEO • AI VISIBILITY",
        "headline": ["Get Found.", "Look Credible.", "Grow Faster."],
        "text": "Build a credible website and improve visibility across Google, AI search, SEO, AEO, and modern discovery.",
        "cta": "Improve Your Visibility",
        "image": "public/outcome-customer-growth.webp",
        "crop": (0.45, 0.5),
    },
]


def render(flyer):
    img = Image.new("RGBA", (W, H), (255, 255, 255, 255))
    draw_soft_glow(img, (890, 150), 260, CYAN, 18)
    draw_soft_glow(img, (96, 1110), 240, VIOLET, 14)
    draw = ImageDraw.Draw(img)
    draw_brand_header(img, draw)

    # Clean editorial image block.
    draw_photo(img, draw, ROOT / flyer["image"], (56, 150, 968, 520), flyer["crop"])
    draw.rounded_rectangle((86, 566, 398, 626), radius=30, fill=(255, 255, 255, 238))
    draw.text((112, 583), flyer["kicker"], font=font(18, True), fill=DEEP_BLUE)

    # Premium restrained accent marks.
    grad = gradient_rect((290, 6), CYAN, MAGENTA)
    img.alpha_composite(grad, (62, 716))
    draw.rounded_rectangle((62, 705, 164, 711), radius=3, fill=DEEP_BLUE)

    y = 750
    for i, line in enumerate(flyer["headline"]):
        fill = DEEP_BLUE if i == len(flyer["headline"]) - 1 else INK
        draw.text((62, y), line, font=font(70 if len(line) < 24 else 64, True), fill=fill)
        y += 78

    draw_text(draw, (64, y + 18), flyer["text"], 29, fill=(34, 44, 62), max_width=900, line_gap=9)

    draw.rounded_rectangle((62, 1100, 548, 1172), radius=36, fill=(0, 67, 210))
    draw.text((104, 1118), flyer["cta"], font=font(26, True), fill=(255, 255, 255))
    draw.line((478, 1136, 514, 1136), fill=(255, 255, 255), width=4)
    draw.line((501, 1124, 514, 1136, 501, 1148), fill=(255, 255, 255), width=4, joint="curve")

    draw.text((610, 1110), "Turn business chaos into profitability.", font=font(22, True), fill=INK)
    draw.text((610, 1141), "Structured support for serious business owners.", font=font(17), fill=MUTED)
    draw_contact_footer(draw)

    img.convert("RGB").save(OUT / flyer["file"], quality=96)


if __name__ == "__main__":
    from PIL import ImageOps

    for item in FLYERS:
        render(item)
        print(OUT / item["file"])
