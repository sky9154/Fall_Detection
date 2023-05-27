import {
  ReactNode,
  createContext,
  useState,
  useEffect,
  useContext
} from 'react';
import introCard from 'api/introductionCard';


interface Props {
  children: ReactNode;
}

interface IntroductionCard {
  name: string | null;
  phoneNumber: string | null;
  note: string | null;
}

type IntroductionCardContextProps = {
  introductionCard: {
    value: IntroductionCard[];
    setValue: (value: IntroductionCard[]) => void;
  };
}

const IntroductionCardContext = createContext<IntroductionCardContextProps>({
  introductionCard: {
    value: [{
      name: null,
      phoneNumber: null,
      note: null
    }],
    setValue: () => { }
  }
});

export const IntroductionCardProvider = ({ children }: Props) => {
  const [introductionCard, setIntroductionCard] = useState<IntroductionCard[]>([{
    name: null,
    phoneNumber: null,
    note: null
  }]);

  useEffect(() => {
    introCard.get(setIntroductionCard);
  }, []);

  return (
    <IntroductionCardContext.Provider value={{
      introductionCard: {
        value: introductionCard,
        setValue: setIntroductionCard
      }
    }}>
      {children}
    </IntroductionCardContext.Provider>
  );
}

export const useIntroductionCardContext = () => useContext(IntroductionCardContext);