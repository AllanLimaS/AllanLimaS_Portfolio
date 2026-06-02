#!/usr/bin/env python3
"""
create_card.py — Card de Projeto (nome + tags + screenshot)
============================================================

Uso:
    python Card/create_card.py in/screenshot.png --name "Meu Projeto" --tags "Web,API"
    python Card/create_card.py in/screenshot.png --name "Jornada" --tags "Web App,Registro de,Atividades" --output Card/out/card.webp
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import argparse
from PIL import Image, ImageDraw, ImageFilter
from lib.fonts import FONT_BOLD, load_font
from lib.utils import parse_rgb


def create_project_card(
    screenshot_path: str,
    project_name: str,
    tags: list,
    output_path: str = "Card/out/project_card.webp",
    card_width: int = 1280,
    card_height: int = 720,
    bg_color: tuple = (236, 230, 211),
    title_color: tuple = (130, 42, 42),
    tag_color: tuple = (28, 28, 28),
    divider_color: tuple | None = None,
):
    if divider_color is None:
        divider_color = title_color

    card = Image.new("RGB", (card_width, card_height), bg_color)
    draw = ImageDraw.Draw(card)

    left_w = int(card_width * 0.40)
    pad_left = int(card_width * 0.05)
    right_gap = int(card_width * 0.03)

    max_text_w = left_w - pad_left - int(card_width * 0.04)

    words = project_name.split()
    title_size = max(36, int(card_height * 0.13))
    font_title = load_font(FONT_BOLD, title_size)
    title_lines = [project_name]

    if len(words) > 1:
        while title_size >= 32:
            font_title = load_font(FONT_BOLD, title_size)
            for i in range(1, len(words)):
                l1 = ' '.join(words[:i])
                l2 = ' '.join(words[i:])
                if font_title.getbbox(l1)[2] <= max_text_w and font_title.getbbox(l2)[2] <= max_text_w:
                    title_lines = [l1, l2]
                    break
            if len(title_lines) > 1:
                break
            title_size -= 2

    if len(title_lines) == 1:
        title_size = max(36, int(card_height * 0.13))
        font_title = load_font(FONT_BOLD, title_size)
        while title_size > 32:
            font_title = load_font(FONT_BOLD, title_size)
            if font_title.getbbox(project_name)[2] <= max_text_w:
                break
            title_size -= 2

    tag_size = max(24, int(card_height * 0.075))
    font_tag = load_font(FONT_BOLD, tag_size)

    num_lines = len(title_lines)
    line_spacing = title_size + 6
    tag_line_h  = int(tag_size * 1.55)
    title_h     = num_lines * line_spacing + 4
    div_top_gap = int(card_height * 0.010)
    div_bot_gap = int(card_height * 0.028)
    line_w = 4
    block_h = title_h + div_top_gap + line_w + div_bot_gap + len(tags) * tag_line_h
    text_y = (card_height - block_h) // 2 - int(card_height * 0.035)

    for idx, line in enumerate(title_lines):
        draw.text((pad_left, text_y + idx * line_spacing), line, font=font_title, fill=title_color)

    div_y = text_y + title_h + div_top_gap
    draw.line([(pad_left, div_y), (pad_left + max_text_w, div_y)], fill=divider_color, width=line_w)

    tag_y = div_y + line_w + div_bot_gap
    for tag in tags:
        draw.text((pad_left, tag_y), tag, font=font_tag, fill=tag_color)
        tag_y += tag_line_h

    screenshot = Image.open(screenshot_path).convert("RGB")

    top_margin = int(card_height * 0.07)
    sx = left_w + right_gap
    sy = top_margin
    target_w = card_width - sx
    target_h = card_height - sy

    scale = max(target_w / screenshot.width, target_h / screenshot.height)
    new_w = int(screenshot.width * scale)
    new_h = int(screenshot.height * scale)
    screenshot = screenshot.resize((new_w, new_h), Image.LANCZOS)
    screenshot = screenshot.crop((0, 0, target_w, target_h))

    radius = int(min(target_w, target_h) * 0.04)
    img_rgba = screenshot.convert("RGBA")
    mask = Image.new("L", img_rgba.size, 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle([(0, 0), (target_w - 1, target_h - 1)], radius=radius, fill=255)
    mask_draw.rectangle([(target_w - radius, 0), (target_w, radius)], fill=255)
    mask_draw.rectangle([(0, target_h - radius), (radius, target_h)], fill=255)
    mask_draw.rectangle([(target_w - radius, target_h - radius), (target_w, target_h)], fill=255)
    img_rgba.putalpha(mask)

    shadow_layer = Image.new("RGBA", (card_width, card_height), (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow_layer)
    shadow_draw.rectangle([(sx, sy), (sx + target_w, sy + target_h)], fill=(0, 0, 0, 75))
    shadow_layer = shadow_layer.filter(ImageFilter.GaussianBlur(18))

    base = card.convert("RGBA")
    base = Image.alpha_composite(base, shadow_layer)
    base.paste(img_rgba, (sx, sy), img_rgba)
    card = base.convert("RGB")

    card.save(output_path, "WEBP", quality=90)
    print(f"Card salvo em: {output_path}")
    return output_path


def main():
    parser = argparse.ArgumentParser(
        description="Gera card de projeto para portfolio a partir de um screenshot.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument("screenshot", help="Caminho para o screenshot do site")
    parser.add_argument("--name",  required=True, help="Nome do projeto")
    parser.add_argument("--tags",  required=True, help="Tags separadas por virgula")
    parser.add_argument("--output", default="Card/out/project_card.webp", help="Arquivo de saida")
    parser.add_argument("--width",  type=int, default=1280)
    parser.add_argument("--height", type=int, default=720)
    parser.add_argument("--bg",           default="236,230,211", help="Cor de fundo R,G,B")
    parser.add_argument("--title-color",  default="130,42,42",   help="Cor do titulo R,G,B")
    parser.add_argument("--tag-color",    default="28,28,28",    help="Cor das tags R,G,B")

    args = parser.parse_args()

    create_project_card(
        screenshot_path=args.screenshot,
        project_name=args.name,
        tags=[t.strip() for t in args.tags.split(",")],
        output_path=args.output,
        card_width=args.width,
        card_height=args.height,
        bg_color=parse_rgb(args.bg),
        title_color=parse_rgb(getattr(args, "title_color")),
        tag_color=parse_rgb(getattr(args, "tag_color")),
    )


if __name__ == "__main__":
    main()
