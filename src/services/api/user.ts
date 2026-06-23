import { privateRequest } from "../axios";
import type { ApiListResponse } from "../../types/api";
import type { User } from "../../types/user";

export interface UserListParams {
  search?: string;
  status?: string;
  page?: number;
  page_size?: number;
}

const fetchAll = (params?: UserListParams) =>
  privateRequest.get<ApiListResponse<User>>("/api/admin/users", { params });

const UserService = { fetchAll };

export default UserService;
