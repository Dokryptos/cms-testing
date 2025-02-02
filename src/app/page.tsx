import Link from "next/link";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "../../sanity/lib/live";

const EVENTS_QUERY = defineQuery(`*[
  _type == "event"
  && defined(slug.current)
]{_id, name, slug, date}|order(date desc)`);

export default async function IndexPage() {
  const { data: projects } = await sanityFetch({ query: EVENTS_QUERY });

  return (
    <main className="flex bg-gray-100 min-h-screen flex-col p-24 gap-12">
      <h1 className="text-4xl font-bold tracking-tighter">Events</h1>
      <ul className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {projects.map((project) => (
          <li className="bg-white p-4 rounded-lg" key={project._id}>
            <Link
              className="hover:underline"
              href={`/events/${project?.slug?.current}`}
            >
              <h2 className="text-xl font-semibold">{project?.name}</h2>
              {project?.date && (
                <p className="text-gray-500">
                  {new Date(project.date).toLocaleDateString()}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
