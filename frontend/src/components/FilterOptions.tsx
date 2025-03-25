import React, { useState, useEffect } from "react";
import { getYears } from "../services/api";



export function SortByDropdown({ selectedSort, setSelectedSort }: { selectedSort: string; setSelectedSort: (value: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const sortByOptions = [
    { value: 'popularity.desc', label: 'Popularity desc' },
    { value: 'popularity.asc', label: 'Popularity asc' },
    { value: 'vote_average.desc', label: 'Vote average desc' },
    { value: 'vote_average.asc', label: 'Vote average asc' },
    { value: 'release_date.desc', label: 'Release date desc' },
    { value: 'release_date.asc', label: 'Release date asc' },
  ];

  return (
    <div className='relative inline-block ml-20 hover:bg-[#C32126]'
    onMouseEnter={() => setIsOpen(true)}
    onMouseLeave={() => setIsOpen(false)}
    >
      <div className="bg-black text-white px-4 py-2 rounded cursor-pointer hover:bg-[#C32126]"
      onClick={() => setSelectedSort('')}
      >
        {sortByOptions.find((option) => option.value === selectedSort)?.label || 'Sort by'}
      </div>

      {isOpen && (
        <ul className="absolute left-0 bg-white shadow-lg rounded w-48 border border-gray-300 z-50">
          {sortByOptions.map((option) => (
            <li key={option.value} onClick={() => setSelectedSort(option.value)} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
};

export function VoteAverageDropdown({ selectedVoteAverage, setSelectedVoteAverage }: { selectedVoteAverage: number | undefined; setSelectedVoteAverage: (value: number | undefined) => void }) {
  const [isOpen, setIsOpen] = useState(false);

    const votesOptions = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    { value: 6, label: '6' },
    { value: 7, label: '7' },
    { value: 8, label: '8' },
    { value: 9, label: '9' },
    { value: 10, label: '10' },
  ];
  return (
    <div className='relative inline-block hover:bg-[#C32126]'
    onMouseEnter={() => setIsOpen(true)}
    onMouseLeave={() => setIsOpen(false)}
    >
      <div className="bg-black text-white px-4 py-2 rounded cursor-pointer hover:bg-[#C32126]"
      onClick={() => setSelectedVoteAverage(undefined)}
      >
        {votesOptions.find((vote) => vote.value === selectedVoteAverage)?.label || 'Vote'}
      </div>

      {isOpen && (
        <ul className="absolute left-0 bg-white shadow-lg rounded w-48 border border-gray-300 z-50">
          {votesOptions.map((vote) => (
            <li key={vote.value} onClick={() => setSelectedVoteAverage(vote.value)} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
              {vote.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
};

  export function YearsDropdown({ selectedYear, setSelectedYear }: { selectedYear: number | undefined; setSelectedYear: (value: number | undefined) => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const [years, setYears] = useState<number[]>([]);

    useEffect(() => {
      const fetchYears = async () => {
        const years = await getYears();
        setYears(years);
      };
      fetchYears();
    }, []);
    return (
      <div className='relative inline-block mr-10'
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      >
        <div className="bg-black text-white px-4 py-2 rounded cursor-pointer hover:bg-[#C32126]"
        onClick={() => setSelectedYear(undefined)}>
          {selectedYear || 'Years'}
        </div>

        {isOpen && (
          <ul className="absolute left-0 bg-white shadow-lg rounded w-48 border border-gray-300 overflow-y-auto max-h-48 z-50">
            {years.map((year) => (
              <li key={year} onClick={() => setSelectedYear(year)} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                {year}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };


