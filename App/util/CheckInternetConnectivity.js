import { NetInfo } from 'react-native';
import {ShowAlert} from '../util/Util'

export function registerInternetConnectivityListener(){
    NetInfo.isConnected.addEventListener(
        'connectionChange',
        isOnline
    );
}

export function removeInternetConnectivityListener(){
    NetInfo.isConnected.removeEventListener(
        'connectionChange',
        isOnline
    );
}

export function isConnectedToInternet(ifConnected,ifNotConnected){
    NetInfo.getConnectionInfo().then((reach) => {
        reach = reach.type.toLocaleLowerCase();
        if(reach === "none") {
            if(ifNotConnected){
                ifNotConnected();
            }
        }
        else if(reach === "unknown") { 
            ShowAlert("Connection Error","Destination Host Unreachable")
        }
        else{
            ifConnected();
        }
    });
}

const isOnline  =  (reach)=>{
    return reach;
}