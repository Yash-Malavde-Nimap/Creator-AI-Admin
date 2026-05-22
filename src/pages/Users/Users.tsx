import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import DataTable from "../../components/DataTable/DataTable";
import Select from "../../components/Select/Select";
import type { SelectOption } from "../../components/Select/Select";
import SearchBar from "../../components/SearchBar/SearchBar";
import Pagination from "../../components/Pagination/Pagination";
import HeaderActions from "../../components/HeaderActions/HeaderActions";
import styles from "./Users.module.scss";
import Toggle from "../../components/Toggle/Toggle";

export interface User {
  id: number;
  fullName: string;
  email: string;
  mobile: string;
  currentPlan: string;
  imagesLeft: number;
  videosLeft: number;
  active: boolean;
}

// ── Mock data ─────────────────────────────────────────────
const FIRST = [
  "John",
  "Jane",
  "Alice",
  "Bob",
  "Clara",
  "David",
  "Emma",
  "Frank",
  "Grace",
  "Henry",
];
const LAST = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Miller",
  "Davis",
  "Wilson",
  "Moore",
  "Taylor",
];
const PLANS = ["Basic Plan", "Advanced Plan", "Enterprise Plan"];
const IMG_COUNTS = [250, 600, 1500];

function makeUsers(): User[] {
  const list: User[] = [];
  let id = 1;
  for (const first of FIRST) {
    for (const last of LAST) {
      const n = id - 1;
      list.push({
        id,
        fullName: `${first} ${last}`,
        email: `${first.toLowerCase()}.${last.toLowerCase()}@example.com`,
        mobile: `+1 ${900 + (n % 99)} ${100 + ((n * 7) % 900)} ${100 + ((n * 13) % 900)}`,
        currentPlan: PLANS[n % PLANS.length],
        imagesLeft: IMG_COUNTS[n % IMG_COUNTS.length],
        videosLeft: IMG_COUNTS[(n + 1) % IMG_COUNTS.length],
        active: n % 5 !== 3,
      });
      id++;
    }
  }
  return list;
}

const ALL_USERS = makeUsers();
const PAGE_SIZE = 10;

type SortDir = "none" | "asc" | "desc";

// ── Filter options ────────────────────────────────────────
const STATUS_OPTIONS: SelectOption[] = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const PLAN_OPTIONS: SelectOption[] = [
  { value: "all", label: "All Plans" },
  { value: "Basic Plan", label: "Basic Plan" },
  { value: "Advanced Plan", label: "Advanced Plan" },
  { value: "Enterprise Plan", label: "Enterprise Plan" },
];

export default function Users() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const [statusFilter, setStatusFilter] = useState<SelectOption | null>(
    STATUS_OPTIONS[0],
  );
  const [planFilter, setPlanFilter] = useState<SelectOption | null>(
    PLAN_OPTIONS[0],
  );
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<User[]>(ALL_USERS);
  const [sortDir, setSortDir] = useState<SortDir>("none");

  // Cycle: none → asc → desc → none
  const handleSort = useCallback(() => {
    setSortDir((prev) =>
      prev === "none" ? "asc" : prev === "asc" ? "desc" : "none",
    );
  }, []);

  // Filtered + sorted dataset
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    const sv = statusFilter?.value ?? "all";
    const pv = planFilter?.value ?? "all";

    const result = users.filter((u) => {
      const matchSearch =
        !q ||
        u.fullName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q);
      const matchStatus =
        sv === "all" || (sv === "active" ? u.active : !u.active);
      const matchPlan = pv === "all" || u.currentPlan === pv;
      return matchSearch && matchStatus && matchPlan;
    });

    if (sortDir === "asc")
      return [...result].sort((a, b) => a.fullName.localeCompare(b.fullName));
    if (sortDir === "desc")
      return [...result].sort((a, b) => b.fullName.localeCompare(a.fullName));
    return result;
  }, [users, search, statusFilter, planFilter, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter, planFilter, sortDir]);

  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleActive = useCallback((userId: number) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, active: !u.active } : u)),
    );
  }, []);

  const columns = [
    {
      name: "FULL NAME",
      selector: (row: any) => row.fullName,
      minWidth: "10%",
    },
    {
      name: "EMAIL ID",
      selector: (row: any) => row.email,
      minWidth: "220px",
    },
    {
      name: "MOBILE",
      selector: (row: any) => row.mobile,
      minWidth: "160px",
    },
    {
      name: "CURRENT PLAN",
      selector: (row: any) => row.currentPlan,
      minWidth: "160px",
    },
    {
      name: "IMAGES LEFT",
      selector: (row: any) => row.imagesLeft,
      minWidth: "130px",
    },
    {
      name: "VIDEOS LEFT",
      selector: (row: any) => row.videosLeft,
      minWidth: "130px",
    },
    {
      name: "ACTIVE/INACTIVE",
      center: true,
      minWidth: "150px",
      cell: (row: any) => (
        <Toggle checked={row.active} onChange={() => toggleActive(row.id)} />
      ),
    },
  ];

  return (
    <div className={styles.page}>
      {/* Registers handler — Header renders the Sort button automatically */}
      <HeaderActions onSort={handleSort} />

      <div className={styles.card}>
        {/* ── Toolbar ─────────────────────────── */}
        <div className={styles.toolbar}>
          <div className={styles.filters}>
            <Select
              label="STATUS"
              options={STATUS_OPTIONS}
              value={statusFilter}
              onChange={setStatusFilter}
            />
            <Select
              label="PLAN TYPE"
              options={PLAN_OPTIONS}
              value={planFilter}
              onChange={setPlanFilter}
            />
          </div>
          <SearchBar placeholder="search" paramKey="search" />
        </div>

        {/* ── Table ───────────────────────────── */}
        <div className={styles.tableArea}>
          <DataTable<User>
            columns={columns}
            data={pageData}
            keyField="id"
            highlightOnHover
            noDataMessage="No users match your filters."
          />
        </div>

        {/* ── Pagination ──────────────────────── */}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
