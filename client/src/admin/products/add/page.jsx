import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AddProductPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/products">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Add New Product</h1>
      </div>

      <Card className="p-6">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" placeholder="e.g. Organic Apples" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fruits">Fruits</SelectItem>
                  <SelectItem value="vegetables">Vegetables</SelectItem>
                  <SelectItem value="organic">Organic</SelectItem>
                  <SelectItem value="seasonal">Seasonal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input id="price" type="number" step="0.01" placeholder="0.00" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock Quantity</Label>
              <Input id="stock" type="number" placeholder="0" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="origin">Origin</Label>
              <Input id="origin" placeholder="e.g. Local Farm, California, Imported" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="freshness">Freshness (Days)</Label>
              <Input id="freshness" type="number" placeholder="7" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the product, including details about taste, texture, and usage suggestions."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nutrition">Nutrition Information</Label>
            <Textarea id="nutrition" placeholder="Enter nutrition facts and health benefits." rows={3} />
          </div>

          <div className="space-y-2">
            <Label>Product Images</Label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
              <div className="mx-auto flex flex-col items-center">
                <svg
                  className="h-12 w-12 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="mt-2 text-sm text-gray-500">Drag and drop images here, or click to browse</p>
                <Input id="images" type="file" multiple className="hidden" />
                <Button variant="outline" size="sm" className="mt-4">
                  Upload Images
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline">Cancel</Button>
            <Button className="bg-orange-500 hover:bg-orange-600">Save Product</Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
