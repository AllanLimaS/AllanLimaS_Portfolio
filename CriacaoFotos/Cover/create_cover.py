#!/usr/bin/env python3
"""
create_cover.py — Card de Imagem Centralizada (sem texto)
==========================================================

Uso:
    python Cover/create_cover.py in/screenshot.png
    python Cover/create_cover.py in/screenshot.png --output Cover/out/cover.webp --img-width 0.72 --top-margin 0.07
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import argparse
from PIL import Image, ImageDraw, ImageFilter
from lib.utils import parse_rgb


def create_image_card(
    screenshot_path: str,
    output_path: str = "Cover/out/project_cover.webp",
    card_width: int = 1280,
    card_height: int = 720,
    bg_color: tuple = (236, 230, 211),
    img_width_ratio: float = 0.72,
    top_margin_ratio: float = 0.07,
    corner_radius_ratio: float = 0.03,
    shadow_opacity: int = 200,
    shadow_blur: int = 40,
):
    card = Image.new("RGB", (card_width, card_height), bg_color)

    top_margin = int(card_height * top_margin_ratio)
    target_w   = int(card_width * img_width_ratio)
    target_h   = card_height - top_margin

    sx = (card_width - target_w) // 2
    sy = top_margin

    screenshot = Image.open(screenshot_path).convert("RGB")

    scale = max(target_w / screenshot.width, target_h / screenshot.height)
    new_w = int(screenshot.width * scale)
    new_h = int(screenshot.height * scale)
    screenshot = screenshot.resize((new_w, new_h), Image.LANCZOS)
    screenshot = screenshot.crop((0, 0, target_w, target_h))

    radius = int(min(target_w, target_h) * corner_radius_ratio)
    img_rgba = screenshot.convert("RGBA")

    mask = Image.new("L", img_rgba.size, 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle([(0, 0), (target_w - 1, target_h - 1)], radius=radius, fill=255)
    mask_draw.rectangle([(0, target_h - radius), (radius, target_h)], fill=255)
    mask_draw.rectangle([(target_w - radius, target_h - radius), (target_w, target_h)], fill=255)
    img_rgba.putalpha(mask)

    shadow_layer = Image.new("RGBA", (card_width, card_height), (0, 0, 0, 0))
    ImageDraw.Draw(shadow_layer).rectangle(
        [(sx, sy), (sx + target_w, sy + target_h)],
        fill=(0, 0, 0, shadow_opacity),
    )
    shadow_layer = shadow_layer.filter(ImageFilter.GaussianBlur(shadow_blur))

    base = card.convert("RGBA")
    base = Image.alpha_composite(base, shadow_layer)
    base.paste(img_rgba, (sx, sy), img_rgba)
    card = base.convert("RGB")

    card.save(output_path, "WEBP", quality=90)
    print(f"Cover salvo em: {output_path}")
    return output_path


def main():
    parser = argparse.ArgumentParser(
        description="Gera card com imagem centralizada para portfolio.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument("screenshot", help="Caminho para o screenshot do site")
    parser.add_argument("--output",     default="Cover/out/project_cover.webp")
    parser.add_argument("--width",      type=int,   default=1280)
    parser.add_argument("--height",     type=int,   default=720)
    parser.add_argument("--bg",         default="236,230,211", help="Cor de fundo R,G,B")
    parser.add_argument("--img-width",  type=float, default=0.72,
                        help="Largura da imagem como fracao do card (default: 0.72)")
    parser.add_argument("--top-margin", type=float, default=0.07,
                        help="Margem do topo como fracao da altura (default: 0.07)")

    args = parser.parse_args()

    create_image_card(
        screenshot_path=args.screenshot,
        output_path=args.output,
        card_width=args.width,
        card_height=args.height,
        bg_color=parse_rgb(args.bg),
        img_width_ratio=getattr(args, "img_width"),
        top_margin_ratio=getattr(args, "top_margin"),
    )


if __name__ == "__main__":
    main()
