const editorConfig = {
  contentConfig: {
    toolbar: [
      {
        name: 'clipboard',
        items: ['Cut', 'Copy', 'Paste', '-', 'Undo', 'Redo']
      },
      {
        name: 'basicstyles',
        items: [
          'Bold',
          'Italic',
          'Underline',
          'Strike',
          'Subscript',
          'Superscript',
          '-',
          'RemoveFormat']
      },
      { name: 'links', items: ['Link', 'Unlink'] },
      {
        name: 'insert',
        items: ['InsertImage', 'InsertVideo', '-', 'Templates']
      },
      {
        name: 'paragraph',
        items: [
          'NumberedList',
          'BulletedList',
          '-',
          'Outdent',
          'Indent',
          '-',
          'Blockquote']
      },
      '/',
      { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
      { name: 'tool', items: ['Maximize', 'Source'] }
    ],
    language: 'vi',
    width: '100%',
    height: '500px',
    allowedContent: true
  },

  headerConfig: {
    toolbarGroups: [
      { name: 'basicstyles', groups: ['basicstyles'] },
      { name: 'links' }
    ],
    removeButtons: 'Anchor,Subscript,Superscript',
    width: '100%',
    height: '200px'
  }
}

export default editorConfig