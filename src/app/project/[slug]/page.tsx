import { sanityFetch } from "../../../../sanity/lib/live";
import { defineQuery } from "next-sanity";
import { notFound } from "next/navigation";
import ProjectView from "../../../../components/views/project";

const PROJECT_QUERY = defineQuery(`*[
    _type == "project" &&
    slug.current == $slug
  ][0]{
  ...,
}`);

// const { projectId, dataset } = client.config();

// const urlFor = (source: SanityImageSource) =>
//   projectId && dataset
//     ? imageUrlBuilder({ projectId, dataset }).image(source)
//     : null;

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { data: projectData } = await sanityFetch({
    query: PROJECT_QUERY,
    params: await params,
  });
  if (!projectData) {
    notFound();
  }
  // const { name, photo, details } = project;
  // const photoImageUrl = photo.map((img) =>
  //   urlFor(img)?.width(550).height(310).url()
  // );

  return (
    <div>
      <ProjectView project={projectData} />
    </div>
  );
}
