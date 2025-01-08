"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Car = {
  _id: string;
  tozeret_nm: string;
  mispar_rechev: string;
};

export default function CarsTable({
  cars,
  currentPage,
  totalRecords,
  rowsPerPage,
  searchQuery: initialSearchQuery,
  filterField: initialFilterField,
}: {
  cars: Car[];
  currentPage: number;
  totalRecords: number;
  rowsPerPage: number;
  searchQuery: string;
  filterField: string;
}) {
  const router = useRouter();
  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [filterField, setFilterField] = useState(initialFilterField);
  const [loading, setLoading] = useState(false); 
  const handleSearch = () => {
    setLoading(true); 
    router.push(`?searchQuery=${searchQuery}&filterField=${filterField}&page=1`);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setLoading(true); 
    router.push(`?filterField=${filterField}&page=1`);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterField(event.target.value);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setLoading(true); 
      router.push(
        `?searchQuery=${searchQuery}&filterField=${filterField}&page=${
          currentPage - 1
        }`
      );
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setLoading(true); 
      router.push(
        `?searchQuery=${searchQuery}&filterField=${filterField}&page=${
          currentPage + 1
        }`
      );
    }
  };

  const handleRowClick = (id: string) => {
    router.push(`/car/${id}`);
  };

  useEffect(() => {
    setLoading(false);
  }, [cars]);

  return (
    <div>
      <div className="mb-6 flex gap-4 items-center">
        <select
          value={filterField}
          onChange={handleFilterChange}
          className="px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="mispar_rechev">License Plate</option>
          <option value="_id">ID</option>
          <option value="tozeret_nm">Manufacturer</option>
        </select>
        <input
          type="text"
          placeholder={`Search by ${filterField.replace("_", " ")}`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-blue-600"
        >
          Search
        </button>
        <button
          onClick={clearFilters}
          className="px-4 py-2 bg-red-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 hover:bg-red-600"
        >
          Clear Filter
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center my-10">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <span className="ml-4 text-lg text-blue-500">Loading...</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-black">ID</th>
                <th className="px-6 py-4 text-black">Manufacturer (Tozeret)</th>
                <th className="px-6 py-4 text-black">License Plate (Mispar Rechev)</th>
              </tr>
            </thead>
            <tbody>
              {cars.length > 0 ? (
                cars.map((car, index) => (
                  <tr
                    key={car._id}
                    onClick={() => handleRowClick(car._id)}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition-colors duration-200 cursor-pointer`}
                  >
                    <td className="px-6 py-4 border-t text-black">{car._id}</td>
                    <td className="px-6 py-4 border-t font-bold text-black">
                      {car.tozeret_nm || "N/A"}
                    </td>
                    <td className="px-6 py-4 border-t text-black">
                      {car.mispar_rechev || "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-4 text-center text-black border-t"
                  >
                    No data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex items-center justify-between mt-4">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <span className="text-black">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
