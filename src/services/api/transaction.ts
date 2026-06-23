import { privateRequest } from "../axios";
import type { TransactionRecord, TransactionListParams } from "../../types/transaction";
import type { ApiListResponse } from "../../types/api";

const BASE = "/api/admin/transactions";

const fetchAll = (params?: TransactionListParams) =>
  privateRequest.get<ApiListResponse<TransactionRecord>>(BASE, { params });

const TransactionService = { fetchAll };

export default TransactionService;
