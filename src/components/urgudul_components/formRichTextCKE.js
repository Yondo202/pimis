import { CKEditor } from '@ckeditor/ckeditor5-react'
import Editor from 'ckeditor5-custom-build/build/ckeditor'
import './ckEditor.css'

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

export default function FormRichTextCKE({ label, HelpPopup, value, name, index, setter, invalid, classAppend, classLabel, height, placeholder }) {
   const handleInput = (editor) => {
      setter(name, editor.getData(), index)
   }

   return (
      <div className={classAppend}>
         {label &&
            <div className={`tw-flex tw-items-center tw-pr-2 tw-pt-2 ${classLabel}`}>
               <span className={`tw-text-sm ${invalid && 'tw-text-red-500'} tw-transition-colors`}>
                  {label}
               </span>
               {HelpPopup && HelpPopup}
            </div>
         }

         <div className="tw-pr-2 tw-pt-2 tw-pb-4">
            <CKEditor
               editor={Editor}
               config={placeholder ? { ...config, placeholder } : config}
               onReady={editor => {
                  editor.editing.view.change(writer => {
                     height && writer.setStyle('min-height', `${height}px`, editor.editing.view.document.getRoot())
                  })
               }}
               data={value ?? ''}
               onChange={(event, editor) => handleInput(editor)}

            />
         </div>
      </div>
   )
}
