"use client"

import React, { useCallback } from 'react'

import { useViewer } from '@/app/context/ViewerContext';
import { useDropzone } from "react-dropzone";

export default function Upload() {
    const {setImage, setResponse} = useViewer()

    const uploadToServer = async (blob, filename) => {
        const body = new FormData();

        body.append("file", blob, filename);

        if (process.env.NEXT_PUBLIC_SERVER_ENDPOINT == undefined) {
            console.log("don't have endpoint server");
            return;
        }

        const serverBaseURLd = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;
        const fetch_path = new URL("/api/v1/inredd/mouthdet", serverBaseURL).href;

        const response_data = await fetch(fetch_path, { method: "POST", body })
            .then(response => response.json())
            .catch(error => console.error('[Server Side Error] \n', error));
        return response_data;
    };

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

                uploadToServer(blob, filename)
                    .then(data => handleImage(blob, data));
            };
        });
    }, []);

    const handleImage = (blob, data) => {
        try {
            const url = URL.createObjectURL(blob);
            setImage(url);
            setResponse(data["outputs"]);
        } catch (error) {
            console.error("[FrontEnd] Handle image Error \n", error);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()} className="w-full h-full body">
            <div className="flex items-center justify-center h-full w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
                    <div className="flex flex-col content-center items-center justify-center pt-5 pb-6">
                        <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">PNG or JPG (MAX. 2000x2000px)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" {...getInputProps()} />
                </label>
            </div>
        </div>
    );
}