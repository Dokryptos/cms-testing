"use client";
import { UIImageSanity } from "../../ui/image/sanity";
import ProjectType from "../../../types/still-Life";
import { useState } from "react";
type ProjectGalleryProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gallery: any[]; // Array d'images du projet
  projectArray: ProjectType[]; // Liste de tous les projets
  currentProjectSlug: string; // Slug du projet actuel
};

export default function ProjectGallery({
  gallery,
  projectArray,
  currentProjectSlug,
}: ProjectGalleryProps) {
  const projectsArray = Array.isArray(projectArray)
    ? projectArray
    : [projectArray];
  const currentProjectIndex = projectsArray.findIndex(
    (p) => p.slug.current === currentProjectSlug
  );

  const currentProject = projectsArray[currentProjectIndex];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    if (currentImageIndex === gallery.length - 1) {
      // Si c'est la dernière image, passer au projet suivant
      const nextProject =
        projectArray[(currentProjectIndex + 1) % projectsArray.length]; // Boucle sur le premier projet
      window.location.href = `/project/${nextProject.slug.current}`;
    } else {
      setCurrentImageIndex((currentImageIndex + 1) % gallery.length);
    }
  };

  const prevImage = () => {
    if (currentImageIndex === 0) {
      // Si c'est la première image, passer au projet précédent
      const prevProject =
        projectArray[
          (currentProjectIndex - 1 + projectArray.length) % projectsArray.length
        ];
      window.location.href = `/project/${prevProject.slug.current}`;
    } else {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };
  return (
    <div className="w-full">
      <div className=" mb-[10px] h-[110vw] w-full overflow-hidden laptop:h-full laptop:max-h-[500px]">
        <UIImageSanity
          key={gallery[currentImageIndex]._key}
          asset={gallery[currentImageIndex]}
          className="h-full w-full object-cover laptop:max-h-[500px] laptop:object-contain laptop:object-right-bottom"
          alt="Caroussel image"
        />
      </div>
      <div className="grid select-none grid-cols-3 items-center overflow-hidden laptop:ml-auto laptop:w-[88px]">
        <div
          className="targeting-action m-[-10px] p-[10px]"
          onClick={prevImage}
        >
          Prev
        </div>
        <div className="justify-self-center">
          <h2>{currentProject.title}</h2>
          <p>
            {currentImageIndex + 1}/{gallery.length}
          </p>
        </div>
        <div
          className="targeting-action m-[-10px] justify-self-end p-[10px]"
          onClick={nextImage}
        >
          Next
        </div>
      </div>
    </div>
  );
}
