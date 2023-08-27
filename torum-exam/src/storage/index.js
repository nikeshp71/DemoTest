import { MMKV } from 'react-native-mmkv'

export const TOKEN_STORAGE = 'TOKEN_STORAGE'

const storage = new MMKV({
    id: 'storage-new',
    encryptionKey: 'hunter2'
})

export default storage