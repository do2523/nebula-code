"use client"

import { GoogleGenerativeAI } from "@google/generative-ai";
import { ConsoleLogWriter } from "drizzle-orm";
import { ChangeEvent, useState } from "react";
import Markdown from "react-markdown";
import { unknown } from "zod";

export default function AiImage() {
    const [image, setImage] = useState('');
    const [text, setText] = useState('');
    const [imageInlineData, setImageInlineData] = useState<{ inlineData: {data: unknown, mimeType: string }}>();

    const API_KEY = "AIzaSyAfu-DOkl22wXJCrIn8ClfpJiWmWhqEba8";

        // Initialize the GoogleGenerativeAI instance
    const genAI = new GoogleGenerativeAI(API_KEY);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files) return;
        const file = e.target.files[0];
        if(!file) return;

        // getting base64 from file to render in DOM
        getBase64(file)
            .then((result) => {
                setImage(result as string);
            })
            .catch(e => console.log(e))

        // generating content model for Gemini Google AI
        fileToGenerativePart(file).then((image) => {
            setImageInlineData(image);
        });
    }
    

    /**
     * Generative AI Call to fetch image insights
     */
    async function aiImageRun() {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        if(!imageInlineData) return;

        const result = await model.generateContent([
            "What's in this photo?", {
                inlineData: {
                  data: imageInlineData.inlineData.data as string,
                  mimeType: imageInlineData.inlineData.mimeType,
                },
              },
            
        ]);
        const response = await result.response;
        const text = response.text();

        console.log(text);
        setText(text);
    }

    const handleClick = () => {
        aiImageRun();
    }

    return (
        <div>

            <div>
                <div style={{ display: 'flex' }}>
                    <input type='file' onChange={(e) => handleImageChange(e)} />
                    <button style={{ marginLeft: '20px' }} onClick={() => handleClick()}>Search</button>
                </div>
                <img src={image} style={{ width: '30%', marginTop: 30 }} />
                <div className="p-5">
            <div className="text-lg md:text-xl font-normal text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-400 to-blue-300 my-4 p-4 md:p-6 leading-relaxed rounded-lg shadow-lg" style={{ lineHeight: '2.25rem' }}>
                
                    <Markdown>{text}</Markdown>
                
            </div>
        </div>
            </div>
        </div>
    );
}

export const getBase64 = (file: Blob) => new Promise(function (resolve, reject) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject('Error: '+ error);
})


async function fileToGenerativePart(file: Blob) {
    const base64EncodedDataPromise = new Promise((resolve) => {
        const reader = new FileReader();
        if(!reader) return;
        reader.onloadend = () => resolve(reader.result?.toString().split(',')[1]);
        reader.readAsDataURL(file);
    });

    return {
        inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
}