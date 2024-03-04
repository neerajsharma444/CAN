import {View, TouchableOpacity, Text, Image} from 'react-native';
import React from 'react';
import {styles} from './Header.Styles';
import IMAGES from '@assets/images';

const Header = ({
  navigation,
  renderText,
  renderImage = true,
  drawer = true,
  back,
}) => {
  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={openDrawer}>
        {drawer && (
          <Image
            source={IMAGES.drawer}
            resizeMode="cover"
            style={styles.drawerIcon}
          />
        )}
        {back && (
          <Image
            source={IMAGES.back}
            resizeMode="cover"
            style={styles.backIcon}
          />
        )}
      </TouchableOpacity>

      {renderImage && (
        <View style={styles.logoContainer}>
          <Image
            source={IMAGES.logo}
            resizeMode="cover"
            style={styles.canLogo}
          />
        </View>
      )}
      {renderText && <Text style={styles.headerText}>{renderText}</Text>}
    </View>
  );
};

export default Header;
