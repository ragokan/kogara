import { ref, watch, type Ref } from "vue";
import type { kogaraFormErrors, kogaraFormOptions } from "./types";
import { _validateForm } from "./internal/validate";

export const useForm = <Values extends object = {}>(options: kogaraFormOptions<Values> = {}) => {
  const { initialValues = {}, validators = {}, validateOnChange = true } = options;
  let _isValidated = false;

  const values = ref<Values>(initialValues as Values);
  const errors = ref<kogaraFormErrors<Values>>({});

  const loading = ref(false);

  const _validate = () => {
    const status = _validateForm(values, errors as Ref<kogaraFormErrors<Values>>, validators);
    if (!_isValidated && !status) {
      _isValidated = true;
    }
    return status;
  };

  if (validateOnChange) {
    watch(
      values.value,
      () => {
        if (!_isValidated) return;
        _validate();
      },
      { deep: true }
    );
  }

  const submit = async () => {
    if (_validate() && options.onSubmit) {
      loading.value = true;
      try {
        await options.onSubmit(values.value);
      } catch (error) {
        throw error;
      } finally {
        loading.value = false;
      }
    }
  };

  return { loading, values, errors, submit };
};
