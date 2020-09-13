import parse from 'html-react-parser'
import { AllHtmlEntities } from 'html-entities'
import sanitizeHtml from 'sanitize-html'
import truncate from 'html-truncate'
import stringHelper from './string'
import emojiHelper from './emoji'

const IFRAME_WHITELIST = ['www.youtube.com', 'player.vimeo.com']
const IMAGE_BLACKLIST = []

const shortDescriptionSanitizeOptions = {
  allowedTags: ['br', 'p', 'b'],
  allowedAttributes: {}
}

const sanitizeHtmlOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'span', 'br']),
  allowedAttributes: {
    iframe: [
      'width',
      'height',
      'src',
      'allowfullscreen',
      'allow',
      'frameborder'
    ],
    a: ['href', 'name', 'target'],
    img: ['src']
  },
  allowedIframeHostnames: IFRAME_WHITELIST,
  parser: {
    decodeEntities: true,
    lowerCaseTags: true
  },
  allowedSchemesByTag: {
    img: ['https']
  },
  allowedClasses: {
    div: ['ql-video', 'ql-video-iframe', 'ql-image']
  },
  exclusiveFilter: frame => {
    switch (frame.tag) {
      case 'img':
        //if not exits src then remove item
        if (!frame.attribs.src) {
          return true
        }
        //get src images
        const imgSrc = frame.attribs.src.toString()
        //check src include https
        if (!imgSrc.startsWith('https://')) {
          return true
        }
        //if include then check domain include in blacklist
        //get domain include in back list
        const validImgSrc = IMAGE_BLACKLIST.some(domain => {
          const regexDomainImg = new RegExp(
            `^(https?:\/\/(.+?\.)?${domain.replace('.', `\.`)})`
          )
          return regexDomainImg.test(imgSrc)
        })
        //return
        return !frame.attribs.src.trim() || validImgSrc

      case 'iframe':
        if (!frame.attribs.src) {
          return true
        }
        return !frame.attribs.src.trim()
      default:
        break
    }
  }
}

export default {

  entityEncodeContent(content) {
    return content
      ? AllHtmlEntities.encode(content)
      : null
  },

  entityDecodeContent(content) {
    return content
      ? AllHtmlEntities.decode(content)
      : null
  },

  encodeContent(content) {
    const contentRemoveEmptyTags = stringHelper.replaceHtmlEditor(content)
    return stringHelper.removeEscapeCharacter(
      this.entityEncodeContent(contentRemoveEmptyTags))
  },

  removeXssContent(content) {
    if (!content) {
      return null
    }

    return parse(sanitizeHtml(stringHelper.removeDuplicateBrTags(content),
      sanitizeHtmlOptions))
  },

  decodeContent(content) {
    return content
      ? AllHtmlEntities.decode(emojiHelper.emojiParser(content))
      : null
  },

  parseHtmlTitle(content) {
    const contentDecode = this.entityDecodeContent(
      emojiHelper.emojiParser(content))
    return contentDecode
      ? this.removeXssContent(contentDecode)
      : null
  },

  parseHtmlContent(content) {
    return content
      ? this.removeXssContent(this.decodeContent(content))
      : null
  },

  truncateHtmlContent(content, characterCount) {
    if (!content) {
      return null
    }

    const contentWithoutBBCode = this.decodeContent(content)

    const truncateHtmlWithoutXss = sanitizeHtml(
      contentWithoutBBCode,
      shortDescriptionSanitizeOptions
    )

    if (!truncateHtmlWithoutXss || truncateHtmlWithoutXss.length === 0) {
      return null
    }

    // remove multi br to sign br
    const truncateHtml = truncate(truncateHtmlWithoutXss, characterCount, {
      ellipsis: '...'
    })

    return stringHelper.removeDuplicateBrTags(truncateHtml)
  }
}