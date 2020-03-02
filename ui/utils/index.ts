import { ChartData } from "../components/Chart";
import { Post } from "../generated/graphql";

export const randomColor = (): string => {
  const x = Math.floor(Math.random() * 256);
  const y = Math.floor(Math.random() * 256);
  const z = Math.floor(Math.random() * 256);
  return `rgb(${x}, ${y}, ${z})`;
};

export const aggregateLabelAndMinutes = (
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

export const postToChatDataAdapter = (
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
