import { Avatar } from '@mui/material';

import styles from './Profile.module.css';

import { BsTrash3 } from 'react-icons/bs';

const URL = process.env.REACT_APP_URL;

export function UserProfileAvatar({ user, openModalHandler, handleDeleteProfilePicture }) {
    return (
        <div className={styles.avatarBlock}>
            <h2>Ваше фото профілю</h2>
            <Avatar
                sx={{ width: '80px', height: '80px', fontSize: '40px' }}
                className={styles.avatar}
                alt={user.firstName}
                src={user.avatar !== null ? URL + user.avatar : '/static/images/avatar/1.jpg'}
            />
            <span>{user.email}</span>

            <div className={styles.btnSide}>
                <button className={styles.uploadBtn} onClick={openModalHandler}>
                    Змінити фотографію
                </button>

                <button onClick={handleDeleteProfilePicture} className={styles.deleteBtn}>
                    {<BsTrash3 />} Видалити поточне фото
                </button>
            </div>
        </div>
    );
}
