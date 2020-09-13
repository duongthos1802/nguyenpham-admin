import React from 'react'
import bbob from '@bbob/core'
import {createPreset} from '@bbob/preset'
import {render} from '@bbob/html'
import _ from 'lodash'
import {stringHelper} from './index'

const getUniqAttr = (attrs) => {
  Object
    .keys(attrs)
    .reduce((res, key) => (attrs[key] === key ? attrs[key] : null), null)
}

const reduceAttr = (attrs) => {
  return _.reduce(
    attrs,
    (result, value, key) => {
      (result['attr'] || (result['attr'] = [])).push(value)
      return result.attr
    },
    {}
  )
}

const reduceContent = (content) => {
  return _.reduce(
    content,
    (result, value, key) => {
      (result['content'] || (result['content'] = [])).push(value)
      return result.content
    },
    {}
  )
}

const renderHref = (attrs, content) => {
  if (Object.keys(reduceAttr(attrs)).length === 0 && Array.isArray(content)) {
    return content.join('')
  } else {
    return reduceAttr(attrs)[0]
  }
}

const getVideoData = (value) => {
  if (!value) return null
  const videoType = value.split(';')[0]
  const videoId = value.split(';')[1]

  return {
    videoType,
    videoId
  }
}

const regexDomainGooglePhotos = new RegExp(`https?:\\/\\/.*?.googleusercontent.com\\/*`)

