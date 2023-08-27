import React, { useCallback } from 'react';
import { Image } from 'react-native';
import { HStack, VStack, Text, FavouriteIcon, Pressable } from 'native-base';
import moment from 'moment';

import ROUTE_CONSTANTS from '@route/constants';
import styles from './styles';

const ArticleItem = ({ isList = false, item, index = 0, navigate = null }) => {

    const openDetails = useCallback(() => {
        if (isList === true && typeof navigate === 'function') {
            navigate(ROUTE_CONSTANTS.POST, { item, index })
        }
    }, [item])

    return (
        <Pressable onPress={openDetails}
            shadow={5}
            margin={4}
            marginBottom={2}
            border={1}
            bg="#AECACD"
            borderRadius={'10'} >
            <VStack padding="3">
                <HStack style={styles.imageContainer}>
                    <Image style={styles.imgStyle} source={{ uri: item?.author?.image }} />
                    <VStack>
                        <Text numberOfLines={1} style={styles.userNameText}>{item?.author?.username} - {index + 1}</Text>
                        <Text style={styles.infoText}>{moment(item?.createdAt ?? new Date().toISOString()).startOf('hour').fromNow()}</Text>
                        <Text style={styles.infoText}>{item?.author?.following === true ? 'Following' : 'Not following'}</Text>
                    </VStack>
                </HStack>
                <Text style={styles.titleText}>{item?.title}</Text>
                <Text numberOfLines={3} style={styles.msgText}>{item?.body}</Text>
            </VStack>
            <HStack padding="3" pt="0">
                <HStack alignItems={'center'}>
                    <FavouriteIcon color={item?.favorited === true ? "red.500" : 'rgba(0,0,0,0.6)'} name="favourite" />
                    <Text style={styles.infoText}>{item?.favoritesCount ?? 0}</Text>
                </HStack>
            </HStack>
        </Pressable>
    );
}


export default ArticleItem