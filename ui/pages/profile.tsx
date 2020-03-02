import { Grid, Typography } from "@material-ui/core";
import { NextPage } from "next";
import React, { useEffect } from "react";
import Chart, { ChartData } from "../components/Chart";
import { useMyPostsQuery, Post } from "../generated/graphql";
import DefaultLayout from "../layouts/default";

const chartData: ChartData = {
  datasets: [
    {
      data: [50, 100, 30],
      backgroundColor: ["Red", "Blue", "Yellow"]
    }
  ],
  labels: ["Red", "Blue", "Yellow"]
};

const ProfilePage: NextPage = () => {
  // graphql
  const { loading, error, data } = useMyPostsQuery();

  // effect
  useEffect(() => {
    if (!loading && data?.myPosts) {
      console.log(data.myPosts);
    }
    if (error) {
      console.error(error);
    }
  }, [data, error, loading]);

  const randomColor = (): string => {
    const x = Math.floor(Math.random() * 256);
    const y = Math.floor(Math.random() * 256);
    const z = Math.floor(Math.random() * 256);
    return `rgb(${x}, ${y}, ${z})`;
  };
  const aggregateLabelAndMinutes = (
    posts: Post[],
    whichKey: "todo" | "mistake"
  ): object => {
    const labelAndMinutes = {};
    posts.forEach(post => {
      if (post[whichKey] in labelAndMinutes) {
        labelAndMinutes[post[whichKey]] += post.minutes;
      } else {
        labelAndMinutes[post[whichKey]] = post.minutes;
      }
    });
    return labelAndMinutes;
  };
  const postToChatDataAdapter = (
    posts: Post[],
    whichKey: "todo" | "mistake"
  ): ChartData => {
    const labelAndMinutes = aggregateLabelAndMinutes(posts, whichKey);
    const data = [];
    const labels = [];
    const colors = [];
    Object.keys(labelAndMinutes).forEach(key => {
      data.push(labelAndMinutes[key]);
      labels.push(key);
      colors.push(randomColor());
    });
    return {
      datasets: [
        {
          data,
          backgroundColor: colors
        }
      ],
      labels
    };
  };

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
