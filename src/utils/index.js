import React, { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'
import { Icon } from 'antd'
import _ from 'lodash'
import { enumType } from '../constants'
import auth from '../services/auth'
import chart from './chart'
import string from './string'
import object from './object'
import number from './number'
import { errorCode } from '../constants/error'

export { default as imageUtils } from './image'
export { default as urlUtils } from './url'

const utils = {
  getButtonText(buttonType, isMobile, isHiddenIcon) {
    let textButton = null
    let iconButton = ''
    if (buttonType) {
      switch (buttonType) {
        case enumType.buttonType.Cancel:
          textButton = (
            <FormattedMessage id="Button.Cancel" defaultMessage="Cancel"/>
          )
          iconButton = <Icon type="close"/>
          break
        case enumType.buttonType.Suspend:
          textButton = (
            <FormattedMessage id="Button.Suspend" defaultMessage="Suspend"/>
          )
          iconButton = <Icon type="minus-circle"/>
          break
        case enumType.buttonType.Ignore:
          textButton = (
            <FormattedMessage id="Button.Ignore" defaultMessage="Ignore"/>
          )
          iconButton = <Icon type="stop"/>
          break
        case enumType.buttonType.GoToPost:
          textButton = (
            <FormattedMessage id="Button.GoToPost" defaultMessage="Go To Post"/>
          )
          iconButton = <Icon type="right-circle"/>
          break
        case enumType.buttonType.Resume:
          textButton = (
            <FormattedMessage id="Button.Resume" defaultMessage="Resume"/>
          )
          iconButton = <Icon type="redo"/>
          break
        case enumType.buttonType.Create:
          textButton = (
            <FormattedMessage id="Button.Create" defaultMessage="Create"/>
          )
          iconButton = <Icon type="plus"/>
          break
        case enumType.buttonType.Change:
          textButton = (
            <FormattedMessage id="Button.ChangePassword"
                              defaultMessage="Change Password"/>
          )
          iconButton = <Icon type="barcode"/>
          break
        case enumType.buttonType.Delete:
          textButton = (
            <FormattedMessage
              id="Button.Delete"
              defaultMessage="Delete"/>
          )
          iconButton = <Icon type="delete"/>
          break
        case enumType.buttonType.Remove:
          textButton = (
            <FormattedMessage
              id="Button.Remove"
              defaultMessage="Remove"/>
          )
          iconButton = <Icon type="delete"/>
          break
        case enumType.buttonType.Edit:
          textButton = (
            <FormattedMessage id="Button.Edit" defaultMessage="Edit"/>
          )
          iconButton = <Icon type="edit"/>
          break
        case enumType.buttonType.Back:
          textButton = (
            <FormattedMessage id="Button.Back" defaultMessage="Back"/>
          )
          iconButton = <Icon type="double-left"/>
          break
        case enumType.buttonType.Complete:
          textButton = (
            <FormattedMessage id="Button.Complete" defaultMessage="Complete"/>
          )
          iconButton = <Icon type="check"/>
          break
        case enumType.buttonType.Save:
          textButton = (
            <FormattedMessage id="Button.Save" defaultMessage="Save"/>
          )
          iconButton = <Icon type="save"/>
          break
        case enumType.buttonType.Role:
          textButton = (
            <FormattedMessage id="Button.Role" defaultMessage="Role"/>
          )
          iconButton = <Icon type="property-safety"/>
          break
        case enumType.buttonType.Draft:
          textButton = (
            <FormattedMessage
              id="Button.SaveAsDraft"
              defaultMessage="Save as draft"
            />
          )
          iconButton = <Icon type="snippets"/>
          break
        case enumType.buttonType.Confirm:
          textButton = (
            <FormattedMessage id="Button.Confirm" defaultMessage="Confirm"/>
          )
          iconButton = <Icon type="check"/>
          break
        case enumType.buttonType.Close:
          textButton = (
            <FormattedMessage id="Button.Close" defaultMessage="Close"/>
          )
          iconButton = <Icon type="close"/>
          break
        case enumType.buttonType.Profile:
          textButton = (
            <FormattedMessage id="Button.Profile" defaultMessage="OpenProfile"/>
          )
          iconButton = <Icon type="profile"/>
          break
        case enumType.buttonType.PostList:
          textButton = (
            <FormattedMessage id="Button.PostList" defaultMessage="Post Lists"/>
          )
          iconButton = <Icon type="bars"/>
          break
        case enumType.buttonType.CommentList:
          textButton = (
            <FormattedMessage id="Button.CommentList"
                              defaultMessage="Comment Lists"/>
          )
          iconButton = <Icon type="bars"/>
          break
        case enumType.buttonType.Accept:
          textButton = (
            <FormattedMessage
              id="Button.AcceptAction"
              defaultMessage="Accept"
            />
          )
          iconButton = <Icon type="check"/>
          break
        case enumType.buttonType.SaveAndConfirm:
          textButton = (
            <FormattedMessage
              id="Button.SaveAndConfirm"
              defaultMessage="Save And Confirm"
            />
          )
          iconButton = <Icon type="check-circle"/>
          break
        case enumType.buttonType.Adjustment:
          textButton = (
            <FormattedMessage
              id="Button.Adjustment"
              defaultMessage="Adjustment"
            />
          )
          iconButton = <Icon type="sync"/>
          break
        case enumType.buttonType.Search:
          textButton = (
            <FormattedMessage
              id="Button.Search"
              defaultMessage="Search"/>
          )
          iconButton = <Icon type="search"/>
          break
        case enumType.buttonType.Hide:
          textButton = (
            <FormattedMessage
              id="Button.Hide"
              defaultMessage="Hide"/>
          )
          iconButton = <Icon type="eye"/>
          break
        case enumType.buttonType.RestoreSuspend:
          textButton = (
            <FormattedMessage
              id="Button.Restore"
              defaultMessage="Restore"
            />
          )
          iconButton = <Icon type="minus-circle"/>
          break
        case enumType.buttonType.RestoreLock:
          textButton = (
            <FormattedMessage
              id="Button.Restore"
              defaultMessage="Restore"
            />
          )
          iconButton = <Icon type="unlock"/>
          break
        case enumType.buttonType.Restore:
          textButton = (
            <FormattedMessage
              id="Button.Restore"
              defaultMessage="Restore"
            />
          )
          iconButton = <Icon type="eye-invisible"/>
          break
        case enumType.buttonType.Add:
          textButton = <FormattedMessage
            id="Button.Add"
            defaultMessage="Add"
          />
          iconButton = <Icon type="plus"/>
          break
        case enumType.buttonType.Preview:
          textButton = (
            <FormattedMessage
              id="Button.Preview"
              defaultMessage="Preview"/>
          )
          iconButton = <Icon type="eye"/>
          break
        case enumType.buttonType.Lock:
          textButton = (
            <FormattedMessage
              id="Button.Lock"
              defaultMessage="Lock"/>
          )
          iconButton = <Icon type="lock"/>
          break
        case enumType.buttonType.Unlock:
          textButton = (
            <FormattedMessage
              id="Button.Unlock"
              defaultMessage="Unlock"/>
          )
          iconButton = <Icon type="unlock"/>
          break
        case enumType.buttonType.ContentGroupCategory:
          textButton = (
            <FormattedMessage
              id="Button.ContentGroupCategory"
              defaultMessage="Category"
            />
          )
          iconButton = <Icon type="apartment"/>
          break
        case enumType.buttonType.ContentGroupUser:
          textButton = (
            <FormattedMessage
              id="Button.ContentGroupUser"
              defaultMessage="Member"
            />
          )
          iconButton = <Icon type="usergroup-add"/>
          break
        case enumType.buttonType.Submit:
          textButton = (
            <FormattedMessage
              id="Button.Submit"
              defaultMessage="Submit"
            />
          )
          iconButton = <Icon type="upload"/>
          break
        case enumType.buttonType.Revert:
          textButton = (
            <FormattedMessage
              id="Button.Revert"
              defaultMessage="Revert"
            />
          )
          iconButton = <Icon type="undo"/>
          break
        case enumType.buttonType.Reject:
          textButton = (
            <FormattedMessage
              id="Button.Reject"
              defaultMessage="Reject"
            />
          )
          iconButton = <Icon type="close"/>
          break
        case enumType.buttonType.Publish:
          textButton = (
            <FormattedMessage
              id="Button.Publish"
              defaultMessage="Publish"
            />
          )
          iconButton = <Icon type="global"/>
          break
        case enumType.buttonType.History:
          textButton = (
            <FormattedMessage
              id="Button.History"
              defaultMessage="History"
            />
          )
          iconButton = <Icon type="history"/>
          break
        case enumType.buttonType.Setting:
          textButton = (
            <FormattedMessage
              id="Button.Setting"
              defaultMessage="Setting"
            />
          )
          iconButton = <Icon type="setting"/>
          break
        case enumType.buttonType.LockedSelected:
          textButton = (
            <FormattedMessage
              id="Button.LockSelected"
              defaultMessage="Lock Selected"
            />
          )
          iconButton = <Icon type='lock'/>
          break
        case enumType.buttonType.HideSelected:
          textButton = (
            <FormattedMessage
              id="Button.HideSelected"
              defaultMessage="Hide Selected"/>
          )
          iconButton = <Icon type="eye"/>
          break
        case enumType.buttonType.SuspendedSelected:
          textButton = (
            <FormattedMessage
              id="Button.SuspendSelected"
              defaultMessage="Suspend Selected"/>
          )
          iconButton = <Icon type="minus-circle"/>
          break
        case enumType.buttonType.RestoreSelected:
          textButton = (
            <FormattedMessage
              id="Button.RestoreSelected"
              defaultMessage="Restore Selected"
            />
          )
          iconButton = <Icon type="undo"/>
          break
        default:
          textButton = null
          iconButton = null
      }
    }

    return isMobile ? (
      iconButton
    ) : isHiddenIcon ? textButton : (
      <Fragment>
        {iconButton}
        {textButton}
      </Fragment>
    )
  },

  checkFieldError(errors, touched, field) {
    return !!(errors[field] && touched[field])
  },

  getSortDirection(searchField, fieldName) {
    if (searchField && searchField.sortField === fieldName) {
      return searchField.sortDirection
    }
    return false
  },

  getConfirmModalInfo(confirmType, objectName) {
    switch (confirmType) {
      case enumType.confirmType.Delete:
        return {
          title: <FormattedMessage
            id="Delete.PageIndex"
            defaultMessage={`Delete {value}`}
            values={{
              value: objectName
            }}
          />,
          content: <FormattedMessage
            id="Confirm.DeleteContent"
            defaultMessage={`Do you want to delete this {value}?`}
            values={{
              value: objectName
            }}
          />
        }
      case enumType.confirmType.Publish:
        return {
          title: <FormattedMessage
            id="Publish.PageIndex"
            defaultMessage={`Publish {value}`}
            values={{
              value: objectName
            }}
          />,
          content: <FormattedMessage
            id="Confirm.PublishedContent"
            defaultMessage={`Do you want to publish this {value}?`}
            values={{
              value: objectName
            }}
          />
        }
      case enumType.confirmType.Hide:
        return {
          title: <FormattedMessage
            id="Hide.PageIndex"
            defaultMessage={`Hide {value}`}
            values={{ value: objectName }}
          />,
          content: <FormattedMessage
            id="Confirm.HideContent"
            defaultMessage={`Are you sure want to hide this {value}?`}
            values={{ value: objectName }}
          />
        }
      case enumType.confirmType.Restore:
        return {
          title: <FormattedMessage
            id="Restore.PageIndex"
            defaultMessage={`Restore {value}`}
            values={{ value: objectName }}
          />,
          content: <FormattedMessage
            id="Confirm.RestoreContent"
            defaultMessage={`Are you sure want to restore this {value}?`}
            values={{ value: objectName }}
          />
        }
      case enumType.confirmType.Remove:
        return {
          title: <FormattedMessage
            id="Remove.PageIndex"
            defaultMessage={`Remove {value}`}
            values={{ value: objectName }}
          />,
          content: <FormattedMessage
            id="Confirm.RemoveContent"
            defaultMessage={`Are you sure want to remove this {value}?`}
            values={{ value: objectName }}
          />
        }
      case enumType.confirmType.Suspend:
        return {
          title: <FormattedMessage
            id="Suspend.PageIndex"
            defaultMessage={`Suspend {value}`}
            values={{ value: objectName }}
          />,
          content: <FormattedMessage
            id="Confirm.SuspendContent"
            defaultMessage={`Are you sure want to suspend this {value}?`}
            values={{ value: objectName }}
          />
        }
      case enumType.confirmType.Reset:
        return {
          title: <FormattedMessage
            id="Reset.PageIndex"
            defaultMessage={`Reset {value}`}
            values={{ value: objectName }}
          />,
          content: <FormattedMessage
            id="Confirm.ResetContent"
            defaultMessage={`Are you sure want to reset this {value}?`}
            values={{ value: objectName }}
          />
        }
      case enumType.confirmType.Lock:
        return {
          title: <FormattedMessage
            id="Lock.PageIndex"
            defaultMessage={`Lock {value}`}
            values={{ value: objectName }}
          />,
          content: <FormattedMessage
            id="Confirm.LockContent"
            defaultMessage={`Are you sure want to lock this {value}?`}
            values={{ value: objectName }}
          />
        }
      case enumType.confirmType.Ignore:
        return {
          title: <FormattedMessage
            id="Ignore.PageIndex"
            defaultMessage={`Ignore {value}`}
            values={{ value: objectName }}
          />,
          content: <FormattedMessage
            id="ConfirmIgnoreContent"
            defaultMessage={`Are you sure want to ignore this {value}?`}
            values={{ value: objectName }}
          />
        }
      case enumType.confirmType.HideSelected:
        return {
          title: <FormattedMessage
            id="HideSelected.PageIndex"
            defaultMessage={`Hide selected {value}`}
            values={{ value: objectName }}
          />,
          content: <FormattedMessage
            id="Confirm.HideSelected"
            defaultMessage={`Are you sure want to hide these {value}?`}
            values={{ value: objectName }}
          />
        }
      case enumType.confirmType.SuspendedSelected:
        return {
          title: <FormattedMessage
            id="SuspendedSelected.PageIndex"
            defaultMessage={`Suspend selected {value}`}
            values={{ value: objectName }}
          />,
          content: <FormattedMessage
            id="Confirm.SuspendedSelected"
            defaultMessage={`Are you sure want to suspend these {value}?`}
            values={{ value: objectName }}
          />
        }
      case enumType.confirmType.LockedSelected:
        return {
          title: <FormattedMessage
            id="LockedSelected.PageIndex"
            defaultMessage={`Lock selected {value}`}
            values={{ value: objectName }}
          />,
          content: <FormattedMessage
            id="Confirm.LockedSelected"
            defaultMessage={`Are you sure want to lock these {value}?`}
            values={{ value: objectName }}
          />
        }
      case enumType.confirmType.RestoreSelected:
        return {
          title: <FormattedMessage
            id="RestoreSelected.PageIndex"
            defaultMessage={`Restore selected {value}`}
            values={{ value: objectName }}
          />,
          content: <FormattedMessage
            id="Confirm.RestoreSelected"
            defaultMessage={`Are you sure want to restore these {value}?`}
            values={{ value: objectName }}
          />
        }
      default:
        return {
          title: null,
          content: null
        }
    }
  },

  getErrorCode(error) {
    let field = null
    let message = null
    let extensionInfo = null
    if (error && error.extensions) {
      const { extensions } = error
      field = extensions.code
      extensionInfo = _.omit(extensions, ['code', 'exception'])

      switch (field) {
        case errorCode.LOCKED_ACCOUNT:
          message = <FormattedMessage
            id="Error.Submit.LockedAccount"
            defaultMessage="This account has been locked."
          />
          break
        case errorCode.SUSPENDED_ACCOUNT:
          message = <FormattedMessage
            id="Error.Submit.SuspendedAccount"
            defaultMessage="This account has been suspended."
          />
          break
        case errorCode.UNAUTHENTICATED:
          message = <FormattedMessage
            id="Error.Submit.UnAuthenticated"
            defaultMessage="This account has not been authenticated."
          />
          break
        case errorCode.SPAM_ERROR:
          message = <FormattedMessage
            id="Error.Submit.SpamError"
            defaultMessage="This comment was classified as SPAM and may not be created."
          />
          break
        case errorCode.CONTAIN_BAD_WORDS:
          message = <FormattedMessage
            id="Error.Submit.BadWord"
            defaultMessage="This content contain bad words."
          />
          break
        case errorCode.NAME_EXIST:
          message = <FormattedMessage
            id="Error.Submit.NameExist"
            defaultMessage="This name has been existed."
          />
          break
        case errorCode.SLUG_EXIST:
          message = <FormattedMessage
            id="Error.Submit.SlugExist"
            defaultMessage="This slug has been existed."
          />
          break
        case errorCode.CODE_EXIST:
          message = <FormattedMessage
            id="Error.Submit.CodeExist"
            defaultMessage="This code has been existed."
          />
          break
        case errorCode.FLOW_DUPLICATE:
          message = <FormattedMessage
            id="Error.Submit.FlowDuplicate"
            defaultMessage="This workflow has been existed."
          />
          break
        case errorCode.USERNAME_EXIST:
          message = <FormattedMessage
            id="Error.Submit.Username"
            defaultMessage="This username has been existed."
          />
          break
        case errorCode.EMAIL_EXIST:
          message = <FormattedMessage
            id="Error.Submit.Email"
            defaultMessage="This email has been existed."
          />
          break
        case errorCode.BANNED_WORD_DUPLICATE:
          message = <FormattedMessage
            id="Error.Submit.BannedWordDuplicate"
            defaultMessage="This is an already registered word"
          />
          break
        case errorCode.BAD_USER_INPUT:
          message = <FormattedMessage
            id="Error.Submit.BadUsernameInput"
            defaultMessage="No user found with this login credentials."
          />
          break
        case errorCode.CANNOT_ACCESS:
          message = <FormattedMessage
            id="Error.Submit.CannotAccess"
            defaultMessage="This account cannot access the system."
          />
          break
        case errorCode.TITLE_EXIST:
          message = <FormattedMessage
            id="Error.Submit.TitleExist"
            defaultMessage="This title has been exist."
          />
          break
        case errorCode.DURATION_EXIST:
          message = <FormattedMessage
            id="Error.Submit.DurationExist"
            defaultMessage="This duration has been duplicated."
          />
          break
        case errorCode.HIDDEN:
          message = <FormattedMessage
            id="Error.Submit.Hidden"
            defaultMessage="This instance is hidden"
          />
          break
        case errorCode.NOT_FOUND:
          message = <FormattedMessage
            id="Error.Submit.NotFound"
            defaultMessage="This instance cannot be found."
          />
          break
        case errorCode.PROMO_CODE_EXIST:
          message = <FormattedMessage
            id="Error.Submit.PromoCodeExist"
            defaultMessage="This code has been exist."
          />
          break
        case errorCode.PHONE_NUMBER_EXIST:
          message = <FormattedMessage
            id="Error.Submit.PhoneNumberExist"
            defaultMessage="This phone number has been exist."
          />
          break
        default:
          break
      }
    }

    return {
      field,
      message,
      extensionInfo: extensionInfo
    }
  },

  generateCode(length = 6) {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < length; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  },

  getColorFromCharacter(character) {
    switch (character.toUpperCase()) {
      case 'A':
        return '#003b70'
      case 'B':
        return '#2d9cff'
      case 'C':
        return '#f7534f'
      case 'D':
        return '#f9c441'
      case 'E':
        return '#6496ed'
      case 'F':
        return '#00a79d'
      case 'G':
        return '#0093ae'
      case 'H':
        return '#f21914'
      case 'I':
        return '#ffa9a9'
      case 'J':
        return '#67c1e4'
      case 'K':
        return '#9fcc48'
      case 'L':
        return '#f37365'
      case 'M':
        return '#0071b8'
      case 'N':
        return '#005ece'
      case 'O':
        return '#7adddd'
      case 'P':
        return '#ffab54'
      case 'Q':
        return '#49eba0'
      case 'R':
        return '#52cb14'
      case 'S':
        return '#847dff'
      case 'T':
        return '#4d3ff4'
      case 'U':
        return '#79ae12'
      case 'V':
        return '#237a75'
      case 'W':
        return '#0091c9'
      case 'X':
        return '#a721b6'
      case 'Y':
        return '#fc61d4'
      case 'Z':
        return '#cb215a'
      case '0':
        return '#619cfc'
      case '1':
        return '#3a5cf8'
      case '2':
        return '#7bcec9'
      case '3':
        return '#cb2182'
      case '4':
        return '#703aff'
      case '5':
        return '#2135cb'
      case '6':
        return '#00d6be'
      case '7':
        return '#cba421'
      case '8':
        return '#e8ca63'
      case '9':
        return '#990000'
      default:
        return 'rgb(185, 185, 185)'
    }
  },

  getAvatarBackground(username) {
    if (!username) {
      return {
        username: null,
        background: 'rgb(185, 185, 185)'
      }
    }

    const abbrUsername = string.getAbbreviate(username)
    const abbr = abbrUsername.charAt('0')
    return {
      username: abbr,
      background: this.getColorFromCharacter(abbr)
    }
  },

  getDiscountCategory(selectedList, category) {
    if (Object.keys(category).length === selectedList.length)
      return `All`
    else
      return selectedList.map((v) => (
        category[v]
      )).join(', ')
  }
}

export default {
  ...utils,
  ...auth,
  ...chart,
  ...string,
  ...object,
  ...number
}
