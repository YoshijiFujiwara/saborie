import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import InputIcon from "@material-ui/icons/Input";
import ListIcon from "@material-ui/icons/List";
import PersonIcon from "@material-ui/icons/Person";
import SearchIcon from "@material-ui/icons/Search";
import Router from "next/router";
import React, { useContext, useEffect } from "react";
import Context from "../contexts";
import { useSignOutMutation } from "../generated/graphql";
import { EReducer } from "../reducers";
import DrawerItem from "./DrawerItem";

const DrawerItems: React.FC = () => {
  const { state, dispatch } = useContext(Context);

  // graphql
  const [signOut, { error: signOutError }] = useSignOutMutation({
    onCompleted: () => {
      dispatch({ type: EReducer.SIGN_OUT_USER });
      Router.push("/login");
    }
  });

  // effect
  useEffect(() => {
    if (signOutError) {
      console.error(signOutError);
    }
  }, [signOutError]);

  const handleSignOutButtonClick = () => {
    signOut();
  };

  return (
    <>
      <DrawerItem
        title="一覧やで"
        icon={<ListIcon />}
        handleOnClick={() => {
          Router.push("/");
        }}
      />
      <DrawerItem
        title="検索するやで"
        icon={<SearchIcon />}
        handleOnClick={() => {
          Router.push("/search");
        }}
      />
      {state.currentUser ? (
        <>
          <DrawerItem
            title="作成するやで"
            icon={<CreateIcon />}
            handleOnClick={() => {
              Router.push("/create");
            }}
          />
          <DrawerItem
            title={state.currentUser.email}
            icon={<PersonIcon />}
            handleOnClick={() => {
              Router.push("/profile");
            }}
          />
          <DrawerItem
            title="ログアウト(仮)"
            icon={<ExitToAppIcon />}
            handleOnClick={handleSignOutButtonClick}
          />
        </>
      ) : (
        <>
          <DrawerItem
            title="ログイン"
            icon={<InputIcon />}
            handleOnClick={() => {
              Router.push("/login");
            }}
          />
        </>
      )}
    </>
  );
};

export default DrawerItems;
