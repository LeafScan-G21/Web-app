import axios from "axios";
import { geturrentWeather } from "../../../src/services/weather/forecast";
import { toast } from "react-hot-toast";

jest.mock("react-hot-toast", () => ({
  __esModule: true,
  toast: { error: jest.fn(), success: jest.fn() },
  default: { error: jest.fn(), success: jest.fn() },
}));

describe("services/weather geturrentWeather extra", () => {
  test("calls axios.get with coords", async () => {
    axios.get.mockResolvedValueOnce({ data: { ok: true } });
    const res = await geturrentWeather(1, 2);
    expect(axios.get).toHaveBeenCalled();
    expect(res).toEqual({ ok: true });
  });

  test("throws and toasts on error", async () => {
    axios.get.mockRejectedValueOnce(new Error("boom"));
    await expect(geturrentWeather(1, 2)).rejects.toThrow("boom");
    expect(toast.error).toHaveBeenCalled();
  });
});
