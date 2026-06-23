import { privateRequest } from "../axios";
import type { DashboardResponse } from "../../types/dashboard";

const BASE = "/api/admin/dashboard-stats";

const fetchStats = () => privateRequest.get<DashboardResponse>(BASE);

const DashboardService = { fetchStats };

export default DashboardService;
