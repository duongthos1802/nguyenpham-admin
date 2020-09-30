import React from 'react'
import { openUploadImage } from './plugins/FileUpload'
import { openInsertVideo } from './plugins/VideoYoutube'
import { enumType } from '../constants'

export const addPlugins = (editor) => {
  console.log('editor..........................', editor)
  //add button insert image
  editor.addCommand('insertImage', {
    exec: function (edt) {
      openUploadImage(editor.config.currentUserId, editor.config.imageType, (data) => {
        const htmlImages = `<p><img src="${data.url}"/></p>`
        edt.insertHtml(htmlImages)
      })
    }
  })

  editor.ui.addButton('InsertImage', {
    label: 'Insert Image',
    command: 'insertImage',
    toolbar: 'insert',
    icon: 'image'
  })

  editor.ui.addButton('InsertVideo', {
    label: 'Insert Video',
    command: 'insertVideo',
    toolbar: 'insert',
    icon: 'iframe'
  })

  editor.addCommand('insertVideo', {
    exec: (editor) => {
      openInsertVideo((video) => {

        let fullLink = null
        let videoHtml = null

        const height = 315
        const width = 560

        switch (video.type) {
          case enumType.videoType.Youtube:
            fullLink = `https://www.youtube.com/embed/${video.videoId}`
            videoHtml = `<iframe width=${width} height=${height} src='${fullLink}' frameborder='0' allowfullscreen />`
            break
          case enumType.videoType.Vimeo:
            fullLink = `https://player.vimeo.com/video/${video.videoId}`
            videoHtml = ` <iframe src="https://player.vimeo.com/video/${video.videoId}" width=${width} height=${height} frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen/>`
            break
          default:
            break
        }

        if (videoHtml) {
          const templateHtml = `<div>${videoHtml}</div>`
          editor.insertHtml(templateHtml)
        }
      })
    }
  })

  return editor
}

export default addPlugins