import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AIStyleType, AspectRatio, AspectRatioArray} from '../constants/types';
import CustomBtn from '../components/CustomBtn';
import {useNavigation} from '@react-navigation/native';
import Animated, {FadeInUp, FadeOutDown, Layout} from 'react-native-reanimated';

const Home = () => {
  const navigation = useNavigation();

  const [selectedRatio, setSelectedRatio] = useState(AspectRatioArray[0].ratio);
  const [size, setSize] = useState({
    width: AspectRatioArray[0].width,
    height: AspectRatioArray[0].height,
  });
  const [selectedStyle, setSelectedStyle] = useState(AIStyles[0]);
  const [text, setText] = useState('');
  const [textNegative, setTextNegative] = useState('worst quality, low quality');
  const [textLength, setTextLength] = useState(0);

  const handleStyleSelected = (style: AIStyleType) => {
    setSelectedStyle(style);
  };

  const handleRatioSelect = (aspect: AspectRatio) => {
    setSelectedRatio(aspect.ratio);
    setSize({width: aspect.width, height: aspect.height});
  };

  const handleTextChange = (input: string) => {
    if (input.length <= 100) {
      setText(input);
      setTextLength(input.length);
    }
  };

  const addons = [
    {
      title: 'Add Photo',
      icon: <Ionicons name="image-outline" size={24} color="#ADADAD" />,
    },
    {
      title: 'Inspiration',
      icon: <FontAwesome6 name="lightbulb" size={24} color="#ADADAD" />,
    },
  ]; 
  const handleGenerate = async () => {
    let requestBody = {};
  
    switch (selectedStyle.model) {
      case 'modal-1':
        requestBody = {
          width: size.width,
          height: size.height,
          prompt: text,
          num_outputs: 1,
          num_inference_steps: 4,
          guidance_scale: 7.5,
          negative_prompt: textNegative,
        };
        break;
      case 'modal-2':
        requestBody = {
          prompt: text,
          scheduler: "K_EULER",
          width: size.width,
          height: size.height,
          num_images: 1,
          guidance_scale: 7.5,
          archive_outputs: false,
          prompt_strength: 0.45,
          sizing_strategy: 'width/height',
          num_inference_steps: 4,
        };
        break;
      case 'modal-3':
        requestBody = {
          width: 1024,
          height: 1024,
          scheduler: "K_EULER",
          guidance_scale: 0,
          prompt: text,
          num_inference_steps: 4,
          negative_prompt: textNegative,
        };
        break;
      default:
        requestBody = {
          width: size.width,
          height: size.height,
          prompt: text,
          num_images: 1,
          guidance_scale: 7.5,
          archive_outputs: false,
          prompt_strength: 0.45,
          sizing_strategy: 'width/height',
          num_inference_steps: 4,
        };
        break;
    }
  
    try {
      const response = await fetch(
        `http://10.0.2.2:4000/generate-image/${selectedStyle.model}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Image generated:', data);
  
      // Navigate to Results page with the generated data
      navigation.navigate('Results', { data, text });
    //  navigation.navigate('Test');
    } catch (error) {
      console.error('Error:', error.message); // Log the specific error message
    }
  };
//  plus membership
  // https://pixify.onrender.com | http://10.0.2.2:4000
const handleUpgradeToPlus = () => {
  // navigation.navigate('UpgradeToPlus');
// password: Stripe$Account123
}
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="bg-[#f7f7f7da] mx-4 flex-1 h-full">
      <Animated.View entering={FadeInUp} exiting={FadeOutDown}>
        <View className="my-5 flex flex-row justify-between items-center">
          <FontAwesome6
            name="people-group"
            style={{
              fontSize: 26,
              color: '#4F33FC',
            }}
          />
          <View className="flex-row gap-x-4 items-center flex">
            <View>
              <FontAwesome
                name="bell"
                style={{
                  fontSize: 24,
                  color: '#000000',
                }}
              />
              <View className="absolute z-30 scale-50 -top-px -right-1 w-4 h-4 rounded-full bg-red-600" />
            </View>
            <Pressable
                onPress={handleUpgradeToPlus}            
            className="bg-action flex-row gap-x-1 py-1 justify-center items-center px-2 rounded-full">
              <FontAwesome6
                name="crown"
                style={{
                  fontSize: 20,
                  color: '#fff',
                }}
              />
              <Text className="text-white text-base font-bold">PRO</Text>
            </Pressable>
          </View>
        </View>
      </Animated.View>

      {/* Prompt */}
      <Animated.View entering={FadeInUp} exiting={FadeOutDown} >
        <View className="h-[30vh] rounded-3xl bg-white drop-shadow-md p-4">
          <Text className="text-black-100 text-xl mt-4 font-psemibold">
            Enter Prompt
          </Text>
          <TextInput
            placeholder="Type anything...."
            placeholderTextColor={'#ADADAD'}
            multiline={true}
            value={text}
            onChangeText={handleTextChange}
            style={{
              textAlignVertical: 'top', // Ensures text starts from the top
            }}
            className="text-lg font-pregular rounded-lg flex-wrap text-black-100/90 w-full h-[70%]"
          />
          <View className="flex flex-row justify-between items-center">
            <AntDesign
              name="reload1"
              style={{
                fontSize: 26,
                color: '#4F33FC',
              }}
            />
            <View className="gap-x-3 flex-row flex items-center">
              <Animated.View
                entering={FadeInUp}
                exiting={FadeOutDown}
                >
                <Text className="text-lg text-black-200 font-pregular">
                  {textLength}/100
                </Text>
              </Animated.View>
              <Feather
                name="x"
                style={{
                  fontSize: 23,
                  color: '#4F33FC',
                }}
              />
            </View>
          </View>
        </View>
      </Animated.View>

      {/* Addons */}
      <Animated.View entering={FadeInUp} exiting={FadeOutDown} >
        <View className="flex-row mt-5 flex justify-around">
          {addons.map((item, index) => (
            <View
              className="flex-row flex bg-white items-center gap-x-3 px-4 py-3 rounded-2xl shadow"
              key={index}>
              <View> {item.icon} </View>
              <Text className="text-black-100 text-base font-psemibold">
                {item.title}
              </Text>
            </View>
          ))}
        </View>
      </Animated.View>

      {/* Aspect Ratio */}
      <Animated.View entering={FadeInUp} exiting={FadeOutDown} >
        <View className="my-5 rounded-3xl bg-white drop-shadow-md pt-3 pb-5 px-4">
          <Text className="text-black-100 text-xl my-3 capitalize font-psemibold">
            Aspect Ratio
          </Text>
          <View className="flex flex-row gap-x-5 gap-y-4 flex-wrap">
            {AspectRatioArray.map((item, index) => (
              <Pressable
                onPress={() => handleRatioSelect(item)}
                key={index}
                className={`${
                  item.ratio === selectedRatio ? 'bg-action' : 'bg-black-100/5'
                } w-[27%] flex justify-center items-center justify-items-center rounded-md py-2 px-3`}>
                <Text
                  className={`${
                    item.ratio === selectedRatio
                      ? 'text-white'
                      : 'text-black-100'
                  } self-center font-pmedium text-base`}>
                  {item.ratio}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </Animated.View>

      {/* Art Style */}
      <Animated.View entering={FadeInUp} exiting={FadeOutDown} >
        <View className="my-3 rounded-3xl bg-white drop-shadow-md pt-3 pb-5 px-4">
          <View className="flex flex-row justify-between mx-3 pb-2 items-center">
            <Text className="text-black-100 text-xl my-3 capitalize font-psemibold">
              Art Style
            </Text>
            <View />
          </View>
          {/* Main styles */}
          <View>
            <FlatList
              data={AIStyles}
              renderItem={({item}) => (
                <Pressable
                  onPress={() => handleStyleSelected(item)}
                  className={`w-40 justify-center h-52 ${
                    selectedStyle === item ? 'bg-black-100/5' : 'bg-white'
                  }`}>
                  <View className="w-32 self-center">
                    <Image
                      className="w-32 h-32 rounded-md"
                      source={{uri: item.image}}
                    />
                    <Text className="text-black-100 text-lg text-center my-3 capitalize font-psemibold">
                      {item.title}
                    </Text>
                  </View>
                </Pressable>
              )}
              keyExtractor={item => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </Animated.View>

      {/* Generate Button */}
      <Animated.View entering={FadeInUp} exiting={FadeOutDown} >
        <View className="mb-5">
          <CustomBtn
            onPress={handleGenerate}
            otherStyle={`self-center`}
            title="Generate"
          />
        </View>
      </Animated.View>
    </ScrollView>
  );
};

export default Home;

const AIStyles = [
  {
    id: 1,
    title: 'Colorful',
    image:
      'https://img.freepik.com/premium-photo/colorful-image-glass-ball-with-word-color-ball_912214-189.jpg',
    model: 'modal-1',
  },
  {
    id: 2,
    title: 'Cyberpunk',
    image:
      'https://img.freepik.com/free-photo/cyberpunk-urban-scenery_23-2150712464.jpg',
    model: 'modal-2',
  },
  {
    id: 3,
    title: 'Real',
    image: 'https://emarsys.com/app/uploads/2020/03/real-ai.jpg',
    model: 'modal-3',
  },
];
