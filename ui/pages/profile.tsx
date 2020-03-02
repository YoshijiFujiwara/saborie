import { Grid, Typography } from "@material-ui/core";
import { NextPage } from "next";
import React, { useEffect } from "react";
import Chart, { ChartData } from "../components/Chart";
import { useMyPostsQuery, Post } from "../generated/graphql";
import DefaultLayout from "../layouts/default";
import { postToChatDataAdapter } from "../utils";

const ProfilePage: NextPage = () => {
  // graphql
  const { loading, error, data } = useMyPostsQuery();

  // effect
  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  const todoChartData: ChartData | null =
    !loading && data?.myPosts
      ? postToChatDataAdapter(data.myPosts as Post[], "todo")
      : null;
  const mistakeChartData: ChartData | null =
    !loading && data?.myPosts
      ? postToChatDataAdapter(data.myPosts as Post[], "mistake")
      : null;

  return (
    <DefaultLayout>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography variant="h4" component="p">
            さぼっちゃったこと
          </Typography>
          {!loading && data?.myPosts && todoChartData && (
            <Chart data={mistakeChartData} width={1000} height={500} />
          )}
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h4" component="p">
            やっちゃった
          </Typography>
          {!loading && data?.myPosts && mistakeChartData && (
            <Chart data={todoChartData} width={1000} height={500} />
          )}
        </Grid>
      </Grid>
    </DefaultLayout>
  );
};

export default ProfilePage;
