import { View, Text, AsyncStorage } from "react-native"
import React from "react"
import Form from "./components/Form"
import Todo from "./components/Todo"

export default function App() {
	interface todoModel {
		title: string
		description: string
	}

	const [todos, setTodos] = React.useState<todoModel[]>([])

	React.useEffect((): void => {
		;(async () => {
			let loadedTodo: any = await AsyncStorage.getItem("todoTask")
			loadedTodo = JSON.parse(loadedTodo)
			setTodos(loadedTodo)
		})()
	}, [])
	return (
		<View>
			<Form setTodos={setTodos} />
			<View style={{ paddingHorizontal: 20 }}>
				{todos &&
					todos.map((todo, index: number) => (
						<Todo todo={todo} setTodos={setTodos} key={index} />
					))}
			</View>
		</View>
	)
}
