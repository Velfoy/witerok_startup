export type TurbineType = "STANDARD_HAWT" | "WITEROK";

export interface CalculateEfficiencyRequest {
  /** Latitude (-90…90) */
  value1: number;
  /** Longitude (-180…180) */
  value2: number;
  /** Optional, default 2023 (backend supports 2000…2030) */
  year?: number;
  /** Optional, default STANDARD_HAWT */
  turbine?: TurbineType;
}

export interface CalculateEfficiencyResponse {
  /** Estimated annual energy production in kWh */
  result: number;
}

const DEFAULT_API_ORIGIN =
  "https://efficiency-calculator-production.up.railway.app";

function getApiOrigin(): string {
  const raw =
    (import.meta.env.VITE_EFFICIENCY_CALCULATOR_API_ORIGIN as
      | string
      | undefined) ?? DEFAULT_API_ORIGIN;
  return raw.replace(/\/+$/, "");
}

function getApiKey(): string {
  return (
    (import.meta.env.VITE_EFFICIENCY_CALCULATOR_API_KEY as
      | string
      | undefined) ?? ""
  );
}

export async function calculateEfficiency(
  payload: CalculateEfficiencyRequest,
  options?: { signal?: AbortSignal },
): Promise<CalculateEfficiencyResponse> {
  const res = await fetch(`${getApiOrigin()}/api/calculate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(getApiKey() ? { "X-Api-Key": getApiKey() } : {}),
    },
    body: JSON.stringify(payload),
    signal: options?.signal,
  });

  const data: unknown = await res
    .json()
    .catch(() => ({ error: "Invalid JSON response" }));

  if (!res.ok) {
    const message =
      typeof (data as { error?: unknown } | null)?.error === "string"
        ? (data as { error: string }).error
        : `Request failed (${res.status})`;

    const err = new Error(message) as Error & { status?: number };
    err.status = res.status;
    throw err;
  }

  return data as CalculateEfficiencyResponse;
}
