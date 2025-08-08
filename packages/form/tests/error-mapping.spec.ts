import { describe, expect, it } from "vitest";
import { z } from "zod";
import { _errorConverter } from "../src/lib/internal/errorConverter";

// This test targets Zod v4 error shape and our normalization

describe("error mapping - zod v4", () => {
  it("maps invalid_type to Required and preserves custom messages", () => {
    const issues = [
      {
        code: "invalid_type",
        expected: "string",
        received: "undefined",
        path: ["name"],
        message: "Invalid input: expected string, received undefined",
      },
      {
        code: "too_big",
        maximum: 50,
        type: "number",
        inclusive: true,
        exact: false,
        path: ["age"],
        message: "age is too high",
      },
    ] as unknown as z.ZodIssue[];

    const mapped = _errorConverter<{ name: string; age: number }>(issues);
    expect(mapped.name).toBe("Required");
    expect(mapped.age).toBe("age is too high");
  });

  it("handles nested paths", () => {
    const issues = [
      {
        code: "invalid_type",
        expected: "string",
        received: "undefined",
        path: ["user", "name"],
        message: "Invalid input: expected string, received undefined",
      },
    ] as unknown as z.ZodIssue[];

    const mapped = _errorConverter<{ user: { name: string } }>(issues);
    expect(mapped.user).toBeTruthy();
    expect((mapped as any).user.name).toBe("Required");
  });
});