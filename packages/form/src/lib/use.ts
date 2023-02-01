import { ref, watch, type Ref } from "vue";
import type { KogaraFormErrors, KogaraFormOptions } from "./types";
import { _validateForm } from "./internal/validate";

export function useForm<Values extends object = {}>(options: KogaraFormOptions<Values> = {}) {
  const { initialValues = {}, validateOnChange = true, onError, onSubmit, schema } = options;
  let _isValidated = false;

  const values = ref(initialValues) as Ref<Values>;
  const errors = ref({}) as Ref<KogaraFormErrors<Values>>;

  const loading = ref(false);

  function _validate() {
    if (!schema) {
      return true;
    }
    const valid = _validateForm<Values>(values, schema, errors);
    if (!_isValidated && !valid) {
      _isValidated = true;
    }
    if (!valid && onError) {
      onError(errors.value);
    }
    return valid;
  }

  if (validateOnChange) {
    watch(
      values.value,
      () => {
        if (!_isValidated) {
          return;
        }
        _validate();
      },
      { deep: true }
    );
  }

  async function submit() {
    if (_validate() && onSubmit) {
      loading.value = true;
      try {
        await onSubmit(values.value);
      } finally {
        loading.value = false;
      }
    }
  }

  return { loading, values, errors, submit };
}
