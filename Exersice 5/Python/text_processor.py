
from typing import Callable, List


def trim_text(text: str) -> str:
    return text.strip()

def to_upper(text: str) -> str:
    return text.upper()

def censor(text: str) -> str:
    forbidden = ["badword", "ugly"]
    for word in forbidden:
        text = text.replace(word, "***")
    return text

def prefix(text: str, pre: str) -> str:
    return pre + text


def part2():
    text = "   hello badword   "
    operations = [trim_text, to_upper, censor]
    for op in operations:
        print(op(text))


def process_text(funcs: List[Callable[[str], str]], text: str) -> str:
    for f in funcs:
        text = f(text)
    return text


def create_censor(forbidden_words: List[str]):
    def inner(text: str) -> str:
        for word in forbidden_words:
            text = text.replace(word, "***")
        return text
    return inner

def create_prefixer(pre: str):
    def inner(text: str) -> str:
        return pre + text
    return inner


def scope():
    x = "outer"
    def inner():
        nonlocal x
        x = "changed inside closure"
        print("Inner sees:", x)
    inner()
    print("Outer sees:", x)


def pipeline():
    texts = ["  badword detected  ", " ugly code  "]
    censor_custom = create_censor(["badword", "ugly"])
    prefixer = create_prefixer("NOTICE: ")

    pipeline = [trim_text, censor_custom, to_upper, prefixer]
    for t in texts:
        result = process_text(pipeline, t)
        print(f'Original: "{t}" → Processed: "{result}"')

if __name__ == "__main__":
    part2()
    scope()
    pipeline()
