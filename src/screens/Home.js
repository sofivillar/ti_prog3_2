import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { FlatList } from 'react-native-web';
import Post from '../components/Post';
import { auth, db } from "../firebase/config";

export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: "user",
            posts: [],
            loading: true
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (!user) {
                this.props.navigation.navigate('Login');
            }
        });
        this.handlePosts()
    }

    handlePosts = () => {
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
            (docs) => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({
                    posts: posts,
                    loading: false
                })
            }),
            (error) => {
                console.error(error);
            }
    }

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Home</Text>
                <TouchableOpacity 
                    onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={styles.irAText}>Ir a Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style={styles.irAText}>Ir a Register</Text>
                </TouchableOpacity>
                <FlatList style={styles.flatlist} data={this.state.posts} keyExtractor={(item) => item.id} renderItem={({ item }) => <Post posts={item} />} />
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    irAText: {
        color: '#000',
        marginTop: 10,
    },

    flatlist: {
        flex: 1,
        width: "100%",
    },
    
});