import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import api from './services/api';

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      console.log(response.data);
      setProjects(response.data);
    })
  }, [])

  async function handleAddProject() {
    const response = await api.post('projects', {
      title: `Novo Projeto ${Date.now()}`,
      owner: 'Davi Ribeiro'
    });

    const project = response.data;

    setProjects([... projects, project]);
  }

  return (
    <>

    <StatusBar barStyle="light-content" backgroundColor="#FC3" />
    <SafeAreaView style={styles.container}>
      <FlatList 
        data={projects}
        keyExtractor={project => project.id}
        renderItem={({ item:project }) => (
          <Text style={styles.project}>{project.title}</Text>
        )}
      />

      <TouchableOpacity 
        activeOpacity={0.6} 
        style={styles.button} 
        onPress={handleAddProject}
        >
          <Text style={styles.buttonText}>Adicionar Projeto</Text>
      </TouchableOpacity>
    </SafeAreaView>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FC3',
    flexDirection: 'column',
  },
  
  project: {
    alignSelf: 'stretch',
    height: 'auto',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 20,
    margin: 8,
    color: '#333',
    fontSize: 20,
    textAlign: 'center'
  },

  button: {
    alignSelf: 'stretch',
    backgroundColor: 'red',
    margin: 8,
    height: 70,
    borderRadius: 8
  },

  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    padding: 25,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 2,
  }
});