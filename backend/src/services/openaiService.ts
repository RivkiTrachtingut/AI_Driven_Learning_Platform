import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'mock-key',
});

export class OpenAIService {
  async generateLesson(topic: string, subTopic: string, prompt: string): Promise<string> {
    console.log('🔍 OpenAI Service called with:', { topic, subTopic, prompt });
    
    // Check if we should use mock data (for demo purposes)
    const useMock = !process.env.OPENAI_API_KEY || process.env.USE_MOCK_AI === 'true';
    
    if (useMock) {
      console.log('🎭 Using Mock AI Response');
      return this.generateMockLesson(topic, subTopic, prompt);
    }
    
    try {
      console.log('📡 Calling OpenAI API...');
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are an expert educator. Create a comprehensive lesson about ${topic} - ${subTopic}. Make it engaging and educational.`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      });

      console.log('✅ OpenAI API Success!');
      const result = completion.choices[0]?.message?.content || "Sorry, I couldn't generate a lesson at this time.";
      return result;
    } catch (error: any) {
      console.error('❌ OpenAI API Error - Using Mock Response:', error.status);
      return this.generateMockLesson(topic, subTopic, prompt);
    }
  }

  private generateMockLesson(topic: string, subTopic: string, prompt: string): string {
    const lessons = {
      'Science-Space': `# שיעור ב${subTopic}: ${prompt}

## מבוא
ברוכים הבאים למסע מרתק אל עולם ${subTopic}! השיעור הזה יעזור לכם להבין את עולם מדעי החלל המרתק.

## מושגי מפתח
• היקום עצום ומכיל מיליארדי גלקסיות
• כוכבים הם כדורי גז ענקיים המייצרים אור וחום
• כוכבי לכת מקיפים כוכבים במערכות שמש
• חורים שחורים הם אזורים שבהם הכבידה חזקה כל כך שדבר לא יכול לברוח

## הסבר מפורט
${subTopic} הוא אחד התחומים המרתקים ביותר במדע. כשאנחנו מסתכלים על שמי הלילה, אנחנו רואים אור שנסע מיליוני שנים כדי להגיע אלינו.

## עובדות מעניינות
• הכוכב הקרוב ביותר לכדור הארץ (מלבד השמש) נמצא במרחק של 4.2 שנות אור
• שנת אור היא כ-6 טריליון מיילים!
• יש יותר כוכבים ביקום מאשר גרגרי חול על כל החופים של כדור הארץ

## סיכום
מדעי החלל ממשיכים להדהים אותנו עם תגליות חדשות מדי יום. המשיכו לחקור ולשאול שאלות!`,
      
      'Technology-Programming': `# שיעור ב${subTopic}: ${prompt}

## מבוא
תכנות הוא האמנות של יצירת הוראות למחשבים לביצוע. בואו נחקור את התחום המרתק הזה!

## מושגי מפתח
• שפות תכנות הן כלים לתקשורת עם מחשבים
• קוד נכתב בקבצי טקסט ואז מבוצע על ידי המחשב
• משתנים מאחסנים נתונים שניתן להשתמש בהם ולשנות אותם
• פונקציות הן בלוקי קוד הניתנים לשימוש חוזר

## איך מתחילים
כדי להתחיל לתכנת:
1. בחרו שפת תכנות (Python מעולה למתחילים)
2. הכינו סביבת פיתוח
3. כתבו את התוכנית הראשונה שלכם "שלום עולם!"
4. תרגלו עם תרגילים פשוטים

## שיטות עבודה מומלצות
• כתבו קוד נקי וקריא
• הוסיפו הערות לקוד כדי להסביר מה הוא עושה
• בדקו את התוכניות שלכם ביסודיות
• למדו מאחרים ותרגלו באופן קבוע

## סיכום
תכנות פותח אפשרויות אינסופיות ליצירת תוכנות, אתרים, משחקים ועוד!`,
      
      'default': `# שיעור ב${topic} - ${subTopic}

## על השאלה שלכם: "${prompt}"

תודה על העניין שלכם ללמוד על ${subTopic}! זה נושא מרתק בתחום ${topic}.

## נקודות למידה מרכזיות
• הבנת ${subTopic} דורשת סקרנות ותרגול
• התחום הזה מתחבר לתחומי ידע רבים אחרים
• תמיד יש תגליות והתפתחויות חדשות
• למידה היא מסע מתמשך

## הסבר מפורט
${subTopic} הוא תחום חשוב ללימוד שיש לו יישומים מעשיים בחיי היומיום שלנו. על ידי חקירת הנושא הזה, אתם מפתחים כישורי חשיבה ביקורתית ומרחיבים את בסיס הידע שלכם.

## השלבים הבאים
• המשיכו לשאול שאלות
• חפשו משאבים נוספים
• תרגלו את מה שאתם לומדים
• שתפו את הידע שלכם עם אחרים

## סיכום
המשיכו לחקור וללמוד! כל שאלה שאתם שואלים מקרבת אתכם להבנת העולם סביבנו.`
    };

    const key = `${topic}-${subTopic}`;
    return lessons[key as keyof typeof lessons] || lessons.default;
  }
}