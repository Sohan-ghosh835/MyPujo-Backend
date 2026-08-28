import { describe, expect, it } from "vitest";

describe("deployment branding configuration", () => {
  it("exposes PujoParikroma as the configured public application title", () => {
    expect(process.env.VITE_APP_TITLE).toBe("PujoParikroma");
  });
});
