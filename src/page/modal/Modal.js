import React, { useState } from "react";

function Modal({value: modalData}){
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }
    
    
    return(
        <div>
            {isOpen && (
                <>
                <div className="overlay" onClick={closeModal}>
                    <div className="modal">
                        {modalData.dataContent}
                    </div>
                </div>
                </>
            )}

            <button className="buttonModal" onClick={openModal}>{modalData.dataButton}</button>
        </div>
    )
}

export default Modal