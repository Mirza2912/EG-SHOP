import { Card } from "@/components/ui/card"

export default function ProduceCategories() {
  const categories = [
    { name: "Fruits", count: 48, color: "bg-red-100" },
    { name: "Vegetables", count: 36, color: "bg-green-100" },
    { name: "Organic", count: 24, color: "bg-amber-100" },
    { name: "Seasonal", count: 12, color: "bg-blue-100" },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {categories.map((category) => (
        <Card key={category.name} className={`p-4 ${category.color}`}>
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">{category.name}</h3>
            <p className="text-2xl font-bold mt-2">{category.count}</p>
            <p className="text-sm text-gray-600 mt-1">products</p>
          </div>
        </Card>
      ))}
    </div>
  )
}
