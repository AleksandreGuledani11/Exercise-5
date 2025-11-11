using System;
using System.Collections.Generic;
using System.Linq;

namespace TextProcessorApp
{
    public static class TextProcessor
    {
        
        public static string TrimText(string text) => text.Trim();
        public static string ToUpperCase(string text) => text.ToUpper();
        public static string Censor(string text)
        {
            string[] forbidden = { "badword", "ugly" };
            foreach (var w in forbidden)
                text = text.Replace(w, "***");
            return text;
        }
        public static Func<string, string> Prefix(string prefix)
        {
            return text => prefix + text;
        }

        
        public static string ProcessText(IEnumerable<Func<string, string>> funcs, string text)
        {
            foreach (var f in funcs)
                text = f(text);
            return text;
        }

        
        public static Func<string, string> CreateCensor(List<string> forbidden)
        {
            return text =>
            {
                foreach (var w in forbidden)
                    text = text.Replace(w, "***");
                return text;
            };
        }

        public static Func<string, string> CreatePrefixer(string prefix)
        {
            return text => prefix + text;
        }
    }
}
