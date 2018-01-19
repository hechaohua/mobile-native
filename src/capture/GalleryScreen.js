import React, {
  Component
} from 'react';

import {
  Text,
  StyleSheet,
  CameraRoll,
  ActivityIndicator,
  TouchableOpacity,
  InteractionManager,
  Image,
  View,
  FlatList,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import Camera from 'react-native-camera';

import {
  MINDS_URI
} from '../config/Config';
import { Button } from 'react-native-elements';
import CenteredLoading from '../common/components/CenteredLoading'

/**
 * Gallery Screen
 */
export default class GalleryScreen extends Component {

  state = {
    photos: [],
    imageUri: '',
    isPosting: false,
    disabled: true,
    imagesLoaded: false,
  }

  static navigationOptions = {
    header: null,
    tabBarIcon: ({ tintColor }) => (
      <Icon name="md-radio-button-on" size={24} color={tintColor} />
    )
  }

  /**
   * Render
   */
  render() {
    if (this.state.disabled) {
      InteractionManager.runAfterInteractions(() => {
        setTimeout(() => {
          CameraRoll.getPhotos({
              first: 27,
              assetType: 'All',
            })
            .then(r => {
              this.setState({
                imagesLoaded: true,
                photos: r.edges,
                navigation: r.page_info,
              });
            })
            .catch((err) => {
              //Error Loading Images
            });

          this.setState({ disabled: false });
        }, 100);
      });
    }
    return (
      <View style={styles.screenWrapper}>
        { this.state.imageUri.length > 0 ?
          <View style={styles.submitButton}>
            { this.state.isPosting ?
              <ActivityIndicator size="small" color="#00ff00" /> :
              <Icon onPress={() => this.upload()} color="white" name="md-send" size={28}></Icon>
            }
          </View> : <View></View>
        }
        <View style={styles.selectedImage} >
          { this.state.imageUri.length == 0 ?
            this.getCamera() :
            <Image
              source={{ uri : this.state.imageUri }}
              style={styles.tileImage}
            />
          }
        </View>
        <View style={{flex:2}}>
          { this.state.imagesLoaded ?
            <FlatList
              data={this.state.photos}
              renderItem={this.renderTile}
              keyExtractor={item => item.node.image.uri}
              onEndThreshold={0}
              initialNumToRender={27}
              style={styles.listView}
              numColumns={3}
              horizontal={false}
            /> :
            <CenteredLoading/>
          }
        </View>
      </View>
    );
  }

  getCamera() {
    if (this.state.disabled) return null;
    return (
      <Camera
        ref={(cam) => {
          this.camera = cam;
        }}
        style={styles.preview}
        aspect={Camera.constants.Aspect.fill}>
        <Text style={styles.capture} onPress={() => this.props.moveToCapture()} name="md-camera" size={24}> Take a new photo </Text>
      </Camera>
    );
  }

  /**
   * upload
   */
  upload() {
    this.setState({
      isPosting:true,
    });
    this.props.submitToPoster(this.state.imageUri);
  }

  /**
   * render list tile
   */
  renderTile = (row) => {
    return (
      <TouchableOpacity style={styles.tileImage} onPress={() => this.setState({imageUri: row.item.node.image.uri})}>
        <Image
          source={{ uri : row.item.node.image.uri }}
          style={styles.tileImage}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },
  tileImage: {
    minHeight: 120,
    flex: 1,
  },
  listView: {
    backgroundColor: '#FFF',
    flex:1
  },
  selectedImage: {
    flex:3,
    borderWidth:1,
    borderColor: 'white',
  },
  submitButton: {
    position: 'absolute',
    top:15,
    right:30,
    zIndex:100
  }
});