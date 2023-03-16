import Head from "next/head";
import React from "react";

interface MetaTagsProps {
  title: string;
  description: string;
  url: string;
  previewImgSrc?: string;
  keywords?: string;
}

function MetaTags({
  title,
  description,
  url,
  previewImgSrc = "https://brillbeimages.s3.ap-northeast-2.amazonaws.com/output-onlinepngtools.png",
  keywords = "코딩, 프로그래밍, 알고리즘, 코테문제",
}: MetaTagsProps) {
  return (
    <Head>
      <meta
        name="twitter:title"
        property="og:title"
        itemProp="title name"
        content={title}
      />
      <meta
        name="og:title"
        property="og:title"
        itemProp="title name"
        content={title}
      />
      <meta
        name="twitter:description"
        property="og:description"
        itemProp="description"
        content={description}
      />
      <meta
        name="og:description"
        property="og:description"
        itemProp="description"
        content={description}
      />
      <meta
        name="twitter:image"
        property="og:image"
        itemProp="image primaryImageOfPage"
        content={previewImgSrc}
      />
      <meta
        name="og:image"
        property="og:image"
        itemProp="image primaryImageOfPage"
        content={previewImgSrc}
      />
      <meta name="twitter:url" property="og:url" content={url} />
      <meta name="og:url" property="og:url" content={url} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
    </Head>
  );
}

export default MetaTags;
