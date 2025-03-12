import { sanityFetch } from "../../../../sanity/lib/live";
import { defineQuery } from "next-sanity";
import { notFound } from "next/navigation";
import ProjectView from "../../../../components/views/project";
import ProjectTypes from "../../../../types/still-Life";

const PROJECT_QUERY = defineQuery(`
  {
  "project": *[
    _type == "project" &&
    slug.current == $slug
  ][0]{
  ...,
},
"projectArray": *[
  _type == "project"
  && defined(slug.current)
]{_id, title, slug, description, thumbnail, gallery, tags, details, shortTitle }
}
`);

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

  const project: ProjectTypes = data.project;
  const projectArray: ProjectTypes[] = Array.isArray(data.projectArray)
    ? data.projectArray
    : [project];

  return (
    <div>
      <ProjectView project={project} projectArray={projectArray} />
    </div>
  );
}
