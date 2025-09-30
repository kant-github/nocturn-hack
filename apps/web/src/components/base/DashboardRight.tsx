import { useHomeRendererStore } from '@/store/home/useHomeRendererStore';
import { HomeRendererEnum } from '@/types/homeRendererTypes';
import { motion } from 'framer-motion';
import { JSX } from 'react';
import HomeDashboard from '../home/HomeDashboard';

export default function DashboardRight(): JSX.Element {
    const { value } = useHomeRendererStore();

    function renderDashboard() {
        // Pass the available height to each component
        const containerProps = {
            style: { height: '100%' },
            className: 'h-full',
        };

        switch (value) {
            case HomeRendererEnum.DASHBOARD:
                return <HomeDashboard {...containerProps} />;
            default:
                return <div className="h-full">Dashboard</div>;
        }
    }

    return (
        <motion.div
            className="h-screen bg-light-base dark:bg-dark-primary/30 rounded-tl-xl flex flex-col w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <div className="h-[5rem] flex-shrink-0" />
            <div className="flex-1 dark:bg-dark-primary/90 bg-neutral-200 border-l-[1px] border-t-[1px] dark:border-neutral-800 border-neutral-300 rounded-tl-xl p-8 min-h-0">
                {renderDashboard()}
            </div>
        </motion.div>
    );
}
