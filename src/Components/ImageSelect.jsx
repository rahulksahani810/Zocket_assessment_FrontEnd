import { GrGallery } from "react-icons/gr";


export default function ImageSelect({ handleFileChange }) {

    return (
        <div className="flex relative border rounded-md p-2 hover:bg-gray-200 items-center gap-1">
            <GrGallery className="text-blue-500" />
            <span className="text-gray-400 text-xs">Change the ad creative image. </span>
            <label htmlFor="fileInput" className="text-blue-500 underline cursor-pointer text-xs">Select File</label>
            <input id="fileInput" type="file" accept="image/*" onChange={handleFileChange} className="opacity-0 absolute inset-0 w-full h-full cursor-pointer" />
        </div>
    )
}
