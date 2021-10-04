import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

interface SkillData {
  id: string;
  name: string;
}

export default function Home() {
  const [newSkill, setNewSkill] = useState("");
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [greeting, setGreeting] = useState("");

  function handleAddNewSkill() {
    showLog();

    const data = {
      id: String(new Date().getTime()),
      name: newSkill,
    };

    console.log("New skill: ", data);

    setMySkills((oldState) => [...oldState, data]);
  }

  function showLog() {
    console.log('passou por aqui');
  }

  function handleRemoveSkill(id: string) {
    setMySkills((oldState) => oldState.filter((skill) => skill.id !== id));
  }

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGreeting("Good morning");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Good afternoom");
    } else {
      setGreeting("Good night");
    }
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title} testID="welcome">
          Welcome, Lucas
        </Text>

        <Text style={styles.greetings}>{greeting}</Text>

        <TextInput
          testID="input-new"
          style={styles.input}
          placeholder="New skill"
          placeholderTextColor="#999"
          onChangeText={setNewSkill}
        />

        <Button 
          testID="button-add"
          title="Add" 
          onPress={handleAddNewSkill} 
        />

        <Text style={[styles.title, { marginVertical: 50 }]} testID="list-title">
          My Skills
        </Text>

        {
          mySkills &&
          <FlatList
            testID="flat-list-skills"
            data={mySkills}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <SkillCard
                skill={item.name}
                onPress={() => handleRemoveSkill(item.id)}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        }
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121015",
    paddingHorizontal: 30,
    paddingVertical: 70,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1F1e25',
    color: '#FFF',
    fontSize: 18,
    padding: Platform.OS === "ios" ? 15 : 10,
    marginTop: 30,
    borderRadius: 7,
  },
  greetings: {
    color: '#FFF',
    fontSize: 18,
  },
});
