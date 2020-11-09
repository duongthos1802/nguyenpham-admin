const editorConfig = {
  contentConfig: {
    toolbar: [
      { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
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
          'RemoveFormat',
        ],
      },
      { name: 'links', items: ['Link', 'Unlink'] },
      {
        name: 'insert',
        items: ['InsertImage', 'InsertVideo', '-', 'Templates', 'Table'],
      },
      {
        name: 'paragraph',
        items: [
          'NumberedList',
          'BulletedList',
          '-',
          'Outdent',
          'Indent',
          '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'
        ],
      },
      // '/',
      // {name: 'tool', items: ['Maximize', 'Source']}
    ],
    language: 'vi',
    width: '100%',
    height: '500px',
    allowedContent: true,
    contentsCss: '/static/styles/customize.css',
  },

  headerConfig: {
    toolbarGroups: [
      { name: 'basicstyles', groups: ['basicstyles'] },
      { name: 'links' },
    ],
    removeButtons: 'Anchor,Subscript,Superscript',
    width: '100%',
    height: '200px',
  },

  formatTag: 'p;h1;h2;h3',

  cssConfig: '.editor-title-italic { font-style: x; } .editor-subtitle { color: #aaaaaa; font-style: italic; } .editor-special-container { background: #eeeeee; border: 1px solid #cccccc; padding: 5px 10px; } .editor-marker { background: yellow; } .editor-text-left { text-align: left } .editor-text-right { text-align: right } .editor-text-center { text-align: center } .editor-text-justify { text-align: justify }',

  styleConfig: [
    {
      name: 'TitleItalic',
      element: 'h2',
      attributes: {
        class: 'editor-title-italic'
      }
    },
    {
      name: 'SubTitle',
      element: 'h3',
      attributes: {
        class: 'editor-subtitle'
      }
    },
    {
      name: 'Special Container',
      element: 'div',
      attributes: {
        class: 'editor-special-container'
      }
    },
    {
      name: 'Marker',
      element: 'span',
      attributes: {
        class: 'editor-marker'
      }
    },
    {
      name: 'Big',
      element: 'big',
    },
    {
      name: 'Small',
      element: 'small'
    },
    {
      name: 'Typewriter',
      element: 'tt'
    },
    {
      name: 'Computer Code',
      element: 'code'
    },
    {
      name: 'Keyboard Phrase',
      element: 'kbd'
    },
    {
      name: 'Sample Text',
      element: 'samp'
    },
    {
      name: 'Variable',
      element: 'var'
    },
    {
      name: 'Deleted Text',
      element: 'del'
    },
    {
      name: 'Inserted Text',
      element: 'ins'
    },
    {
      name: 'Cited Work',
      element: 'cite'
    },
    {
      name: 'Inline Quotation',
      element: 'q'
    }
  ]
}

export default editorConfig