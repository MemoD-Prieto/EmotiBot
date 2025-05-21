import { lazy } from 'react';
import EmotionAnalysis from '../pages/EmotionAnalysis';
import MentalHealthForms from '../pages/MentalHealthForm';
const Index = lazy(() => import('../pages/Index'));

const routes = [
    // dashboard
    {
        path: '/',
        element: <Index />,
        layout: 'default',
    },
    {
        path: '/emotion-analysis',
        element: <EmotionAnalysis />,
    },
    {
        path: '/mental-health-forms',
        element: <MentalHealthForms />,
    },
];

export { routes };
