import React from 'react';
import { Image } from 'react-native';
import { HStack, VStack, Text, Pressable, View, DeleteIcon } from 'native-base';
import moment from 'moment';
import styles from './styles';

const CommentItem = ({ item, index = 0, deleteComment = () => { } }) => {
    return (
        <View
            shadow={5}
            margin={4}
            marginBottom={2}
            border={1}
            borderRadius={'md'}
            bg="#C9BF95"
        >
            <VStack padding="3">
                <HStack style={styles.infoContainer}>
                    <HStack>
                        <Image style={styles.imgStyle} source={{ uri: item?.author?.image }} />
                        <VStack>
                            <Text numberOfLines={1} style={styles.userNameText}>{item?.author?.username} - {index + 1}</Text>
                            <Text style={styles.infoText}>{moment(item?.createdAt ?? new Date().toISOString()).fromNow()}</Text>
                        </VStack>
                    </HStack>
                    <Pressable hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }} onPress={() => deleteComment(item, index)}>
                        <DeleteIcon style={{ fontSize: 28, color: 'red' }}/>
                    </Pressable>
                </HStack>
                <Text numberOfLines={5} style={{ fontSize: 10, lineHeight: 13 }}>{item?.body}</Text>
            </VStack>
        </View>
    );
}


export default CommentItem