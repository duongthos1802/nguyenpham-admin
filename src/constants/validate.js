import {FormattedMessage} from 'react-intl'
import React from 'react'

export const validateError = {
  required: (
    <FormattedMessage
      id="Validate.Required"
      defaultMessage="This field is required."
    />
  ),
  email: (
    <FormattedMessage
      id="Validate.Email"
      defaultMessage="Please enter a valid email address."
    />
  ),
  url: (
    <FormattedMessage
      id="Validate.Url"
      defaultMessage="Please enter a valid URL."
    />
  ),
  confirmPassword: (
    <FormattedMessage
      id="Validate.ConfirmPassword"
      defaultMessage="Password do not match"
    />
  ),
  passwordFormat: (
    <FormattedMessage
      id="Validate.PasswordFormat"
      defaultMessage="Use 6 or more characters with a mix of letters, numbers & symbols"
    />
  ),
  codeFormat: (
    <FormattedMessage
      id="Validate.CodeFormat"
      defaultMessage="Do not use symbols and space."
    />
  ),
  duplicate: (
    <FormattedMessage id="Validate.Duplicate" defaultMessage="Item exits"/>
  ),
  duplicateGroup: (
    <FormattedMessage
      id="Validate.DuplicateGroup"
      defaultMessage="Groups must not be the same."
    />
  ),
  upperCase: (
    <FormattedMessage
      id="Validate.UpperCase"
      defaultMessage="Only English Capitals."
    />
  ),
  nameCommunity: (
    <FormattedMessage
      id="Validate.NameCommunity"
      defaultMessage="Only insert characters and numbers."
    />
  ),
  validateUploadPopup: (
    <FormattedMessage
      id="Validate.Error.UploadPopup"
      defaultMessage="Please make sure you do not have any missing content."
    />
  ),
  validateContentGroup: (
    <FormattedMessage
      id="Validate.Error.ValidateContentGroup"
      defaultMessage="You must select content group."
    />
  ),
  lengthString: (fieldName, length) => (
    <FormattedMessage
      id="Validate.LengthString"
      defaultMessage={`{fieldName} length must be equal {length}`}
      values={{
        fieldName: fieldName,
        length: length
      }}
    />
  ),
  selection: (fieldName) => (
    <FormattedMessage
      id="Validate.Selection"
      defaultMessage={`You must select {fieldName}`}
      values={{
        fieldName: fieldName
      }}
    />
  ),
  maximumLengthString: (fieldName, maximum) => (
    <FormattedMessage
      id="Validate.MaximumLengthString"
      defaultMessage={`{fieldName} length must be smaller or equal {length}`}
      values={{
        fieldName: fieldName,
        length: maximum
      }}
    />
  ),
  minimumLengthString: (fieldName, minimum) => (
    <FormattedMessage
      id="Validate.MinimumLengthString"
      defaultMessage={`{fieldName} length must be greater or equal {length}`}
      values={{
        fieldName: fieldName,
        length: minimum
      }}
    />
  ),
  minimumSelection: (fieldName, minimum) => (
    <FormattedMessage
      id="Validate.MinimumSelection"
      defaultMessage={`You must select at least {minimum} {fieldName}`}
      values={{
        minimum: minimum,
        fieldName: fieldName
      }}
    />
  ),
  maximumSelection: (fieldName, maximum) => (
    <FormattedMessage
      id="Validate.MinimumSelection"
      defaultMessage={`You can only select maximum {maximum} {fieldName}`}
      values={{
        maximum: maximum,
        fieldName: fieldName
      }}
    />
  ),
  minimumNumber: (fieldNumber, minimum) => (
    <FormattedMessage
      id="Validate.MinimumNumber"
      defaultMessage={`{fieldName} must be greater than {minimum}`}
      values={{
        fieldName: fieldNumber,
        minimum: minimum
      }}
    />
  ),
  maximumNumber: (fieldNumber, maximum) => (
    <FormattedMessage
      id="Validate.MaximumNumber"
      defaultMessage={`{fieldName} must be smaller than {minimum}`}
      values={{
        fieldName: fieldNumber,
        minimum: maximum
      }}
    />
  ),
  number: (
    <FormattedMessage
      id="Validate.Number"
      defaultMessage="Please enter a valid number."
    />
  ),
  endDate: (
    <FormattedMessage
      id="Validate.EndDate"
      defaultMessage="End date must be greater than start date."
    />
  ),
  withoutSpecialCharacter: (fieldName) => (
    <FormattedMessage
      id="Validate.WithoutSpecialCharacter"
      defaultMessage={`{fieldName} must not contain special character.`}
      values={{
        fieldName: fieldName
      }}
    />
  ),
  withoutEmoji: (fieldName) => (
    <FormattedMessage
      id="Validate.WithoutEmoji"
      defaultMessage={`{fieldName} must not contain emoji.`}
      values={{
        fieldName: fieldName
      }}
    />
  ),
  notSameField: (fieldName, fieldCompare) => (
    <FormattedMessage
      id="Validate.NotSameField"
      defaultMessage={`{fieldName} must not be the same {fieldCompare}.`}
      values={{
        fieldName: fieldName,
        fieldCompare: fieldCompare
      }}
    />
  )
}

export const errorType = {
  BAD_EMAIL_INPUT: 'BAD_EMAIL_INPUT',
  BAD_USERNAME_INPUT: 'BAD_USER_INPUT',
  UNAUTHENTICATED: 'UNAUTHENTICATED',
  CANNOT_ACCESS: 'CANT_ACCESS',
  BANNED_WORD_DUPLICATE: 'BANNED_WORD_DUPLICATE',
  ACCESS_AUTHORITY_NAME_DUPLICATE: 'ACCESS_AUTHORITY_NAME_DUPLICATE',
  ACCESS_AUTHORITY_CODE_DUPLICATE: 'ACCESS_AUTHORITY_CODE_DUPLICATE'
}

export default {
  validateError,
  errorType
}
