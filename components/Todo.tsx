import { View, Text, Button, AsyncStorage } from "react-native"
import React from "react"

export default function Todo(prop: any) {
	const deleteOne = async () => {
		try {
			let loadedTodo: any = await AsyncStorage.getItem("todoTask")
			loadedTodo = JSON.parse(loadedTodo)
			if (!loadedTodo) {
				loadedTodo = []
			}
			// alert(JSON.parse(loadedTodo))
			const todos = loadedTodo.filter(
				(todo: any) => todo.id !== prop.todo.id
			)
			console.log(todos)
			await AsyncStorage.setItem("todoTask", JSON.stringify(todos))
			prop.setTodos(todos)
		} catch (error) {
			// Error saving data
		}
	}
	return (
		<View
			style={{
				flexDirection: "row",
				justifyContent: "space-between",
				padding: 20,
				alignItems: "center",
				backgroundColor: "#f5f5f5",
				width: "100%",
				borderRadius: 10,
				marginVertical: 10,
			}}
		>
			<Text numberOfLines={5}>{prop.todo.description}</Text>
			<Button onPress={deleteOne} color={"red"} title="x" />
		</View>
	)
}
