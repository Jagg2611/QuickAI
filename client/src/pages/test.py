import re


def translate_pattern(p: str) -> str:
    
    out, i, in_class = [], 0, False
    while i < len(p):
        c = p[i]

        # Preserve escapes verbatim
        if c == "\\":
            out.append(c)
            i += 1
            if i < len(p):
                out.append(p[i])
                i += 1
            continue

        # Inside […] character class
        if in_class:
            if c == "]":
                in_class = False
            out.append(c)
            i += 1
            continue

        if c == "[":
            in_class = True
            out.append(c)
            i += 1
            continue

        # Stand-alone wildcard *
        if c == "*":
            out.append(".*")
            i += 1
            continue

        # Custom quantifier: (n,m)  or (n,)
        if c == "(":
            j = i + 1
            n1 = ""
            while j < len(p) and p[j].isdigit():
                n1 += p[j]
                j += 1
            if n1 and j < len(p) and p[j] == ",":
                j += 1
                n2 = ""
                while j < len(p) and p[j].isdigit():
                    n2 += p[j]
                    j += 1
                if j < len(p) and p[j] == ")":
                    out.append("{" + n1 + ("," + n2 if n2 else ",") + "}")
                    i = j + 1
                    continue
            # Not a quantifier → treat ‘(’ literally
            out.append(r"\(")
            i += 1
            continue

        # Any other character
        out.append(c)
        i += 1

    return "".join(out)


def pattern_match(text: str, pattern: str):
    """
    Return a list of (position, matched_substring) for **all** (over-lapping)
    matches of `pattern` in `text`.
    """
    regex = translate_pattern(pattern)
    # (?=(…))  gives an overlapping, zero-width look-ahead; group 1 is the match
    overlapped = re.compile(rf"(?=({regex}))", re.DOTALL)
    matches = [
        (m.start(), m.group(1))
        for m in overlapped.finditer(text)
        if m.group(1) != ""  # avoid infinite loops on empty matches
    ]
    return matches


# ----------------------- demo on your samples -----------------------
if __name__ == "__main__":
    samples = [
        ("hello world", "hello"),
        ("user123admin", "user[0-9]{3}[a-z]*"),
        ("aaaabbbb", "a(2,4)b(1,3)"),
    ]

    for idx, (txt, pat) in enumerate(samples, 1):
        ms = pattern_match(txt, pat)
        print(f"Sample {idx}:")
        print(len(ms))
        for pos, sub in ms:
            print(pos, sub)
        print()