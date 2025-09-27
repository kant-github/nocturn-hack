'use client';

import { IoMdArrowRoundForward } from 'react-icons/io';
import FeatureBoxComponent from '../ui/FeatureBoxComponent';
import { PartyPopper } from '../ui/animated-icons/PartyPopper';
import { ChartNoAxes } from '../ui/animated-icons/ChartNoAxes';
import Folder from '../ui/animated-icons/Folder';
import { Boldonse } from 'next/font/google';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRouter } from 'next/navigation';
import { useUserSessionStore } from '@/store/user/useUserSessionStore';
import { toast } from 'sonner';
import { useJoinQuizStore } from '@/store/home/useJoinQuizStore';

gsap.registerPlugin(ScrollTrigger);

const boldonse = Boldonse({
    weight: '400',
    subsets: ['latin'],
});

export default function FeatureBox() {
    const triangulumRef = useRef<HTMLSpanElement>(null);
    const featuresRef = useRef<HTMLSpanElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const { session } = useUserSessionStore();

    function handleGoToApp() {
        if (!session?.user.token) {
            toast.error('You are not signed in');
        } else {
            router.push('/home');
        }
    }

    function handleCompeteClick() {
        useJoinQuizStore.getState().setShowJoinInput(!useJoinQuizStore.getState().showJoinInput);
        document.querySelector('#join-quiz-btn')?.scrollIntoView({ behavior: 'smooth' });
    }

    useEffect(() => {
        if (!triangulumRef.current || !featuresRef.current || !containerRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                triangulumRef.current,
                { opacity: 0, x: -100 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1.5,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reset', // 🔥 ensures replay on re-entry
                    },
                },
            );

            gsap.fromTo(
                featuresRef.current,
                { opacity: 0, y: 100 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: 'elastic.out(1, 0.5)',
                    delay: 0.2,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reset', // 🔥 replay when re-visible
                    },
                },
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="flex flex-col w-full mt-40 select-none px-20">
            <div
                className={`${boldonse.className} text-[100px] tracking-wider relative text-[#e4e4e4] leading-24 flex flex-col`}
            >
                <span ref={triangulumRef} className="outlined-text w-full flex justify-end">
                    NOCTURN
                </span>
                <span
                    ref={featuresRef}
                    className="text-[50px] font-extrabold w-full flex justify-end text-[#633d99] cursor-pointer"
                >
                    FEATURES
                </span>
            </div>

            <div className="w-full flex justify-center mt-10">
                <FeatureBoxComponent
                    title="Create"
                    description="Craft quizzes with your own style and make learning fun."
                    buttonText="Create Now"
                    buttonIcon={<IoMdArrowRoundForward />}
                    buttonOnClick={handleGoToApp}
                    backgroundSvg={(hovered: boolean) => (
                        <Folder
                            width={200}
                            height={200}
                            animateState={hovered ? 'animate' : 'normal'}
                        />
                    )}
                />

                <FeatureBoxComponent
                    title="Compete"
                    description="Join thrilling challenges, race against time, and test your skills."
                    buttonText="Play Now"
                    buttonIcon={<IoMdArrowRoundForward />}
                    buttonOnClick={handleCompeteClick}
                    backgroundSvg={(hovered: boolean) => (
                        <ChartNoAxes
                            strokeWidth={0.1}
                            height={200}
                            width={200}
                            stroke="#03AAAA"
                            animateState={hovered ? 'animate' : 'normal'}
                        />
                    )}
                />

                <FeatureBoxComponent
                    title="Win"
                    description="Climb the leaderboard, unlock rewards, and celebrate your victories."
                    buttonText="Start Winning"
                    buttonIcon={<IoMdArrowRoundForward />}
                    buttonOnClick={handleGoToApp}
                    backgroundSvg={(hovered: boolean) => (
                        <PartyPopper
                            strokeWidth={0.1}
                            height={200}
                            width={200}
                            stroke="#FF5C7D"
                            animateState={hovered ? 'animate' : 'normal'}
                        />
                    )}
                />
            </div>
        </div>
    );
}
