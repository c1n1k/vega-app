import React, { useState } from 'react';
import { PageBanner } from '@gpn-prototypes/vega-page-banner';

import { cnPage } from './cn-create-page';
import { BannerInfoProps } from './types';
import { ProjectForm } from '../../ui/features/projects';

type PageProps = {};

export const CreateProjectPage: React.FC<PageProps> = () => {
  const [bannerInfo, setBannerInfo] = useState<BannerInfoProps>({});
  const { title, description } = bannerInfo;

  return (
    <div className={cnPage()}>
      <PageBanner title={title} description={description} />
      <ProjectForm bannerInfo={bannerInfo} setBannerInfo={setBannerInfo} />
    </div>
  );
};
