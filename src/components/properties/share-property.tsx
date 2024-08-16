"use client";

import { Property } from "@/models/Property";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";

type SharePropertyProps = {
  property: Property;
  propertyId: string;
};

export const ShareProperty = ({ propertyId, property }: SharePropertyProps) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${propertyId}`;

  return (
    <>
      <h3 className="text-xl font-bold text-center pt-2">
        Share this property:
      </h3>
      <div className="flex gap-3 justify-center pb-5">
        <FacebookShareButton
          url={shareUrl}
          title={property.name}
          hashtag={`#${property.type.replace(/\s/g, "")}ForRent`}
        >
          <FacebookIcon size={40} round />
        </FacebookShareButton>
        <TwitterShareButton
          url={shareUrl}
          hashtags={[`#${property.type.replace(/\s/g, "")}ForRent`]}
        >
          <TwitterIcon size={40} round />
        </TwitterShareButton>
        <WhatsappShareButton
          url={shareUrl}
          title={property.name}
          separator="::"
        >
          <WhatsappIcon size={40} round />
        </WhatsappShareButton>
        <EmailShareButton
          url={shareUrl}
          subject={property.name}
          body={`Check out this property: ${shareUrl}`}
        >
          <EmailIcon size={40} round />
        </EmailShareButton>
      </div>
    </>
  );
};
