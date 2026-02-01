import { Metadata } from 'next';

const initMetadata = {
  title: 'board',
  description: '게시판입니다.',
};

export const defineMetadata = () => {
  let meta!: Metadata;

  const setMetadata = (data: Metadata) => {
    meta = data;
  };
  const getMetadata = (): Metadata => meta || initMetadata;

  return {
    setMetadata,
    getMetadata,
  };
};
