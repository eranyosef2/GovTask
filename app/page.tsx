import axios from "axios";
import CarsTable from "@/components/CarsTable";

type Car = {
  _id: string;
  tozeret_nm: string;
  mispar_rechev: string;
};

export const dynamic = "force-dynamic"; 

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const API_URL = "https://data.gov.il/api/3/action/datastore_search";
  const DATASET_ID = "053cea08-09bc-40ec-8f7a-156f0677aff3";

  const page = parseInt(searchParams?.page || "1", 10);
  const filterField = searchParams?.filterField || "mispar_rechev";
  const searchQuery = searchParams?.searchQuery || "";

  const rowsPerPage = 10;
  const offset = (page - 1) * rowsPerPage;

  let cars: Car[] = [];
  let totalRecords = 0;

  try {
    const payload = {
      resource_id: DATASET_ID,
      limit: rowsPerPage,
      offset,
      filters: searchQuery ? { [filterField]: searchQuery } : {},
    };

    console.log("API Request Payload:", payload);

    const response = await axios.post(API_URL, payload);

    const result = response.data.result;
    cars = result.records.map((record: any) => ({
      _id: record._id,
      tozeret_nm: record.tozeret_nm,
      mispar_rechev: record.mispar_rechev,
    }));
    totalRecords = result.total || 0;

    console.log("API Response:", { records: cars, totalRecords });
  } catch (error) {
    console.error("Error fetching car data:", error);
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Cars Table
        </h1>
        <CarsTable
          cars={cars}
          currentPage={page}
          totalRecords={totalRecords}
          rowsPerPage={rowsPerPage}
          searchQuery={searchQuery}
          filterField={filterField}
        />
      </div>
    </div>
  );
}
