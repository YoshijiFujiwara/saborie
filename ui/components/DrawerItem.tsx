import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import React from "react";

type Props = {
  title: string;
  icon: JSX.Element;
  handleOnClick: () => void;
};

const DrawerItem: React.FC<Props> = ({ title, icon, handleOnClick }) => {
  return (
    <>
      <ListItem button onClick={handleOnClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
      </ListItem>
    </>
  );
};

export default DrawerItem;
