import {View, Text, Pressable} from 'react-native';
import React from 'react';
type CustomBtnProps = {
  title: string;
  onPress?: () => void;
  otherStyle?: string;
};
const CustomBtn = ({title, otherStyle, onPress}: CustomBtnProps) => {
  return (
    <Pressable className={`bg-action mt-5 py-4 w-[80vw] px-5 rounded-full ` + otherStyle} onPress={onPress}>
      <Text className='text-white text-center text-base font-psemibold'>{title}</Text>
    </Pressable>
  );
};

export default CustomBtn;
