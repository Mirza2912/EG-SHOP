import ProductsTable from "../../components/products-table";


export default function ProductsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products Management</h1>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md flex items-center text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add New Product
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center space-x-2 mb-6">
          <div className="relative flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              className="pl-8 bg-white w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm">Filter</button>
        </div>

        <ProductsTable />
      </div>
    </div>
  )
}
