import React, { useState } from 'react';
import { SafeAreaView, Text, Image, TouchableOpacity, StyleSheet, View, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import HeadLogo from '../../assets/logo.png';

const DrawerHeader = () => {
  const navigation = useNavigation();
  const [isSearchVisible, setSearchVisible] = useState(false);

  return (
    <SafeAreaView style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.burgerIcon}>
              <Text style={styles.burgerIconText}>☰</Text>
          </TouchableOpacity>
          <Image source={HeadLogo} style={styles.headerImage} />
        </View>
        <View style={styles.headerMiddle}>
          
        </View>
        <View style={styles.headerRight}>
          {isSearchVisible && (
              <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                placeholderTextColor="grey"
              />
            )}
          <TouchableOpacity
            style={styles.searchIcon}
            onPress={() => setSearchVisible(!isSearchVisible)}
          >
            <Text style={styles.buttonText}>🔍</Text>
          </TouchableOpacity>
          {!isSearchVisible && (
            <TouchableOpacity style={styles.registerButton}>
              <Text style={styles.buttonText}>REGISTER</Text>
            </TouchableOpacity>
          )}
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    justifyContent: 'space-between'
  },
  headerImage: {
    width: 35,
    height: 35,
    marginRight: 10,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
  },
  headerRight: {
    flex: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderRadius: 5,
  },
  headerMiddle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 5,
  },
  burgerIcon: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  burgerIconText: {
    color: 'white',
    fontSize: 24,
  },
  registerButton: {
    backgroundColor: 'rgb(243, 206, 42)',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  searchIcon: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'rgb(0, 0, 0)',
    fontSize: 16,
    fontWeight: '800',
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
    fontSize: 16,
    fontWeight: '800',
    color: 'rgb(0, 0, 0)',
  },
});

export default DrawerHeader;
