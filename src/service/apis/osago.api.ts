import api from "../index";

export interface OsagoCalculateRequest {
  limited: boolean;
  drivers: number[];
  gosNumber: string;
  techSery: string;
  techNumber: string;
  periodId: number;
}

export interface OsagoCalculateResponse {
  id: string;
  amountUzs: number;
  periodId: number;
  limited: boolean;
  gosNumber: string;
  message: string;
  individual: boolean;
  vehicleType: string;
  techNumber: string;
  techSery: string;
  owner: string;
  markaName: string;
  modelName: string;
  vehicleColor: string;
  issueYear: number;
}

export interface OsagoCheckVehicleRequest {
  gosNumber: string;
  techSery: string;
  techNumber: string;
  passportSeries: string;
  passportNumber: string;
}

export interface OsagoCheckVehicleResponse {
  success: boolean;
  message?: string;
  data?: Record<string, unknown>;
}

export interface OsagoContractDriver {
  passSeriya: string;
  passNumber: string;
  birthDate: string;
}

export interface OsagoContractOwnerPerson {
  passSeriya: string;
  passNumber: string;
}

export interface OsagoContractRequest {
  calculationId: string;
  identity: string;
  startDate: string;
  phoneNumber: string;
  owner: any;
  drivers: any[];
}

export const osagoPersonByDoc = async (body: {
  passportSeries: string;
  passportNumber: string;
  birthDate: string;
}): Promise<Record<string, any>> => {
  const { data } = await api.post('/api/v1/osago/person/by-doc', body);
  return data.data ?? data;
};

export const osagoSmsSend = async (phoneNumber: string): Promise<void> => {
  await api.post("/api/v1/osago/sms/send", { phoneNumber });
};

export const osagoSmsVerify = async (phoneNumber: string, code: string): Promise<{ identity: string }> => {
  const { data } = await api.post("/api/v1/osago/sms/verify", { phoneNumber, code });
  return data.data ?? data;
};

export const osagoCalculate = async (body: OsagoCalculateRequest): Promise<OsagoCalculateResponse> => {
  const { data } = await api.post("/api/v1/osago/calculate", body);
  return data.data ?? data;
};

export const osagoCheckVehicle = async (body: OsagoCheckVehicleRequest): Promise<OsagoCheckVehicleResponse> => {
  const { data } = await api.post("/api/v1/osago/check-vehicle", body);
  return data.data ?? data;
};

export interface OsagoContractResponse {
  id: string;
  startDate: string;
  phoneNumber: string;
  amountUzs: number;
  periodId: number;
  limited: boolean;
  status: string;
  sqbContractId: string;
  createdAt: string;
  paymeUrl: string;
  clickUrl: string;
}

export const osagoCreateContract = async (body: OsagoContractRequest): Promise<OsagoContractResponse> => {
  const { data } = await api.post("/api/v1/osago/contract", body);
  return data.data ?? data;
};

export interface OsagoConfirmResponse {
  success: boolean;
  result?: number;
  statusPayment?: number;
  status?: string;
  message?: string;
  policyId?: string;
  policySery?: string;
  policyNumber?: string;
  policyFileUrl?: string;
  [key: string]: unknown;
}

export const osagoConfirmPayment = async (contractId: string): Promise<OsagoConfirmResponse> => {
  const { data } = await api.get(`/api/v1/osago/contracts/${contractId}/confirm`);
  return data.data ?? data;
};
