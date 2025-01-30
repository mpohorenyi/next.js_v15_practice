import Form from 'next/form';
import SearchFormReset from './SearchFormReset';

import { Search } from 'lucide-react';

interface SearchFormProps {
  query?: string;
}

const SearchForm = ({ query }: SearchFormProps) => {
  return (
    <Form action="/" scroll={false} className="search-form">
      <input
        name="query"
        defaultValue={query}
        className="search-input"
        placeholder="Search Ideas"
      />

      <div className="flex gap-2">
        {query && <SearchFormReset />}

        <button type="submit" className="search-btn text-white">
          <Search className="size-5" />
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;
