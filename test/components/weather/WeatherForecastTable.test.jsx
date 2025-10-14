import React from "react";
import { render, screen } from "@testing-library/react";
import WeatherForecastTable from "../../../src/components/weather/WeatherForecastTable.jsx";

// Ensure localStorage values for current weather effect
beforeEach(() => {
  localStorage.setItem("latitude", "1");
  localStorage.setItem("longitude", "2");
});

describe("weather/WeatherForecastTable", () => {
  test("shows loading state", () => {
    render(
      <WeatherForecastTable
        isLoading
        forecastData={[]}
        handleResetLocation={() => {}}
      />
    );
    expect(screen.getByText(/loading forecast/i)).toBeInTheDocument();
  });

  test("shows error state", () => {
    render(
      <WeatherForecastTable
        isError
        forecastData={[]}
        handleResetLocation={() => {}}
      />
    );
    expect(
      screen.getByText(/failed to load weather data/i)
    ).toBeInTheDocument();
  });

  test("shows empty state when no data", () => {
    render(
      <WeatherForecastTable forecastData={[]} handleResetLocation={() => {}} />
    );
    expect(screen.getByText(/no forecast data available/i)).toBeInTheDocument();
  });

  test("renders table rows when data provided and reset button", () => {
    const forecastData = [
      {
        date: "2025-01-01",
        max_temp: 30,
        min_temp: 20,
        mean_temp: 25,
        humidity: 50,
        wind_speed: 10,
        rain: 2,
        uv_index: 4,
        cloud_cover: 20,
      },
    ];
    const onReset = jest.fn();
    render(
      <WeatherForecastTable
        forecastData={forecastData}
        handleResetLocation={onReset}
      />
    );
    expect(screen.getAllByText(/2025-01-01/).length).toBeGreaterThan(0);
    expect(
      screen.getByRole("button", { name: /reset location/i })
    ).toBeInTheDocument();
  });
});
