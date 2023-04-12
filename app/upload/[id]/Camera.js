"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from "next/navigation";

export default function Camera({ onPhotoTaken }) {
    const router = useRouter();
    const [stream, setStream] = useState(null);
    const [validCamera, setValidCamera] = useState(true);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const startCamera = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(strm => {
                console.log("🚀 ~ file: Camera.js:24 ~ startCamera ~ strm:", strm)
                videoRef.current.srcObject = strm;
                videoRef.current.play();
                setStream(strm);
                console.log(stream)
            })
            .catch(error => {
                console.error(error);
                setValidCamera(false);
            });
    };


    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => {
                track.stop();
            });
            videoRef.current.srcObject = null;
            setStream(null);
        }
    };

    const capture = () => {
        const context = canvasRef.current.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, 640, 480);
        const dataURL = canvasRef.current.toDataURL('image/jpeg', 0.8);
        onPhotoTaken(dataURL);
        stopCamera();
    };

    const goHome = () => {
        stopCamera();
        router.push("/")
    }

    useEffect(() => {
        startCamera();
        const handleUnload = () => {
            stopCamera();
        };
        window.addEventListener("unload", handleUnload);
        return () => {
            stopCamera();
            window.removeEventListener("unload", handleUnload);
        };
    }, []);



    return (
        <div className="flex justify-center w-full h-full px-4 sm:px-0">
            {!validCamera ?
                <div>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Camera not found</h1>
                    <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the camera on this device.</p>
                    <div className="mt-10">
                        <a href="#" className="text-sm font-semibold leading-7 text-indigo-600"><span aria-hidden="true">&larr;</span> Back to home</a>
                    </div>
                </div> :
                <div>
                    <h1 className="my-4 font-bold tracking-tight text-gray-900 text-2xl">Take picture</h1>
                    <video ref={videoRef} width="640" height="480" className="rounded-lg"></video>
                    <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }}></canvas>
                    <button onClick={capture} className="btn btn-block mt-4">Take Photo</button>
                    <button onClick={goHome} className="btn btn-block btn-secondary mt-8">Go Home</button>
                </div>
            }
        </div>
    );
}
