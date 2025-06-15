"use client"

import React, { useCallback, useState } from 'react'

import { useViewer } from '@/app/context/ViewerContext';
import { useDropzone } from "react-dropzone";

export default function Upload() {
    const {setImage, setResponse} = useViewer()
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);

    const uploadToServer = async (blob, filename) => {
        const serverEndpoint = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;

        if (!serverEndpoint) {
            const errMsg = "Upload failed: Server endpoint is not configured.";
            console.error(errMsg);
            setUploadError(errMsg);
            return { success: false, error: errMsg, data: null }; 
        }

        setIsUploading(true);
        setUploadError(null); 

        const body = new FormData();
        body.append("file", blob, filename);

        let fetchPath;
        try {
            fetchPath = new URL(serverEndpoint).href;
        } catch (urlError) {
            const errMsg = "Upload failed: Invalid server endpoint URL.";
            console.error(errMsg, urlError);
            setUploadError(errMsg);
            setIsUploading(false);
            return { success: false, error: errMsg, data: null };
        }

        try {
            const httpResponse = await fetch(fetchPath, {
                method: "POST",
                body: body,
                headers: {
                  'Accept': 'application/json',
                },
            });

            // Check if the HTTP response status is OK (e.g., 200-299)
            if (!httpResponse.ok) {
                let errorPayload = null;
                try {
                    // Attempt to parse error response as JSON
                    errorPayload = await httpResponse.json();
                } catch (e) {
                    // If not JSON, try to get as text
                    errorPayload = await httpResponse.text();
                }
                const errMsg = `Upload failed with status: ${httpResponse.status}.`;
                console.error(errMsg, "Server response:", errorPayload);
                setUploadError(errMsg + (typeof errorPayload === 'string' ? ` ${errorPayload}` : ''));
                setResponse(null); // Clear previous successful data
                return { success: false, error: errMsg, data: errorPayload };
            }

            // If response is OK, parse the JSON data
            const responseData = await httpResponse.json();
            setResponse(responseData); // Update state with successful data
            setIsUploading(false);
            return { success: true, data: responseData, error: null }; // Return success and data

        } catch (networkOrOtherError) {
            const errMsg = `Upload failed: ${networkOrOtherError.message || "Network error"}`;
            console.error('[Upload Error]', networkOrOtherError);
            setUploadError(errMsg);
            setIsUploading(false);
            setResponse(null);
            return { success: false, error: errMsg, data: null };
        }
    };

    const handleImage = (blob) => {
        try {
            const url = URL.createObjectURL(blob);
            setImage(url);
        } catch (error) {
            console.error("[FrontEnd] Handle image Error \n", error);
        }
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

                handleImage(blob)
                uploadToServer(blob, filename)

            };
        });
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop, noClick: true });

    return (
        <div {...getRootProps()} className="w-full h-full body">
            <div className="flex items-center justify-center h-full w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
                    <div className="flex flex-col content-center items-center justify-center pt-5 pb-6">
                        <p className="mb-2 text-sm text-white"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-white dark:text-gray-400">PNG or JPG (MAX. 2000x2000px)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" {...getInputProps()} />
                </label>
            </div>
        </div>
    );
}