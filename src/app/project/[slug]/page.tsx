import { client } from "../../../../sanity/lib/client";
import { sanityFetch } from "../../../../sanity/lib/live";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { defineQuery, PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const PROJECT_QUERY = defineQuery(`*[
    _type == "project" &&
    slug.current == $slug
  ][0]{
  ...,
}`);

const { projectId, dataset } = client.config();

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { data: project } = await sanityFetch({
    query: PROJECT_QUERY,
    params: await params,
  });
  if (!project) {
    notFound();
  }
  const { name, photo, details } = project;
  const photoImageUrl = photo.map((img) =>
    urlFor(img)?.width(550).height(310).url()
  );
  console.log(photo);

  return (
    <main className="">
      <div className="">
        <Link href="/">← Back to Project</Link>
      </div>
      <div className="">
        {photoImageUrl.map((url, index) => (
          <Image
            src={url || "https://placehold.co/550x310/png"}
            alt={index || "Project"}
            className=""
            width={550}
            height={310}
          />
        ))}
        <Image
          src={photoImageUrl || "https://placehold.co/550x310/png"}
          alt={name || "Project"}
          className=""
          width={550}
          height={310}
        />
        <div className="">
          <div className="">
            {name ? <h1 className="">{name}</h1> : null}
            <dl className="">
              <dd className="">Date</dd>
            </dl>
          </div>
          {details && details.length > 0 && (
            <div className="">
              <PortableText value={details} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
