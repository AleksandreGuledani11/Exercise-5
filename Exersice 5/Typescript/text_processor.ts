
function trimText(text: string): string {
  return text.trim();
}

function toUpper(text: string): string {
  return text.toUpperCase();
}

function censor(text: string): string {
  const forbidden = ["badword", "ugly"];
  forbidden.forEach(w => text = text.replaceAll(w, "***"));
  return text;
}

function prefix(text: string, pre: string): string {
  return pre + text;
}


function part2() {
  const text = "   hello badword   ";
  const operations = [trimText, toUpper, censor];
  operations.forEach(op => console.log(op(text)));
}


function processText(funcs: ((t: string) => string)[], text: string): string {
  return funcs.reduce((acc, f) => f(acc), text);
}


function createCensor(forbidden: string[]): (text: string) => string {
  return (text: string) => {
    forbidden.forEach(w => text = text.replaceAll(w, "***"));
    return text;
  };
}

function createPrefixer(pre: string): (text: string) => string {
  return (text: string) => pre + text;
}


function scope() {
  let outer = "outer";
  function inner() {
    outer = "changed inside closure";
    console.log("Inner sees:", outer);
  }
  inner();
  console.log("Outer now:", outer);
}


function pipeline() {
  const texts = ["  badword detected  ", " ugly code  "];
  const censorCustom = createCensor(["badword", "ugly"]);
  const prefixer = createPrefixer("NOTICE: ");
  const pipeline = [trimText, censorCustom, toUpper, prefixer];

  texts.forEach(t => {
    const result = processText(pipeline, t);
    console.log(`Original: "${t}" → Processed: "${result}"`);
  });
}


part2();
scope();
pipeline();
