import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      paddingTop: 0,
      paddintBottom: 0
    }
  })
);

type Props = {
  title: string;
  icon: JSX.Element;
  handleOnClick: () => void;
};

const DrawerItem: React.FC<Props> = ({ title, icon, handleOnClick }) => {
  const classes = useStyles();

  return (
    <>
      <ListItem className={classes.root} button onClick={handleOnClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
      </ListItem>
    </>
  );
};

export default DrawerItem;
