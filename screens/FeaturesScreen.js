import React from 'react';
// import { ExpoConfigView } from '@expo/samples';
import {Text, View, FlatList} from 'react-native';

class FeaturesScreen extends React.Component {
  constructor(props){
    super(props)
    this.state={

    }
  }
  static navigationOptions = {
    title: 'Features',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent:'space-evenly', flexDirection: 'row'}}>
        <View>
          <Text>Class Features</Text>
          <FlatList
            data={[{key:'Feature 1 Name', value:'Feature 1 Description'}, {key:'Feature 2 Name', value:'Feature 2 Description'}]}
            renderItem={({item}) => <Text>{item.key}</Text>}
            />
        </View>
        <View>
            <Text>Subclass Features</Text>
            <FlatList
            data={[{key:'Feature 1 Name', value:'Feature 1 Description'}, {key:'Feature 2 Name', value:'Feature 2 Description'}]}
            renderItem={({item}) => <Text>{item.key}</Text>}
              />
        </View>
        
      </View>
    )
  }
}

export default FeaturesScreen;