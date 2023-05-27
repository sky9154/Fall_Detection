import { FC } from 'react';
import {
  ScrollContainer,
  ScrollPage,
  Animator,
  batch,
  Sticky,
  Fade,
  Move,
  MoveOut
} from 'react-scroll-motion';
import { H1 } from 'components/Typography';
import { info } from 'assets/data'

const Info: FC = () => {
  const FadeUp = batch(Fade(), Move(), Sticky());

  return (
    <ScrollContainer style={{ width: '100%' }}>
      {info.introduce.map((introduce, index) => (
        (index === 1) ? (
          <ScrollPage key={index}>
            <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -200))}>
              <H1>
                {introduce}
              </H1>
            </Animator>
          </ScrollPage>
        ) : (index === (info.introduce.length - 1)) ? (
          <ScrollPage key={index}>
            <Animator animation={batch(Fade(), Sticky())}>
              <H1>
                {introduce}
              </H1>
            </Animator>
          </ScrollPage>
        ) : (
          <ScrollPage key={index}>
            <Animator animation={FadeUp}>
              <H1>
                {introduce}
              </H1>
            </Animator>
          </ScrollPage>
        )
      ))}
    </ScrollContainer>
  );
}

export default Info;