import { TFunction } from "i18next";
import { LOCATION_DATA, LocationKey } from "../../data";
import { buildLocations } from "../locations";

describe("buildLocations", () => {
  it("maps every location with translated name and source url", () => {
    const t = ((key: string) => `translated:${key}`) as unknown as TFunction;

    const locations = buildLocations(t);

    const locationKeys = Object.keys(locations).sort();
    const dataKeys = Object.keys(LOCATION_DATA).sort();
    expect(locationKeys).toEqual(dataKeys);

    (Object.entries(LOCATION_DATA) as [LocationKey, (typeof LOCATION_DATA)[LocationKey]][]).forEach(([key, value]) => {
      expect(locations[key]).toEqual({
        name: `translated:${value.nameKey}`,
        url: value.url,
      });
    });
  });

  it("calls translator for every location name key once", () => {
    const tMock = jest.fn((key: string) => key);
    const t = tMock as unknown as TFunction;

    buildLocations(t);

    const translatedKeys = tMock.mock.calls.map(([key]) => key).sort((a, b) => a.localeCompare(b));
    const expectedKeys = Object.values(LOCATION_DATA)
      .map(({ nameKey }) => nameKey)
      .sort((a, b) => a.localeCompare(b));

    expect(translatedKeys).toEqual(expectedKeys);
  });
});