const preset = createPreset({
  // ...tags,
  b: (node) => ({
    tag: 'b',
    attrs: {},
    content: node.content
  }),
  i: (node) => ({
    tag: 'i',
    attrs: {},
    content: node.content
  }),
  u: (node) => ({
    tag: 'u',
    attrs: {},
    content: node.content
  }),
  color: (node) => ({
    tag: 'div',
    // attrs: {
    //   style: `color: ${reduceAttr(node.attrs).attr[0]}`
    // },
    content: node.content
  }),
  img: (node, {render}) => {
    if (node.content.length === 1) {
      return {
        tag: 'img',
        attrs: {
          alt: 'webtretho',
          title: 'webtretho',
          src: node.content && render(regexDomainGooglePhotos.test(node.content[0]) ? node.content[0] + '=w725' : node.content[0]),
        },
        content: null
      }
    } else {
      return null
    }
  },
  alt: (node, {render}) => {
    return {
      tag: 'img',
      attrs: {
        src: getUniqAttr(node.attrs) ? render(getUniqAttr(node.attrs + '=w725')) : render(node.content[0] + '=w725'),
        alt: node.content,
        title: node.content
      }
    }
  },
  center: (node) => ({
    tag: 'div',
    attrs: {
      class: 'text-center'
    },
    content: node.content
  }),
  left: (node) => ({
    tag: 'div',
    attrs: {
      class: `text-left`
    },
    content: node.content
  }),
  right: (node) => ({
    tag: 'div',
    attrs: {
      class: `text-right`
    },
    content: node.content
  }),
  indent: (node) => ({
    tag: 'div',
    attrs: {
      class: `ml__40`
    },
    content: node.content
  }),
  url: (node) => {
    const domain = stringHelper.getDomainFromUrl(reduceAttr(node.attrs)
      ? reduceAttr(node.attrs)[0]
      : reduceContent(node.content)[0])
    if (!stringHelper.checkDeniedHost(domain)) {
      return {
        tag: 'a',
        attrs: {
          href: renderHref(node.attrs, node.content),
          target: '_blank',
          rel: 'nofollow'
        },
        content: node.content
      }
    } else {
      return null
    }
  },
  email: (node) => ({
    tag: 'a',
    attrs: {
      href: getUniqAttr(node.attrs) ? `mailto:${getUniqAttr(node.attrs)}` : `mailto:${render(node.content)}`
    },
    content: node.content
  }),
  quote: (node) => ({
    tag: 'blockquote',
    attrs: {},
    content: node.content
  }),
  scroll_url: (node) => ({
    tag: 'a',
    attrs: {
      href: getUniqAttr(node.attrs) ? getUniqAttr(node.attrs) : render(node.content)
    },
    content: node.content
  }),
  fbi: (node) => ({
    tag: 'div',
    attrs: {
      style: 'display: none'
    },
    content: node.content
  }),
  HRVSHOPNOW: (node) => ({
    tag: 'iframe',
    attrs: {
      class: `haravan-widget`,
      frameborder: '0',
      scrolling: 'no',
      src: ' ',
      width: '120',
      height: '50'
    },
    content: null
  }),
  HRVSHOPGROUP: (node) => ({
    tag: 'iframe',
    attrs: {
      class: `haravan-widget-gallery`,
      frameborder: '0',
      scrolling: 'no',
      src: ' ',
      width: '120',
      height: '50'
    },
    content: null
  }),
  ref: (node) => ({
    tag: 'div',
    attrs: {
      style: 'display: inline-block'
    },
    content: node.content
  }),
  figure: (node) => ({
    tag: 'div',
    attrs: {},
    content: node.content
  }),
  figcaption: (node) => ({
    tag: 'div',
    attrs: {},
    content: node.content
  }),
  fblive: (node, {render}) => ({
    tag: 'iframe',
    attrs: {
      src: render(node.content),
      width: '400',
      height: '400',
      style: 'border: none; overflow: hidden;width: 400px;height: 400px;',
      scrolling: 'no',
      frameborder: '0',
      allowTransparency: 'true',
      allowFullScreen: 'true'
    },
    content: 'Đang tải...'
  }),
  fblive_full: (node, {render}) => ({
    tag: 'iframe',
    attrs: {
      src: render(node.content),
      width: '50%',
      height: '610px',
      style: 'border: none;overflow: hidden;width: 50%;height: 610px;',
      scrolling: 'no',
      allowTransparency: 'true',
      allowFullScreen: 'true',
      frameborder: '0'
    },
    content: 'Đang tải...'
  }),
  webtrethotv: (node) => {
    return null
    // return {
    //   tag: 'iframe',
    //   attrs: {
    //     style: 'height: 297px; width: 530px; border: none;',
    //     frameborder: '0',
    //     scrolling: 'no',
    //     src: render(node.content),
    //     width: '120',
    //     height: '50'
    //   },
    //   content: null
    // }
  },
  autovideo: (node) => ({
    tag: 'iframe',
    attrs: {
      frameborder: '0',
      scrolling: 'no',
      src: render(node.content),
      width: '560',
      height: '345'
    },
    content: null
  }),
  POLLING: (node) => ({
    tag: 'iframe',
    attrs: {
      src: render(node.content),
      width: '100%',
      height: '1000px'
    },
    content: null
  }),
  imgalt: (node, {render}) => ({
    tag: 'img',
    attrs: {
      src: getUniqAttr(node.attrs) || render(node.content),
      alt: node.content
    },
    content: null
  }),
  // videolink: (node, { render }) => ({
  //   tag: 'a',
  //   attrs: {
  //     href: node.attrs ? getUniqAttr(node.attrs) : render(node.content)
  //   },
  //   content: [
  //     {
  //       tag: 'div',
  //       attrs: {
  //         style: 'display: table-cell; position: relative;'
  //       },
  //       content: [
  //         {
  //           tag: 'img',
  //           attrs: {
  //             src: render(node.content)
  //           },
  //           content: null
  //         },
  //         {
  //           tag: 'div',
  //           attrs: {
  //             style: 'position: absolute; top: 39%; left: 43%;'
  //           },
  //           content: [
  //             {
  //               tag: 'img',
  //               attrs: {
  //                 style: 'width: 68px; height: 50px;',
  //                 src: 'https://img.webtretho.com/images/mobile/youitube%20icon%20play.png'
  //               },
  //               content: null
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //   ]
  // }),
  GOOGLEFORM: (node) => ({
    tag: 'iframe',
    attrs: {
      src: node.content,
      width: '100%',
      height: '200',
      frameborder: '0',
      marginheight: '0',
      marginwidth: '0'
    },
    content: 'Đang tải'
  }),
  VOUCHERFORM: (node) => ({
    tag: 'iframe',
    attrs: {
      src: node.content,
      width: '100%',
      height: '320',
      frameborder: '0',
      allowfullscreen: '',
      target: '_parent',
      style: 'overflow: hidden;'
    },
    content: null
  }),
  video: (node) => {
    const videoData = reduceAttr(node.attrs) && reduceAttr(node.attrs)[0]
      ? getVideoData(reduceAttr(node.attrs)[0])
      : null
    // console.log('videoData....', videoData)
    const videoAttrs = (videoData) => {
      switch (videoData.videoType) {
        case 'youtube':
        case 'youtube_share':
          return {
            title: 'YouTube video player',
            width: '640',
            height: '390',
            frameborder: '0',
            allow: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture',
            allowfullscreen: 'true',
            src: `https://www.youtube.com/embed/${videoData.videoId}`
          }
        case 'vimeo':
          return {
            title: 'Vimeo video player',
            width: '640',
            height: '390',
            frameborder: '0',
            allow: 'autoplay; fullscreen',
            allowfullscreen: 'true',
            src: `https://player.vimeo.com/video/${videoData.videoId}`
          }
        case 'dailymotion':
          return {
            frameborder: '0',
            width: '640',
            height: '390',
            allow: 'autoplay',
            allowfullscreen: 'true',
            src: `https://www.dailymotion.com/embed/video/${videoData.videoId}`
          }
      }
    }
    if (videoData && videoData.videoType) {
      return {
        tag: 'iframe',
        attrs: videoAttrs(videoData),
        content: null
      }
    } else {
      return null
    }
  }
})

export default {
  convertBBCode(content) {
    if (content) {
      return bbob(preset()).process(content, {render}).html.replace(/(?:\r\n|\r|\n)/g, '<br>')
    } else {
      return ''
    }
  }
}
