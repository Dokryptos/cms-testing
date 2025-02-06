import { UIImageSanity } from "../../ui/image/sanity";
import Project from "../../../types/project";

type ProjectGalleryProps = {
  gallery: Project["gallery"];
  index: number;
  setIndex: (index: number) => void;
};

export default function ProjectGallery({
  gallery,
  index,
  setIndex,
}: ProjectGalleryProps) {
  const handleArrowNext = () => {
    setIndex((index + 1) % gallery.length);
  };

  const handleArrowPrev = () => {
    setIndex((index + gallery.length - 1) % gallery.length);
  };
  console.log(gallery);
  return (
    <div className="w-full">
      <div className=" mb-[10px] h-[110vw] w-full overflow-hidden laptop:h-full laptop:max-h-[500px]">
        <UIImageSanity
          key={index}
          asset={gallery[index]}
          className="h-full w-full object-cover laptop:max-h-[500px] laptop:object-contain laptop:object-right-bottom"
          alt="Caroussel image"
        />
      </div>
      <div className="grid select-none grid-cols-3 items-center overflow-hidden laptop:ml-auto laptop:w-[88px]">
        <div
          className="targeting-action m-[-10px] p-[10px]"
          onClick={() => handleArrowPrev()}
        ></div>
        <p className="justify-self-center">
          {index + 1}/{gallery.length}
        </p>
        <div
          className="targeting-action m-[-10px] justify-self-end p-[10px]"
          onClick={() => handleArrowNext()}
        ></div>
      </div>
    </div>
  );
}
