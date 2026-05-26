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
import { PAGE_SIZE, STATUS_OPTIONS } from "../../constants/filterOptions";
import {
  type SortDir,
  cycleSortDir,
  calcTotalPages,
  getPageSlice,
  matchStatusFilter,
} from "../../utils/tableUtils";
import SubscriptionService from "../../services/api/subscription";
import toast from "../../utils/toast";

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
  const search = searchParams.get("search");

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
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);

  const fetchSubscriptions = async () => {
    try {
      const params = {
        search: search ?? null,
      };
      const res = await SubscriptionService.fetchAllSub(params);
      // console.log("res", res);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSort = useCallback(() => {
    setSortDir((prev) => cycleSortDir(prev));
  }, []);

  const closePanel = useCallback(() => {
    setIsPanelOpen(false);
    setEditingPlan(null);
  }, []);

  const handleAdd = useCallback(() => {
    setEditingPlan(null);
    setIsPanelOpen(true);
  }, []);

  const handleSubmitPlan = useCallback(
    (data: Record<string, unknown>) => {
      if (editingPlan) {
        setPlans((prev) =>
          prev.map((p) =>
            p.id === editingPlan.id
              ? {
                  ...p,
                  planName: (data.planName as string) ?? p.planName,
                  pricePerMonth: Number(data.pricePerMonth ?? p.pricePerMonth),
                  annualDiscount: Number(
                    data.annualDiscount ?? p.annualDiscount,
                  ),
                  images: Number(data.imageAllowance ?? p.images),
                  videos: Number(data.videoAllowance ?? p.videos),
                }
              : p,
          ),
        );
      } else {
        setPlans((prev) => [
          {
            id: prev.length + 1,
            planName: (data.planName as string) ?? "",
            pricePerMonth: Number(data.pricePerMonth ?? 0),
            annualDiscount: Number(data.annualDiscount ?? 0),
            images: Number(data.imageAllowance ?? 0),
            videos: Number(data.videoAllowance ?? 0),
            active: true,
            bestFor: "All",
          },
          ...prev,
        ]);
      }
      closePanel();
    },
    [editingPlan, closePanel],
  );

  const filtered = useMemo(() => {
    const q = search?.toLowerCase();
    const sv = statusFilter?.value ?? "all";
    const bv = bestForFilter?.value ?? "all";

    const result = plans.filter((p) => {
      const matchSearch = !q || p.planName.toLowerCase().includes(q);
      const matchStatus = matchStatusFilter(p.active, sv);
      const matchBestFor = bv === "all" || p.bestFor === bv;
      return matchSearch && matchStatus && matchBestFor;
    });

    if (sortDir === "asc")
      return [...result].sort((a, b) => a.planName.localeCompare(b.planName));
    if (sortDir === "desc")
      return [...result].sort((a, b) => b.planName.localeCompare(a.planName));
    return result;
  }, [plans, search, statusFilter, bestForFilter, sortDir]);

  const totalPages = calcTotalPages(filtered.length, PAGE_SIZE);

  const pageData = getPageSlice(filtered, page, PAGE_SIZE);

  const toggleActive = useCallback((planId: number) => {
    setPlans((prev) =>
      prev.map((p) => (p.id === planId ? { ...p, active: !p.active } : p)),
    );
  }, []);

  const handleEdit = useCallback((row: Plan) => {
    setEditingPlan(row);
    setIsPanelOpen(true);
  }, []);

  const actionCellCallback = (row: any) => (
    <ActionCell row={row} onToggle={toggleActive} onEdit={handleEdit} />
  );

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
      cell: actionCellCallback,
    },
  ];

  const defaultValuesConfig = editingPlan
    ? {
        planName: editingPlan.planName,
        pricePerMonth: editingPlan.pricePerMonth,
        annualDiscount: editingPlan.annualDiscount,
        imageAllowance: editingPlan.images,
        videoAllowance: editingPlan.videos,
        features: [{ text: "" }],
      }
    : { features: [{ text: "" }] };

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter, bestForFilter, sortDir]);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  return (
    <div className={styles.page}>
      <HeaderActions onSort={handleSort} />

      <SidePanel
        isOpen={isPanelOpen}
        onClose={closePanel}
        title={editingPlan ? "Edit Subscription" : "Add New Subscription"}
      >
        {isPanelOpen && (
          <DynamicForm
            formConfig={SUBSCRIPTION_FORM_CONFIG}
            defaultValues={defaultValuesConfig}
            onSubmit={handleSubmitPlan}
            onCancel={closePanel}
            submitText={editingPlan ? "Save Changes" : "Add New"}
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
