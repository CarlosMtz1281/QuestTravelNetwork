import React from "react";
import { useState } from "react";

const PostModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;  

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
                
            </div>
        </div>
    )
}