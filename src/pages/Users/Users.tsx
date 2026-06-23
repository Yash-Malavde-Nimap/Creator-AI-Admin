import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DataTable from "../../components/DataTable/DataTable";
import Select from "../../components/Select/Select";
import type { SelectOption } from "../../components/Select/Select";
import SearchBar from "../../components/SearchBar/SearchBar";
import Pagination from "../../components/Pagination/Pagination";
import HeaderActions from "../../components/HeaderActions/HeaderActions";
import Toggle from "../../components/Toggle/Toggle";
import { PAGE_SIZE, STATUS_OPTIONS } from "../../constants/filterOptions";
import { calcTotalPages } from "../../utils/tableUtils";
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
  const [users, setUsers] = useState<User[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = {
        search: search || undefined,
        status: statusFilter?.value ?? "all",
        page,
        page_size: PAGE_SIZE,
      };
      const res = await UserService.fetchAll(params);

      setUsers(res.data);
      setTotalCount(res.count);
    } catch {
      // errors handled by axios interceptors
    } finally {
      setLoading(false);
    }
  };

  // Reset to page 1 when search or status filter changes
  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);

  // Fetch from API — all filtering and pagination delegated to the server
  useEffect(() => {
    fetchUsers();
  }, [search, statusFilter, page]);

  //  BIND PUT API HERE
  const toggleActive = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, is_active: !u.is_active } : u,
      ),
    );
  };

  const totalPages = calcTotalPages(totalCount, PAGE_SIZE);

  const columns = [
    {
      name: "NAME",
      selector: (row: any) => row.name,
      width: "20%",
      cell: (row: any) => row.name ?? "-",
    },
    {
      name: "EMAIL",
      selector: (row: any) => row.email,
      width: "25%",
      cell: (row: any) => row.email ?? "-",
    },
    {
      name: "WHATSAPP Number",
      selector: (row: any) => row.whatsapp_number,
      width: "20%",
      cell: (row: any) => row.whatsapp_number ?? "-",
    },
    {
      name: "ROLE",
      selector: (row: any) => row.role,
      width: "10%",
      cell: (row: any) => row.role ?? "-",
    },
    {
      name: "CREDITS",
      selector: (row: any) => row.credits_balance,
      width: "10%",
      cell: (row: any) => row.credits_balance ?? "-",
    },
    {
      name: "ACTIVE",
      center: true,
      width: "12%",
      cell: (row: any) => (
        <Toggle checked={row.is_active} onChange={() => toggleActive(row.id)} />
      ),
    },
  ];

  return (
    <div className={styles.page}>
      <HeaderActions />

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
            data={users}
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
