import React, {FC, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithPopup,
	UserCredential,
} from 'firebase/auth';
import {toast} from 'react-toastify';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Inputs} from './type';
import googleIcon from 'assets/icon/googleIcon.svg';
import {provider} from 'services/firebaseConfig';
import {useAppDispatch} from 'hooks/reduxHooks';
import {UserActions} from 'store/slices/UserSlice';

import styles from './RegisterPage.module.scss';

const RegisterPage: FC = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: {errors},
	} = useForm<Inputs>();
	const dispatch = useAppDispatch();
	const auth = getAuth();
	const [isLoading, setLoading] = useState(false);

	const authorize: SubmitHandler<Inputs> = async (data) => {
		setLoading(true);
		await createUserWithEmailAndPassword(auth, data.email, data.password)
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

	return (
		<div className={styles.pageWrapper}>
			<div className={styles.pageContainer}>
				<div className={styles.backgroundCover}></div>

				<div className={styles.contentContainer}>
					<div className={styles.heading}>
						<h1>Sign Up</h1>
						<p>Create your account within seconds</p>
					</div>

					<form
						className={styles.formContainer}
						onSubmit={handleSubmit(authorize)}>
						<div className={styles.inputContainer}>
							<label>Email</label>
							<input
								{...register('email', {
									required: true,
									pattern: {
										value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
										message: 'err',
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
							<input
								{...register('password', {
									required: true,
									minLength: {
										value: 6,
										message:
											'Password length must be greater than 6',
									},
								})}
								className={
									errors.password
										? styles.errorInput
										: styles.input
								}
								type="password"
								placeholder="Enter your password"
							/>
							{errors.password && (
								<p className={styles.errorMessage}>
									{errors.password.message}
								</p>
							)}
						</div>
						<button
							disabled={!!errors.email || !!errors.password}
							className={styles.submitButton}
							type="submit">
							{isLoading ? (
								<div className={styles.loader}></div>
							) : (
								'Create an account'
							)}
						</button>
					</form>

					<p className={styles.navigationLink}>
						Already have an account?
						<Link to="/signin">Sign in</Link>
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

export default RegisterPage;
