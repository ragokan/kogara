import { describe, expect, it } from "vitest";
import { useForm } from "../src";

describe("form loading test", () => {
  const { loading, submit } = useForm<{ name: string; age: number }>({
    initialValues: {
      name: "",
      age: 0,
    },
    onSubmit: async (submitValues) => {
      // sleep for a while
      await new Promise((resolve) => setTimeout(resolve, 100));
    },
  });

  it("submits", async () => {
    submit();
    expect(loading.value).toBe(true);
    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(loading.value).toBe(true);
    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(loading.value).toBe(false);
  });
});
