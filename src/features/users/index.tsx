"use client";

import SearchBar from "@/components/ui/searchBar";
import Sort from "@/components/ui/sortDropdown";
import Table from "@/components/ui/table";
import { useUser } from "@/hooks/queries/users";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function UsersTable() {
  const { data, isLoading } = useUser();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"asc" | "desc" | "none">("none");
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const router = useRouter();

  const handleRowClick = (user: any) => {
    router.push(`/users/${user.id}`);
  };

  const columns = ["Name", "Email", "Website"];

  const filteredSorted = useMemo(() => {
    if (!data) return [];
    const filtered = data.filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.website.toLowerCase().includes(search.toLowerCase())
    );
    if (sort === "none") return filtered;
    return [...filtered].sort((a, b) => {
      if (sort === "asc") return a.name.localeCompare(b.name);
      return b.name.localeCompare(a.name);
    });
  }, [data, search, sort]);

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredSorted.slice(start, start + pageSize);
  }, [filteredSorted, page]);

  const totalPages = Math.ceil(filteredSorted.length / pageSize);

  const tableData = paginated.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    website: (
      <a
        href={u.website.startsWith("http") ? u.website : `https://${u.website}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        {u.website}
      </a>
    ),
  }));

  return (
    <section className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-semibold text-blue-500">User List</h1>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <SearchBar
            value={search}
            onChange={(v) => {
              setSearch(v);
              setPage(1);
            }}
            placeholder="Search users..."
            className="w-full sm:w-64"
          />
          <Sort
            onChange={(s) => {
              setSort(s);
              setPage(1);
            }}
          />
        </div>
      </div>

      <Table
        columns={columns}
        data={tableData}
        isLoading={isLoading}
        onRowClick={handleRowClick}
      />

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 text-xs rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}
