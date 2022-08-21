import Head from "next/head";
import styles from "../styles/Home.module.css";

import {
  getStoryblokApi,
  StoryblokComponent,
} from "@storyblok/react";
import {useEffect, useState} from "react";
import {SbShoppingCartButton} from "../components/SbShoppingCartButton";

export default function Page({ story }) {
  story = useStoryblokState(story);

  return (
    <div className={styles.container}>
      <Head>
        <title>{story ? story.name : "My Site"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <h1>{story ? story.name : "My Site"}</h1>
        <SbShoppingCartButton/>
      </header>

      <StoryblokComponent blok={story.content} />
    </div>
  );
}

export async function getStaticProps({ params }) {
  let slug = params.slug ? params.slug.join("/") : "home";

  let sbParams = {
    version: "draft", // or 'published'
  };

  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);

  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
    },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get("cdn/links/");

  let paths = [];
  Object.keys(data.links).forEach((linkKey) => {
    if (data.links[linkKey].is_folder || data.links[linkKey].slug === "home") {
      return;
    }

    const slug = data.links[linkKey].slug;
    let splittedSlug = slug.split("/");

    paths.push({ params: { slug: splittedSlug } });
  });

  return {
    paths: paths,
    fallback: false,
  };
}

const useStoryblokState = (initialStory = {}, bridgeOptions = {}) => {
  let [story, setStory] = useState(initialStory);
  useStoryblokBridge(story.id, (newStory) => setStory(newStory), bridgeOptions);
  useEffect(() => {
    setStory(initialStory);
  }, [initialStory]);
  return story;
};


const useStoryblokBridge = (id, cb, options = {}) => {
  if (typeof window === "undefined") {
    return;
  }
  if (typeof window.storyblokRegisterEvent === "undefined") {
    console.error("Storyblok Bridge is disabled. Please enable it to use it. Read https://github.com/storyblok/storyblok-js");
    return;
  }
  if (!id) {
    console.warn("Story ID is not defined. Please provide a valid ID.");
    return;
  }
  window.storyblokRegisterEvent(() => {
    const sbBridge = new window.StoryblokBridge(options);
    sbBridge.on(["input", "published", "change"], (event) => {
      if (event.action == "input" && event.story.id === id) {
        cb(event.story);
      } else {
        window.location.reload();
      }
    });
  })
}