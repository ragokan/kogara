import { describe, expect, it } from "vitest";
import { minLengthValidator, requiredValidator } from "../dist";
import { useForm } from "../src";

describe("form validation test", () => {
  const { errors, values, submit } = useForm<{ name: string; age: number }>({
    initialValues: {
      name: "",
      age: 0,
    },
    onSubmit: (submitValues) => {
      // we use *value* here because it is a Ref. It is not required in templates
      expect(submitValues).toBe(values.value);
    },
    onError: (errorValues) => {
      expect(errorValues).toBe(errors.value);
    },
    validators: {
      name: minLengthValidator(5, "name is too short"),
      // we can use as many as validator we want, we can also create inline validators
      age: [requiredValidator("age is required"), (age) => (age > 50 ? "age is too high" : undefined)],
    },
  });

  it("name test", async () => {
    submit();
    expect(Object.keys(errors.value).length).toBe(1);
    expect(errors.value.name).toBe("name is too short");
    expect(errors.value.age).toBe(undefined);
  });

  it("age test", async () => {
    values.value.age = 51;
    submit();
    expect(Object.keys(errors.value).length).toBe(2);
    expect(errors.value.name).toBe("name is too short");
    expect(errors.value.age).toBe("age is too high");
  });

  it("pass name test", async () => {
    values.value.name = "hello world!";
    submit();
    expect(Object.keys(errors.value).length).toBe(1);
    expect(errors.value.name).toBe(undefined);
    expect(errors.value.age).toBe("age is too high");
  });
});
