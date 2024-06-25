import {View, Text, ImageBackground} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOut,
  FadeOutDown,
  Layout,
} from 'react-native-reanimated';
import CustomBtn from '../components/CustomBtn';
import {useNavigation} from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={require('../assets/images/splash.png')}
      className="w-full h-full flex-1">
      <LinearGradient
        start={{x: 0, y: 0.5}}
        end={{x: 0, y: 0.7}}
        colors={['transparent', '#FFFFFF']}
        style={{flex: 1}}>
        <View className="h-[66%]" />
        <View className="">
          <Animated.View  className={` px-5`}>
            <Animated.Text
              entering={FadeInUp.duration(3000)}
              className="text-3xl text-black-100 text-center font-pbold ">
              Ignite Your Ideas with Captivating Visuals
            </Animated.Text>
            <Text className="text-base text-center text-black-200 mt-3">
              Unlock the images of your imagination and experience the thrill of
              bringing your creative visions to life like never before
            </Text>
          </Animated.View>

          <CustomBtn
            onPress={() => navigation.navigate('Home')}
            otherStyle={` self-center `}
            title="Get Started"
          />
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default Splash;
