import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {styles} from './Profile.Styles';
import Header from '@components/common/Header/Header';
import Button from '@components/common/Button/Button';
import IMAGES from '@assets/images';

const Profile = ({navigation}) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Header navigation={navigation} />
        <View style={styles.content}>
          <Text style={styles.title}>My Profile</Text>
          <View style={styles.imageContainer}>
            <View style={styles.profileImage}>
              <TouchableOpacity>
                <Image source={IMAGES.camera} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput style={styles.input} placeholder="Enter Name" />
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} placeholder="Enter Email" />
            <Text style={styles.label}>Date of Birth</Text>
            <View style={styles.dateContainer}>
              <TextInput style={styles.inputDate} placeholder="Enter Date" />
              <Image style={styles.dateIcon} source={IMAGES.calendar} />
            </View>
            <Text style={styles.label}>Phone</Text>
            <TextInput style={styles.input} placeholder="Enter Phone" />
            <Text style={styles.label}>Organization</Text>
            <TextInput style={styles.input} placeholder="Enter Organization" />
            <Text style={styles.label}>State</Text>
            <TextInput style={styles.input} placeholder="Enter State" />
            <Text style={styles.label}>City</Text>
            <TextInput style={styles.input} placeholder="Enter City" />
            <Button buttonName="Update" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
