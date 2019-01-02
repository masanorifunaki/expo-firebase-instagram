import { Constants } from 'expo';
import { createStackNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import HomeScreen         from '../screens/HomeScreen';
import SearchScreen       from '../screens/SearchScreen';
import NotificationScreen from '../screens/NotificationScreen';
import UserScreen         from '../screens/UserScreen';
import {
  HomeTabIcon,
  SearchTabIcon,
  TakeTabIcon,
  NotificationTabIcon,
  MeTabIcon,
  TabBar,
}                         from '../components/Tab';

// StackNavigatorを簡単に作れるようにするための関数です
const createTabStack = (title, screen) => createStackNavigator({
  [title]: { screen },
});

// メインのBottomTabNavigatorです。画面下部のタブ関連の処理(画面遷移等)を司ります。
export default createBottomTabNavigator(
  {
    // ホームタブに関する設定
    HomeTab: {
      screen           : createTabStack('HomeTab', HomeScreen),
      // ホームタブのアイコンを定義
      navigationOptions: () => ({
        tabBarIcon: HomeTabIcon,
      }),
    },
    SearchTab: {
      screen           : createTabStack('SearchTab', SearchScreen),
      navigationOptions: () => ({
        tabBarIcon: SearchTabIcon,
      }),
    },
    TakeTab: {
      screen           : () => null,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon   : TakeTabIcon,
        tabBarOnPress: () => { // アイコンタップ時にTakeModalスクリーンを開きます。
          navigation.push('TakeModal');
        },
      }),
    },
    NotificationTab: {
      screen           : createTabStack('NotificationTab', NotificationScreen),
      navigationOptions: () => ({
        tabBarIcon: NotificationTabIcon,
      }),
    },
    MeTab: {
      screen           : createTabStack('MeTab', UserScreen),
      navigationOptions: () => ({
        tabBarIcon: MeTabIcon,
      }),
    },
  },
  // タブナビゲーション全体に関する設定値
  {
    tabBarOptions: {
      showLabel        : false,  // タブのアイコンの下にラベルを表示しないようにします
      activeTintColor  : '#333', // アクティブなタブの色を指定します。
      inactiveTintColor: '#bbb', // アクティブではないタブの色を指定します。
      style            : { // タブの背景色を設定します。
        backgroundColor: Constants.manifest.extra.backgroundColor,
      },
    },
    tabBarComponent : TabBar, // タブ部分のコンポーネントを指定します。
    tabBarPosition  : 'bottom', // タブバーの位置を指定します。
    animationEnabled: false, // アニメーションを無効にします。
    swipeEnabled    : false, // スワイプによる画面遷移を無効にします。
  },
);
