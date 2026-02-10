"use client";

type JsonLdProps = {

  data: Record<string, any>;

};

export default function JsonLd({ data }: JsonLdProps) {

  return (

    <script

      type="application/ld+json"

      // eslint-disable-next-line react/no-danger

      dangerouslySetInnerHTML={{

        __html: JSON.stringify(data)

      }}

    />

  );

}