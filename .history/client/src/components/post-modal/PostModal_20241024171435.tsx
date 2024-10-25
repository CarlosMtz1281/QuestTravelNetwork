import React from "react";
import { useState } from "react";
import { FC } from 'react';

interface PostModalProps {
    isOpen: boolean;
    onClose: () => void;
    postContent: string;
  }

const PostModal: FC<PostModalProps> = ({ isOpen, onClose, postContent }) => {
    if (!isOpen) return null;  

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
                <p>hola</p>
                <button
                    onClick={onClose}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Close
                </button>
            </div>
        </div>
    )
}