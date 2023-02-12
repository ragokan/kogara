import { describe, expect, it } from "vitest";
import { z } from "zod";
import { useForm } from "../src";

describe("form validation test", () => {
  const schema = z.object({
    name: z
      .string({ required_error: "name is required" })
      .min(5, "name is too short"),
    age: z.number().max(50, "age is too high"),
  });
  const { errors, values, submit } = useForm({
    schema,
    initialValues: {},
    onSubmit: (submitValues) => {
      // we use *value* here because it is a Ref. It is not required in templates
      expect(submitValues).toBe(values.value);
    },
    onError: (errorValues) => {
      expect(errorValues).toBe(errors.value);
    },
  });

  it("name test", () => {
    submit();
    expect(Object.keys(errors.value).length).toBe(2);
    expect(errors.value.name).toBe("name is required");
    expect(errors.value.age).toBe("Required");
  });

  it("age test", () => {
    values.value.age = 51;
    submit();
    expect(Object.keys(errors.value).length).toBe(2);
    expect(errors.value.name).toBe("name is required");
    expect(errors.value.age).toBe("age is too high");
  });

  it("pass name test", () => {
    values.value.name = "hello world!";
    submit();
    expect(Object.keys(errors.value).length).toBe(1);
    expect(errors.value.name).toBe(undefined);
    expect(errors.value.age).toBe("age is too high");
  });
});
