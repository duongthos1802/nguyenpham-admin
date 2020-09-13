import * as Yup from 'yup'
// constant
import {validateError} from '../constants/validate'
// extensions
import {datetimeHelper} from './index'

export default {
  stringRequired: Yup.string()
    .required(validateError.required)
    .typeError(validateError.required)
    .trim(validateError.required),
  string: Yup.string().nullable(),
  numberRequired: Yup.number()
    .required(validateError.required)
    .typeError(validateError.number),
  number: Yup.number().nullable(),
  endDate: Yup.string()
    .required(validateError.required)
    .typeError(validateError.required)
    .test({
      name: 'validate-end-date',
      message: validateError.endDate,
      test: function (value) {
        const startDate = datetimeHelper.initNewVnDateTime(this.parent.startDate, true)
        const endDate = datetimeHelper.initNewVnDateTime(value, true)
        return datetimeHelper.checkIsFutureDate(endDate, startDate)
      }
    }),
  array: Yup.array().nullable(),
  arrayRequired: Yup.array()
    .required(validateError.required)
    .typeError(validateError.required),
  emailRequired: Yup.string()
    .required(validateError.required)
    .typeError(validateError.required)
    .trim(validateError.required)
    .email(validateError.email),
  email: Yup.string()
    .email(validateError.email)
    .nullable(),
  bool: Yup.bool().nullable(),
  objectRequired: Yup.object()
    .required(validateError.required)
    .typeError(validateError.required),
  object: Yup.object().nullable(),
  validateSchema: (schema, content)=> !!schema.isValidSync(content)
}