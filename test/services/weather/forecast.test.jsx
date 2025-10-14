/* eslint-env jest, node */
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  getWeatherForecast,
  geturrentWeather,
} from "../../../src/services/weather/forecast";
import { describe, test, expect, beforeEach, jest } from "@jest/globals";

jest.mock("axios");
jest.mock("react-hot-toast");

describe("services/weather/forecast", () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  test("getWeatherForecast calls endpoint with params", async () => {
    axios.get.mockResolvedValueOnce({ data: { list: [] } });
    const res = await getWeatherForecast(1.2, 3.4, "Somewhere");
    expect(axios.get.mock.calls[0][0]).toBe(
      "http://localhost:8000/weather/forecast"
    );
    expect(axios.get.mock.calls[0][1].params).toEqual({
      latitude: 1.2,
      longitude: 3.4,
      address: "Somewhere",
    });
    expect(res).toEqual({ list: [] });
  });

  test("geturrentWeather calls endpoint with params", async () => {
    axios.get.mockResolvedValueOnce({ data: { temp: 22 } });
    const res = await geturrentWeather(1.2, 3.4);
    expect(axios.get.mock.calls[0][0]).toBe(
      "http://localhost:8000/weather/current"
    );
    expect(axios.get.mock.calls[0][1].params).toEqual({
      latitude: 1.2,
      longitude: 3.4,
    });
    expect(res).toEqual({ temp: 22 });
  });

  test("getWeatherForecast throws and toasts on error", async () => {
    const err = new Error("boom");
    axios.get.mockRejectedValueOnce(err);
    await expect(getWeatherForecast(0, 0, "A")).rejects.toBe(err);
    expect(toast.error).toHaveBeenCalled();
  });

  test("geturrentWeather throws and toasts on error", async () => {
    const err = new Error("boom");
    axios.get.mockRejectedValueOnce(err);
    await expect(geturrentWeather(0, 0)).rejects.toBe(err);
    expect(toast.error).toHaveBeenCalled();
  });
});
