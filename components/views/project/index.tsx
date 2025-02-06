"use client";
import { PortableText } from "@portabletext/react";
import { urlForImage } from "../../../sanity/lib/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProjectGallery from "./gallery";
import ProjectTypes from "../../../types/project";

type ProjectViewProps = {
  project: ProjectTypes;
};

export default function ProjectView({ project }: ProjectViewProps) {
  const [index, setIndex] = useState<number>(0);
  console.log(project);
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
        <Link href="/">
          <div
            className="targeting-action absolute right-[16px] top-[24px] -m-[10px] p-[10px]"
            onClick={() => {}}
          ></div>
        </Link>

        <div className="mx-[16px] mt-[18px] flex h-dvh flex-col laptop:mx-[30px] laptop:mt-[30px]">
          <div className="flex h-[36px] w-full bg-[#252527] laptop:h-[90px]">
            <h2 className="self-baseline font-romie text-[19px] font-normal text-white laptop:text-[54px]"></h2>
          </div>

          <div className="grid h-[calc(100dvh-56px)] content-baseline overflow-y-scroll pb-[16px] laptop:grid-cols-7 laptop:grid-rows-[auto_1fr] laptop:gap-[20px] laptop:pb-[46px]">
            <div className="flex items-end laptop:col-span-4 laptop:col-start-4 laptop:row-span-1">
              <ProjectGallery
                gallery={project.gallery}
                index={index}
                setIndex={setIndex}
              />
            </div>
            <div className="mr-[20px] mt-[30px] leading-[24px] laptop:col-span-7 laptop:row-start-1 laptop:mt-[20px] laptop:leading-[20px]">
              <PortableText value={project.description} />
            </div>

            <div className=" laptop:col-span-3 laptop:row-start-2 laptop:content-start">
              <div className="laptop:col-span-2 laptop:col-start-1 laptop:row-span-1">
                <div className="my-[10px] flex  items-center laptop:mt-[25px]">
                  <div>
                    <p className="ml-[6px] text-[6px] uppercase laptop:text-[8px]">
                      project
                    </p>
                    <p className="ml-[6px] text-[12px] uppercase laptop:text-[15px]">
                      {project.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
