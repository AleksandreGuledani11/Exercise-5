using System;
using System.Collections.Generic;
using TextProcessorApp;

class Program
{
    static void Main()
    {
        var text = "   hello badword   ";

        
        var ops = new List<Func<string, string>> {
            TextProcessor.TrimText,
            TextProcessor.ToUpperCase,
            TextProcessor.Censor
        };
        foreach (var op in ops)
            Console.WriteLine(op(text));

        
        string message = "outer";
        Action showScope = () =>
        {
            string inner = "inner local";
            Console.WriteLine($"Inner sees: {inner}, Outer visible: {message}");
        };
showScope();


        
        var censor = TextProcessor.CreateCensor(new List<string> { "badword", "ugly" });
        var prefixer = TextProcessor.CreatePrefixer("NOTICE: ");
        var pipeline = new List<Func<string, string>> {
            TextProcessor.TrimText, censor, TextProcessor.ToUpperCase, prefixer
        };

        var texts = new[] { "  badword detected  ", " ugly code  " };
        foreach (var t in texts)
        {
            var result = TextProcessor.ProcessText(pipeline, t);
            Console.WriteLine($"Original: \"{t}\" → Processed: \"{result}\"");
        }
    }
}
