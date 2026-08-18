// The mockup shows spoken languages as two-letter codes, so every language the API returns has one.
const LANGUAGE_CODES: Record<string, string> = {
  Danish: 'DA',
  English: 'EN',
  French: 'FR',
  German: 'DE',
  Hindi: 'HI',
  Italian: 'IT',
  Korean: 'KO',
  Mandarin: 'ZH',
  Persian: 'FA',
  Spanish: 'ES',
  Ukrainian: 'UA',
};

export function toLanguageCode(language: string): string {
  return LANGUAGE_CODES[language] ?? language.slice(0, 2).toUpperCase();
}
