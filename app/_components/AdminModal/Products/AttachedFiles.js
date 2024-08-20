import { useState } from "react";
import Image from "next/image";
import close from "@/public/svg/close.svg";
import fileIcon from "@/public/svg/filered.svg";

const Modal = ({
  closeModal,
  setCreatedList,
  activeItem,
  setActiveItem,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState([...activeItem.files]);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + " Mb",
      downloadLink: URL.createObjectURL(file),
    }));

    setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleRemoveFile = (id) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  const handleSaveFiles = () => {
    const updatedItem = { ...activeItem, files: uploadedFiles };
    setActiveItem(updatedItem);

    // Update the createdList to reflect the new files
    setCreatedList((prevList) =>
      prevList.map((item) => (item.id === activeItem.id ? updatedItem : item))
    );

    closeModal();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto"
      onClick={closeModal}
    >
      <div
        className="bg-white max-w-[600px] w-full relative mx-4 my-4 flex flex-col overflow-y-auto max-h-full no-scrollbar xl:h-auto "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 mdx:right-4 xl:top-4 xl:right-3"
        >
          <Image src={close} alt="close" width={24} height={24} />
        </button>
        <div className="px-4 mdx:px-6 my-[30px] xl:px-8 xl:my-6">
          <h3 className="font-bold text-[22px] mdx:text-[24px] xl:text-[30px]">
            Прикрепить файлы
          </h3>
          <input
            type="file"
            multiple
            accept=".pdf,.html,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.md"
            onChange={handleFileUpload}
            className="block w-full my-4"
          />
          <div className="mt-4 space-y-4">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="relative bg-[#F6F8F9] flex items-center justify-between p-4"
              >
                <div className="flex items-center">
                  <Image
                    src={fileIcon}
                    alt="file icon"
                    width={24}
                    height={24}
                    className="mr-3"
                  />
                  <p className="text-lg font-medium">{file.name}</p>
                </div>
                <p className="text-sm text-[#BABABA]">{file.size}</p>
                <button
                  onClick={() => handleRemoveFile(file.id)}
                  className="text-red-500 text-sm"
                >
                  Удалить
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={handleSaveFiles}
              className="py-2 px-4 bg-blue-500 text-white rounded"
            >
              Сохранить
            </button>
            <button
              onClick={closeModal}
              className="py-2 px-4 bg-gray-300 text-black rounded"
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;