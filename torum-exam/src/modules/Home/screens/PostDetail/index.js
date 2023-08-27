import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Keyboard, Platform, View } from 'react-native';
import { Input } from 'native-base';
import { FlashList } from "@shopify/flash-list";
import { orderBy } from 'lodash';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-tiny-toast'

import ArticleItem from '@articleItem';
import CommentItem from '@commentItem';

import { addComment, deleteCommentFromApi, getCommentsList } from '@api/index';

const PostDetail = (props) => {
    const item = props?.route?.params?.item ?? {}

    const [comments, setNewComments] = useState([])
    const textInput = useRef(null);

    const fetchCommentData = useCallback(async () => {
        try {
            const slug = props?.route?.params?.item?.slug ?? null
            let commentData = await getCommentsList(slug)
            if (commentData && Array.isArray(commentData) && commentData.length > 0) {
                commentData = orderBy(commentData, 'id', ['desc'])
                setNewComments(commentData)
            }
        } catch (error) {
        }
    }, [item])

    useEffect(() => {
        fetchCommentData();
    }, [])

    const deleteComment = useCallback((commentItem, index) => {
        const toast = Toast.showLoading('Loading...')
        try {
            Alert.alert('Please confirm', 'Are you sure you want to delete this comment?', [
                {
                    isPreferred: true,
                    text: 'No',
                    onPress: () => {
                        Toast.hide(toast);
                    }
                },
                {
                    isPreferred: false,
                    style: 'destructive',
                    text: 'Yes',
                    onPress: async () => {
                        const slug = item?.slug ?? null
                        const id = commentItem?.id ?? null
                        await deleteCommentFromApi(slug, id)
                        await fetchCommentData();
                        Toast.hide(toast)
                    }
                },
            ], {
                cancelable: false,
                onDismiss: () => {
                    Toast.hide(toast)
                }
            })
        } catch (error) {
            Toast.hide(toast)
        }
    }, [comments, item])

    const onSubmitEditing = useCallback((event) => {
        const toast = Toast.showLoading('Loading...')
        try {
            const addCommentNew = async () => {
                const text = event?.nativeEvent?.text
                const slug = item?.slug ?? null
                await addComment(slug, text)
                await fetchCommentData();
                textInput?.current?.clear()
                Keyboard.dismiss()
                Toast.hide(toast)
            }
            addCommentNew()
        } catch (error) {
            Toast.hide(toast)
        }
    }, [comments, item])

    const renderHeader = useCallback(() => {
        const index = props?.route?.params?.index ?? 0
        return (
                <KeyboardAwareScrollView enableAutomaticScroll extraHeight={0} extraScrollHeight={0}>
                    <View>
                        <ArticleItem isPage={false} index={index} item={item} />
                        <Input
                            ref={textInput}
                            dataDetectorTypes={'all'}
                            keyboardType='default'
                            autoCapitalize={'none'}
                            autoComplete={'off'}
                            autoCorrect={false}
                            onSubmitEditing={onSubmitEditing}
                            enablesReturnKeyAutomatically={true}
                            disableFullscreenUI={true}
                            margin={4}
                            mb={1}
                            shadow={Platform.OS === 'ios' ? '5' : ''}
                            placeholder='Enter comment here'
                        />
                    </View>
                </KeyboardAwareScrollView>
        )
    }, [item])

    const renderItem = useCallback(({ item: commentItem, index: commentIndex }) => {
        return (
            <CommentItem
                item={commentItem}
                index={commentIndex}
                deleteComment={deleteComment}
            />
        )
    }, [comments])

    return (
        <FlashList
            renderItem={renderItem}
            ListHeaderComponent={renderHeader}
            data={comments}
            estimatedItemSize={200}
        />
    );
}


export default PostDetail