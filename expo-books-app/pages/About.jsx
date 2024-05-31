import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useSelector } from "react-redux";
import request from "../utils/request";

const About = () => {
  const [licenses, setLicenses] = useState([]);
  const fontSize = useSelector((state) => {
    return state.fontSize.fontSize;
  });
  // Function to fetch licenses from the API
  const getLicenses = async () => {
    let res = await request({
      url: "/licenses",
      method: "get",
    });

    // Convert the response object into an array of license objects
    let keyArr = Object.keys(res);
    let arr = [];
    keyArr.forEach((item) => {
      arr.push({
        name: item,
        licenses: res[item].licenses,
      });
    });
    setLicenses(arr);
  };

  // Fetch licenses when the component mounts
  useEffect(() => {
    getLicenses();
  }, []);

  // Render function for each license item in the FlatList
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={[styles.title, {fontSize}]}>{item.name}</Text>
      <Text style={styles.license}>License: {item.licenses}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* About section */}
      <View style={styles.descriptionBox}>
        <Text style={[styles.title, {fontSize}]}>About This App</Text>
        <Text style={[styles.description, {
          fontSize
        }]}>
          This application is an application that manages books in the user's
          real life. The core functions include the ability for users to add
          books, categorize books, change the read status of books, write book
          reviews for their own books, and also include a FIND page, similar to
          social circles, where users can view all published book reviews. In
          addition, the basic functions of the application include login,
          registration, password modification, modifying user basic information,
          and setting the font size of the application.
        </Text>
      </View>

      {/* Licenses section */}
      <View style={styles.licensesBox}>
        <Text style={styles.title}>Open Source Licenses</Text>
        <FlatList
          data={licenses}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
        />
      </View>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  descriptionBox: {
    marginBottom: 20,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#333",
  },
  licensesBox: {
    marginTop: 20,
  },
  licenseItem: {
    marginBottom: 15,
  },
  licenseName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  licenseText: {
    fontSize: 14,
    color: "#555",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  license: {
    fontSize: 12,
    color: "#999",
  },
});

export default About;
