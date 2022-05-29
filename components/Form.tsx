import {
	View,
	Text,
	SafeAreaView,
	TextInput,
	Button,
	TouchableHighlight,
	AsyncStorage,
} from "react-native"
import React from "react"
import { any } from "prop-types"

export default function Form(prop: any) {
	const [description, setDescription] = React.useState<string>("")

	const setTodo = async () => {
		if (!description) {
			return alert("Please fill in the form")
		}
		try {
			let loadedTodo: any = await AsyncStorage.getItem("todoTask")
			loadedTodo = JSON.parse(loadedTodo)
			if (!loadedTodo) {
				loadedTodo = []
			}
			// alert(JSON.parse(loadedTodo))
			const todoId = loadedTodo.map((l: any) => l.id)
			const randomNumber = (): number => {
				const Radnomnumber: number = Math.ceil(
					Math.random() * 10000000000000
				)
				if (todoId.includes(Radnomnumber)) {
					return randomNumber()
				}
				return Radnomnumber
			}
			const id = randomNumber()
			const todos = [{ id, description }, ...loadedTodo]
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
				justifyContent: "center",
				alignItems: "center",
				margin: 20,
			}}
		>
			<Text style={{ marginTop: 50, fontWeight: "bold" }}>
				Todo application
			</Text>
			<TextInput
				style={{
					height: 40,
					marginTop: 5,
					borderWidth: 1,
					padding: 10,
					width: "100%",
				}}
				onChangeText={(e) => setDescription(e)}
				placeholder="Todo description here"
			/>
			<View style={{ marginTop: 10 }}>
				<TouchableHighlight
					style={{
						height: 40,
						width: 160,
						borderRadius: 10,
						backgroundColor: "yellow",
						marginLeft: 50,
						marginRight: 50,
						marginTop: 2,
					}}
				>
					<Button
						onPress={setTodo}
						title="Add"
						accessibilityLabel="Learn more about this button"
					/>
				</TouchableHighlight>
			</View>
			<View>
				<TouchableHighlight
					style={{
						height: 40,
						width: 160,
						borderRadius: 10,
						backgroundColor: "yellow",
						marginLeft: 50,
						marginRight: 50,
						marginTop: 2,
					}}
				>
					<Button
						onPress={async () => {
							prop.setTodos([])
							await AsyncStorage.clear()
						}}
						title="Remove all"
						accessibilityLabel="Learn more about this button"
					/>
				</TouchableHighlight>
			</View>
		</View>
	)
}
