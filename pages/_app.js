import "../styles/globals.css";

import Amplify, { API, graphqlOperation } from "aws-amplify";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import { useState, useEffect } from "react";

import awsExports from "../aws-exports";
Amplify.configure(awsExports);

const apiName = 'todosApi';
const path = '/todos'; 

function MyApp({ Component, pageProps }) {
  // const [formState, setFormState] = useState(initialState)
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetchTodos()
  }, [])

  // function setInput(key, value) {
  //   setFormState({ ...formState, [key]: value })
  // }

  async function fetchTodos() {
    try {
      API.get(apiName, path, {}).then(result => {
        console.log(result)
        setTodos(result.body);
       }).catch(err => {
        console.log(err);
       })
    } catch (err) { console.log('error fetching todos') }
  }

  // async function addTodo() {
  //   try {
  //     if (!formState.name || !formState.description) return
  //     const todo = { ...formState }
  //     setTodos([...todos, todo])
  //     setFormState(initialState)
  //     await API.graphql(graphqlOperation(createTodo, {input: todo}))
  //   } catch (err) {
  //     console.log('error creating todo:', err)
  //   }
  // }

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
          <Component {...pageProps} />
        </main>
      )}
    </Authenticator>
  );
}

export default MyApp;
