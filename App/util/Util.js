import { Alert } from 'react-native';
export function ShowAlert(heading,alertMessage){
    Alert.alert(
        heading,
        alertMessage,
        [
        {text: 'OK', onPress: () => {}},
        ],
        { cancelable: true }
    )
}