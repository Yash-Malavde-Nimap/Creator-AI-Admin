import { useState, useEffect } from "react";
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
import { calcTotalPages } from "../../utils/tableUtils";
import { capitalizeText, formatDate } from "../../utils/formatUtils";
import TransactionService from "../../services/api/transaction";
import type { TransactionRecord } from "../../types/transaction";

const PAYMENT_STATUS_OPTIONS: SelectOption[] = [
  { value: "all", label: "All Status" },
  { value: "success", label: "Success" },
  { value: "payment-failed", label: "Payment Failed" },
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
  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const params = {
        search: search || undefined,
        payment_status:
          statusFilter?.value !== "all" ? statusFilter?.value : undefined,
        start_date: dateRange.startDate || undefined,
        end_date: dateRange.endDate || undefined,
        page,
        page_size: PAGE_SIZE,
      };
      const res = await TransactionService.fetchAll(params);
      setTransactions(res.data);
      setTotalCount(res.count);
    } catch {
      // errors handled by axios interceptors
    } finally {
      setLoading(false);
    }
  };

  const totalPages = calcTotalPages(totalCount, PAGE_SIZE);

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
        row.payment_status ? capitalizeText(row?.payment_status) : "-",
    },
    {
      name: "PAYMENT METHOD",
      selector: (row: any) => row.payment_method,
      minWidth: "165px",
      cell: (row: any) => row.payment_method ?? "-",
    },
  ];

  // Reset to page 1 when any filter changes
  useEffect(() => {
    setPage(1);
  }, [search, statusFilter, dateRange]);

  // Fetch from API — all filtering and pagination delegated to the server
  useEffect(() => {
    fetchTransactions();
  }, [search, statusFilter, dateRange, page]);

  return (
    <div className={styles.page}>
      <HeaderActions />

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
            data={transactions}
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
