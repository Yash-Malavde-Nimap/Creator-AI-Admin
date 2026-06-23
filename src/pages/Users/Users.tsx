import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import DataTable from "../../components/DataTable/DataTable";
import Select from "../../components/Select/Select";
import type { SelectOption } from "../../components/Select/Select";
import SearchBar from "../../components/SearchBar/SearchBar";
import Pagination from "../../components/Pagination/Pagination";
import HeaderActions from "../../components/HeaderActions/HeaderActions";
import Toggle from "../../components/Toggle/Toggle";
import {
  PAGE_SIZE,
  STATUS_OPTIONS,
} from "../../constants/filterOptions";
import {
  type SortDir,
  cycleSortDir,
  calcTotalPages,
  getPageSlice,
  matchStatusFilter,
} from "../../utils/tableUtils";
import UserService from "../../services/api/user";
import type { User } from "../../types/user";
import styles from "./Users.module.scss";

export default function Users() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";

  const [statusFilter, setStatusFilter] = useState<SelectOption | null>(
    STATUS_OPTIONS[0],
  );
  const [page, setPage] = useState(1);
  const [sortDir, setSortDir] = useState<SortDir>("none");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await UserService.fetchAll({ search: search || undefined });
      setUsers(res.data);
    } catch {
      // errors handled by axios interceptors
    } finally {
      setLoading(false);
    }
  }, [search]);

  const handleSort = useCallback(() => {
    setSortDir((prev) => cycleSortDir(prev));
  }, []);

  const toggleActive = useCallback((userId: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, is_active: !u.is_active } : u)),
    );
  }, []);

  const filtered = useMemo(() => {
    const sv = statusFilter?.value ?? "all";

    const result = users.filter((u) => matchStatusFilter(u.is_active, sv));

    if (sortDir === "asc")
      return [...result].sort((a, b) => a.name.localeCompare(b.name));
    if (sortDir === "desc")
      return [...result].sort((a, b) => b.name.localeCompare(a.name));
    return result;
  }, [users, statusFilter, sortDir]);

  const totalPages = calcTotalPages(filtered.length, PAGE_SIZE);
  const pageData = getPageSlice(filtered, page, PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter, sortDir]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const columns = [
    {
      name: "NAME",
      selector: (row: any) => row.name,
      minWidth: "170px",
      cell: (row: any) => row.name ?? "-",
    },
    {
      name: "EMAIL",
      selector: (row: any) => row.email,
      minWidth: "220px",
      cell: (row: any) => row.email ?? "-",
    },
    {
      name: "WHATSAPP",
      selector: (row: any) => row.whatsapp_number,
      minWidth: "160px",
      cell: (row: any) => row.whatsapp_number ?? "-",
    },
    {
      name: "ROLE",
      selector: (row: any) => row.role,
      minWidth: "110px",
      cell: (row: any) => row.role ?? "-",
    },
    {
      name: "CREDITS",
      selector: (row: any) => row.credits_balance,
      minWidth: "110px",
      cell: (row: any) => row.credits_balance ?? "-",
    },
    {
      name: "EMAIL VERIFIED",
      center: true,
      minWidth: "150px",
      cell: (row: any) => (
        <span
          className={
            row.is_email_verified ? styles.badgeVerified : styles.badgePending
          }
        >
          {row.is_email_verified ? "Verified" : "Pending"}
        </span>
      ),
    },
    {
      name: "ACTIVE",
      center: true,
      minWidth: "110px",
      cell: (row: any) => (
        <Toggle
          checked={row.is_active}
          onChange={() => toggleActive(row.id)}
        />
      ),
    },
  ];

  return (
    <div className={styles.page}>
      <HeaderActions onSort={handleSort} />

      <div className={styles.card}>
        <div className={styles.toolbar}>
          <div className={styles.filters}>
            <Select
              label="STATUS"
              options={STATUS_OPTIONS}
              value={statusFilter}
              onChange={setStatusFilter}
            />
          </div>
          <SearchBar placeholder="search" paramKey="search" />
        </div>

        <div className={styles.tableArea}>
          <DataTable<User>
            columns={columns}
            data={pageData}
            keyField="id"
            highlightOnHover
            noDataMessage={
              loading ? "Loading..." : "No users match your filters."
            }
          />
        </div>

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
