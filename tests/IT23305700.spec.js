const { test, expect } = require("@playwright/test");

const CONFIG = {
  url: "https://www.swifttranslator.com/",
  timeouts: {
    pageLoad: 2000,
    afterClear: 1000,
    translation: 3000,
    betweenTests: 2000,
  },
  selectors: {
    inputField: "Input Your Singlish Text Here.",
    outputContainer:
      "div.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap",
  },
};


const TEST_DATA = {
  positive: [
    {
      tcId: "Pos_Fun_001",
      name: "Convert simple daily activity sentence",
      input: "mama dhaen vaeda karanavaa.",
      expected: "මම දැන් වැඩ කරනවා.",
      category: "Daily language usage",
      grammar: "Present tense",
      length: "S",
    },
    {
      tcId: "Pos_Fun_002",
      name: "Convert polite greeting",
      input: "suba udhaeesanak!",
      expected: "සුබ උදෑසනක්!",
      category: "Greeting / request / response",
      grammar: "Simple sentence",
      length: "S",
    },
    {
      tcId: "Pos_Fun_003",
      name: "Convert interrogative about arrival time",
      input: "oyaa kavadhdha enna hithan inne?",
      expected: "ඔයා කවද්ද එන්න හිතන් ඉන්නේ?",
      category: "Greeting / request / response",
      grammar: "Interrogative (question)",
      length: "M",
    },
    {
      tcId: "Pos_Fun_004",
      name: "Convert imperative instruction",
      input: "issarahata yanna.",
      expected: "ඉස්සරහට යන්න.",
      category: "Daily language usage",
      grammar: "Imperative (command)",
      length: "S",
    },
    {
      tcId: "Pos_Fun_005",
      name: "Convert compound sentence with two actions",
      input: "api passee kathaa karamu saha plan ekak hadhamu.",
      expected: "අපි පස්සේ කතා කරමු සහ plan එකක් හදමු.",
      category: "Daily language usage",
      grammar: "Compound sentence",
      length: "M",
    },
    {
      tcId: "Pos_Fun_006",
      name: "Convert complex conditional sentence",
      input: "oyaa enavaa nam mama balan innavaa.",
      expected: "ඔයා එනවා නම් මම බලන් ඉන්නවා.",
      category: "Daily language usage",
      grammar: "Complex sentence",
      length: "M",
    },
    {
      tcId: "Pos_Fun_007",
      name: "Convert negative ability sentence",
      input: "mata eeka karanna baee.",
      expected: "මට ඒක කරන්න බෑ.",
      category: "Daily language usage",
      grammar: "Negation (negative form)",
      length: "S",
    },
    {
      tcId: "Pos_Fun_008",
      name: "Convert future plan sentence",
      input: "api iilaga sathiyee gedhara yamu.",
      expected: "අපි ඊලග සතියේ ගෙදර යමු.",
      category: "Daily language usage",
      grammar: "Future tense",
      length: "S",
    },
    {
      tcId: "Pos_Fun_009",
      name: "Convert joined word sentence",
      input: "mata paan kanna oonee",
      expected: "මට පාන් කන්න ඕනේ",
      category: "Formatting (spaces / line breaks / paragraph)",
      grammar: "Simple sentence",
      length: "S",
    },
    {
      tcId: "Pos_Fun_010",
      name: "Convert repeated emphasis words",
      input: "eka eka",
      expected: "එක එක",
      category: "Word combination / phrase pattern",
      grammar: "Simple sentence",
      length: "S",
    },
    {
      tcId: "Pos_Fun_011",
      name: "Convert slang expression",
      input: "ela machan!",
      expected: "එල මචන්!",
      category: "Slang / informal language",
      grammar: "Simple sentence",
      length: "S",
    },
    {
      tcId: "Pos_Fun_012",
      name: "Convert sentence with place name",
      input: "siiyaa Colombo yanna hadhannee.",
      expected: "සීයා Colombo යන්න හදන්නේ.",
      category: "Names / places / common English words",
      grammar: "Present tense",
      length: "S",
    },
    {
      tcId: "Pos_Fun_013",
      name: "Convert sentence with technical term",
      input: "Zoom meeting ekak thiyennee.",
      expected: "Zoom meeting එකක් තියෙන්නේ.",
      category: "Mixed Singlish + English",
      grammar: "Simple sentence",
      length: "S",
    },
    {
      tcId: "Pos_Fun_014",
      name: "Convert sentence with abbreviation",
      input: "magee ID eka genna.",
      expected: "මගේ ID එක ගෙන්න.",
      category: "Names / places / common English words",
      grammar: "Imperative (command)",
      length: "S",
    },
    {
      tcId: "Pos_Fun_015",
      name: "Convert currency input",
      input: "USD 1500",
      expected: "USD 1500",
      category: "Punctuation / numbers",
      grammar: "Simple sentence",
      length: "S",
    },
    {
      tcId: "Pos_Fun_016",
      name: "Convert multi-line input",
      input: "api passee kathaa karamu.",
      expected: "අපි පස්සේ කතා කරමු.",
      category: "Formatting (spaces / line breaks / paragraph)",
      grammar: "Simple sentence",
      length: "S",
    },
    {
      tcId: "Pos_Fun_017",
      name: "Convert polite request",
      input: "karuNaakara eeka dhenavadha?",
      expected: "කරුණාකර ඒක දෙනවද?",
      category: "Greeting / request / response",
      grammar: "Interrogative (question)",
      length: "S",
    },
    {
      tcId: "Pos_Fun_018",
      name: "Convert pronoun variation sentence",
      input: "eyaa gedhara giyaa.",
      expected: "එයා ගෙදර ගියා.",
      category: "Daily language usage",
      grammar: "Past tense",
      length: "S",
    },
    {
      tcId: "Pos_Fun_019",
      name: "Convert plural pronoun usage",
      input: "oyaalaa enavadha?",
      expected: "ඔයාලා එනවද?",
      category: "Daily language usage",
      grammar: "Plural form",
      length: "S",
    },
    {
      tcId: "Pos_Fun_020",
      name: "Convert medium paragraph",
      input:
        "mama dhaen office innee. heta aluth vaeda tikak thiyenavaa. ee nisaa mama kalin nidhaaganna oonee.",
      expected:
        "මම දැන් office ඉන්නේ. හෙට අලුත් වැඩ ටිකක් තියෙනවා. ඒ නිසා මම කලින් නිදාගන්න ඕනේ.",
      category: "Formatting (spaces / line breaks / paragraph)",
      grammar: "Compound sentence",
      length: "M",
    },
    {
      tcId: "Pos_Fun_021",
      name: "Negation pattern sentence",
      input:
        "mama dhannee naee.",
      expected:
        "මම දන්නේ නෑ.",
      category: "Names / places / common English words",
      grammar: "Imperative (command)",
      length: "S",
    },
    {
      tcId: "Pos_Fun_022",
      name: "Sentence with abbreviation",
      input:
        "magee NIC eka office ekata genna.",
      expected:
        "මගේ NIC එක office එකට ගෙන්න.",
      category: "Names / places / common English words",
      grammar: "Imperative (command)",
      length: "S",
    },
    {
      tcId: "Pos_Fun_023",
      name: "Currency and numbers handling",
      input:
        "Rs. 5343",
      expected:
        "Rs. 5343",
      category: "Names / places / common English words",
      grammar: "Imperative (command)",
      length: "S",
    },
    {
      tcId: "Pos_Fun_024",
      name: "Paragraph style long input transliteration",
      input:
        "mama adha udhaeesaninma naegitalaa office ekata yanna sudhaanam vuNaa,",
      expected:
        "මම අද උදෑසනින්ම නැගිටලා office එකට යන්න සුදානම් වුණා,",
      category: "Names / places / common English words",
      grammar: "Imperative (command)",
      length: "S",
    },
  ],

  negative: [
  {
    tcId: "Neg_Fun_001",
    name: "Split pronoun word causes incorrect spacing",
    input: "ma ma gedhara inne.",
    expected: "මම ගෙදර ඉන්නේ.",
    category: "Formatting (spaces / line breaks / paragraph)",
    grammar: "Simple sentence",
    length: "S",
  },
  {
    tcId: "Neg_Fun_002",
    name: "Special character inside word",
    input: "api#paasal yanavaa.",
    expected: "අපි පාසල් යනවා.",
    category: "Punctuation / numbers",
    grammar: "Simple sentence",
    length: "S",
  },
  {
    tcId: "Neg_Fun_003",
    name: "Extra repeated characters in verb",
    input: "oyaa enneee.",
    expected: "ඔයා එන්නේ.",
    category: "Typographical error handling",
    grammar: "Present tense",
    length: "S",
  },
  {
    tcId: "Neg_Fun_004",
    name: "Wrong tense marker in future sentence",
    input: "api heta giyaa.",
    expected: "අපි හෙට යනවා.",
    category: "Daily language usage",
    grammar: "Future tense",
    length: "S",
  },
  {
    tcId: "Neg_Fun_005",
    name: "Misspelled negative word",
    input: "mata eeka na.",
    expected: "මට ඒක නැහැ.",
    category: "Typographical error handling",
    grammar: "Negation (negative form)",
    length: "S",
  },
  {
    tcId: "Neg_Fun_006",
    name: "Missing space between words",
  input: "apihetaenavaa",
  expected: "අපි හෙට එනවා.",
  category: "Formatting (spaces / line breaks / paragraph)",
  grammar: "Future tense",
  length: "S",
  },
  {
    tcId: "Neg_Fun_007",
    name: "Long slang spelling",
    input: "elaaaaa!",
    expected: "එල!",
    category: "Slang / informal language",
    grammar: "Simple sentence",
    length: "S",
  },
  {
    tcId: "Neg_Fun_008",
    name: "Question without proper structure",
    input: "oyaa yanna?",
    expected: "ඔයා යනවද?",
    category: "Daily language usage",
    grammar: "Interrogative (question)",
    length: "S",
  },
  {
    tcId: "Neg_Fun_009",
    name: "Incorrect vowel combination for rice",
    input: "baet kanna.",
    expected: "බත් කන්න.",
    category: "Typographical error handling",
    grammar: "Imperative (command)",
    length: "S",
  },
  {
    tcId: "Neg_Fun_010",
    name: "Number word mixed with English spelling",
    input: "mama dhavas threekata passe enavaa.",
    expected: "මම දවස් තුනකට පස්සේ එනවා.",
    category: "Punctuation / numbers",
    grammar: "Future tense",
    length: "M",
  },
],


  ui: {
    tcId: "Pos_UI_001",
    name: "Input field accepts valid Singlish text",
    input: "mama allapu gedharata yanavaa.",
    partialInput: "mama allapu",
    expectedFull: "මම අල්ලපු ගෙදරට යනවා.",
    category: "Daily language usage",
    grammar: "Simple sentence",
    length: "S",

  },
};

class TranslatorPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToSite() {
    await this.page.goto(CONFIG.url);
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(CONFIG.timeouts.pageLoad);
  }

  async getInputField() {
    return this.page.getByRole("textbox", {
      name: CONFIG.selectors.inputField,
    });
  }

  async getOutputField() {
    return this.page
      .locator(CONFIG.selectors.outputContainer)
      .filter({ hasNot: this.page.locator("textarea") })
      .first();
  }

  async clearAndWait() {
    const input = await this.getInputField();
    await input.clear();
    await this.page.waitForTimeout(CONFIG.timeouts.afterClear);
  }

  async typeInput(text) {
    const input = await this.getInputField();
    await input.fill(text);
  }

  async waitForOutput() {
    try {
      await this.page.waitForFunction(() => {
        const elements = Array.from(
          document.querySelectorAll(
            ".w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap"
          )
        );
        return elements.some(
          (el) => el.textContent && el.textContent.trim().length > 0
        );
      });
      await this.page.waitForTimeout(CONFIG.timeouts.translation);
    } catch (error) {
      throw error;
    }
  }

  async getOutputText() {
    const output = await this.getOutputField();
    const text = await output.textContent();
    return text.trim();
  }

  async performTranslation(inputText) {
    await this.clearAndWait();
    await this.typeInput(inputText);
    await this.waitForOutput();
    return await this.getOutputText();
  }
}


