import { CKEditor } from '@ckeditor/ckeditor5-react'
// import  ClassicEditor  from '@ckeditor/ckeditor5-build-classic'
import Editor from 'ckeditor5-custom-build/build/ckeditor'
import styled from "styled-components";
import { useEffect, useState } from 'react';

// console.log(ClassicEditor.builtinPlugins.map( plugin => plugin.pluginName ));

// const editorConfiguration = {
//   toolbar: ['heading', '|', 'bold', 'italic', "blockQuote", '|', 'bulletedList', 'numberedList', 'Indent', "Table", "TableToolbar", 'undo', 'redo',],
// };

const config = {
  toolbar: {
     items: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'outdent',
        'indent',
        '|',
        'imageUpload',
        'blockQuote',
        'insertTable',
        'mediaEmbed',
        'undo',
        'redo'
     ]
  },
  language: 'en',
  image: {
     toolbar: [
        'imageTextAlternative',
        'imageStyle:inline',
        'imageStyle:block',
        'imageStyle:side'
     ]
  },
  table: {
     contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        'tableCellProperties'
     ]
  },
  licenseKey: '',
}

function CkEditor({ title, data, setData, height, lang }) {
  const [customData, setCustomData] = useState("");
  const [Nyll, setNyll] = useState(false);

  useEffect(() => {
    if (data) { setCustomData(data) }
  }, [data])

  return (
    <Container className="CkEditor">
      {title && <div className="title"><span className="lang"><img src={lang === "mn" ? "/mn.png" : "/us.png"} /> </span><span>{title}</span></div>}
      <div className={height ? Nyll ? `redCustom` : `activeCustom` : Nyll ? `red` : `active`}>
        <CKEditor
          height={100}
          editor={Editor}
          config={config}
          data={customData}
          onReady={editor => {
            // You can store the "editor" and use when it is needed.
            // console.log( 'Editor is ready to use!', editor );
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setData(data);
            // console.log( { event, editor, data } );
          }}
          onBlur={(event, editor) => {
            const data = editor.getData();
            if (data === "") { setNyll(true) } else { setNyll(false) }
          }}
          onFocus={(event, editor) => {
            // console.log( 'Focus.', editor );
            setNyll(false);
          }}
        />
      </div>
    </Container>
  );
}

export default CkEditor;

// const configuration = {
//   toolbar: [
//     'heading',
//     '|',
//     'fontColor',
//     'fontSize',
//     '|',
//     'bold',
//     'italic',
//     'link',
//     'bulletedList',
//     'numberedList',
//     '|',
//     'blockQuote',
//     'insertTable',
//     // 'mediaEmbed',
//     'undo',
//     'redo',
//     '|',
//     //   ''
//   ],
// };


const Container = styled.div`
  width:100%;
  .title{
    display:flex;
    font-weight:500;
    margin-bottom:15px;
    gap:15px;
    align-items:center;
    .lang{
      display:flex;
      align-items:center;
      gap:5px;
      img{
        width:19px;
        height:auto;
        object-fit:contain;
      }
    }
  }
  
  .active{
    .ck-editor{
      .ck-editor__main{
        .ck-editor__editable_inline{
          min-height:30rem !important;
          // border:none;
        }
      }
    }
  }
  .activeCustom{
    .ck-editor{
      .ck-editor__main{
        .ck-editor__editable_inline{
          min-height:18rem !important;
          // border:none;
        }
      }
    }
  }
  .red{
    .ck-editor{
      .ck-editor__main{
        .ck-editor__editable_inline{
          border:1px solid rgb(255,20,20);
          min-height:30rem !important;
        }
      }
    }
  }
  .redCustom{
    .ck-editor{
      .ck-editor__main{
        .ck-editor__editable_inline{
          border:1px solid rgb(255,20,20);
          min-height:18rem !important;
        }
      }
    }
  }

  .ck.ck-reset_all, .ck.ck-reset_all * {
    text-align: right;
  }
  .ck-icon{
      opacity: 0.8;
      font-size: .72em !important;
  }
  .ck-toolbar__grouped-dropdown{
      margin-top: 1px;
      margin-bottom: 1px;
  }
  .ck.ck-content ul, .ck.ck-content ul li{
      list-style-type: inherit;
  }

  .ck.ck-content ol li{
    list-style-type: decimal;
  }

    .ck.ck-content ul, ol {
      /* Default user agent stylesheet, you can change it to your needs. */
      padding-left: 40px;
    }
`
