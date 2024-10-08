import Image from "next/image";

type PropertyHeaderImageProps = {
  image: string;
};

export const PropertyHeaderImage = ({ image }: PropertyHeaderImageProps) => (
  <section>
    <div className="container-xl m-auto">
      <div className="grid grid-cols-1">
        <Image
          src={image}
          alt="Property image"
          className="object-cover h-[400px] w-full "
          width={0}
          height={0}
          sizes="100vw"
        />
      </div>
    </div>
  </section>
);
