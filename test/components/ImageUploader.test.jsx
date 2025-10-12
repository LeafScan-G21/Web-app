import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ImageUploader from "../../src/components/ui/ImageUploader";

describe("components/ImageUploader", () => {
  // eslint-disable-next-line no-undef
  const BACKEND_URL = process.env.VITE_BACKEND_URL || "http://localhost:8000";

  beforeEach(() => {
    jest.resetAllMocks();
    localStorage.clear();
    // jsdom doesn't implement createObjectURL
    globalThis.URL.createObjectURL = jest.fn(() => "blob:preview");
    // seed auth token so Authorization header exists
    localStorage.setItem(
      "sb-pxscukkdtytvjvfookbm-auth-token",
      JSON.stringify({ access_token: "tkn", user: { id: "u-1" } })
    );
  });

  test("selecting a file shows preview and analyze button", async () => {
    const { container } = render(<ImageUploader />);
    const input = container.querySelector('input[type="file"]');
    const file = new File(["data"], "photo.png", { type: "image/png" });
    fireEvent.change(input, { target: { files: [file] } });

    // Analyze button appears
    expect(
      screen.getByRole("button", { name: /analyze plant disease/i })
    ).toBeInTheDocument();
  });

  test("Analyze without saved location prompts for location, continue without location posts without lat/lon", async () => {
    // mock fetch
    globalThis.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ result: "ok" }),
    });

    const { container } = render(<ImageUploader />);
    const input = container.querySelector('input[type="file"]');
    const file = new File(["data"], "photo.png", { type: "image/png" });
    fireEvent.change(input, { target: { files: [file] } });

    fireEvent.click(screen.getByRole("button", { name: /analyze/i }));

    // Modal visible
    expect(
      screen.getByRole("heading", { name: /allow location access/i })
    ).toBeInTheDocument();

    // Continue without location
    fireEvent.click(
      screen.getByRole("button", { name: /continue without location/i })
    );

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    });
    // Verify endpoint and headers used
    const [url, options] = globalThis.fetch.mock.calls[0];
    expect(url).toBe(`${BACKEND_URL}/upload/api/v1/upload`);
    expect(options.method).toBe("POST");
    expect(options.headers.Authorization).toBe("Bearer tkn");
    expect(options.body).toBeInstanceOf(FormData);
  });

  test("Analyze with saved location includes lat/lon in formdata", async () => {
    globalThis.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });
    localStorage.setItem("location", JSON.stringify({ lat: 9, lng: 8 }));

    const { container } = render(<ImageUploader />);
    const input = container.querySelector('input[type="file"]');
    const file = new File(["data"], "photo.png", { type: "image/png" });
    fireEvent.change(input, { target: { files: [file] } });
    fireEvent.click(screen.getByRole("button", { name: /analyze/i }));

    await waitFor(() => expect(globalThis.fetch).toHaveBeenCalledTimes(1));
    const [, options] = globalThis.fetch.mock.calls[0];
    const fd = options.body;
    // FormData inspection: convert to entries
    const entries = Array.from(fd.entries());
    const kv = Object.fromEntries(entries);
    expect(kv.lat).toBe("9");
    expect(kv.lon).toBe("8");
    expect(kv.consent_location).toBe("true");
  });

  test("shows error when upload fails", async () => {
    globalThis.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "ERR",
      text: async () => "x",
    });

    const { container } = render(<ImageUploader />);
    const input = container.querySelector('input[type="file"]');
    const file = new File(["data"], "photo.png", { type: "image/png" });
    fireEvent.change(input, { target: { files: [file] } });
    fireEvent.click(screen.getByRole("button", { name: /analyze/i }));

    // prompt then continue without location
    fireEvent.click(
      await screen.findByRole("button", { name: /continue without location/i })
    );

    await waitFor(() =>
      expect(screen.getByText(/failed to process image/i)).toBeInTheDocument()
    );
  });
});
