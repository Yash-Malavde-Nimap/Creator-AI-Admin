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
import { PAGE_SIZE } from "../../constants/filterOptions";
import {
  type SortDir,
  cycleSortDir,
  calcTotalPages,
  getPageSlice,
} from "../../utils/tableUtils";
import { formatDate } from "../../utils/formatUtils";
import TransactionService from "../../services/api/transaction";
import type { TransactionRecord } from "../../types/transaction";

const PAYMENT_STATUS_OPTIONS: SelectOption[] = [
  { value: "all", label: "All Status" },
  { value: "Success", label: "Success" },
  { value: "Payment Failed", label: "Payment Failed" },
];

export default function Transaction() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";

  const [statusFilter, setStatusFilter] = useState<SelectOption | null>(
    PAYMENT_STATUS_OPTIONS[0],
  );
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: "",
    endDate: "",
  });
  const [page, setPage] = useState(1);
  const [sortDir, setSortDir] = useState<SortDir>("none");
  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAllTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await TransactionService.fetchAll();
      setTransactions(res.data);
    } catch {
      // errors handled by axios interceptors
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSort = useCallback(() => {
    setSortDir((prev) => cycleSortDir(prev));
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    const sv = statusFilter?.value ?? "all";

    const result = transactions.filter((t) => {
      const matchSearch =
        !q ||
        t.user_name.toLowerCase().includes(q) ||
        t.transaction_id.toLowerCase().includes(q);
      const matchStatus = sv === "all" || t.payment_status === sv;
      const dateStr = t.date.split("T")[0];
      const matchStart = !dateRange.startDate || dateStr >= dateRange.startDate;
      const matchEnd = !dateRange.endDate || dateStr <= dateRange.endDate;
      return matchSearch && matchStatus && matchStart && matchEnd;
    });

    if (sortDir === "asc")
      return [...result].sort((a, b) => a.user_name.localeCompare(b.user_name));
    if (sortDir === "desc")
      return [...result].sort((a, b) => b.user_name.localeCompare(a.user_name));
    return result;
  }, [transactions, search, statusFilter, dateRange, sortDir]);

  const totalPages = calcTotalPages(filtered.length, PAGE_SIZE);
  const pageData = getPageSlice(filtered, page, PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter, dateRange, sortDir]);

  useEffect(() => {
    fetchAllTransactions();
  }, [fetchAllTransactions]);

  const columns = [
    {
      name: "USER NAME",
      selector: (row: any) => row.user_name,
      minWidth: "170px",
      cell: (row: any) => row.user_name ?? "-",
    },
    {
      name: "PLAN PURCHASED",
      selector: (row: any) => row.plan_purchased,
      minWidth: "160px",
      cell: (row: any) => row.plan_purchased ?? "-",
    },
    {
      name: "PRICE",
      selector: (row: any) => row.price,
      minWidth: "100px",
      cell: (row: any) =>
        row.price != null
          ? `${(row.currency ?? "EUR").toUpperCase()} ${row.price}`
          : "-",
    },
    {
      name: "DATE",
      selector: (row: any) => row.date,
      minWidth: "130px",
      cell: (row: any) => (row.date ? formatDate(row.date.split("T")[0]) : "-"),
    },
    {
      name: "TRANSACTION ID",
      selector: (row: any) => row.transaction_id,
      minWidth: "195px",
      cell: (row: any) => row.transaction_id ?? "-",
    },
    {
      name: "INVOICE ID",
      selector: (row: any) => row.invoice_id,
      minWidth: "145px",
      cell: (row: any) => row.invoice_id ?? "-",
    },
    {
      name: "PAYMENT STATUS",
      selector: (row: any) => row.payment_status,
      minWidth: "160px",
      cell: (row: any) =>
        row.payment_status ? (
          <span
            className={
              row.payment_status === "Success"
                ? styles.statusSuccess
                : styles.statusFailed
            }
          >
            {row.payment_status}
          </span>
        ) : (
          "-"
        ),
    },
    {
      name: "PAYMENT METHOD",
      selector: (row: any) => row.payment_method,
      minWidth: "165px",
      cell: (row: any) => row.payment_method ?? "-",
    },
  ];

  return (
    <div className={styles.page}>
      <HeaderActions onSort={handleSort} />

      <div className={styles.card}>
        <div className={styles.toolbar}>
          <div className={styles.filters}>
            <DateRangePicker value={dateRange} onChange={setDateRange} />
            <Select
              label="PAYMENT STATUS"
              options={PAYMENT_STATUS_OPTIONS}
              value={statusFilter}
              onChange={setStatusFilter}
            />

          </div>

          <div className={styles.toolbarRight}>
            <SearchBar placeholder="search" />
          </div>
        </div>

        <div className={styles.tableArea}>
          <DataTable<TransactionRecord>
            columns={columns}
            data={pageData}
            keyField="order_id"
            highlightOnHover
            noDataMessage={
              loading ? "Loading..." : "No transactions match your filters."
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
