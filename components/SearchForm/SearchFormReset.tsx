'use client';

import Link from 'next/link';

import { X } from 'lucide-react';

const SearchFormReset = () => {
  const reset = () => {
    const form: HTMLFormElement | null = document.querySelector('.search-form');

    if (form) {
      form.reset();
    }
  };

  return (
    <button type="reset" onClick={reset}>
      <Link href="/" className="search-btn text-white">
        <X />
      </Link>
    </button>
  );
};

export default SearchFormReset;
