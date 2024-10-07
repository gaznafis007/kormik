
import { FileUploader } from 'react-drag-drop-files';

// eslint-disable-next-line react/prop-types
const DragAndDrop = ({fileTypes, name, label, placeholder, className, handler, children, file}) => {
    return (
        <FileUploader name={name} types={fileTypes} handleChange={handler}>
            <div className="flex flex-col gap-4 my-2">
              <label className="capitalize text-rose-500">
                {label}
              </label>
              {
                !file && (
                    <input
                    className={`w-full cursor-pointer p-4 bg-transparent rounded-md border border-dashed border-rose-500 ${className}`}
                    placeholder={placeholder}
                  />
                  )
              }
              {children}
            </div>
          </FileUploader>
    );
};

export default DragAndDrop;