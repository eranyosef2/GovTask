import axios from "axios";

type Car = {
  _id: string;
  tozeret_nm: string;
  mispar_rechev: string;
  sug_degem: string;
  degem_cd: string;
  degem_nm: string;
  ramat_gimur: string;
  ramat_eivzur_betihuty: string;
  kvutzat_zihum: string;
  shnat_yitzur: string;
  degem_manoa: string;
  mivchan_acharon_dt: string;
  tokef_dt: string;
  baalut: string;
  misgeret: string;
  tzeva_cd: string;
  tzeva_rechev: string;
  zmig_kidmi: string;
  zmig_ahori: string;
  image_url?: string;
};

export default async function CarDetails({ params }: { params: { id: string } }) {
  const CAR_API_URL = "https://data.gov.il/api/3/action/datastore_search";
  const CAR_DATASET_ID = "053cea08-09bc-40ec-8f7a-156f0677aff3";

  const TAV_NEHE_API_URL = "https://data.gov.il/api/3/action/datastore_search";
  const TAV_NEHE_DATASET_ID = "c8b9f9c8-4612-4068-934f-d4acd2e3c06e";

  let car: Car | null = null;
  let hasTavNehe = false;

  try {
    
    const carResponse = await axios.post(CAR_API_URL, {
      resource_id: CAR_DATASET_ID,
      filters: { _id: params.id },
    });

    const carRecords = carResponse.data.result.records;
    car = carRecords.length > 0 ? carRecords[0] : null;

    
    if (car) {
      const tavNeheResponse = await axios.post(TAV_NEHE_API_URL, {
        resource_id: TAV_NEHE_DATASET_ID,
        filters: { "MISPAR RECHEV": car.mispar_rechev },
      });

      const tavNeheRecords = tavNeheResponse.data.result.records;
      hasTavNehe = tavNeheRecords.length > 0;
    }
  } catch (error) {
    console.error("Error fetching car or Tav Nehe details:", error);
  }

  if (!car) {
    return <p className="text-center text-red-500">Car details not found.</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Car Details{hasTavNehe && " - Has Tav Nehe"}
        </h1>
        {car.image_url && (
          <div className="mb-6 flex justify-center">
            <img
              src={car.image_url}
              alt={`Image of ${car.tozeret_nm}`}
              className="max-w-xs rounded-lg shadow-md"
            />
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-black">Property</th>
                <th className="px-6 py-4 text-black">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-6 py-4 border-t text-black font-bold">ID</td>
                <td className="px-6 py-4 border-t text-black">{car._id}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 border-t text-black font-bold">Manufacturer</td>
                <td className="px-6 py-4 border-t text-black">{car.tozeret_nm || "N/A"}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 border-t text-black font-bold">License Plate</td>
                <td className="px-6 py-4 border-t text-black">{car.mispar_rechev || "N/A"}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 border-t text-black font-bold">Model Type</td>
                <td className="px-6 py-4 border-t text-black">{car.sug_degem || "N/A"}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 border-t text-black font-bold">Model Code</td>
                <td className="px-6 py-4 border-t text-black">{car.degem_cd || "N/A"}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 border-t text-black font-bold">Model Name</td>
                <td className="px-6 py-4 border-t text-black">{car.degem_nm || "N/A"}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 border-t text-black font-bold">Trim Level</td>
                <td className="px-6 py-4 border-t text-black">{car.ramat_gimur || "N/A"}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 border-t text-black font-bold">Safety Level</td>
                <td className="px-6 py-4 border-t text-black">
                  {car.ramat_eivzur_betihuty || "N/A"}
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 border-t text-black font-bold">Pollution Group</td>
                <td className="px-6 py-4 border-t text-black">{car.kvutzat_zihum || "N/A"}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 border-t text-black font-bold">Year of Manufacture</td>
                <td className="px-6 py-4 border-t text-black">{car.shnat_yitzur || "N/A"}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 border-t text-black font-bold">Engine Model</td>
                <td className="px-6 py-4 border-t text-black">{car.degem_manoa || "N/A"}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 border-t text-black font-bold">Last Inspection</td>
                <td className="px-6 py-4 border-t text-black">{car.mivchan_acharon_dt || "N/A"}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 border-t text-black font-bold">License Valid Until</td>
                <td className="px-6 py-4 border-t text-black">{car.tokef_dt || "N/A"}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 border-t text-black font-bold">Ownership</td>
                <td className="px-6 py-4 border-t text-black">{car.baalut || "N/A"}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 border-t text-black font-bold">Frame Type</td>
                <td className="px-6 py-4 border-t text-black">{car.misgeret || "N/A"}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 border-t text-black font-bold">Color Code</td>
                <td className="px-6 py-4 border-t text-black">{car.tzeva_cd || "N/A"}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 border-t text-black font-bold">Vehicle Color</td>
                <td className="px-6 py-4 border-t text-black">{car.tzeva_rechev || "N/A"}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 border-t text-black font-bold">Front Tire Size</td>
                <td className="px-6 py-4 border-t text-black">{car.zmig_kidmi || "N/A"}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 border-t text-black font-bold">Rear Tire Size</td>
                <td className="px-6 py-4 border-t text-black">{car.zmig_ahori || "N/A"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
