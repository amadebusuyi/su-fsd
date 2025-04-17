import { useState } from 'react';
import useSWR from 'swr';
import { IFileData } from './interfaces/Interfaces';

type ISortOptions = {
  id: number;
  name: string;
  value: string;
};

const sortOptions: ISortOptions[] = [
  { id: 1, name: 'Created At (Asc)', value: 'created' },
  { id: 2, name: 'Filename (A-Z)', value: 'filename_asc' },
  { id: 3, name: 'Filename (Z-A)', value: 'filename_desc' },
];

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function FileProcessor() {
  const [selectedSort, setSelectedSort] = useState<ISortOptions>(sortOptions[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { data: files = [], error, isLoading, mutate } = useSWR(
    `/api/data?sort=${selectedSort.value}`,
    fetcher
  );

  const handleSortChange = (option: ISortOptions) => {
    setSelectedSort(option);
    setDropdownOpen(false);
    mutate();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
      <div className="max-w-7xl mx-auto">
        <div className="relative flex justify-center text-left mb-8">
          <div>
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="inline-flex w-72 justify-between gap-x-1.5 rounded-md bg-gray-700 px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-600 hover:bg-gray-600"
            >
              Sort by {selectedSort.name}
              <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.354a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {dropdownOpen && (
            <div className="absolute z-10 mt-2 w-72 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {sortOptions.map((option) => (
                  <button
                    key={option.id.toString()}
                    onClick={() => handleSortChange(option)}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    {option.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* File Grid */}
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error loading files.</div>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {files?.data?.length > 0 ? files.data.map((file: IFileData, index: number) => (
              <li key={String(index)} className="col-span-1 rounded-lg bg-gray-800 shadow p-4">
                <div className="text-sm text-gray-400">{file.createdAt}</div>
                <div className="mt-1 text-lg font-medium text-white">{file.filename}</div>
              </li>
            )) : 'No matching files'}
          </ul>
        )}
      </div>
    </div>
  );
}
