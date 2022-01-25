// import { List } from '@material-ui/core';
import { ListItemComp } from './ListItem';
import { useState } from 'react';
import './List.css'

export function ListComp() {
    const [chatItem, setChatItem] = useState([
        {
            name: "Chat 1",
            id: Date.now() + 1
        },
        {
            name: "Chat 2",
            id: Date.now() + 2
        },
        {
            name: "Chat 3",
            id: Date.now() + 3
        }
    ]);

    const handleChat = () => {

        setChatItem(chatItem);

    }
    return <div className="list">
        {chatItem.map((item) => {
            return (
                <ListItemComp key={item.id} item={item} onChat={handleChat} />
            )
        })}
    </div >

}