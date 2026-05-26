import { privateRequest } from "../axios";

const ENDPOINTS = {
  SUBSCRIPTION: "/subscription",
};

const fetchAllSub = async (params: any) => {
  const response: any = await privateRequest.get(ENDPOINTS.SUBSCRIPTION, {
    params,
  });
  return response?.data;
};

const SubscriptionService = {
  fetchAllSub,
};

export default SubscriptionService;
