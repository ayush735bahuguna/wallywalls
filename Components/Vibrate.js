import * as Haptics from 'expo-haptics';

export default function Vibrate() {
    Haptics.impactAsync();
}