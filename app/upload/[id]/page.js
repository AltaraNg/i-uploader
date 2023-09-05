/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react"
import Camera from "./Camera";
import cn from 'classnames';
import { useRouter } from "next/navigation";

export default function Upload({ params }) {
  const router = useRouter();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("passport_url");
  const [fileName, setFilename] = useState("");

  const openFilePicker = async () => {
    if (type === "other" && !fileName) {
      return;
    }
    setLoading(true);
    const base64data = photo.replace(/^data:.+;base64,/, "");

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({
          id: params.id,
          filename: type,
          data: base64data,
          custom: type === "other" ? fileName : type,
        }),
      });
      await response.json();
      router.push(`/user/${params.id}`);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSelect = (e) => {
    setType(e.target.value);
  };

  const handleChange = (e) => {
    setFilename(e.target.value);
  };

  return (
    <div className="flex justify-center h-full pb-2">
      {!photo && (
        <div>
          <Camera onPhotoTaken={(photo) => setPhoto(photo)} />
        </div>
      )}
      {photo && (
        <div className="p-2">
          <h1 className="my-4 font-bold tracking-tight text-gray-900 text-2xl">
            Upload Image
          </h1>
          <div className="sm:flex gap-4 items-end mb-4">
            <select
              className="select select-info w-full sm:max-w-xs focus:outline-0 focus:ring-0"
              defaultValue="passport_url"
              onChange={handleSelect}
            >
              <option value="id_card_url">ID Card</option>
              <option value="passport_url">Passport</option>
              <option value="utility_bill_url">Utility Bill</option>
              <option value="residence_proof_url">Residence Proof</option>
              <option value="other">Others</option>
            </select>
            {type == "other" && (
              <div className="form-control w-full sm:max-w-xs mt-4">
                <label className="label py-0">
                  <span className="label-text">What is your file name?</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  onChange={handleChange}
                  className="input input-info w-full sm:max-w-xs focus:outline-0 focus:ring-0"
                />
              </div>
            )}
          </div>
          <div className="aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg">
            <img src={photo} alt="" className="object-cover" />
          </div>

          <div className="sm:flex gap-2 mt-6 w-full">
            <button
              className={cn(
                "btn btn-block sm:w-1/2 mt-2 sm:mt-0",
                loading && "loading"
              )}
              disabled={loading}
              onClick={() => openFilePicker()}
            >
              Upload
            </button>
            <button
              onClick={() => setPhoto(null)}
              className="btn btn-accent btn-block sm:w-1/2 mt-4 sm:mt-0"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
}