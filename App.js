import React                       from 'react';
import { Text, View }              from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import fonts                       from './src/fonts';
import images                      from './src/images';

export default class App extends React.Component {
  static defaultProps = {
    skipLoadingScreen: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
    };
  }

  loadResourcesAsync = async () => {
    await Asset.loadAsync(Object.keys(images)
      .map(key => images[key]));
    await Font.loadAsync(fonts);

    return true;
  };

  render() {
    const { isLoadingComplete } = this.state;
    const { skipLoadingScreen } = this.props;
    if (!isLoadingComplete && !skipLoadingScreen) {
      return (
        <AppLoading
          // 非同期でリソースをロード
          startAsync={this.loadResourcesAsync}
          onError={error => console.warn(error)}
          onFinish={() => this.setState({ isLoadingComplete: true })}
        />
      );
    }
    return (
      <View style={{
        flex          : 1,
        alignItems    : 'center',
        justifyContent: 'center',
      }}
      >
        <Text>Hello</Text>
      </View>
    );
  }
}
