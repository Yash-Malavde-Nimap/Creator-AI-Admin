import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import DataTable from "../../components/DataTable/DataTable";
import Select from "../../components/Select/Select";
import type { SelectOption } from "../../components/Select/Select";
import SearchBar from "../../components/SearchBar/SearchBar";
import Pagination from "../../components/Pagination/Pagination";
import HeaderActions from "../../components/HeaderActions/HeaderActions";
import DateRangePicker from "../../components/DateRangePicker/DateRangePicker";
import type { DateRange } from "../../components/DateRangePicker/DateRangePicker";
import styles from "./Transaction.module.scss";

export interface Transaction {
  id: number;
  fullName: string;
  planPurchased: string;
  price: number;
  date: string; // "YYYY-MM-DD"
  transactionId: string;
  invoiceId: string;
  paymentStatus: "Success" | "Payment Failed";
  paymentMethod: "Credit Card" | "Debit Card" | "Internet Banking";
}

// ── Mock data ─────────────────────────────────────────────
const NAMES = [
  "John Peter Smith",
  "Jane Johnson",
  "Alice Williams",
  "Bob Brown",
  "Clara Jones",
  "David Miller",
  "Emma Davis",
  "Frank Wilson",
  "Grace Moore",
  "Henry Taylor",
];
const PLANS = ["Basic Plan", "Advanced Plan", "Enterprise Plan"] as const;
const PRICES = [15, 25, 35, 40, 45, 55, 60, 70, 85, 99];
const METHODS = ["Credit Card", "Debit Card", "Internet Banking"] as const;
const STATUSES: Transaction["paymentStatus"][] = [
  "Success",
  "Success",
  "Success",
  "Payment Failed",
];

function makeTransactions(): Transaction[] {
  return Array.from({ length: 90 }, (_, i) => {
    const d = new Date(2026, 3 + Math.floor(i / 30), 1 + (i % 28));
    return {
      id: i + 1,
      fullName: NAMES[i % NAMES.length],
      planPurchased: PLANS[i % PLANS.length],
      price: PRICES[i % PRICES.length],
      date: d.toISOString().split("T")[0],
      transactionId: `TRXNID${String(949849459968 + i * 13).slice(0, 18)}`,
      invoiceId: `INID${String(8493432948 + i * 7).slice(0, 10)}`,
      paymentStatus: STATUSES[i % STATUSES.length],
      paymentMethod: METHODS[i % METHODS.length],
    };
  });
}

const ALL_TRANSACTIONS = makeTransactions();
const PAGE_SIZE = 10;

type SortDir = "none" | "asc" | "desc";

const PAYMENT_STATUS_OPTIONS: SelectOption[] = [
  { value: "all", label: "All Status" },
  { value: "Success", label: "Success" },
  { value: "Payment Failed", label: "Payment Failed" },
];

const PLAN_TYPE_OPTIONS: SelectOption[] = [
  { value: "all", label: "All Plans" },
  { value: "Basic Plan", label: "Basic Plan" },
  { value: "Advanced Plan", label: "Advanced Plan" },
  { value: "Enterprise Plan", label: "Enterprise Plan" },
];

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${parseInt(d)} ${months[parseInt(m) - 1]} ${y}`;
}

export default function Transaction() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";

  const [statusFilter, setStatusFilter] = useState<SelectOption | null>(
    PAYMENT_STATUS_OPTIONS[0],
  );
  const [planFilter, setPlanFilter] = useState<SelectOption | null>(
    PLAN_TYPE_OPTIONS[0],
  );
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: "",
    endDate: "",
  });
  const [page, setPage] = useState(1);
  const [sortDir, setSortDir] = useState<SortDir>("none");

  const handleSort = useCallback(() => {
    setSortDir((prev) =>
      prev === "none" ? "asc" : prev === "asc" ? "desc" : "none",
    );
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    const sv = statusFilter?.value ?? "all";
    const pv = planFilter?.value ?? "all";

    const result = ALL_TRANSACTIONS.filter((t) => {
      const matchSearch =
        !q ||
        t.fullName.toLowerCase().includes(q) ||
        t.transactionId.toLowerCase().includes(q);
      const matchStatus = sv === "all" || t.paymentStatus === sv;
      const matchPlan = pv === "all" || t.planPurchased === pv;
      const matchStart = !dateRange.startDate || t.date >= dateRange.startDate;
      const matchEnd = !dateRange.endDate || t.date <= dateRange.endDate;
      return matchSearch && matchStatus && matchPlan && matchStart && matchEnd;
    });

    if (sortDir === "asc")
      return [...result].sort((a, b) => a.fullName.localeCompare(b.fullName));
    if (sortDir === "desc")
      return [...result].sort((a, b) => b.fullName.localeCompare(a.fullName));
    return result;
  }, [search, statusFilter, planFilter, dateRange, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter, planFilter, dateRange, sortDir]);

  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const columns = [
    {
      name: "FULL NAME",
      selector: (row: any) => row.fullName,
      minWidth: "170px",
    },
    {
      name: "PLAN PURCHASED",
      selector: (row: any) => row.planPurchased,
      minWidth: "160px",
    },
    {
      name: "PRICE",
      selector: (row: any) => row.price,
      minWidth: "90px",
      cell: (row: any) => `$${row.price}`,
    },
    {
      name: "DATE",
      selector: (row: any) => row.date,
      minWidth: "130px",
      cell: (row: any) => formatDate(row.date),
    },
    {
      name: "TRANSACTION ID",
      selector: (row: any) => row.transactionId,
      minWidth: "195px",
    },
    {
      name: "INVOICE ID",
      selector: (row: any) => row.invoiceId,
      minWidth: "145px",
    },
    {
      name: "PAYMENT STATUS",
      selector: (row: any) => row.paymentStatus,
      minWidth: "160px",
      cell: (row: any) => (
        <span
          className={
            row.paymentStatus === "Success"
              ? styles.statusSuccess
              : styles.statusFailed
          }
        >
          {row.paymentStatus}
        </span>
      ),
    },
    {
      name: "PAYMENT METHOD",
      selector: (row: any) => row.paymentMethod,
      minWidth: "165px",
    },
  ];

  return (
    <div className={styles.page}>
      <HeaderActions onSort={handleSort} />

      <div className={styles.card}>
        {/* ── Toolbar ─────────────────────────── */}
        <div className={styles.toolbar}>
          <div className={styles.filters}>
            {/* Date Range */}
            <DateRangePicker value={dateRange} onChange={setDateRange} />

            {/* Selects */}
            <Select
              label="PAYMENT STATUS"
              options={PAYMENT_STATUS_OPTIONS}
              value={statusFilter}
              onChange={setStatusFilter}
            />
            <Select
              label="PLAN TYPE"
              options={PLAN_TYPE_OPTIONS}
              value={planFilter}
              onChange={setPlanFilter}
            />
          </div>

          {/* Search */}
          <div className={styles.searchWrap}>
            <SearchBar placeholder="search" />
          </div>
        </div>

        {/* ── Table ───────────────────────────── */}
        <div className={styles.tableArea}>
          <DataTable<Transaction>
            columns={columns}
            data={pageData}
            keyField="id"
            highlightOnHover
            noDataMessage="No transactions match your filters."
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
