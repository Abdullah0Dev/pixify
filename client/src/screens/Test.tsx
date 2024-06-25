import { View, Text, Pressable, PermissionsAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CheckoutScreen } from '../components';
import PaymentScreen from './PaymentScreen';

type THook = [boolean, boolean, () => void];

interface PermissionsAndroidResponse {
  [key: string]: string;
}

const PERMISSIONS_REQUEST = [
  PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
];

const isAllGranted = (res: PermissionsAndroidResponse) => {
  return PERMISSIONS_REQUEST.every((permission) => {
    return res[permission] === PermissionsAndroid.RESULTS.GRANTED;
  });
};

export const useAndroidPermissions = (): THook => {
  const [granted, setGranted] = useState(false);
  const [waiting, setWaiting] = useState(true);

  const doRequest = async () => {
    let granted = false;
    try {
      const res = await PermissionsAndroid.requestMultiple(PERMISSIONS_REQUEST);
      granted = isAllGranted(res);
    } catch (err) {
      console.warn(err);
    }
    setWaiting(false);
    setGranted(granted);
  };

  useEffect(() => {
    doRequest();
  }, []);

  return [waiting, granted, doRequest];
};

const Test = () => {
  const [waiting, granted, doRequest] = useAndroidPermissions();

  return (
    <>
    
    <PaymentScreen />
    </>
  );
};

export default Test;
