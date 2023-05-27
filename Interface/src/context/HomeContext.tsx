import { ReactNode } from 'react';
import { CameraProvider } from 'context/Home/CameraContext';
import { IntroductionCardProvider } from 'context/Home/IntroductionCardContext';


interface Props {
  children: ReactNode;
}

export const HomeProvider = ({ children }: Props) => (
  <CameraProvider>
    <IntroductionCardProvider>
      {children}
    </IntroductionCardProvider>
  </CameraProvider>
);