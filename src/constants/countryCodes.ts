import { all } from 'country-codes-list';

export interface CountryCode {
  code: string;
  flag: string;
  name: string;
  iso: string;
}

export const COUNTRY_CODES: CountryCode[] = all()
  .filter((c) => c.countryCallingCode)
  .map((c) => ({
    code: `+${c.countryCallingCode}`,
    flag: c.flag,
    name: c.countryNameEn,
    iso: c.countryCode,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));
