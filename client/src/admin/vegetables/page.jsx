import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import VegetablesTable from "@/components/vegetables-table"
import Link from "next/link"

export default function VegetablesPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Vegetables Management</h1>
        <Link href="/admin/products/add">
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Plus className="mr-2 h-4 w-4" /> Add New Vegetable
          </Button>
        </Link>
      </div>

      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search vegetables..." className="pl-8 bg-white" />
          </div>
          <Button variant="outline">Filter</Button>
        </div>

        <VegetablesTable />
      </Card>
    </div>
  )
}
