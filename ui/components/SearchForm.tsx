import { TextField, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React, { useState, useEffect, useContext } from "react";
import Context from "../contexts";
import { useSearchPostsLazyQuery } from "../generated/graphql";
import { EReducer } from "../reducers";

const SearchForm: React.FC = () => {
  const { dispatch } = useContext(Context);
  const [search, setSearch] = useState<string>("");

  // graphql
  const [searchPosts, { loading, error, data }] = useSearchPostsLazyQuery();

  // effect
  useEffect(() => {
    if (!loading && data?.postsByKeyword) {
      dispatch({
        type: EReducer.SET_SEARCHED_POSTS,
        payload: data.postsByKeyword
      });
    }
    if (error) {
      console.error(error);
    }
  }, [data, error]);

  // hendlers
  const handleChangeSearch = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    setSearch(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    searchPosts({
      variables: {
        input: search
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="search"
        label="検索"
        name="search"
        autoFocus
        value={search}
        onChange={handleChangeSearch}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
    </form>
  );
};

export default SearchForm;
