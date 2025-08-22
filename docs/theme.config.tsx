import React from 'react';
import { DocsThemeConfig } from 'nextra-theme-docs';
import Image from 'next/image';
import { useRouter } from 'next/router';

const SITE_ROOT = 'https://sdk.poap.tech';

const config: DocsThemeConfig = {
  logo: <Image src={'/poap-logo.svg'} alt="POAP" width={40} height={40} />,
  project: {
    link: 'https://github.com/poap-xyz/poap-sdk',
  },
  docsRepositoryBase: 'https://github.com/poap-xyz/poap-sdk/tree/main/docs',
  footer: {
    text: `POAP © 2023-${new Date().getFullYear()}`,
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – POAP SDK',
    };
  },
  head: function Head() {
    const router = useRouter();
    const fullUrl =
      router.asPath === '/' ? SITE_ROOT : `${SITE_ROOT}${router.asPath}`;

    return (
      <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`/favicon-32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`/favicon-16x16.png`}
        />
        <link rel="shortcut icon" href={`/favicon.ico`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@poapxyz" />
        <meta name="twitter:creator" content="@poapxyz" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={fullUrl} />
        <link rel="canonical" href={fullUrl} />
        <meta property="twitter:image" content={SITE_ROOT + '/poap-logo.svg'} />
        <meta property="og:image" content={SITE_ROOT + '/poap-logo.svg'} />
        <meta property="og:locale" content="en_IE" />
        <meta property="og:site_name" content="POAP SDK" />
      </>
    );
  },
};

export default config;
