def parse_rgb(s: str) -> tuple:
    parts = [int(x.strip()) for x in s.split(",")]
    if len(parts) != 3:
        raise ValueError(f"Cor invalida: '{s}'. Use formato R,G,B")
    return tuple(parts)
