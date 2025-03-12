import Link from "next/link";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "../../sanity/lib/live";
import Project from "../../types/still-Life";

const EVENTS_QUERY = defineQuery(`*[
  _type == "project"
  && defined(slug.current)
]{_id, title, slug, description, thumbnail, gallery, tags, details, shortTitle }`);

export default async function IndexPage() {
  const { data } = await sanityFetch({ query: EVENTS_QUERY });
  console.log(data);
  return (
    <main className="flex bg-gray-100 min-h-screen flex-col p-24 gap-12">
      <h1 className="text-4xl font-bold tracking-tighter">Photo</h1>
      <ul className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {data.map((project: Project) => (
          <li className="bg-white p-4 rounded-lg" key={project._id}>
            <Link
              className="hover:underline"
              href={`/project/${project?.slug?.current}`}
            >
              <h2 className="text-xl font-semibold">{project?.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
