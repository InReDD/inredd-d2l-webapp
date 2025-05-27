"use client"

import React, { useCallback } from 'react'

import { useViewer } from '@/app/context/ViewerContext';
import { useDropzone } from "react-dropzone";

export default function Upload() {
    const {setImage, setResponse} = useViewer()

    // const uploadToServer = async (blob, filename) => {
    //     const body = new FormData();

    //     body.append("file", blob, filename);

    //     if (process.env.NEXT_PUBLIC_SERVER_ENDPOINT == undefined) {
    //         console.log("don't have endpoint server");
    //         return;
    //     }

    //     // const serverBaseURLd = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;
    //     const fetch_path = new URL("localhost:3002").href;

    //     const response_data = await fetch(fetch_path, { method: "POST", body })
    //         .then(response => response.json())
    //         .catch(error => console.error('[Server Side Error] \n', error));
    //     return response_data;
    // };

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);

            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');

            reader.onloadend = () => {
                if (reader.result == null) {
                    console.log('file is empty');
                    return;
                }
                const filename = file.name;
                const content = reader.result;
                const blob = new Blob([content]);

                handleImage(blob)

                // uploadToServer(blob, filename)
                //     .then(data => handleImage(blob, data));

            };
        });
    }, []);

    const handleImage = (blob) => {
        try {
            const url = URL.createObjectURL(blob);
            setImage(url);
        } catch (error) {
            console.error("[FrontEnd] Handle image Error \n", error);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop, noClick: true });

    return (
        <div {...getRootProps()} className="w-full h-full body">
            <div className="flex items-center justify-center h-full w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
                    <div className="flex flex-col content-center items-center justify-center pt-5 pb-6">
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">PNG or JPG (MAX. 2000x2000px)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" {...getInputProps()} />
                </label>
            </div>
        </div>
    );
}