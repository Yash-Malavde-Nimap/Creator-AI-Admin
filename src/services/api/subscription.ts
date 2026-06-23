import { privateRequest } from "../axios";
import type {
  SubscriptionPlan,
  CreateSubscriptionPayload,
  UpdateSubscriptionPayload,
  SubscriptionListParams,
} from "../../types/subscription";
import type { ApiListResponse } from "../../types/api";

const BASE = "/api/admin/subscription-plans";

const fetchAll = (params?: SubscriptionListParams) =>
  privateRequest.get<ApiListResponse<SubscriptionPlan>>(BASE, { params });

const fetchById = (planId: string) =>
  privateRequest.get<SubscriptionPlan>(`${BASE}/${planId}`);

const create = (payload: CreateSubscriptionPayload) =>
  privateRequest.post<SubscriptionPlan>(BASE, payload);

const update = (planId: string, payload: UpdateSubscriptionPayload) =>
  privateRequest.put<SubscriptionPlan>(`${BASE}/${planId}`, payload);

const remove = (planId: string) =>
  privateRequest.delete<void>(`${BASE}/${planId}`);

const SubscriptionService = { fetchAll, fetchById, create, update, remove };

export default SubscriptionService;
