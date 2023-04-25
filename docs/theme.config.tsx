import React from 'react';
import { DocsThemeConfig } from 'nextra-theme-docs';
import Image from 'next/image';

const config: DocsThemeConfig = {
  logo: <Image src={'/poap-logo.svg'} alt="as" width={40} height={40} />,
  project: {
    link: 'https://github.com/poap-xyz/poap.js',
  },
  docsRepositoryBase: 'https://github.com/poap-xyz/poap.js/tree/master/docs',
  footer: {
    text: 'POAP © 2023',
  },
};

export default config;
