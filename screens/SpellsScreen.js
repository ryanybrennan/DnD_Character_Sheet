import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

class SpellsScreen extends React.Component {
    static navigationOptions = {
      title: 'Spells',
    };
  
    render() {
      return (
        <ScrollView style={styles.container}>
          {/* Go ahead and delete ExpoLinksView and replace it with your
             * content, we just wanted to provide you with some helpful links */}
          <Text>Spells List if Applicable</Text>
        </ScrollView>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 15,
      backgroundColor: '#fff',
    },
  });

  export default SpellsScreen;