import {
  View,
  Text,
  Pressable,
  Image,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  Alert,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import CustomBtn from '../components/CustomBtn';
import {useNavigation, useRoute} from '@react-navigation/native';
import RNFetchBlob from 'rn-fetch-blob';

type ControlItem = {
  id: number;
  icon: JSX.Element;
};

type SaveOrRepeatItem = {
  id: number;
  name: string;
  icon: JSX.Element;
};

const controlItem: ControlItem[] = [
  {
    id: 1,
    icon: <FontAwesome6 name="bookmark" size={28} color={'#ADADAD'} />,
  },
  {
    id: 2,
    icon: <Ionicons name="trash-outline" size={28} color={'#ADADAD'} />,
  },
  {
    id: 3,
    icon: <Ionicons name="share-outline" size={28} color={'#ADADAD'} />,
  },
];

const SaveOrRepeat: SaveOrRepeatItem[] = [
  {
    id: 1,
    name: 'Repeat the Prompt',
    icon: <AntDesign name="reload1" size={28} color={'#ADADAD'} />,
  },
  {
    id: 2,
    name: 'Download',
    icon: <AntDesign name="download" size={28} color={'#ADADAD'} />,
  },
];

const Results = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {data, text} = route.params as {data: string[]; text: string};

  const [selectedAction, setSelectedAction] = useState<number>(
    controlItem[0].id,
  );

  const handleActionSelected = (action: number) => {
    setSelectedAction(action);
  };

  // if (!data) {
  //   return (
  //     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //       <ActivityIndicator color={'#3d3d3d'} size={'large'} />
  //     </View>
  //   );
  // }

  const REMOTE_IMAGE_PATH =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/gift.png';

  const checkPermission = async () => {
    if (Platform.OS === 'ios') {
      downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to download Photos',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Storage Permission Granted.');
          downloadImage();
        } else {
          Alert.alert('Storage Permission Denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const downloadImage = () => {
    let date = new Date();
    let image_URL = REMOTE_IMAGE_PATH;
    let ext = getExtention(image_URL);
    if (ext) {
      ext = '.' + ext[0];
      const {config, fs} = RNFetchBlob;
      let PictureDir = fs.dirs.PictureDir;
      let options = {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path:
            PictureDir +
            '/image_' +
            Math.floor(date.getTime() + date.getSeconds() / 2) +
            ext,
          description: 'Image',
        },
      };
      config(options)
        .fetch('GET', image_URL)
        .then(res => {
          console.log('res -> ', JSON.stringify(res));
          Alert.alert('Image Downloaded Successfully.');
        });
    }
  };

  const getExtention = (filename: string): RegExpExecArray | null => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : null;
  };

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
 
  return (
    <View className="mx-4 bg-[#f7f7f7da]">
      {/* header */}
      <View className="flex my-4 justify-between items-center flex-row ">
        <Pressable
          onPress={() => navigation.goBack()}
          className="border rounded-full p-2 border-black-100/60">
          <AntDesign
            name="arrowleft"
            style={{
              fontSize: 26,
              color: '#4F33FC',
            }}
          />
        </Pressable>
        <Text className="text-xl font-psemibold text-black-100">Results</Text>
        <View />
      </View>
      {/* image */}
      <View className="h-60  rounded-xl py-3 bg-white shadow-xl w-full">
        <Image
          source={{uri: `${data[0]}`}} // 
          className="w-full rounded-xl h-full"
          resizeMode="contain"
        />
      </View>
      <CustomBtn
        // onPress={() => navigation.navigate('Results')}
        otherStyle={` self-center `}
        title="Re-Generate"
      />
      {/* prompt */}
      <View className="h-fit w-full py-4   mt-5 shadow bg-white rounded-xl">
        <Text className="text-black-100 px-2 text-lg font-psemibold">
          {text}
          {/* Let's try it */}
        </Text>
      </View>
      {/* controllers */}
      <View className="flex-row justify-center gap-x-5 mt-5 items-center">
        {controlItem.map((item, index) => (
          <Pressable
            onPress={() => setSelectedAction(item.id)}
            key={index}
            className={`  py-3 rounded-xl  px-10
            ${item.id === selectedAction ? 'bg-action  ' : 'bg-white '}
            shadow`}>
            {item.icon}
          </Pressable>
        ))}
      </View>

      {/* download or repeat prompt */}
      <View className="flex-col   gap-y-5 mt-5 items-start ">
        {SaveOrRepeat.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => {
              if (item.id === 2) {
                checkPermission();
              }
            }}
            className={` bg-white  w-full py-3 rounded-xl flex flex-row   shadow`}>
            <Text className="ml-3">{item.icon}</Text>
            <Text className="ml-3 text-lg font-pbold">{item.name}</Text>
          </Pressable>
        ))}
      </View> 
    </View>
  );
};

export default Results;
