import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AiOutlineCloudUpload } from 'react-icons/ai';

import styles from './Profile.module.css';

import {
    deleteProfilePicture,
    updateProfilePicture,
    updateUser,
} from '../../redux/slices/auth/fetch';
import { userInfo } from '../../redux/slices/auth/index';
import { UserProfileAvatar } from './Avatar';
import { UserProfileInfo } from './UserInfo';

import { Modal } from '../../components/Modal/index';

function UserProfile() {
    const dispatch = useDispatch();
    const user = useSelector(userInfo);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [activeBtn, setActiveBtn] = useState(false);
    const [openUploadModal, setOpenUploadModal] = useState(false);

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (user) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
        }
    }, [user]);

    useEffect(() => {
        checkInputsForUpdate();
    }, [firstName, lastName]);

    const changeFirstNameHandler = (e) => {
        setFirstName(e.target.value);
    };

    const changeLastNameHandler = (e) => {
        setLastName(e.target.value);
    };

    const checkInputsForUpdate = () => {
        if (user && (firstName !== user.firstName || lastName !== user.lastName)) {
            setActiveBtn(true);
        } else {
            setActiveBtn(false);
        }
    };

    const submitUserUpdate = () => {
        const { id } = user;
        dispatch(updateUser({ id, firstName, lastName }));
    };

    const calculateImageSize = (file) => {
        const fileSizeInMb = +(file.size / (1024 * 1024)).toFixed(2);
        if (fileSizeInMb > 4) {
            alert('Виберіть фото розміром до 4 МБ');
            return false;
        }
        return true;
    };

    const validateImageType = (image) => {
        const validExtensions = /(\.jpg|\.png)$/i;
        if (!validExtensions.test(image.name)) {
            alert('Приймаються файли .jpg .png');
            return false;
        }
        return true;
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const isSizeValid = calculateImageSize(file);
            const isTypeValid = validateImageType(file);
            if (isSizeValid && isTypeValid) {
                dispatch(updateProfilePicture(file));
                setOpenUploadModal(false);
            }
        }
    };

    const handleDeleteProfilePicture = () => {
        dispatch(deleteProfilePicture());
    };

    const openModalHandler = () => {
        setOpenUploadModal(true);
    };

    const onCloseModal = () => {
        setOpenUploadModal(false);
    };

    if (!token) {
        return <Navigate to={'/'} />;
    }

    if (!user) {
        return null;
    }

    return (
        <div className={styles.profile}>
            <div className={styles.container}>
                <div className={styles.userBlock}>
                    <UserProfileAvatar
                        user={user}
                        openModalHandler={openModalHandler}
                        handleDeleteProfilePicture={handleDeleteProfilePicture}
                    />
                    <UserProfileInfo
                        firstName={firstName}
                        lastName={lastName}
                        changeFirstNameHandler={changeFirstNameHandler}
                        changeLastNameHandler={changeLastNameHandler}
                    />
                    <button
                        disabled={!activeBtn}
                        onClick={submitUserUpdate}
                        className={styles.saveBtn}
                        type="submit">
                        Зберегти зміни
                    </button>
                </div>
            </div>
            <Modal isOpen={openUploadModal} onClose={onCloseModal}>
                <h1>Завантажити фото</h1>
                <br />
                <label className={styles.uploadBtn} htmlFor="uploadBtn">
                    Завантажити <AiOutlineCloudUpload size={'20px'} />
                </label>
                <input
                    type="file"
                    id="uploadBtn"
                    onChange={handleFileChange}
                    accept=".jpg, .jpeg, .png"
                    hidden
                />
                <div className={styles.imageSizeInfo}>Розмір фото не має перевищувати 4 МБ</div>
            </Modal>
        </div>
    );
}

export default UserProfile;
