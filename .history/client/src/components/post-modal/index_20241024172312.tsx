import {ReactNode, SyntheticEvent} from "react";


interface ModalProps {
 id?: string;
 children: ReactNode;
 onClickOut: () => void;
}

export const Modal = ({children, onClickOut, id = "modal", ...otherProps}: ModalProps) => {
 
 const handleOutsideClick = (e: SyntheticEvent<HTMLDivElement>) => {
  if (typeof onClickOut === "function" && (e.target as Element).className === "modal-container") {
   onClickOut();
  }
 }
 
 return (
  <div className="modal-container" onClick={handleOutsideClick}>
   <dialog {...otherProps} id={id} className="modal">
    {children}
   </dialog>
  </div>
 )
}