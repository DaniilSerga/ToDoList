import React, {FC, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {
	getAuth,
	signInWithPopup,
	UserCredential,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import {toast} from 'react-toastify';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Inputs} from './LoginPage.type';
import googleIcon from 'assets/icons/googleIcon.svg';
import {provider} from 'services/firebaseConfig';
import {useAppDispatch} from 'hooks/reduxHooks';
import {UserActions} from 'store/slices/UserSlice';
import eyeIcon from 'assets/icons/eyeIcon.svg';
import closedEyeIcon from 'assets/icons/closedEyeIcon.svg';

import styles from './LoginPage.module.scss';
import {STORAGE_KEYS} from 'constants/storageKeys';

const LoginPage: FC = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: {errors},
	} = useForm<Inputs>();
	const dispatch = useAppDispatch();
	const auth = getAuth();
	const [isPasswordVisible, setPasswordVisible] = useState(false);
	const [isLoading, setLoading] = useState(false);

	const authorize: SubmitHandler<Inputs> = async (data) => {
		setLoading(true);
		await signInWithEmailAndPassword(auth, data.email, data.password)
			.then(({user}: UserCredential) => {
				dispatch(
					UserActions.setUser({
						email: user.email,
						token: user.refreshToken,
						id: user.uid,
					}),
				);
			})
			.catch((error) => {
				console.log(error);
				toast.error('Wrong email or password');
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const authorizeGoogle = async () => {
		setLoading(true);
		await signInWithPopup(auth, provider)
			.then(({user}: UserCredential) => {
				dispatch(
					UserActions.setUser({
						email: user.email,
						token: user.refreshToken,
						id: user.uid,
					}),
				);
			})
			.catch((error) => {
				console.error(error.message);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		if (localStorage.getItem(STORAGE_KEYS.TOKEN)) {
			dispatch(UserActions.removeUser());
		}
	}, []);

	return (
		<div className={styles.pageWrapper}>
			<div className={styles.pageContainer}>
				<div className={styles.backgroundCover}></div>

				<div className={styles.contentContainer}>
					<div className={styles.heading}>
						<h1>Sign In</h1>
						<p>Enter your credentials</p>
					</div>

					<form
						className={styles.formContainer}
						onSubmit={handleSubmit(authorize)}>
						<div className={styles.inputContainer}>
							<label>Email</label>
							<input
								{...register('email', {
									required: {
										value: true,
										message: 'Email field is required',
									},
								})}
								className={
									errors.email
										? styles.errorInput
										: styles.input
								}
								type="email"
								placeholder="your@mail.com"
							/>
							{errors.email && (
								<p className={styles.errorMessage}>
									{errors.email.message}
								</p>
							)}
						</div>
						<div className={styles.inputContainer}>
							<label>Password</label>
							<div className={styles.passwordContainer}>
								<input
									{...register('password', {
										required: {
											value: true,
											message:
												'Password field must be filled',
										},
									})}
									className={
										errors.password
											? styles.errorInput
											: styles.input
									}
									type={
										isPasswordVisible ? 'text' : 'password'
									}
									placeholder="Enter your password"
								/>
								<img
									onClick={() =>
										setPasswordVisible(!isPasswordVisible)
									}
									src={
										isPasswordVisible
											? closedEyeIcon
											: eyeIcon
									}
									alt=""
								/>
							</div>
							{errors.password && (
								<p className={styles.errorMessage}>
									{errors.password.message}
								</p>
							)}
						</div>
						<button
							disabled={
								isLoading || !!errors.email || !!errors.password
							}
							className={styles.submitButton}
							type="submit">
							{isLoading ? (
								<div className={styles.loader}></div>
							) : (
								'Login'
							)}
						</button>
					</form>

					<p className={styles.navigationLink}>
						Don't have an account?
						<Link to="/sign-up">Sign up</Link>
					</p>

					<div className={styles.servicesContainer}>
						<div className={styles.servicesHeading}>
							<div></div>
							<p>Or continue with</p>
							<div></div>
						</div>
						<div
							onClick={authorizeGoogle}
							className={styles.iconContainer}>
							<img src={googleIcon} alt="" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
