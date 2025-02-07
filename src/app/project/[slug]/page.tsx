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
  return (
    <div>
      <ProjectView project={projectData} />
    </div>
  );
}
