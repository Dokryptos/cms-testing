"use client";
import { urlForImage } from "../../../sanity/lib/image";
import { useEffect } from "react";
import ProjectGallery from "./gallery";
import ProjectTypes from "../../../types/project";

type ProjectViewProps = {
  project: ProjectTypes;
};

export default function ProjectView({ project }: ProjectViewProps) {
  useEffect(() => {
    // precache sanity images
    project.gallery.forEach((asset) => {
      const img = new Image();
      img.src = urlForImage(asset)
        .fit("max")
        .maxWidth(1440)
        .maxHeight(1440)
        .quality(75)
        .url();
    });
  }, [project.gallery]);

  return (
    <>
      <div className="relative grid h-full w-screen bg-[#252527] font-sans text-[16px] font-light text-white laptop:w-[820px] laptop:text-[15px]">
        <div className="flex items-end laptop:col-span-4 laptop:col-start-4 laptop:row-span-1">
          <ProjectGallery
            gallery={project.gallery}
            projects={[project]}
            currentProjectSlug={project.slug.current}
          />
        </div>
      </div>
    </>
  );
}
