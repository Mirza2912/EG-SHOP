import AdminSidebar from "../components/admin-sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
