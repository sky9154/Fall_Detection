type UserType = {
  name: string | null;
  role: string | null;
  username: string | null;
  token: string | null;
}

type IntroductionCardType = {
  name: string | null;
  phoneNumber: string | null;
  note: string | null;
}

const IP = process.env.REACT_APP_IP;
const PORT = process.env.REACT_APP_PORT;

/**
 * 取得緊急聯絡人
 * @param user user
 * @param introductionCard introductionCard
 */
const get = async (user: UserType, setIntroductionCard: (introductionCard: IntroductionCardType[]) => void) => {
  const url = `http://${IP}:${PORT}/api/contact/get`;

  const requestOptions = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  };

  fetch(url, requestOptions).then(async (response: Response) => {
    const json = await response.json();

    setIntroductionCard(json.introduction_card);
  });
}

const IntroductionCard = {
  get
}

export default IntroductionCard;