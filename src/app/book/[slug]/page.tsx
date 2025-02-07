import { sanityFetch } from "../../../../sanity/lib/live";
import { defineQuery } from "next-sanity";
import { notFound } from "next/navigation";

const PROJECT_QUERY = defineQuery(`
  {
  "book": *[
    _type == "book" &&
    slug.current == $slug
  ][0]{
  ...,
}`);

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { data } = await sanityFetch({
    query: PROJECT_QUERY,
    params: { slug: (await params).slug },
  });
  if (!data) {
    notFound();
  }

  return <div></div>;
}
