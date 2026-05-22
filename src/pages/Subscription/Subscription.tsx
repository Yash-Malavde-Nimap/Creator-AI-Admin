import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import DataTable from "../../components/DataTable/DataTable";
import Select from "../../components/Select/Select";
import type { SelectOption } from "../../components/Select/Select";
import SearchBar from "../../components/SearchBar/SearchBar";
import Pagination from "../../components/Pagination/Pagination";
import HeaderActions from "../../components/HeaderActions/HeaderActions";
import SidePanel from "../../components/SidePanel/SidePanel";
import DynamicForm from "../../components/DynamicForm/DynamicForm";
import type { FieldConfig } from "../../components/DynamicForm/types";
import styles from "./Subscription.module.scss";
import ActionCell from "../../components/ActionCell/ActionCell";

export interface Plan {
  id: number;
  planName: string;
  pricePerMonth: number;
  annualDiscount: number;
  images: number;
  videos: number;
  active: boolean;
  bestFor: string;
}

// ── Mock data ─────────────────────────────────────────────
const PLAN_TEMPLATES = [
  {
    planName: "Starter",
    pricePerMonth: 24.99,
    annualDiscount: 10,
    images: 250,
    videos: 250,
    bestFor: "Individuals",
  },
  {
    planName: "Pro",
    pricePerMonth: 59.99,
    annualDiscount: 15,
    images: 600,
    videos: 600,
    bestFor: "Teams",
  },
  {
    planName: "Business",
    pricePerMonth: 99.99,
    annualDiscount: 20,
    images: 1500,
    videos: 1500,
    bestFor: "Enterprise",
  },
];

function makePlans(): Plan[] {
  return Array.from({ length: 90 }, (_, i) => ({
    id: i + 1,
    ...PLAN_TEMPLATES[i % PLAN_TEMPLATES.length],
    active: i % 5 !== 3,
  }));
}

const ALL_PLANS = makePlans();
const PAGE_SIZE = 10;

type SortDir = "none" | "asc" | "desc";

const STATUS_OPTIONS: SelectOption[] = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const BEST_FOR_OPTIONS: SelectOption[] = [
  { value: "all", label: "All" },
  { value: "Individuals", label: "Individuals" },
  { value: "Teams", label: "Teams" },
  { value: "Enterprise", label: "Enterprise" },
];

const SUBSCRIPTION_FORM_CONFIG: FieldConfig[] = [
  {
    name: "planName",
    label: "Plan Name",
    type: "text",
    colSpan: "half",
    placeholder: "e.g. Business",
    validation: { required: "Plan Name is required" },
  },
  {
    name: "pricePerMonth",
    label: "Price/mo.",
    type: "number",
    colSpan: "half",
    placeholder: "0.00",
    prefix: "€",
    validation: {
      required: "Price is required",
      valueAsNumber: true,
      min: { value: 0, message: "Must be ≥ 0" },
    },
  },
  {
    name: "description",
    label: "Plan Description",
    type: "textarea",
    colSpan: "full",
    placeholder: "Describe what's included…",
    rows: 3,
  },
  {
    name: "imageAllowance",
    label: "Image Allowance",
    type: "number",
    colSpan: "half",
    placeholder: "e.g. 150",
    validation: { valueAsNumber: true },
  },
  {
    name: "videoAllowance",
    label: "Video Allowance",
    type: "number",
    colSpan: "half",
    placeholder: "e.g. 30",
    validation: { valueAsNumber: true },
  },
  {
    name: "features",
    label: "Features",
    type: "field-array",
    colSpan: "full",
    addButtonLabel: "+Add More",
    itemPlaceholder: "e.g. WhatsApp integration",
  },
  {
    name: "annualDiscount",
    label: "Annual Discount (%)",
    type: "number",
    colSpan: "half",
    placeholder: "0",
    suffix: "%",
    validation: {
      valueAsNumber: true,
      min: { value: 0, message: "Min 0" },
      max: { value: 100, message: "Max 100" },
    },
  },
  { name: "priceCalc", label: "", type: "price-calc", colSpan: "full" },
];

