import { ref, watch, type Ref } from "vue";
import type { kogaraFormErrors, kogaraFormOptions } from "./types";
import { _validateForm } from "./internal/validate";

export const useForm = <Values extends object = {}>(options: kogaraFormOptions<Values> = {}) => {
  const {
    initialValues = {},
    validators = {},
    validateOnChange = true,
    onError,
    onSubmit,
  } = options;
  let _isValidated = false;

  const values = ref<Values>(initialValues as Values);
  const errors = ref<kogaraFormErrors<Values>>({});

  const loading = ref(false);

  const _validate = () => {
    const status = _validateForm(values, errors as Ref<kogaraFormErrors<Values>>, validators);
    if (!_isValidated && !status) {
      _isValidated = true;
    }
    if (!status && onError) {
      onError(errors.value);
    }
    return status;
  };

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

  const submit = async () => {
    if (_validate() && onSubmit) {
      loading.value = true;
      try {
        await onSubmit(values.value);
      } finally {
        loading.value = false;
      }
    }
  };

  return { loading, values, errors, submit };
};
