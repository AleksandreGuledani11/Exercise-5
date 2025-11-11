
function trimText(text) {
    return text.trim();
}
function toUpper(text) {
    return text.toUpperCase();
}
function censor(text) {
    var forbidden = ["badword", "ugly"];
    forbidden.forEach(function (w) { return text = text.replaceAll(w, "***"); });
    return text;
}
function prefix(text, pre) {
    return pre + text;
}

function part2() {
    var text = "   hello badword   ";
    var operations = [trimText, toUpper, censor];
    operations.forEach(function (op) { return console.log(op(text)); });
}

function processText(funcs, text) {
    return funcs.reduce(function (acc, f) { return f(acc); }, text);
}

function createCensor(forbidden) {
    return function (text) {
        forbidden.forEach(function (w) { return text = text.replaceAll(w, "***"); });
        return text;
    };
}
function createPrefixer(pre) {
    return function (text) { return pre + text; };
}

function scope() {
    var outer = "outer";
    function inner() {
        outer = "changed inside closure";
        console.log("Inner sees:", outer);
    }
    inner();
    console.log("Outer now:", outer);
}

function pipeline() {
    var texts = ["  badword detected  ", " ugly code  "];
    var censorCustom = createCensor(["badword", "ugly"]);
    var prefixer = createPrefixer("NOTICE: ");
    var pipeline = [trimText, censorCustom, toUpper, prefixer];
    texts.forEach(function (t) {
        var result = processText(pipeline, t);
        console.log("Original: \"".concat(t, "\" \u2192 Processed: \"").concat(result, "\""));
    });
}

part2();
scope();
pipeline();