test.describe("SwiftTranslator - Singlish to Sinhala Conversion Tests", () => {
  let translator;

  test.beforeEach(async ({ page }) => {
    translator = new TranslatorPage(page);
    await translator.navigateToSite();
  });

  test.describe("Positive Functional Tests", () => {
    for (const testCase of TEST_DATA.positive) {
      test(`${testCase.tcId} - ${testCase.name}`, async () => {
        const actualOutput = await translator.performTranslation(
          testCase.input
        );
        expect(actualOutput).toBe(testCase.expected);
      });
    }
  });

  test.describe("Negative Functional Tests", () => {
    for (const testCase of TEST_DATA.negative) {
      test(`${testCase.tcId} - ${testCase.name}`, async () => {
        const actualOutput = await translator.performTranslation(
          testCase.input
        );
        expect(actualOutput).toBe(testCase.expected);
      });
    }
  });

  test.describe("UI Test", () => {
    test(`${TEST_DATA.ui.tcId} - ${TEST_DATA.ui.name}`, async ({ page }) => {
      const translator = new TranslatorPage(page);
      const input = await translator.getInputField();

      await translator.clearAndWait();
      await input.pressSequentially(TEST_DATA.ui.partialInput);
      await translator.waitForOutput();

      await input.pressSequentially(
        TEST_DATA.ui.input.substring(TEST_DATA.ui.partialInput.length)
      );

      await translator.waitForOutput();
      const outputText = await translator.getOutputText();
      expect(outputText).toBe(TEST_DATA.ui.expectedFull);
    });
  });
});
