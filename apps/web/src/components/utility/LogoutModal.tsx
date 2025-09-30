import { signOut } from 'next-auth/react';
import { Dispatch, SetStateAction } from 'react';
import OpacityBackground from './OpacityBackground';
import UtilityCard from './UtilityCard';
import { Button } from '../ui/button';

interface LogoutModalProps {
    openLogoutModal: boolean;
    setOpenLogoutModal: Dispatch<SetStateAction<boolean>>;
}

export default function LogoutModal({ openLogoutModal, setOpenLogoutModal }: LogoutModalProps) {
    async function LogoutHandler() {
        signOut({
            callbackUrl: '/',
        });
    }

    return (
        <div>
            {openLogoutModal && (
                <OpacityBackground onBackgroundClick={() => setOpenLogoutModal(false)}>
                    <UtilityCard className="max-w-md px-8 py-6 flex flex-col items-center justify-center space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">
                                Log out ?
                            </h2>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                                You will be logged out of your session and redirected to the Sign in
                                Page.
                            </p>
                        </div>

                        <div className="flex gap-4 w-full">
                            <Button
                                onClick={() => setOpenLogoutModal(false)}
                                className="w-1/2 px-4 py-2 text-sm dark:text-light-base text-dark-base bg-neutral-200 hover:bg-neutral-300 dark:bg-dark-primary/30 hover:dark:bg-dark-primary/50 cursor-pointer"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={LogoutHandler}
                                className="w-1/2 px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-light-base cursor-pointer"
                            >
                                Sign Out
                            </Button>
                        </div>
                    </UtilityCard>
                </OpacityBackground>
            )}
        </div>
    );
}
