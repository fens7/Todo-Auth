import styles from './Profile.module.css';

export function UserProfileInfo({ firstName, lastName, changeFirstNameHandler, changeLastNameHandler }) {
    return (
        <div className={styles.info}>
            <label htmlFor="firstName">Ім'я</label>
            <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={changeFirstNameHandler}
            />
            <label htmlFor="lastName">Прізвище</label>
            <input type="text" name="lastName" value={lastName} onChange={changeLastNameHandler} />
        </div>
    );
}

