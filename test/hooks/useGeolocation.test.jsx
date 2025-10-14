import { renderHook, waitFor } from "@testing-library/react";
import useGeolocation from "../../src/hooks/useGeolocation";

describe("hooks/useGeolocation", () => {
  const originalGeolocation = navigator.geolocation;

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    // restore
    Object.defineProperty(navigator, "geolocation", {
      configurable: true,
      value: originalGeolocation,
    });
  });

  test("returns saved location from localStorage and does not ask geolocation", () => {
    const saved = { lat: 10.5, lng: 20.25 };
    localStorage.setItem("location", JSON.stringify(saved));
    const spy = jest.fn();
    Object.defineProperty(navigator, "geolocation", {
      configurable: true,
      value: { getCurrentPosition: spy },
    });

    const { result } = renderHook(() => useGeolocation());
    expect(result.current.location).toEqual(saved);
    expect(spy).not.toHaveBeenCalled();
    expect(result.current.error).toBeNull();
  });

  test("sets error when geolocation is not supported", async () => {
    // Remove geolocation so the hook branches to the unsupported path
    Object.defineProperty(navigator, "geolocation", {
      configurable: true,
      value: undefined,
    });
    delete navigator.geolocation;

    const { result } = renderHook(() => useGeolocation());
    await waitFor(() =>
      expect(result.current.error).toBe(
        "Geolocation is not supported by your browser."
      )
    );
    expect(result.current.location).toBeNull();
  });

  test("gets current position and saves to localStorage on success", async () => {
    const success = (cb) => cb({ coords: { latitude: 1.23, longitude: 4.56 } });
    Object.defineProperty(navigator, "geolocation", {
      configurable: true,
      value: { getCurrentPosition: (onSuccess) => success(onSuccess) },
    });

    const { result } = renderHook(() => useGeolocation());

    await waitFor(() =>
      expect(result.current.location).toEqual({ lat: 1.23, lng: 4.56 })
    );
    expect(JSON.parse(localStorage.getItem("location"))).toEqual({
      lat: 1.23,
      lng: 4.56,
    });
    expect(result.current.error).toBeNull();
  });

  test("sets error on geolocation failure", async () => {
    const err = { message: "Denied" };
    Object.defineProperty(navigator, "geolocation", {
      configurable: true,
      value: { getCurrentPosition: (_s, onError) => onError(err) },
    });

    const { result } = renderHook(() => useGeolocation());
    await waitFor(() => expect(result.current.error).toBe("Denied"));
    expect(result.current.location).toBeNull();
  });
});
