import { useState, useEffect, useCallback } from "react";
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
import { calcTotalPages } from "../../utils/tableUtils";
import SubscriptionService from "../../services/api/subscription";
import type {
  SubscriptionPlan,
  CreateSubscriptionPayload,
} from "../../types/subscription";
import toast from "../../utils/toast";

function mapFormToPayload(
  data: Record<string, unknown>,
): CreateSubscriptionPayload {
  return {
    name: data.planName as string,
    price_monthly: Number(data.pricePerMonth ?? 0),
    annual_discount_percentage: Number(data.annualDiscount ?? 0),
    image_allowance: Number(data.imageAllowance ?? 0),
    video_allowance: Number(data.videoAllowance ?? 0),
    description: (data.description as string) || undefined,
  };
}

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
  const [page, setPage] = useState(1);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);

  const fetchPlans = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        search: search || undefined,
        status: statusFilter?.value ?? "all",
        page,
        page_size: PAGE_SIZE,
      };
      const res = await SubscriptionService.fetchAll(params);
      setPlans(res.data);
      setTotalCount(res.count);
    } catch {
      // errors handled by axios interceptors
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, page, refreshKey]);

  const closePanel = useCallback(() => {
    setIsPanelOpen(false);
    setEditingPlan(null);
  }, []);

  const handleAdd = useCallback(() => {
    setEditingPlan(null);
    setIsPanelOpen(true);
  }, []);

  const handleEdit = useCallback((row: SubscriptionPlan) => {
    setEditingPlan(row);
    setIsPanelOpen(true);
  }, []);

  const handleSubmitPlan = useCallback(
    async (data: Record<string, unknown>) => {
      const payload = mapFormToPayload(data);
      try {
        if (editingPlan) {
          await SubscriptionService.update(editingPlan.id, payload);
          toast.success("Plan updated successfully.");
        } else {
          await SubscriptionService.create(payload);
          toast.success("Plan created successfully.");
        }
        closePanel();
        setRefreshKey((k) => k + 1);
      } catch {
        // errors handled by axios interceptors
      }
    },
    [editingPlan, closePanel],
  );

  const toggleActive = useCallback(
    async (planId: string) => {
      const plan = plans.find((p) => p.id === planId);
      if (!plan) return;
      try {
        await SubscriptionService.update(planId, {
          is_active: !plan.is_active,
        });
        setPlans((prev) =>
          prev.map((p) =>
            p.id === planId ? { ...p, is_active: !p.is_active } : p,
          ),
        );
      } catch {
        // errors handled by axios interceptors
      }
    },
    [plans],
  );

  const totalPages = calcTotalPages(totalCount, PAGE_SIZE);

  const actionCellCallback = (row: SubscriptionPlan) => (
    <ActionCell row={row} onToggle={toggleActive} onEdit={handleEdit} />
  );

  const columns = [
    {
      name: "PLAN NAME",
      selector: (row: any) => row.name,
      width: "25%",
    },
    {
      name: "PRICE/MO.",
      selector: (row: any) => row.price_monthly,
      width: "15%",
      cell: (row: any) =>
        row.price_monthly != null ? `€${row.price_monthly}` : "-",
    },
    {
      name: "ANNUAL%",
      selector: (row: any) => row.annual_discount_percentage,
      width: "15%",
      center: true,
      cell: (row: any) => `${row.annual_discount_percentage ?? 0}%`,
    },
    {
      name: "IMAGES",
      selector: (row: any) => row.image_allowance,
      width: "10%",
      center: true,
    },
    {
      name: "VIDEOS",
      selector: (row: any) => row.video_allowance,
      width: "10%",
      center: true,
    },
    {
      name: "ACTION",
      width: "25%",
      center: true,
      cell: actionCellCallback,
    },
  ];

  const defaultValuesConfig = editingPlan
    ? {
        planName: editingPlan.name,
        pricePerMonth: editingPlan.price_monthly,
        annualDiscount: editingPlan.annual_discount_percentage,
        imageAllowance: editingPlan.image_allowance,
        videoAllowance: editingPlan.video_allowance,
        description: editingPlan.description ?? "",
        features: [{ text: "" }],
      }
    : { features: [{ text: "" }] };

  // Reset to page 1 when search or status filter changes
  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);

  // Fetch from API — all filtering and pagination delegated to the server
  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  return (
    <div className={styles.page}>
      <HeaderActions />

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
        <div className={styles.toolbar}>
          <div className={styles.filters}>
            <Select
              label="STATUS"
              options={STATUS_OPTIONS}
              value={statusFilter}
              onChange={setStatusFilter}
            />
          </div>

          <div className={styles.toolbarRight}>
            <SearchBar placeholder="search" paramKey="search" />
            <button className={styles.addBtn} onClick={handleAdd}>
              <span>Add New</span>
            </button>
          </div>
        </div>

        <div className={styles.tableArea}>
          <DataTable<SubscriptionPlan>
            columns={columns}
            data={plans}
            keyField="id"
            highlightOnHover
            noDataMessage={
              loading ? "Loading..." : "No plans match your filters."
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
