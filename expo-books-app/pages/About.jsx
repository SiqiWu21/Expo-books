import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

const About = () => {
  const [licenses, setLicenses] = useState([]);

  useEffect(() => {
    // fetch("https://your-server-path/licenses.json")
    //   .then((response) => response.json())
    //   .then((data) => setLicenses(data))
    //   .catch((error) => console.error("Error loading licenses:", error));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.descriptionBox}>
        <Text style={styles.title}>About This App</Text>
        <Text style={styles.description}>
          This application is designed to help you manage your books and reading
          habits. It includes features such as tracking reading progress, book
          recommendations, and more.
        </Text>
      </View>

      <View style={styles.licensesBox}>
        <Text style={styles.title}>Open Source Licenses</Text>
        {licenses.length > 0 ? (
          licenses.map((license, index) => (
            <View key={index} style={styles.licenseItem}>
              <Text style={styles.licenseName}>{license.name}</Text>
              <Text style={styles.licenseText}>{license.licenseText}</Text>
            </View>
          ))
        ) : (
          <Text>Loading licenses...</Text>
        )}
      </View>
    </ScrollView>
  );
};

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
    fontSize: 20,
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
});

export default About;
