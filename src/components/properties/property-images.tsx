import classNames from "classnames";
import Image from "next/image";

type PropertyImagesProps = {
  images: string[];
};

export const PropertyImages = ({ images }: PropertyImagesProps) => (
  <section className="bg-blue-50 p-4">
    <div className="container mx-auto">
      {images.length === 1 ? (
        <Image
          src={images[0]}
          alt="Property image"
          className="object-cover h-[400px] w-full rounded-xl"
          width={1800}
          height={400}
          sizes="100vw"
        />
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className={classNames(
                images.length === 3 && index === 2 ? "col-span-2" : "col-span-1"
              )}
            >
              <Image
                src={image}
                alt={`Property image ${index + 1}`}
                className="object-cover h-[400px] w-full rounded-xl"
                width={1800}
                height={400}
                sizes="100vw"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  </section>
);
