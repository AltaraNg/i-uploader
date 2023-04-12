"use client";

import { useState, useRef } from 'react';
import cn from 'classnames';
import { debounce } from "lodash";
import { useRouter } from "next/navigation";

const Typeahead = ({ placeholder }) => {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const debouncedSearch = useRef(
        debounce(async (value) => {
            try {
                const response = await fetch(`/api/customers?term=${value}`);
                const result = await response.json();
                setResults(result.results);
            } catch (error) {
                console.log(error);
            }
        }, 500)
    ).current;

    const handleInputChange = async (event) => {
        const value = event.target.value;
        setQuery(value);
        if (value.length > 0) {
            setLoading(true);
            await debouncedSearch(value);
            setLoading(false);
        } else {
            setResults([]);
        }
    };

    const handleSelection = async (item) => {
        router.push(`/user/${item.id}`);
    }

    return (
        <div className="relative">
            <input
                type="text"
                placeholder={placeholder}
                className="input w-full focus:ring-0 focus:outline-none"
                value={query}
                onChange={handleInputChange}
            />
            {loading && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 pointer-events-none">
                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zm10 0l3 2.647A7.962 7.962 0 0120 12h-4zm-3-7.291V0a8 8 0 018 8h-4a4 4 0 00-4-4z"
                        />
                    </svg>
                </div>
            )}
            {results && results.length > 0 && (
                <ul className="c-dropdown">
                    {results.map((result) => (
                        <li key={result.id} className={cn('px-4 py-2 cursor-pointer hover:bg-gray-100')} onClick={() => handleSelection(result)}>
                            {result.full_name}
                        </li>
                    ))}
                </ul>
            )}
            {results && results.length == 0 && query && !loading && (
                <div className="c-dropdown p-6 text-lg">
                    No records found!
                </div>
            )}
        </div>
    );
};

export default Typeahead;
