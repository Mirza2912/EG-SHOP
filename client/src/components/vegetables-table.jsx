import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit, MoreHorizontal, Trash } from "lucide-react"

export default function VegetablesTable() {
  const vegetables = [
    {
      id: 1,
      name: "Fresh Spinach",
      category: "Leafy Greens",
      price: "$1.99",
      stock: 85,
      status: "In Stock",
      origin: "Local Farm",
    },
    {
      id: 2,
      name: "Organic Carrots",
      category: "Root Vegetables",
      price: "$2.49",
      stock: 0,
      status: "Out of Stock",
      origin: "California",
    },
    {
      id: 3,
      name: "Bell Peppers",
      category: "Nightshades",
      price: "$3.49",
      stock: 65,
      status: "In Stock",
      origin: "Mexico",
    },
    {
      id: 4,
      name: "Broccoli",
      category: "Cruciferous",
      price: "$2.29",
      stock: 25,
      status: "In Stock",
      origin: "Local Farm",
    },
    {
      id: 5,
      name: "Cherry Tomatoes",
      category: "Nightshades",
      price: "$3.99",
      stock: 42,
      status: "In Stock",
      origin: "Greenhouse",
    },
    {
      id: 6,
      name: "Zucchini",
      category: "Summer Squash",
      price: "$1.79",
      stock: 18,
      status: "Low Stock",
      origin: "Local Farm",
    },
    {
      id: 7,
      name: "Red Onions",
      category: "Allium",
      price: "$1.29",
      stock: 50,
      status: "In Stock",
      origin: "Regional",
    },
    {
      id: 8,
      name: "Kale",
      category: "Leafy Greens",
      price: "$2.99",
      stock: 5,
      status: "Low Stock",
      origin: "Organic Farm",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-gray-500 border-b">
              <th className="font-medium text-left pb-3 pl-4">
                <Checkbox />
              </th>
              <th className="font-medium text-left pb-3">Product</th>
              <th className="font-medium text-left pb-3">Price</th>
              <th className="font-medium text-left pb-3">Stock</th>
              <th className="font-medium text-left pb-3">Origin</th>
              <th className="font-medium text-left pb-3">Status</th>
              <th className="font-medium text-right pb-3 pr-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vegetables.map((vegetable) => (
              <tr key={vegetable.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="py-3 pl-4">
                  <Checkbox />
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                      <AvatarFallback>{vegetable.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{vegetable.name}</p>
                      <p className="text-xs text-gray-500">{vegetable.category}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3">
                  <span className="text-sm font-medium">{vegetable.price}</span>
                </td>
                <td className="py-3">
                  <span className="text-sm">{vegetable.stock} units</span>
                </td>
                <td className="py-3">
                  <span className="text-sm">{vegetable.origin}</span>
                </td>
                <td className="py-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      vegetable.status === "In Stock"
                        ? "bg-green-100 text-green-800"
                        : vegetable.status === "Low Stock"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {vegetable.status}
                  </span>
                </td>
                <td className="py-3 text-right pr-4">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-orange-500">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Update inventory</DropdownMenuItem>
                        <DropdownMenuItem>Add to featured</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">Showing 8 of 36 vegetables</p>
        <div className="flex gap-1">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" className="bg-orange-50 text-orange-500">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
