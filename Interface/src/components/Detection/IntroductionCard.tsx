import { FC, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import introCard from 'api/introductionCard';
import { useAuthContext } from 'context/AuthContext';
import { Paragraph } from 'components/Typography';


type IntroductionCardType = {
  name: string | null;
  phoneNumber: string | null;
  note: string | null;
}

const IntroductionCard: FC = () => {
  const { userState } = useAuthContext();

  const [introductionCard, setIntroductionCard] = useState<IntroductionCardType[]>([]);

  useEffect(() => {
    introCard.get(userState.value, setIntroductionCard)
  }, [userState.value, userState.value.token]);

  return (
    <Stack
      direction="column"
      height="100%"
      width="100%"
      divider={<Divider orientation="vertical" flexItem />}
      alignItems="center"
      spacing={2}
    >
      {(introductionCard.length === 0) ? (<></>) : (
        introductionCard.map((card, index) => (
          <Card sx={{
            width: '100%',
            borderRadius: 2,
            boxShadow: '0 4px 8px 0 #BDC9D7'
          }}
            key={index}
          >
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-around"
                alignItems="stretch"
                height="100%"
                width="100%"
                spacing={2}
              >
                <Stack
                  direction="column"
                  alignItems="stretch"
                  spacing={2}
                  width="50%"
                >
                  <Paragraph>姓名: {card.name}</Paragraph>
                  <Paragraph>電話: {card.phoneNumber}</Paragraph>
                </Stack>
                <Divider orientation="vertical" flexItem />
                <Box width="50%">
                  <Paragraph>{card.note}</Paragraph>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        ))
      )}
    </Stack>
  );
}

export default IntroductionCard;