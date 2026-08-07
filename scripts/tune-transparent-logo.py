#!/usr/bin/env python3
"""Remove residual chroma-key tint from a transparent red logo."""

from __future__ import annotations

import argparse
from pathlib import Path

import numpy as np
from PIL import Image


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("input", type=Path)
    parser.add_argument("output", type=Path)
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    rgba = np.asarray(Image.open(args.input).convert("RGBA"), dtype=np.uint8).copy()
    red = rgba[..., 0].astype(np.float32)
    green = rgba[..., 1].astype(np.float32)
    blue = rgba[..., 2].astype(np.float32)
    alpha = rgba[..., 3]

    key_tint = (alpha > 0) & (
        (green > red)
        | ((green > red * 0.18) & (blue < green * 0.55) & (red > green))
    )
    clean_red = np.maximum.reduce((red, green, blue))
    rgba[..., 0][key_tint] = clean_red[key_tint].astype(np.uint8)
    rgba[..., 1][key_tint] = np.minimum(green[key_tint], clean_red[key_tint] * 0.06).astype(np.uint8)
    rgba[..., 2][key_tint] = np.minimum(blue[key_tint], clean_red[key_tint] * 0.06).astype(np.uint8)

    args.output.parent.mkdir(parents=True, exist_ok=True)
    Image.fromarray(rgba, mode="RGBA").save(args.output, optimize=True)
    print(f"Wrote {args.output} ({int(key_tint.sum())} fringe pixels corrected)")


if __name__ == "__main__":
    main()
