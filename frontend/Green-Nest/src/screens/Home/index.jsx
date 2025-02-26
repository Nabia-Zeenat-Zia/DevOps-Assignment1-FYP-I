import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  SafeAreaView,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

// Dummy data for plants (can be replaced with an API call)
const plants = [
  {
    id: "1",
    name: "Aloe Vera",
    climate: "Tropical",
    day: "5",
    image: "https://via.placeholder.com/100?text=Aloe+Vera",
  },
  {
    id: "2",
    name: "Fern",
    climate: "Temperate",
    day: "12",
    image: "https://via.placeholder.com/100?text=Fern",
  },
  {
    id: "3",
    name: "Cactus",
    climate: "Desert",
    day: "30",
    image: "https://via.placeholder.com/100?text=Cactus",
  },
  {
    id: "4",
    name: "Bamboo",
    climate: "Tropical",
    day: "18",
    image: "https://via.placeholder.com/100?text=Bamboo",
  },
];

// Render each plant card
const PlantCard = ({ name, climate, day, image }) => {
  return (
    <View style={styles.card}>
      <LinearGradient
        colors={["#4CAF50", "#8BC34A"]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.contentContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          <View style={styles.cardContent}>
            <Text style={styles.plantName}>{name}</Text>
          </View>
          <View style={styles.cardDetails}>
            <Text style={styles.detail}>{climate}</Text>
            <Text style={styles.detail}>Day: {day}</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPlants, setFilteredPlants] = useState(plants);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text.trim() === "") {
      setFilteredPlants(plants);
    } else {
      setFilteredPlants(
        plants.filter((plant) =>
          plant.name.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Feather
          name="search"
          size={20}
          color="#888"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search plants..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {/* Plant Cards List */}
      <FlatList
        data={filteredPlants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PlantCard
            name={item.name}
            climate={item.climate}
            day={item.day}
            image={item.image}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  list: {
    paddingHorizontal: 10,
  },
  card: {
    marginVertical: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  gradient: {
    flex: 1,
    padding: 10,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  cardDetails: {
    alignItems: "flex-end",
  },
  plantName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#fff",
  },
  detail: {
    fontSize: 14,
    color: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 13,
    margin: 10,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    paddingLeft: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
});

export default HomeScreen;
