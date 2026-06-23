import { useState, useEffect } from 'react';
import { COUNTRY_CODES, type CountryCode } from '../constants/countryCodes';

export interface CountryOption {
  value: string;
  label: string;
  data: CountryCode;
}

export const countryOptions: CountryOption[] = COUNTRY_CODES.map((c) => ({
  value: c.iso,
  label: `${c.flag} ${c.code}`,
  data: c,
}));

export function useDefaultCountryCode(fallbackIso = 'US'): [CountryOption, (o: CountryOption) => void] {
  const [selected, setSelected] = useState<CountryOption>(
    () => countryOptions.find((o) => o.data.iso === fallbackIso) ?? countryOptions[0],
  );

  useEffect(() => {
    const detect = async () => {
      try {
        const r = await fetch('https://ipapi.co/country_code/');
        const iso = (await r.text()).trim();
        const match = countryOptions.find((o) => o.data.iso === iso);
        if (match) setSelected(match);
      } catch {
        // silently ignore — fallback already set
      }
    };
    detect();
  }, []);

  return [selected, setSelected];
}
