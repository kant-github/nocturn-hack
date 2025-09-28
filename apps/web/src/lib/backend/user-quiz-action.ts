import axios from 'axios';
import {
    PARTICIPANT_JOIN_QUIZ_URL,
    SPECTATOR_JOIN_QUIZ_URL,
    SPECTATOR_JOIN_QUIZ_URL_VIA_LINK,
} from 'routes/api_routes';
import { toast } from 'sonner';

class UserQuizAction {
    public async joinQuiz(code: string): Promise<unknown> {
        switch (code.length) {
            case 6:
                return await this.spectatorJoinQuiz(code);
            case 12:
                return await this.participantJoinQuiz(code);
            default:
                toast.error('Please enter a valid code');
                return;
        }
    }

    private async participantJoinQuiz(code: string): Promise<unknown> {
        try {
            if (!code) {
                toast.error('Please enter a code');
                return;
            }
            if (code.length !== 12) {
                toast.error('Please enter a valid code');
                return;
            }

            const { data } = await axios.post(
                PARTICIPANT_JOIN_QUIZ_URL,
                { code },
                { withCredentials: true },
            );

            if (data.success) {
                toast.success(data.message);
                return data.quizId;
            }
            toast.error(data.message);
            return;
        } catch (err) {
            console.error('Error while joining quiz', err);
        }
    }

    private async spectatorJoinQuiz(code: string): Promise<unknown> {
        try {
            if (!code) {
                toast.error('Please enter a code');
                return;
            }
            if (code.length !== 6) {
                toast.error('Please enter a valid code');
                return;
            }

            const { data } = await axios.post(
                SPECTATOR_JOIN_QUIZ_URL,
                { code },
                { withCredentials: true },
            );

            if (data.success) {
                toast.success(data.message);
                return data.quizId;
            }
            toast.error(data.message);
            return;
        } catch (err) {
            console.error('Error while joining quiz', err);
        }
    }

    public async spectatorJoinQuizViaURL(
        quizId: string,
        spectatorToken: string,
    ): Promise<{
        quizId: string;
        success: boolean;
    }> {
        try {
            if (!quizId) {
                toast.error('Quiz ID is missing');
                return {
                    quizId: '',
                    success: false,
                };
            }

            if (!spectatorToken) {
                toast.error('Spectator token is missing');
                return {
                    quizId: '',
                    success: false,
                };
            }

            const { data } = await axios.get(
                `${SPECTATOR_JOIN_QUIZ_URL_VIA_LINK}?quizId=${quizId}&spectator_token=${spectatorToken}`,
                { withCredentials: true },
            );

            if (data.success) {
                toast.success(data.message);
                return {
                    quizId: data.quizId,
                    success: data.success,
                };
            }

            toast.error(data.message);
            return {
                quizId: '',
                success: false,
            };
        } catch (err) {
            console.error('Error while joining quiz via URL', err);
            toast.error('Failed to join quiz. Please try again.');

            return {
                quizId: '',
                success: false,
            };
        }
    }
}

const userQuizAction = new UserQuizAction();
export default userQuizAction;
