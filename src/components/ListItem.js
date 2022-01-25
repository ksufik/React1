// import { ListItem } from '@material-ui/core';


export function ListItemComp({ item, onChat }) {


    return (
        <div className="mui" onClick={onChat}>{item.name}
        </div>
    )

}