export default function Subscription() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const [statusFilter, setStatusFilter] = useState<SelectOption | null>(
    STATUS_OPTIONS[0],
  );
  const [bestForFilter, setBestForFilter] = useState<SelectOption | null>(
    BEST_FOR_OPTIONS[0],
  );
  const [page, setPage] = useState(1);
  const [plans, setPlans] = useState<Plan[]>(ALL_PLANS);
  const [sortDir, setSortDir] = useState<SortDir>("none");
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleSort = useCallback(() => {
    setSortDir((prev) =>
      prev === "none" ? "asc" : prev === "asc" ? "desc" : "none",
    );
  }, []);

  const handleAdd = useCallback(() => {
    setIsPanelOpen(true);
  }, []);

  const handleSubmitPlan = useCallback(
    (data: Record<string, unknown>) => {
      // const newPlan: Plan = {
      //   id: plans.length + 1,
      //   planName: String(data.planName ?? ""),
      //   pricePerMonth: Number(data.pricePerMonth ?? 0),
      //   annualDiscount: Number(data.annualDiscount ?? 0),
      //   images: Number(data.imageAllowance ?? 0),
      //   videos: Number(data.videoAllowance ?? 0),
      //   active: true,
      //   bestFor: "All",
      // };
      // setPlans((prev) => [newPlan, ...prev]);
      // setIsPanelOpen(false);

      console.log("data", data);
    },
    [plans.length],
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    const sv = statusFilter?.value ?? "all";
    const bv = bestForFilter?.value ?? "all";

    const result = plans.filter((p) => {
      const matchSearch = !q || p.planName.toLowerCase().includes(q);
      const matchStatus =
        sv === "all" || (sv === "active" ? p.active : !p.active);
      const matchBestFor = bv === "all" || p.bestFor === bv;
      return matchSearch && matchStatus && matchBestFor;
    });

    if (sortDir === "asc")
      return [...result].sort((a, b) => a.planName.localeCompare(b.planName));
    if (sortDir === "desc")
      return [...result].sort((a, b) => b.planName.localeCompare(a.planName));
    return result;
  }, [plans, search, statusFilter, bestForFilter, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter, bestForFilter, sortDir]);

  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleActive = useCallback((planId: number) => {
    setPlans((prev) =>
      prev.map((p) => (p.id === planId ? { ...p, active: !p.active } : p)),
    );
  }, []);

  const columns = [
    {
      name: "PLAN NAME",
      selector: (row: any) => row.planName,
      minWidth: "200px",
    },
    {
      name: "PRICE/MO.",
      selector: (row: any) => row.pricePerMonth,
      minWidth: "140px",
      cell: (row: any) => `€${row.pricePerMonth.toFixed(2)}`,
    },
    {
      name: "ANNUAL%",
      selector: (row: any) => row.annualDiscount,
      minWidth: "130px",
      center: true,
      cell: (row: any) => `${row.annualDiscount}%`,
    },
    {
      name: "IMAGES",
      selector: (row: any) => row.images,
      center: true,
      minWidth: "120px",
    },
    {
      name: "VIDEOS",
      selector: (row: any) => row.videos,
      center: true,
      minWidth: "120px",
    },
    {
      name: "ACTION",
      center: true,
      minWidth: "140px",
      cell: (row: any) => <ActionCell row={row} onToggle={toggleActive} />,
    },
  ];

  const closePanel = () => {
    setIsPanelOpen(false);
  };

  return (
    <div className={styles.page}>
      <HeaderActions onSort={handleSort} />

      <SidePanel
        isOpen={isPanelOpen}
        onClose={closePanel}
        title="Add New Subscription"
        // subtitle="Fill in the details to create a new plan"
      >
        {isPanelOpen && (
          <DynamicForm
            formConfig={SUBSCRIPTION_FORM_CONFIG}
            defaultValues={{ features: [{ text: "" }] }}
            onSubmit={handleSubmitPlan}
            onCancel={closePanel}
            submitText="Add New"
          />
        )}
      </SidePanel>

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
              label="BEST FOR"
              options={BEST_FOR_OPTIONS}
              value={bestForFilter}
              onChange={setBestForFilter}
            />
          </div>

          <div className={styles.toolbarRight}>
            <SearchBar placeholder="search" paramKey="search" />
            <button className={styles.addBtn} onClick={handleAdd}>
              <span>Add New</span>
            </button>
          </div>
        </div>

        {/* ── Table ───────────────────────────── */}
        <div className={styles.tableArea}>
          <DataTable<Plan>
            columns={columns}
            data={pageData}
            keyField="id"
            highlightOnHover
            noDataMessage="No plans match your filters."
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
