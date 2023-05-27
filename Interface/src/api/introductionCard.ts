import { NetworkAddress } from 'assets/data';


interface IntroductionCard {
  name: string | null,
  phoneNumber: string | null,
  note: string | null
}

const ip = NetworkAddress.ip;
const port = NetworkAddress.port;
const token = localStorage.getItem('access_token');

/**
 * 取得緊急聯絡人
 * @param introductionCard introductionCard
 */
const get = async (setIntroductionCard: (introductionCard: IntroductionCard[]) => void) => {
  const url = `http://${ip}:${port}/api/introduction_card`;

  if (token) {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
  
    fetch(url, requestOptions).then(async (response: Response) => {
      const json = await response.json();
  
      if (response.ok) {
        const result: IntroductionCard[] = json.introduction_card;
  
        setIntroductionCard(result);
      }
    });
  }
}

const introductionCard = {
  get
}

export default introductionCard;