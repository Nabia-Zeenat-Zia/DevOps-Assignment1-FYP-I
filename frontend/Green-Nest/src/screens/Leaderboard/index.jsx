import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
} from "react-native";

const dummyLeaderboardData = [
  {
    id: "1",
    name: "John Doe",
    score: 1200,
    icon: "https://via.placeholder.com/50",
    award: require("../../assets/first.png"),
  },
  {
    id: "2",
    name: "Jane Smith",
    score: 1100,
    icon: "https://via.placeholder.com/50",
    award: require("../../assets/second.png"),
  },
  {
    id: "3",
    name: "Sam Brown",
    score: 1000,
    icon: "https://via.placeholder.com/50",
    award: require("../../assets/third.png"),
  },
  {
    id: "4",
    name: "Chris Lee",
    score: 900,
    icon: "https://via.placeholder.com/50",
    award: null, // No award for 4th and below
  },
  {
    id: "5",
    name: "Anna White",
    score: 800,
    icon: "https://via.placeholder.com/50",
    award: null, // No award for 4th and below
  },
];

const LeaderboardItem = ({ name, score, icon, award }) => {
  return (
    <View style={styles.leaderboardItem}>
      <Image source={{ uri: icon }} style={styles.userIcon} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{name}</Text>
        <Text style={styles.userScore}>Score: {score}</Text>
      </View>
      {award && <Image source={award} style={styles.awardIcon} />}
    </View>
  );
};

const Leaderboard = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <FlatList
        data={dummyLeaderboardData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <LeaderboardItem
            name={item.name}
            score={item.score}
            icon={item.icon}
            award={item.award}
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
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  list: {
    paddingHorizontal: 10,
  },
  leaderboardItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  userIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  userScore: {
    fontSize: 16,
    color: "#666",
  },
  awardIcon: {
    width: 30,
    height: 30,
  },
});

export default Leaderboard;
