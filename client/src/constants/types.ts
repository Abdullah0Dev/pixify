export type AspectRatio = {
    width: number;
    height: number;
    ratio: string;
  };
export type AIStyleType = {
  id: number;
    title: string; 
    image: string;
  };
  
 export const AspectRatioArray: AspectRatio[] = [
    {
      width: 1080,
      height: 1080,
      ratio: '1:1',
    },
    {
      width: 720,
      height: 1280,
      ratio: '9:16',
    },
    {
      width: 1920,
      height: 1080,
      ratio: '16:9',
    },
    {
      width: 720,
      height: 480,
      ratio: '3:2',
    },
    {
      width: 800,
      height: 400,
      ratio: '4:2',
    },
    {
      width: 1250,
      height: 1000,
      ratio: '5:4',
    },
  ];
     