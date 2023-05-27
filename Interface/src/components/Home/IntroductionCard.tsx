import { FC } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { Paragraph } from 'components/Typography';
import { useIntroductionCardContext } from 'context/Home/IntroductionCardContext';


const IntroductionCard: FC = () => {
  const { introductionCard } = useIntroductionCardContext();

  return (
    <Stack
      direction="column"
      height="100%"
      width="100%"
      divider={<Divider orientation="vertical" flexItem />}
      alignItems="center"
      spacing={2}
    >
      {
        introductionCard.value.map((card, index) => (
          <Card sx={{
            width: '100%',
            borderRadius: 4,
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
      }
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
      >
        <IconButton
          aria-label="add introduction card"
          component="label"
          size="large"
          disableRipple
          sx={{ color: '#42A5F5' }}
        >
          <FaPlusCircle style={{ fontSize: '42px' }} />
        </IconButton>
      </Box>
    </Stack>
  );
}

export default IntroductionCard;