import React from "react"
import './ModalWindow.sass'

export function ModalWindow({ active, item }) {

    return (
        <div className={`modalWindow ${active ? 'modalWindow__open' : 'modalWindow__close'}`}>
            <div className="modalWindow__content" ></div>
            {console.log(item)}
        </div>
    )
} 